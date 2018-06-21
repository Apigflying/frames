
export const ADD_CARD = 'ADD_CARD';

export function addCard (name = '', age = 0, flag = false) {
  return {
    type: ADD_CARD,
    payload: {
      name, age, flag
    }
  }
}