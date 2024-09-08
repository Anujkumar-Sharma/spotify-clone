import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SpotifyToken extends Document {
  token: string;
  endTime: Date;
}

const userSchema: Schema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: { type: String, require: true },
});
const spotifySchema: Schema = new Schema({
  token: { type: String, require: true },
  endTime: { type: Date, require: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);
export const Spotify = mongoose.model<SpotifyToken>("Spotify", spotifySchema);

export default User;
