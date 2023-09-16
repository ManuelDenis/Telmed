import './App.css';
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./Components/Homepage";
import 'bootstrap/dist/css/bootstrap.css';
import Register from "./Register/Register";
import ConfirmationSent from "./Register/ConfirmationSent";
import Navbars from "./Components/Navbar";
import Login from "./Login/Login";
import PasswordReset from "./Register/PasswordReset";
import ResetPasswordPage from "./Register/ResetPasswordPage";
import PasswordResetConfirmation from "./Register/PasswordResetConfirmation";
import PasswordResetLinkConfirmation from "./Register/PasswordResetLinkConfirmation";
import Category from "./Medical/Category";
import Question from "./Medical/Question";
import Profiles from "./Medical/ProfileMed";
import ProfileMEdList from "./Medical/ProfileMEdList";
import ProfileMEdRegister from "./Medical/ProfileMEdRegister";
import ProfileMedUpdate from "./Medical/ProfileMedUpdate";
import ProfileMed from "./Medical/ProfileMed";
import QuestionCreate from "./Medical/QuestionCreate";

function App() {
  return (
    <Container className='text-light'>
        <Row className="justify-content-md-center p-1">
            <Navbars />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/ProfileMedList" element={<ProfileMEdList/>} />
        <Route path="/ProfileMed" element={<ProfileMed/>} />
        <Route path="/ProfileMedRegister" element={<ProfileMEdRegister/>} />
        <Route path="/ProfileMedUpdate" element={<ProfileMedUpdate/>} />
        <Route path="/Category" element={<Category/>} />
        <Route path="/Question" element={<Question/>} />
        <Route path="/QuestionCreate" element={<QuestionCreate/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/ConfirmationSent" element={<ConfirmationSent/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PasswordReset" element={<PasswordReset/>} />
        <Route path="/Reset-password/:user_id/:token" element={<ResetPasswordPage/>} />
        <Route path="/PasswordResetConfirmation" element={<PasswordResetConfirmation/>} />
        <Route path="/PasswordResetLinkConfirmation" element={<PasswordResetLinkConfirmation />} />
      </Routes>
      </BrowserRouter>
        </Row>
    </Container>
  );
}

export default App;
