 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 import { AuthProvider } from "./context/AuthContext";
 import ProtectedRoute from "./components/ProtectedRoute";
 import TermsGate from "./components/TermsGate";
 import PaystackReturn from "./components/PaystackReturn";
 import ScrollToTop from "./components/ScrollToTop";
 import Home from "./pages/Home";
 import Login from "./pages/Login";
 import CreateAccount from "./pages/CreateAccount";
 import RegisterSuccess from "./pages/RegisterSuccess";
 import OurStory from "./pages/OurStory";
 import PredictionHistory from "./pages/PredictionHistory";
 import Forum from "./pages/Forum";
 import ForumTopic from "./pages/ForumTopic";
 import Terms from "./pages/Terms";
 import Dashboard from "./pages/Dashboard";
 import Games from "./pages/Games";
 import Subscriptions from "./pages/Subscriptions";
 import PredictionViewer from "./pages/PredictionViewer";
 
 const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;
 
 export default function App() {
   return (
     <BrowserRouter>
       <AuthProvider>
         <ScrollToTop />
         <PaystackReturn />
         <TermsGate />
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/create-account" element={<CreateAccount />} />
           <Route path="/register-success" element={<RegisterSuccess />} />
           <Route path="/our-story" element={<OurStory />} />
           <Route path="/prediction-history" element={<PredictionHistory />} />
           <Route path="/forum" element={<Forum />} />
           <Route path="/forum/:topicId" element={<ForumTopic />} />
           <Route path="/terms" element={<Terms />} />
           <Route path="/dashboard" element={guard(<Dashboard />)} />
           <Route path="/games" element={guard(<Games />)} />
           <Route path="/subscriptions" element={guard(<Subscriptions />)} />
           <Route path="/prediction/:gameId" element={guard(<PredictionViewer />)} />
           <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
       </AuthProvider>
     </BrowserRouter>
   );
 }
 