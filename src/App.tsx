import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
