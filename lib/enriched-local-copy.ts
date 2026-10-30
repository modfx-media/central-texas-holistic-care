/**
 * Unique local copy for the Oct 2026 SEO audit.
 * Facts are limited to the clinic address, phone, providers, services,
 * and city fields already published in this repo.
 */

export type DepthLink = { href: string; label: string };

export type DepthSection = {
  heading: string;
  paragraphs: string[];
  links?: DepthLink[];
};

export type DepthFaq = { q: string; a: string };

export type DepthPage = {
  sections: DepthSection[];
  faqs: DepthFaq[];
};

const CLINIC = "311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542";
const PHONE = "(254) 213-2423";

export const TEMPLE_DEPTH: DepthPage = {
  sections: [
    {
      heading: "Care for people who live or work in Temple",
      paragraphs: [
        `Temple patients of Central Texas Holistic Care are seen in Killeen, not at a Temple office. The clinic address is ${CLINIC}. The phone number is ${PHONE}. Parking is in front of the suite. The drive already published for Temple is about 35 minutes via I-14 East to I-35 North. ZIP codes listed for Temple on this site are 76501, 76502, and 76504.`,
        "Temple is described here as a regional medical and rail hub built around Baylor Scott & White and a growing biotech corridor, a community already comfortable with integrative, lab-driven care. That is a different page from Killeen. The Killeen page is written for a Fort Cavazos community and for shift work, deployment schedules, and high physical demand. The appointment itself is the same Killeen visit. What changes for a Temple patient is the trip, and often the fact that labs or a hospital visit have already happened somewhere else in town.",
        "The industries listed for Temple are Baylor Scott & White Medical Center clinicians and staff, BNSF rail employees, Temple College students and faculty, and manufacturing and logistics professionals. People who book from this area often live or work near Baylor Scott & White Memorial Hospital, the Railroad and Heritage Museum, Miller Park, Temple College, or Lions Park. Those are landmarks on the way out of Temple. They are not clinic locations. Neighboring cities linked from this hub are Belton, Salado, Harker Heights, and Killeen.",
        "If you already have labs from a Temple clinician, bring them. The visit still starts with a history. Hormone therapy and testosterone therapy are not started on symptoms alone. If the numbers and the history do not support a protocol, that is said at the consult, before anything is started. There is no second office in Temple to stop at on the way.",
      ],
    },
    {
      heading: "Services offered to Temple-area patients",
      paragraphs: [
        "The menu for Temple is the menu at the Killeen clinic. There is not a separate Temple price list or a Temple-only protocol. Each service below has its own Temple page, and each of those pages sends you to the same suite.",
        "Hormone therapy is lab-guided bioidentical hormone replacement for men and women. The routes described on the hormone service are pellets, injections, creams, and oral options, chosen after bloodwork and a clinician-led consult. A Temple patient who wants the local version of that visit should use the Temple hormone therapy page. The main hormone therapy page is the clinical overview, including the Killeen visit for men and for women.",
        "IV nutrition is a clinician-supervised infusion, mixed in clinic. The service describes hydration, B-complex, vitamin C, magnesium, glutathione, and amino acids, with drips built around the goal of that visit. It is not a walk-up kiosk. The Temple IV page lists the drip types already offered, including immune support, workout recovery, the Myers cocktail, cold and flu, and hangover relief.",
        "Testosterone therapy on this site is for men. The published workup includes total and free testosterone, estradiol, SHBG, PSA, CBC, and metabolic markers. Delivery can be injections, pellets, or compounded cream. The Temple testosterone page is the local page. The men's testosterone page is the longer clinical explanation of the same service.",
        "Annual wellness exams are the preventive visit: biomarker labs, a physical, and a written plan. The clinic describes the in-clinic portion as 45 to 60 minutes, plus the lab draw. Peptide therapy is also booked at the Killeen clinic. The published peptide service is clinician-supervised and includes the protocols already listed under that service, including GLP-1 metabolic peptides when the history and labs support them.",
        "Women asking about the menopause transition can start on the menopause care page or the Killeen menopause hormone page. Men asking about testosterone can start with Larissa Garth's profile or the testosterone pages. Both clinicians practice at this clinic: Bimisa Augustin, DNP, FNP-C, PMHNP-BC, a nurse practitioner, and Larissa Garth, DMSc, MPH, MPAS, PA-C, a physician assistant. Their profiles state that they are not physicians, and that plans are clinician-directed from the evaluation and the labs.",
      ],
      links: [
        { href: "/areas-we-serve/temple/hormone-therapy/", label: "Hormone therapy for Temple" },
        { href: "/areas-we-serve/temple/iv-nutrition/", label: "IV nutrition for Temple" },
        { href: "/areas-we-serve/temple/testosterone-therapy/", label: "Testosterone therapy for Temple" },
        { href: "/areas-we-serve/temple/wellness-exams/", label: "Wellness exams for Temple" },
        { href: "/areas-we-serve/temple/peptide-therapy/", label: "Peptide therapy for Temple" },
        { href: "/hormone-therapy/", label: "Hormone therapy overview" },
        { href: "/women/menopausal-disorders/", label: "Menopause care" },
      ],
    },
    {
      heading: "What to expect at the Killeen visit",
      paragraphs: [
        "A first appointment for someone leaving Temple is in person at the Killeen suite. Plan the drive, then plan the visit. The pattern published across services is a history, the labs that service uses, a conversation about whether treatment fits, and a written plan when it does. You leave with the next step on the calendar when a protocol starts. When it does not start, you still leave with an explanation of the numbers.",
        "For hormone therapy, the published steps are a hormone, metabolic, and cardiovascular panel, a clinician-led consult, a choice among pellets, injections, creams, or oral hormones, and follow-up labs so the dose can be adjusted. Sleep, nutrition, and supplements are discussed when they belong in the plan. The consult is where trade-offs of each route are explained. The page does not assign you a route before that conversation.",
        "For testosterone therapy, the published steps are a symptom and history review, bloodwork, a delivery method and dose, and labs rechecked on a schedule. The clinic states that treatment is not started on symptoms alone. Men who want the injectable, pellet, or cream route can read those protocol pages from the Temple testosterone page before the visit so the questions are specific.",
        "For IV nutrition, the published steps are a brief intake, a custom-mixed infusion, a supervised drip, and aftercare. Most infusions are described as 30 to 60 minutes from placement to finish. NAD+ drips are described as longer. You can book a drip without a hormone plan, and you can book hormone care without a drip.",
        "For an annual wellness exam, labs are ordered before the visit when that is the published flow, so the appointment is spent on findings. The exam includes a physical and a written prevention plan. The next year is scheduled on the way out. Peptide visits follow the protocol page for the specific peptide, with labs and a defined cycle rather than an open-ended prescription.",
        "Bring a medication list, any Temple labs you want read, and the question you actually came to ask. The building is the Killeen suite. It is not inside Baylor Scott & White, and it is not on the Temple College campus. If a service is a poor fit, the consult is where that is said.",
      ],
    },
    {
      heading: "How to reach the clinic from Temple",
      paragraphs: [
        `From Temple, use the route already published on this page: about 35 minutes via I-14 East to I-35 North, ending at ${CLINIC}. Patients often leave from the hospital area, the Railroad and Heritage Museum, Miller Park, Temple College, or Lions Park. Parking is in front of the clinic. The same address and phone are on the contact page.`,
        `Call ${PHONE} or use the online scheduler. City pages on this site say most patients are offered a visit within a few days, and that same-day openings are common. That is a statement about how the calendar usually works, not a guarantee for a particular day. If you are coming from Belton or Salado on the way, those cities have their own pages, and they use the same Killeen suite.`,
        "The drive from Temple to the Killeen clinic is about 35 minutes via I-14 East to I-35 North. The Killeen hub is for people who already live next to the clinic. This page is for patients making that drive, including people leaving the hospital, the rail yard, or Temple College.",
      ],
      links: [
        { href: "/contact/", label: "Contact and hours" },
        { href: "/areas-we-serve/killeen/", label: "Killeen clinic page" },
        { href: "/providers/bimisa-augustin/", label: "Bimisa Augustin" },
        { href: "/providers/larissa-garth/", label: "Larissa Garth" },
        { href: "/areas-we-serve/belton/", label: "Belton" },
        { href: "/areas-we-serve/salado/", label: "Salado" },
      ],
    },
  ],
  faqs: [
    {
      q: "Do you have a clinic in Temple?",
      a: `No. Temple patients are seen at ${CLINIC}. The drive published for Temple is about 35 minutes via I-14 East to I-35 North. There is no satellite office in Temple.`,
    },
    {
      q: "Which services can someone from Temple book?",
      a: "Hormone therapy, IV nutrition, testosterone therapy, annual wellness exams, and peptide therapy. Each has a Temple page on this hub. Menopause care and men's testosterone also have their own clinical pages.",
    },
    {
      q: "Should I bring labs I already had in Temple?",
      a: "Yes. Bring them. The visit still includes a history and the panel that service uses. The clinician compares what you already have with what is missing before a plan is written. Hormone and testosterone treatment are not started on symptoms alone.",
    },
    {
      q: "Who will I see?",
      a: "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, or Larissa Garth, DMSc, MPH, MPAS, PA-C. Both practice at the Killeen clinic. Bimisa is a nurse practitioner. Larissa is a physician assistant. Their credentials and booking links are on their provider pages.",
    },
    {
      q: "How is this different from the Killeen page?",
      a: "The Killeen page is for a Fort Cavazos community, and the clinic is in Killeen. This page is for people coming from Temple, including hospital, rail, college, and logistics work, with the 35-minute route and the Temple landmarks listed above.",
    },
  ],
};

export const KILLEEN_HORMONE_DEPTH: DepthPage = {
  sections: [
    {
      heading: "Hormone therapy for patients who live in Killeen",
      paragraphs: [
        `The clinic is in Killeen. Hormone therapy visits happen at ${CLINIC}. Call ${PHONE}. There is no second office in Harker Heights, Copperas Cove, Belton, or Temple. Those cities are served from this suite, and each has its own page. This page is the Killeen page, for people who live or work here.`,
        "Killeen is described on this site as home to Fort Cavazos, with a young, active population and care built around shift work, deployment schedules, and high physical demand. The industries listed for the city are Fort Cavazos service members and families, first responders and law enforcement, shift-working healthcare staff, and small-business owners along South Fort Hood Street. Landmarks patients use to place the clinic include the Fort Cavazos main gate at Clear Creek, the public library, Lions Club Park, Killeen Mall, and Long Branch Park. The clinic itself is on East Stan Schlueter Loop, not inside the gate.",
        "Hormone therapy here means lab-guided bioidentical replacement for men and women. The hormones named on the service are testosterone, estrogen, and progesterone. The routes named on the service are pellets, injections, topical creams, and oral options. The dose is chosen after labs and a consult. It is not a standing menu you pick from a card in the lobby.",
        "The concerns the service already lists are low testosterone in men, perimenopausal and menopausal symptoms, irregular cycles and PMS-related mood changes, postpartum hormone shifts, thyroid-related fatigue when thyroid care is part of the plan, and the vitality changes men describe as andropause. If your question is specifically menopause, use the menopause care page or the Killeen menopause hormone page. If your question is specifically testosterone, use the Killeen testosterone page. This page is the overview that ties those visits together for Killeen.",
      ],
      links: [
        { href: "/hormone-therapy/", label: "Hormone therapy overview" },
        { href: "/women/menopausal-disorders/", label: "Menopause care" },
        { href: "/areas-we-serve/killeen/hormone-therapy/menopause-care/", label: "Menopause hormone care in Killeen" },
        { href: "/areas-we-serve/killeen/hormone-therapy/perimenopause-care/", label: "Perimenopause care in Killeen" },
        { href: "/areas-we-serve/killeen/testosterone-therapy/", label: "Testosterone therapy in Killeen" },
      ],
    },
    {
      heading: "Who this visit is for",
      paragraphs: [
        "The visit is for adults in Killeen whose energy, sleep, cycles, mood, libido, or recovery have changed enough that they want labs and a clinician in the same appointment. It is also for people who already tried a single symptom treatment and still have the rest of the list. The candidacy note on this site is plain: if the labs do not support treatment, that is the recommendation, and it is said before a protocol starts.",
        "Men usually arrive asking about testosterone, training that has stalled, sleep that does not restore, or libido. Women usually arrive asking about cycle changes, perimenopause, menopause, or sleep and mood that moved together. Some patients are postpartum. Some are on a night shift at a hospital or on a Fort Cavazos schedule and want the appointment to fit that calendar. The clinic does not run a separate military protocol. The same lab-first visit is what is offered, with the history including the schedule you actually keep.",
        "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, has 26 years of clinical experience, including 10 years and six combat deployments with the U.S. Army. She is a nurse practitioner, not a physician. Patients see her for bioidentical hormone therapy and for the overlap of hormones with sleep, mood, and energy. Larissa Garth, DMSc, MPH, MPAS, PA-C, is a physician assistant with more than 10 years of clinical experience and more than a decade as a U.S. Army officer. Patients book her for testosterone and for broader hormone concerns. You can read either profile and book with that clinician. Both work at this Killeen address.",
        "This is not a gynecological exam page and it is not an annual physical page, though those visits exist. A hormone consult reviews the symptoms and the hormone labs. A gynecological exam is the screening visit described on the women's exam page. You can need one, the other, or both. The scheduler can tell you which appointment you booked.",
      ],
      links: [
        { href: "/providers/bimisa-augustin/", label: "Bimisa Augustin" },
        { href: "/providers/larissa-garth/", label: "Larissa Garth" },
        { href: "/women/gynecological-exams/", label: "Gynecological exams" },
        { href: "/men/testosterone/", label: "Men's testosterone therapy" },
      ],
    },
    {
      heading: "What to expect",
      paragraphs: [
        "The published hormone visit has four parts. First, a lab panel covering hormones, metabolic markers, and cardiovascular markers, so dosing is based on your bloodwork. Second, a clinician-led consult that reviews symptoms, history, goals, and the trade-offs of pellets, injections, creams, and oral hormones. Third, a protocol if the labs and the history support one, sometimes with sleep, nutrition, or supplement support. Fourth, follow-up labs at the interval for that route, and a dose change when the numbers or the way you feel call for it.",
        "Pellets are described as a small implant under the skin that releases hormone for about 3 to 5 months. Injections are described as weekly or twice-weekly dosing, often self-injected at home after an in-clinic teach. Creams and oral options are described as routes that work for many women, with follow-up labs because absorption is not identical from person to person. None of those sentences chooses your route. The consult does.",
        "What you should bring is practical. A list of medications and supplements. Any recent labs. The dates of cycle changes if that is the reason you came. For men, a note about training, sleep, and what has changed. The clinic is in Killeen, so most local patients are not planning a long drive. The address is on East Stan Schlueter Loop, with parking in front. Harker Heights patients are a short trip east. Temple patients use the longer I-14 route described on the Temple page.",
        "You should also expect a no. If the panel is not consistent with treatment, the visit ends with that explanation and with whatever other evaluation belongs in the chart, not with a pellet or a vial. Follow-up is part of treatment when treatment starts. It is also part of the visit when treatment does not start, because you should know what was measured.",
        "Related care sits next to this page on purpose. Perimenopause care is the earlier window, when cycles and sleep drift before periods stop. Menopause care is the visit for hot flashes, night sweats, sleep, mood, and the hormone plan after that transition. Testosterone therapy is the men's page, with its own lab list. IV nutrition is available in the same clinic if hydration or recovery is a separate question. It does not replace the hormone panel.",
      ],
      links: [
        { href: "/areas-we-serve/killeen/hormone-therapy/bhrt-pellets/", label: "BHRT pellets in Killeen" },
        { href: "/areas-we-serve/killeen/hormone-therapy/bhrt-injections/", label: "BHRT injections in Killeen" },
        { href: "/areas-we-serve/harker-heights/hormone-therapy/", label: "Hormone therapy for Harker Heights" },
        { href: "/areas-we-serve/temple/hormone-therapy/", label: "Hormone therapy for Temple" },
        { href: "/iv-nutrition/", label: "IV nutrition" },
      ],
    },
  ],
  faqs: [
    {
      q: "Where is the hormone therapy visit?",
      a: `At ${CLINIC}. The clinic is in Killeen. Patients from Harker Heights, Copperas Cove, Belton, and Temple are seen at this address. There is no satellite clinic.`,
    },
    {
      q: "Which hormones do you work with?",
      a: "Testosterone, estrogen, and progesterone, using the bioidentical routes already listed: pellets, injections, creams, and oral options. The route is chosen after labs and a consult.",
    },
    {
      q: "Can I be seen if I work shifts or live on a Fort Cavazos schedule?",
      a: "Yes. Killeen patients include service members, families, first responders, and shift-working healthcare staff. The visit is the same lab-first consult. Call (254) 213-2423 or book online to match it to your calendar.",
    },
    {
      q: "Who provides the care?",
      a: "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, a nurse practitioner, and Larissa Garth, DMSc, MPH, MPAS, PA-C, a physician assistant. Plans are clinician-directed. Neither profile describes a physician on this team.",
    },
    {
      q: "What if my labs do not support hormone therapy?",
      a: "Then treatment is not started. The consult is where that is said, before a protocol. You can still use the visit to review the numbers and decide whether a different service, such as a wellness exam, is the right next step.",
    },
  ],
};

export const MENOPAUSE_DEPTH: DepthPage = {
  sections: [
    {
      heading: "Menopause care at the Killeen clinic",
      paragraphs: [
        `Menopause care at Central Texas Holistic Care is an in-person visit at ${CLINIC}. The phone number is ${PHONE}. The clinic is in Killeen and also sees patients from Harker Heights, Copperas Cove, Belton, Temple, and the other Bell and Coryell County towns listed on the areas page. There is no menopause clinic in those cities. The visit is this one.`,
        "The page is for women in the menopause transition and after it, and for women who are not sure whether what they feel is perimenopause or something else. Perimenopause, on this site, is the earlier stretch when cycles, sleep, mood, and energy start to drift. Menopause care is the visit once that transition, or the years after it, is the question. If you are still having irregular cycles and want that earlier visit spelled out, use the Killeen perimenopause page. If you want the full hormone overview for men and women, use the hormone therapy page.",
        "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, sees patients for bioidentical hormone therapy and for the overlap of hormones, sleep, mood, and energy. She is a nurse practitioner with 26 years of clinical experience, including 10 years and six combat deployments with the U.S. Army. Larissa Garth, DMSc, MPH, MPAS, PA-C, is a physician assistant with more than 10 years of clinical experience. You can book with either clinician. Hormone plans at this clinic are clinician-directed from the evaluation and the labs. The site does not list a physician on the care team.",
      ],
      links: [
        { href: "/areas-we-serve/killeen/hormone-therapy/", label: "Hormone therapy in Killeen" },
        { href: "/areas-we-serve/killeen/hormone-therapy/perimenopause-care/", label: "Perimenopause care in Killeen" },
        { href: "/areas-we-serve/killeen/hormone-therapy/menopause-care/", label: "Killeen menopause hormone page" },
        { href: "/providers/bimisa-augustin/", label: "Bimisa Augustin" },
        { href: "/providers/larissa-garth/", label: "Larissa Garth" },
      ],
    },
    {
      heading: "Who menopause care is for",
      paragraphs: [
        "The symptoms this clinic already evaluates are hot flashes, night sweats, mood swings, weight changes, fatigue, and low libido. The menopause hormone page also names brain fog, vaginal dryness, sleep disruption, and the body-composition shifts women ask about. You do not need every item on that list to book. You do need a reason you want the history and the labs in one visit.",
        "The visit is also for women who have been told to wait the symptoms out and want a second conversation that includes labs. It is for women who have had a hysterectomy and have questions about hormone therapy afterward. It is for women in Killeen and the surrounding towns who want the appointment near home rather than a directory listing. It is not a replacement for emergency care, and it is not automatically a hormone prescription.",
        "A gynecological exam is a different appointment. That page covers routine screening. This page covers the menopause transition: symptoms, hormone labs, and a plan that may or may not include bioidentical hormones. Menstrual disorder visits are for cycle problems that are not the menopause question. If you are unsure which visit you need, call the clinic and describe the symptom. The team can point you at the right appointment type.",
        "Some women are not candidates for hormone therapy. The clinic already says bioidentical therapy can be an option for many women and is not right for everyone. History, labs, and goals are reviewed before a recommendation. Non-hormonal options are part of that conversation. The site names lifestyle measures, targeted supplementation, and non-hormonal prescriptions when hormones are not a fit. Those choices are made in the visit, not from this page.",
      ],
      links: [
        { href: "/women/gynecological-exams/", label: "Gynecological exams" },
        { href: "/women/menstrual-disorders/", label: "Menstrual disorders" },
        { href: "/areas-we-serve/temple/", label: "Temple patients" },
        { href: "/areas-we-serve/harker-heights/", label: "Harker Heights patients" },
      ],
    },
    {
      heading: "What to expect",
      paragraphs: [
        "The assessment the clinic describes has two openings. One is an in-depth conversation about symptoms, lifestyle, and medical history. The other is hormone testing, a blood draw used to look at sex hormone levels. The menopause hormone protocol published for Killeen adds lipids, metabolic markers, and bone markers to that panel, then a consult, then a prescription only if the plan calls for one. Routes named for that prescription are oral, topical, pellet, and injectable. Follow-up labs are described at 8 to 12 weeks, then on a six-month cadence when treatment continues.",
        "What that means in the room is ordinary. You talk first. You do not pick a pellet off a menu. The clinician looks at the symptoms you came in with and at the labs, including estrogen, progesterone, testosterone, FSH, LH, a thyroid panel, and metabolic markers when those are the tests this page already lists. Thyroid symptoms can overlap with menopause symptoms. The panel is how those are separated, not a promise that every woman needs every test on the list.",
        "If a hormone plan is a fit, the route depends on the labs, the history, and how you want to take it. Pellets are the longer-acting implant described on the pellet page. Injections are the adjustable route. Creams and oral doses are the other published options. Testosterone is discussed for some women. The menopause protocol says that decision is made from labs and goals, not added by default. If a hormone plan is not a fit, the visit turns to the non-hormonal options already named, and to whatever screening belongs on the gynecological exam page.",
        "Plan on being in Killeen for the appointment. Bring a medication list, the dates of your last period if you are still bleeding, any prior labs, and a short note of which symptoms are disrupting sleep or work. The address has parking in front. After the visit, the next lab date is part of the plan when treatment starts. When treatment does not start, you should still leave knowing what was measured and what the clinician recommended instead.",
        "Women coming from Temple should read the Temple page for the drive, about 35 minutes via I-14 East to I-35 North. Women in Harker Heights, Copperas Cove, Belton, and Killeen use the same suite. The Killeen hormone therapy page explains how menopause sits next to the rest of the hormone service, including care for men. This page stays with the menopause question.",
      ],
      links: [
        { href: "/hormone-therapy/", label: "All hormone therapy" },
        { href: "/areas-we-serve/killeen/hormone-therapy/bhrt-pellets/", label: "Pellet therapy in Killeen" },
        { href: "/contact/", label: "Contact the clinic" },
      ],
    },
  ],
  faqs: [
    {
      q: "Where do I go for a menopause visit?",
      a: `The clinic is at ${CLINIC}. Call ${PHONE}. Patients from Killeen, Harker Heights, Copperas Cove, Belton, and Temple are seen at this address.`,
    },
    {
      q: "Is this the same as a gynecological exam?",
      a: "No. A gynecological exam is the screening visit. A menopause visit reviews symptoms and hormone labs and may include a treatment plan. You can book either visit, or both.",
    },
    {
      q: "Do you prescribe hormones at the first visit?",
      a: "Only when the history and the labs support a plan. The clinic reviews both before recommending bioidentical hormones, and it will say when hormones are not the right fit.",
    },
    {
      q: "What labs are usually part of the workup?",
      a: "The menopause page lists estrogen, progesterone, testosterone, FSH, LH, a thyroid panel, and metabolic markers, adjusted to your concerns. The Killeen menopause protocol also names lipids and bone markers.",
    },
    {
      q: "What if I do not want hormones?",
      a: "Say that at the visit. The clinic already offers non-hormonal approaches, including lifestyle measures, targeted supplementation, and non-hormonal prescriptions, when hormones are not wanted or are not a fit.",
    },
    {
      q: "Who would I see?",
      a: "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, or Larissa Garth, DMSc, MPH, MPAS, PA-C. Bimisa is a nurse practitioner. Larissa is a physician assistant. Both see patients at the Killeen clinic.",
    },
  ],
};

export const KILLEEN_MENOPAUSE_DEPTH: DepthPage = {
  sections: [
    {
      heading: "Menopause hormone care for women in Killeen",
      paragraphs: [
        `This is the Killeen page for menopause hormone replacement. The visit is at ${CLINIC}, the same suite as every other service. Women who live in Killeen are not driving to another town for this appointment. Women in Harker Heights, Copperas Cove, Belton, and Temple use this clinic too, and their own city pages describe that drive. The longer clinical explanation of symptoms, labs, and what the assessment includes is on the menopause care page. This page is the local one.`,
        "Killeen patients include Fort Cavazos families, first responders, hospital shift workers, and people who want the visit close to South Fort Hood Street or East Stan Schlueter Loop. The menopause protocol published for this clinic uses estradiol, progesterone, and, when labs and goals support it, testosterone. It is not a single product. The routes are oral, topical, pellet, and injectable. The choice is made after a lab panel and a history, including lipids, metabolic markers, and bone markers as that protocol describes them.",
        "Hot flashes, night sweats, disrupted sleep, mood change, brain fog, low libido, vaginal dryness, and body-composition shifts are the concerns already listed for this treatment. You can book because of one of them. You should expect the clinician to ask about the rest, and to say so if the picture does not fit menopause hormone care. Perimenopause, when cycles are still changing, has its own Killeen page. Use that one if the question is the years before periods stop.",
      ],
      links: [
        { href: "/women/menopausal-disorders/", label: "Menopause care overview" },
        { href: "/areas-we-serve/killeen/hormone-therapy/", label: "Hormone therapy in Killeen" },
        { href: "/areas-we-serve/killeen/hormone-therapy/perimenopause-care/", label: "Perimenopause care in Killeen" },
        { href: "/providers/bimisa-augustin/", label: "Book with Bimisa Augustin" },
        { href: "/providers/larissa-garth/", label: "Book with Larissa Garth" },
      ],
    },
    {
      heading: "What a Killeen menopause visit includes",
      paragraphs: [
        "The published protocol is a comprehensive lab panel, a clinician consult, a prescription only when the plan calls for hormones, a re-check at 8 to 12 weeks, and then a six-month cadence if you stay on therapy. Bring prior labs if a Temple or Killeen clinician has already drawn them. The consult still reviews symptoms and history. A result from somewhere else does not skip that conversation.",
        "Bimisa Augustin and Larissa Garth are the clinicians on the public team. Bimisa is a nurse practitioner (DNP, FNP-C, PMHNP-BC) with 26 years of clinical experience. Larissa is a physician assistant (DMSc, MPH, MPAS, PA-C) with more than 10 years of clinical experience. Psychiatric training is part of how Bimisa reads fatigue and mood. The site is explicit that a hormone visit does not turn into a psychiatry intake. If the labs point somewhere else, that is said before a protocol starts.",
        `Call ${PHONE} or book online. Parking is in front of the suite. If you also need a gynecological exam or a menstrual-disorder visit, those are separate pages and separate appointments. If your partner is asking about testosterone, that is the men's testosterone page, not this one.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Is the menopause visit in Killeen or in another city?",
      a: `In Killeen, at ${CLINIC}. There is no menopause office in Temple, Belton, or Harker Heights.`,
    },
    {
      q: "How is this page different from the main menopause page?",
      a: "The main menopause page explains the assessment, who it is for, and what to expect. This page is the Killeen treatment page: the local protocol, the clinic address, and how women who live here book it.",
    },
    {
      q: "Will testosterone be added automatically?",
      a: "No. The published menopause protocol says testosterone is considered from labs and goals. It is not added by default.",
    },
  ],
};

export function depthWordCount(page: DepthPage): number {
  const parts = [
    ...page.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ];
  return parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
}
