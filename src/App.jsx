import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StylePage from './pages/StylePage';
import CategoriesPage from './pages/CategoriesPage';
import QuizPage from './pages/QuizPage';
import CategoryStylesPage from './pages/CategoryStylesPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path='/style/:id' element={ <StylePage />}/>
          <Route path="/categories" element={ <CategoriesPage /> } />
          <Route path='/quiz' element={ <QuizPage />}/>
          <Route path="/styles/:category" element={<CategoryStylesPage />} />
        </Routes>
      </Router>
  )
}

export default App