import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import DashboardPage from './Pages/DashBoardPage';
import UserCreate from './Pages/UserCreate';
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
import RolHome from './Pages/RolHome';
import RolDetail from './components/RolDetail';
import RolCreate from './Pages/RolCreate';
import RolUpdate from './Pages/RolUpdate';
import UserTypeHome from './Pages/UserTypeHome';
import UserTypeDetail from './components/UserTypeDetail';
import UserTypeCreate from './Pages/UserTypeCreate';
import UserTypeUpdate from './Pages/UserTypeUpdate';
import './App.css';
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
                <Route path="/roles" element={<RolHome />} />
                <Route path="/roles/:Id" element={<RolDetail />} />
                <Route path="/create-role" element={<RolCreate />} />
                <Route path="/update-role/:id" element={<RolUpdate />} /> 
                <Route path="/usertypes" element={<UserTypeHome />} />
                <Route path="/usertypes/:Id" element={<UserTypeDetail />} />
                <Route path="/create-usertype" element={<UserTypeCreate />} />
                <Route path="/update-usertype/:id" element={<UserTypeUpdate />} /> 
            </Routes>
        </Router>
    );
}

export default App;
