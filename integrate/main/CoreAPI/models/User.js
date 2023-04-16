const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema= new Schema({
  
})

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  network:[
{
  name:'',
  address:'',
}
  ],


  asset: [
    
      {
        token: { type: String, required: true }, 
        amount: { type: Number, required: true },
        network:[  
          {
          name: { type: String, required: true },  
          address: { type: String, required: true }, 
        }
      ]
      }
    ]
});

module.exports = mongoose.model("User", UserSchema);
