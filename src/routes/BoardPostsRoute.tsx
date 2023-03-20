import * as React from "react";
import Board from "../models/GraveBook";
import { useState, useEffect, useContext } from "react";
import { BoardPost } from "../models/GraveBook";
import { fetchBoard } from "../services/gravebookServices";
import { BoardPosts } from "../components/BoardPosts";
import { useParams } from "react-router-dom";
import BoardContext from "../context/BoardContext";

export function BoardPostsRoute() {
  const [boardPost, setBoardPosts] = useState<Board>();
  const { getBoards, boards } = useContext(BoardContext);

  let { id } = useParams();

  let item = boards.find((item) => item._id === id);

  useEffect(loadPosts, []);

  function loadPosts() {
    fetchBoard(item?._id).then(setBoardPosts);
  }
  return (
    <div>{boardPost !== undefined && <BoardPosts board={boardPost} />}</div>
  );
}
