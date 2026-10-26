(() => {
  // Shared collections for each sport's profile AND highlights page.
  // Add photos and game/skills clips here once; both pages update together.
  const media = {
  "soccer": {
    "label": "Soccer",
    "photos": [
      {
        "src": "assets/soccer-run.png",
        "alt": "Kahsi Morgan running during soccer warmups"
      },
      {
        "src": "assets/soccer-black.jpeg",
        "alt": "Kahsi Morgan on the soccer field in black and blue jersey"
      },
      {
        "src": "assets/soccer-team.png",
        "alt": "Kahsi Morgan with soccer teammates"
      },
      {
        "src": "assets/soccer-s1.jpg",
        "alt": "Kahsi Morgan in blue soccer uniform before a match"
      },
      {
        "src": "assets/soccer-s2.jpg",
        "alt": "Kahsi Morgan tracking the soccer ball in blue uniform"
      },
      {
        "src": "assets/soccer-s3.jpg",
        "alt": "Kahsi Morgan controlling the soccer ball in game action"
      },
      {
        "src": "assets/soccer-s4.jpg",
        "alt": "Kahsi Morgan running toward the soccer ball"
      },
      {
        "src": "assets/soccer-s5.jpg",
        "alt": "Black and white portrait of Kahsi Morgan in soccer uniform"
      },
      {
        "src": "assets/soccer-s6.jpg",
        "alt": "Black and white photo of Kahsi Morgan under stadium lights"
      },
      {
        "src": "assets/soccer-s7.png",
        "alt": "Kahsi Morgan smiling with soccer coach on the field"
      },
      {
        "src": "assets/soccer-ball-portrait.jpg",
        "alt": "Kahsi Morgan holding a soccer ball in blue number 2 uniform against a smoke backdrop"
      },
      {
        "src": "assets/soccer-sideline-water.jpg",
        "alt": "Kahsi Morgan taking a water break in blue and white soccer uniform"
      },
      {
        "src": "assets/soccer-black-uniform.jpg",
        "alt": "Kahsi Morgan on the soccer field in black and blue number 14 uniform"
      },
      {
        "src": "assets/soccer-capital-back.jpg",
        "alt": "Kahsi Morgan holding a soccer ball with Capital number 2 on the back of his jersey"
      },
      {
        "src": "assets/soccer-ball-challenge.jpg",
        "alt": "Black and white photo of Kahsi Morgan challenging an opponent for the soccer ball"
      },
      {
        "src": "assets/soccer-teammate-embrace.jpg",
        "alt": "Kahsi Morgan embracing a teammate in blue soccer uniforms"
      },
      {
        "src": "assets/soccer-header.jpg",
        "alt": "Kahsi Morgan jumping for a header in blue number 2 soccer uniform"
      },
      {
        "src": "assets/soccer-shot.jpg",
        "alt": "Kahsi Morgan striking the soccer ball while an opponent closes in"
      }
    ],
    "films": [
      {
        "id": "game-film",
        "title": "Game Film",
        "clips": [
          {
            "src": "assets/soccer-three-goal-game-1.mp4",
            "poster": "assets/soccer-three-goal-game-1-poster.jpg",
            "title": "Three-Goal Game — Clip 1",
            "caption": "Game action from Kahsi Morgan’s three-goal performance in a soccer win."
          },
          {
            "src": "assets/soccer-three-goal-game-2.mp4",
            "poster": "assets/soccer-three-goal-game-2-poster.jpg",
            "title": "Three-Goal Game — Clip 2",
            "caption": "Game action from Kahsi Morgan’s three-goal performance in a soccer win."
          },
          {
            "src": "assets/soccer-three-goal-game-3.mp4",
            "poster": "assets/soccer-three-goal-game-3-poster.jpg",
            "title": "Three-Goal Game — Clip 3",
            "caption": "Game action from Kahsi Morgan’s three-goal performance in a soccer win."
          }
        ]
      },
      {
        "id": "skills-film",
        "title": "Skills Film",
        "clips": []
      }
    ],
    "hudl": "https://www.hudl.com/profile/24947935"
  },
  "basketball": {
    "label": "Basketball",
    "photos": [
      {
        "src": "assets/basketball-hero.jpeg",
        "alt": "Kahsi Morgan seated in basketball uniform holding a basketball"
      },
      {
        "src": "assets/basketball-dribble.jpeg",
        "alt": "Kahsi Morgan dribbling a basketball in studio portrait"
      },
      {
        "src": "assets/basketball-point.jpeg",
        "alt": "Kahsi Morgan pointing while spinning a basketball"
      },
      {
        "src": "assets/basketball-towel.jpeg",
        "alt": "Kahsi Morgan holding a basketball with towel over shoulders"
      },
      {
        "src": "assets/basketball-layup.jpg",
        "alt": "Kahsi Morgan driving for a layup in blue Cougars number 10 uniform"
      },
      {
        "src": "assets/basketball-jump-shot.jpg",
        "alt": "Kahsi Morgan shooting in blue Cougars number 10 uniform"
      },
      {
        "src": "assets/basketball-game-dribble.jpg",
        "alt": "Kahsi Morgan dribbling during a game in white Capital number 10 uniform"
      },
      {
        "src": "assets/basketball-scoreboard.jpg",
        "alt": "Kahsi Morgan in black number 10 uniform beneath the game scoreboard"
      },
      {
        "src": "assets/basketball-huddle.jpg",
        "alt": "Kahsi Morgan listening during a basketball team huddle"
      },
      {
        "src": "assets/basketball-black-dribble.jpg",
        "alt": "Kahsi Morgan directing play while dribbling in black number 10 uniform"
      },
      {
        "src": "assets/basketball-white-uniform.jpg",
        "alt": "Kahsi Morgan on court in white Capital number 10 uniform"
      },
      {
        "src": "assets/basketball-shot-preparation.jpg",
        "alt": "Kahsi Morgan preparing to shoot in white Capital uniform"
      },
      {
        "src": "assets/basketball-court-vision.jpg",
        "alt": "Kahsi Morgan surveying the court with the basketball"
      },
      {
        "src": "assets/basketball-shooting-form.jpg",
        "alt": "Kahsi Morgan setting up a jump shot in white Capital uniform"
      },
      {
        "src": "assets/basketball-bringing-ball-up.jpg",
        "alt": "Kahsi Morgan bringing the ball up court during a home game"
      },
      {
        "src": "assets/basketball-drive-wolves.jpg",
        "alt": "Kahsi Morgan driving toward the basket against defenders in gray uniforms"
      },
      {
        "src": "assets/basketball-blue-defense.jpg",
        "alt": "Kahsi Morgan defending a drive in blue Cougars number 10 uniform"
      },
      {
        "src": "assets/basketball-contested-finish.jpg",
        "alt": "Kahsi Morgan attempting a contested layup in white Capital uniform"
      },
      {
        "src": "assets/basketball-reaching-layup.jpg",
        "alt": "Kahsi Morgan extending for a layup over a defender"
      },
      {
        "src": "assets/basketball-teammate-greetings.jpg",
        "alt": "Kahsi Morgan greeting teammates near the bench with a towel in hand"
      },
      {
        "src": "assets/basketball-finish-lions.jpg",
        "alt": "Kahsi Morgan finishing at the basket against defenders in black Lions uniforms"
      },
      {
        "src": "assets/basketball-coach-conversation.jpg",
        "alt": "Kahsi Morgan talking with a basketball coach on the sideline"
      },
      {
        "src": "assets/basketball-white-defense.jpg",
        "alt": "Kahsi Morgan defending an opponent in white Capital number 10 uniform"
      }
    ],
    "films": [
      {
        "id": "game-film",
        "title": "Game Film",
        "clips": [
          {
            "src": "assets/basketball-highlights.mp4",
            "poster": "assets/basketball-highlights-poster.jpg"
          },
          {
            "src": "assets/basketball-game-film-2.mp4",
            "poster": "assets/basketball-game-film-2-poster.jpg"
          },
          {
            "src": "assets/basketball-season-highlights-1.mp4",
            "poster": "assets/basketball-season-highlights-1-poster.jpg",
            "title": "Full Season Highlights — Part 1",
            "caption": "Kahsi Morgan’s season highlights: scoring, ball handling, and defense."
          },
          {
            "src": "assets/basketball-season-highlights-2.mp4",
            "poster": "assets/basketball-season-highlights-2-poster.jpg",
            "title": "Full Season Highlights — Part 2",
            "caption": "More season highlights featuring Kahsi Morgan’s scoring, ball handling, and defense."
          },
          {
            "src": "assets/basketball-first-win.mp4",
            "poster": "assets/basketball-first-win-poster.jpg",
            "title": "First Win of the Season",
            "caption": "Game MVP performance: 9 points, 8 assists, and 5 rebounds in a team win."
          },
          {
            "src": "assets/basketball-midseason-1.mp4",
            "poster": "assets/basketball-midseason-1-poster.jpg",
            "title": "Midseason Highlights — Part 1",
            "caption": "Kahsi Morgan’s game highlights from the first half of the season."
          },
          {
            "src": "assets/basketball-midseason-2.mp4",
            "poster": "assets/basketball-midseason-2-poster.jpg",
            "title": "Midseason Highlights — Part 2",
            "caption": "More game action from Kahsi Morgan’s midseason highlight collection."
          },
          {
            "src": "assets/basketball-greenbrier-east.mp4",
            "poster": "assets/basketball-greenbrier-east-poster.jpg",
            "title": "17 Points vs. Greenbrier East",
            "caption": "Kahsi Morgan scores 17 points in an elimination game against Greenbrier East."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-1.mp4",
            "poster": "assets/basketball-mylan-bridgeport-1-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 1",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-2.mp4",
            "poster": "assets/basketball-mylan-bridgeport-2-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 2",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-3.mp4",
            "poster": "assets/basketball-mylan-bridgeport-3-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 3",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-4.mp4",
            "poster": "assets/basketball-mylan-bridgeport-4-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 4",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-5.mp4",
            "poster": "assets/basketball-mylan-bridgeport-5-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 5",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-6.mp4",
            "poster": "assets/basketball-mylan-bridgeport-6-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 6",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          },
          {
            "src": "assets/basketball-mylan-bridgeport-7.mp4",
            "poster": "assets/basketball-mylan-bridgeport-7-poster.jpg",
            "title": "Mylan Park & Bridgeport — Clip 7",
            "caption": "From Kahsi Morgan’s Mylan Park and Bridgeport game film collection."
          }
        ]
      },
      {
        "id": "skills-film",
        "title": "Skills Film",
        "clips": [
          {
            "src": "assets/basketball-skills-film.mp4",
            "poster": "assets/basketball-skills-film-poster.jpg"
          },
          {
            "src": "assets/basketball-night-skills-1.mp4",
            "poster": "assets/basketball-night-skills-1-poster.jpg",
            "title": "Late-Night Skills Work — Clip 1",
            "caption": "Basketball training focused on balance, tough shot making, and ball handling under pressure."
          },
          {
            "src": "assets/basketball-night-skills-2.mp4",
            "poster": "assets/basketball-night-skills-2-poster.jpg",
            "title": "Late-Night Skills Work — Clip 2",
            "caption": "Basketball training focused on balance, tough shot making, and ball handling under pressure."
          },
          {
            "src": "assets/basketball-night-skills-3.mp4",
            "poster": "assets/basketball-night-skills-3-poster.jpg",
            "title": "Late-Night Skills Work — Clip 3",
            "caption": "Basketball training focused on balance, tough shot making, and ball handling under pressure."
          },
          {
            "src": "assets/basketball-night-skills-4.mp4",
            "poster": "assets/basketball-night-skills-4-poster.jpg",
            "title": "Late-Night Skills Work — Clip 4",
            "caption": "Basketball training focused on balance, tough shot making, and ball handling under pressure."
          }
        ]
      }
    ],
    "hudl": "https://www.hudl.com/profile/24947935"
  }
};

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  document.querySelectorAll('[data-gallery-sport]').forEach((gallery) => {
    const collection = media[gallery.dataset.gallerySport];
    if (!collection) return;
    gallery.innerHTML = collection.photos.map((photo) => `
      <figure><img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt)}" loading="lazy"></figure>
    `).join('');
  });

  document.querySelectorAll('[data-sport-films]').forEach((container) => {
    const sport = container.dataset.sportFilms;
    const collection = media[sport];
    if (!collection) return;
    const filmSections = collection.films.filter((film) => film.clips.length).map((film) => {
      const headingId = `${sport}-${film.id}-all-title`;
      return `
        <section class="sport-detail-section media-section" data-highlight-section data-film-label="${escapeHTML(film.title)}" id="${film.id}">
          <div class="section-heading">
            <p>${collection.label} Highlights</p>
            <h2>${escapeHTML(film.title)}</h2>
          </div>
          <div class="highlight-video-grid" data-highlight-gallery>
            ${film.clips.map((clip) => `
              <figure class="basketball-highlight-video">
                <video controls playsinline preload="none" poster="${escapeHTML(clip.poster)}" aria-label="${escapeHTML(clip.title || collection.label + ' ' + film.title)}">
                  <source src="${escapeHTML(clip.src)}" type="video/mp4">
                  Your browser does not support embedded video. <a href="${escapeHTML(clip.src)}">Watch the video</a>.
                </video>
                ${clip.title || clip.caption ? `<figcaption>${clip.title ? `<strong>${escapeHTML(clip.title)}</strong>` : ''}${clip.caption ? `<span>${escapeHTML(clip.caption)}</span>` : ''}</figcaption>` : ''}
              </figure>
            `).join('')}
          </div>
          <button class="button secondary gallery-view-all" type="button" data-highlights-show-all aria-haspopup="dialog">View All ${escapeHTML(film.title)}</button>
          <dialog class="highlights-dialog" aria-labelledby="${headingId}">
            <div class="highlights-dialog-header">
              <h2 id="${headingId}">All ${escapeHTML(film.title)}</h2>
              <button class="button secondary" type="button" data-highlights-close autofocus>Close</button>
            </div>
            <div class="highlight-video-grid" data-all-highlights></div>
          </dialog>
        </section>
      `;
    }).join('');
    container.innerHTML = filmSections + `
      <section class="sport-detail-section media-section">
        ${filmSections ? '' : `<div class="section-heading"><p>${collection.label} Film</p><h2>Highlight Videos</h2></div>`}
        <div class="video-link-grid">
          <a class="video-link-card" href="${escapeHTML(collection.hudl)}" target="_blank" rel="noopener">
            <span class="social-icon hudl"><img src="assets/hudl-logo.png" alt=""></span>
            <strong>Watch ${collection.label} Highlights</strong>
            <small>Open Hudl profile</small>
          </a>
        </div>
      </section>
    `;
  });
})();
