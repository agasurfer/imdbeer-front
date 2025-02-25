import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Quiz.css';

const Quiz = () => {
  const [styles, setStyles] = useState([]);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await fetch('https://imdbeer-back.onrender.com/styles');
        const data = await response.json();
        setStyles(data);
      } catch (error) {
        console.error('Error fetching beer styles:', error);
      }
    };

    fetchStyles();
  }, []);

  const generateQuestion = () => {
    if (styles.length < 4) return;

    const randomStyles = [...styles].sort(() => 0.5 - Math.random()).slice(0, 4);
    const correctStyle = randomStyles[Math.floor(Math.random() * 4)];

    setQuestion({
      overallimpression: correctStyle.overallimpression,
      options: randomStyles.map(style => style.name),
      correctAnswer: correctStyle.name,
    });

    setFeedback('');
  };

  //Score and Feedback
  const handleAnswer = (selectedOption) => {
    if (selectedOption === question.correctAnswer) {
      setFeedback('Correct!');
      setScore(score + 1);
      setEmojis([...emojis, '🍺']);
    } else {
      setFeedback('Incorrect!');
      setMistakes(mistakes + 1);
      setEmojis([...emojis, '❌']);
    }
    
    //Timeout and Toastify
    setTimeout(() => {
      if (score + 1 === 10) {
        toast.success('🎉 Victory! You reached 10 correct answers!', {
          position: 'top-center',
        });
        resetQuiz();
      } else if (mistakes + 1 === 5) {
        toast.error('💀 Defeat! You made 5 mistakes.', {
          position: 'top-center',
        });
        resetQuiz();
      } else {
        generateQuestion();
      }
    }, 1500);
  };

  //Reset function
  const resetQuiz = () => {
    setScore(0);
    setMistakes(0);
    setEmojis([]);
    setQuestion(null);
  };

  return (
    <div className='quiz'>
      <h1>Beer Style Quiz</h1>
      <ToastContainer /> 
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
          {feedback && (
            <p id='feedback' className={feedback === 'Correct!' ? 'cfeedback' : 'wfeedback'}>
              {feedback}
            </p>
          )}
          <div className='score-display'>
            <div className='emojis'>{emojis.map((emoji, index) => <span key={index}>{emoji}</span>)}</div>
          </div>
        </div>
      ) : (
        <div className='start'>
          <button className='sbtn' onClick={generateQuestion}>Start Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
