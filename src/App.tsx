import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}

export default App
