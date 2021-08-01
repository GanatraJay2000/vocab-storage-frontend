import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    let history = useHistory();
    history.push({ pathname: `/words` });
    return (<>Home</>);
}

export default Home;