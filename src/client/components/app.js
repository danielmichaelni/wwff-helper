import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Board from './board'
import Controls from './controls'
import {
  boardIncreaseSize,
  letterUpdate,
  wordMake,
  wordSearch,
} from '../actionCreators'


class App extends Component {
  static propTypes = {
    board: PropTypes.array,
    lastPosition: PropTypes.array,
    letterUpdate: PropTypes.func,
    wordMake: PropTypes.func,
    wordSearch: PropTypes.func,
    letters: PropTypes.array,
    possibleWords: PropTypes.array,
    boardIncreaseSize: PropTypes.func,
  }

  render() {
    const {
      board,
      boardIncreaseSize,
      lastPosition,
      letterUpdate,
      letters,
      possibleWords,
      wordMake,
      wordSearch,
    } = this.props

    return (
      <div className="container">
        <Controls
          board={board}
          boardIncreaseSize={boardIncreaseSize}
          letterUpdate={letterUpdate}
          letters={letters}
          possibleWords={possibleWords}
          wordMake={wordMake}
          wordSearch={wordSearch}
        />
        <Board
          board={board}
          lastPosition={lastPosition}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.board,
    lastPosition: state.lastPosition,
    letters: state.letters,
    possibleWords: state.possibleWords,
  }
}

const mapDispatchToProps = {
  boardIncreaseSize,
  letterUpdate,
  wordMake,
  wordSearch,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
