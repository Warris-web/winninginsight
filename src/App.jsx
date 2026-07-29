import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import OurStory from "./pages/OurStory";
import PredictionHistory from "./pages/PredictionHistory";
import Forum from "./pages/Forum";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/prediction-history" element={<PredictionHistory />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </BrowserRouter>
  );
}
