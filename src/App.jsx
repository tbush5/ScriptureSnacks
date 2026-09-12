const features = [
  {
    icon: '✦',
    title: 'Thoughtful ingredients',
    text: 'Simple, real ingredients chosen for flavor, nourishment, and care.',
  },
  {
    icon: '❀',
    title: 'Made for community',
    text: 'From Sunday brunches to thoughtful gifts, every treat is made to bring people together.',
  },
  {
    icon: '☼',
    title: 'Faith-filled joy',
    text: 'Rooted in encouragement and generosity, our baking is as warm as it is delicious.',
  },
]

const menuItems = [
  {
    title: 'Honey Oat Loaf',
    description: 'Soft, golden, and lightly sweet with toasted oats and a drizzle of wildflower honey.',
    price: '$14',
    className: 'art-one',
  },
  {
    title: 'Berry Morning Bun',
    description: 'Buttery layers with jammy berries and a dusting of vanilla sugar for a cozy start.',
    price: '$12',
    className: 'art-two',
  },
  {
    title: 'Maple Pecan Bites',
    description: 'Small, rich, and beautifully crisp—packed with toasted pecans and warm maple notes.',
    price: '$16',
    className: 'art-three',
  },
]

const reviews = [
  '“The honey oat loaf was the star of our family brunch. It felt like a little gift from God’s own kindness.”',
  '“Beautifully made and even better than it looks. We ordered a gift box and it felt so personal.”',
  '“Whenever we host, ScriptureSnacks is the first thing people ask about. Everything tastes as warm as it looks.”',
]

function App() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="ScriptureSnacks home">
            <img src="/Scripture%20Snacks%20Logo.svg" alt="ScriptureSnacks logo" className="brand-logo" />
            <span>ScriptureSnacks</span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <a href="#story">My Story</a>
            <a href="#menu">Menu</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Order</a>
          </nav>

          <a href="#contact" className="button button-small">Order Today</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-shell">
            <div className="hero-top">
              <p className="eyebrow">Small-batch. Mindfully made. Joyfully shared.</p>
              <h1>Freshly baked comfort for every season of life.</h1>
            </div>

            <div className="hero-bottom">
              <div className="hero-copy">
                <p className="lead">
                  ScriptureSnacks brings together warm bakery goodness and heartfelt encouragement.
                  Each treat is handcrafted to nourish your home, your gatherings, and your faith.
                </p>
                <div className="hero-actions">
                  <a href="#menu" className="button">See the Menu</a>
                  <a href="#story" className="button button-secondary">Our Story</a>
                </div>
                <ul className="trust-list" aria-label="Highlights">
                  <li>Handcrafted weekly</li>
                  <li>Locally sourced ingredients</li>
                  <li>Made for gifting and gathering</li>
                </ul>
              </div>

              <div className="hero-visual" aria-label="ScriptureSnacks brand logo">
                <div className="logo-panel">
                  <img src="/Scripture%20Snacks%20Logo.svg" alt="ScriptureSnacks logo" className="hero-logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="story section-shell">
          <div className="container story-grid">
            <div className="story-image" aria-label="Baker in kitchen" />
            <div className="story-copy">
              <p className="eyebrow">Why we bake</p>
              <h2>Rooted in God, Shaped by Love.</h2>
              <p>
                ScriptureSnacks began with a simple idea: good bread and sweet things have a way of
                opening doors, settling hearts, and making room for conversation. We bake with that in
                mind—slow, generous, and full of gratitude.
              </p>
              <p>
                Each batch is made to feel like a welcome table: comforting, beautiful, and made for
                sharing. Whether it is a morning loaf, a celebration cake, or a small gift box, we want
                every bite to remind people they are seen and loved.
              </p>
            </div>
          </div>
        </section>

        <section id="menu" className="menu section-shell">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Favorites</p>
              <h2>Baked with joy, ready for sharing.</h2>
            </div>

            <div className="menu-grid">
              {menuItems.map((item) => (
                <article className="menu-card" key={item.title}>
                  <div className={`menu-art ${item.className}`} />
                  <div className="menu-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="menu-meta">
                      <span>{item.price}</span>
                      <a href="#contact">Order</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews section-shell">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Kind words</p>
              <h2>People come back for the warmth.</h2>
            </div>

            <div className="review-grid">
              {reviews.map((quote, index) => (
                <blockquote key={index}>
                  {quote}
                  <footer>— {['Emma L.', 'Daniel R.', 'Naomi T.'][index]}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="cta section-shell">
          <div className="container cta-box">
            <div>
              <p className="eyebrow">Let’s make something sweet</p>
              <h2>Order a treat box or custom bakery tray.</h2>
            </div>

            <div className="contact-card">
              <p><strong>Email:</strong> hello@scripturesnacks.com</p>
              <p><strong>Phone:</strong> (555) 248-0717</p>
              <p><strong>Hours:</strong> Tue–Sat · 8:00 AM–3:00 PM</p>
              <a href="mailto:hello@scripturesnacks.com" className="button">Request an Order</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© <span id="year">2026</span> ScriptureSnacks</p>
          <p>Baked with gratitude and shared with joy.</p>
        </div>
      </footer>
    </>
  )
}

export default App
