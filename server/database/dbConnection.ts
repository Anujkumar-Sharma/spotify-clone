import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI: string =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/spotify-clone";

function enableTimestampsPlugin(schema: Schema) {
  schema.set("timestamps", true);
}
const enableTimestamps = function (schema: Schema) {
  schema.plugin(enableTimestampsPlugin);
};

mongoose.plugin(enableTimestamps);

export const connectDB = async () => {
  await mongoose
    .connect(MONGO_URI, {
      autoIndex: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error: Error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
