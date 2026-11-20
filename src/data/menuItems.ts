import type { MenuCardProps } from '../components/MenuCard';

// Add or edit menu items here. Set price to a label such as "$5 each" or "$24 per dozen"; leave it empty to hide it.
// Card colors are assigned by the scrolling list, independently of each item.
export const menuItems: Omit<MenuCardProps, 'color'>[] = [
  {
    name: 'Cinnamon Rolls',
    image: '/img/cinnamon-rolls.webp',
    description: 'Who doesn\'t love a cinnamon roll? These are my sweet as honey cinnamon rolls, and they\'ll keep you rolling back.',
    price: '8 for $33',
  },
  {
    name: 'Cosmic Collagen Bites',
    image: '/img/cosmic-collagen-bites.webp',
    description: 'These are collagen protein balls with an added childhood twist. They are super fudgey like a cosmic brownie, but they have about 9 grams of protein in each, collagen, and clean ingredients!',
    price: '4 for $10',
  },
  {
    name: 'Chocolate Chip Cookies',
    image: '/img/chocolate-chip-cookies.webp',
    description: 'A classic chocolate chip cookie made from a browned butter base, semi-sweet chocolate chunks, and a salty finish.',
    price: '8 for $18',
  },
  {
    name: 'Apple Fritter Cookies',
    image: '/img/apple-fritter-cookie.webp',
    description: 'This is an apple fritter inspired cookie. These are great for apple and cookie lovers. Fresh apples and cinnamon are baked into each, topped with a sugary glaze. ',
    price: '8 for $18',
  },
  {
    name: 'Apple Pie',
    image: '/img/apple-pie-menu-gallery.webp',
    description: 'A comforting apple pie made to share something sweet with loved ones. It is loaded with apples, cinnamon, sugar, and just a touch of lemon all inside a flaky crust.',
    price: '$32 for a 9-inch pie',
  },
  {
    name: 'Pumpkin Bread',
    image: '/img/pumpkin-bread.webp',
    description: 'This bread is packed with pumpkin and has a moist interior. I like to finish it off with pepitas for a little added texture and flavor.',
    price: '1 loaf for $12',
  },
  {
    name: 'Pumpkin Muffins',
    image: '/img/pumpkin-muffin-menu.webp',
    description: 'Similar to the pumpkin bread, these muffins are perfect for a morning breakfast. They have both pepitas and a streusel topping.',
    price: '1 dozen for $18',
  },
];

