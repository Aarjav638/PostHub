const moongose = require("mongoose");

//  schema

const postSchema = new moongose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      unique: false,
    },
    description: {
      type: String,
      required: [true, "Post description is required"],
    },
    postedBy: {
      type: moongose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    // photo: {
    //   type: String,
    //   required: false,
    // },
    // username: {
    //   type: String,
    //   required: [true, "Username is required"],
    // },
    // categories: {
    //   type: Array,
    //   required: false,
    // },
  },
  { timestamps: true }
);

module.exports = moongose.model("Posts", postSchema);
