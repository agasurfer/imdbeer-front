import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/CategoryStyles.css'; 

const CategoryStyles = () => {
  const { category } = useParams(); 
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await fetch('https://imdbeer-back.onrender.com/styles');
        const data = await response.json();

        
        const filteredStyles = data.filter(style => style.category === category);
        setStyles(filteredStyles);
      } catch (err) {
        setError('Failed to fetch styles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-styles-page">
      <h1>{category}</h1>
      <ul className="category-styles-list">
        {styles.map(style => (
          <li key={style._id}>
            <Link to={`/styles/${style._id}`}>
              {style.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryStyles;
