const React = require('react')
var minesweeper = require('minesweeper')
const R = require('ramda')

const App = React.createClass({
  getInitialState: function() {
    return {
      grid: [],
      board: {}
    }
  },

  getCellString(content) {
    return ' [ ' + content + ' ] ';
  },

  printBoard(board) {
    var i,
        strColHead = '   ',
        grid = board.grid();

    this.setState({grid})

    // print a header that shows the column numbers
    for (i = 0; i < board.numCols(); i++) {
      strColHead += '   ' + i + '   ';
    }
    console.log("strColHead: " + strColHead);

    // print all the rows on the board
    for (i = 0; i < board.numRows(); i++) {
      this.printRow(grid[i], i);
    }
  },

  printRow(rowArray, rowNum) {
    var i,
        cell,
        strRow = '';

    // Start the row with the row number
    strRow += rowNum !== undefined ? ' ' + rowNum + ' ' : '';

    // Add each cell in the row to the string we will print
    for (i=0; i<rowArray.length; i++) {
      cell = rowArray[i];
      if (cell.state === minesweeper.CellStateEnum.CLOSED) {
        if (cell.flag === minesweeper.CellFlagEnum.NONE) {
          strRow += this.getCellString(' ');
        } else if (cell.flag === minesweeper.CellFlagEnum.EXCLAMATION) {
          strRow += this.getCellString('!');
        } else if (cell.flag === minesweeper.CellFlagEnum.QUESTION) {
          strRow += this.getCellString('?');
        }
      } else if (cell.state === minesweeper.CellStateEnum.OPEN) {
        if (cell.isMine) {
          strRow += this.getCellString('*');
        } else {
          strRow += this.getCellString(cell.numAdjacentMines);
        }
      }
    }

    // Print this row to the console
    console.log("strRow: " + strRow);
  },

  componentDidMount: function() {
    var mineArray = minesweeper.generateMineArray({
      rows: 10,
      cols: 10,
      mines: 15
    })
    var board = new minesweeper.Board(mineArray)
    this.setState({board})
    this.printBoard(board)
  },

  handleClick(cell) {
    var self = this
    return function() {
      console.log('Cell: ' + JSON.stringify(cell))
      self.state.board.openCell(cell.x, cell.y)
    }

  },

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <div className="">
          {this.state.grid.map( row => {
            return <div className="fl w-100">
              {row.map( cell => {
                return <div
                        onClick={this.handleClick(cell)}
                        className="bg-green ba w2 h2 fl ib">
                          {JSON.stringify(cell.isMine)}
                       </div>
              })}
            <br />
            </div>
          })}
        </div>
      </div>
    )
  }
})

module.exports = App
