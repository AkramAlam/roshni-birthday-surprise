import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";


const memories = [
  { file: `${import.meta.env.BASE_URL}photos/photo-1.jpg`, label: "My favourite smile", note: "Some moments become memories. You make ordinary moments feel special." },
  { file: `${import.meta.env.BASE_URL}photos/photo-2.jpg`, label: "Us, being us", note: "Meri favourite jagah koi place nahi… tumhare paas hai." },
  { file: `${import.meta.env.BASE_URL}photos/photo-3.jpg`, label: "A little forever", note: "Har photo mein ek kahaani hai, aur meri favourite kahaani hum hain." },
];


function Heart({ className = "" }) {
  return <span aria-hidden="true" className={`heart ${className}`}>♥</span>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showPromises, setShowPromises] = useState(false);
  const [candles, setCandles] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      try {
        await audio.play();
        setMusicOn(true);
      } catch (error) {
        console.error("Music play nahi ho paya:", error);
      }
    }
  };
  const [lightbox, setLightbox] = useState(null);
  const [days, setDays] = useState(null);

  useEffect(() => {
    const now = new Date();
    const year = now.getMonth() > 9 || (now.getMonth() === 9 && now.getDate() > 22) ? now.getFullYear() + 1 : now.getFullYear();
    const target = new Date(year, 9, 22, 0, 0, 0);
    const update = () => setDays(Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86400000)));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const openSurprise = () => {
    setOpened(true);
    setTimeout(() => document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  const blowCandles = () => {
    setCandles(true);
    const duration = 2200;
    const end = Date.now() + duration;
    const colors = ["#e8a1ad", "#d5a66e", "#b75c72", "#fff0db"];
    const frame = () => {
      if (Date.now() > end) return;
      for (let i = 0; i < 5; i++) {
        const conf = document.createElement("span");
        conf.className = "confetti";
        conf.style.left = `${Math.random() * 100}vw`;
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = `${1.3 + Math.random() * 1.4}s`;
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3000);
      }
      requestAnimationFrame(() => setTimeout(frame, 180));
    };
    frame();
  };

  return (
    <main>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/birthday-song.mp3`}
        loop
        preload="auto"
      />

      <div className="grain" aria-hidden="true" />
      <div className="floating-hearts" aria-hidden="true"><span>♡</span><span>♥</span><span>♡</span><span>♥</span><span>♡</span><span>♥</span></div>
      <nav className="nav wrap">
        <a className="brand" href="#top" aria-label="Back to top"><span className="brand-mark">r.</span><span>a little something <i>for you</i></span></a>
        <a className="nav-date" href="#birthday">22 · OCT <Heart /></a>
      </nav>

      <div className="birthday-marquee" aria-label="Happy Birthday Roshni"><div className="marquee-track">{Array.from({ length: 8 }, (_, i) => <span key={i}>HAPPY BIRTHDAY ROSHNI <b>♡</b> MERI MOTKI <b>✦</b></span>)}</div></div>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> MADE WITH LOVE, JUST FOR YOU</p>
          <h1>For my Roshni,<br /><em>meri motki.</em></h1>
          <p className="hero-text">Duniya mein bahut si khoobsurat cheezein hain…<br className="desktop" /> but meri favourite toh tum ho. ♡</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={openSurprise}>Open your surprise <span>↗</span></button>
            <a className="text-link" href="#our-story">Our little story <span>↓</span></a>
          </div>
          <div className="hero-footnote"><Heart /> One website. A thousand feelings. All for you.</div>
        </div>
        <div className="hero-art" aria-label="Decorative romantic illustration">
          <div className="sun-orb" />
          <div className="hero-photo-frame">
            <img src={`${import.meta.env.BASE_URL}photos/cover.jpg`} alt="A favourite photo of Roshni and her husband" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("photo-placeholder"); }} />
            <div className="placeholder-content"><span className="placeholder-heart">♡</span><span>Put your favourite<br />photo here</span><small>public/photos/cover.jpg</small></div>
          </div>
          <div className="floating-note note-one">my favourite person <Heart /></div>
          <div className="floating-note note-two"><span>♡</span> forever & always</div>
          <span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✧</span><span className="sparkle sparkle-three">✳</span>
          <div className="hero-stamp">to my<br /><b>Roshni</b><br />with love</div>
        </div>
        <a className="scroll-cue" href="#our-story"><span /> SCROLL A LITTLE</a>
      </section>

      <section className={`reveal-section ${opened ? "is-open" : ""}`} id="birthday">
        <div className="reveal-inner wrap">
          <p className="eyebrow centered">A LITTLE BIRTHDAY MAGIC</p>
          <h2>{opened ? "Surprise, meri jaan!" : "I made a little something for you."}</h2>
          <p className="section-intro">{opened ? "Aaj ka din tumhara hai. And this little corner of the internet? Sirf tumhara." : "No big speech. Bas dil se banayi hui ek chhoti si duniya."}</p>
          <div className="birthday-card">
            <div className="card-flower">✿</div>
            <div className="cake" aria-label="Birthday cake with candles">
              <div className="flame-row">{[0, 1, 2].map(n => <span key={n} className={`candle ${candles ? "blown" : ""}`}><i /></span>)}</div>
              <div className="cake-top" /><div className="cake-middle"><span>♡</span><span>♡</span><span>♡</span></div><div className="cake-bottom" />
              <div className="cake-plate" />
            </div>
            <p className="cake-message">Happy Birthday, <em>Roshni</em> ♡</p>
            <p className="cake-sub">Meri motki, meri khushi, mera ghar.</p>
            <button className="button button-rose" onClick={blowCandles}>{candles ? "Wish sent to the universe ✨" : "Make a wish & blow the candles"} <span>♡</span></button>
            {candles && <p className="wish-note">Jo bhi wish maango, meri dua hai tumhari har khushi poori ho. ❤️</p>}
          </div>
          <div className="countdown">{days === 0 ? "It's your day today ♡" : `${days} ${days === 1 ? "day" : "days"} until October 22`} <span>·</span> counting down to celebrating you</div>
        </div>
      </section>

      <div className="birthday-wish-strip"><span className="wish-spark">✧</span><p>Happy Birthday, meri jaan! <em>May your smile shine forever.</em> ♡</p><span className="wish-spark">✧</span></div>

      <section className="story-section wrap section-pad" id="our-story">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> THE LITTLE THINGS</p>
          <h2>My favourite story<br /><em>is the one with you.</em></h2>
        </div>
        <div className="story-grid">
          <div className="story-visual">
            <div className="story-image">
              <img src={`${import.meta.env.BASE_URL}photos/memory-main.jpg`} alt="A special memory together" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("photo-placeholder"); }} />
              <div className="placeholder-content"><span className="placeholder-heart">♡</span><span>Your favourite memory</span><small>public/photos/memory-main.jpg</small></div>
            </div>
            <div className="handwritten">still choosing you <Heart /></div>
          </div>
          <div className="story-copy">
            <span className="story-number">01 / MY PERSON</span>
            <h3>Life feels softer<br />with you in it.</h3>
            <p>Kabhi socha nahi tha ki koi insaan itna apna lag sakta hai. Tumhare saath normal se normal din bhi special ban jaata hai. Tumhari hasi, tumhari baatein, tumhara nakhra — sab kuch meri duniya ka favourite part hai.</p>
            <p>Aur haan, meri motki… tumhe tang karna bhi meri love language hai. 😌❤️</p>
            <div className="signature">Yours, always <span>♡</span></div>
          </div>
        </div>
      </section>

      <section className="memories-section">
        <div className="wrap section-pad">
          <div className="memories-title">
            <div><p className="eyebrow centered">A FEW LITTLE FOREVERS</p><h2>Moments I’d <em>keep forever.</em></h2></div>
            <p>Tap a photo to see it a little closer. Replace these placeholders with your favourite memories.</p>
          </div>
          <div className="memory-grid">
            {memories.map((memory, i) => (
              <button className={`memory-card memory-${i + 1}`} key={memory.file} onClick={() => setLightbox(memory)} aria-label={`Open memory: ${memory.label}`}>
                <div className="memory-image">
                  <img src={memory.file} alt={memory.label} onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("photo-placeholder"); }} />
                  <div className="placeholder-content"><span className="placeholder-heart">♡</span><span>Add a photo</span><small>{memory.file.replace("/photos/", "")}</small></div>
                </div>
                <div className="memory-caption"><span>{memory.label}</span><Heart /></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="birthday-marquee marquee-soft" aria-label="Wishing you a beautiful birthday"><div className="marquee-track reverse">{Array.from({ length: 8 }, (_, i) => <span key={i}>IT'S YOUR DAY, ROSHNI <b>♡</b> KEEP SMILING ALWAYS <b>✦</b></span>)}</div></div>

      <section className="letter-section wrap section-pad" id="letter">
        <div className="letter-art"><div className="letter-sun" /><div className="envelope"><div className="envelope-flap" /><div className="envelope-paper">To my<br /><em>Roshni</em><Heart /></div><span className="wax-seal">r</span></div><span className="letter-spark">✧</span></div>
        <div className="letter-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> SOMETHING FROM MY HEART</p>
          <h2>A letter I hope<br /><em>you’ll keep.</em></h2>
          <p>Some feelings are easier to write than to say out loud. So I wrote these just for you.</p>
          <button className="button button-dark" onClick={() => setLetterOpen(!letterOpen)}>{letterOpen ? "Fold the letter" : "Open your letter"} <span>{letterOpen ? "↑" : "↗"}</span></button>
        </div>
        {letterOpen && <div className="letter-modal" role="dialog" aria-modal="true" aria-label="Love letter">
          <button className="modal-close" onClick={() => setLetterOpen(false)} aria-label="Close letter">×</button>
          <p className="eyebrow centered">TO MY ROSHNI</p>
          <h2>Meri motki, ❤️</h2>
          <p>Happy Birthday, meri jaan.</p>
          <p>Main shayad har baar perfect words nahi dhoondh paata, lekin ek baat hamesha sach rahegi — tum mere liye bahut special ho. Tumhari khushi mere liye important hai, tumhari smile meri favourite hai, aur tumhare saath future imagine karna mujhe sukoon deta hai.</p>
          <p>Thank you meri life ka hissa banne ke liye, mujhe tolerate karne ke liye, aur apni tarah se meri duniya ko better banane ke liye. Main promise karta hoon ki sirf aaj nahi, balki ordinary days par bhi tumhe loved, respected aur appreciated feel karane ki koshish karta rahunga.</p>
          <p>Hamesha haste rehna, apna khayal rakhna, aur yaad rakhna — tumhe chahne wala ek insaan hai jo tumhari har chhoti khushi mein bhi khush ho jaata hai.</p>
          <p className="letter-signoff">Tumhara, aaj bhi aur kal bhi.<br /><em>I love you, Roshni. ♡</em></p>
        </div>}
      </section>

      <section className="promises-section">
        <div className="wrap promises-wrap">
          <p className="eyebrow centered">NOT JUST WORDS</p>
          <h2>Little promises, <em>big love.</em></h2>
          <p className="section-intro">Because love is in the everyday things, too.</p>
          <button className="promise-toggle" onClick={() => setShowPromises(!showPromises)}>{showPromises ? "Hide my promises" : "A few promises for you"} <span>{showPromises ? "−" : "+"}</span></button>
          {showPromises && <div className="promise-list">
            <p><span>01</span> Tumhari baat sununga — sirf jawab dene ke liye nahi, samajhne ke liye.</p>
            <p><span>02</span> Tumhari chhoti achievements ko bhi celebrate karunga.</p>
            <p><span>03</span> Galti ho toh ego se pehle tum aur hum ko choose karne ki koshish karunga.</p>
            <p><span>04</span> Tumhe yaad dilata rahunga ki tum loved ho, sirf special occasions par nahi.</p>
          </div>}
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-heart"><Heart /></div>
        <p className="eyebrow centered">MADE WITH ALL MY LOVE</p>
        <div className="footer-birthday-glow">✦ HAPPY BIRTHDAY ✦</div>
        <h2>Happy Birthday, <em>meri motki.</em></h2>
        <p className="footer-extra-wish">Aaj bhi tum meri favourite ho, kal bhi rahogi. ❤️</p>
        <p className="footer-copy">If I could give you one thing in life,<br />I’d give you the ability to see yourself through my eyes.</p>
        <p className="footer-final">You’d finally know how special you are. ♡</p>
        <a className="back-top" href="#top">Back to the top ↑</a>
        <div className="footer-bottom"><span>OCTOBER 22</span><span>JUST YOU & ME <Heart /></span></div>
      </footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.label} onClick={() => setLightbox(null)}>
        <button className="modal-close" onClick={() => setLightbox(null)} aria-label="Close photo">×</button>
        <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-image"><img src={`${import.meta.env.BASE_URL}${lightbox.file.replace(/^\//, "")}`} alt={lightbox.label} onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("photo-placeholder"); }} /><div className="placeholder-content"><span className="placeholder-heart">♡</span><span>Add your photo</span></div></div>
          <h3>{lightbox.label}</h3><p>{lightbox.note}</p>
        </div>
      </div>}
      
<button
  className={`sound-toggle ${musicOn ? "active" : ""}`}
  onClick={toggleMusic}
  title="Play or pause birthday song"
  aria-label={musicOn ? "Pause birthday song" : "Play birthday song"}
>
  {musicOn ? "♫" : "♪"}
  <span>{musicOn ? "pause music" : "play our song"}</span>
</button>

{musicOn && (
  <div className="music-toast">
    Playing our special song ♡
  </div>
)}

    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
