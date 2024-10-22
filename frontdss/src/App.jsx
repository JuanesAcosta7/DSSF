import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import DashboardPage from './Pages/DashBoardPage';
import UserCreate from './components/UserCreate';
import UserHome from './Pages/UserHome';
import UserDetail from './components/UserDetail';
import UserUpdate from './Pages/UserUpdate';
import DriverHome from './Pages/DriverHome';
import DriverDetail from './components/DriverDetail';
import DriverCreate from './Pages/DriverCreate';
import DriverUpdate from './Pages/DriverUpdate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/users" element={<UserHome />} />
                <Route path="/create-user" element={<UserCreate />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="/update-user/:id" element={<UserUpdate />} /> 
                <Route path="/drivers" element={<DriverHome />} />
                <Route path="/drivers/:id" element={<DriverDetail />} />
                <Route path="/create-driver" element={<DriverCreate />} />
                <Route path="/update-driver/:id" element={<DriverUpdate />} /> 
            </Routes>
        </Router>
    );
}

export default App;
