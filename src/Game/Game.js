import React from 'react';
import { Board } from '../Board/Board';

const Lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const InitialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
};

export class Game extends React.Component {
  state = InitialState;

  calculateWinner(squares) {
    for (let i = 0; i < Lines.length; i++) {
      const [a, b, c] = Lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  startNewGame = () => this.setState(InitialState);

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = this.calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move}` : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <a href="#" onClick={() => this.startNewGame()}>New Game</a>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
