const throwError = (name: string, defaultMessage = '') => (message: string = defaultMessage): never => {
  const error = new Error(message);
  error.name = name;
  throw error;
}

export const throwNotFoundError = throwError('NotFoundError', 'not found');
export const throwReferenceError = throwError('ReferenceError')
export const throwEmailOrPasswordError = throwError('EmailOrPasswordError', 'Incorrect email or password');
export const throwIdHomeTeamOrAwayTeamNotFound = throwError('throwIdHomeTeamOrAwayTeamNotFound', 'There is no team with such id!');
export const throwEqualIdsError = throwError('throwEqualIdsError', 'It is not possible to create a match with two equal teams');


