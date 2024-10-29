// QuizState.js
import { useState, useCallback } from "react";
import QuizContext from "./quizContext";
import Data from "../Data/data.json";

const QuizState = (props) => {
    const [score, setScore] = useState({ rightAnswers: 0, wrongAnswers: 0 });
    const [score2, setScore2] = useState({ rightAnswers: 0, wrongAnswers: 0 });
    const [userData, setUserData] = useState({});

    const updateScore = useCallback((update) => {
        setScore(prevScore => ({
            ...prevScore,
            rightAnswers: (prevScore.rightAnswers || 0) + (update.rightAnswers || 0),
            wrongAnswers: (prevScore.wrongAnswers || 0) + (update.wrongAnswers || 0),

        }));
    }, []);

    const updateScore2 = useCallback((update) => {
        setScore2(prevScore2 => ({
            ...prevScore2,
            rightAnswers: (prevScore2.rightAnswers || 0) + (update.rightAnswers || 0),
            wrongAnswers: (prevScore2.wrongAnswers || 0) + (update.wrongAnswers || 0),
        }));
    }, []);

    return (
        <QuizContext.Provider value={{ Data, score, score2, updateScore, updateScore2, userData, setUserData }}>
            {props.children}
        </QuizContext.Provider>
    );
};

export default QuizState;