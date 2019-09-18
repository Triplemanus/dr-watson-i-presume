export const createUser = user => ({
  type: 'CREATE_USER',
  user
});

export const removeUser = () => ({
  type: 'REMOVE_USER'
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
});

export const addMessage = messages => ({
  type: 'ADD_MESSAGE',
  messages
});

export const clearMessages = messages => ({
  type: 'CLEAR_MESSAGES',
  messages
})