import {BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '@/pages/home';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import Navbar from "@/pages/navbar";
import TeamPage from "@/pages/team";
import MemePage from '@/pages/memes';
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/memes" element={<MemePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
