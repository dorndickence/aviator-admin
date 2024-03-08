import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";

import Header from "./Components/Pages/Header";
import Footer from "./Components/Pages/Footer";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Account from "./Components/Pages/Account";
import Players from "./Components/Pages/Players";
import Contact from "./Components/Pages/Contact";
import Cookies from "js-cookie";
import Withdraw from "./Components/Pages/Withdraw";
import WithdrawPartner from "./Components/Pages/WithdrawPartner";

import Logout from "./Components/Pages/Logout";
import Logout2 from "./Components/Pages/Logout2";
import Password from "./Components/Pages/Password";

function App() {
  const currentPath = window.location.pathname;

  return (
    <BrowserRouter>
      {currentPath !== "/logout" && <Header />}
      <Routes>
        <Route index element={<Home />} />
        {Cookies.get("token") ? (
          <>
            <Route path="logout" element={<Logout />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="withdraw-partner" element={<WithdrawPartner />} />

            <Route path="account" element={<Account />} />
            <Route path="players" element={<Players />} />
          </>
        ) : (
          <>
            <Route path="logout" element={<Logout2 />} />
            <Route path="login" element={<Login />} />
            <Route path="password-recovery" element={<Password />} />
            <Route path="register" element={<Register />} />
          </>
        )}

        {/* <Route path="*" element={<NoPage />} /> */}
        <Route path="contact" element={<Contact />} />
      </Routes>
      {currentPath !== "/logout" && <Footer />}
    </BrowserRouter>
  );
}

export default App;
