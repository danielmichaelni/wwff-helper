import actionTypes from './actionTypes'
import { findWordsInBoard } from '../shared'
import { toLettersDictionary } from '../shared/helper'


const {
  BOARD_INCREASE_SIZE,
  LETTER_UPDATE,
  POSSIBLE_WORDS_UPDATE,
  WORD_MAKE,
} = actionTypes

export const letterUpdate = (letters) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch({
        type: LETTER_UPDATE,
        payload: { letters },
      }))
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
          possibleWords: findWordsInBoard(toLettersDictionary(letters), board)
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
          possibleWords: findWordsInBoard(toLettersDictionary(letters), board)
        },
      })
    })
  }
}

export const wordSearch = () => {
  return (dispatch, getState) => {
    const state = getState()
    const {
      letters,
      board,
    } = state

    dispatch({
      type: POSSIBLE_WORDS_UPDATE,
      payload: { possibleWords: findWordsInBoard(toLettersDictionary(letters), board) },
    })
  }
}
