import mongoose, { Document, Schema } from "mongoose";

export interface PlayListDocument extends Document {
  name: string;
  createdBy: string;
}

export interface UserPlayListDocument extends Document {
  trackId: string;
  playlistId: string;
}

const playListSchema: Schema = new Schema({
  name: { type: String, require: true },
  createdBy: { type: Schema.Types.ObjectId, require: true, ref: "User" },
});

const userPlayListSchema: Schema = new Schema({
  trackId: { type: String, require: true },
  playlistId: { type: Schema.Types.ObjectId, require: true, ref: "PlayList" },
});

const PlayList = mongoose.model<PlayListDocument>("PlayList", playListSchema);

const UserPlayList = mongoose.model<UserPlayListDocument>(
  "UserPlayList",
  userPlayListSchema
);

export default { PlayList, UserPlayList };
