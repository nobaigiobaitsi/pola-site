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

export const players = [
  { number: 1, name: 'Thanasis Voukelatos', position: 'Goalkeeper', nickname: 'The Wall', image: '/Images/Thanasis_Voukelatos.png'},
  { number: 80, name: 'Giannis Georgiadis', position: 'Defender', nickname: 'No Nonsense' },
  { number: 17, name: 'Aggelos Paisios', position: 'Defender', nickname: 'Air Traffic Control' },
  { number: 19, name: 'Panagiotis Paisios', position: 'Midfielder', nickname: 'The Architect' },
  { number: 30, name: 'Leonidas Leivaditis', position: 'Midfielder', nickname: 'Three Lungs', image: '/Images/Leonidas_Leivaditis.png' },
  { number: 9, name: 'Giannis Athanasiou', position: 'Winger', nickname: 'Fast-ish', image: '/Images/Giannis_Athanasiou.png' },
  { number: 99, name: 'Stamatis Kapiris', position: 'Forward', nickname: 'One More Chance', image: '/Images/Stamatis_Kapiris.png' },
  { number: 23, name: 'Spyros Kapiris', position: 'Forward', nickname: 'Unpredictable', image: '/Images/Spyros_Kapiris.png' },
  { number: 10, name: 'Giorgos Ageridis', position: 'Forward', nickname: 'The Pistol', image: '/Images/Giorgos_Ageridis.png' },
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
