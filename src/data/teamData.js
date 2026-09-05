// Edit this file to personalize the entire site.
export const team = {
  name: 'P.OLA F.C.',
  shortName: 'P.OLA',
  founded: 2025,
  city: 'Athens, Greece',
  motto: 'Good football. Bad decisions. Great stories.',
  description:
    'A group of friends, questionable athletes and undisputed champions of the post-match meal.',
  colors: {
    primary: '#23d160',
    dark: '#071b12',
  },
  socials: {
    instagram: 'https://www.instagram.com/pola.f.c?igsh=MWFxeGJmZ3pweHhwMQ==',
    facebook: '#',
    youtube: '#',
  },
}

// Sponsor details: replace the name and add the supplied company logo before publishing.
// Put the logo in public/Images/ and use its path below, e.g. '/Images/Sponsor_Logo.png'.
export const sponsor = {
  name: 'Alpha Consultants',
  logo: '/Images/AlphaConsultants.png',
  comment: 'They believed in us. Then they saw us perform.',
}

export const players = [
  { number: 1, name: 'Thanasis Voukelatos', position: 'Goalkeeper', nickname: 'The Wall', image: '/Images/Thanasis_Voukelatos.png'},
  { number: 80, name: 'Giannis Georgiadis', position: 'Defender', nickname: 'No Nonsense', image: '/Images/Giannis_Georgiadis.png' },
  { number: 23, name: 'Spyros Kapiris', position: 'Defender', nickname: 'Unpredictable', image: '/Images/Spyros_Kapiris.png' },
  { number: 19, name: 'Panagiotis Paisios', position: 'Defender', nickname: 'The Architect', image: '/Images/Panagiotis_Paisios.png' },
  { number: 17, name: 'Aggelos Paisios', position: 'Right Midfielder', nickname: 'Air Traffic Control', image: '/Images/Aggelos_Paisios.png' },
  { number: 9, name: 'Giannis Athanasiou', position: 'Centre Midfielder', nickname: 'Fast-ish', image: '/Images/Giannis_Athanasiou.png' },
  { number: 30, name: 'Leonidas Leivaditis', position: 'Left Midfielder', nickname: 'Three Lungs', image: '/Images/Leonidas_Leivaditis.png' },
  { number: 99, name: 'Stamatis Kapiris', position: 'Forward', nickname: 'One More Chance', image: '/Images/Stamatis_Kapiris.png' },
  { number: 10, name: 'Giorgos Ageridis', position: 'Centre Forward', nickname: 'The Pistol', image: '/Images/Giorgos_Ageridis.png' },
  { number: 26, name: 'Stavros Angelopoulos', position: 'Forward', nickname: 'How did I get here', image: '/Images/Stavros_Angelopoulos.png' },
]

export const matches = [
  {
    date: '06 Sep',
    competition: 'Friendly',
    home: 'Sunday United',
    away: 'Old Boys FC',
    time: '20:30',
    venue: 'Home Ground',
  },
  {
    date: '13 Sep',
    competition: 'League',
    home: 'Athens Rovers',
    away: 'Sunday United',
    time: '21:00',
    venue: 'Rovers Arena',
  },
  {
    date: '20 Sep',
    competition: 'League',
    home: 'Sunday United',
    away: 'Real Social Club',
    time: '19:30',
    venue: 'Home Ground',
  },
]

export const results = [
  { home: 'Sunday United', away: 'Monday Blues', homeScore: 4, awayScore: 2 },
  { home: 'No VAR FC', away: 'Sunday United', homeScore: 1, awayScore: 1 },
  { home: 'Sunday United', away: 'Expected Goals FC', homeScore: 3, awayScore: 0 },
]

export const stats = [
  { value: '42', label: 'Matches played' },
  { value: '87', label: 'Goals scored' },
  { value: '12', label: 'Clean sheets claimed' },
  { value: '100%', label: 'Passion' },
]

export const mvp = {
  name: 'Stavros Angelopoulos',
  number: 26,
  position: 'Forward · Website Developer',
  image: '/Images/Stavros_Angelopoulos.png',
  comment: 'The votes were counted by the same person who built the website... Allegedly.',
}
