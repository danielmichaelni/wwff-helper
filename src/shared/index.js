import {
  getLettersInWord,
  getNumNeighbors,
  getWordScore,
  findWords,
  findWordsWithThisLetter,
  getInitialWord,
} from './helper'


export const findWordsInBoard = (letters, board) => {
  let isInital = true
  const size = board.length
  let words = []

  board.forEach((row, r) => {
    row.forEach((letter, c) => {
      if (letter === '') {
        return
      } else if (getNumNeighbors(board, r, c) > 2) {
        return
      }

      isInital = false

      const possibleWords = findWordsWithThisLetter(letters, letter)
      const validWords = possibleWords.reduce((acc, possibleWord) => {
        const position = possibleWord.indexOf(letter)
        const length = possibleWord.length
        const startRow = r - position
        const startCol = c - position
        const lettersInWord = getLettersInWord(possibleWord)
        const lettersUsed = {
          ...lettersInWord,
          [letter]: lettersInWord[letter] - 1,
        }

        // out of bounds
        if ((startRow < 0 ||
             startRow + length > size) &&
            (startCol < 0 ||
             startCol + length > size)) {
          return acc
        }

        let vertical = true
        if ((startRow - 1 >= 0 && board[startRow-1][c] != '') ||
            (startRow + length < size && board[startRow+length][c] != '')) {
          vertical = false
        }
        for (let i = startRow; i < startRow + length; i++) {
          if (i === startRow + position) {
            continue
          }
          if (!vertical) {
            break
          }

          if (i < 0 || i >= size) {
            vertical = false
          } else if (board[i][c] !== '') {
            return acc
          } else if (c - 1 >= 0 && board[i][c-1] !== '') {
            vertical = false
          } else if (c + 1 < size && board[i][c+1] !== '') {
            vertical = false
          }
        }
        if (vertical) {
          return [
            ...acc,
            {
              word: possibleWord,
              score: getWordScore(possibleWord),
              lettersUsed,
              position: [r - position, c],
              direction: 'vertical'
            }
          ]
        }

        let horizontal = true
        if ((startCol - 1 >= 0 && board[r][startCol-1] != '') ||
            (startCol + length < size && board[r][startCol+length] != '')) {
          horizontal = false
        }
        for (let j = startCol; j < startCol + length; j++) {
          if (j === startCol + position) {
            continue
          }
          if (!horizontal) {
            break
          }

          if (j < 0 || j >= size) {
            horizontal = false
          } else if (board[r][j] !== '') {
            return acc
          } else if (r - 1 >= 0 && board[r-1][j] !== '') {
            horizontal = false
          } else if (r + 1 < size && board[r+1][j] !== '') {
            horizontal = false
          }
        }
        if (horizontal) {
          return [
            ...acc,
            {
              word: possibleWord,
              score: getWordScore(possibleWord),
              lettersUsed,
              position: [r, c - position],
              direction: 'horizontal'
            }
          ]
        }

        return acc
      }, [])
      words = words.concat(validWords)
    })
  })

  if (isInital) {
    const initialWord = getInitialWord(letters)
    if (initialWord) {
      return [{
        word: initialWord,
        score: getWordScore(initialWord),
        lettersUsed: letters,
        position: [3, 1],
        direction: 'horizontal'
      }]
    }
  }

  words.sort((wordA, wordB) => {
    const scoreA = wordA.score
    const scoreB = wordB.score

    if (scoreA < scoreB) {
      return -1
    } else if (scoreA > scoreB) {
      return 1
    } else {
      return 0
    }
  }).reverse()

  return words.slice(0, 1)
}
