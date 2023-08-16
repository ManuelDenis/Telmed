import './App.css';
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./Components/Homepage";
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from "./Components/Dashboard";
import Register from "./Register/Register";
import ConfirmationSent from "./Register/ConfirmationSent";
import Navbars from "./Components/Navbar";
import Login from "./Login/Login";

function App() {
  return (
    <Container className='text-light'>
        <Row className="justify-content-md-center p-5">
        <h5 className="pb-5">Django rest-framework knox React Auth-Application</h5>
            <Navbars />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/ConfirmationSent" element={<ConfirmationSent/>} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      </BrowserRouter>
        </Row>
    </Container>
  );
}

export default App;
