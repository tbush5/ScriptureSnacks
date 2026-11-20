export const MOBILE_INTERVAL = 5000;
const SCROLL_DURATION = 900;
const DESKTOP_SPEED = 20; // Pixels per second.
const MANUAL_PAUSE = 3000;
const SETTLE_DELAY = 150;
const CENTER_TOLERANCE = 0.5;

export interface CarouselGeometry {
  viewport: number;
  firstCenter: number;
  step: number;
  loopWidth: number;
}

interface CarouselSurface {
  read: () => number;
  write: (position: number) => void;
  onCenteredItem: (index: number) => void;
}

interface Transition {
  from: number;
  to: number;
  startedAt: number;
}

// The controller is the only code allowed to write the track's scroll position.
// Native swipes temporarily own it; animations wait until their momentum ends.
export class MenuCarouselController {
  private surface: CarouselSurface;
  private count: number;
  private geometry: CarouselGeometry | null = null;
  private mobile = false;
  private reducedMotion = false;
  private visible = true;
  private hiddenAt = 0;
  private keyboardFocus = false;
  private descriptionOpen = false;
  private direction = 1;
  private position = 0;
  private lastWritten = 0;
  private lastFrame: number | null = null;
  private centeredItem = -1;
  private transition: Transition | null = null;
  private touching = false;
  private nativeScrolling = false;
  private lastNativeScroll = 0;
  private pauseUntil = 0;
  private nextAdvance = 0;

  constructor(count: number, surface: CarouselSurface) {
    this.count = count;
    this.surface = surface;
  }

  get isMobile() { return this.mobile; }

  configure(geometry: CarouselGeometry, mobile: boolean, reducedMotion: boolean, now: number) {
    if (!this.count || geometry.step <= 0 || geometry.loopWidth <= 0) return;
    const previous = this.geometry;
    if (previous && Object.keys(geometry).every(key =>
      geometry[key as keyof CarouselGeometry] === previous[key as keyof CarouselGeometry],
    ) && mobile === this.mobile && reducedMotion === this.reducedMotion) return;

    // Preserve the visible item (and desktop fractional progress) across resizing.
    const itemPosition = previous
      ? (this.surface.read() + previous.viewport / 2 - previous.firstCenter) / previous.step
      : this.count;
    this.geometry = geometry;
    this.mobile = mobile;
    this.reducedMotion = reducedMotion;
    this.direction = 1;
    this.transition = null;
    this.nativeScrolling = false;
    this.lastFrame = null;
    this.nextAdvance = now + MOBILE_INTERVAL;
    const index = mobile ? Math.round(itemPosition) : itemPosition;
    this.write(this.target(index));
  }

  private target(index: number) {
    const geometry = this.geometry!;
    return geometry.firstCenter + index * geometry.step - geometry.viewport / 2;
  }

  private itemPosition(position: number) {
    const geometry = this.geometry!;
    return (position + geometry.viewport / 2 - geometry.firstCenter) / geometry.step;
  }

  private updateCenteredItem() {
    if (!this.geometry) return;
    const nearest = Math.round(this.itemPosition(this.surface.read()));
    const index = ((nearest % this.count) + this.count) % this.count;
    if (index !== this.centeredItem) {
      this.centeredItem = index;
      this.surface.onCenteredItem(index);
    }
  }

  private write(position: number) {
    const width = this.geometry!.loopWidth;
    // Rebase by whole copies, preserving both the visible image and motion phase.
    let shift = 0;
    if (position >= width * 2) shift = -Math.floor((position - width) / width) * width;
    else if (position < width / 2) shift = Math.ceil((width / 2 - position) / width) * width;
    this.position = position + shift;
    if (this.transition && shift) {
      this.transition.from += shift;
      this.transition.to += shift;
    }
    this.surface.write(this.position);
    this.lastWritten = this.surface.read();
    this.updateCenteredItem();
  }

  private animateTo(target: number, now: number) {
    this.transition = null;
    this.position = this.surface.read();
    this.nativeScrolling = false;
    this.nextAdvance = now + MOBILE_INTERVAL;
    if (this.reducedMotion || Math.abs(target - this.position) <= CENTER_TOLERANCE) {
      this.write(target);
    } else {
      this.transition = { from: this.position, to: target, startedAt: now };
    }
  }

  move(direction: -1 | 1, now: number) {
    if (!this.geometry) return;
    const current = this.itemPosition(this.surface.read());
    const tolerance = CENTER_TOLERANCE / this.geometry.step;
    // Choose the nearest center strictly on the requested side of the viewport.
    const index = direction === 1 ? Math.floor(current + tolerance) + 1 : Math.ceil(current - tolerance) - 1;
    this.pauseUntil = now + MANUAL_PAUSE;
    this.animateTo(this.target(index), now);
  }

  goToItem(index: number, now: number) {
    if (!this.geometry || index < 0 || index >= this.count) return;
    const current = this.surface.read();
    const base = this.target(index);
    const copy = Math.round((current - base) / this.geometry.loopWidth);
    this.pauseUntil = now + MANUAL_PAUSE;
    this.animateTo(base + copy * this.geometry.loopWidth, now);
  }

  setHover(fraction: number | null) {
    if (!this.mobile) this.direction = fraction === null ? 1 : fraction < 0.1 ? -1 : fraction > 0.9 ? 1 : 0;
  }

  setKeyboardFocus(focused: boolean, now: number) {
    this.keyboardFocus = focused;
    this.nextAdvance = now + MOBILE_INTERVAL;
  }

  setDescriptionOpen(open: boolean, now: number) {
    this.descriptionOpen = open;
    this.nextAdvance = now + MOBILE_INTERVAL;
    if (open && this.mobile) {
      this.transition = null;
      this.position = this.surface.read();
    }
  }

  setVisible(visible: boolean, now: number) {
    if (this.visible === visible) return;
    this.visible = visible;
    if (!visible) this.hiddenAt = now;
    else if (this.transition) {
      // Resume an interrupted slide at the same point, without catching up.
      this.transition.startedAt += now - this.hiddenAt;
    }
    this.lastFrame = null;
    this.nextAdvance = now + MOBILE_INTERVAL;
  }

  beginTouch(now: number) {
    this.touching = true;
    this.beginNativeScroll(now);
  }

  endTouch(now: number) {
    this.touching = false;
    this.lastNativeScroll = now;
    this.pauseUntil = now + MANUAL_PAUSE;
    this.nextAdvance = now + MOBILE_INTERVAL;
  }

  beginNativeScroll(now: number) {
    this.transition = null;
    this.nativeScrolling = true;
    this.position = this.surface.read();
    this.lastNativeScroll = now;
    this.pauseUntil = now + MANUAL_PAUSE;
    this.nextAdvance = now + MOBILE_INTERVAL;
  }

  onScroll(now: number) {
    this.updateCenteredItem();
    // Ignore events generated by our own writes, including rounded subpixels.
    if (!this.touching && Math.abs(this.surface.read() - this.lastWritten) <= CENTER_TOLERANCE) return;
    this.beginNativeScroll(now);
  }

  onScrollEnd(now: number) {
    if (this.nativeScrolling && !this.touching) this.lastNativeScroll = now - SETTLE_DELAY;
  }

  tick(now: number) {
    const elapsed = this.lastFrame === null ? 0 : Math.min(now - this.lastFrame, 50);
    this.lastFrame = now;
    if (!this.geometry || !this.visible) return;

    if (this.touching) return;
    if (this.nativeScrolling) {
      if (now - this.lastNativeScroll < SETTLE_DELAY) return;
      this.nativeScrolling = false;
      // Rebase only after the finger and native momentum have relinquished control.
      this.write(this.surface.read());
      if (this.mobile) this.animateTo(this.target(Math.round(this.itemPosition(this.position))), now);
    }

    if (this.transition) {
      const transition = this.transition;
      const progress = Math.min((now - transition.startedAt) / SCROLL_DURATION, 1);
      const eased = progress * progress * (3 - 2 * progress);
      this.write(transition.from + (transition.to - transition.from) * eased);
      if (progress === 1) this.transition = null;
      return;
    }

    if (this.reducedMotion || this.keyboardFocus || (this.mobile && this.descriptionOpen) || now < this.pauseUntil) {
      if (this.keyboardFocus || (this.mobile && this.descriptionOpen)) this.nextAdvance = now + MOBILE_INTERVAL;
      return;
    }

    if (this.mobile) {
      // Mobile rests on a centered item between five-second advances.
      if (now >= this.nextAdvance) {
        this.animateTo(this.target(Math.round(this.itemPosition(this.position)) + 1), now);
      }
    } else if (this.direction !== 0 && elapsed > 0) {
      // Keep a fractional accumulator; never feed rounded DOM values back into it.
      this.write(this.position + elapsed * DESKTOP_SPEED / 1000 * this.direction);
    }
  }
}
