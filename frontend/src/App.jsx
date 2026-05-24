import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import EditorPage from "./pages/EditorPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";


function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users/:username" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;