import Ship from "../src/ship";

test("sinks ship legth 3", () => {
  const ship1 = new Ship(3);
  ship1.hit();
  expect(ship1.hitCount).toBe(1);
  ship1.hit();
  ship1.hit();
  expect(ship1.hitCount).toBe(3);
  expect(ship1.isSunk()).toBe(true);
});
