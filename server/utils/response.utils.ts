export const successResponse = <T = any, U = any>(
  message: string,
  responseData?: T,
  otherData?: U
) => {
  return {
    ...responseData,
    ...otherData,
    message,
  };
};
