import React, { useEffect, useState, useCallback, useRef } from 'react';
import './QuestionBox.css';
import { Badge, Button } from '@chakra-ui/react';
import clickAudio from './../../Assets/select-sound.mp3';
import { useNavigate } from 'react-router-dom';

const audio = new Audio(clickAudio);

const QuestionBox = ({
    question,
    options,
    correctAnswer,
    onAnswerClick,
    selectedAnswer,
    onNextClick,
    showNextButton,
    category,
    currentQuestion,
    totalQuestions,
    quizType
}) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);
    const timerIntervalRef = useRef(null);


    const handleNextClick = useCallback(() => {
        onNextClick();
    }, [onNextClick]);


    useEffect(() => {
        setTimer(5);

        timerIntervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                const newTimer = prevTimer - 1;

                if (newTimer <= 0) {
                    clearInterval(timerIntervalRef.current);

                    if (currentQuestion + 1 === totalQuestions) {
                        if (quizType === 'initial') {
                            navigate('/summary');
                        } else if (quizType === 'summary') {
                            navigate('/results');
                        }
                    } else {
                        handleNextClick();
                    }
                }
                return newTimer;
            });
        }, 1000);

        return () => clearInterval(timerIntervalRef.current);

    }, [currentQuestion, totalQuestions, navigate, handleNextClick, quizType]);

    const handleOptionClick = useCallback((option) => {
        audio.play();
        onAnswerClick(option); 
    }, [onAnswerClick]);


    return (
        <div className="q-box mx-auto my-5 p-4 text-center">
            <div className="q-box_head">
                <div className="q-box_timer">{timer}s</div>
                <div className="q-question" dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className="q-box_body">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`q-box_options ${selectedAnswer === option ? 'optionSelected' : ''}`}
                        colorScheme={selectedAnswer === option ? (option === correctAnswer ? 'green' : 'red') : 'purple'}
                        isDisabled={selectedAnswer !== null} 
                        width="100%"
                        _hover={selectedAnswer === null ? { bg: 'purple.600' } : {}}
                    >
                        <span className='option-icon'>{String.fromCharCode(65 + index)}</span>
                        <span dangerouslySetInnerHTML={{ __html: option }} />
                    </Button>
                ))}
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center mx-3">
                <Badge colorScheme='purple'>{category}</Badge>
                {showNextButton && (
                    <div>
                        {selectedAnswer === correctAnswer ? (
                            <p style={{ color: 'green' }}>Correto!</p>
                        ) : selectedAnswer !== null ? (
                            <p style={{ color: 'red' }}>Incorreto. A resposta é: {correctAnswer}</p>
                        ) : null}
                        <Button onClick={handleNextClick} colorScheme="blue" m={2}>
                            Próxima
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionBox;