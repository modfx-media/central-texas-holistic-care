/**
 * Programmatic SEO source of truth.
 *
 * Every /areas-we-serve/* URL is generated from this file. Flip `live: true`
 * on a city or service to include it in the sitemap and pre-render its pages.
 *
 * Adding a new city/service:
 *   1. Append a new entry to CITIES or SERVICES with live: false
 *   2. Fill in real, researched data (not generic copy)
 *   3. Verify the page renders at /areas-we-serve/<slug>/[service]/
 *   4. Flip live: true once content is reviewed
 *   5. Submit the URL to Search Console (do not bulk-submit)
 */

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type CityCharacter =
  | "military"
  | "suburban-professional"
  | "college-town"
  | "medical-hub"
  | "rural"
  | "historic-village";

export type City = {
  /** URL slug, kebab-case, no spaces. */
  slug: string;
  /** Display name, e.g. "Harker Heights". */
  name: string;
  /** Possessive form, e.g. "Harker Heights'", used in headings. */
  possessive: string;
  /** County name without the word "County". */
  county: string;
  state: "Texas";
  /** ZIP codes served, populates Schema.org areaServed. */
  zipCodes: string[];
  lat: number;
  lng: number;
  population: number;
  /** Door-to-door drive time from 311 E. Stan Schlueter Loop, Killeen, TX 76542. */
  driveTimeMin: number;
  /** Primary route used to reach the clinic from this city. */
  primaryRoute: string;
  /** What this place is locally known for (1 short clause). */
  character: CityCharacter;
  /** One-sentence local color used in intros, keep specific. */
  shortDescription: string;
  /** Top employers / industries, pulled into "Who we treat" copy. */
  industries: string[];
  /** Named landmarks (parks, schools, businesses) for unique local context. */
  landmarks: string[];
  /** Slugs of cities used for internal linking on this page. */
  surroundingCitySlugs: string[];
  /** When true, included in sitemap + generateStaticParams. */
  live: boolean;
};

export type ServiceFAQ = (city: City) => { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Plural / casual phrasing for body copy (e.g. "hormone replacement"). */
  shortName: string;
  /** Canonical service hub on the main site, used in internal links. */
  hubHref: string;
  /** Primary keyword phrase, lowercase. */
  primaryKeyword: string;
  /** Secondary phrasings to weave naturally into copy. */
  secondaryKeywords: string[];
  /** 1-2 sentence summary used in meta description templates and hero. */
  shortDescription: string;
  /** 3-4 sentence overview used in the page intro. */
  longDescription: string;
  /** Bullet-style benefits, 5 to 7 items. */
  benefits: string[];
  /** Problems / symptoms this service addresses. */
  addresses: string[];
  /** 4-step treatment process; titles are also used as H3s. */
  process: { title: string; body: string }[];
  /** Generic FAQs (no city interpolation). */
  baseFaqs: { q: string; a: string }[];
  /** Localized FAQs that vary by city. */
  localFaqs: ServiceFAQ[];
  /** Schema.org medical type. */
  schemaType: "MedicalTherapy" | "MedicalProcedure" | "PreventiveProcedure";
  /** Schema.org MedicalSpecialty value. */
  schemaSpecialty: string;
  live: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Cities                                   */
/* -------------------------------------------------------------------------- */

export const CITIES: ReadonlyArray<City> = [
  {
    slug: "killeen",
    name: "Killeen",
    possessive: "Killeen's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76540", "76541", "76542", "76543", "76544", "76549"],
    lat: 31.1171,
    lng: -97.7278,
    population: 156768,
    driveTimeMin: 5,
    primaryRoute: "East Stan Schlueter Loop / US-190",
    character: "military",
    shortDescription:
      "Home to Fort Cavazos and one of the youngest, most active populations in Central Texas, a community that needs care built around shift work, deployment schedules, and high physical demand.",
    industries: [
      "Fort Cavazos service members and families",
      "first responders and law enforcement",
      "shift-working healthcare staff",
      "small-business owners along South Fort Hood Street",
    ],
    landmarks: [
      "Fort Cavazos main gate (Clear Creek)",
      "Stewart C. Meyer Harker Heights / Killeen Public Library",
      "Lions Club Park",
      "Killeen Mall",
      "Long Branch Park",
    ],
    surroundingCitySlugs: ["harker-heights", "copperas-cove", "nolanville", "belton"],
    live: true,
  },
  {
    slug: "harker-heights",
    name: "Harker Heights",
    possessive: "Harker Heights'",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76548"],
    lat: 31.0846,
    lng: -97.6597,
    population: 35878,
    driveTimeMin: 9,
    primaryRoute: "US-190 East / FM 2410",
    character: "suburban-professional",
    shortDescription:
      "A growing professional suburb along US-190 with strong household incomes, an active retiree population, and a community that prioritizes preventive, longevity-focused medicine.",
    industries: [
      "dual-income professionals commuting to Killeen and Temple",
      "retired military officers",
      "small-business and healthcare professionals",
      "youth-sports families along Knights Way",
    ],
    landmarks: [
      "Carl Levin Park",
      "Stewart C. Meyer Harker Heights Library",
      "Market Heights shopping center",
      "Dana Peak Park (Lake Belton)",
      "Skipcha Mountain Trail",
    ],
    surroundingCitySlugs: ["killeen", "nolanville", "belton", "copperas-cove"],
    live: true,
  },
  {
    slug: "copperas-cove",
    name: "Copperas Cove",
    possessive: "Copperas Cove's",
    county: "Coryell",
    state: "Texas",
    zipCodes: ["76522"],
    lat: 31.1196,
    lng: -97.9111,
    population: 36079,
    driveTimeMin: 20,
    primaryRoute: "US-190 West",
    character: "military",
    shortDescription:
      "A close-knit community on the western edge of Fort Cavazos where many active-duty and retired military families settle for the schools, the quieter pace, and quick access to West Range training areas.",
    industries: [
      "Fort Cavazos west-side military families",
      "Copperas Cove ISD educators and staff",
      "small-business owners along Business 190",
      "VA-connected retirees",
    ],
    landmarks: [
      "City Park (Copperas Cove)",
      "Five Hills Performing Arts Theater",
      "Ogletree Gap Preserve",
      "South Park",
      "the Copperas Cove Civic Center",
    ],
    surroundingCitySlugs: ["killeen", "lampasas", "harker-heights"],
    live: true,
  },

  /* ───────────────── Staged, not live, no sitemap entry yet ───────────────── */

  {
    slug: "belton",
    name: "Belton",
    possessive: "Belton's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76513"],
    lat: 31.0563,
    lng: -97.4641,
    population: 25060,
    driveTimeMin: 25,
    primaryRoute: "I-14 / US-190 East",
    character: "college-town",
    shortDescription:
      "Anchored by the University of Mary Hardin-Baylor and the Bell County courthouse square, with families balancing campus life, downtown businesses, and Lake Belton recreation.",
    industries: [
      "University of Mary Hardin-Baylor faculty and students",
      "Bell County government and legal professionals",
      "downtown small-business owners",
      "Lake Belton recreation families",
    ],
    landmarks: [
      "the historic Bell County Courthouse",
      "University of Mary Hardin-Baylor campus",
      "Miller Springs Nature Center",
      "Lake Belton",
      "Heritage Park",
    ],
    surroundingCitySlugs: ["harker-heights", "killeen", "temple", "salado"],
    live: true,
  },
  {
    slug: "temple",
    name: "Temple",
    possessive: "Temple's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76501", "76502", "76504"],
    lat: 31.0982,
    lng: -97.3428,
    population: 89000,
    driveTimeMin: 35,
    primaryRoute: "I-14 East to I-35 North",
    character: "medical-hub",
    shortDescription:
      "A regional medical and rail hub built around Baylor Scott & White and a growing biotech corridor, a community already comfortable with integrative, lab-driven care.",
    industries: [
      "Baylor Scott & White Medical Center clinicians and staff",
      "BNSF rail employees",
      "Temple College students and faculty",
      "manufacturing and logistics professionals",
    ],
    landmarks: [
      "Baylor Scott & White Memorial Hospital",
      "the Railroad and Heritage Museum",
      "Miller Park",
      "Temple College",
      "Lions Park",
    ],
    surroundingCitySlugs: ["belton", "salado", "harker-heights", "killeen"],
    live: true,
  },

  /* ───────────────── Expanded Central Texas catchment ───────────────── */

  {
    slug: "nolanville",
    name: "Nolanville",
    possessive: "Nolanville's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76559"],
    lat: 31.0813,
    lng: -97.6022,
    population: 6035,
    driveTimeMin: 12,
    primaryRoute: "US-190 East",
    character: "suburban-professional",
    shortDescription:
      "A fast-growing bedroom community between Killeen and Belton along US-190, popular with young families and military households who want a quieter street with quick access to the post.",
    industries: ["Fort Cavazos military families", "commuters to Killeen and Temple", "Nolanville ISD families", "local small businesses"],
    landmarks: ["Monarch Park", "the Nolanville City Hall", "10th Street and Old Hwy 190", "Nolanville Veterans Memorial"],
    surroundingCitySlugs: ["harker-heights", "belton", "killeen"],
    live: true,
  },
  {
    slug: "salado",
    name: "Salado",
    possessive: "Salado's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76571"],
    lat: 30.9477,
    lng: -97.5392,
    population: 2378,
    driveTimeMin: 30,
    primaryRoute: "I-35 South via I-14",
    character: "historic-village",
    shortDescription:
      "A historic Chisholm Trail village along Salado Creek with art galleries, the Stagecoach Inn, and weekend visitors from Austin and Waco, a community drawn to slower-paced, personalized care.",
    industries: ["hospitality and tourism along Main Street", "artists and gallery owners", "retirees and second-home owners", "Salado ISD families"],
    landmarks: ["the Stagecoach Inn", "Salado Creek", "Pace Park", "Salado Sculpture Garden", "Mill Creek Country Club"],
    surroundingCitySlugs: ["belton", "temple", "harker-heights"],
    live: true,
  },
  {
    slug: "holland",
    name: "Holland",
    possessive: "Holland's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76534"],
    lat: 30.8782,
    lng: -97.4011,
    population: 1158,
    driveTimeMin: 40,
    primaryRoute: "FM 1123 to I-14 / US-190 West",
    character: "rural",
    shortDescription:
      "A small east-Bell County farming community south of Temple, with families that drive to Killeen for specialty care and prefer providers who remember them by name.",
    industries: ["farming and ranching", "Holland ISD educators", "Temple-area commuters"],
    landmarks: ["the Holland Historic Square", "Holland City Park", "Holland ISD"],
    surroundingCitySlugs: ["temple", "belton", "rogers"],
    live: true,
  },
  {
    slug: "rogers",
    name: "Rogers",
    possessive: "Rogers'",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76569"],
    lat: 30.9319,
    lng: -97.2278,
    population: 1217,
    driveTimeMin: 45,
    primaryRoute: "FM 437 to FM 1123 to I-14 West",
    character: "rural",
    shortDescription:
      "A close-knit east-Bell County farming town near the Milam County line, where patients value continuity, plain-spoken care, and providers who explain the why behind every lab.",
    industries: ["row-crop and cattle agriculture", "Rogers ISD educators", "small business and service trades"],
    landmarks: ["Rogers City Park", "the Rogers Historic Downtown", "Rogers ISD"],
    surroundingCitySlugs: ["temple", "holland", "bartlett"],
    live: true,
  },
  {
    slug: "little-river-academy",
    name: "Little River-Academy",
    possessive: "Little River-Academy's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76554"],
    lat: 30.9876,
    lng: -97.3603,
    population: 2113,
    driveTimeMin: 22,
    primaryRoute: "FM 95 to I-14 / US-190",
    character: "rural",
    shortDescription:
      "A growing community along the Little River south of Belton, with Academy ISD families, small-business owners, and a steady mix of retirees and young households.",
    industries: ["Academy ISD educators and staff", "Belton and Temple commuters", "small business and trades", "farming"],
    landmarks: ["Academy ISD campus", "the Little River bridges on FM 95", "Heritage Hall"],
    surroundingCitySlugs: ["belton", "temple", "holland"],
    live: true,
  },
  {
    slug: "troy",
    name: "Troy",
    possessive: "Troy's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76579"],
    lat: 31.1965,
    lng: -97.2989,
    population: 2491,
    driveTimeMin: 40,
    primaryRoute: "I-35 South to I-14 West",
    character: "rural",
    shortDescription:
      "A growing I-35 commuter town north of Temple, with Troy ISD families and a steady flow of new residents priced out of larger Bell County cities.",
    industries: ["Troy ISD educators", "Temple and Waco commuters", "logistics and trucking along I-35"],
    landmarks: ["Troy High School", "Troy City Park", "the I-35 service corridor"],
    surroundingCitySlugs: ["temple", "belton"],
    live: true,
  },
  {
    slug: "morgans-point-resort",
    name: "Morgan's Point Resort",
    possessive: "Morgan's Point Resort's",
    county: "Bell",
    state: "Texas",
    zipCodes: ["76513"],
    lat: 31.1486,
    lng: -97.4314,
    population: 4742,
    driveTimeMin: 25,
    primaryRoute: "FM 2305 to I-14 / US-190",
    character: "suburban-professional",
    shortDescription:
      "A lakefront community on Lake Belton's southern shore, popular with retirees, anglers, and active families who want a wellness clinic that supports an outdoor lifestyle.",
    industries: ["retirees and lakefront homeowners", "Belton and Temple commuters", "marine and recreation businesses"],
    landmarks: ["Lake Belton", "Morgan's Point Golf Course", "Yankee Cove Marina"],
    surroundingCitySlugs: ["belton", "temple", "harker-heights"],
    live: true,
  },
  {
    slug: "lampasas",
    name: "Lampasas",
    possessive: "Lampasas'",
    county: "Lampasas",
    state: "Texas",
    zipCodes: ["76550"],
    lat: 31.0635,
    lng: -98.1817,
    population: 7969,
    driveTimeMin: 40,
    primaryRoute: "US-190 West",
    character: "historic-village",
    shortDescription:
      "The Lampasas County seat along the Lampasas River, anchored by a historic courthouse square, a strong veteran community, and families who prefer integrative care over big-system clinics.",
    industries: ["Lampasas County government and legal professionals", "Lampasas ISD educators", "veteran retirees", "ranching and agribusiness"],
    landmarks: ["the Lampasas County Courthouse square", "Hancock Springs Park", "Hanna Springs", "Campbell Park"],
    surroundingCitySlugs: ["kempner", "copperas-cove", "killeen"],
    live: true,
  },
  {
    slug: "kempner",
    name: "Kempner",
    possessive: "Kempner's",
    county: "Lampasas",
    state: "Texas",
    zipCodes: ["76539"],
    lat: 31.0904,
    lng: -97.9939,
    population: 1366,
    driveTimeMin: 25,
    primaryRoute: "US-190 West",
    character: "rural",
    shortDescription:
      "A small US-190 community west of Copperas Cove with a heavy mix of active-duty Fort Cavazos families, retirees, and small ranchers who want care close to home.",
    industries: ["Fort Cavazos military families", "ranching and agriculture", "Lampasas County commuters"],
    landmarks: ["Kempner City Hall", "the US-190 corridor", "Lampasas River crossings"],
    surroundingCitySlugs: ["copperas-cove", "lampasas", "killeen"],
    live: true,
  },
  {
    slug: "gatesville",
    name: "Gatesville",
    possessive: "Gatesville's",
    county: "Coryell",
    state: "Texas",
    zipCodes: ["76528"],
    lat: 31.4351,
    lng: -97.7475,
    population: 13266,
    driveTimeMin: 40,
    primaryRoute: "US-84 to TX-36 South",
    character: "historic-village",
    shortDescription:
      "The Coryell County seat with a historic courthouse square, a strong farming and ranching base, and a large state-employee population who travel to Killeen for specialty wellness care.",
    industries: ["Coryell County government", "Texas Department of Criminal Justice staff", "ranching and agribusiness", "Gatesville ISD"],
    landmarks: ["the Coryell County Courthouse square", "Faunt Le Roy Park", "Gatesville City Park", "the historic Spur 54 corridor"],
    surroundingCitySlugs: ["copperas-cove", "killeen"],
    live: true,
  },
  {
    slug: "evant",
    name: "Evant",
    possessive: "Evant's",
    county: "Coryell",
    state: "Texas",
    zipCodes: ["76525"],
    lat: 31.4823,
    lng: -98.1467,
    population: 432,
    driveTimeMin: 60,
    primaryRoute: "US-281 / US-84 East",
    character: "rural",
    shortDescription:
      "A small Hill Country town on the Coryell-Hamilton county line along US-281, with ranching families and retirees who appreciate a clinic that takes the time to listen.",
    industries: ["ranching and agriculture", "Evant ISD educators", "retirees"],
    landmarks: ["Evant City Park", "the US-281 / US-84 junction", "Evant ISD campus"],
    surroundingCitySlugs: ["lampasas", "gatesville", "copperas-cove"],
    live: false,
  },
  {
    slug: "lometa",
    name: "Lometa",
    possessive: "Lometa's",
    county: "Lampasas",
    state: "Texas",
    zipCodes: ["76853"],
    lat: 31.2138,
    lng: -98.3933,
    population: 829,
    driveTimeMin: 55,
    primaryRoute: "US-190 West",
    character: "rural",
    shortDescription:
      "A quiet ranching community west of Lampasas along US-190, with multi-generational Texas families who want straightforward, lab-driven care without the noise of a big-city clinic.",
    industries: ["cattle ranching", "Lometa ISD", "small businesses along US-190"],
    landmarks: ["Lometa City Park", "the Colorado River bridges", "the historic Lometa rail line"],
    surroundingCitySlugs: ["lampasas", "kempner"],
    live: false,
  },
  {
    slug: "burnet",
    name: "Burnet",
    possessive: "Burnet's",
    county: "Burnet",
    state: "Texas",
    zipCodes: ["78611"],
    lat: 30.7585,
    lng: -98.2284,
    population: 6627,
    driveTimeMin: 70,
    primaryRoute: "US-281 South via US-183",
    character: "historic-village",
    shortDescription:
      "The Hill Country gateway and Burnet County seat, with bluebonnet tourism, a steady stream of retirees, and active families who want a wellness clinic that fits a longer drive.",
    industries: ["Hill Country tourism and hospitality", "Burnet ISD", "retirees and Lake Buchanan homeowners", "small business"],
    landmarks: ["the Burnet County Courthouse square", "Inks Lake State Park", "Longhorn Cavern", "Hamilton Creek Park"],
    surroundingCitySlugs: ["lampasas", "marble-falls"],
    live: false,
  },
  {
    slug: "marble-falls",
    name: "Marble Falls",
    possessive: "Marble Falls'",
    county: "Burnet",
    state: "Texas",
    zipCodes: ["78654"],
    lat: 30.5783,
    lng: -98.2728,
    population: 7233,
    driveTimeMin: 80,
    primaryRoute: "US-281 South",
    character: "historic-village",
    shortDescription:
      "A Highland Lakes destination on the Colorado River with a strong retiree and second-home population, art galleries, and patients who travel to Killeen for integrative wellness care.",
    industries: ["Highland Lakes tourism", "retirees and lakefront homeowners", "Marble Falls ISD", "small business and trades"],
    landmarks: ["Lake Marble Falls", "the historic Granite Mountain quarry", "Lakeside Park", "Sweet Berry Farm"],
    surroundingCitySlugs: ["burnet", "lampasas"],
    live: false,
  },
  {
    slug: "florence",
    name: "Florence",
    possessive: "Florence's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["76527"],
    lat: 30.8421,
    lng: -97.7916,
    population: 1422,
    driveTimeMin: 35,
    primaryRoute: "FM 195 to TX-195 North",
    character: "rural",
    shortDescription:
      "A small Williamson County farming town northwest of Georgetown, with families looking north toward Killeen for specialty hormone, IV, and longevity care.",
    industries: ["ranching and agriculture", "Florence ISD educators", "Georgetown and Liberty Hill commuters"],
    landmarks: ["the Florence Old Bank Building", "Florence City Park", "FM 195 / FM 970 junction"],
    surroundingCitySlugs: ["liberty-hill", "killeen", "salado"],
    live: false,
  },
  {
    slug: "liberty-hill",
    name: "Liberty Hill",
    possessive: "Liberty Hill's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["78642"],
    lat: 30.6635,
    lng: -97.9225,
    population: 6707,
    driveTimeMin: 55,
    primaryRoute: "TX-29 East to TX-195 North",
    character: "suburban-professional",
    shortDescription:
      "A fast-growing master-planned community in northwest Williamson County, with dual-income families, athletes, and professionals who want personalized care outside the Austin metro grind.",
    industries: ["Austin metro tech and professional services", "Liberty Hill ISD", "small business and trades", "youth-sports families"],
    landmarks: ["Liberty Hill Public Library", "the Lions Foundation Park", "TX-29 / Ronald Reagan Blvd"],
    surroundingCitySlugs: ["leander", "georgetown", "florence"],
    live: false,
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    possessive: "Georgetown's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["78626", "78628", "78633"],
    lat: 30.6332,
    lng: -97.6779,
    population: 86507,
    driveTimeMin: 55,
    primaryRoute: "I-35 South",
    character: "suburban-professional",
    shortDescription:
      "Anchored by Southwestern University and Sun City, with one of the fastest-growing populations in Texas and a community that values integrative, lab-driven preventive care.",
    industries: ["Southwestern University faculty and staff", "Sun City Texas retirees", "Williamson County government", "Austin metro tech professionals"],
    landmarks: ["the historic Williamson County Courthouse square", "San Gabriel Park", "Southwestern University", "Sun City Texas", "Blue Hole Park"],
    surroundingCitySlugs: ["round-rock", "liberty-hill", "salado"],
    live: false,
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    possessive: "Round Rock's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["78664", "78665", "78681"],
    lat: 30.5083,
    lng: -97.6789,
    population: 133372,
    driveTimeMin: 70,
    primaryRoute: "I-35 South",
    character: "suburban-professional",
    shortDescription:
      "A major Austin-metro suburb anchored by Dell, Texas State Round Rock, and a Baylor Scott & White campus, with a busy professional base that travels for specialty wellness clinics.",
    industries: ["Dell and tech professionals", "Baylor Scott & White Round Rock clinicians", "Round Rock ISD families", "small business"],
    landmarks: ["Old Settlers Park", "the Dell Diamond", "Round Rock Premium Outlets", "the historic Round Rock"],
    surroundingCitySlugs: ["georgetown", "cedar-park", "leander"],
    live: false,
  },
  {
    slug: "leander",
    name: "Leander",
    possessive: "Leander's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["78641", "78645"],
    lat: 30.5788,
    lng: -97.853,
    population: 75332,
    driveTimeMin: 65,
    primaryRoute: "TX-183A / US-183 North",
    character: "suburban-professional",
    shortDescription:
      "One of the fastest-growing cities in the U.S., with Leander ISD families, Austin metro tech commuters, and a CapMetro rail connection that brings people in from across the region.",
    industries: ["Austin metro tech professionals", "Leander ISD educators and families", "construction and trades", "youth-sports families"],
    landmarks: ["Devine Lake Park", "the CapMetro Leander Station", "Crystal Falls", "Northline downtown district"],
    surroundingCitySlugs: ["cedar-park", "liberty-hill", "round-rock"],
    live: false,
  },
  {
    slug: "cedar-park",
    name: "Cedar Park",
    possessive: "Cedar Park's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["78613"],
    lat: 30.5052,
    lng: -97.8203,
    population: 77595,
    driveTimeMin: 70,
    primaryRoute: "US-183 North",
    character: "suburban-professional",
    shortDescription:
      "A polished Austin-metro suburb anchored by HEB Center and Baylor Scott & White Lakeway, with active families, athletes, and professionals who prioritize longevity-focused medicine.",
    industries: ["Austin metro tech and professional services", "healthcare professionals", "Leander ISD families", "youth-sports families"],
    landmarks: ["HEB Center at Cedar Park", "Brushy Creek Lake Park", "Lakeline Mall", "Bell Boulevard corridor"],
    surroundingCitySlugs: ["leander", "round-rock"],
    live: false,
  },
  {
    slug: "taylor",
    name: "Taylor",
    possessive: "Taylor's",
    county: "Williamson",
    state: "Texas",
    zipCodes: ["76574"],
    lat: 30.5708,
    lng: -97.4092,
    population: 16267,
    driveTimeMin: 70,
    primaryRoute: "TX-95 to I-35 to I-14",
    character: "historic-village",
    shortDescription:
      "A historic Williamson County rail town now home to the Samsung Taylor semiconductor campus, with longtime Texas families and a wave of new tech professionals reshaping the community.",
    industries: ["Samsung Taylor semiconductor employees", "Williamson County government", "Taylor ISD", "agribusiness and rail logistics"],
    landmarks: ["the Samsung Taylor campus", "Murphy Park", "the historic downtown rail district", "Heritage Square"],
    surroundingCitySlugs: ["round-rock", "georgetown"],
    live: false,
  },
  {
    slug: "waco",
    name: "Waco",
    possessive: "Waco's",
    county: "McLennan",
    state: "Texas",
    zipCodes: ["76701", "76704", "76706", "76707", "76708", "76710", "76711", "76712"],
    lat: 31.5493,
    lng: -97.1467,
    population: 138486,
    driveTimeMin: 65,
    primaryRoute: "I-35 North",
    character: "medical-hub",
    shortDescription:
      "A regional anchor anchored by Baylor University, Magnolia, and three major hospital systems, with patients who already understand integrative wellness and travel south for specialty hormone and IV care.",
    industries: ["Baylor University faculty and staff", "Magnolia and Silos-area small business", "Ascension Providence and Baylor Scott & White clinicians", "manufacturing and logistics"],
    landmarks: ["Magnolia Market at the Silos", "Baylor University", "Cameron Park", "the Waco Suspension Bridge"],
    surroundingCitySlugs: ["hewitt", "woodway", "temple"],
    live: false,
  },
  {
    slug: "hewitt",
    name: "Hewitt",
    possessive: "Hewitt's",
    county: "McLennan",
    state: "Texas",
    zipCodes: ["76643"],
    lat: 31.4587,
    lng: -97.1958,
    population: 16711,
    driveTimeMin: 55,
    primaryRoute: "I-35 South",
    character: "suburban-professional",
    shortDescription:
      "A growing Waco-area suburb along I-35 with Midway ISD families, dual-income professionals, and a community oriented around preventive, longevity-focused medicine.",
    industries: ["Waco-area commuters", "Midway ISD educators and families", "healthcare professionals", "small business"],
    landmarks: ["Warren Park", "Hewitt Park", "the I-35 / Sun Valley corridor"],
    surroundingCitySlugs: ["woodway", "waco", "lorena"],
    live: false,
  },
  {
    slug: "woodway",
    name: "Woodway",
    possessive: "Woodway's",
    county: "McLennan",
    state: "Texas",
    zipCodes: ["76712"],
    lat: 31.4998,
    lng: -97.2275,
    population: 9536,
    driveTimeMin: 60,
    primaryRoute: "TX-6 East to I-35 South",
    character: "suburban-professional",
    shortDescription:
      "A leafy west-Waco professional suburb with strong household incomes, Midway ISD families, and a community known for preventive care and longevity planning.",
    industries: ["Waco professional services", "Midway ISD families", "physicians and healthcare leadership", "retirees"],
    landmarks: ["Carleen Bright Arboretum", "Woodway Park", "Midway High School", "Lake Air Drive corridor"],
    surroundingCitySlugs: ["hewitt", "waco"],
    live: false,
  },
  {
    slug: "lorena",
    name: "Lorena",
    possessive: "Lorena's",
    county: "McLennan",
    state: "Texas",
    zipCodes: ["76655"],
    lat: 31.3899,
    lng: -97.215,
    population: 1733,
    driveTimeMin: 50,
    primaryRoute: "I-35 South",
    character: "rural",
    shortDescription:
      "A small I-35 community south of Waco with Lorena ISD families, agriculture roots, and a steady mix of new residents drawn by the schools and the quieter pace.",
    industries: ["Lorena ISD educators and families", "Waco and Temple commuters", "agriculture", "logistics along I-35"],
    landmarks: ["Lorena City Park", "Lorena ISD campus", "the I-35 / FM 2837 junction"],
    surroundingCitySlugs: ["hewitt", "waco", "temple"],
    live: false,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export const SERVICES: ReadonlyArray<Service> = [
  {
    slug: "hormone-therapy",
    name: "Hormone Therapy",
    shortName: "hormone replacement therapy",
    hubHref: "/hormone-therapy/",
    primaryKeyword: "hormone replacement therapy",
    secondaryKeywords: [
      "bioidentical hormone therapy",
      "BHRT",
      "hormone pellet therapy",
      "low estrogen treatment",
      "low testosterone treatment",
      "perimenopause care",
    ],
    shortDescription:
      "Lab-guided bioidentical hormone replacement therapy (BHRT) for men and women, pellets, injections, creams, and oral options tailored to your bloodwork.",
    longDescription:
      "Our hormone therapy program treats the root drivers of fatigue, brain fog, low libido, sleep disruption, and mood changes by restoring testosterone, estrogen, and progesterone to healthy ranges using bioidentical, body-identical hormones. Every plan starts with comprehensive labs and a clinician-led consult, then matches you to the right delivery method, pellet, injection, topical, or oral, and the right dose. We re-test, adjust, and stay with you for as long as the protocol is active.",
    benefits: [
      "Restored energy and sharper focus within the first few weeks",
      "Improved sleep quality and recovery",
      "Stable mood, lower anxiety, and reduced irritability",
      "Better libido, sexual function, and intimacy",
      "Healthier body composition, leaner mass, less stubborn fat",
      "Improved bone density and long-term cardiovascular markers",
      "A dose adjusted to your labs, not a one-size template",
    ],
    addresses: [
      "low testosterone (Low T) in men 30+",
      "perimenopausal and menopausal symptoms",
      "irregular cycles and PMS-related mood swings",
      "post-partum hormone shifts",
      "thyroid-related fatigue when paired with thyroid optimization",
      "andropause and age-related decline in vitality",
    ],
    process: [
      {
        title: "Comprehensive lab panel",
        body: "We start with a thorough hormone, metabolic, and cardiovascular panel so every dosing decision is grounded in your actual biology, not a checklist.",
      },
      {
        title: "Clinician-led consult",
        body: "You sit down with a provider, not a sales rep, to review symptoms, history, goals, and the trade-offs of each delivery route.",
      },
      {
        title: "Personalized protocol",
        body: "We build a plan around pellets, injections, creams, or oral hormones, and pair it with sleep, nutrition, and supplement support when indicated.",
      },
      {
        title: "Re-test and refine",
        body: "Follow-up labs at the right intervals confirm levels are landing where they should, and we adjust the dose until you feel like yourself again.",
      },
    ],
    baseFaqs: [
      {
        q: "Is bioidentical hormone therapy safe?",
        a: "When prescribed and monitored by a clinician using labs, bioidentical hormone therapy has a strong safety profile. We screen for cardiovascular, prostate, and breast-health risk factors before starting and re-check labs on a defined cadence to keep levels in physiologic ranges.",
      },
      {
        q: "How long until I feel a difference?",
        a: "Most patients notice improvements in energy, sleep, and mood within 2-4 weeks. Libido, body composition, and recovery typically respond over 8-12 weeks as levels stabilize.",
      },
      {
        q: "Which delivery method is best, pellets, injections, or creams?",
        a: "The best route depends on your labs, lifestyle, and how your body absorbs hormones. Pellets are low-maintenance and last 3-5 months; injections offer the most adjustability; creams and oral options work well for many women. We walk you through the trade-offs in your consult.",
      },
      {
        q: "Does insurance cover hormone therapy?",
        a: "Coverage varies by carrier and by therapy type. Many patients use HSA/FSA dollars, and we offer 0% APR financing through Cherry and Denefits so cost is rarely the blocker.",
      },
    ],
    localFaqs: [
      (city) => ({
        q: `Do you treat patients from ${city.name}?`,
        a: `Yes, patients drive in from ${city.name} regularly. Our clinic is roughly ${city.driveTimeMin} minutes from ${city.name} via ${city.primaryRoute}, and many ${city.name} residents bundle their visit with grocery or work errands in Killeen on the same trip.`,
      }),
    ],
    schemaType: "MedicalTherapy",
    schemaSpecialty: "Endocrinology",
    live: true,
  },

  {
    slug: "iv-nutrition",
    name: "IV Nutrition Therapy",
    shortName: "IV nutrition",
    hubHref: "/iv-nutrition/",
    primaryKeyword: "IV nutrition therapy",
    secondaryKeywords: [
      "IV vitamin therapy",
      "IV hydration therapy",
      "vitamin infusion",
      "Myers cocktail",
      "immune IV drip",
      "athletic recovery IV",
    ],
    shortDescription:
      "Clinician-supervised IV infusions delivering hydration, B-complex, vitamin C, magnesium, glutathione, and amino acids directly to your bloodstream for full absorption.",
    longDescription:
      "Our IV nutrition program delivers carefully formulated infusions to the patients who actually need them, people recovering from illness, athletes between training blocks, busy professionals running on empty, and patients with absorption issues that make oral supplementation unreliable. Every drip is built around your goal, immune support, recovery, energy, or a full-body reset, and every infusion is screened and supervised by a clinician, not a kiosk technician.",
    benefits: [
      "Complete bioavailability, 100% absorption, no GI bottleneck",
      "Faster recovery from illness, travel, and physical exertion",
      "Restored hydration and electrolyte balance in 30-45 minutes",
      "Targeted immune support during flu season and pre-travel",
      "A calm, supervised drip room, not a back room or a kiosk",
      "Customizable add-ons (anti-nausea, NAD+, glutathione push) when appropriate",
    ],
    addresses: [
      "post-illness fatigue and lingering viral symptoms",
      "dehydration and electrolyte deficits",
      "athletic recovery and DOMS (delayed onset muscle soreness)",
      "frequent travel, jet lag, and time-zone disruption",
      "high-stress periods with poor sleep and recovery",
      "nutrient absorption issues following GI illness or surgery",
    ],
    process: [
      {
        title: "Brief intake",
        body: "We confirm your goal for the visit, review medications, and check basic vitals before mixing your drip.",
      },
      {
        title: "Custom-mixed infusion",
        body: "Your IV is prepared in-clinic with the exact electrolytes, B-vitamins, antioxidants, and any approved add-ons your protocol calls for.",
      },
      {
        title: "Supervised drip",
        body: "You relax in a private, comfortable chair while the infusion runs, typically 30-60 minutes, with a clinician available at all times.",
      },
      {
        title: "Aftercare and cadence",
        body: "We give you a clear hydration and follow-up plan, and recommend the cadence (one-off, weekly, or monthly) that fits your goal.",
      },
    ],
    baseFaqs: [
      {
        q: "How long does an IV drip take?",
        a: "Most infusions run 30-60 minutes from IV start to finish, including a brief intake and IV placement. NAD+ drips run longer.",
      },
      {
        q: "Will I feel better immediately?",
        a: "Most patients notice improved hydration, energy, and mental clarity within hours. Immune and recovery effects build over the following 24-72 hours.",
      },
      {
        q: "Is IV therapy safe?",
        a: "Every drip is clinician-supervised. We screen briefly before starting, confirm your medications, and adjust formulations based on what you can safely receive.",
      },
      {
        q: "How often should I get an IV?",
        a: "It depends on your goal. For general wellness, monthly works for most patients. For acute illness or athletic blocks, weekly during the period is common. Your provider will recommend a cadence.",
      },
    ],
    localFaqs: [
      (city) => ({
        q: `Can I get an IV drip the same day from ${city.name}?`,
        a: `Same-day appointments are often available depending on the calendar. ${city.name} patients usually reach our Killeen clinic in about ${city.driveTimeMin} minutes via ${city.primaryRoute}, and most plan their drip around lunch or end of day so they can go straight home and rest.`,
      }),
    ],
    schemaType: "MedicalTherapy",
    schemaSpecialty: "InternalMedicine",
    live: true,
  },

  {
    slug: "testosterone-therapy",
    name: "Testosterone Therapy",
    shortName: "testosterone replacement therapy",
    hubHref: "/men/testosterone/",
    primaryKeyword: "testosterone replacement therapy",
    secondaryKeywords: [
      "TRT",
      "low testosterone treatment",
      "Low T clinic",
      "testosterone injections",
      "testosterone pellets",
      "hormone optimization for men",
    ],
    shortDescription:
      "Lab-guided testosterone replacement therapy (TRT) for men, restore energy, strength, focus, libido, and recovery with a clinician-supervised protocol.",
    longDescription:
      "Our testosterone replacement program is built for men who are doing the right things, training, eating well, sleeping, and still feel a step slower than they should. We confirm Low T with bloodwork (total testosterone, free testosterone, estradiol, SHBG, PSA, CBC, and metabolic markers), then match you to the right delivery method and dose. Every plan is overseen by a clinician, with labs re-checked on a schedule so we hit the target range without overshooting.",
    benefits: [
      "Restored energy, drive, and motivation",
      "Improved strength, recovery, and exercise tolerance",
      "Sharper focus and steadier mood",
      "Better libido and sexual function",
      "Leaner body composition over 3-6 months",
      "Improved sleep quality and morning energy",
      "Clear, measured progress with re-checked labs",
    ],
    addresses: [
      "diagnosed low testosterone (typically total T under ~350 ng/dL with symptoms)",
      "persistent fatigue, low motivation, and brain fog",
      "loss of strength and stalled training progress",
      "low libido and erectile changes",
      "weight gain around the midsection despite effort",
      "sleep that doesn't restore, waking unrefreshed",
    ],
    process: [
      {
        title: "Symptom and history review",
        body: "We start with a real conversation about what's changed, your training, sleep, stress, and family history, not a checklist intake.",
      },
      {
        title: "Comprehensive lab panel",
        body: "Total and free testosterone, estradiol, SHBG, PSA, CBC, lipids, and metabolic markers, so we treat the whole picture, not one number.",
      },
      {
        title: "Personalized TRT protocol",
        body: "We match you to injection, pellet, or topical delivery based on labs, lifestyle, and preference, and add ancillary medications only when indicated.",
      },
      {
        title: "Re-test, refine, repeat",
        body: "Follow-up labs at 6-8 weeks confirm we're hitting the right range. From there, we re-check on a defined cadence and adjust as your goals evolve.",
      },
    ],
    baseFaqs: [
      {
        q: "Am I a candidate for TRT?",
        a: "Most men we treat have total testosterone in the low-normal or below-range zone with clear symptoms, fatigue, low libido, slow recovery, mood changes. The lab panel and consult together determine candidacy. We do not start TRT on symptoms alone.",
      },
      {
        q: "How long until I feel a difference?",
        a: "Energy, mood, and libido often respond in the first 2-4 weeks. Strength, body composition, and recovery typically follow over 8-12 weeks as levels stabilize.",
      },
      {
        q: "Will I have to be on TRT for life?",
        a: "Many men stay on TRT long-term because the underlying biology doesn't reverse. Some can pause for fertility windows. We talk through expected duration and fertility planning during your consult.",
      },
      {
        q: "Does TRT affect fertility?",
        a: "TRT can suppress natural sperm production. If fertility is a near-term priority, we discuss alternatives or add medications to preserve fertility before starting.",
      },
    ],
    localFaqs: [
      (city) => ({
        q: `Where can I get TRT near ${city.name}?`,
        a: `Our clinic in Killeen is roughly ${city.driveTimeMin} minutes from ${city.name} via ${city.primaryRoute}, many patients schedule labs and consults back-to-back so they only make the trip once.`,
      }),
    ],
    schemaType: "MedicalTherapy",
    schemaSpecialty: "Endocrinology",
    live: true,
  },

  /* ───────────────── Staged, not live yet ───────────────── */

  {
    slug: "wellness-exams",
    name: "Annual Wellness Exams",
    shortName: "annual wellness exams",
    hubHref: "/men/wellness-exams/",
    primaryKeyword: "annual wellness exam",
    secondaryKeywords: [
      "preventive wellness checkup",
      "executive physical",
      "biomarker labs",
      "longevity-focused physical",
    ],
    shortDescription:
      "Comprehensive annual wellness exams with biomarker labs, cardiovascular screening, and a personalized prevention plan.",
    longDescription:
      "Our annual wellness exam is built to catch the things a standard 15-minute physical misses, early metabolic dysfunction, declining hormone trends, lipid patterns that matter, and modifiable risk factors that change your trajectory over the next ten years.",
    benefits: [
      "Catch problems while they're still reversible",
      "A full picture of metabolic, hormonal, and cardiovascular health",
      "A clear, prioritized prevention plan",
      "Updated immunizations and age-appropriate screenings",
      "Direct access to your provider for follow-up questions",
    ],
    addresses: [
      "annual preventive screening",
      "longevity and healthspan planning",
      "metabolic and cardiovascular risk assessment",
      "hormone-trend baseline",
    ],
    process: [
      { title: "Pre-visit lab work", body: "Comprehensive panel ordered before your visit so the appointment is spent on findings, not waiting." },
      { title: "Physical exam and review", body: "Head-to-toe physical with your provider, plus a review of every lab value." },
      { title: "Personalized plan", body: "Clear next steps, lifestyle, supplementation, screening, or follow-up, written out." },
      { title: "Annual re-check", body: "We schedule your next year on the way out so prevention stays on the calendar." },
    ],
    baseFaqs: [
      { q: "How long is an annual wellness exam?", a: "Plan for 45-60 minutes in clinic, plus your pre-visit lab draw." },
    ],
    localFaqs: [
      (city) => ({ q: `Do you accept new patients from ${city.name}?`, a: `Yes. We welcome new annual wellness patients from ${city.name} and the surrounding ${city.county} County communities.` }),
    ],
    schemaType: "PreventiveProcedure",
    schemaSpecialty: "PrimaryCare",
    live: true,
  },

  {
    slug: "peptide-therapy",
    name: "Peptide Therapy",
    shortName: "peptide therapy",
    hubHref: "/hormone-therapy/",
    primaryKeyword: "peptide therapy",
    secondaryKeywords: [
      "GLP-1 peptide therapy",
      "growth hormone peptides",
      "BPC-157",
      "thymosin alpha-1",
      "longevity peptides",
      "metabolic peptides",
    ],
    shortDescription:
      "Clinician-directed peptide protocols for metabolic health, recovery, immune support, and longevity, with labs, dosing oversight, and follow-up cadence built in.",
    longDescription:
      "Our peptide therapy program uses carefully selected, evidence-backed peptides to support metabolic health, tissue repair, immune resilience, and healthy aging. Every protocol is prescribed and monitored by a clinician after a labs-first consult, no kiosks, no DIY dosing, and no peptides outside of indicated use. We pair peptides with hormone, IV, and lifestyle protocols when it makes sense so the whole picture moves in the right direction.",
    benefits: [
      "Metabolic support and healthier body composition with GLP-1 protocols",
      "Faster recovery from training, surgery, and soft-tissue injury",
      "Improved sleep quality and recovery markers",
      "Immune resilience during high-stress or travel-heavy periods",
      "Targeted longevity support paired with hormone and IV protocols",
      "Clinician oversight, dosing, monitoring, and de-prescribing on schedule",
    ],
    addresses: [
      "stalled weight loss despite training and nutrition effort",
      "slow recovery from training, surgery, or soft-tissue injury",
      "chronic low-grade inflammation and recovery debt",
      "immune dysregulation during high-stress or travel-heavy periods",
      "longevity and healthy-aging goals alongside hormone optimization",
    ],
    process: [
      { title: "Lab-first intake", body: "We start with metabolic, hormone, and inflammatory labs so peptide selection is grounded in your biology." },
      { title: "Clinician-led prescribing", body: "Your provider selects the right peptide (or stack), the right route, and the right dosing window, and explains the trade-offs." },
      { title: "Supervised protocol", body: "You receive your protocol with clear self-administration instructions and a follow-up schedule." },
      { title: "Re-check and adjust", body: "We re-test labs at the right interval and adjust, continue, or step down based on findings, not feelings." },
    ],
    baseFaqs: [
      {
        q: "Which peptides do you prescribe?",
        a: "We prescribe evidence-backed peptides indicated for the goal you bring in, GLP-1 family peptides for metabolic health, BPC-157 and TB-500 for recovery support, thymosin alpha-1 for immune support, and select longevity peptides where appropriate. Every prescription follows current FDA guidance.",
      },
      {
        q: "Is peptide therapy safe?",
        a: "Under physician supervision with the right labs and the right candidate, peptide therapy has a strong safety profile. We screen carefully and re-check labs on a defined cadence.",
      },
      {
        q: "How long does a peptide cycle last?",
        a: "Most protocols run in defined cycles, typically 6-16 weeks, with planned breaks or step-downs. We do not write open-ended prescriptions.",
      },
    ],
    localFaqs: [
      (city) => ({
        q: `Can I get peptide therapy near ${city.name}?`,
        a: `Yes, our Killeen clinic is about ${city.driveTimeMin} minutes from ${city.name} via ${city.primaryRoute}. Most ${city.name} patients schedule labs and the consult back-to-back so they only make the trip once.`,
      }),
    ],
    schemaType: "MedicalTherapy",
    schemaSpecialty: "Endocrinology",
    live: true,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getLiveCities(): City[] {
  return CITIES.filter((c) => c.live);
}

export function getLiveServices(): Service[] {
  return SERVICES.filter((s) => s.live);
}

/**
 * Returns every live city × live service pair. Used for sitemap and
 * generateStaticParams in the [service] route.
 */
export function getLiveCityServicePairs(): { city: City; service: Service }[] {
  const pairs: { city: City; service: Service }[] = [];
  for (const city of getLiveCities()) {
    for (const service of getLiveServices()) {
      pairs.push({ city, service });
    }
  }
  return pairs;
}

/**
 * Returns the N nearest surrounding cities (live only) that we want to
 * cross-link from the given city. Falls back to other live cities if the
 * surrounding list is short.
 */
export function getNearbyCities(city: City, count = 3): City[] {
  const live = getLiveCities().filter((c) => c.slug !== city.slug);
  const ordered: City[] = [];
  for (const slug of city.surroundingCitySlugs) {
    const found = live.find((c) => c.slug === slug);
    if (found) ordered.push(found);
  }
  for (const c of live) {
    if (!ordered.find((o) => o.slug === c.slug)) ordered.push(c);
  }
  return ordered.slice(0, count);
}

/* -------------------------------------------------------------------------- */
/*                                 Treatments                                 */
/* -------------------------------------------------------------------------- */

export type Treatment = {
  slug: string;
  /** Service this treatment belongs to. */
  serviceSlug: string;
  name: string;
  /** Short SEO/meta phrasing for this specific protocol. */
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** 1-sentence summary used in tiles and meta. */
  shortDescription: string;
  /** 2-3 sentence narrative used in the page intro. */
  longDescription: string;
  /** What this protocol typically helps with. */
  indicatedFor: string[];
  /** Concrete benefits patients can expect. */
  benefits: string[];
  /** How this protocol is delivered (route, frequency, monitoring). */
  protocol: string;
  /** 3-4 treatment-specific FAQs (city-agnostic). */
  faqs: { q: string; a: string }[];
  live: boolean;
};

export const TREATMENTS: ReadonlyArray<Treatment> = [
  /* ──────────────────── Hormone Therapy ──────────────────── */
  {
    slug: "bhrt-pellets",
    serviceSlug: "hormone-therapy",
    name: "BHRT Pellet Therapy",
    primaryKeyword: "bioidentical hormone pellet therapy",
    secondaryKeywords: ["BHRT pellets", "hormone pellets", "testosterone pellets", "estradiol pellets"],
    shortDescription:
      "Low-maintenance bioidentical hormone pellets that release a steady physiologic dose for 3 to 5 months.",
    longDescription:
      "Pellet therapy places a small bioidentical hormone implant just under the skin during a quick in-office procedure. The pellet then releases testosterone or estradiol at a steady, physiologic rate for 3 to 5 months, no daily dosing, no peaks and troughs, and no missed-dose effects. It is one of the most consistent ways to keep levels in the right range, and it is especially popular with patients who travel often or prefer to set-and-forget their protocol.",
    indicatedFor: [
      "men with diagnosed Low T who want a low-maintenance protocol",
      "perimenopausal and menopausal women",
      "patients who have not tolerated injections or topicals",
      "patients with adherence challenges or heavy travel schedules",
    ],
    benefits: [
      "Steady physiologic dosing for 3 to 5 months per insertion",
      "No daily creams, gels, or self-injections",
      "Strong real-world adherence and outcomes",
      "Convenient cadence, 2 to 4 visits per year",
    ],
    protocol:
      "Lab-first consult, in-office pellet insertion (10 to 15 minutes), re-check labs at 4 to 6 weeks, then a re-insertion every 3 to 5 months based on labs and symptoms.",
    faqs: [
      { q: "Does the pellet insertion hurt?", a: "We numb the area first, so most patients feel pressure but minimal pain. The procedure takes about 10 to 15 minutes." },
      { q: "How long do pellets last?", a: "Most patients re-dose every 3 to 5 months. Women typically need them less often than men." },
      { q: "Can the dose be adjusted?", a: "Yes. We adjust pellet count and strength at each insertion based on labs and how you feel between cycles." },
    ],
    live: true,
  },
  {
    slug: "bhrt-injections",
    serviceSlug: "hormone-therapy",
    name: "BHRT Injections",
    primaryKeyword: "bioidentical hormone injections",
    secondaryKeywords: ["testosterone cypionate injection", "estradiol injection", "weekly hormone injections", "injectable BHRT"],
    shortDescription:
      "Highly adjustable injectable BHRT with weekly or twice-weekly dosing and tight lab control.",
    longDescription:
      "Injectable bioidentical hormone therapy delivers testosterone cypionate or estradiol on a precise weekly or twice-weekly cadence. Injections give us the tightest control over peaks, troughs, and total weekly dose, which is why they are the preferred route for patients who want labs dialed in to a target range. Most patients self-inject at home after a brief in-clinic teach.",
    indicatedFor: [
      "patients who want tight, lab-targeted control",
      "athletes and high-performers who track recovery markers",
      "patients with absorption issues on topicals",
      "patients who need rapid dose adjustments",
    ],
    benefits: [
      "Most adjustable route, easy to fine-tune the weekly dose",
      "Steady levels with twice-weekly dosing",
      "Lower cost per month than many alternatives",
      "Strong fit for athletes and high-performance goals",
    ],
    protocol:
      "Lab-first consult, an in-clinic injection teach, weekly or twice-weekly self-injection at home, with labs re-checked at 6 to 8 weeks and every 4 to 6 months thereafter.",
    faqs: [
      { q: "Will I be able to inject myself?", a: "Almost everyone we teach is comfortable self-injecting within one or two sessions. We are available by message if you have questions." },
      { q: "Weekly or twice-weekly, which is better?", a: "Twice-weekly dosing yields steadier levels and fewer mood or energy swings for most patients, and is our default." },
      { q: "How fast do injections work?", a: "Most patients feel a difference in energy, mood, and sleep within 2 to 4 weeks. Body composition follows over 2 to 3 months." },
    ],
    live: true,
  },
  {
    slug: "perimenopause-care",
    serviceSlug: "hormone-therapy",
    name: "Perimenopause Hormone Care",
    primaryKeyword: "perimenopause hormone treatment",
    secondaryKeywords: ["perimenopause hormones", "irregular cycles treatment", "perimenopausal mood support", "low progesterone treatment"],
    shortDescription:
      "Targeted hormone support for the 5 to 10 year window before menopause, when cycles, mood, sleep, and energy first start to drift.",
    longDescription:
      "Perimenopause is the long runway before menopause when estrogen and progesterone start fluctuating in ways that disrupt sleep, mood, cycles, and body composition. Our perimenopause protocol starts with comprehensive labs across the cycle, then layers in targeted progesterone, estrogen, or thyroid support based on the actual pattern, not a one-size script.",
    indicatedFor: [
      "irregular or shortening cycles in your late 30s or 40s",
      "new sleep disruption, early-morning wake-ups",
      "mood swings, anxiety, or low motivation",
      "weight redistribution to the midsection",
      "low libido and intimacy changes",
    ],
    benefits: [
      "Targeted relief from sleep, mood, and cycle symptoms",
      "A plan grounded in your actual labs, not your age",
      "Coordination with thyroid and adrenal markers",
      "A long-term plan that flexes into menopause when the time comes",
    ],
    protocol:
      "Cycle-aware lab panel, clinician consult, targeted hormone (often progesterone first), and re-check at 8 to 12 weeks with dose adjustment.",
    faqs: [
      { q: "Am I too young for hormone therapy?", a: "If your labs and symptoms point to perimenopause, hormone support is appropriate. We see patients in their late 30s through 50s." },
      { q: "Do I have to do estrogen?", a: "No. Many perimenopausal patients do well on progesterone alone, especially in the early years." },
      { q: "Will this affect my fertility?", a: "Targeted hormone support in perimenopause does not act as contraception. We discuss your fertility plans and adjust accordingly." },
    ],
    live: true,
  },
  {
    slug: "menopause-care",
    serviceSlug: "hormone-therapy",
    name: "Menopause Hormone Replacement",
    primaryKeyword: "menopause hormone replacement",
    secondaryKeywords: ["menopausal HRT", "post-menopause hormones", "hot flash treatment", "estradiol replacement", "vaginal estrogen"],
    shortDescription:
      "Full bioidentical hormone replacement for menopausal and post-menopausal women, restoring sleep, mood, libido, bone health, and quality of life.",
    longDescription:
      "Menopause is not something to white-knuckle through. Bioidentical hormone replacement, estradiol, progesterone, and selectively testosterone, restores hormone levels into a healthy range that protects bone density, cardiovascular health, and quality of life. Every plan starts with a full lab panel and a real conversation about your history, risk factors, and goals.",
    indicatedFor: [
      "hot flashes, night sweats, and disrupted sleep",
      "menopausal mood changes and brain fog",
      "low libido and vaginal dryness",
      "bone density and long-term cardiovascular concerns",
      "weight gain and body composition shifts",
    ],
    benefits: [
      "Significant reduction in hot flashes and night sweats",
      "Restored sleep, mood, and cognitive sharpness",
      "Better libido, intimacy, and vaginal comfort",
      "Bone density and cardiovascular benefits when started in the right window",
    ],
    protocol:
      "Comprehensive lab panel including hormones, lipids, metabolic and bone markers, clinician consult, BHRT prescription (oral, topical, pellet, or injectable), re-check at 8 to 12 weeks, then on a 6-month cadence.",
    faqs: [
      { q: "Is menopausal HRT safe?", a: "When prescribed and monitored properly, modern bioidentical HRT has a favorable risk profile, especially when started within 10 years of menopause." },
      { q: "Do I need testosterone too?", a: "Many menopausal women benefit from a low dose of testosterone for libido, mood, and lean mass. We decide together based on labs and goals." },
      { q: "How long can I stay on HRT?", a: "Most patients stay on a maintenance dose long-term, with regular labs and risk-factor re-assessment. There is no arbitrary cut-off." },
    ],
    live: true,
  },

  /* ──────────────────── IV Nutrition ──────────────────── */
  {
    slug: "myers-cocktail",
    serviceSlug: "iv-nutrition",
    name: "Myers' Cocktail IV",
    primaryKeyword: "Myers cocktail IV",
    secondaryKeywords: ["Myers cocktail infusion", "B-complex IV", "magnesium IV", "wellness IV drip"],
    shortDescription:
      "The original wellness IV, B-complex, vitamin C, magnesium, and calcium, for a full-body reset in about 45 minutes.",
    longDescription:
      "The Myers' Cocktail is the original wellness IV, a balanced infusion of B-complex vitamins, vitamin C, magnesium, and calcium that delivers a full-body reset in about 45 minutes. It is our most-requested drip and a great place to start if you have never tried IV therapy.",
    indicatedFor: [
      "general wellness and energy support",
      "post-illness recovery",
      "stress-heavy weeks and travel",
      "first-time IV patients",
    ],
    benefits: [
      "Restored hydration in 45 minutes",
      "Higher energy and mental clarity within hours",
      "Better sleep that night for most patients",
      "A clean, low-risk introduction to IV therapy",
    ],
    protocol:
      "Brief intake, IV placement, 30 to 45 minute supervised infusion, recommended cadence is monthly for wellness or weekly during high-demand windows.",
    faqs: [
      { q: "What is in a Myers Cocktail?", a: "B-complex, vitamin C, magnesium, and calcium in a balanced saline base." },
      { q: "How often can I get one?", a: "Monthly is the typical wellness cadence. Weekly is fine during acute recovery or high-stress windows." },
      { q: "Will I feel a difference right away?", a: "Most patients feel more hydrated and clear-headed within an hour and notice better energy and sleep the same day." },
    ],
    live: true,
  },
  {
    slug: "immune-booster",
    serviceSlug: "iv-nutrition",
    name: "Immune Booster IV",
    primaryKeyword: "immune booster IV",
    secondaryKeywords: ["high-dose vitamin C IV", "zinc IV", "immune support drip", "flu season IV"],
    shortDescription:
      "High-dose vitamin C, zinc, and glutathione for immune support before travel, during flu season, or when you feel something coming on.",
    longDescription:
      "Our Immune Booster IV pairs high-dose vitamin C with zinc, B-complex, and a glutathione push for an immune-focused infusion you can use proactively before travel and flu season, or reactively when you start to feel a virus brewing. It is one of our most-booked drips during the late-fall and winter months.",
    indicatedFor: [
      "early cold and flu symptoms",
      "pre-travel and post-travel support",
      "high-exposure professions (healthcare, education, military)",
      "stretches of poor sleep and high stress",
    ],
    benefits: [
      "Targeted antioxidant and immune support",
      "Glutathione push for cellular detox",
      "Most patients feel symptom relief within 24 to 48 hours",
      "Safe to repeat weekly during high-exposure windows",
    ],
    protocol:
      "Brief intake, IV placement, 45 to 60 minute infusion with glutathione push at the end. Repeat weekly during acute exposure windows.",
    faqs: [
      { q: "Will an Immune Booster IV cure my cold?", a: "It does not replace antiviral medication, but most patients feel symptom severity and duration drop noticeably." },
      { q: "Can I get this if I'm already sick?", a: "Yes. We screen briefly before starting and avoid certain add-ons if you are febrile or acutely ill." },
      { q: "How is this different from a Myers Cocktail?", a: "The Immune Booster uses higher-dose vitamin C, adds zinc, and includes a glutathione push at the end." },
    ],
    live: true,
  },
  {
    slug: "athletic-recovery",
    serviceSlug: "iv-nutrition",
    name: "Athletic Recovery IV",
    primaryKeyword: "athletic recovery IV",
    secondaryKeywords: ["workout recovery IV", "amino acid IV", "hydration IV", "post-training IV"],
    shortDescription:
      "Amino acids, electrolytes, B-complex, and magnesium for faster recovery between training blocks, races, and competitions.",
    longDescription:
      "Our Athletic Recovery IV is built for the patient who trains hard, an endurance athlete between race blocks, a lifter chasing a meet, a CrossFitter on a heavy cycle, or a military operator preparing for selection. We blend amino acids, electrolytes, B-complex, and magnesium to restore what training depletes and accelerate the recovery curve.",
    indicatedFor: [
      "endurance and strength athletes between training blocks",
      "race-week and competition-week recovery",
      "delayed-onset muscle soreness (DOMS) you cannot shake",
      "military and tactical athletes in heavy training cycles",
    ],
    benefits: [
      "Faster recovery between training sessions",
      "Reduced DOMS and improved next-day training quality",
      "Restored electrolyte balance after heavy sweat loss",
      "Improved sleep and parasympathetic recovery markers",
    ],
    protocol:
      "Brief intake including training context, IV placement, 45 to 60 minute infusion. Recommended cadence: weekly during heavy training blocks, monthly as a maintenance.",
    faqs: [
      { q: "Should I get this before or after training?", a: "After training is the default. Before-training drips are an option for race or competition prep." },
      { q: "Does this help with cramping?", a: "Yes. The electrolyte and magnesium content addresses the most common causes of training cramps." },
      { q: "Can I get this if I am on TRT?", a: "Absolutely. Many of our TRT patients add an Athletic Recovery IV during heavy training cycles." },
    ],
    live: true,
  },
  {
    slug: "hangover-relief",
    serviceSlug: "iv-nutrition",
    name: "Hangover Relief IV",
    primaryKeyword: "hangover IV",
    secondaryKeywords: ["hangover relief drip", "rehydration IV", "morning-after IV", "anti-nausea IV"],
    shortDescription:
      "Aggressive rehydration plus anti-nausea and B-complex support to bounce back from a rough night faster than you would on your own.",
    longDescription:
      "Our Hangover Relief IV combines aggressive saline rehydration, B-complex for energy and brain fog, and approved anti-nausea support so you can recover in 45 minutes instead of the rest of the day. It is built for the morning after a wedding, conference, or work event, when you simply do not have the day to lose.",
    indicatedFor: [
      "dehydration and nausea after a heavy night",
      "morning-after recovery before a busy work day",
      "wedding and event hangovers",
      "travel recovery combined with mild dehydration",
    ],
    benefits: [
      "Aggressive rehydration in 45 minutes",
      "Anti-nausea support so you can keep food and water down",
      "B-complex for energy and reduced brain fog",
      "Most patients feel functional within the same hour",
    ],
    protocol:
      "Brief intake including last meal, fluids, and meds, IV placement, 30 to 45 minute infusion with anti-nausea added if clinically appropriate.",
    faqs: [
      { q: "How fast will I feel better?", a: "Most patients feel functional by the time the infusion ends. Full energy and clarity follow over the next 2 to 4 hours." },
      { q: "Can I drive after?", a: "Most patients drive themselves home. If you are still feeling effects of the prior night, arrange a ride." },
      { q: "Is this safe if I just want to recover?", a: "Yes. We screen briefly and confirm you are clinically appropriate before starting any drip." },
    ],
    live: true,
  },

  /* ──────────────────── Testosterone Therapy ──────────────────── */
  {
    slug: "trt-injections",
    serviceSlug: "testosterone-therapy",
    name: "TRT Injections",
    primaryKeyword: "testosterone injections",
    secondaryKeywords: ["testosterone cypionate", "weekly TRT injections", "self-injection TRT", "intramuscular testosterone"],
    shortDescription:
      "The most adjustable form of TRT, weekly or twice-weekly testosterone cypionate injections with tight lab control.",
    longDescription:
      "TRT injections give us the most precise control over your testosterone levels, with a weekly or twice-weekly self-injection schedule that keeps levels stable and adjustable. Most men we treat self-inject at home after a brief in-clinic teach. It is the most cost-effective long-term route and the easiest to fine-tune as goals evolve.",
    indicatedFor: [
      "men with diagnosed Low T who want tight control",
      "athletes and high-performers tracking recovery and labs",
      "men who want the most cost-effective TRT route",
      "men who have not responded to topicals or gels",
    ],
    benefits: [
      "Most adjustable route, easy weekly fine-tuning",
      "Steady levels with twice-weekly dosing",
      "Lowest monthly cost of the TRT options",
      "Strong fit for athletes and high-performance goals",
    ],
    protocol:
      "Lab-first consult (total T, free T, estradiol, SHBG, PSA, CBC, metabolic panel), in-clinic injection teach, weekly or twice-weekly self-injection at home, labs at 6 to 8 weeks then every 4 to 6 months.",
    faqs: [
      { q: "Will I be able to inject myself?", a: "Almost every patient is comfortable self-injecting within one or two sessions. We are message-available for questions in between visits." },
      { q: "Weekly or twice-weekly?", a: "Twice-weekly dosing yields steadier levels for most patients and is our default." },
      { q: "Do you ever add ancillaries like anastrozole or HCG?", a: "When labs and goals call for it. We do not prescribe ancillaries by default." },
    ],
    live: true,
  },
  {
    slug: "trt-pellets",
    serviceSlug: "testosterone-therapy",
    name: "TRT Pellet Therapy",
    primaryKeyword: "testosterone pellet therapy",
    secondaryKeywords: ["TRT pellets", "testosterone pellet implant", "pellet TRT"],
    shortDescription:
      "Low-maintenance testosterone pellets that release a steady physiologic dose for 4 to 6 months.",
    longDescription:
      "Testosterone pellets are placed under the skin during a quick in-office procedure and release a steady physiologic dose for 4 to 6 months. They are popular with men who travel often, dislike self-injections, or want the most set-and-forget TRT option available.",
    indicatedFor: [
      "men who travel heavily and want a set-and-forget protocol",
      "men with adherence challenges on weekly injections",
      "men who have not tolerated topicals",
      "men who want fewer monthly tasks",
    ],
    benefits: [
      "Steady levels for 4 to 6 months per insertion",
      "No daily creams or weekly self-injections",
      "Strong real-world adherence",
      "Visit count of 2 to 3 per year",
    ],
    protocol:
      "Lab-first consult, in-office pellet insertion (10 to 15 minutes), re-check labs at 4 to 6 weeks, re-insertion every 4 to 6 months based on labs and symptoms.",
    faqs: [
      { q: "Does the pellet insertion hurt?", a: "We numb the area, so most patients feel pressure but minimal pain. The procedure runs 10 to 15 minutes." },
      { q: "Can I switch from injections to pellets later?", a: "Yes. We move many patients between routes as life and preferences change." },
      { q: "How often will I need labs?", a: "Initial labs at 4 to 6 weeks after the first pellet, then at each re-insertion." },
    ],
    live: true,
  },
  {
    slug: "trt-cream",
    serviceSlug: "testosterone-therapy",
    name: "Testosterone Cream",
    primaryKeyword: "testosterone cream",
    secondaryKeywords: ["topical testosterone", "testosterone gel", "compounded testosterone cream"],
    shortDescription:
      "Compounded topical testosterone for men who prefer a needle-free, daily delivery method.",
    longDescription:
      "Compounded testosterone cream is a topical option for men who want a needle-free protocol and are willing to commit to daily application. It works well for many men, with the trade-off that absorption varies more than injections and pellets, so lab follow-up is important.",
    indicatedFor: [
      "men who want a needle-free protocol",
      "men starting TRT and wanting a gentler introduction",
      "men whose labs absorb topicals well",
    ],
    benefits: [
      "No needles, no in-office procedures",
      "Easy to adjust dose day-to-day",
      "Good fit for men just starting TRT",
    ],
    protocol:
      "Lab-first consult, prescription for compounded testosterone cream, daily application, labs at 6 to 8 weeks to confirm absorption and dose.",
    faqs: [
      { q: "How long until cream works?", a: "Most men notice changes in 2 to 6 weeks. Absorption varies, so the 6 to 8 week lab check matters." },
      { q: "Can the cream transfer to a partner?", a: "Yes, if applied carelessly. We teach application sites and timing to minimize transfer risk." },
      { q: "Is cream as effective as injections?", a: "For absorbers, yes. For non-absorbers, labs will tell us, and we move you to injections or pellets." },
    ],
    live: true,
  },
  {
    slug: "low-t-evaluation",
    serviceSlug: "testosterone-therapy",
    name: "Low T Evaluation",
    primaryKeyword: "low testosterone evaluation",
    secondaryKeywords: ["Low T workup", "low testosterone lab panel", "TRT consult", "men's hormone consult"],
    shortDescription:
      "A comprehensive Low T workup before any prescription, full hormone panel, symptom history, and an honest yes-or-no on whether TRT is right for you.",
    longDescription:
      "Not every man with low energy needs TRT, and not every man with normal-looking labs is in the clear. Our Low T evaluation is a comprehensive workup including total and free testosterone, estradiol, SHBG, PSA, CBC, lipid and metabolic panels, plus a real symptom and history conversation. The outcome is a clear yes-or-no on TRT candidacy, along with any lifestyle, sleep, or thyroid factors you should address either way.",
    indicatedFor: [
      "men 30+ with fatigue, low libido, or stalled progress",
      "men whose primary care said labs were fine but symptoms persist",
      "men considering TRT and wanting an unbiased workup",
      "men evaluating fertility planning alongside TRT",
    ],
    benefits: [
      "Comprehensive hormone, metabolic, and cardiovascular labs",
      "A 45 to 60 minute clinician consult, not a sales pitch",
      "A clear written plan whether or not TRT is right for you",
      "Coordination with sleep, thyroid, and lifestyle drivers",
    ],
    protocol:
      "Pre-visit lab order, 45 to 60 minute consult with your provider to review findings and decide next steps. No TRT prescription before evaluation.",
    faqs: [
      { q: "Will you prescribe TRT at the first visit?", a: "Only if the labs and symptoms clearly support it. Otherwise we address the actual drivers first." },
      { q: "What if my labs are normal?", a: "We explain what normal means at your age, identify other factors (sleep, thyroid, stress, body composition), and build a plan from there." },
      { q: "Do you offer fertility-preserving alternatives?", a: "Yes, for men who want hormone optimization without suppressing fertility, we discuss alternatives during the consult." },
    ],
    live: true,
  },

  /* ──────────────────── Wellness Exams ──────────────────── */
  {
    slug: "mens-annual-physical",
    serviceSlug: "wellness-exams",
    name: "Men's Annual Physical",
    primaryKeyword: "mens annual physical exam",
    secondaryKeywords: ["mens preventive physical", "annual mens wellness exam", "mens health checkup"],
    shortDescription:
      "A comprehensive annual physical built for men, with hormone, metabolic, and cardiovascular labs that go past the basic insurance panel.",
    longDescription:
      "Our men's annual physical goes beyond the basic check-the-box panel. We screen total and free testosterone, estradiol, lipid panel, fasting glucose and A1C, PSA when age-appropriate, and other markers that flag early-stage risk you can still reverse. The exam includes a full physical, a labs review, and a written plan you actually take home.",
    indicatedFor: [
      "men 30+ scheduling an annual preventive visit",
      "men whose previous physicals felt rushed",
      "men with family history of heart disease, diabetes, or cancer",
      "men starting a fitness or performance program who want a baseline",
    ],
    benefits: [
      "Hormone, metabolic, and cardiovascular markers in one panel",
      "Unhurried consult, head-to-toe physical, written plan",
      "Age-appropriate cancer screening guidance",
      "Direct provider follow-up for off-visit questions",
    ],
    protocol:
      "Pre-visit lab draw, 45 to 60 minute physical and consult, written prevention plan, next-year visit scheduled on the way out.",
    faqs: [
      { q: "Is this different from a sick visit?", a: "Yes. This is preventive care focused on labs, screening, and longevity planning." },
      { q: "Will my insurance cover this?", a: "Many panels are covered. We confirm coverage in advance and explain any out-of-pocket items before the visit." },
    ],
    live: true,
  },
  {
    slug: "womens-annual-physical",
    serviceSlug: "wellness-exams",
    name: "Women's Annual Physical",
    primaryKeyword: "womens annual physical exam",
    secondaryKeywords: ["womens preventive physical", "annual womens wellness exam", "womens health checkup"],
    shortDescription:
      "A comprehensive annual physical for women with hormone, metabolic, thyroid, and cardiovascular labs that go past the standard insurance panel.",
    longDescription:
      "Our women's annual physical includes a full thyroid panel, cycle-aware hormone labs, lipid and metabolic markers, and age-appropriate cancer screening guidance. The exam is built for women who want a real partner in long-term prevention, not a 15-minute rush.",
    indicatedFor: [
      "women in their 20s, 30s, 40s, and beyond",
      "women navigating cycle, mood, or weight changes",
      "women planning pregnancy or postpartum recovery",
      "women with thyroid, autoimmune, or family-history concerns",
    ],
    benefits: [
      "Cycle-aware hormone panel, thyroid markers included",
      "Unhurried 45 to 60 minute consult",
      "Coordinated cancer screening and gynecologic care",
      "Written long-term prevention plan",
    ],
    protocol:
      "Pre-visit lab draw timed to your cycle when relevant, 45 to 60 minute physical and consult, written plan.",
    faqs: [
      { q: "Do I still need my OB-GYN?", a: "Yes, for in-depth gynecologic care. Our exam coordinates with, not replaces, gynecologic care." },
      { q: "Should I schedule around my cycle?", a: "For cycle-aware hormone labs, yes. We schedule the lab draw on the right cycle day." },
    ],
    live: true,
  },
  {
    slug: "executive-physical",
    serviceSlug: "wellness-exams",
    name: "Executive Physical",
    primaryKeyword: "executive physical exam",
    secondaryKeywords: ["executive health physical", "longevity physical", "comprehensive health assessment"],
    shortDescription:
      "An expanded annual physical for executives and high-performers, with deeper labs, cardiovascular imaging coordination, and a longevity-focused written plan.",
    longDescription:
      "The Executive Physical is our deepest single-visit assessment, expanded hormone, metabolic, inflammatory, and cardiovascular markers, coordination of imaging (CIMT, calcium score, DEXA) when clinically appropriate, and a longevity-focused written plan that translates the data into next 12-month action.",
    indicatedFor: [
      "executives, founders, and high-performance professionals",
      "patients optimizing for the next 10 to 20 years of healthspan",
      "patients with family history of cardiac or metabolic disease",
      "patients who want a single-day comprehensive workup",
    ],
    benefits: [
      "Expanded labs (inflammation, advanced lipids, hormones, metabolic)",
      "Imaging coordination (CIMT, calcium score, DEXA when indicated)",
      "Longevity-focused written plan with 12-month milestones",
      "Direct clinician access throughout the year",
    ],
    protocol:
      "Pre-visit lab and imaging coordination, 90 to 120 minute physical and consult, written longevity plan, scheduled mid-year check-in.",
    faqs: [
      { q: "Is this the same as a concierge service?", a: "It is a single-visit comprehensive assessment, not a year-round concierge retainer." },
      { q: "Do I need imaging?", a: "Not always. We recommend imaging based on age, family history, and lab patterns." },
    ],
    live: true,
  },
  {
    slug: "sports-physical",
    serviceSlug: "wellness-exams",
    name: "Sports & DOT Physical",
    primaryKeyword: "sports physical exam",
    secondaryKeywords: ["DOT physical", "athlete physical", "youth sports physical", "pre-participation physical"],
    shortDescription:
      "Fast, thorough sports and DOT physicals for athletes, students, and commercial drivers, often same-day.",
    longDescription:
      "We offer pre-participation sports physicals for youth and high school athletes, DOT physicals for commercial drivers, and a more comprehensive athlete physical for adult competitive and tactical athletes. Visits are fast, thorough, and often available same-day.",
    indicatedFor: [
      "youth and high school athletes",
      "adult competitive and tactical athletes",
      "commercial drivers needing a current DOT card",
      "patients needing return-to-play clearance",
    ],
    benefits: [
      "Often same-day availability",
      "DOT-certified clinician on staff",
      "Athlete-aware musculoskeletal exam",
      "Clear pass / refer outcomes",
    ],
    protocol:
      "Brief intake, focused physical, paperwork completed in-clinic. DOT physicals follow current FMCSA requirements.",
    faqs: [
      { q: "Do you do same-day sports physicals?", a: "Most days, yes. Call to confirm the next available slot." },
      { q: "What do I bring for a DOT physical?", a: "Your current medical card if you have one, any current medications, and glasses if you wear them." },
    ],
    live: true,
  },

  /* ──────────────────── Peptide Therapy ──────────────────── */
  {
    slug: "glp1-metabolic",
    serviceSlug: "peptide-therapy",
    name: "GLP-1 Metabolic Peptides",
    primaryKeyword: "GLP-1 peptide therapy",
    secondaryKeywords: ["semaglutide", "tirzepatide", "GLP-1 weight loss", "metabolic peptide therapy"],
    shortDescription:
      "Clinician-supervised GLP-1 peptide protocols for metabolic health, body composition, and sustainable weight loss.",
    longDescription:
      "Our GLP-1 program uses clinician-supervised semaglutide or tirzepatide alongside labs, body-composition tracking, and nutrition coaching so you get the metabolic benefits without the rebound. We are not a write-a-script-and-wave-goodbye clinic; we plan the on-ramp, the maintenance dose, and the eventual taper or maintenance phase.",
    indicatedFor: [
      "patients with a BMI of 27+ and metabolic risk factors",
      "patients whose weight loss has stalled despite real effort",
      "patients with insulin resistance or pre-diabetes",
      "patients pairing GLP-1 with hormone or strength programs",
    ],
    benefits: [
      "Meaningful weight loss with appetite normalization",
      "Improved insulin sensitivity and metabolic markers",
      "A planned taper or maintenance, no open-ended dosing",
      "Coordination with strength training to preserve lean mass",
    ],
    protocol:
      "Lab-first consult including metabolic and thyroid panels, GLP-1 prescription with weekly self-injection, monthly check-ins for the first 12 weeks, then quarterly with labs.",
    faqs: [
      { q: "Will I gain the weight back when I stop?", a: "Not if we plan the taper and pair it with strength training and nutrition habits. We are deliberate about the maintenance phase." },
      { q: "Will I lose muscle?", a: "Without effort, yes, you will lose lean mass. We pair every GLP-1 protocol with a protein and strength plan to protect muscle." },
      { q: "How much will I lose?", a: "Most patients lose 12 to 18 percent of body weight over 12 to 18 months on a well-managed protocol." },
    ],
    live: true,
  },
  {
    slug: "bpc-157-recovery",
    serviceSlug: "peptide-therapy",
    name: "BPC-157 Recovery Peptides",
    primaryKeyword: "BPC-157 peptide therapy",
    secondaryKeywords: ["BPC-157", "TB-500", "recovery peptides", "tissue repair peptide"],
    shortDescription:
      "Recovery-focused peptide protocols (BPC-157, TB-500) for soft-tissue repair, training recovery, and post-surgical healing.",
    longDescription:
      "BPC-157 and TB-500 are recovery-focused peptides used to support soft-tissue healing, training recovery, and post-surgical tissue repair. Protocols are clinician-prescribed, time-limited, and paired with rehab and training context so the peptide is a tool, not a shortcut.",
    indicatedFor: [
      "athletes recovering from soft-tissue injuries",
      "patients in post-surgical rehab",
      "tactical athletes between heavy training cycles",
      "patients with chronic recovery debt",
    ],
    benefits: [
      "Faster soft-tissue and joint recovery",
      "Reduced training-related inflammation",
      "Pairs well with physical therapy and rehab",
      "Time-limited cycles, no open-ended use",
    ],
    protocol:
      "Clinician consult, prescription with self-administration teach, cycle length defined up front (typically 4 to 8 weeks), and a written taper or off-cycle plan.",
    faqs: [
      { q: "How fast does BPC-157 work?", a: "Many patients notice recovery benefits within 1 to 3 weeks. Tissue repair continues over the full cycle." },
      { q: "Is BPC-157 FDA-approved?", a: "BPC-157 is prescribed within current FDA guidance and through licensed compounding pharmacies. We discuss current regulatory status during the consult." },
    ],
    live: true,
  },
  {
    slug: "thymosin-immune",
    serviceSlug: "peptide-therapy",
    name: "Thymosin Alpha-1 Immune Peptides",
    primaryKeyword: "thymosin alpha-1 peptide therapy",
    secondaryKeywords: ["thymosin alpha-1", "immune peptide therapy", "immune support peptide"],
    shortDescription:
      "Thymosin alpha-1 peptide protocols for immune resilience during high-stress, high-exposure, or post-illness windows.",
    longDescription:
      "Thymosin alpha-1 is an immune-modulating peptide used to support immune resilience during high-stress periods, post-illness recovery, and certain chronic infection contexts. We prescribe defined cycles with labs before and after so we can see what is actually changing.",
    indicatedFor: [
      "patients in post-viral recovery",
      "patients with recurrent infections or chronic immune dysregulation",
      "high-exposure professionals during peak seasons",
      "patients with stress-driven immune debt",
    ],
    benefits: [
      "Targeted immune support",
      "Pairs with IV therapy and lifestyle protocols",
      "Defined cycle, not open-ended",
      "Labs before and after to measure response",
    ],
    protocol:
      "Lab-first consult including immune and inflammatory markers, prescription with self-administration teach, typical cycle of 6 to 12 weeks, post-cycle labs.",
    faqs: [
      { q: "Will I feel this peptide working?", a: "Some patients feel improvements in energy and resilience. Most of the benefit is measured in labs, not subjective feel." },
      { q: "Is this safe long-term?", a: "Our default is defined cycles, not open-ended use. We re-evaluate at the end of each cycle." },
    ],
    live: true,
  },
  {
    slug: "longevity-peptides",
    serviceSlug: "peptide-therapy",
    name: "Longevity Peptide Protocols",
    primaryKeyword: "longevity peptide therapy",
    secondaryKeywords: ["anti-aging peptides", "longevity peptide protocol", "epitalon", "GHK-Cu"],
    shortDescription:
      "Curated longevity peptide protocols layered onto hormone, IV, and lifestyle programs for patients optimizing healthspan.",
    longDescription:
      "Our longevity peptide protocols are reserved for patients already optimizing the basics, sleep, training, hormones, and metabolic markers, and looking for the next layer. We curate specific peptides to specific goals (sleep architecture, mitochondrial markers, skin and tissue quality) and pair them with regular labs so we are measuring, not guessing.",
    indicatedFor: [
      "patients already on hormone and metabolic optimization",
      "patients targeting healthspan markers (mitochondrial, inflammatory, recovery)",
      "patients pairing peptides with strength and longevity training",
    ],
    benefits: [
      "Targeted layer on top of foundational optimization",
      "Lab-driven selection, not catalog browsing",
      "Defined cycles with planned breaks",
      "Coordinated with hormone, IV, and lifestyle protocols",
    ],
    protocol:
      "Foundational labs confirmed in range, longevity-specific markers added, consult to select peptide(s), defined cycle with mid-cycle and post-cycle labs.",
    faqs: [
      { q: "Where do longevity peptides fit relative to hormones?", a: "Hormones first. Once hormone, sleep, and metabolic basics are in range, longevity peptides are a sensible next layer." },
      { q: "Will I be on these forever?", a: "No. Each cycle has a defined end. We re-evaluate every cycle." },
    ],
    live: true,
  },
] as const;

export function getLiveTreatments(): Treatment[] {
  return TREATMENTS.filter((t) => t.live);
}

export function getTreatment(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}

export function getTreatmentsForService(serviceSlug: string): Treatment[] {
  return getLiveTreatments().filter((t) => t.serviceSlug === serviceSlug);
}

/**
 * Returns every live (city, service, treatment) triple. Used for
 * generateStaticParams in the [treatment] route and for the sitemap.
 */
export function getLiveCityServiceTreatmentTriples(): {
  city: City;
  service: Service;
  treatment: Treatment;
}[] {
  const out: { city: City; service: Service; treatment: Treatment }[] = [];
  const liveCities = getLiveCities();
  const liveServices = getLiveServices();
  for (const city of liveCities) {
    for (const service of liveServices) {
      for (const treatment of getTreatmentsForService(service.slug)) {
        out.push({ city, service, treatment });
      }
    }
  }
  return out;
}
