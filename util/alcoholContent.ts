/**
 * @author Mihir Patankar
 */

import { Gender } from './types';

/**
 * https://pmc.ncbi.nlm.nih.gov/articles/PMC4361698/
 * @param gender Gender of the subject
 * @param v Volume consumed in mL
 * @param z ABV of drink
 * @param W Weight of the subject in kg
 * @param h Height of the subject in m
 * @param t Time since first drink in hours
 * @returns Blood alcohol content in g/100mL
 */
export const calculateBloodAlcoholContent = (gender: Gender, v: number, z: number, W: number, h: number, t: number) => {
  // The elimination rate in g/100mL/hour
  const β = 0.015;
  // Density of alcohol (ethanol)
  const d = 0.789;
  // The assumed absorption proportion (Assume 100% alcohol is absorbed)
  const a = 1.0;
  // Mass of alcohol consumed in grams
  const m = v * z * a * d;
  const bmi = W / Math.pow(h, 2);
  const r = calculateWidmarkFactor(gender, bmi);
  const C_0 = (100 * m) / (r * W) / 1000.0;
  const C_t = C_0 - β * t;
  return Math.max(C_t, 0.0);
};

/**
 * https://wsp.wa.gov/breathtest/docs/webdms/Studies_Articles/Widmarks%20Equation%2003-07-2002.pdf
 */
export const calculateBreathAlcoholContent = (bloodAlcoholContent: number) => {
  // Note this common conversion factor usually leads to an underestimate of breath alcohol content.
  const k = 2100.0;
  return bloodAlcoholContent / k;
};

/**
 * Equations are from https://pmc.ncbi.nlm.nih.gov/articles/PMC4361698/table/table2-0025802414524385/
 * @param BMI Body Mass Index in kg/m^2
 * @returns Widmark factor (aka volume of distribution) in liters/kg
 */
const calculateWidmarkFactor = (gender: Gender, bmi: number) => {
  const [r_male, r_female] = [1.0181 - 0.01213 * bmi, 0.9367 - 0.0124 * bmi];
  if (gender === 'male') return r_male;
  else if (gender === 'female') return r_female;
  else return (r_male + r_female) / 2.0;
};
