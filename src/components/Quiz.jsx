import React, { useEffect, useState } from 'react';

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
    }, 2000);
  };

  return (
    <div>
      <h2>Beer Style Quiz</h2>
      {question ? (
        <div>
          <p><strong>Overall Impression:</strong> {question.overallimpression}</p>
          <ul>
            {question.options.map(option => (
              <li key={option}>
                <button onClick={() => handleAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
          {feedback && <p>{feedback}</p>}
        </div>
      ) : (
        <div>
          <p>Click the button below to start the quiz!</p>
          <button onClick={generateQuestion}>Start Quiz</button>
        </div>
      )}
    </div>
  );
}

export default Quiz