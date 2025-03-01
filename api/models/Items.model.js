import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    Iname: {
      type: String,
      required: true,
      
    },
    image: {
      type: String,
      required: true,
      
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
        type: String,
        required: true,
      },
    phone: {
        type: Number,
        required: true,
      },
    

  },
  { timestamps: true }
);

const Item = mongoose.model('Item', ItemSchema);

export default Item;