import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePageHero.css';

const HomePageHero = () => {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    // Fetch
    fetch('https://ilias-imdbeer.torvalds.be/styles')
      .then((response) => response.json())
      .then((data) => {
        // Descending sort
        const sortedStyles = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setStyles(sortedStyles);
      })
      .catch((error) => console.error('Error fetching styles:', error));
  }, []);

  return (
    <div className="homepage-hero">
      <h1>Beer Styles</h1>
      <ul className="styles-list">
        {styles.map((style) => (
          <li key={style._id}>
            <Link to={`/style/${style._id}`}>{style.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageHero;
