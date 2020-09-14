import React from 'react';
import './App.css';
import ProductSearch from './pages/ProductSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src="https://static-store.worldticket.com.br/assets/2020801457_1600009032737/omeletestore/image/omeletelogo.svg" alt="Omelete Logo" />
        <p>Calindra Omelete Store Products Search App</p>
      </header>
      <section className="App-body">
        <ProductSearch />
      </section>
    </div>
  );
}

export default App;
