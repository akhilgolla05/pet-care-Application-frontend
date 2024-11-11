import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home";
import BackgoundImageSlider from "./components/common/BackgoundImageSlider";
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import VeterinarianListing from "./components/veterinarians/VeterinarianListing";
import BookAppointment from "./components/appointment/BookAppointment";
import Veterinarian from "./components/veterinarians/Veterinarian";
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/doctors" element={<VeterinarianListing/>}/>
      <Route path="/book-appointment/:recipientId/new-appointment" element={<BookAppointment/>}/>
      <Route path="/veterinarian/:vetId/veterinarian" element={<Veterinarian/>}/>
    </Route>
  ))
  return (
    <main className="">
      <RouterProvider router={router}/>
      {/* <BackgoundImageSlider>
        <div className="text-info">Welcome Here</div>
        <Home />
      </BackgoundImageSlider> */}
    </main>
  );
}

export default App;
