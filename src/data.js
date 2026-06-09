// Shared content data for the Levcreates portfolio.
// Real links are wired throughout; media lives in /public/assets and is
// referenced with root-absolute paths (e.g. /assets/lev-portrait.jpg).
// Each section is keyed by its nav id.

export const LEV_DATA = {
  name: 'Levi Vandenheede',
  handle: 'Levcreates',
  tagline: 'Stories in every medium — journalism, film, sound & music',
  email: 'Levivandenheede@icloud.com',
  location: 'Belgium · available worldwide',

  // Front-page intro — warm, first-person.
  intro: {
    lead: "Hi, I'm Levi.",
    body: "I've poked my way through just about every corner of media and entertainment — journalism, communications, content marketing, radio, Immersive experience, Themeparks, film, fiction and non-fiction, even a Japanese/American game show project. If there's a way to tell a story, I've probably tried it. Somewhere along the line I realised the one story I hadn't told yet was my own, so I started making music too.",
    body2: "Levcreates is a small window into all of that: the school projects, the work I made while studying abroad and stretching my horizons, my own branding experiments, and the freelance jobs in between. Some of it's polished, some of it's a beautiful mess. All of it's mine — have a look around.",
  },

  socials: [
    { label: 'Instagram', handle: '@levivandenheede', url: 'https://www.instagram.com/levivandenheede/' },
    { label: 'Instagram · Lev.wav', handle: '@lev.wav', url: 'https://www.instagram.com/lev.wav/' },
    { label: 'TikTok', handle: '@lev.wav', url: 'https://www.tiktok.com/@lev.wav' },
    { label: 'LinkedIn', handle: 'Levi Vandenheede', url: 'https://www.linkedin.com/in/levi-vandenheede-4913b62a0/' },
  ],

  // Featured documentary for the homepage (links out — broadcaster player can't embed).
  docu: {
    title: 'The story I had to tell',
    kicker: 'Documentary · Telefacts NU',
    desc: 'A Telefacts NU documentary about me, and about what music can do for mental health — made for Rode Neuzen Dag. Watch the official teaser on HLN, or the full documentary on VTM GO.',
    teaserUrl: 'https://www.hln.be/video/productie/telefacts-nu-kan-muziek-levens-redden-183096-183096',
    url: 'https://www.vtmgo.be/vtmgo/afspelen/6206beff-cdb4-4230-81bf-a7223ddb2b48',
    cta: 'WATCH TEASER · HLN',
    cta2: 'FULL DOCU · VTM GO',
  },

  // === SECTIONS (order + naming as requested) ===
  sections: [
    { id: 'music',      num: '01', nav: 'Music',         full: 'LevMusic',                     accent: 'gold',
      kicker: 'MUSIC · LEV.WAV · STUDIO',
      blurb: 'Music made and released as Lev. — bedroom-pop with a noir edge. Singles, an EP, and more in the studio.' },
    { id: 'journalism', num: '02', nav: 'Journalism',    full: 'LevJournalism',                accent: 'teal',
      kicker: 'WRITING · CRITICISM · REPORTAGE',
      blurb: 'Long-form, criticism and interviews. Major pieces live on Readymag — read them there in full.' },
    { id: 'comms',      num: '03', nav: 'Comms',         full: 'LevCommunication & Marketing', accent: 'burgundy',
      kicker: 'COMMS · CONTENT · CAMPAIGNS',
      blurb: 'Communication and content-marketing work — radio, podcast, campaigns, branded storytelling and the strategy underneath it.' },
    { id: 'film',       num: '04', nav: 'Film',          full: 'LevFilm & Video',              accent: 'red',
      kicker: 'FILM · VIDEO · MOVING IMAGE',
      blurb: 'Documentary, fiction and vlog. The moving-image catalogue — full reels live on YouTube.' },
    { id: 'freelance',  num: '05', nav: 'Freelance',     full: 'LevFreelance & Stories',       accent: 'gold',
      kicker: 'MUSIC JOURNALISM · DANSENDE BEREN',
      blurb: 'My freelance home base: live reviews and music journalism for Dansende Beren — plus the festival vlogs and branding work in the margins.' },
    { id: 'abroad',     num: '06', nav: 'Abroad',        full: 'LevAbroad',                    accent: 'teal',
      kicker: 'ERASMUS · ON THE ROAD',
      blurb: 'Made while studying abroad and widening my horizons — three months of cameras, notebooks and trains.' },
  ],

  // === SECTION CONTENT ===
  // Film — a hero highlight + themed groups. Each video is an inline player
  // (play button + sound).
  filmPage: {
    highlight: {
      id: 'heU7c9wdqqw',
      title: "Text Me When You're Home",
      poster: '/assets/text-me-poster.jpg',
      kind: 'Short film · Fiction',
      year: '2026',
      festival: 'Mechelen Filmfestival',
      blurb: 'A short film made for the Mechelen Filmfestival with a crew of international students — fiction, on the big screen written and directed by me.',
    },
    groups: [
      {
        id: 'fiction', theme: 'Fiction Netflix project · Pilot for Korean webtoon adaptation Gourmet Hound', accent: 'burgundy', num: '01',
        kicker: 'SERIES PILOT · TRAILER',
        blurb: 'Trailer for our series pilot — a Netflix show pilot, made with the team.',
        poster: '/assets/gourmet-hound-poster.png',
        videos: [
          { id: 'lSGSH-ohgys', title: 'Gourmet Hound — Pilot Trailer', kind: 'Pilot · Trailer', year: '2026' },
        ],
      },
      {
        id: 'gameshow', theme: 'Live · Gameshow', accent: 'red', num: '02',
        kicker: 'LIVE BROADCAST · ENTERTAINMENT',
        blurb: 'Our gameshow, streamed live — produced and run with the team.',
        videos: [
          { id: 'LmBpLvfCDZY', title: 'Gameshow — Live Stream', kind: 'Live · Gameshow', year: '' },
        ],
      },
      {
        id: 'journalism', theme: 'Journalism', accent: 'teal', num: '03',
        kicker: 'REPORTAGE · NEWS · INTERVIEWS',
        blurb: 'News items, reportage and interviews — on camera and in the edit.',
        videos: [
          { id: '1iKsZ7RM5WI', title: 'TV Nieuwsitem — Covid Reportage', kind: 'News item · Reportage', year: '' },
          { id: 'gmMFEAALDT8', title: 'Milan Verkindere — Music Interview', kind: 'Interview · Music', year: '' },
        ],
      },
      {
        id: 'erasmus', theme: 'Erasmus · Canada', accent: 'gold', num: '04',
        kicker: 'ON EXCHANGE · IN THE NEWSROOM',
        blurb: 'Made on exchange in Canada — anchoring the news and interviewing the people behind it.',
        videos: [
          { id: 'DfXBhMKRw4k', title: 'News Anchor', kind: 'TV anchor · Full broadcast', year: '2023' },
          { id: 'NrEw8zIz4f4', title: 'Andria Case — Anchor Interview', kind: 'Interview', year: '2023' },
        ],
      },
      {
        id: 'commercial', theme: 'Commercial', accent: 'rust', num: '05',
        kicker: 'PROMO · BRANDED · ON COMMISSION',
        blurb: 'Commissioned promo work — branded video for a local organic business.',
        videos: [
          { id: 'qYdOOAieaOg', title: 'Organic Shop & Café — Ghent', kind: 'Promo · Branded', year: '' },
        ],
      },
    ],
  },

  // Music
  spotifyArtist: '65ljpCqOVR48eMuuZNI4QW',
  musicLinks: {
    spotify:    'https://open.spotify.com/artist/65ljpCqOVR48eMuuZNI4QW',
    apple:      'https://music.apple.com/be/artist/lev/1516308888?l=nl',
    soundcloud: 'https://soundcloud.com/user-353159874',
    tiktok:     'https://www.tiktok.com/@lev.wav',
    instagram:  'https://www.instagram.com/lev.wav/',
  },
  latestSpotifyTrack: '660r8vkIOaYtaveAG12sk2',
  soundcloudHighlight: 'https://soundcloud.com/user-353159874/hug-me-till-i-smell-like-you-1',
  musicPhoto: '/assets/lev-studio.jpg',
  musicYouTube: 'UF4REOKLReI',
  // Editable intro copy for the music page.
  musicIntro: "The artist project — bedroom-pop with a noir edge, and the place where the story I'm telling is finally my own. New music out now, with more in the studio.",

  // Journalism — two flagship Readymag projects + video reportage.
  journalismPhoto: '/assets/journalism-vtm.jpg',
  journalism: [
    { title: 'Eco-Anxiety', kind: 'Thesis project · Readymag', year: '2024',
      desc: 'My thesis: a multimedia long-read on eco-anxiety — how a generation carries the weight of a warming planet.',
      tag: 'GRADUATION THESIS',
      url: 'https://readymag.website/ahsjournalistiek/4804228/eco-awakening/' },
    { title: 'Across Borders — Aragón', kind: 'Cross-border reportage · Readymag', year: '2024',
      desc: 'A cross-border journalism project from Aragón, Spain — how hiking and climbing in wild nature shapes, and strains, the environment around it.',
      tag: 'SPAIN · ON LOCATION',
      url: 'https://readymag.website/ahsjournalistiek/4819453/' },
  ],
  journalismVideos: [
    { id: '13DKBb4s-eA', title: 'Reportage I - Ralph with Beckers disease',          kind: 'Video reportage', year: '2024' },
    { id: 'D0BQUrxpTR8', title: 'Reportage II - New inclusive library Middle school Ghent',         kind: 'Video reportage', year: '2024' },
    { id: 'JqEYURKsIx0', title: 'Director Interview Chrisann Hessing',   kind: 'Toronto Film Festival', year: '2024' },
  ],

  // Communication & content marketing — bespoke page (BPageComms).
  commsPage: {
    noordzee: {
      title: 'Noordzee Drones',
      kind: 'Final project · Campaign & content',
      year: '2025',
      tagline: "Belgium's biggest drone-school company",
      desc: "Our graduation project, built for Noordzeedrones — the biggest drone-school company in Belgium and European leader in drone training. A full communication and content-marketing concept: strategy, channel plan and the social content to carry it, delivered end to end.",
      canva: 'https://canva.link/wdyyu5mubequ231',
      tiktok: '/assets/noordzee-tiktok.mp4',
      tiktokNote: 'Hand-coded captions, edited and timed for TikTok.',
    },
    crombe: {
      title: 'Crombé Wines & Spirits',
      kind: 'Internship · Content & editorial',
      desc: "My internship at Crombé Wines & Spirits — running their content end to end. A social content video, and a full magazine: every interview, article and piece of content inside it written and made by me.",
      video: '/assets/crombe-content.mp4',
      videoNote: 'Branded content video — concept, shoot & edit.',
      magazineTitle: 'Crombézine',
      magazineIssue: 'April 2025',
      magazineDesc: 'A full magazine for Crombé — every interview, article and visual made by me.',
      magazine: 'https://cdn.shopify.com/s/files/1/0708/6414/2617/files/Crombezine_april_2025.pdf?v=1744879334',
    },
    radio: {
      photo: '/assets/radio-studio.jpg',
      video: '/assets/radio-studio.mp4',
      title: 'On air',
      kind: 'Radio · In studio',
      desc: 'Producing and presenting live in the radio studio — script, board and voice.',
    },
    portfolio: {
      title: 'A portfolio, inside a portfolio (in Dutch)',
      kind: 'Degree project · Self-presentation',
      desc: 'The personal portfolio I had to build and present for a course within Communication to experience new skills and creativity — flip through every page right here.',
      pdf: '/assets/portfolio-levi.pdf',
    },
  },

  // Freelance & Stories — bespoke page (BPageFreelance).
  freelancePage: {
    outlet: 'Dansende Beren',
    authorUrl: 'https://www.dansendeberen.be/author/levi-vandenheede/',
    intro: "Most of my freelance writing lives at Dansende Beren — live reviews, concert reportage and music journalism. Some pieces run under a festival banner like Pukkelpop; the rest sit under my own name. Click my byline anywhere here to read the full archive.",
    highlight: {
      title: 'Wu-Tang Clan @ ING Arena: Voor altijd',
      kind: 'Live review · Dansende Beren',
      author: 'Levi Vandenheede',
      date: '16 March 2026',
      readtime: '13 min read',
      image: 'https://www.dansendeberen.be/wp-content/uploads/2026/03/WuTang-ChrisStessens1-1-scaled.jpg',
      credit: '© CPU — Chris Stessens',
      excerpt: 'Dertig jaar geleden veranderde een collectief uit Staten Island de hiphop voorgoed. Enter the Wu-Tang (36 Chambers) was in 1993 niet zomaar een debuutalbum — het was een seismische verschuiving die het genre en de cultuur naar nieuwe dimensies trok.',
      url: 'https://www.dansendeberen.be/2026/03/16/wu-tang-clan-ing-arena-voor-altijd/',
    },
    tiktoks: [
      { id: '7613782770489281825', label: 'Festival vlog' },
      { id: '7120613527504604421', label: 'Concert review' },
      { id: '7622750110681697568', label: 'Live cut' },
    ],
    rebrand: {
      title: 'XXXTENTACION — Rebrand',
      kind: 'Brand & art direction · Concept',
      desc: 'A self-initiated rebranding study: visual identity, type and art direction built out across a full deck. Flip through every page.',
      pdf: '/assets/xxxtentacion-rebrand.pdf',
      pages: 14,
    },
  },

  // Abroad — bespoke page (BPageAbroad).
  abroad: [
    { title: 'Erasmus, Toronto Canada',   kind: 'Travel · Photo', year: '2023', desc: 'Four months. An Iphone and an insane amount of memories. A field journal of a city in motion.', image: null },
    { title: 'Aragon',      kind: 'Journalism · Snaps',  year: '2023', desc: 'Snaps from the journalism project in Aragon — reporting on the road, camera always rolling.', video: '/assets/abroad-aragon-snaps.mp4', image: null },
    { title: 'Postcards home',   kind: 'Photo essay',    year: '2023', desc: 'A photo essay sent back one frame at a time.', image: null },
  ],
  abroadSrilanka: [
    '/assets/srilanka-1.jpg',
    '/assets/srilanka-2.jpg',
    '/assets/srilanka-3.jpg',
    '/assets/srilanka-4.jpg',
    '/assets/srilanka-5.jpg',
  ],
  abroadTiktoks: [
    { id: '7280373141573078304', title: 'Niagara Falls',     kind: 'SCHOOL TRIP' },
    { id: '7300623591396232481', title: 'Vacation week',     kind: 'WEEK VLOG' },
    { id: '7308430593887423777', title: 'Orangeville',       kind: 'DAY TRIP' },
  ],

  about: {
    pull: "Levcreates is a working archive — journalism, image and sound, kept in one place so I don't have to send links.",
    paras: [
      "I trained in journalism, but I never managed to sit still inside one discipline. Reportage led to radio, radio led to film, film led to communications and content work — and underneath all of it was the same itch: find the best way to tell this particular story.",
      "Studying abroad widened the lens. Three months with a camera and a notebook taught me more about pacing and patience than any classroom did, and a lot of the work here was made on that road.",
      "Then there's the music, released under the name Lev. — the project where, for once, the story I'm telling is my own. It's bedroom-pop with a noir edge, and it's the most honest thing on this site.",
    ],
    credits: [
      ['Journalism · Bachelor - Magna Cum Laude', '2021–24'],
      ['Erasmus · abroad',      'AUG-SEPT 2023'],
      ['VTM Telefacts · documentary',  '2020'],
      ['Communicationmanagement - Contentmarketing - Bachelor - Cum Laude',  '2022–25'],
      ['Music · Lev.',          '2020–CURRENT'],
      ['Freelance · ongoing',   '2022–CURRENT'],
    ],
  },
}
