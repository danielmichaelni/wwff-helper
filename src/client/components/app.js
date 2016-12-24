import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Board from './board'
import Controls from './controls'
import {
  boardIncreaseSize,
  letterAdd,
  letterClear,
  wordMake,
} from '../actionCreators'


class App extends Component {
  static propTypes = {
    board: PropTypes.array,
    lastPosition: PropTypes.array,
    letterAdd: PropTypes.func,
    letterClear: PropTypes.func,
    letters: PropTypes.object,
    possibleWords: PropTypes.array,
    boardIncreaseSize: PropTypes.func,
  }

  render() {
    const {
      board,
      boardIncreaseSize,
      lastPosition,
      letterAdd,
      letterClear,
      letters,
      possibleWords,
      wordMake,
    } = this.props

    return (
      <div className="container">
        <Controls
          boardIncreaseSize={boardIncreaseSize}
          letterAdd={letterAdd}
          letterClear={letterClear}
          possibleWords={possibleWords}
          wordMake={wordMake}
        />
        <Board
          board={board}
          lastPosition={lastPosition}
          letters={letters}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
  lastPosition: state.lastPosition,
  letters: state.letters,
  possibleWords: state.possibleWords,
})

const mapDispatchToProps = {
  boardIncreaseSize,
  letterAdd,
  letterClear,
  wordMake,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
