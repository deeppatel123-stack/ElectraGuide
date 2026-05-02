import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import Timeline from './pages/Timeline';
import EligibilityChecker from './pages/EligibilityChecker';
import SmartAssistant from './pages/SmartAssistant';
import SentimentDashboard from './pages/SentimentDashboard';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/eligibility" element={<EligibilityChecker />} />
          <Route path="/assistant" element={<SmartAssistant />} />
          <Route path="/dashboard" element={<SentimentDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
