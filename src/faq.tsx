import React from 'react';
import { Link } from 'react-router-dom';
import './faq.css';

const FAQ: React.FC = () => {
    return (
        <main>
            <h1>Frequently Asked Questions</h1>
            <div>
                <h2>How does this work?</h2>
                <p>Please refer to <Link to="/about">the About page</Link> for more information.</p>
            </div>
            <div>
                <h2>Is this too good to be true??</h2>
                <p>My mom always told me there was no such thing as a free lunch, but this is as free a lunch as it gets, thanks to the public APIs, in addition to the free tiers of vercel and supabase for hosting.</p>
            </div>
            <div>
                <h2>This is a really good website. Hypothetically, if this was for a class, what grade would you get?</h2>
                <p>Well, that's for the professor to decide. My two cents is that it's a solid A+ for sure.</p>
            </div>
            <div>
                <h2>What are these glorious APIs this site uses?</h2>
                <p>It's totally understandable to be enraptured by the gloriousness this site offers. Here is a list of the APIs:<ul>
                    <li>https://github.com/wh-iterasbb-it/meowfacts</li>
                    <li>https://randomfox.ca/floof/</li>
                    <li>https://random-d.uk/api</li>
                </ul></p>
            </div>

        </main>
    );
};

export default FAQ;