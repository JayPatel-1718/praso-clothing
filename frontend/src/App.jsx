import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // Fix: Use AuthProvider
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AccountSettings from './pages/AccountSettings';
import ToastContainer from './components/ToastContainer';
import StyleQuiz from './pages/StyleQuiz'; // ✅ CORRECT
import ProductDetail from './pages/ProductDetail';
import CustomDesign from './pages/CustomDesign'; // Ensure this is imported
import './App.css';

function App() {
  return (
    
    <AuthProvider>
      <CartProvider>
        <Routes>

        <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/rewards" element={<h1>Rewards Page (Coming Soon)</h1>} />
          <Route path="/quiz" element={<StyleQuiz />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route path="/custom-design" element={<CustomDesign />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;