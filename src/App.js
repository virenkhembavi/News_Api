// import logo from './logo.svg';
// import './App.css';

import Api from "./Component/Api";
import Navbar from "./Component/Navbar";
import styled from 'styled-components'


function App() {
  return (
    <Container >
      <Navbar />
      <Api />
    </Container>
  );
}

export default App;

const Container = styled.div`
margin:0px;
padding: 0px;
background: lightgray;
height: 100vh;
`