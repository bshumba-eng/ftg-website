/* ==========================================================================
   FTG — configuration and seed content
   Everything here is placeholder content for the demo. Edit it, or change it
   in the admin area. See README.md for how to go from demo to production.
   ========================================================================== */
window.FTG_CONFIG = {
  brand: "Finesse The Game Promotions",
  short: "FTG",
  instagram: "https://www.instagram.com/finessethegame_ftg/",
  tiktok: "",               // add the TikTok URL here when it launches
  whatsapp: "",             // add the WhatsApp Community invite link here when it launches
  techItOutUrl: "https://bshumba-eng.github.io/tech_it_out_and_care_creations/",
  appUrl: "app.html",       // replace with the App Store / Google Play / web-app link
  ppvPrice: 15,
  currency: "EUR",
  liveYouTubeId: "",        // YouTube video or live ID for the broadcast, e.g. "dQw4w9WgXcQ"
  stripePaymentLink: "",    // Stripe Payment Link (https://buy.stripe.com/...) for the €15 PPV
  formEndpoint: "",         // optional Formspree-style URL; contact forms are also POSTed here
  demoMode: true,           // true = payments are simulated and forms are saved in this browser only
  contactEmail: "hello@ftg.example",
  ticketTiers: [
    { id: "general", name: "General Admission", price: 35, blurb: "Unreserved standing and tiered seating." },
    { id: "ringside", name: "Ringside", price: 85, blurb: "Reserved seat on the ring apron." },
    { id: "vip", name: "VIP Experience", price: 160, blurb: "Ringside seat, hospitality and fighter meet and greet." }
  ]
};

window.FTG_SEED = {
  version: 1,

  events: [
    { id: "ev-fn1", type: "fight", title: "FTG Fight Night I", date: "2026-03-14T19:00", venue: "Docklands Event Hall", city: "Dublin", capacity: 1800, ppv: false, published: true,
      description: "The night FTG opened its doors. Eight bouts, a sold-out hall and a card that set the standard." },
    { id: "ev-fn2", type: "fight", title: "FTG Fight Night II", date: "2026-06-27T19:00", venue: "Docklands Event Hall", city: "Dublin", capacity: 2200, ppv: true, published: true,
      description: "Bigger room, bigger names. Fight Night II introduced FTG pay-per-view to fight fans everywhere." },
    { id: "ev-fn3", type: "fight", title: "FTG Fight Night III", date: "2026-10-24T19:00", venue: "Docklands Event Hall", city: "Dublin", capacity: 2600, ppv: true, published: true,
      description: "Ten bouts, a roaring crowd and the best FTG night yet, with more than a thousand viewers on pay-per-view." },
    { id: "ev-train1", type: "training", title: "FTG Open Training Day", date: "2026-12-05T11:00", venue: "FTG Fight Lab", city: "Dublin", capacity: 120, ppv: false, published: true,
      description: "Meet the fighters, watch a full camp session and ask your questions. Free entry, limited space." },
    { id: "ev-press4", type: "press", parentId: "ev-fn4", title: "Live Press Conference", date: "2027-02-14T15:00", venue: "Docklands Event Hall", city: "Dublin", capacity: 300, ppv: false, published: true,
      description: "Every fighter on the card, face to face. Streamed live on FTG." },
    { id: "ev-weigh4", type: "weighin", parentId: "ev-fn4", title: "Weigh-In Day", date: "2027-02-19T14:00", venue: "Docklands Event Hall", city: "Dublin", capacity: 600, ppv: false, published: true,
      description: "Public weigh-in and the final face-offs before fight night. Free entry." },
    { id: "ev-fn4", type: "fight", title: "FTG Fight Night IV", date: "2027-02-20T19:00", venue: "Docklands Event Hall", city: "Dublin", capacity: 3000, ppv: true, published: true, featured: true,
      description: "Six FTG fighters, one ring and a card built to sell out. Doors at 18:00, first bell at 19:00." },
    { id: "ev-fn5", type: "fight", title: "FTG Fight Night V", date: "2027-05-15T19:00", venue: "Venue to be announced", city: "Dublin", capacity: 3000, ppv: true, published: true,
      description: "The spring card. Venue and full line-up to be announced." },
    { id: "ev-fn6", type: "fight", title: "FTG Fight Night VI", date: "2027-09-18T19:00", venue: "Venue to be announced", city: "Dublin", capacity: 3500, ppv: true, published: true,
      description: "The autumn showpiece. Venue and full line-up to be announced." },
    { id: "ev-fn7", type: "fight", title: "FTG Fight Night VII", date: "2027-12-11T19:00", venue: "Venue to be announced", city: "Dublin", capacity: 3500, ppv: true, published: true,
      description: "The year-end card. Venue and full line-up to be announced." }
  ],

  fighters: [
    { id: "darragh-quill", name: "Darragh Quill", nickname: "Dash", number: 1, weightClass: "Welterweight", record: { w: 14, l: 1, d: 0, ko: 9 }, age: 27, height: "5'11\"", reach: "73\"", stance: "Orthodox", hometown: "Dublin", gloves: "#2cff4a", published: true, photo: "",
      bio: "Darragh \"Dash\" Quill is the face of FTG. A sharp, rhythmic boxer-puncher out of Dublin, he turned professional at 21 and has built his name on footwork, patience and a left hook that arrives when opponents least expect it. Since joining FTG he has won every fight he has taken, and he headlines Fight Night IV.",
      nextFight: { eventId: "ev-fn4", opponent: "Marcus Teller", slot: "Main event", weight: "Welterweight", rounds: 10, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Declan Moore", result: "W", method: "KO 3", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Rhys Callan", result: "W", method: "UD 10", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Andrei Voss", result: "W", method: "TKO 5", event: "FTG Fight Night I" },
        { date: "2025-11-08", opponent: "Tomás Rey", result: "W", method: "UD 8", event: "Dublin Showcase" },
        { date: "2025-07-12", opponent: "Elliot Barr", result: "L", method: "SD 8", event: "Dublin Showcase" }
      ],
      training: { venue: "FTG Fight Lab", address: "Unit 4, Foundry Row, Dublin 8", days: "Saturdays", time: "11:00 to 12:30", note: "Open sessions during camp. Fans welcome, free entry. Filming of sparring is not permitted." },
      owedNote: "" },
    { id: "kelechi-adeyemi", name: "Kelechi Adeyemi", nickname: "KO", number: 2, weightClass: "Middleweight", record: { w: 11, l: 0, d: 0, ko: 10 }, age: 25, height: "6'0\"", reach: "76\"", stance: "Southpaw", hometown: "Cork", gloves: "#ffffff", published: true, photo: "",
      bio: "Ten knockouts in eleven wins tells you everything about Kelechi Adeyemi. The unbeaten Cork southpaw carries real power in both hands and has never needed the scorecards. He is the most feared puncher on the FTG roster and co-headlines Fight Night IV.",
      nextFight: { eventId: "ev-fn4", opponent: "Piotr Wasik", slot: "Co-main event", weight: "Middleweight", rounds: 10, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Ben Hollis", result: "W", method: "KO 2", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Nikolai Park", result: "W", method: "KO 4", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Gary Stott", result: "W", method: "KO 1", event: "FTG Fight Night I" },
        { date: "2025-12-06", opponent: "Isaac Dunn", result: "W", method: "TKO 3", event: "Cork Fight Series" }
      ],
      training: { venue: "Cork Iron Boxing Club", address: "12 Quay Lane, Cork", days: "Tuesdays and Thursdays", time: "18:30 to 20:00", note: "Public viewing area is open during camp. Please check in at the front desk." } },
    { id: "tiernan-vale", name: "Tiernan Vale", nickname: "The Architect", number: 3, weightClass: "Light Heavyweight", record: { w: 9, l: 2, d: 0, ko: 5 }, age: 29, height: "6'2\"", reach: "78\"", stance: "Orthodox", hometown: "Limerick", gloves: "#2cff4a", published: true, photo: "",
      bio: "Tiernan Vale builds fights round by round. A patient, technical light heavyweight from Limerick, he is a student of the sport and one of the smartest ring generals on the roster. Two close decision losses made him sharper, and he returns on Fight Night IV.",
      nextFight: { eventId: "ev-fn4", opponent: "Gordon Pike", slot: "Chief supporting bout", weight: "Light Heavyweight", rounds: 8, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Marek Sova", result: "W", method: "UD 8", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Terrence Boyd", result: "L", method: "SD 8", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Fionn Lacey", result: "W", method: "TKO 6", event: "FTG Fight Night I" },
        { date: "2025-09-20", opponent: "Owen Slade", result: "W", method: "UD 6", event: "Limerick Fight Night" }
      ],
      training: { venue: "Limerick Southside Boxing Club", address: "Mill Road, Limerick", days: "Mondays and Wednesdays", time: "19:00 to 20:30", note: "Spectators welcome in the gallery. Free entry." } },
    { id: "jamal-okoro", name: "Jamal Okoro", nickname: "Jet", number: 4, weightClass: "Lightweight", record: { w: 12, l: 2, d: 1, ko: 6 }, age: 26, height: "5'8\"", reach: "68\"", stance: "Orthodox", hometown: "Dublin", gloves: "#ffffff", published: true, photo: "",
      bio: "Fast hands, faster feet. Jamal \"Jet\" Okoro is the busiest fighter on the FTG roster, a high-volume lightweight who throws combinations from every angle and rarely takes a round off. A fan favourite from the first FTG card, he is ready for his next step.",
      nextFight: { eventId: "ev-fn4", opponent: "Santi Ferreira", slot: "Featured bout", weight: "Lightweight", rounds: 8, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Niall Prender", result: "D", method: "MD 8", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Hugo Marchetti", result: "W", method: "UD 8", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Kai Lorimer", result: "W", method: "UD 8", event: "FTG Fight Night I" }
      ],
      training: { venue: "FTG Fight Lab", address: "Unit 4, Foundry Row, Dublin 8", days: "Saturdays", time: "11:00 to 12:30", note: "Open sessions during camp. Fans welcome, free entry." } },
    { id: "ruairi-stanton", name: "Ruairí Stanton", nickname: "The Gael", number: 5, weightClass: "Super Welterweight", record: { w: 8, l: 1, d: 0, ko: 4 }, age: 24, height: "5'10\"", reach: "71\"", stance: "Orthodox", hometown: "Galway", gloves: "#2cff4a", published: true, photo: "",
      bio: "Ruairí Stanton is a hard-nosed super welterweight from Galway with a never-say-die engine and a body shot that wears opponents down. His only loss came in a close fight on Fight Night I, and he has won both bouts since.",
      nextFight: { eventId: "ev-fn4", opponent: "Callum Dray", slot: "Featured bout", weight: "Super Welterweight", rounds: 8, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Dylan Rourke", result: "W", method: "TKO 4", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Alvaro Cruz", result: "W", method: "UD 8", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Nathan Pryce", result: "L", method: "UD 8", event: "FTG Fight Night I" }
      ],
      training: { venue: "Galway Harbour Boxing Gym", address: "Dock Road, Galway", days: "Tuesdays and Fridays", time: "18:00 to 19:30", note: "Visitors welcome. Please arrive ten minutes early." } },
    { id: "liam-fennelly", name: "Liam Fennelly", nickname: "Lights", number: 6, weightClass: "Featherweight", record: { w: 7, l: 0, d: 0, ko: 3 }, age: 23, height: "5'7\"", reach: "69\"", stance: "Southpaw", hometown: "Dublin", gloves: "#ffffff", published: true, photo: "",
      bio: "Liam \"Lights\" Fennelly is the youngest unbeaten fighter on the FTG roster. A slick southpaw featherweight with fast hands and ring IQ beyond his years, he is a name to watch in 2027.",
      nextFight: { eventId: "ev-fn4", opponent: "Yusuf Demir", slot: "Undercard", weight: "Featherweight", rounds: 6, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Bogdan Ilie", result: "W", method: "UD 6", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Cian Doyle", result: "W", method: "TKO 2", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Reece Alder", result: "W", method: "UD 6", event: "FTG Fight Night I" }
      ],
      training: { venue: "FTG Fight Lab", address: "Unit 4, Foundry Row, Dublin 8", days: "Saturdays", time: "11:00 to 12:30", note: "Open sessions during camp. Fans welcome, free entry." } },
    { id: "mateus-brannigan", name: "Mateus Brannigan", nickname: "The Wall", number: 7, weightClass: "Heavyweight", record: { w: 10, l: 3, d: 0, ko: 8 }, age: 31, height: "6'5\"", reach: "81\"", stance: "Orthodox", hometown: "Belfast", gloves: "#2cff4a", published: true, photo: "",
      bio: "At 6'5\" with an 81-inch reach, Mateus Brannigan is as big as they come. The Belfast heavyweight has eight knockouts in ten wins and is the biggest puncher in the FTG gym. He is in camp for Fight Night V.",
      nextFight: { eventId: "ev-fn5", opponent: "Opponent to be announced", slot: "To be announced", weight: "Heavyweight", rounds: 10, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Lars Eklund", result: "W", method: "KO 2", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Samuel Okeke", result: "W", method: "TKO 5", event: "FTG Fight Night II" },
        { date: "2026-02-07", opponent: "Jonas Rehn", result: "L", method: "UD 8", event: "Belfast Boxing Night" }
      ],
      training: { venue: "Lagan Boxing Club", address: "Docks Road, Belfast", days: "Mondays, Wednesdays and Fridays", time: "18:00 to 19:30", note: "Visitors welcome in the viewing area. Free entry." } },
    { id: "sione-hartigan", name: "Sione Hartigan", nickname: "Smoke", number: 8, weightClass: "Super Featherweight", record: { w: 6, l: 1, d: 0, ko: 2 }, age: 22, height: "5'9\"", reach: "70\"", stance: "Orthodox", hometown: "Waterford", gloves: "#ffffff", published: true, photo: "",
      bio: "Sione \"Smoke\" Hartigan is a rising super featherweight from Waterford who fights with calm and control. Still only 22, he is learning quickly and his next date will be announced soon.",
      nextFight: { eventId: "", opponent: "Opponent to be announced", slot: "Next fight to be announced", weight: "Super Featherweight", rounds: 8, ticketUrl: "" },
      previousFights: [
        { date: "2026-10-24", opponent: "Eoin Garvey", result: "W", method: "UD 6", event: "FTG Fight Night III" },
        { date: "2026-06-27", opponent: "Mikey Troy", result: "L", method: "SD 6", event: "FTG Fight Night II" },
        { date: "2026-03-14", opponent: "Callum Neary", result: "W", method: "UD 6", event: "FTG Fight Night I" }
      ],
      training: { venue: "Waterford Quay Boxing Club", address: "Quay Road, Waterford", days: "Tuesdays and Thursdays", time: "18:00 to 19:30", note: "Visitors welcome. Please check in at the front desk." } }
  ],

  /* Fighter pull: used to weight the demo analytics so the stats pages tell a believable story. */
  fighterPull: { "darragh-quill": 1.0, "kelechi-adeyemi": 0.86, "jamal-okoro": 0.62, "tiernan-vale": 0.48, "ruairi-stanton": 0.4, "liam-fennelly": 0.34, "mateus-brannigan": 0.27, "sione-hartigan": 0.16 },

  photos: [
    { id: "p1", cat: "Fight Night", title: "Walkout, Fight Night III", scene: "spot", seed: 3 },
    { id: "p2", cat: "Fight Night", title: "Main event, Fight Night III", scene: "ring", seed: 5 },
    { id: "p3", cat: "Weigh-In", title: "Face-off, weigh-in day", scene: "scale", seed: 7 },
    { id: "p4", cat: "Training", title: "Pad work in camp", scene: "gloves", seed: 9 },
    { id: "p5", cat: "Crowd", title: "The Docklands crowd", scene: "crowd", seed: 11 },
    { id: "p6", cat: "Press", title: "Press conference, Fight Night II", scene: "mic", seed: 13 },
    { id: "p7", cat: "Fight Night", title: "Ring set-up, Fight Night II", scene: "ring", seed: 15 },
    { id: "p8", cat: "Training", title: "Roadwork before sunrise", scene: "spot", seed: 17 },
    { id: "p9", cat: "Weigh-In", title: "On the scales", scene: "scale", seed: 19 },
    { id: "p10", cat: "Crowd", title: "Ringside energy", scene: "crowd", seed: 21 },
    { id: "p11", cat: "Press", title: "Head to head", scene: "mic", seed: 23 },
    { id: "p12", cat: "Training", title: "Sparring day", scene: "gloves", seed: 25 }
  ],

  videos: [
    { id: "v1", title: "Camp Diaries: Eight Weeks Out", cat: "Fight Prep", length: "6:42", youtubeId: "", scene: "gloves", seed: 31,
      blurb: "Inside the early weeks of camp, from roadwork to the first hard sparring rounds." },
    { id: "v2", title: "Scouting the Venue", cat: "Locations", length: "4:18", youtubeId: "", scene: "crowd", seed: 33,
      blurb: "How FTG chooses a venue: sightlines, capacity, fighter access and atmosphere." },
    { id: "v3", title: "Building the Ring", cat: "Event Set-Up", length: "5:09", youtubeId: "", scene: "ring", seed: 35,
      blurb: "From an empty hall to a fight-night arena in one day." },
    { id: "v4", title: "Fight Week: Fighter Prep", cat: "Fight Prep", length: "7:21", youtubeId: "", scene: "spot", seed: 37,
      blurb: "Weight cuts, final pad sessions and fight-week routines." },
    { id: "v5", title: "Lighting and Stage Design", cat: "Event Set-Up", length: "3:55", youtubeId: "", scene: "mic", seed: 39,
      blurb: "The crew behind the walkout lights, screens and sound." },
    { id: "v6", title: "Choosing the Fight Night Location", cat: "Locations", length: "5:33", youtubeId: "", scene: "scale", seed: 41,
      blurb: "A look at the shortlist for the next FTG fight night." }
  ],

  team: {
    leadership: [
      { name: "Alex Finnegan", role: "Co-Founder and Lead Promoter", bio: "Sets the vision for every FTG card and sits in every fighter's corner when contracts are signed." },
      { name: "Jordan Okafor", role: "Co-Founder and Head of Matchmaking", bio: "Builds the fights. Spends the weeks before every card on the phone finding the right opponent." },
      { name: "Niamh Gallagher", role: "Head of Operations", bio: "Runs the logistics behind the show, from venue contracts to fighter travel." },
      { name: "Callum Brady", role: "Head of Partnerships", bio: "Looks after sponsors, partners and community links across the FTG family." }
    ],
    behind: [
      { name: "Coaches and cornermen", text: "The trainers and cut men who prepare every fighter for the first bell and work the corner on fight night." },
      { name: "Medical and safety", text: "Ringside doctors, paramedics and licensed officials. Fighter safety comes before everything else." },
      { name: "Media and content", text: "The camera crew, editors and photographers who capture camp, weigh-ins and fight night." },
      { name: "Fighter welfare", text: "Support for nutrition, recovery and life outside the ring, because fighters come first." }
    ],
    events: [
      { name: "Sinéad Walsh", role: "Event Director", bio: "Owns the run sheet from doors to final bell." },
      { name: "Marcus Idowu", role: "Production Manager", bio: "Lighting, sound, screens and the walkout experience." },
      { name: "Aoife Brennan", role: "Ticketing and Guest Relations", bio: "Gets every fan through the door and to their seat." },
      { name: "Tom Keane", role: "Safety and Security Lead", bio: "Keeps the venue, the fighters and the fans safe." },
      { name: "Priya Nair", role: "Fighter Liaison", bio: "Looks after fighters and their teams from arrival to departure." },
      { name: "Ger Mullins", role: "Ring Crew Chief", bio: "Builds, checks and strips the ring for every show." }
    ]
  },

  sponsors: [
    { id: "sp-tio", name: "Tech It Out", tier: "Technology Partner" },
    { id: "sp-harbour", name: "Harbour Gym Supplies", tier: "Official Equipment Partner" },
    { id: "sp-northside", name: "Northside Motors", tier: "Fight Night Sponsor" },
    { id: "sp-emerald", name: "Emerald Print Co.", tier: "Print Partner" }
  ],

  openingBalance: 18500
};
