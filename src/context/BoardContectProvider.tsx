import { ReactNode, useState } from "react";
import Board from "../models/GraveBook";
import { fetchBoards, fetchBoard } from "../services/gravebookServices";
import BoardContext from "./BoardContext";

export interface IBoardContextProviderProps {
  children: ReactNode;
}

const BoardContextProvider = ({ children }: IBoardContextProviderProps) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [board, setBoard] = useState<Board>();

  const getBoards = () => {
    fetchBoards().then(setBoards);
  };
  const getSingleBoard = (id: string) => {
    fetchBoard(id).then(setBoard);
  };
  return (
    <BoardContext.Provider
      value={{
        boards: boards,
        getBoards: getBoards,
        getSingleBoard: getSingleBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
