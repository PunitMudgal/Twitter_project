import logo from "./assets/forever.png";
import logo2 from "./assets/forever.svg";

function App() {
  return (
    <div className="App bg-slate-950">
      <img className="h-64 invert" src={logo} alt="na mila" />
      <h2 className="text-violet-600 font-bold">below is svg above is png</h2>
      <img className="h-52 invert " src={logo2} alt="na mila" />
    </div>
  );
}

export default App;
