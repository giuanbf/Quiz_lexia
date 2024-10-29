import './App.css';
import NavBar from './components/NavBar/NavBar';
import QuizState from './context/QuizState';
import Home from './pages/Home/Home';
import Roles from './pages/Roles/Roles';
import Process from './pages/Process/Process';
import { Routes, Route, useNavigate } from "react-router-dom";
import About from './pages/About/About';
import Results from './pages/Results/Results';
import Summary from './pages/Summary/Summary';
import Quiz1 from './pages/Quiz1/Quiz1'; 
import Quiz2 from './pages/Quiz2/Quiz2';
import Data from "./Data/data.json";
import { useState, useCallback } from 'react';

function App() {
    const navigate = useNavigate();
    const [quizStage, setQuizStage] = useState('process');
console.log(quizStage)

    const handleQuiz1Complete = () => {
        setQuizStage('summary');
        navigate('/summary');
    };

    const handleSummaryComplete = useCallback(() => {
      setQuizStage('quiz2');
      navigate('/quiz2');
  }, [navigate]);

    const handleQuiz2Complete = () => {
        setQuizStage('results');
        navigate('/results');
    };

    return (
    <>
      <QuizState>
        <div className="App">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<About />} />
            <Route exact path="/about" element={<Home />} />
            <Route path="/quiz_lexia" element={<Home />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/process" element={<Process onComplete={() => {
                  setQuizStage('quiz1');
                  navigate('/quiz1');
              }} />} 
            />
            <Route path="/summary" element={<Summary onComplete={handleSummaryComplete} />} />
            <Route path="/quiz1" element={<Quiz1 questions={Data.process_text_questions.questions} onQuizComplete={handleQuiz1Complete} quizType="initial" />} /> {/* Nova rota para Quiz1 */}
            <Route path="/quiz2" element={<Quiz2 questions={Data.process_summary_questions.questions} onQuizComplete={handleQuiz2Complete} quizType="summary" />} /> {/* Nova rota para Quiz2 */}
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </QuizState>
    </>
  );
}

export default App;
