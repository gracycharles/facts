import { FACTS_1_TO_10 } from './facts1to10';
import { FACTS_11_TO_20 } from './facts11to20';
import { FACTS_21_TO_30 } from './facts21to30';
import { FACTS_31_TO_40 } from './facts31to40';
import { FACTS_41_TO_50 } from './facts41to50';
import { ShortsBlueprint } from '../../types';

export const ALL_50_SCOTLAND_FACTS: ShortsBlueprint[] = [
  ...FACTS_1_TO_10,
  ...FACTS_11_TO_20,
  ...FACTS_21_TO_30,
  ...FACTS_31_TO_40,
  ...FACTS_41_TO_50,
];

export {
  FACTS_1_TO_10,
  FACTS_11_TO_20,
  FACTS_21_TO_30,
  FACTS_31_TO_40,
  FACTS_41_TO_50,
};
