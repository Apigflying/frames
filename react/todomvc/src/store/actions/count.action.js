
export const ADD_COUNT = 'ADD_COUNT';
export const REDUCE_COUNT = 'REDUCE_COUNT';


export function addCount () {
  return {
    type: ADD_COUNT
  }
}

export function reduceCount () {
  return {
    type:REDUCE_COUNT
  }
}