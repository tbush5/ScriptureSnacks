import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export interface MenuCardProps {
  name: string;
  image: string;
  description: string;
  price?: string;
  color?: string;
}

interface MenuCardStateProps extends MenuCardProps {
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
}

export default function MenuCard({ name, image, description, price, color = '#e4c6eb', flipped: controlledFlipped, onFlipChange }: MenuCardStateProps) {
  const [localFlipped, setLocalFlipped] = useState(false);
  const flipped = controlledFlipped ?? localFlipped;
  const priceLabel = price?.trim();
  const accessibleName = priceLabel ? `${name}, ${priceLabel}` : name;
  const priceText = priceLabel ? (
    <span className="absolute inset-x-6 bottom-8 text-3xl font-semibold leading-9 text-[#82558a]">
      {priceLabel}
    </span>
  ) : null;

  return (
    <li className="w-[min(78vw,19rem)] shrink-0">
      <button
        type="button"
        className="menu-card block h-[25rem] w-full cursor-pointer rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]"
        aria-pressed={flipped}
        aria-label={flipped ? `${accessibleName}: ${description} Click to see the photo.` : `${accessibleName}. Click to read the description.`}
        onClick={() => onFlipChange ? onFlipChange(!flipped) : setLocalFlipped(!flipped)}
      >
        <span className={`menu-card-inner ${flipped ? 'is-flipped' : ''}`}>
          <span className="menu-card-face overflow-hidden bg-white" aria-hidden="true">
            <img
              src={image}
              alt=""
              width={700}
              height={460}
              loading="lazy"
              className={`${priceLabel ? 'h-[65%]' : 'h-3/4'} w-full object-cover`}
            />
            <span className={`flex pl-6 pr-10 ${priceLabel ? 'h-[35%] items-start pt-4 pb-20' : 'h-1/4 items-center py-4'}`} style={{ backgroundColor: color }}>
              <span className="font-serif text-2xl leading-tight">{name}</span>
            </span>
            {priceText}
            <RotateCcw size={18} className="absolute bottom-3 right-4" />
          </span>
          <span className={`menu-card-face menu-card-back flex flex-col justify-between overflow-hidden p-7 ${priceLabel ? 'pb-24' : ''}`} style={{ backgroundColor: color }} aria-hidden="true">
            <span>
              <span className="mb-5 block font-serif text-3xl leading-tight">{name}</span>
              <span className="block text-base leading-7">{description}</span>
            </span>
            {priceText}
            <RotateCcw size={18} className="absolute bottom-3 right-4" />
          </span>
        </span>
      </button>
    </li>
  );
}

