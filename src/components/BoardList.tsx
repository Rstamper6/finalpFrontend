import { useState } from "react";
import { Board } from "../models/board";
import { CreateBoard } from "./CreateBoard";
import ImageUploader from "./ImageUploader";

function BoardList() {
  const [boards, setBoards] = useState<Board[]>([]);

  function addBoard(board: Board) {
    setBoards([...boards, board]);
  }

  return (
    <div className="ContactList">
      <CreateBoard addBoard={addBoard} />
      <ImageUploader />
    </div>
  );
}

export default BoardList;
