import React, { useContext, useEffect } from 'react';
import quizContext from '../../context/quizContext';
import { Chart } from 'react-google-charts';
import {
    Box,
    Heading,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    SimpleGrid,
    Center,
    Button,
} from '@chakra-ui/react';
import Data from "../../Data/data.json";
import { saveQuizData } from "../../storageService";
import lexiaLogo from './../../Assets/LEXia_LOGO.svg';

const Results = () => {
    const context = useContext(quizContext);
    const { score, score2, userData } = context;

    const quiz1Score = score;
    const quiz2Score = score2;

    const quiz1Total = Object.keys(Data.process_text_questions.questions).length;
    const quiz2Total = Object.keys(Data.process_summary_questions.questions).length;

    const percentageScoreQ1 = (quiz1Score.rightAnswers * 100 / quiz1Total).toFixed(2);
    const percentageScoreQ2 = (quiz2Score.rightAnswers * 100 / quiz2Total).toFixed(2);
    const best = percentageScoreQ2 >= percentageScoreQ1 ? 'lexia' : 'process';

    let scoreMessageQ1 = "";
    if (percentageScoreQ1 >= 90) {
        scoreMessageQ1 = "Excelente!";
    } else if (percentageScoreQ1 >= 70) {
        scoreMessageQ1 = "Bom!";
    } else if (percentageScoreQ1 >= 50) {
        scoreMessageQ1 = "Regular";
    } else {
        scoreMessageQ1 = "Nada bem.";
    }

    let scoreMessageQ2 = "";
    if (percentageScoreQ2 >= 90) {
        scoreMessageQ2 = "Excelente!";
    } else if (percentageScoreQ2 >= 70) {
        scoreMessageQ2 = "Bom!";
    } else if (percentageScoreQ2 >= 50) {
        scoreMessageQ2 = "Regular";
    } else {
        scoreMessageQ2 = "Nada bem.";
    }

    let errorQuiz1 = quiz1Total - quiz1Score.rightAnswers;
    let errorQuiz2 = quiz2Total - quiz2Score.rightAnswers;

    const chartData = [
        ['Processo', 'Score'],
        ['Acerto', quiz1Score.rightAnswers],
        ['Erro', errorQuiz1],
    ];

    const chartData2 = [
        ['Lexia', 'Score'],
        ['Acerto', quiz2Score.rightAnswers],
        ['Erro', errorQuiz2],
    ];

    const chartOptions = {
        title: 'Processo',
        is3D: true,
        pieSliceText: 'percentage',
        legend: { position: 'center' },
    };

    const chartOptions2 = {
        title: 'Lexia',
        is3D: true,
        pieSliceText: 'percentage',
        legend: { position: 'center' },
    };

    useEffect(() => {
        saveQuizData(userData, score, score2);
    }, [userData, score, score2]);

    return (
        <Center h="100vh">
            <Box
                p={5}
                maxWidth="600px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg="purple.500"
                color="white"
                m={0}
            >
                <img src={lexiaLogo} alt="Lexia_logo" />
                <Heading as="h2" size="xl" mb={4} ml={12} >Sua Pontuação</Heading>

                <div style={{display: 'flex'}}>
                    <div style={{ border: best === 'process' ? '1.5px solid rgb(255, 0, 255)' : 'none', marginBottom: '30px', padding: '15px', borderRadius: '15px', boxShadow:  best === 'process' ? '2px 1px 2.5px rgb(255, 0, 255)' : 'none'}}>
                        <Text mb={1} color={'white'} fontWeight="bold" fontSize="3xl">
                            Processo
                        </Text>

                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            {percentageScoreQ1} %
                        </Text>
                        <Text mb={1} color={percentageScoreQ1 >= 50 ? 'white' : 'yellow'}>
                            {scoreMessageQ1}
                        </Text>
                    </div>
                    <div style={{marginLeft: '30px', border: best === 'lexia' ? '1.5px solid rgb(255, 0, 255)' : 'none', marginBottom: '30px', padding: '15px', borderRadius: '15px', boxShadow:  best === 'lexia' ? '2px 1px 2.5px rgb(255, 0, 255)' : 'none'}}>
                        <Text mb={1} color={'white'} fontWeight="bold" fontSize="3xl">
                            Lexia
                        </Text>

                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            {percentageScoreQ2} %
                        </Text>
                        <Text mb={1} color={percentageScoreQ2 >= 50 ? 'white' : 'yellow'}>
                            {scoreMessageQ2}
                        </Text>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={chartOptions}
                        width={'200px'}
                        height={'150px'}
                    />

                    <Chart
                        chartType="PieChart"
                        data={chartData2}
                        options={chartOptions2}
                        width={'200px'}
                        height={'150px'}
                    />
                </div>

                <SimpleGrid columns={2} spacing={4} mt={6}>
                    <Stat>
                        <StatLabel>Acertos Processo</StatLabel>
                        <StatNumber>{quiz1Score.rightAnswers}</StatNumber>
                        <StatHelpText>entre {quiz1Total} perguntas</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Acertos com Lexia</StatLabel>
                        <StatNumber>{quiz2Score.rightAnswers}</StatNumber>
                        <StatHelpText>entre {quiz2Total} perguntas</StatHelpText>
                    </Stat>
                </SimpleGrid>


                <SimpleGrid columns={4} spacing={4} mt={6}>
                    <a href="/">
                        <Button colorScheme="purple" mt={4}>Início</Button>
                    </a>
                </SimpleGrid>

            </Box>
        </Center>
    );
};

export default Results;