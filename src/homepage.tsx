import React, { useState, useEffect, useRef } from 'react';
import 'range-slider-element';
import 'range-slider-element/style.css';
import { DatabaseService, type RatingData, type AnimalCount } from './db_service';

const Homepage: React.FC = () => {
    const [moodLevel, setMoodLevel] = useState(5);
    const sliderRef = useRef<any>(null);
    const [count, setCount] = useState<AnimalCount | null>(null);
    const [foxRating, setFoxRating] = useState<RatingData | null>(null);
    const [duckRating, setDuckRating] = useState<RatingData | null>(null);
    const [catRating, setCatRating] = useState<RatingData | null>(null);
    const dbService: DatabaseService = new DatabaseService();

    // set up the event listener for the range slider
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            setMoodLevel(Number(target.value));
        };

        slider.addEventListener('input', handleInput);

        return () => {
            slider.removeEventListener('input', handleInput);
        };
    }, []);

    // load the counts
    useEffect(() => {
        const loadCount = async () => {
            const count = await dbService.getCount();
            setCount(count);
        };
        loadCount();
    }, []);

    // load the ratings
    useEffect(() => {
        const loadRatings = async () => {
            const foxRatingValue: RatingData = await dbService.getRating("fox");
            const duckRatingValue: RatingData = await dbService.getRating("duck");
            const catRatingValue: RatingData = await dbService.getRating("cat");

            setFoxRating(foxRatingValue);
            setDuckRating(duckRatingValue);
            setCatRating(catRatingValue);
        };
        loadRatings();
    }, []);

    const handleSetRating = (section: 'fox' | 'duck' | 'cat', newRating: number) => {
        let currentRating: RatingData | null = null;
        
        if (section === 'fox') {
            currentRating = foxRating;
        } else if (section === 'duck') {
            currentRating = duckRating;
        } else if (section === 'cat') {
            currentRating = catRating;
        }

        if (!currentRating) return;

        // Calculate new average rating
        const totalRatings = currentRating.rating * currentRating.num_ratings;
        const newnum_ratings = currentRating.num_ratings + 1;
        const newAverageRating = (totalRatings + newRating) / newnum_ratings;

        const updatedRating: RatingData = {
            id: currentRating.id,
            rating: newAverageRating,
            num_ratings: newnum_ratings
        };

        console.log('Updated rating object:', updatedRating);

        // Update state
        if (section === 'fox') {
            setFoxRating(updatedRating);
        } else if (section === 'duck') {
            setDuckRating(updatedRating);
        } else if (section === 'cat') {
            setCatRating(updatedRating);
        }

        // Save to database
        dbService.updateRating(section, updatedRating);
    };

    const loadFox = async () => {
        const container = document.getElementById('foxContainer');
        if (!container) return;
        container.innerHTML = '<span class="placeholder">Loading...</span>';

        const response = await fetch('https://randomfox.ca/floof/');
        const responseBody = await response.json();
        const url: string = responseBody.image;

        setTimeout(() => {
            container.innerHTML = `<img src="${url}" alt="Random fox"/>`;
            if (!count) return;

            const newCount = { ...count, fox: count.fox + 1 };
            setCount(newCount);
            dbService.updateCount(newCount);
        }, 500);
    };

    const loadDuck = async () => {
        const container = document.getElementById('duckContainer');
        if (!container) return;
        container.innerHTML = '<span class="placeholder">Loading...</span>';

        const response = await fetch('https://random-d.uk/api/random');
        const responseBody = await response.json();
        const url: string = responseBody.url;
        setTimeout(() => {
            container.innerHTML = `<img src="${url}" alt="Random duck"/>`;
            if (!count) return;

            const newCount = { ...count, duck: count.duck + 1 };
            setCount(newCount);
            dbService.updateCount(newCount);
        }, 500);
    };

    const loadCatFacts = async () => {
        const factCount = 11 - moodLevel;
        const container = document.getElementById('factsContainer');
        if (!container) return;
        container.innerHTML = '<p style="text-align: center; color: #999;">Loading facts...</p>';

        const response = await fetch(`https://meowfacts.herokuapp.com/?count=${factCount}`);
        const responseBody = await response.json();
        const facts: string[] = responseBody.data;
        setTimeout(() => {
            container.innerHTML = '';
            const factText: string[] = [];
            for (let i = 0; i < factCount; i++) {
                factText.push(`
          <div class="fact-card">
            <div class="fact-number">Cat Fact #${i + 1}</div>
            <div>${facts[i]}</div>
          </div>
        `);
            }
            container.innerHTML = factText.join('');

            if (!count) return;

            const newCount = { ...count, cat: count.cat + factCount };
            setCount(newCount);
            dbService.updateCount(newCount);
        }, 500);
    };

    return (
        <div>
            <header>
                <h1>🦊 Animal Mood Booster 🦆</h1>
                <p className="subtitle">Cute animals and fun facts to brighten your day!</p>
            </header>

            <div className="mood-slider-section">
                <h2>How Are You Feeling?</h2>
                <div className="slider-container">
                    <span className="emoji">😢</span>
                    {/* @ts-ignore */}
                    <range-slider
                        ref={sliderRef}
                        min="1"
                        max="10"
                        value={moodLevel.toString()}
                    />
                    <span className="emoji">😊</span>
                </div>
                <div className="mood-info">
                    Mood Level: <span className="mood-value" id="moodValue">{moodLevel}</span> / 10
                    <br />
                    <small>This affects how many cat facts you'll get! Sadder → more cat facts.</small>
                </div>
            </div>

            <div className="content-grid">
                <div className="card">
                    <h3>🦊 Random Fox</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <p className='db-count' style={{ margin: 0 }}>
                            {count ? `${count.fox} fox pictures generated` : 'Loading...'}
                            {foxRating && ` | ⭐ ${foxRating.rating.toFixed(1)} (${foxRating.num_ratings} ratings)`}
                        </p>
                        <div className="rating-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${foxRating && star <= Math.round(foxRating.rating) ? 'active' : ''}`}
                                    onClick={() => handleSetRating('fox', star)}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="image-container" id="foxContainer">
                        <span className="placeholder">Click button to load</span>
                    </div>
                    <button className="homeButton" onClick={loadFox}>Get New Fox</button>
                </div>

                <div className="card">
                    <h3>🦆 Random Duck</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <p className='db-count' style={{ margin: 0 }}>
                            {count ? `${count.duck} duck pictures generated` : 'Loading...'}
                            {duckRating && ` | ⭐ ${duckRating.rating.toFixed(1)} (${duckRating.num_ratings} ratings)`}
                        </p>
                        <div className="rating-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${duckRating && star <= Math.round(duckRating.rating) ? 'active' : ''}`}
                                    onClick={() => handleSetRating('duck', star)}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="image-container" id="duckContainer">
                        <span className="placeholder">Click button to load</span>
                    </div>
                    <button className="homeButton" onClick={loadDuck}>Get New Duck</button>
                </div>
            </div>

            <div className="cat-facts-section">
                <h2>🐱 Cat Facts Corner</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <p className='db-count' style={{ margin: 0 }}>
                        {count ? `${count.cat} cat facts generated` : 'Loading...'}
                        {catRating && ` | ⭐ ${catRating.rating.toFixed(1)} (${catRating.num_ratings} ratings)`}
                    </p>
                    <div className="rating-container">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${catRating && star <= Math.round(catRating.rating) ? 'active' : ''}`}
                                onClick={() => handleSetRating('cat', star)}
                            >
                                ⭐
                            </span>
                        ))}
                    </div>
                </div>
                <div className="facts-container" id="factsContainer">
                    <p style={{ textAlign: 'center', color: '#999' }}>
                        Move the mood slider and click the button below to load cat facts!
                    </p>
                </div>
                <button className="load-facts-btn" onClick={loadCatFacts}>Load Cat Facts</button>
            </div>
        </div>
    );
};

export default Homepage;