/**
 * @author Mihir Patankar
 * BAC information from https://my.clevelandclinic.org/health/diagnostics/22689-blood-alcohol-content-bac
 */
const bloodAlcoholContentZones = [
  {
    name: 'Sober',
    min: 0,
    max: 0.02,
    color: 'rgba(255, 255, 255, 0.2)',
    description: "There's hardly any alcohol in your blood, (you're sober).",
  },
  {
    name: 'Minimal Impairment',
    min: 0.02,
    max: 0.05,
    color: 'rgba(77, 232, 84, 0.2)',
    description: 'You may experience an altered mood, relaxation and a slight loss of judgment.',
  },
  {
    name: 'Mild Intoxication',
    min: 0.05,
    max: 0.08,
    color: 'rgba(145, 237, 24, 0.2)',
    description: 'You may feel uninhibited and have lowered alertness and impaired judgment.',
  },
  {
    name: 'Moderate Intoxication',
    min: 0.08,
    max: 0.1,
    color: 'rgba(223, 237, 24, 0.2)',
    description:
      'You may have reduced muscle coordination, find it more difficult to detect danger and have impaired judgment and reasoning.',
  },
  {
    name: 'Severe Intoxication',
    min: 0.1,
    max: 0.15,
    color: 'rgba(250, 205, 25, 0.2)',
    description: 'You may have a reduced reaction time, slurred speech and slowed thinking.',
  },
  {
    name: 'Very Severe Intoxication',
    min: 0.15,
    max: 0.3,
    color: 'rgba(250, 138, 25, 0.2)',
    description:
      'You may experience an altered mood, nausea and vomiting and loss of balance and some muscle control. You may experience memory blackout.',
  },
  {
    name: 'Alcohol Poisoning Risk',
    min: 0.3,
    max: 0.4,
    color: 'rgba(255, 0, 0, 0.2)',
    description:
      'You likely have alcohol poisoning, a potentially life-threatening condition, you may experience loss of consciousness. Seek medical attention.',
  },
  {
    name: 'Potentially Fatal',
    min: 0.4,
    max: Number.MAX_SAFE_INTEGER,
    color: 'rgba(255, 0, 0, 0.2)',
    description:
      "This is a potentially fatal blood alcohol level. You're at risk of coma and death from respiratory arrest.",
  },
];

const getBacZone = (bac: number) => {
  return bloodAlcoholContentZones.find((zone) => bac >= zone.min && bac < zone.max);
};

export default getBacZone;
