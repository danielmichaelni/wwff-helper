import _ from 'lodash'
import React, { Component, PropTypes } from 'react'


class Controls extends Component {
  static propTypes = {
    board: PropTypes.array,
    boardIncreaseSize: PropTypes.func,
    letterUpdate: PropTypes.func,
    possibleWords: PropTypes.array,
    wordMake: PropTypes.func,
    wordSearch: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.debouncedWordSearch = _.debounce(props.wordSearch, 300)
  }

  onUseWordClick(word) {
    this.props.wordMake(word)
  }

  handleChange(event) {
    const { value } = event.target
    const { letterUpdate } = this.props

    letterUpdate(value).then(() => {
      this.debouncedWordSearch()
    })
  }

  handleKeyDown(event) {
    const {
      boardIncreaseSize,
      letterClear,
      wordMake,
    } = this.props
    const key = event.key

    switch (key) {
      case 'Enter':
        event.preventDefault();
        wordMake(this.props.possibleWords[0])
        break
      case ' ':
        event.preventDefault();
        boardIncreaseSize()
        break
      default:
        break;
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
    const {
      letters,
      possibleWords,
    } = this.props

    const renderedPossibleWords = this.renderPossibleWords(possibleWords)

    return (
      <div className="controls">
        <div>letters -> letters</div>
        <div>space -> increase board size</div>
        <div>enter -> use current word</div>
        <div>
          <input
            className="input"
            value={letters.join('')}
            onChange={(event) => this.handleChange(event)}
            onKeyDown={(event) => this.handleKeyDown(event)}
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
