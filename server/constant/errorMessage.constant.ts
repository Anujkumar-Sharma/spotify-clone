export type CrudErrorMessage = 'USER' ;
export type CrudErrorKeys =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'GET'
  | 'NOT_FOUND';

export type ErrorKeys =
  | 'USER_NOT_FOUND'
  | 'INVALID_PASSWORD'
  | 'NOT_USED_SAME_PASSWORD'
  | 'OLD_PASSWORD_NOT_MATCHED'
  | 'INVALID_TOKEN';

const messages = ['user'];

const crudErrorMessages = messages.reduce(
  (acc, item) => {
    return {
      ...acc,
      [item.replace(' ', '_').toUpperCase()]: {
        CREATE: `Error creating ${item}`,
        UPDATE: `Error updating ${item}`,
        DELETE: `Error deleting ${item}`,
        GET: `Error fetching ${item}`,
        NOT_FOUND: `Error ${item} not found`,
      },
    };
  },
  {} as Record<CrudErrorMessage, Record<CrudErrorKeys, string>>,
);

const errorMessages = {
  USER_NOT_FOUND: `User not found!!`,
  INVALID_PASSWORD: `Invalid password!!`,
  NOT_USED_SAME_PASSWORD: `New password must be different from the old password!!`,
  OLD_PASSWORD_NOT_MATCHED: `Old password does not matched!!`,
  INVALID_TOKEN: `Invalid or expired token`,
} as Record<ErrorKeys, string>;

export const ERROR_MESSAGE: Record<
  CrudErrorMessage,
  Record<CrudErrorKeys, string>
> & { ERROR: Record<ErrorKeys, string> } = {
  ...crudErrorMessages,
  ERROR: errorMessages,
};
