const React = require('react')
var minesweeper = require('minesweeper')
const R = require('ramda')
const Count = require('./count')


const App = React.createClass({
  getInitialState: function() {
    return {
      grid: [],
      board: {},
      state: null,
      blewUp: false
    }
  },

  getCellString(content) {
    return ' [ ' + content + ' ] ';
  },

  printBoard(board) {
    var i,
        strColHead = '   ',
        grid = board.grid();

    this.setState({
      grid: grid,
      board: board
    })

    // print a header that shows the column numbers
    for (i = 0; i < board.numCols(); i++) {
      strColHead += '   ' + i + '   ';
    }
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
      cell = rowArray[i]
      if (cell.state === minesweeper.CellStateEnum.CLOSED) {
        if (cell.flag === minesweeper.CellFlagEnum.NONE) {
          strRow += this.getCellString(' ')
        } else if (cell.flag === minesweeper.CellFlagEnum.EXCLAMATION) {
          strRow += this.getCellString('!')
        } else if (cell.flag === minesweeper.CellFlagEnum.QUESTION) {
          strRow += this.getCellString('?')
        }
      } else if (cell.state === minesweeper.CellStateEnum.OPEN) {
        if (cell.isMine) {
          strRow += this.getCellString('*')
        } else {
          strRow += this.getCellString(cell.numAdjacentMines)
        }
      }
    }
    // Print this row to the console
    console.log("strRow: " + strRow)
  },

  componentDidMount: function() {
    var mineArray = minesweeper.generateMineArray({
      rows: 10,
      cols: 10,
      mines: 15
    })
    var board = new minesweeper.Board(mineArray)
    this.printBoard(board)
  },

  handleClick(cell) {
    return (e) => {
      if  (cell.isMine) {
        this.state.board.openCell(cell.x, cell.y)
        this.setState({state: 2, blewUp: true})
      }
      else {
        this.state.board.openCell(cell.x, cell.y)
        this.setState({board: this.state.board})
      }
    }
  },

  again() {
    var mineArray = minesweeper.generateMineArray({
      rows: 10,
      cols: 10,
      mines: 15
    })
    var board = new minesweeper.Board(mineArray)
    this.printBoard(board)
    this.setState({blewUp:false})
  },

  setFlag(cell) {
    return (e) => {
      e.preventDefault()
      this.state.board.cycleCellFlag(cell.x, cell.y)
      this.setState({board: this.state.board})
    }
  },

  render() {
    const mineFunction = (cell) => {
      if (this.state.blewUp && cell.isMine) {
        return '💣'
      } else if (cell.state === 1 && cell.isMine) {
        return '💣'
      } else if (cell.state === 1 && !cell.isMine) {
        return JSON.stringify(cell.numAdjacentMines)
      } else if (cell.flag === 1) {
        return '🚩'
      }
    }

    return (
      <div className="helvetica mw4 mw6-ns center pa3 ph5-ns">
        <h1 className="fw1 center"> Afgan Sweeper  <span className="green">monaghancj</span></h1>
        <Count gameState={this.state.state} blewUp={this.state.blewUp}/>
        <div className="">
          {this.state.grid.map( row => {
            return <div className="fl w-100">
              {row.map( cell => {
                return <div
                          onContextMenu={this.setFlag(cell)}
                          className={cell.state === 0 ? "w2 h2 fl ib mb1 mr1 br1 bg-green" : "w2 h2 fl ib mb1 mr1 br1 bg-light-yellow"}
                          onClick={this.handleClick(cell)}>
                    <p className="ml2">{ mineFunction(cell) }</p>
                </div>
              })}
            <br />
            </div>
          })}
        </div>

        {this.state.blewUp
          ? <div className="dib">
            <h2 className="fw1 ml5">💥 💥 You Lose 💥 💥</h2>
            <a
              className="f6 link dim br-pill ba ph3 pv2 dib  ml6 green"
              onClick={this.again}>
                Play Again
            </a>
          </div> : null
        }
      </div>
    )
  }
})

module.exports = App
