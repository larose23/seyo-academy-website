import { site, pillars, facts, skills, seasons, locations, donationUses, gallery } from "@/lib/site.ts";
import { RegisterForm, ContactForm } from "./Forms.tsx";

function CourtLines() {
  // Futsal court markings drawn over the hero photo: halfway line, centre circle and spot.
  return (
    <svg className="court" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <line x1="760" y1="-20" x2="760" y2="820" />
      <circle cx="760" cy="400" r="190" />
      <circle cx="760" cy="400" r="7" className="spot" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <a href="#" className="brand">
          <img src="/logo.png" alt="" width={44} height={44} />
          <span>SEYO Academy</span>
        </a>
        <nav aria-label="Main">
          <a href="#programs">Programs</a>
          <a href="#photos">Photos</a>
          <a href="#support">Support us</a>
          <a href="#contact">Contact</a>
          <a href="#register" className="btn btn-navy btn-sm">
            Register
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero">
          <img className="hero-img" src="/photos/huddle.jpg" alt="A SEYO coach in a team huddle with young players in blue pinnies" />
          <CourtLines />
          <div className="hero-copy">
            <h1>Every kid gets a&nbsp;team.</h1>
            <p>
              Soccer training, tutoring and mentorship for players aged 5 to 15 in Etobicoke and York. Run by a
              non-profit, built around the kids.
            </p>
            <div className="hero-actions">
              <a href="#register" className="btn btn-lime">
                Register a player
              </a>
              <a href="#programs" className="btn btn-outline">
                See programs
              </a>
            </div>
          </div>
        </section>

        <ul className="tape" aria-label="Program at a glance">
          {facts.map((f) => (
            <li key={f.label}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <section className="about wrap">
          <div className="about-text">
            <h2>More than a soccer program</h2>
            <p className="lead">
              SEYO stands for Sports, Education and Youth Organization. We use the game to teach what kids need off the
              field too: how to work with others, speak up, lead, and keep showing up.
            </p>
            <div className="pillars">
              {pillars.map((p) => (
                <div key={p.title} className="pillar">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="about-img">
            <img src="/photos/celebrate.jpg" alt="Players in pinnies celebrating during a game in the gym" loading="lazy" />
          </figure>
        </section>

        <section id="programs" className="programs">
          <div className="wrap">
            <h2>Youth soccer training</h2>
            <p className="lead">
              Skill-specific training from beginner to competitive level, indoors in a futsal setting. Each season is a
              structured program that builds technical ability, game understanding, discipline and life skills.
            </p>

            <div className="prog-grid">
              <div className="prog-block">
                <h3>What players work on</h3>
                <ul className="chips">
                  {skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="prog-block">
                <h3>Year-round seasons</h3>
                <dl className="seasons">
                  {seasons.map((s) => (
                    <div key={s.name}>
                      <dt>{s.name}</dt>
                      <dd>{s.months}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <h3 className="loc-title">Where we train</h3>
            <div className="locations">
              {locations.map((l) => (
                <div key={l.name} className="loc">
                  <h4>{l.name}</h4>
                  <p className="when">{l.when}</p>
                  <p>{l.address}</p>
                  <a href={l.map} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </div>
              ))}
            </div>
            <p className="note">
              Days can change between seasons. Call <a href={site.phoneHref}>{site.phone}</a> to confirm the current
              schedule.
            </p>
          </div>
        </section>

        <section id="photos" className="photos wrap">
          <h2>On the court</h2>
          <div className="gallery">
            {gallery.map((g) => (
              <figure key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section id="register" className="register">
          <div className="wrap reg-grid">
            <div className="reg-intro">
              <h2>Register a player</h2>
              <p>Open to all kids aged 5 to 15, from first-timers to players who already compete.</p>
              <ol className="steps">
                <li>Send the form with your details.</li>
                <li>A coach contacts you to confirm the season, location and any fees.</li>
                <li>Your player joins the next session.</li>
              </ol>
              <p className="reg-call">
                Prefer to talk? Call <a href={site.phoneHref}>{site.phone}</a>.
              </p>
            </div>
            <RegisterForm />
          </div>
        </section>

        <section id="support" className="support wrap">
          <figure className="support-img">
            <img src="/photos/ball.jpg" alt="A player's boot on a match ball" loading="lazy" />
          </figure>
          <div>
            <h2>Help keep kids playing</h2>
            <p className="lead">
              SEYO is an incorporated Canadian not-for-profit. Donations and sponsorships from families and local businesses
              pay for what the program runs on.
            </p>
            <ul className="uses">
              {donationUses.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <div className="etransfer">
              <p>Donate by Interac e-Transfer to</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <p className="note">Businesses interested in sponsoring jerseys or equipment can use the contact form below.</p>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap contact-grid">
            <div>
              <h2>Get in touch</h2>
              <p className="lead">Questions about programs, volunteering or sponsorship? Send a message or call.</p>
              <dl className="contact-list">
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <div className="brand">
            <img src="/logo.png" alt="" width={36} height={36} />
            <span>{site.legalName}</span>
          </div>
          <p>Incorporated Canadian not-for-profit, Ontario. Website by Zakariya Mahadalle.</p>
        </div>
      </footer>
    </>
  );
}
