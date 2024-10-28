import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home";
import BackgoundImageSlider from "./components/common/BackgoundImageSlider";
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import VeterinarianListing from "./components/veterinarians/VeterinarianListing";
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/doctors" element={<VeterinarianListing/>}/>
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
