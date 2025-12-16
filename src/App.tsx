import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home';
import About from './about';
import FAQ from './faq';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

