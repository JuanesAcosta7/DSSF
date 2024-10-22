import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverHome from './Pages/DriverHome';
import DriverDetail from './components/DriverDetail';
import DriverCreate from './Pages/DriverCreate';
import DriverUpdate from './Pages/DriverUpdate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DriverHome />} />
                <Route path="/drivers/:id" element={<DriverDetail />} />
                <Route path="/create-driver" element={<DriverCreate />} />
                <Route path="/update-driver/:id" element={<DriverUpdate />} /> 
            </Routes>
        </Router>
    );
}

export default App;
