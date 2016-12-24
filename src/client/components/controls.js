import React, { Component, PropTypes } from 'react'


class Controls extends Component {
  static propTypes = {
    boardIncreaseSize: PropTypes.func,
    letterAdd: PropTypes.func,
    letterClear: PropTypes.func,
    possibleWords: PropTypes.array,
    wordMake: PropTypes.func,
  }

  onUseWordClick(word) {
    this.props.wordMake(word)
  }

  onLettersChange(event) {
    this.props.letterAdd(event.target.value)
  }

  onKeyDown(event) {
    const {
      boardIncreaseSize,
      letterAdd,
      letterClear,
      wordMake,
    } = this.props
    const key = event.key

    switch (key) {
      case 'Enter':
        wordMake(this.props.possibleWords[0])
        break
      case ' ':
        boardIncreaseSize()
        break
      case 'Backspace':
        letterClear()
        break;
      default:
        letterAdd(key)
    }
  }

  renderPossibleWords(possibleWords) {
    const renderedPossibleWords = possibleWords.map((possibleWord, index) => {
      return (
        <div
          key={index}
          className="possibleWord"
          onClick={() => this.onUseWordClick(possibleWord)}
        >
          { JSON.stringify(possibleWord) }
        </div>
      )
    })
    return renderedPossibleWords
  }

  render() {
    const { possibleWords } = this.props
    const renderedPossibleWords = this.renderPossibleWords(possibleWords)

    return (
      <div className="controls">
        <div>letters -> letters</div>
        <div>space -> increase board size</div>
        <div>enter -> use current word</div>
        <div>backspace -> clear letters</div>
        <div>
          <input
            className="input"
            value=""
            onKeyDown={(event) => this.onKeyDown(event)}
          />
        </div>
        <div>
          <div>
            { renderedPossibleWords[0] }
          </div>
        </div>
      </div>
    )
  }
}

export default Controls
