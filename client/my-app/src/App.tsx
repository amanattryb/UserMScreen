import React from 'react';
import MyForm from './components/MyForm';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Get from './components/Get';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<MyForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/ret" element={<Get />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
