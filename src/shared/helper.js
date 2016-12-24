import dict from './dict'
import letterValues from './letterValues'


export const getNumNeighbors = (board, x, y) => {
  const size = board.length
  let numNeighbors = 0
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i < 0 || i >= size || j < 0 || j >= size) {
        continue
      } else if (i === x && j === y) {
        continue
      } else if (board[i][j] !== '') {
        numNeighbors++
      }
    }
  }
  return numNeighbors
}

export const getLettersInWord = (word) => {
  let lettersInWord = {}
  for (let i = 0; i < word.length; i++) {
    let letter = word.charAt(i)
    lettersInWord[letter] = (lettersInWord[letter] || 0) + 1
  }
  return lettersInWord
}

export const getWordScore = (word) => {
  let score = 0
  for (let i = 0; i < word.length; i++) {
    score += letterValues[word.charAt(i)]
  }
  return score
}

export const findWords = (letters) => {
  return dict.filter((word) => {
    let lettersInWord = {}
    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i)
      lettersInWord[letter] = (lettersInWord[letter] || 0) + 1
      if (lettersInWord[letter] > (letters[letter] || 0)) {
        return false
      }
    }
    return true
  })
}

export const findWordsWithThisLetter = (letters, thisLetter) => {
  return findWords({
    ...letters,
    [thisLetter]: (letters[thisLetter] || 0) + 1,
  }).filter((word) => {
    return word.indexOf(thisLetter) !== -1
  })
}

export const getInitialWord = (letters) => {
  const w = findWords(letters)
  return w.reduce((acc, word) => {
    if (word.length > acc.length) {
      return word
    }
    return acc
  }, '')
}
