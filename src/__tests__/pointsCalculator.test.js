import calculatePoints from "../utils/pointsCalculator";

describe('calculatePoints', () => {
  it('should return 0 for a purchase under $50', () => {
      expect(calculatePoints(0)).toBe(0);
    expect(calculatePoints(25)).toBe(0);
    expect(calculatePoints(49.99)).toBe(0);
  });

  it('should return the correct number of points for a purchase between $50 and $100', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(75)).toBe(25);
    expect(calculatePoints(100)).toBe(50);
  });

  it('should return the correct number of points for a purchase over $100', () => {
    expect(calculatePoints(101)).toBe(52); // 50 points for $50-100 range + 2 points for the rest
    expect(calculatePoints(150)).toBe(150); 
    expect(calculatePoints(200)).toBe(250); 
  });
});
