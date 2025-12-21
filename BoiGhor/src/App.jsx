import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
