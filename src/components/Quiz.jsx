import React, { useEffect, useState } from 'react';
import '../styles/Quiz.css'

const Quiz = () => {
  const [styles, setStyles] = useState([]);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Récupération des styles depuis l'API
    const fetchStyles = async () => {
      try {
        const response = await fetch('https://ilias-imdbeer.torvalds.be/styles');
        const data = await response.json();
        setStyles(data);
      } catch (error) {
        console.error('Error fetching beer styles:', error);
      }
    };

    fetchStyles();
  }, []);

  const generateQuestion = () => {
    if (styles.length < 4) return; // Vérification qu'il y a assez de données pour générer une question

    // Sélectionner 4 styles de manière aléatoire
    const randomStyles = [...styles].sort(() => 0.5 - Math.random()).slice(0, 4);

    // Choisir un style au hasard parmi les 4 pour la question
    const correctStyle = randomStyles[Math.floor(Math.random() * 4)];

    setQuestion({
      overallimpression: correctStyle.overallimpression,
      options: randomStyles.map(style => style.name),
      correctAnswer: correctStyle.name,
    });

    setFeedback(''); // Réinitialiser le feedback
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === question.correctAnswer) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again!');
    }

    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
      generateQuestion();
    }, 1000);
  };

  return (
    <div className='quiz'>
      <h1>Beer Style Quiz</h1>
      {question ? (
        <div>
            <h2><strong>Overall Impression</strong></h2>
          <p>{question.overallimpression}</p>
          <ul className='options-list'>
            {question.options.map(option => (
              <li key={option}>
                <button className='qbtn' onClick={() => handleAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
          {feedback && <p>{feedback}</p>}
        </div>
      ) : (
        <div className='start'>
          <p >Click the button below to start the quiz!</p>
          <button className='sbtn' onClick={generateQuestion}>Start Quiz</button>
        </div>
      )}
    </div>
  );
}

export default Quiz