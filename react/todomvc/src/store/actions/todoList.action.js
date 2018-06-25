export const ADD_TODOS = 'ADD_TODOS'

export function addTodos (content){
  return {
    type:ADD_TODOS,
    payload: {
      content
    }
  }
}