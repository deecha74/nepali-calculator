import type { DocDef } from './types';
import { rentAgreement } from './rent';
import { partnershipDeed } from './partnership';
import { aoa } from './aoa';

export const DOC_DEFS: Record<string, DocDef> = {
  'rent-agreement': rentAgreement,
  aoa,
  'partnership-deed': partnershipDeed,
};
