import { Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import Collection from "./Pages/Collection.jsx"
import Cart from "./Pages/Cart.jsx"
import Order from "./Pages/Order.jsx"
import Contact from "./Pages/Contact.jsx"
import About from "./Pages/About.jsx"
import PlaceOrder from "./Pages/PlaceOrder.jsx"
import Product from "./Pages/Product.jsx"
import Navbar from "./Components/Navbar.jsx"
import Login from './Pages/Login.jsx'
import Footer from './Components/Footer.jsx'
import SearchBar from './Components/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4  sm:px-[5vw] md:px-[7vw] lg-px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/order' element={<Order />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/place-order' element={<PlaceOrder />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App

