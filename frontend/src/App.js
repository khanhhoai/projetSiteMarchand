import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Product } from "./pages/shop/product";
import { Login } from "./pages/login/login";
import { SignUp } from "./pages/signup/signup";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/cart/checkout";
import { Footer } from "./components/footer";
import { ShopContextProvider } from "./context/shop-context";
import { Profile } from "./pages/login/profile";
import { ManageUsers } from "./pages/admin/manage-users";
import { ManageProducts } from "./pages/admin/manage-products";
import { MyOrders } from "./pages/cart/myOrders";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/manage-products" element={<ManageProducts />} />
                <Route path="/my-orders" element={<MyOrders />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
