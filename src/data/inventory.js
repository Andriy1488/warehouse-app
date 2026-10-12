// Навчальні дані. Місткість вимірюється в місцях зберігання,
// а кількість товару — в одиницях самого товару.
export const warehouses = [
  { id: 'w1', name: 'Центральний склад', address: 'м. Івано-Франківськ, вул. Промислова, 12', capacity: 1000, occupied: 700 },
  { id: 'w2', name: 'Південний склад', address: 'м. Івано-Франківськ, вул. Складська, 8', capacity: 600, occupied: 480 },
  { id: 'w3', name: 'Резервний склад', address: 'м. Івано-Франківськ, вул. Транспортна, 5', capacity: 400, occupied: 400 },
];

export const products = [
  {
    id: 'p1', name: 'Цегла будівельна', sku: 'BR-001', unit: 'шт.',
    placements: [
      { warehouseId: 'w1', warehouseName: 'Центральний склад', quantity: 400 },
      { warehouseId: 'w2', warehouseName: 'Південний склад', quantity: 280 },
    ],
  },
  {
    id: 'p2', name: 'Цемент 25 кг', sku: 'CM-002', unit: 'мішків',
    placements: [
      { warehouseId: 'w1', warehouseName: 'Центральний склад', quantity: 600 },
      { warehouseId: 'w3', warehouseName: 'Резервний склад', quantity: 300 },
    ],
  },
  {
    id: 'p3', name: 'Керамічна плитка', sku: 'TL-003', unit: 'коробок',
    placements: [
      { warehouseId: 'w2', warehouseName: 'Південний склад', quantity: 200 },
      { warehouseId: 'w3', warehouseName: 'Резервний склад', quantity: 200 },
    ],
  },
  { id: 'p4', name: 'Фарба біла 10 л', sku: 'PT-004', unit: 'відер', placements: [] },
];
