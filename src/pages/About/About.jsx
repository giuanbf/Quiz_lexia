import { Avatar, Box, chakra, Flex, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
// import logo from './../../Assets/logo.png';
import lexiaLogo from './../../Assets/Artboard 2@2x.png';

const testimonials = [
    {
        content:
            'This quiz web app is built using React JS. It can allow the user to select the criteria for their quiz from a list of options. The user can then proceed to answer the questions in the quiz and their performance will be tracked and shown in the scoreboard. Moreover, the app can be designed to be responsive and user-friendly.',
        avatar: lexiaLogo,
    }
];

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 2em auto;
  padding: 0.25em 1em;
  width: 7em;
`;

function TestimonialCard(props) {
    const { content, avatar } = props;
    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'xl'}
            p={10}
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('white', 'gray.800')}
            _after={{
                content: '""',
                position: 'absolute',
                height: '80px', // Ajuste o tamanho conforme necessário
                width: '80px',
                left: '35px',
                top: '-10px',
                backgroundSize: 'contain',
                backgroundImage: `url(${lexiaLogo})`,
                backgroundRepeat: 'no-repeat',
            }}
            _before={{
                content: '""',
                position: 'absolute',
                zIndex: '-1',
                height: 'full',
                maxW: '640px',
                width: 'full',
                filter: 'blur(40px)',
                transform: 'scale(0.98)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                top: 0,
                left: 0,
            }}>
            <Flex direction={'column'} textAlign={'left'} justifyContent={'space-between'}>
                <chakra.p color={'gray.700'} fontFamily={'Inter'} fontWeight={'medium'} fontSize={'15px'} pb={4}>
                    {content}
                </chakra.p>
            </Flex>
            <Avatar src={avatar} height={'80px'} width={'80px'} alignSelf={'center'} m={{ base: '0 0 35px 0', md: '0 0 0 50px' }} />
        </Flex>
    );
}

export default function About() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/about');
    }

    return (
        <Flex textAlign={'center'} pt={10} justifyContent={'center'} direction={'column'} width={'full'}>
            <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                <chakra.h1
                    py={5}
                    fontSize={48}
                    fontFamily={'Work Sans'}
                    fontWeight={'bold'}
                    color={useColorModeValue('gray.300', 'gray.50')}>
                    Lexia Digital
                </chakra.h1>
            </Box>
            <SimpleGrid columns={{ base: 1, xl: 1 }} spacing={'20'} mt={16} mx={'auto'}>
                {testimonials.map((cardInfo, index) => (
                    <TestimonialCard {...cardInfo} key={index} index={index} />
                ))}
            </SimpleGrid>
            <Button onClick={handleSubmit}>Próximo</Button>
        </Flex>
    );
}
