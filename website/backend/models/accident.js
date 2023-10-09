const mongoose = require("mongoose");

const accidentSchema = mongoose.Schema(
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

exports.Complaint = mongoose.model("accident", accidentSchema);
exports.complaintSchema = accidentSchema;
