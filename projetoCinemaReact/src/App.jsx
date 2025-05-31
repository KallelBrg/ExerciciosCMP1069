import Navbar from "./components/navbar/Navbar"
import './App.css'
import AppRoutes from "./routes/AppRoutes"

export default function App() {

  return (
    <>
      <Navbar></Navbar>
      <AppRoutes/>
    </>
  );
}