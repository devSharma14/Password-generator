import PasswordPage from "./components/passwordPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { Route , Routes } from "react-router-dom";

function App() {
  return(
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/generatepassword" element={<PasswordPage/>} />
      </Routes>
    </div>
  );
}

export default App;
