import { Document, Schema, model, Model } from "mongoose";

export interface UserAttr {
  email: string;
  password: string;
  nickname: string;
}

interface IUser extends UserAttr, Document {}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
});

const UserModel: Model<IUser> = model<IUser>("users", UserSchema);

export default UserModel;
