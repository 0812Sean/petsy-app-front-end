import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from './services/authService'; // Corrected import path
import Marketplace from './components/Marketplace/Marketplace';
import ListingDetails from './components/ListingDetails/ListingDetails';
import ListingForm from './components/ListingForm/ListingForm';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // Initialize user state using authService

  const handleSignout = () => {
    authService.signout(); // Call signout method from authService
    setUser(null); // Clear user state
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? <Route path="/" element={<Dashboard user={user} />} /> : <Route path="/" element={<Landing />} />}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route path="/new" element={<ListingForm />} />
          <Route path="/update/:listingId" element={<ListingForm />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
