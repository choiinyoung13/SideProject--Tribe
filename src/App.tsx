import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
import useLocalStorageFilter from "./hooks/useLocalStorageFilter";

function App() {
  useLocalStorageFilter();

  return (
    <BrowserRouter>
      <Nav />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
