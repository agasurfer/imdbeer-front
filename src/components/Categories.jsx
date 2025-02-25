import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../styles/Categories.css'

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://imdbeer-back.onrender.com/styles');
        const data = await response.json();

        
        const uniqueCategories = [...new Set(data.map(style => style.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='category-hero'>
      <h1>Categories of Styles</h1>
      <ul className='category-list'>
        {categories.map(category => (
          <li key={category}>
           <Link to={`/styles/${encodeURIComponent(category)}`}>{category}</Link>
           </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
