import { FilterQuery, Model } from "mongoose";

export const searchFunction = (search: string, keyName: string[]) => {
  if (!search) {
    return {}; // Return an empty filter if search query is not provided
  }
  const isValidDate = !isNaN(Date.parse(search)); // Valid date format is 2024-02-23

  const dynamicSearchQuery = keyName.map((field) => ({
    [field]: isValidDate
      ? new Date(search)
      : typeof search === "string"
      ? { $regex: search, $options: "i" }
      : search,
  }));

  return { $or: dynamicSearchQuery };
};

type MDocument<T> = Partial<T> & { _id: string | undefined };

export const isExists = async <T, K extends keyof MDocument<T>>(
  value: MDocument<T>[K],
  model: Model<T>,
  key: K
) => {
  try {
    const existingValue = await model.findOne({
      [key]: value,
    } as FilterQuery<T>);
    return !!existingValue; // Return true if data exists, false otherwise
  } catch (error) {
    console.error("Error fetching isExists:", error);
    throw new Error(error as string);
  }
};

// errorHelper.js

const throwError = (message: string, statusCode = 500) => {
  const error = new Error(message);
  (error as any).statusCode = statusCode; // Attach status code to the error object
  throw error;
};

export default throwError;
