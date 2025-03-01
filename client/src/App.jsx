import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Log from "./components/Logo";
import PrivateRoute from "./components/PrivateRoute";
import OnlyDoctorPrivateRoute from "./components/OnlyDoctorPrivateRoute";
import OnlyIntryMangerPrivateRoute from "./components/onlyIntryMangerPrivateRoute";
import Additem from "./pages/Additems";
import Appoiment from "./pages/client/Appoiment";
import Form from "./pages/client/Form";
import Allapoiment from "./pages/client/Allapoiment";
import Updat from "./pages/client/Update";
import Payment from "./pages/payment/addpaydetails";
import PaymentD from "./pages/payment/Paymentdetails";
import View from "./pages/Doctor/ViewAppoiment";
import Cancel from "./pages/Doctor/Cancelappoiment";
import Create from "./pages/Doctor/Createblog";
import Updatehealth from "./pages/Doctor/updatehealth";
import Updatee from "./pages/Update";
import Order from "./pages/Order";



export default function App() {
  return (
    <BrowserRouter>
      <Log />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Appoiment" element={<Appoiment />} />
       

        <Route element={<PrivateRoute />}>
          <Route path="/form" element={<Form />} />
          <Route path="/allapoiment" element={<Allapoiment/>} />
          <Route path="/update/:updateId" element={<Updat />} />
          <Route path="/pay/:payId" element={<Payment />} />
          <Route path="/paydetails" element={<PaymentD />} />

        </Route>

        <Route element={<OnlyDoctorPrivateRoute />}>

      
          <Route path="/view" element={<View />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/healthblog" element={<Create />} />
          <Route path="/updatehealth/:healthId" element={<Updatehealth />} />
          
            
        </Route>



        <Route element={<OnlyIntryMangerPrivateRoute />}>
          <Route path="/create-item" element={<Additem />} />
          <Route path="/order" element={<Order />} />
          <Route path="/update-item/:updateId" element={<Updatee />} />
          
        
          
            
        </Route>




      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
