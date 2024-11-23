/**
 * @author Mihir Patankar
 */

import { Gender, calculateAlcoholMassConsumed, calculateBloodAlcoholContent } from '../alcoholContent';

const examplePerson = {
  gender: 'male',
  volumeConsumedMilliliters: 3550,
  abv: 0.04,
  weightKg: 81.6,
  heightMeters: 1.853548,
  timeSinceFirstDrinkHours: 0,
};

describe('calculateBAC', () => {
  it('should calculate BAC correctly for given inputs', () => {
    const subject = { ...examplePerson };
    const result = calculateBloodAlcoholContent(
      subject.gender as Gender,
      calculateAlcoholMassConsumed(subject.volumeConsumedMilliliters, subject.abv),
      subject.weightKg,
      subject.heightMeters,
      subject.timeSinceFirstDrinkHours
    );
    expect(result).toBeCloseTo(0.188, 3);
  });

  it('should calculate BAC correctly after the passage of time', () => {
    const subject = { ...examplePerson };
    subject.timeSinceFirstDrinkHours = 5;
    const result = calculateBloodAlcoholContent(
      subject.gender as Gender,
      calculateAlcoholMassConsumed(subject.volumeConsumedMilliliters, subject.abv),
      subject.weightKg,
      subject.heightMeters,
      subject.timeSinceFirstDrinkHours
    );
    expect(result).toBeCloseTo(0.113, 3);
  });

  it('should not return a negative BAC if time is too long', () => {
    const subject = { ...examplePerson };
    subject.timeSinceFirstDrinkHours = 20;
    const result = calculateBloodAlcoholContent(
      subject.gender as Gender,
      calculateAlcoholMassConsumed(subject.volumeConsumedMilliliters, subject.abv),
      subject.weightKg,
      subject.heightMeters,
      subject.timeSinceFirstDrinkHours
    );
    expect(result).toBe(0.0);
  });
});
