import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./views/auth/Login";
import Profile from "./views/auth/Profile";
import Home from "./views/others/Home";
import CoursePage from "./views/others/Course/CoursePage";
import ProgressIndex from "./views/others/Progress";
import ProgressGeneral from "./views/others/Progress/General";
import ProgressCenter from "./views/others/Progress/Center";

import HEADER from "./assets/img/Header2.png";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <main>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/avances" element={<ProgressIndex />} />
            <Route path="/avances/general" element={<ProgressGeneral />} />
            <Route path="/avances/centro" element={<ProgressCenter />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
