import { Types } from 'mongoose';

export const MObjectId = (id: string) => {
  return new Types.ObjectId(id);
};
