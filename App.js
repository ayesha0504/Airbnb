import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Property from './components/Property';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import property from './property.json';

function App() {
/*  const [property,setProperty] = useState([]);
  useEffect(()=>{
    fetch('/property.json')
    .then(response => response.json())
    .then((property)=>{
      setProperty(property);})
    .catch((err)=>console.error(err))
  });*/
  return (
    <div className="App">
      <Header />
      <Property property={property} />
      <Footer />
    </div>
  );
}

export default App;
