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
import InfractionHome from './Pages/InfractionHome';
import InfractionDetail from './components/InfractionDetail';
import InfractionCreate from './Pages/InfractionCreate';
import InfractionUpdate from './Pages/InfractionUpdate';
import VehicleHome from './Pages/VehicleHome';
import VehicleDetail from './components/VehiclesDetail';
import VehicleCreate from './Pages/VehicleCreate';
import VehicleUpdate from './Pages/VehicleUpdate';
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
                <Route path="/infractions" element={<InfractionHome />} />
                <Route path="/infractions/:id" element={<InfractionDetail />} />
                <Route path="/create-infraction" element={<InfractionCreate />} />
                <Route path="/update-infraction/:id" element={<InfractionUpdate />} /> 
                <Route path="/vehicles" element={<VehicleHome />} />
                <Route path="/vehicles/:id" element={<VehicleDetail />} />
                <Route path="/create-vehicle" element={<VehicleCreate />} />
                <Route path="/update-vehicle/:id" element={<VehicleUpdate />} /> 
            </Routes>
        </Router>
    );
}

export default App;
