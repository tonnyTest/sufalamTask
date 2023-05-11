import "./App.css";
import ManagerDashboard from "./Components/dashboard/ManagerDashboard";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ManagerDashboard />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
