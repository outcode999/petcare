import mongoose from 'mongoose';

const HealthSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      
    },
    name: {
      type: String,
      required: true,
      
    },
    desc: {
      type: String,
      required: true,
    },
   
    

  },
  { timestamps: true }
);

const Health = mongoose.model('Health', HealthSchema);

export default Health;