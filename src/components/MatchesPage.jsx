import { useState } from 'react'
import { matches, demoMatches } from '../data/matchData.js'
import { players, team } from '../data/teamData.js'

function getOutcome(match) {
  if (match.goalsFor > match.goalsAgainst) return 'W'
  if (match.goalsFor < match.goalsAgainst) return 'L'
  return 'D'
}

function sortMatches(matches) {
  return [...matches].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  )
}

function groupMatchesByTournament(matches) {
  const tournaments = new Map()

  // Visiting the newest matches first also orders tournaments by their latest result.
  for (const match of sortMatches(matches)) {
    const competition = match.competition?.trim() || 'Other matches'
    const season = match.season?.trim() || ''
    const id = JSON.stringify([competition, season])

    if (!tournaments.has(id)) {
      tournaments.set(id, {
        id,
        label: season && !competition.includes(season)
          ? `${competition} ${season}`
          : competition,
        matches: [],
      })
    }

    tournaments.get(id).matches.push(match)
  }

  return [...tournaments.values()]
}

function formatMatchDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null

  const date = new Date(`${value}T12:00:00Z`)

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) return null

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function getMatchStats(matches) {
  const totals = matches.reduce((totals, match) => {
    const outcome = getOutcome(match)

    totals.played += 1
    totals.wins += Number(outcome === 'W')
    totals.draws += Number(outcome === 'D')
    totals.losses += Number(outcome === 'L')
    totals.goalsFor += match.goalsFor
    totals.goalsAgainst += match.goalsAgainst
    totals.cleanSheets += Number(match.goalsAgainst === 0)

    return totals
  }, {
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    cleanSheets: 0,
  })

  let unbeatenRun = 0
  for (const match of sortMatches(matches)) {
    if (getOutcome(match) === 'L') break
    unbeatenRun += 1
  }

  return {
    ...totals,
    goalDifference: totals.goalsFor - totals.goalsAgainst,
    winRate: totals.played ? Math.round(totals.wins / totals.played * 100) : 0,
    goalsPerMatch: totals.played ? totals.goalsFor / totals.played : 0,
    unbeatenRun,
  }
}

function getScorerLeaderboard(matches) {
  const scorers = new Map()

  for (const match of matches) {
    for (const scorer of match.scorers || []) {
      if (
        !Number.isInteger(scorer.goals) ||
        scorer.goals <= 0 ||
        !scorer.name?.trim()
      ) continue

      const name = scorer.name.trim()
      scorers.set(name, (scorers.get(name) || 0) + scorer.goals)
    }
  }

  let rank = 0
  let lastGoals = null

  return [...scorers]
    .map(([name, goals]) => ({ name, goals }))
    .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name))
    .map((scorer, index) => {
      if (scorer.goals !== lastGoals) rank = index + 1
      lastGoals = scorer.goals
      return { ...scorer, rank }
    })
}

function filterMatches(matches, outcome = 'all', query = '') {
  const needle = query.trim().toLocaleLowerCase()

  return matches.filter((match) => {
    const correctResult =
      outcome === 'all' || getOutcome(match) === outcome

    const searchable = [
      match.opponent,
      match.competition,
      ...(match.scorers || []).map((scorer) => scorer.name),
    ].join(' ').toLocaleLowerCase()

    return correctResult && (!needle || searchable.includes(needle))
  })
}

const outcomeLabels = { W: 'Win', D: 'Draw', L: 'Loss' }

const matchVerdicts = {
  W: 'A rare case of the plan working.',
  D: 'Nobody lost. Everyone has notes.',
  L: 'Character development. Again.',
}

function MatchCard({ match }) {
  const outcome = getOutcome(match)
  const day = formatMatchDate(match.date)
  const scorers = match.scorers || []
  const ownGoals = match.ownGoals || 0
  const recordedGoals = scorers.reduce(
    (total, scorer) => total + scorer.goals,
    ownGoals
  )
  const uncreditedGoals = Math.max(0, match.goalsFor - recordedGoals)

  return (
    <article
      className={`match-card match-card-${outcome.toLowerCase()}`}
      aria-label={`${team.name} ${match.goalsFor}, ${match.opponent} ${match.goalsAgainst}: ${outcomeLabels[outcome]}`}
    >
      <header className="match-card-meta">
        {day && <time dateTime={match.date}>{day}</time>}
        <span className="match-competition">
          {match.competition || 'Match report'}
        </span>
        <span className={`outcome-badge outcome-${outcome.toLowerCase()}`}>
          <span className="outcome-dot" aria-hidden="true" />
          {outcomeLabels[outcome]}
        </span>
      </header>

      <div className="match-scoreboard">
        <div className="score-team score-team-ours">
          <img src="/Images/Team_Logo_Transparent.webp" alt="" />
          <strong>{team.name}</strong>
        </div>

        <div className="match-score" aria-hidden="true">
          <span>{match.goalsFor}</span>
          <span className="score-dash">–</span>
          <span>{match.goalsAgainst}</span>
          <small>Full time</small>
        </div>

        <div className="score-team score-team-opponent">
          <strong>{match.opponent}</strong>
        </div>
      </div>

      <div className="match-scorers">
        <p className="scorers-label">P.OLA scorers</p>

        {scorers.length > 0 || ownGoals > 0 ? (
          <ul className="match-scorer-list" aria-label="P.OLA goalscorers">
            {scorers.map((scorer, index) => {
              const player = players.find(
                (member) => member.name === scorer.name
              )

              return (
                <li key={`${scorer.name}-${index}`}>
                  <span className="scorer-name">
                    <span
                      className="scorer-shirt"
                      aria-label={player ? `Shirt number ${player.number}` : undefined}
                      aria-hidden={player ? undefined : true}
                    >
                      {player?.number}
                    </span>
                    <span>{scorer.name}</span>
                  </span>
                  <strong
                    className="scorer-tally"
                    aria-label={`${scorer.goals} ${scorer.goals === 1 ? 'goal' : 'goals'}`}
                  >
                    ×{scorer.goals}
                  </strong>
                </li>
              )
            })}

            {ownGoals > 0 && (
              <li className="opposition-own-goal">
                <span className="scorer-name">
                  <span className="scorer-shirt" aria-hidden="true" />
                  <span>Opposition own goal</span>
                </span>
                <strong
                  className="scorer-tally"
                  aria-label={`${ownGoals} ${ownGoals === 1 ? 'goal' : 'goals'}`}
                >
                  ×{ownGoals}
                </strong>
              </li>
            )}
          </ul>
        ) : (
          <p className="scorers-empty">
            {match.goalsFor === 0
              ? 'The net remained unbothered. We prefer not to discuss it.'
              : 'Scorer credits coming soon. The group chat is reviewing the evidence.'}
          </p>
        )}

        {uncreditedGoals > 0 && (scorers.length > 0 || ownGoals > 0) && (
          <p className="scorer-credit-note">
            {uncreditedGoals}{' '}
            {uncreditedGoals === 1 ? 'goal still needs' : 'goals still need'}{' '}
            a name. Claims are being investigated.
          </p>
        )}
      </div>

      <footer className="match-verdict">
        <p>{match.note || matchVerdicts[outcome]}</p>
      </footer>
    </article>
  )
}

const filters = [
  { value: 'all', label: 'All matches' },
  { value: 'W', label: 'Wins' },
  { value: 'D', label: 'Draws' },
  { value: 'L', label: 'Losses' },
]

function ScorerLeaderboard({ matches, tournamentLabel }) {
  const scorers = getScorerLeaderboard(matches)
  const leaders = scorers.filter((scorer) => scorer.rank === 1)

  return (
    <aside className="scoring-card" aria-labelledby="scorers-heading">
      <div className="scoring-card-heading">
        <p className="eyebrow">The bragging rights department</p>
        <h2 id="scorers-heading">Who's buying<br />the next round?</h2>
        <p>The goals are counted. The egos are not.</p>
      </div>

      {scorers.length > 0 ? (
        <>
          <ol className="scorer-leaderboard">
            {scorers.map((scorer) => {
              const player = players.find(
                (member) => member.name === scorer.name
              )

              return (
                <li
                  className={scorer.rank === 1 ? 'scorer-leading' : ''}
                  key={scorer.name}
                >
                  <span
                    className="scorer-rank"
                    aria-label={`Rank ${scorer.rank}`}
                  >
                    {String(scorer.rank).padStart(2, '0')}
                  </span>

                  <div className="scorer-portrait">
                    {player?.image
                      ? <img src={player.image} alt="" loading="lazy" />
                      : <span>{scorer.name.charAt(0)}</span>}
                  </div>

                  <div className="scorer-person">
                    <strong>{scorer.name}</strong>
                    <span>
                      {player ? `“${player.nickname}”` : 'On the scoresheet'}
                    </span>
                  </div>

                  <div className="scorer-goals">
                    <strong>{scorer.goals}</strong>
                    <span>{scorer.goals === 1 ? 'goal' : 'goals'}</span>
                  </div>
                </li>
              )
            })}
          </ol>

          <p className="leaderboard-note">
            {leaders.length > 1
              ? 'Joint leaders. The group chat will settle absolutely nothing.'
              : 'Top scorer. Already mentioning it at every opportunity.'}
          </p>
        </>
      ) : (
        <div className="leaderboard-empty">
          <strong>Boots ready.<br />Stats pending.</strong>
          <p>The first goal gets you the top spot. Enjoy it while it lasts.</p>
        </div>
      )}

      <p className="scoring-card-footnote">
        P.OLA goals · {tournamentLabel || 'Match archive'}
      </p>
    </aside>
  )
}

function RecentForm({ matches }) {
  const recent = matches.slice(0, 5).reverse()
  const stats = getMatchStats(matches)

  return (
    <aside className="recent-form-card" aria-labelledby="form-heading">
      <p className="eyebrow">Recent form</p>
      <h2 id="form-heading">Mood of the<br />group chat.</h2>

      {recent.length > 0 ? (
        <div
          className="form-guide"
          aria-label="Last five results, oldest to newest"
        >
          {recent.map((match) => {
            const outcome = getOutcome(match)

            return (
              <span
                className={`form-result form-${outcome.toLowerCase()}`}
                key={match.id}
                title={`${outcomeLabels[outcome]} against ${match.opponent}`}
                aria-label={`${outcomeLabels[outcome]} against ${match.opponent}`}
              >
                {outcome}
              </span>
            )
          })}
        </div>
      ) : (
        <p className="form-placeholder">
          Awaiting our first official overreaction.
        </p>
      )}

      <div className="form-totals">
        <span><strong>{stats.wins}</strong> wins</span>
        <span><strong>{stats.draws}</strong> draws</span>
        <span><strong>{stats.losses}</strong> losses</span>
      </div>

      <p className="form-note">
        {recent.length > 0
          ? 'Oldest → newest. Opinions → unlimited.'
          : 'Results pending. Confidence suspiciously high.'}
      </p>
    </aside>
  )
}

function TournamentInsights({ matches }) {
  const stats = getMatchStats(matches)
  const hasMatches = stats.played > 0
  const difference = stats.goalDifference > 0
    ? `+${stats.goalDifference}`
    : String(stats.goalDifference)

  return (
    <aside className="season-insights" aria-labelledby="insights-heading">
      <p className="eyebrow">Tournament totals</p>
      <h2 id="insights-heading">Beyond the score.</h2>
      <dl className="season-metrics">
        <div>
          <dt>Win rate</dt>
          <dd>{hasMatches ? `${stats.winRate}%` : '—'}</dd>
        </div>
        <div>
          <dt>Goal difference</dt>
          <dd>{hasMatches ? difference : '—'}</dd>
        </div>
        <div>
          <dt>Goals / game</dt>
          <dd>{hasMatches ? stats.goalsPerMatch.toFixed(1) : '—'}</dd>
        </div>
        <div>
          <dt>Unbeaten run</dt>
          <dd>
            {hasMatches ? stats.unbeatenRun : '—'}
            {hasMatches && (
              <small>{' '}{stats.unbeatenRun === 1 ? 'game' : 'games'}</small>
            )}
          </dd>
        </div>
      </dl>
      <p className="season-insights-note">
        {hasMatches
          ? 'The unbeaten run counts back from the latest result.'
          : 'The numbers start at the first whistle.'}
      </p>
    </aside>
  )
}

export default function MatchesPage() {
  const [preview, setPreview] = useState(false)
  const [outcome, setOutcome] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedTournamentId, setSelectedTournamentId] = useState(null)

  const archive = sortMatches(preview ? demoMatches : matches)
  const tournaments = groupMatchesByTournament(archive)
  const selectedTournament = tournaments.find(
    (tournament) => tournament.id === selectedTournamentId
  ) || tournaments[0]
  const tournamentMatches = selectedTournament?.matches || []
  const visibleMatches = filterMatches(tournamentMatches, outcome, query)
  const stats = getMatchStats(tournamentMatches)

  function selectTournament(id) {
    setSelectedTournamentId(id)
    setOutcome('all')
    setQuery('')
  }

  function togglePreview() {
    setPreview(!preview)
    setOutcome('all')
    setQuery('')
    setSelectedTournamentId(null)
  }

  function resetFilters() {
    setOutcome('all')
    setQuery('')
  }

  return (
    <div className="matches-page">
      <section className="matches-hero" aria-labelledby="matches-title">
        <div className="container">
          <a className="back-link" href="#home">
            <span aria-hidden="true">←</span> Back to the clubhouse
          </a>

          <div className="matches-hero-grid">
            <div>
              <p className="eyebrow">The match archive</p>
              <h1 id="matches-title">
                The scores are real.<br />
                <span>The excuses are better.</span>
              </h1>
              <p className="matches-intro">
                Every result. Every scorer. Enough material for a very
                long post-match meal.
              </p>
              <div className="match-manifesto">
                <span className="manifesto-dot" aria-hidden="true" />
                Goals remembered. Minutes forgotten.
              </div>
            </div>

            <div
              className="matchday-stamp"
              aria-label="P.OLA match reports: football first, excuses afterwards"
            >
              <span className="stamp-top">P.OLA match reports</span>
              <div className="stamp-pitch" aria-hidden="true">
                <div />
                <img src="/Images/Team_Logo_Transparent.webp" alt="" />
              </div>
              <strong>Football first.<br />Excuses afterwards.</strong>
              <span className="stamp-bottom">
                Approved by the group chat
              </span>
            </div>
          </div>
        </div>
      </section>

      {preview && (
        <div className="sample-notice-wrap">
          <div className="container sample-banner" role="status">
            <div>
              <strong>Sample preview</strong>
              <span>
                Fictional matches to show the layout.
                These are not P.OLA results.
              </span>
            </div>
            <button type="button" onClick={togglePreview}>
              Back to real results <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}

      {tournaments.length > 0 && (
        <section className="tournament-browser" aria-labelledby="tournaments-heading">
          <div className="container">
            <div className="tournament-browser-heading">
              <div>
                <p className="eyebrow">One campaign at a time</p>
                <h2 id="tournaments-heading">Tournament archive.</h2>
              </div>
              <p>Pick a tournament to revisit its matches.</p>
            </div>
            <div
              className="tournament-options"
              role="group"
              aria-label="Choose a tournament"
            >
              {tournaments.map((tournament) => {
                const selected = tournament.id === selectedTournament?.id

                return (
                  <button
                    className={`tournament-option${selected ? ' active' : ''}`}
                    type="button"
                    key={tournament.id}
                    aria-pressed={selected}
                    aria-controls="tournament-matches"
                    onClick={() => selectTournament(tournament.id)}
                  >
                    <strong>{tournament.label}</strong>
                    <span className="tournament-option-count">
                      {tournament.matches.length}{' '}
                      {tournament.matches.length === 1 ? 'match' : 'matches'}
                    </span>
                    <span className="tournament-option-action">
                      {selected ? 'Viewing' : 'View results'}
                      <span aria-hidden="true">{selected ? '✓' : '↗'}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section
        className="matches-stats"
        aria-label={preview
          ? 'Sample match statistics'
          : `Match statistics for ${selectedTournament?.label || 'the match archive'}`}
      >
        <div className="container matches-stats-grid">
          <div>
            <strong>{stats.played}</strong>
            <span>Matches played</span>
            <small>Stories for the group chat</small>
          </div>
          <div>
            <strong>{stats.wins}</strong>
            <span>Wins</span>
            <small>Evidence that the plan works</small>
          </div>
          <div>
            <strong>{stats.goalsFor}</strong>
            <span>Goals scored</span>
            <small>All definitely intentional</small>
          </div>
          <div>
            <strong>{stats.cleanSheets}</strong>
            <span>Clean sheets</span>
            <small>The keeper's favourite stat</small>
          </div>
        </div>
      </section>

      <section className="match-archive-section">
        <div className="container">
          <div className="match-archive-layout">
            <div className="match-archive-main">
              <div className="archive-heading">
                <div>
                  <p className="eyebrow">
                    Results &amp; questionable analysis
                  </p>
                  <h2 aria-live="polite">
                    {selectedTournament?.label || 'The paper trail.'}
                  </h2>
                </div>
                <span className="match-count" aria-live="polite">
                  {visibleMatches.length}{' '}
                  {visibleMatches.length === 1 ? 'match' : 'matches'}
                </span>
              </div>

              {archive.length > 0 && (
                <div className="match-controls">
                  <div
                    className="match-filter-buttons"
                    role="group"
                    aria-label="Filter match results"
                  >
                    {filters.map((filter) => (
                      <button
                        type="button"
                        key={filter.value}
                        aria-pressed={outcome === filter.value}
                        className={outcome === filter.value ? 'active' : ''}
                        onClick={() => setOutcome(filter.value)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  <div className="match-search-row">
                    <label className="match-search">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="m15.5 15.5 5 5" />
                      </svg>
                      <span className="sr-only">
                        Search by opponent, scorer, or competition
                      </span>
                      <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Find an opponent or a scorer…"
                      />
                    </label>

                  </div>
                </div>
              )}

              <div className="match-card-list" id="tournament-matches">
                {visibleMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}

                {archive.length === 0 ? (
                  <div className="matches-empty">
                    <div className="empty-score" aria-hidden="true">
                      <span>–</span><span>:</span><span>–</span>
                    </div>
                    <p className="eyebrow">
                      The paperwork hasn't kicked off
                    </p>
                    <h3>The football happened.<br />The filing is next.</h3>
                    <p>
                      Results will appear here once they're added.
                      The post-match opinions are already in full swing.
                    </p>
                    <button
                      className="button primary"
                      type="button"
                      onClick={togglePreview}
                    >
                      Preview sample matches
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                ) : visibleMatches.length === 0 ? (
                  <div
                    className="matches-empty matches-no-results"
                    role="status"
                  >
                    <p className="eyebrow">
                      A rare clean sheet for the search bar
                    </p>
                    <h3>No matches found.</h3>
                    <p>
                      Try another name or let all the results back onto
                      the pitch.
                    </p>
                    <button
                      className="button primary"
                      type="button"
                      onClick={resetFilters}
                    >
                      Reset search &amp; result filters
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="match-archive-aside">
              <ScorerLeaderboard
                matches={tournamentMatches}
                tournamentLabel={selectedTournament?.label}
              />
              <div className="match-aside-details">
                <RecentForm matches={tournamentMatches} />
                <TournamentInsights matches={tournamentMatches} />
              </div>
            </div>
          </div>

          <div className="match-archive-signoff">
            <span className="eyebrow">The official verdict</span>
            <p>
              Good football. Bad decisions. <strong>Now with receipts.</strong>
            </p>
            <a
              href={team.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Appeal to the group chat <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
