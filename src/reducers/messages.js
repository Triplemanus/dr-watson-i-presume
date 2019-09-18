export const messages = (state='', action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGES':
      return action.clearMessages
    case 'ADD_MESSAGE':
      return action.addMessage
    default:
      return state;
  }
}