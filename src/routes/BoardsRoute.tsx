import { useState, useEffect, useContext } from "react";
import { BoardsList } from "../components/BoardsList";
import Board from "../models/GraveBook";
import { fetchBoards } from "../services/gravebookServices";
import { BoardForm } from "../components/addBoardForm";
import BoardContext from "../context/BoardContext";

export default function BoardsRoute() {
  const { getBoards, boards } = useContext(BoardContext);

  useEffect(getBoards, []);

  return (
    <div>
      <BoardForm />
      <BoardsList boards={boards} />
    </div>
  );
}
