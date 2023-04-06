import { useEffect, useContext } from "react";
import { BoardsList } from "../components/BoardsList";
import { BoardForm } from "../components/addBoardForm";
import BoardContext from "../context/BoardContext";
import '../css/boardsRoute.css'
import { Button } from "react-bootstrap";

export default function BoardsRoute() {
  const { getBoards, boards } = useContext(BoardContext);

  //use the get boards function from the context when the page loads
  useEffect(getBoards, []);

  return (
    <div className="BoardsRoute">
      {/* displays the board form */}
      <div className="boardForm-div">
      <BoardForm />
      </div>
      {/* displays the all of the boards and passes the data to the boardsList component through props */}
      <div className="boardList-div">
        <BoardsList boards={boards} />
      </div>
    </div>
  );
}
