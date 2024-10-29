// Summary.jsx
import React, { useContext, useEffect, useState, useCallback } from 'react';
import '../../components/QuestionBox/QuestionBox.css';
import quizContext from '../../context/quizContext';
import ReactMarkdown from 'react-markdown';

const Summary = ({ onComplete }) => {
    const [timer, setTimer] = useState(10); // Set your desired initial timer value
    const context = useContext(quizContext);
    const { Data } = context;
    const [content, setContent] = useState(Data ? Data.process_summary : "Carregando...");

    useEffect(() => {
        if (Data) {  // Check if Data is available before setting content
            setContent(Data.process_summary);
        }
    }, [Data]);

    const handleComplete = useCallback(() => {
        onComplete();
    }, [onComplete]);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(prevTimer => prevTimer - 1);
            } else {
                clearInterval(myInterval);
                handleComplete(); // Call onComplete when the timer reaches 0
            }
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts or timer changes
        return () => clearInterval(myInterval);
    }, [timer, handleComplete]);

    return (
        <div className="q-box mx-auto my-5 p-4 text-center">
            <div className="q-box_head">
                <div className="q-box_timer">{timer}s</div>
            </div>
            <div className="q-box_content">
                {content && <ReactMarkdown>{content}</ReactMarkdown>}
            </div>
        </div>
    );
};

export default Summary;