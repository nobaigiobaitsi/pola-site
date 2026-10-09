import { players } from './teamData.js'

/*
//Names to put in the scorers
Thanasis Voukelatos
Giannis Georgiadis
Spyros Kapiris
Panagiotis Paisios
Aggelos Paisios
Giannis Athanasiou
Leonidas Leivaditis
Stamatis Kapiris
Giorgos Ageridis
Stavros Angelopoulos
*/

export const matches = [
  {
    id: 'match-001',
        date: '2026-09-22',
        season: '2026/27',
        competition: 'Winter Tournament 2026/27',
        opponent: 'Άτυχοι',
        goalsFor: 6, //P.OLA's goals 
        goalsAgainst: 2, //Opposition goals
        scorers: [
            { name: 'Giannis Athanasiou', goals: 2 },
            { name: 'Giannis Georgiadis', goals: 1 },
            { name: 'Giorgos Ageridis', goals: 1 },
            { name: 'Aggelos Paisios', goals: 1 },
            { name: 'Leonidas Leivaditis', goals: 1 },
        ],
    ownGoals: 0, // Opposition own goals scored into their own net
    note: 'They called themselves unlucky. We respected the branding.',
    },
    {
    id: 'match-002',
        date: '2026-09-29',
        season: '2026/27',
        competition: 'Winter Tournament 2026/27',
        opponent: 'Kings',
        goalsFor: 3, //P.OLA's goals 
        goalsAgainst: 2, //Opposition goals
        scorers: [
            { name: 'Giannis Athanasiou', goals: 1 },
            { name: 'Leonidas Leivaditis', goals: 1 },
            { name: 'Siozos Thodoris', goals: 1 },
        ],
    ownGoals: 0, // Opposition own goals scored into their own net
    note: 'The Kings kept the name. We kept the win.',
    },
    {
    id: 'match-003',
        date: '2026-10-06',
        season: '2026/27',
        competition: 'Winter Tournament 2026/27',
        opponent: 'Los Palteiros',
        goalsFor: 3, //P.OLA's goals 
        goalsAgainst: 3, //Opposition goals
        scorers: [
            { name: 'Siozos Thodoris', goals: 1 },
            { name: 'Panagiotis Paisios', goals: 1 },
        ],
    ownGoals: 1, // Opposition own goals scored into their own net
    note: 'They scored at both ends. We appreciate the flexibility.',
    },
]

export const demoMatches = []