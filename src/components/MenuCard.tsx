import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export interface MenuCardProps {
  name: string;
  image: string;
  description: string;
  color?: string;
}

export default function MenuCard({ name, image, description, color = '#e4c6eb' }: MenuCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li className="w-[min(78vw,19rem)] shrink-0">
      <button
        type="button"
        className="menu-card block h-[25rem] w-full cursor-pointer rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]"
        aria-pressed={flipped}
        aria-label={flipped ? `${name}: ${description} Click to see the photo.` : `${name}. Click to read the description.`}
        onClick={() => setFlipped(!flipped)}
      >
        <span className={`menu-card-inner ${flipped ? 'is-flipped' : ''}`}>
          <span className="menu-card-face overflow-hidden bg-white" aria-hidden="true">
            <img
              src={image}
              alt=""
              width={700}
              height={460}
              loading="lazy"
              className="h-3/4 w-full object-cover"
            />
            <span className="flex h-1/4 items-center py-4 pl-6 pr-10" style={{ backgroundColor: color }}>
              <span className="font-serif text-2xl leading-tight">{name}</span>
            </span>
            <RotateCcw size={18} className="absolute bottom-4 right-4" />
          </span>
          <span className="menu-card-face menu-card-back flex flex-col justify-between p-7" style={{ backgroundColor: color }} aria-hidden="true">
            <span>
              <span className="mb-5 block font-serif text-3xl leading-tight">{name}</span>
              <span className="block text-base leading-7">{description}</span>
            </span>
            <RotateCcw size={18} className="absolute bottom-4 right-4" />
          </span>
        </span>
      </button>
    </li>
  );
}

