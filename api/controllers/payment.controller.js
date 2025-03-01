import payment from "../models/payment.model.js";
import Payment from "../models/payment.model.js";
import { errorHandle } from "../utils/error.js";





export const paymentcreate = async (req, res, next) => {
  

  const { currentuserId,  name, Address,Phone,type,petname, CardNumber, Date,cvc} = req.body;

  const newpyment = new payment ({
    currentuserId,
    name,
    Address,
    Phone,
    type,
    petname,
    CardNumber,
    Date,
    cvc

  });
  try {
    const savedpayment = await newpyment.save();
    res.status(201).json(savedpayment);
  } catch (error) {
    next(error);
  }
};



export const getpayment = async (req, res, next) => {
    
  try {
    const {  currentuserId } = req.params;
    console.log( currentuserId)

    
    const pay = await payment.find({  currentuserId });
   

    

    
    res.json(pay);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




export const deletepayment = async (req, res, next) => {

  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.paymentId);
    
    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "The post has been deleted" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    next(error); // Pass the error to the global error handler
  }
};




export const updatePayment = async (req, res, next) => {
 
  try {
    const updatepaymet = await Payment.findByIdAndUpdate(
      req.params.PayId,
      {
        $set: {
         
          name: req.body.name,
          Address: req.body.Address,
          Phone: req.body.Phone,
          type: req.body.type,
          petname: req.body.petname,
          CardNumber: req.body.CardNumber,
          Date: req.body.Date,
          cvc: req.body.cvc,
        },
      },
      { new: true }
    );
    res.status(200).json(updatepaymet);
  } catch (error) {
    next(error);
  }
};