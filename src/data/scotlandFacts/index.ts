import { FACTS_1_TO_10 } from './facts1to10';
import { FACTS_11_TO_20 } from './facts11to20';
import { FACTS_21_TO_30 } from './facts21to30';
import { FACTS_31_TO_40 } from './facts31to40';
import { FACTS_41_TO_50 } from './facts41to50';
import { FACTS_51_TO_60 } from './facts51to60';
import { FACTS_61_TO_70 } from './facts61to70';
import { FACTS_71_TO_80 } from './facts71to80';
import { FACTS_81_TO_90 } from './facts81to90';
import { FACTS_91_TO_100 } from './facts91to100';
import { ShortsBlueprint } from '../../types';

export const ALL_100_SCOTLAND_FACTS: ShortsBlueprint[] = [
  ...FACTS_1_TO_10,
  ...FACTS_11_TO_20,
  ...FACTS_21_TO_30,
  ...FACTS_31_TO_40,
  ...FACTS_41_TO_50,
  ...FACTS_51_TO_60,
  ...FACTS_61_TO_70,
  ...FACTS_71_TO_80,
  ...FACTS_81_TO_90,
  ...FACTS_91_TO_100,
];

// Backwards-compatible export
export const ALL_50_SCOTLAND_FACTS: ShortsBlueprint[] = ALL_100_SCOTLAND_FACTS;

export {
  FACTS_1_TO_10,
  FACTS_11_TO_20,
  FACTS_21_TO_30,
  FACTS_31_TO_40,
  FACTS_41_TO_50,
  FACTS_51_TO_60,
  FACTS_61_TO_70,
  FACTS_71_TO_80,
  FACTS_81_TO_90,
  FACTS_91_TO_100,
};

