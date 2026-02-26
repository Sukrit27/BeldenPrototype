import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import OperationsDashboard from './pages/OperationsDashboard'
import SustainabilityDashboard from './pages/SustainabilityDashboard'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/operations" replace />} />
                <Route path="/operations" element={<OperationsDashboard />} />
                <Route path="/sustainability" element={<SustainabilityDashboard />} />
            </Route>
        </Routes>
    )
}

export default App
