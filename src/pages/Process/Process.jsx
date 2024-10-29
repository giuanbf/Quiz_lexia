import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/QuestionBox/QuestionBox.css';
import quizContext from '../../context/quizContext';
import ReactMarkdown from 'react-markdown';

const Process = ({ onComplete }) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);
    const context = useContext(quizContext);
    const { Data } = context;
    const [content, setContent] = useState(Data ? Data.process_text : "Carregando...");

    useEffect(() => {
        if (Data) {
            setContent(Data.process_text);
        }
    }, [Data]);


    const handleComplete = useCallback(() => {
        onComplete();
        navigate('/quiz1');
    }, [onComplete, navigate]);


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(myInterval);
                handleComplete();
            }
        }, 1000);

        return () => clearInterval(myInterval);
    }, [timer, handleComplete]);

    return (
        <>
        <div className="q-box mx-auto my-5 p-4 text-center">
            <div className="q-box_head">
                <div className="q-box_timer">{timer}s</div>
            </div>
            <div className="q-box_content">
                {content && <ReactMarkdown>{content}</ReactMarkdown>}
            </div>
        </div>
        </>
    );
}

export default Process;
