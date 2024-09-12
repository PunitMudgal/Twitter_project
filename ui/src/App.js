import logo from "./assets/forever.png";
import logo2 from "./assets/forever.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectRoutes from "./helper/ProtectRoutes";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
