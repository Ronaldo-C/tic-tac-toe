import React from 'react'
import './index.css'
import ReactDOM from 'react-dom'

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function searchPosition(i) {
  let searchPosition = ''
  switch (i) {
    case 0:
      searchPosition = '(1, 1)'
      break;
    case 1:
      searchPosition = '(2, 1)'
      break;
    case 2:
      searchPosition = '(3, 1)'
      break;
    case 3:
      searchPosition = '(1, 2)'
      break;
    case 4:
      searchPosition = '(2, 2)'
      break;
    case 5:
      searchPosition = '(3, 2)'
      break;
    case 6:
      searchPosition = '(1, 3)'
      break;
    case 7:
      searchPosition = '(2, 3)'
      break;
    case 8:
      searchPosition = '(3, 3)'
      break;
    default:
      break;
  }
  return searchPosition
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      postions: []
    }
  }

  handleClick = (i) => {
    const history = this.state.history
    let stepNumber = this.state.stepNumber
    const postions = this.state.postions
    const current = history[history.length - 1]
    let squares = current.squares.slice()
    let arr = postions.slice()
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    arr.push(searchPosition(i))
    this.setState({ 
      history: history.concat([{
        squares
      }]), 
      xIsNext: !this.state.xIsNext,
      stepNumber: ++stepNumber,
      postions: arr,
     })
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }

  render() {
    const history = this.state.history
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((item, move) => {
      let desc = move ? 'Move To' + this.state.postions[move - 1] : 'Game start';
      return (
        <li href="#" key={move} onClick={() => this.jumpTo(move)}>{desc}</li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
