import Reason from "../models/Reason.model.js";
import Payment from "../models/payment.model.js";
import { errorHandle } from "../utils/error.js";





export const Recreate = async (req, res, next) => {
  

  const { name, Phone,desc} = req.body;

  const newReason = new Reason ({
   
    name,
    Phone,
    desc

  });
  try {
    const savedReason = await newReason.save();
    res.status(201).json(savedReason);
  } catch (error) {
    next(error);
  }
};



export const Rget = async (req, res, next) => {
  try {
   

      const reason = await Reason.find();

      if (reason.length > 0) {
        res.json({
          message: "Payment details retrieved successfully",
          reason,
        });
      } else {
        return next(errorHandle(404, " details not fonud "));
      }
  
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



export const Redelete = async (req, res, next) => {

  try {
    await Reason.findByIdAndDelete(req.params.reasonId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};




