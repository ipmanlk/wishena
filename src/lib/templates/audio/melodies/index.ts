import type { Note } from "@/lib/types";

export { babyShowerHarmony, babyShowerMelody } from "./collections/baby-shower";
export { goldenHourHarmony, goldenHourMelody } from "./collections/celebration";
export {
  cherryBlossomHarmony,
  cherryBlossomMelody,
} from "./collections/cherry-blossom";
export { cityLightsHarmony, cityLightsMelody } from "./collections/city-lights";
export {
  gardenBloomHarmony,
  gardenBloomMelody,
} from "./collections/garden-bloom";
export {
  goldenAnniversaryHarmony,
  goldenAnniversaryMelody,
} from "./collections/golden-anniversary";
export {
  graduationDayHarmony,
  graduationDayMelody,
} from "./collections/graduation-day";
export {
  harvestMoonHarmony,
  harvestMoonMelody,
} from "./collections/harvest-moon";
export {
  lavenderFieldsHarmony,
  lavenderFieldsMelody,
} from "./collections/lavender-fields";
export { sunsetLoveHarmony, sunsetLoveMelody } from "./collections/love";
export {
  midnightDreamHarmony,
  midnightDreamMelody,
} from "./collections/midnight-dream";
export {
  morningCoffeeHarmony,
  morningCoffeeMelody,
} from "./collections/morning-coffee";
export {
  mountainSummitHarmony,
  mountainSummitMelody,
} from "./collections/mountain-summit";
export { forestCalmHarmony, forestCalmMelody } from "./collections/nature";
export { oceanBreezeHarmony, oceanBreezeMelody } from "./collections/ocean";
export {
  midnightGlowHarmony,
  midnightGlowMelody,
} from "./collections/party";
export { starlightHarmony, starlightMelody } from "./collections/starlight";
export {
  thankYouBloomHarmony,
  thankYouBloomMelody,
} from "./collections/thank-you-bloom";
export {
  tropicalSunsetHarmony,
  tropicalSunsetMelody,
} from "./collections/tropical-sunset";
export {
  winterWonderlandHarmony,
  winterWonderlandMelody,
} from "./collections/winter";

import { babyShowerHarmony, babyShowerMelody } from "./collections/baby-shower";
import { goldenHourHarmony, goldenHourMelody } from "./collections/celebration";
import {
  cherryBlossomHarmony,
  cherryBlossomMelody,
} from "./collections/cherry-blossom";
import { cityLightsHarmony, cityLightsMelody } from "./collections/city-lights";
import {
  gardenBloomHarmony,
  gardenBloomMelody,
} from "./collections/garden-bloom";
import {
  goldenAnniversaryHarmony,
  goldenAnniversaryMelody,
} from "./collections/golden-anniversary";
import {
  graduationDayHarmony,
  graduationDayMelody,
} from "./collections/graduation-day";
import {
  harvestMoonHarmony,
  harvestMoonMelody,
} from "./collections/harvest-moon";
import {
  lavenderFieldsHarmony,
  lavenderFieldsMelody,
} from "./collections/lavender-fields";
import { sunsetLoveHarmony, sunsetLoveMelody } from "./collections/love";
import {
  midnightDreamHarmony,
  midnightDreamMelody,
} from "./collections/midnight-dream";
import {
  morningCoffeeHarmony,
  morningCoffeeMelody,
} from "./collections/morning-coffee";
import {
  mountainSummitHarmony,
  mountainSummitMelody,
} from "./collections/mountain-summit";
import { forestCalmHarmony, forestCalmMelody } from "./collections/nature";
import { oceanBreezeHarmony, oceanBreezeMelody } from "./collections/ocean";
import { midnightGlowHarmony, midnightGlowMelody } from "./collections/party";
import { starlightHarmony, starlightMelody } from "./collections/starlight";
import {
  thankYouBloomHarmony,
  thankYouBloomMelody,
} from "./collections/thank-you-bloom";
import {
  tropicalSunsetHarmony,
  tropicalSunsetMelody,
} from "./collections/tropical-sunset";
import {
  winterWonderlandHarmony,
  winterWonderlandMelody,
} from "./collections/winter";

/**
 * Melody collections by template ID for easy lookup
 */
export const melodiesByTemplate: Record<
  string,
  { melody: Note[]; harmony?: Note[] }
> = {
  "gentle-celebration": {
    melody: goldenHourMelody,
    harmony: goldenHourHarmony,
  },
  "neon-birthday": {
    melody: midnightGlowMelody,
    harmony: midnightGlowHarmony,
  },
  "snowy-winter": {
    melody: winterWonderlandMelody,
    harmony: winterWonderlandHarmony,
  },
  "ocean-breeze": {
    melody: oceanBreezeMelody,
    harmony: oceanBreezeHarmony,
  },
  "sunset-love": {
    melody: sunsetLoveMelody,
    harmony: sunsetLoveHarmony,
  },
  "forest-calm": {
    melody: forestCalmMelody,
    harmony: forestCalmHarmony,
  },
  "cherry-blossom": {
    melody: cherryBlossomMelody,
    harmony: cherryBlossomHarmony,
  },
  starlight: {
    melody: starlightMelody,
    harmony: starlightHarmony,
  },
  "morning-coffee": {
    melody: morningCoffeeMelody,
    harmony: morningCoffeeHarmony,
  },
  "lavender-fields": {
    melody: lavenderFieldsMelody,
    harmony: lavenderFieldsHarmony,
  },
  "harvest-moon": {
    melody: harvestMoonMelody,
    harmony: harvestMoonHarmony,
  },
  "city-lights": {
    melody: cityLightsMelody,
    harmony: cityLightsHarmony,
  },
  "tropical-sunset": {
    melody: tropicalSunsetMelody,
    harmony: tropicalSunsetHarmony,
  },
  "mountain-summit": {
    melody: mountainSummitMelody,
    harmony: mountainSummitHarmony,
  },
  "garden-bloom": {
    melody: gardenBloomMelody,
    harmony: gardenBloomHarmony,
  },
  "midnight-dream": {
    melody: midnightDreamMelody,
    harmony: midnightDreamHarmony,
  },
  "golden-anniversary": {
    melody: goldenAnniversaryMelody,
    harmony: goldenAnniversaryHarmony,
  },
  "baby-shower": {
    melody: babyShowerMelody,
    harmony: babyShowerHarmony,
  },
  "graduation-day": {
    melody: graduationDayMelody,
    harmony: graduationDayHarmony,
  },
  "thank-you-bloom": {
    melody: thankYouBloomMelody,
    harmony: thankYouBloomHarmony,
  },
};
