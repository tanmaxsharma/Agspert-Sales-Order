import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './utils/requireAuth';
import Loader from './components/Loader.jsx';
const Header = lazy(() => import('./components/Header.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const SalesOrder = lazy(() => import('./pages/SalesOrder.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/salesorder" element={<SalesOrder />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
