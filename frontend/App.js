
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Property from "./components/Property";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Favourite from "./components/Favourite";
import MyProperty from "./components/MyProperty";
import AddProperty from "./components/AddProperty";
import UpdateProperty from "./components/UpdateProperty";
import RateProperty from "./components/RateProperty";
import ShowRatings from "./components/ShowRatings";
import Reservation from "./components/Reservation";
import MakeReservation from "./components/MakeReservation";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <BrowserRouter>
    <div className="app">
    <Header />
    <Routes>
        <Route exact path="/" element={<Property />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/properties/my" element={<MyProperty />} />
        <Route path="/properties/add" element={<AddProperty />} />
        <Route path="/properties/update/:property_id" element={<UpdateProperty />} />
        <Route path="/rateproperty/:property_id" element={<RateProperty/>}/>
        <Route path="/showrating/:property_id" element={<ShowRatings/>}/>
        <Route path="/reservations" element={<Reservation/>}/>
        <Route path="/makereservation/:property_id" element={<MakeReservation/>}/> 
    </Routes>
    <Footer />
    </div>
  </BrowserRouter>
  );
}

export default App;
