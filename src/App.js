import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Index/index";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
