
import Health from "../models/health.model.js";
import { errorHandle } from "../utils/error.js";





export const Healthcreate = async (req, res, next) => {
  

  const { type,name,desc} = req.body;

  const newhealth = new Health ({
   
    type,
    name,
    desc,
    

  });
  try {
    const savedhealth = await newhealth.save();
    res.status(201).json(savedhealth);
  } catch (error) {
    next(error);
  }
};



export const Healthget = async (req, res, next) => {
  try {
   

      const health = await Health.find();

      if (health.length > 0) {
        res.json({
          message: "health details retrieved successfully",
          health,
        });
      } else {
        return next(errorHandle(404, " details not fonud "));
      }
  
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



export const deleteHealth = async (req, res, next) => {

  try {
    await Health.findByIdAndDelete(req.params.healthId);
    res.status(200).json("The posthas been deleted");
  } catch (error) {
    next(error);
  }
};




export const updateHealth = async (req, res, next) => {
 
  try {
    const updateitem = await Health.findByIdAndUpdate(
      req.params.HealthId,
      {
        $set: {
         
          type: req.body.type,
          name: req.body.name,
          desc: req.body.desc,
          
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateitem);
  } catch (error) {
    next(error);
  }
};