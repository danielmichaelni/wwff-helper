import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'


class Board extends Component {
  static propTypes = {
    board: PropTypes.array,
    lastPosition: PropTypes.array,
    letters: PropTypes.object,
  }

  renderRow(row, rowIndex) {
    const { lastPosition } = this.props
    const r = lastPosition[0]
    const c = lastPosition[1]

    return row.map((cell, index) => {
      return (
        <div
          key={index}
          className={classNames('cell', {lastPosition: rowIndex === r && index === c})}
        >
          { cell }
        </div>
      )
    })
  }

  renderBoard(board) {
    return board.map((row, index) => {
      return (
        <div
          key={index}
          className="row"
        >
          { this.renderRow(row, index) }
        </div>
      )
    })
  }

  renderLetters(letters) {
    let renderedLetters = []
    for (const letter in letters) {
      if (letters.hasOwnProperty(letter)) {
        const num = letters[letter]
        for (let i = 0; i < num; i++) {
          renderedLetters.push((
            <div key={`${letter}${i}`} className="letter">
              { letter }
            </div>
          ))
        }
      }
    }
    return renderedLetters
  }

  render() {
    const {
      board,
      letters,
    } = this.props
    const renderedBoard = this.renderBoard(board)
    const renderedLetters = this.renderLetters(letters)

    return (
      <div>
        <div className="board">
          { renderedBoard }
        </div>
        <div className="letters">
          { renderedLetters }
        </div>
      </div>
    )
  }
}

export default Board
