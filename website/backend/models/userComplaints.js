const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    //complaint should be a file
    complaint: [
      {
        data: String,
        name: String,
        //   required: true,
      },
    ],
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

exports.Complaint = mongoose.model("complaints", complaintSchema);
exports.complaintSchema = complaintSchema;
