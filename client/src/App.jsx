import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import "./app.scss"

function App() {
  return (
    <div className="App">
       <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;
