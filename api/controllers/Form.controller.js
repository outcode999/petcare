import Form from "../models/PetForm.model.js";
import { errorHandle } from "../utils/error.js";



export const Petcreate = async (req, res, next) => {
  

  const { currentuserId,  name, Address,Phone,type,petname } = req.body;

  const newForm = new Form({
    currentuserId,
    name,
    Address,
    Phone,
    type,
    petname

  });
  try {
    const savedFrom = await newForm.save();
    res.status(201).json(savedFrom);
  } catch (error) {
    next(error);
  }
};



export const getPets = async (req, res, next) => {
    
  try {
    const {  currentuserId } = req.params;
    console.log( currentuserId)

    
    const form = await Form.find({  currentuserId });
    console.log(form)

    

    
    res.json(form);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//get all appoiment
export const getAllform = async (req, res, next) => {
  try {
    const form = await Form.find();

    if (form.length > 0) {
      res.json({ message: "Items details retrieved successfully", form });
    } else {
      return next(errorHandle(404, " student not fonud "));
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const deleteFrom = async (req, res, next) => {

  try {
    await Form.findByIdAndDelete(req.params.FomId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};




export const updateFrom = async (req, res, next) => {
 
  try {
    const updateForm = await Form.findByIdAndUpdate(
      req.params.FormId,
      {
        $set: {
         
          name: req.body.name,
          Address: req.body.Address,
          Phone: req.body.Phone,
          type: req.body.type,
          petname: req.body.petname,
        },
      },
      { new: true }
    );
    res.status(200).json(updateForm);
  } catch (error) {
    next(error);
  }
};


