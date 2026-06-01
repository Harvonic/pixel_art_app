import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import EditorPage from "./pages/EditorPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/users/:username" element={<ProfilePage />} />

        <Route path="/" element={
          <GuestRoute>
            <HomePage />
          </GuestRoute>
        } />

        <Route path="/login" element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        } />

        <Route path="/register" element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        } />

        <Route path="/feed" element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        } />

        <Route path="/editor" element={
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        } />

        <Route path="/editor/:id" element={
           <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}


export default App;