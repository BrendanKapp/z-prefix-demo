//import logo from './logo.svg';
//import './App.css';
//import Login from './Login.js';
//import './Login.css';

//function App() {
  //return (
    //<div className="App">
      //<Login></Login>  
    //</div>
  //);
//}

//export default App;
//
//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ItemForm from './components/private/ItemForm';
import PrivateRoute from './components/PrivateRoute';
import Inventory from './components/private/Inventory';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add-item" element={<PrivateRoute element={<ItemForm />} />} />
        <Route path="/edit-item/:id" element={<PrivateRoute element={<ItemDetail />} />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;

