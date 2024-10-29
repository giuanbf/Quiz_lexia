import Form from '../../components/Form/Form'
import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useCallback } from 'react';
import quizContext from '../../context/quizContext';


const Home = () => {
    const navigate = useNavigate();
    const context = useContext(quizContext);
    const { setUserData } = context;
    const [userData, setLocalUserData] = useState({}); 

    const handleChange = useCallback((e) => {
        setLocalUserData(prevUserData => ({...prevUserData, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setUserData(userData) 
        navigate('/roles');
    }, [userData, setUserData, navigate]);

    return (
        <div className="container my-3">
            <Text mb={'4'} fontSize='4xl'>Identificação</Text>
            <hr />
            <Form handleSubmit={handleSubmit} onChange={handleChange} />
        </div>
    );
}

export default Home;