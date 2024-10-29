import React, { useCallback } from 'react';
import QuizArea from '../QuizArea/QuizArea';
import { useNavigate } from 'react-router-dom';

const Quiz1 = ({ questions, onQuizComplete }) => {
    const navigate = useNavigate();

    const handleQuiz1Complete = useCallback(() => {
        onQuizComplete();
        navigate('/summary');
    }, [onQuizComplete, navigate]);

    return (
        <QuizArea
            questions={questions}
            onQuizComplete={handleQuiz1Complete}
            quizType="initial"
        />
    );
};

export default Quiz1;