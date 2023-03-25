import { useEffect, useContext } from "react";
import { BoardsList } from "../components/BoardsList";
import { BoardForm } from "../components/addBoardForm";
import BoardContext from "../context/BoardContext";

export default function BoardsRoute() {
  const { getBoards, boards } = useContext(BoardContext);

  //use the get boards function from the context when the page loads
  useEffect(getBoards, []);

  return (
    <div>
      {/* displays the board form */}
      <BoardForm />
      {/* displays the all of the boards and passes the data to the boardsList component through props */}
      <BoardsList boards={boards} />
    </div>
  );
}
