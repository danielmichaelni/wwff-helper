import actionTypes from './actionTypes'
import { findWordsInBoard } from '../shared'


const {
  BOARD_INCREASE_SIZE,
  LETTER_ADD,
  LETTER_CLEAR,
  POSSIBLE_WORDS_UPDATE,
  WORD_MAKE,
} = actionTypes

export const letterAdd = (letter) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch({
        type: LETTER_ADD,
        prevState: getState(),
        payload: {
          letter,
        },
      }))
    }).then(() => {
      const state = getState()
      const {
        letters,
        board,
      } = state

      dispatch({
        type: POSSIBLE_WORDS_UPDATE,
        prevState: state,
        payload: {
          possibleWords: findWordsInBoard(letters, board)
        },
      })
    })
  }
}

export const letterClear = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch({
        type: LETTER_CLEAR,
        prevState: getState(),
        payload: {},
      }))
    }).then(() => {
      const state = getState()
      const {
        letters,
        board,
      } = state

      dispatch({
        type: POSSIBLE_WORDS_UPDATE,
        prevState: state,
        payload: {
          possibleWords: findWordsInBoard(letters, board)
        },
      })
    })
  }
}

export const boardIncreaseSize = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch({
        type: BOARD_INCREASE_SIZE,
        prevState: getState(),
        payload: {},
      }))
    }).then(() => {
      const state = getState()
      const {
        letters,
        board,
      } = state

      dispatch({
        type: POSSIBLE_WORDS_UPDATE,
        prevState: state,
        payload: {
          possibleWords: findWordsInBoard(letters, board)
        },
      })
    })
  }
}

export const wordMake = (word) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch({
        type: WORD_MAKE,
        prevState: getState(),
        payload: {
          word,
        },
      }))
    }).then(() => {
      const state = getState()
      const {
        letters,
        board,
      } = state

      dispatch({
        type: POSSIBLE_WORDS_UPDATE,
        prevState: state,
        payload: {
          possibleWords: findWordsInBoard(letters, board)
        },
      })
    })
  }
}
