import './Hero.css'
export default function Hero()
{
    return (
        <section className=".hero-container">
<div className="hero-content">
        <div className="hero-inner">
          <div className="badges">
            <span className="badge">Notion</span>
            <span className="badge badge-primary">For what Patreon</span>
            <span className="badge badge-secondary">for fundraising</span>
          </div>

          <h1 className="hero-title ">
            Built for creators,<br />
            Loved by communities
          </h1>

          <div className="features-grid">
            {/* Left Card - Creators (Purple Glass) */}
            <div className="feature-card">
              <div className="card-header">
                <span className="card-label">Creators</span>
              </div>
              
              <div className="feature-list">
                <div className="feature-item">
                  <div className="icon-wrapper">
                    <span className="icon">💡</span>
                  </div>
                  <div className="feature-text">
                    <div>Raise funds fast & long-term</div>
                    <div className="feature-subtitle">for your projects</div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="icon-wrapper">
                    <span className="icon">📊</span>
                  </div>
                  <div className="feature-text">
                    <div>Gain visibility & garner</div>
                    <div className="feature-subtitle">support</div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="icon-wrapper">
                    <span className="icon">💰</span>
                  </div>
                  <div className="feature-text">
                    <div>Keep 100% cost, zero middle</div>
                    <div className="feature-subtitle">men</div>
                  </div>
                </div>
              </div>

              <div className="avatars-container">
                <div className="avatar avatar-1">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Creator 1" />
                </div>
                <div className="avatar avatar-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="Creator 2" />
                </div>
                <div className="avatar avatar-3">
                  <span className="avatar-icon">🎵</span>
                </div>
                <div className="avatar avatar-4">
                  <span className="avatar-icon">⚫</span>
                </div>
              </div>
            </div>

            {/* Right Section - Communities */}
            <div className="right-section">
              {/* Dark Glass Illustration */}
              <div className="illustration">
                <div className="doodle-elements">
                  <svg className="doodle-line" viewBox="0 0 200 200">
                    <path className="doodle-svg" d="M 50 100 Q 100 50, 150 100" />
                  </svg>
                  <span className="doodle star">✦</span>
                  <span className="doodle pencil">✏️</span>
                  <span className="doodle flag">🚩</span>
                  <span className="doodle coin">💰</span>
                </div>
              </div>

              {/* Dark Glass Community Card */}
              <div className="community-card">
                <div className="card-header">
                  <span className="card-label">Communities</span>
                </div>

                <div className="community-features">
                  <div className="community-item">
                    <span className="bullet">◆</span>
                    <div>
                      <div>Back early mags unlimited</div>
                      <div className="item-subtitle">upside</div>
                    </div>
                  </div>

                  <div className="community-item">
                    <span className="bullet green">◆</span>
                    <div>
                      <div>Easily discover projects doing</div>
                      <div className="item-subtitle">real good</div>
                    </div>
                  </div>

                  <div className="community-item">
                    <span className="bullet purple">◆</span>
                    <div>Co-create and engage directly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
    )
}