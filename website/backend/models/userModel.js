const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// userSchema.virtual('id').get(function(){
//     return this._id.toHexString();
// }
// );

// userSchema.set('toJSON',{
//     virtuals:true
// });

exports.User = mongoose.model("user", userSchema);
exports.userSchema = userSchema;

// Path: models\productModel.js
// const mongoose= require('mongoose');
