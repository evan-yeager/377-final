import React from 'react';
import './about.css';

const About: React.FC = () => {
    return (
        <main>

            <h1>About this website</h1>
            <p>
                This website is sure to be a valuable resource for anyone looking to brighten their day with some adorable animal images and fun facts. Whether you're feeling down or just need a quick pick-me-up, our collection of cute foxes, ducks, and cat facts is here to help.
            </p>
            <br /><h3>How it works</h3>
            <p>
                Once you click a button on a corresponding category, the website fetches only the best image and facts guaranteed to lift your spirits, even only a little bit. We only leverage free and public APIs on this site. 
            </p>
            <br /><h3>How cat facts work</h3>
            <p>
                The number of cat facts you receive is determined by your mood level, which you can set using the mood slider. The sadder you are (lower mood level), the more cat facts you'll get to help cheer you up! If you're really feeling down, feel free to continue clicking the buttons for more facts and images.
            </p>
        </main>
    );
};

export default About;