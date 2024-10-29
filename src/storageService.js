// storageService.js
const saveQuizData = (userData, quiz1Score, quiz2Score) => {
    try {
        const dataToStore = {
            userData,
            quiz1: quiz1Score,
            quiz2: quiz2Score,
            timestamp: new Date().toISOString(),
        };

        localStorage.setItem('quizData', JSON.stringify(dataToStore));
        console.log("Dados do quiz salvos no localStorage:", dataToStore);
    } catch (error) {
        console.error("Erro ao salvar dados no localStorage:", error);
    }
};

const getQuizData = () => {
    try {
        const storedData = localStorage.getItem('quizData');
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error("Erro ao obter dados do localStorage:", error);
        return null;
    }
};

const clearQuizData = () => {
    localStorage.removeItem('quizData');
};


export { saveQuizData, getQuizData, clearQuizData }