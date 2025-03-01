import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema(
  {



    currentuserId: {
      type: String,
      required: true,
      
    },
    name: {
      type: String,
      required: true,
      
    },
    Address: {
      type: String,
      required: true,
      
    },
    Phone: {
      type: Number,
      required: true,
    },
    type: {
        type: String,
        required: true,
      },
      petname: {
        type: String,
        required: true,
      },
    

  },

);

const Form = mongoose.model('Form', FormSchema);

export default Form;