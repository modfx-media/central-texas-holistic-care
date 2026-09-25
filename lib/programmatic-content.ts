/**
 * Composes the unique body copy for /areas-we-serve/[city]/[service]/ pages.
 *
 * The job here is to produce 600-900 words of genuine, city-specific content
 * by selecting from city traits (character, industries, landmarks, drive time,
 * primary route, surrounding cities) and weaving them with service traits
 * (process, benefits, addresses). The output is NOT a single string template
 * with placeholders, the same service in two cities reads as two distinct
 * pages because each section selects a variant keyed off city.character.
 */

import type { City, Service } from "./locations";

export type ComposedContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introParagraphs: string[];
  whoWeServe: string;
  whyChoose: string;
  drivingDirections: string;
  closingCta: string;
  whatToExpect: string;
  candidacy: string;
  faqs: { q: string; a: string }[];
};

/* -------------------------------------------------------------------------- */
/*                              Meta + heading                                */
/* -------------------------------------------------------------------------- */

export function composeMetaTitle(city: City, service: Service): string {
  return `${service.name} in ${city.name}, TX`;
}

export function composeMetaDescription(city: City, service: Service): string {
  const opener =
    service.slug === "iv-nutrition"
      ? `Clinician-supervised ${service.primaryKeyword} in ${city.name}, TX.`
      : service.slug === "testosterone-therapy"
        ? `Lab-guided ${service.primaryKeyword} for men in ${city.name}, TX.`
        : `Lab-guided ${service.primaryKeyword} in ${city.name}, TX.`;

  return `${opener} ${city.name} is ~${city.driveTimeMin} min from our clinic via ${city.primaryRoute}. Book a consultation.`;
}

export function composeH1(city: City, service: Service): string {
  return `${service.name} in ${city.name}, TX`;
}

/* -------------------------------------------------------------------------- */
/*                              Intro paragraphs                              */
/* -------------------------------------------------------------------------- */

/**
 * 2 paragraphs, ~150-200 words total. Opener varies by city.character so the
 * same service reads differently across city types.
 */
function composeIntro(city: City, service: Service): string[] {
  const hook = pickIntroHook(city, service);
  const bridge = `${service.longDescription}`;
  return [hook, bridge];
}

function pickIntroHook(city: City, service: Service): string {
  const c = city.name;
  const svcLower = service.shortName;

  switch (city.character) {
    case "military":
      return `If you live in ${c}, you already know what a long day looks like. ${city.shortDescription} ${capitalize(svcLower)} should fit around your schedule, not the other way around, and at Central Texas Holistic Care we build every protocol with that in mind. Whether you are coming off a deployment cycle, working night shifts, or simply tired of feeling tired, we run the labs, explain the findings in plain language, and put together a plan that holds up under real life.`;

    case "suburban-professional":
      return `${capitalize(c)} is a community that thinks ahead. ${city.shortDescription} Patients in ${c} typically come to us when "fine" stops feeling like enough, when sleep, energy, recovery, or mood start drifting in the wrong direction, and they want a clinician who treats them like a partner. Our ${svcLower} program is built around that expectation: comprehensive labs, an unhurried consult, and a plan you actually understand.`;

    case "college-town":
      return `${capitalize(c)} runs at two speeds, the steady rhythm of the university and the courthouse square, and the quieter pace of family life around Lake Belton. ${city.shortDescription} Patients from ${c} come to us looking for ${svcLower} that respects their time, gives them a clear answer, and treats them like an adult. We listen first, test, and then build a plan around your goals.`;

    case "medical-hub":
      return `${capitalize(c)} patients are already comfortable around lab work, providers, and second opinions. ${city.shortDescription} That makes ${svcLower} a conversation about the right protocol, not a sales pitch. Our team meets you with the same lab-first approach you would expect from any specialty clinic, with the time and attention you do not always get inside a large hospital system.`;

    case "rural":
      return `${capitalize(c)} is the kind of place where people do not see a clinician unless they have a real reason. ${city.shortDescription} That is exactly why our ${svcLower} program is built around root causes, real labs, and a plan you can actually follow, so the drive in to Central Texas Holistic Care is worth the trip.`;

    case "historic-village":
      return `${capitalize(c)} has a slower, more intentional pace, and patients here tend to want care that matches it. ${city.shortDescription} Our ${svcLower} program leans into that: an unhurried consult, comprehensive labs, and a clear plan, with a clinician who actually answers your questions.`;

    default:
      return `If you live in ${c}, ${svcLower} should fit your life, not the other way around. ${city.shortDescription} Our team builds every plan around your labs, your symptoms, and your goals.`;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Who we serve                                  */
/* -------------------------------------------------------------------------- */

function composeWhoWeServe(city: City, service: Service): string {
  const top = city.industries.slice(0, 3);
  const list = formatList(top);
  const conditions = service.addresses.slice(0, 3).join(", ");

  return `Patients we treat from ${city.name} include ${list}, and many others who find us through word of mouth. Most arrive asking about ${conditions}, and almost all of them have tried something less personalized first. Our job is to listen, test, and build a plan that actually works for the way you live.`;
}

/* -------------------------------------------------------------------------- */
/*                              Why choose us                                 */
/* -------------------------------------------------------------------------- */

function composeWhyChoose(city: City, service: Service): string {
  const benefit1 = service.benefits[0]?.toLowerCase() ?? "feeling better";
  const benefit2 = service.benefits[2]?.toLowerCase() ?? "lasting results";

  if (service.slug === "testosterone-therapy") {
    return `Men come to us from ${city.name} because we do not start TRT on symptoms alone. We start with a complete lab panel (total and free testosterone, estradiol, SHBG, PSA, CBC, and metabolic markers), sit down with you to talk through what is actually going on, then build a protocol around the right delivery method and the right dose. You will see ${benefit1}, and follow-up labs confirm we are landing in the right range, not chasing a number.`;
  }

  if (service.slug === "iv-nutrition") {
    return `${city.name} patients choose us for IV nutrition because every drip is mixed in-clinic and supervised by a clinician, not a kiosk technician. We confirm your goal for the visit, screen briefly, and tailor the formula. The result is ${benefit1}, in a calm, private chair, with someone watching the drip the whole time.`;
  }

  if (service.slug === "hormone-therapy") {
    return `Patients from ${city.name} choose Central Texas Holistic Care because we treat the underlying biology, not the symptom list. Every plan starts with a comprehensive hormone panel, every dosing decision is grounded in your labs, and we re-test at the right intervals to confirm levels are landing where they should. The result is ${benefit1} and ${benefit2}, with a clinician who actually knows your case.`;
  }

  return `Patients from ${city.name} choose Central Texas Holistic Care because we take the time to listen, run the right labs, and build a plan that fits your life. The result is ${benefit1} and ${benefit2}.`;
}

/* -------------------------------------------------------------------------- */
/*                              Driving / location                            */
/* -------------------------------------------------------------------------- */

function composeDrivingDirections(city: City): string {
  if (city.driveTimeMin <= 2) {
    return `Our clinic sits inside ${city.name} at 311 E. Stan Schlueter Loop, Suite 207, so you are essentially next door. Most ${city.name} patients walk in for their appointment, then carry on with the rest of their day without rearranging the schedule.`;
  }

  const landmark = city.landmarks[0] ?? city.name;
  const landmark2 = city.landmarks[1] ?? "downtown";

  return `From ${city.name}, the drive to Central Texas Holistic Care takes about ${city.driveTimeMin} minutes via ${city.primaryRoute}. Patients leaving from the ${landmark} area or near ${landmark2} usually have an easy run east toward South Fort Hood Street. The clinic is at 311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542, with parking right out front.`;
}

/* -------------------------------------------------------------------------- */
/*                              Closing CTA                                   */
/* -------------------------------------------------------------------------- */

function composeClosingCta(city: City, service: Service): string {
  return `If you are ready to see what ${service.shortName} could look like for you, we would love to meet. Patients from ${city.name} can usually be seen the same day, often sooner. Book a consultation online or call us, we will take it from there.`;
}

function composeWhatToExpect(city: City, service: Service): string {
  const landmark = city.landmarks[0] ?? city.name;
  const walkthrough = service.process
    .map((step) => `${step.title}. ${step.body}`)
    .join(" ");
  return `A first ${service.shortName} visit for someone leaving ${landmark} in ${city.name} is at the Killeen clinic, about ${city.driveTimeMin} minutes via ${city.primaryRoute}. ${walkthrough} You leave with a written plan. The next lab date is on the calendar before you walk out. Parking is in front of 311 E. Stan Schlueter Loop, Suite 207.`;
}

function composeCandidacy(city: City, service: Service): string {
  const concerns = service.addresses.slice(0, 4).join(", ");
  const people = formatList(city.industries.slice(0, 2));
  return `People in ${city.name} usually book ${service.shortName} when ${concerns} have started to affect work, training, sleep, or family life. That includes ${people}. The consult is also the right step if a previous plan treated one symptom and left the rest alone. We will tell you plainly if labs do not support treatment, and we will say so before any protocol starts. ${city.county} County patients are seen at the same Killeen clinic as everyone else. There is no satellite office in ${city.name}.`;
}

export function composeTreatmentNarrative(
  city: City,
  service: Service,
  treatment: {
    name: string;
    longDescription: string;
    protocol: string;
    indicatedFor: readonly string[];
    benefits: readonly string[];
  },
): string[] {
  const landmarks = formatList((city.landmarks.slice(0, 3) as string[]));
  const indicated = formatList(treatment.indicatedFor.slice(0, 4));
  const outcomes = treatment.benefits
    .slice(0, 4)
    .map((benefit) => benefit.replace(/\.$/, ""))
    .join(". ");
  const workplaces = formatList(city.industries.slice(0, 3));
  return [
    treatment.longDescription,
    `Patients from ${city.name}, in ${city.county} County, are seen at 311 E. Stan Schlueter Loop, Suite 207, Killeen. The drive is about ${city.driveTimeMin} minutes via ${city.primaryRoute}. People usually leave from ${landmarks}. There is no ${treatment.name.toLowerCase()} office inside ${city.name}.`,
    `${treatment.name} is the ${service.shortName} protocol we use when the history matches ${indicated}. ${treatment.protocol}`,
    `After treatment starts, the changes we track are specific: ${outcomes}. A large share of ${city.name} patients on this protocol work in ${workplaces}. If the first labs do not support ${treatment.name.toLowerCase()}, we stop and walk through the numbers before any dose is chosen. Later changes come from repeat labs and from how you feel between visits.`,
  ];
}

/* -------------------------------------------------------------------------- */
/*                              FAQs                                          */
/* -------------------------------------------------------------------------- */

function composeFaqs(city: City, service: Service): { q: string; a: string }[] {
  const local = service.localFaqs.map((fn) => fn(city));
  const extra = [
    {
      q: `Do you have an office in ${city.name}?`,
      a: `No. Every ${city.name} patient is seen at 311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542. The drive is about ${city.driveTimeMin} minutes via ${city.primaryRoute}.`,
    },
    {
      q: `How soon can someone from ${city.name} be seen for ${service.shortName}?`,
      a: `Most ${city.name} patients are offered a visit within a few days. Same-day openings are common. Call (254) 213-2423 or book online and we will confirm the time.`,
    },
  ];
  return [...local, ...extra, ...service.baseFaqs];
}

/* -------------------------------------------------------------------------- */
/*                              Main composer                                 */
/* -------------------------------------------------------------------------- */

export function composeCityServiceCopy(city: City, service: Service): ComposedContent {
  return {
    metaTitle: composeMetaTitle(city, service),
    metaDescription: composeMetaDescription(city, service),
    h1: composeH1(city, service),
    introParagraphs: composeIntro(city, service),
    whoWeServe: composeWhoWeServe(city, service),
    whyChoose: composeWhyChoose(city, service),
    drivingDirections: composeDrivingDirections(city),
    closingCta: composeClosingCta(city, service),
    whatToExpect: composeWhatToExpect(city, service),
    candidacy: composeCandidacy(city, service),
    faqs: composeFaqs(city, service),
  };
}

/* -------------------------------------------------------------------------- */
/*                              City hub meta                                 */
/* -------------------------------------------------------------------------- */

export function composeCityHubParagraphs(city: City): string[] {
  const industries = formatList(city.industries.slice(0, 3));
  const landmarks = formatList(city.landmarks.slice(0, 3));
  return [
    city.shortDescription,
    `The ${city.name} patients we see most often work in ${industries}. Appointments are usually booked by people who live or work near ${landmarks}, then driven to the Killeen clinic. Plan on about ${city.driveTimeMin} minutes via ${city.primaryRoute}. The address is 311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542, with parking in front.`,
    `Hormone therapy, IV nutrition, testosterone therapy, wellness exams, and peptide protocols are the services on this page. Each one starts with a history and labs at the same ${city.county} County visit, in Killeen. We do not run a satellite clinic in ${city.name}. If a protocol is not a fit, that is said at the consult, before anything is started.`,
  ];
}

export function composeCityHubMeta(city: City): { title: string; description: string } {
  return {
    title: `${city.name}, TX`,
    description: `Hormone therapy, IV nutrition, TRT, and wellness care for ${city.name}, TX. ~${city.driveTimeMin} min via ${city.primaryRoute}. Book a consultation.`,
  };
}

/* -------------------------------------------------------------------------- */
/*                              Utilities                                     */
/* -------------------------------------------------------------------------- */

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
