import React from 'react';

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

export class Board extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    squares: React.PropTypes.array.isRequired,
  }

  renderSquare(cell) {
    return (
      <button key={cell} className="square" onClick={() => this.props.onClick(cell)}>
        {this.props.squares[cell]}
      </button>
    );
  }

  render() {
    return (
      <div>
        {lines.map((row, index) =>
          <div className="board-row" key={index}>
            {row.map((cell) => this.renderSquare(cell))}
          </div>
        )}
      </div>
    );
  }
}
