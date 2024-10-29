// Quiz2.jsx
import React, { useCallback } from 'react';
import QuizArea from '../QuizArea/QuizArea';
import { useNavigate } from 'react-router-dom';

const Quiz2 = ({ questions, onQuizComplete }) => {
    const navigate = useNavigate();

    const handleQuiz2Complete = useCallback(() => {
        onQuizComplete();
        navigate('/results');

    }, [navigate, onQuizComplete]);

    return (
        <QuizArea
            questions={questions}
            onQuizComplete={handleQuiz2Complete}
            quizType="summary"
        />
    );
};

export default Quiz2;