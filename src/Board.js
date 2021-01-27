import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let y=0; y < this.props.nrows; y++){
      let row = [];
      for(let x=0; x < this.props.ncols; x++) {
        // This pushes true or false into the array ncols number of times
        // We are going to push rows nrows number of times determined in the parent loop
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log(coord)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell 
    flipCell(y,x);
    //and the cells around it
    flipCell(y, x+1); //Right
    flipCell(y, x-1); //Left
    flipCell(y+1, x); //Above
    flipCell(y-1, x); //Below

    //flipCell(self) and again for each of the 4 neighbors

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = false;

    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    let tblBoard = [];
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x=0; x < this.props.ncols; x++){
        let coord = `${y}-${x}`;
        //Creating a key that is the y/x coordinate of each box
        // as a string so that we can make use of it in flipCell(y, x).
        row.push(<Cell key={coord} isLit={this.state.board[y][x]} 
        flipCellsAroundMe={() => this.flipCellsAround(coord)}/>)
        //building off the logic from createBoard, we're using the T/F value 
        // from the corresponding y/x coordinates in the board array we created earlier
        // to create a Cell component with that 'isLit' value.
        // The table will be rendered as the tblBoard variable in tbody.
        //Passing in flipCellsAround from the parent to the newly created child Cell
        // Using the () => this way does create a new function each time instead of .bind()
      }
      tblBoard.push(<tr>{row}</tr>)
    }

    return (
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    )

    // TODO
  }
}


export default Board;

/* <table>
<tbody>
  <tr>
    <Cell isLit={true} />
    <Cell isLit={false} />
    <Cell isLit={true} />
  </tr>
</tbody>
</table> */