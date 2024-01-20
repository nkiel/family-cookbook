export enum UncommonUnits {
  DROP = 'dr',
  SMIDGEN = 'smdg',
  PINCH = 'pn',
  DASH = 'ds',
  BOX = 'bx',
  BAG = 'bg',
}

export enum ImperialUnits {
  TEASPOON = 'tsp',
  TABLESPOON = 'tbsp',
  CUP = 'c',
  PINT = 'pt',
  QUART = 'qt',
  GALLON = 'gal',
  OUNCE = 'oz',
  FLUID_OUNCE = 'floz',
  POUND = 'lb',
}

export enum MetricUnits {
  MILLILITER = 'ml',
  LITER = 'l',
  GRAM = 'g',
  KILOGRAM = 'kg',
}

export const Units = { ...UncommonUnits, ...ImperialUnits, ...MetricUnits };

export enum SIPrefix {
  'peta' = 15,
  'tera' = 12,
  'giga' = 9,
  'mega' = 6,
  'kilo' = 3,
  'hecto' = 2,
  'deka' = 1,
  '' = 0,
  'deci' = -1,
  'centi' = -2,
  'milli' = -3,
  'micro' = -6,
  'nano' = -9,
  'pico' = -12,
}

export class Measurement {
  unit!: MetricUnits | ImperialUnits | UncommonUnits;

  factor?: SIPrefix;

  quantity!: number;
}
