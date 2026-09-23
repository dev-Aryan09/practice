import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Minimum 3 characters required"],
    maxLength: [50, "Maximum 50 characters required"],
  },
  email: {
    type: String,
    required: true,
    // match:/ The match validator enforces a regex rule
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Minimum 6 characters are required"],
  },
  /*
  If we do "required: true", then mongoose will throw an error because
  we will update the document after its creation in DB using "await user.save()"
  */
  refreshToken: {
    type: String,
    // required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
