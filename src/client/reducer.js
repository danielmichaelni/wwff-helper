import { combineReducers } from 'redux'
import actionTypes from './actionTypes'
import { findWordsInBoard } from '../shared'


const {
  BOARD_INCREASE_SIZE,
  LETTER_ADD,
  LETTER_CLEAR,
  LETTER_UPDATE,
  POSSIBLE_WORDS_UPDATE,
  WORD_MAKE,
} = actionTypes

const initialBoard = [['','','','','','',''],
                      ['','','','','','',''],
                      ['','','','','','',''],
                      ['','','','','','',''],
                      ['','','','','','',''],
                      ['','','','','','',''],
                      ['','','','','','','']]

const board = (state = initialBoard, action) => {
  switch (action.type) {
    case BOARD_INCREASE_SIZE:
      const emptyRow1 = ['', ...state[0].map((cell) => ''), '']
      const emptyRow2 = ['', ...state[0].map((cell) => ''), '']
      return [
        emptyRow1,
        ...state.map((row) => {
          return ['', ...row, '']
        }),
        emptyRow2,
      ]
    case WORD_MAKE:
      const {
        word,
        position,
        direction,
      } = action.payload.word
      const r = position[0]
      const c = position[1]
      let newBoard = [...state]
      if (direction === 'horizontal') {
        for (let j = 0; j < word.length; j++) {
          newBoard[r][c+j] = word.charAt(j)
        }
      } else {
        for (let i = 0; i < word.length; i++) {
          newBoard[r+i][c] = word.charAt(i)
        }
      }
      return newBoard
    default:
      return state
  }
}

const letters = (state = [], action) => {
  switch (action.type) {
    case LETTER_UPDATE:
      return action.payload.letters.split('')
    case WORD_MAKE:
      const counter = {...action.payload.word.lettersUsed}

      return state.filter((letter) => {
        if (counter[letter] || 0 > 1) {
          counter[letter] -= 1
          return false
        }
        return true
      })
    default:
      return state
  }
}

const possibleWords = (state = [], action) => {
  switch (action.type) {
    case POSSIBLE_WORDS_UPDATE:
      return action.payload.possibleWords
    default:
      return state
  }
}

const lastPosition = (state = [0, 0], action) => {
  switch (action.type) {
    case BOARD_INCREASE_SIZE:
      return state.map((x) => (x + 1))
    case WORD_MAKE:
      return action.payload.word.position
    default:
      return state
  }
}

export default combineReducers({
  board,
  lastPosition,
  letters,
  possibleWords,
})
