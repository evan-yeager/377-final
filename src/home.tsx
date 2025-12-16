import { useState } from "react";
import "./home.css";

export default function Home() {
  const [moodLevel, setMoodLevel] = useState(5);

  const loadFox = async () => {
    const container = document.getElementById('foxContainer');
    if (!container) return;
    container.innerHTML = '<span className="placeholder">Loading...</span>';

    const response = await fetch('https://randomfox.ca/floof/');
    const responseBody = await response.json();
    const url: string = responseBody.image;
    setTimeout(() => {
      container.innerHTML = `<img src="${url}"/>`;
    }, 500);
  };

  const loadDuck = async () => {
    const container = document.getElementById('duckContainer');
    if (!container) return;
    container.innerHTML = '<span className="placeholder">Loading...</span>';

    const response = await fetch('https://random-d.uk/api/random');
    const responseBody = await response.json();
    const url: string = responseBody.url;
    setTimeout(() => {
      container.innerHTML = `<img src="${url}"/>`;
    }, 500);
  };

  const loadCatFacts = async () => {
    const factCount = 11 - moodLevel;
    const container = document.getElementById('factsContainer');
    if (!container) return;
    container.innerHTML = '<p style="text-align: center; color: #999;">Loading facts...</p>';

    const response = await fetch(`https://meowfacts.herokuapp.com/?count=${factCount}`);
    const responseBody = await response.json();
    const facts: [] = responseBody.data;
    setTimeout(() => {
      container.innerHTML = '';
      const factText: string[] = [];
      for (let i = 0; i <  factCount; i++) {
        factText.push(`
          <div className="fact-card">
            <div className="fact-number">Cat Fact #${i + 1}</div>
            <div>🐱 ${facts[i]}</div>
          </div>
        `);
      }
      container.innerHTML = factText.join('');
    }, 500);
  };

  return (
    <>
      <div className="container">
        <header>
          <h1>🦊 Animal Mood Booster 🦆</h1>
          <p className="subtitle">Cute animals and fun facts to brighten your day!</p>
        </header>

        <div className="mood-slider-section">
          <h2>How Are You Feeling?</h2>
          <div className="slider-container">
            <span className="emoji">😢</span>
            <input
              type="range"
              id="moodSlider"
              min="1"
              max="10"
              value={moodLevel}
              onChange={(e) => setMoodLevel(parseInt(e.target.value))}
            />
            <span className="emoji">😊</span>
          </div>
          <div className="mood-info">
            Mood Level: <span className="mood-value" id="moodValue">{moodLevel}</span> / 10
            <br />
            <small>This affects how many cat facts you'll get! Sadder -&gt; more cat facts.</small>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <h3>🦊 Random Fox</h3>
            <div className="image-container" id="foxContainer">
              <span className="placeholder">Click button to load</span>
            </div>
            <button onClick={loadFox}>Get New Fox</button>
          </div>

          <div className="card">
            <h3>🦆 Random Duck</h3>
            <div className="image-container" id="duckContainer">
              <span className="placeholder">Click button to load</span>
            </div>
            <button onClick={loadDuck}>Get New Duck</button>
          </div>
        </div>

        <div className="cat-facts-section">
          <h2>🐱 Cat Facts Corner</h2>
          <div className="facts-container" id="factsContainer">
            <p style={{ textAlign: 'center', color: '#999' }}>
              Move the mood slider and click the button below to load cat facts!
            </p>
          </div>
          <button className="load-facts-btn" onClick={loadCatFacts}>Load Cat Facts</button>
        </div>
      </div>
    </>
  );
}