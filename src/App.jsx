import { useState } from 'react'
import { matches, players, results, sponsor, stats, team } from './data/teamData'

function Logo() {
  return (
    <a className="logo" href="#home" aria-label={`${team.name} home`}>
      <img className="crest-image" src="/Images/Team_Logo_Transparent.png" alt={`${team.name} Logo`} />
      <span>
        <strong>{team.name}</strong>
        <small>Football Club</small>
      </span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = ['Squad', 'Story', 'Sponsor', 'Contact']

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav className={open ? 'nav open' : 'nav'}>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="eyebrow">Established {team.founded} · {team.city}</p>
          <h1>More than a team.<br /><span>Mostly a group chat.</span></h1>
          <p className="hero-text">{team.description}</p>
          <div className="hero-actions">
            {/*<a className="button primary" href="#matches">Next match</a> */}
            <a className="button ghost" href="#squad">Meet the squad</a>
          </div>
        </div>

        <div className="hero-card" aria-label="Team motto">
          <img className="hero-crest" src="/Images/Team_Logo_Transparent.png" alt={`${team.name} Logo`} />
          <p>Our philosophy</p>
          <blockquote>“{team.motto}”</blockquote>
          <span>- The Times, probably</span>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats-band" aria-label="Team statistics">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionTitle({ kicker, title, copy }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function Squad() {
  return (
    <section className="section" id="squad">
      <div className="container">
        <SectionTitle
          kicker="The squad"
          title="Heroes on Some Days"
        />
        <div className="player-grid">
          {players.map((player) => (
              <article className="player-card" key={`${player.number}-${player.name}`}>
                    <span className="shirt-number">{player.number}</span>
                        <div className="player-avatar">
                          {player.image ? (
                            <img src={player.image} alt={player.name} />
                            ) : (
                            <span>{player.name.charAt(0)}</span>
                          )}
                        </div>
                        <p>{player.position}</p>
                        <h3>{player.name}</h3>
                        <span className="nickname">“{player.nickname}”</span>
                        </article>
                      ))}
          </div>
      </div>
    </section>
  )
}

function Matches() {
  return (
    <section className="section section-dark" id="matches">
      <div className="container match-layout">
        <div>
          <SectionTitle kicker="Upcoming" title="Fixtures" />
          <div className="fixture-list">
            {matches.map((match) => (
              <article className="fixture" key={`${match.date}-${match.home}`}>
                <div className="fixture-date"><strong>{match.date}</strong><span>{match.competition}</span></div>
                <div className="teams"><span>{match.home}</span><b>vs</b><span>{match.away}</span></div>
                <div className="kickoff"><strong>{match.time}</strong><span>{match.venue}</span></div>
              </article>
            ))}
          </div>
        </div>

        <aside className="results-card">
          <p className="eyebrow">Recent form</p>
          <h3>Last results</h3>
          {results.map((result) => (
            <div className="result" key={`${result.home}-${result.away}`}>
              <span>{result.home}</span>
              <strong>{result.homeScore} – {result.awayScore}</strong>
              <span>{result.away}</span>
            </div>
          ))}
          <div className="form"><span>W</span><span>D</span><span>W</span></div>
        </aside>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="section" id="story">
      <div className="container story-grid">
        <div className="story-photo">
            <img src="/Images/Team_Photo_All_Players.jpg"  alt={`${team.name} - All Players`} />
        </div>
        <div>
          <SectionTitle kicker="Our story" title="Built on friendship and late tackles" />
          <p>We started with a ball, a local tournament and barely enough players to avoid forfeiting. Since then, {team.name} has become the most entertaining football institution in {team.city}, at least according to us.</p>
          <p>The objective is simple: play good football, enjoy every match and preserve enough energy for the post-game analysis(beer and food).</p>
          <div className="values">
            <div><strong>01</strong><span>Teamwork</span></div>
            <div><strong>02</strong><span>Respect</span></div>
            <div><strong>03</strong><span>Entertainment</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sponsor() {
  const [failedLogo, setFailedLogo] = useState(null)
  const hasLogo = sponsor.logo && failedLogo !== sponsor.logo

  return (
    <section className="section section-dark sponsor-section" id="sponsor" aria-labelledby="sponsor-heading">
      <div className="container sponsor-grid">
        <div className="sponsor-intro">
          <div className="section-heading">
            <p className="eyebrow">Our sponsor</p>
            <h2 id="sponsor-heading">Part of the team.<br /><span>Spared the running.</span></h2>
          </div>
          <p className="sponsor-comment">{sponsor.comment}</p>
        </div>
        <article className="sponsor-card" aria-labelledby="sponsor-name">
          <div className="sponsor-logo">
            {hasLogo ? (
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                loading="lazy"
                onError={() => setFailedLogo(sponsor.logo)}
              />
            ) : (
              <span className="sponsor-logo-placeholder">{sponsor.logo ? sponsor.name : 'Company logo'}</span>
            )}
          </div>
          <div className="sponsor-details">
            <p className="eyebrow">Official sponsor</p>
            <h3 id="sponsor-name">{sponsor.name}</h3>
          </div>
        </article>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">Follow the campaign</p>
          <h2>Join the supporters’ club.</h2>
          <p>For messages, sponsorships or complaints about our defending.</p>
        </div>
        <a className="button light" href={team.socials.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <Logo />
        <p>© {new Date().getFullYear()} {team.name}. No trophies were harmed in the making of this website.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/*<Stats />*/}
        <Squad />
        {/* <Matches /> */}
        <Story />
        <Sponsor />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
