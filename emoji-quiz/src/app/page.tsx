'use client';
import React, { useState } from 'react';
import questions from './data/questions.json';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function Home() {
  const quizQuestions: Question[] = questions;
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleAnswer = (option: string) => {
    if (selected) return; // förhindra spam
    setSelected(option);

    const isCorrect = option === quizQuestions[current].answer;
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      const next = current + 1;
      if (next < quizQuestions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🎉 Emoji Quiz 🎉</h1>

      {showScore ? (
        <div>
          <h2>Du fick {score} av {quizQuestions.length} rätt!</h2>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: '3rem' }}>{quizQuestions[current].question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            {quizQuestions[current].options.map((option) => {
              const isCorrect = option === quizQuestions[current].answer;
              const isSelected = option === selected;

              let backgroundColor = '';
              if (selected) {
                if (isSelected && isCorrect) backgroundColor = '#c8e6c9'; // grön
                else if (isSelected && !isCorrect) backgroundColor = '#ffcdd2'; // röd
                else backgroundColor = '#eee'; // andra svar
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selected}
                  style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    cursor: selected ? 'default' : 'pointer',
                    backgroundColor,
                    transition: 'background-color 0.3s',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
