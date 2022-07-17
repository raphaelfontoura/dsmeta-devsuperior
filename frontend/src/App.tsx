import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import SalesCard from './components/SalesCard';

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <section id="sales">
          <div className="dsmeta-container">
            <SalesCard />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
