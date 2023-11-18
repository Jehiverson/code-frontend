import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./views/auth/Login";
import Profile from "./views/auth/Profile";
import Home from "./views/others/Home";
import CoursePage from "./views/others/Course/CoursePage";

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
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
