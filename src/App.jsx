import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Automations from './pages/Automations';
import Logs from './pages/Logs';
import Cashflow from './pages/Cashflow';
import Settings from './pages/Settings';
import AiAssistant from './pages/AiAssistant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/cashflow" element={<Cashflow />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai" element={<AiAssistant />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
