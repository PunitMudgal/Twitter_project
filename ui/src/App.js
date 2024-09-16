import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectRoutes from "./helper/ProtectRoutes";
import Register from "./authentication/Register";
import Home from "./pages/Home";
import SignIn from "./authentication/SignIn";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication Elem={Register} />} />
          <Route path="/signin" element={<Authentication Elem={SignIn} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
