
import Item from "../models/Items.model.js";
import { errorHandle } from "../utils/error.js";





export const Itemcreate = async (req, res, next) => {
  

  const { Iname,image,desc,price,phone} = req.body;

  const newItem = new Item ({
   
    Iname,
    image,
    desc,
    price,
    phone

  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error);
  }
};



export const Itemget = async (req, res, next) => {
  try {
   

      const item = await Item.find();

      if (item.length > 0) {
        res.json({
          message: "Payment details retrieved successfully",
          item,
        });
      } else {
        return next(errorHandle(404, " details not fonud "));
      }
  
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



export const deleteitem = async (req, res, next) => {

  try {
    await Item.findByIdAndDelete(req.params.itmeId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};




export const updateItems = async (req, res, next) => {
 
  try {
    const updateitem = await Item.findByIdAndUpdate(
      req.params.ItemId,
      {
        $set: {
         
          Iname: req.body.Iname,
          image: req.body.image,
          desc: req.body.desc,
          price: req.body.price,
          phone: req.body.phone,
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateitem);
  } catch (error) {
    next(error);
  }
};