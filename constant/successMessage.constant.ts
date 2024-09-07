export type CrudMessage = "USER" | "PLAYLIST" | "TRACKS";

export type CrudKeys = "CREATE" | "UPDATE" | "DELETE" | "GET" | "SIGN_IN";

export type SuccessKeys =
  | "CHANGE_PASSWORD"
  | "RESET_PASSWORD"
  | "FORGOT_PASSWORD_MAIL";

const messages = ["User", "Playlist", "Tracks"];

const crudMessages = messages.reduce((acc, item) => {
  return {
    ...acc,
    [item.replace(" ", "_").toUpperCase()]: {
      CREATE: `${item} created successfully`,
      UPDATE: `${item} updated successfully`,
      DELETE: `${item} deleted successfully`,
      GET: `${item} fetched successfully`,
      SIGN_IN: `${item} signed in successfully`,
    },
  };
}, {} as Record<CrudMessage, Record<CrudKeys, string>>);

const successMessages = {
  CHANGE_PASSWORD: `Password changed successfully`,
  RESET_PASSWORD: `Password reset successfully`,
  FORGOT_PASSWORD_MAIL: `An email with instructions to reset your password has been sent to your registered email address. Please check your inbox and follow the instructions provided in the email to reset your password.
  `,
} as Record<SuccessKeys, string>;

export const SUCCESS_MESSAGE: Record<CrudMessage, Record<CrudKeys, string>> & {
  SUCCESS: Record<SuccessKeys, string>;
} = {
  ...crudMessages,
  SUCCESS: successMessages,
};
