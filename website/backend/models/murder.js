const mongoose = require("mongoose");

const murderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    //complaint should be a string
    complaint: String,
    name: String,
    address: String,
    phone: Number,
    priority: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// complaintSchema.virtual('id').get(function(){
//     return this._id.toHexString();
// }
// );

// complaintSchema.set('toJSON',{
//     virtuals:true
// });

exports.Complaint = mongoose.model("murder", murderSchema);
exports.complaintSchema = murderSchema;
