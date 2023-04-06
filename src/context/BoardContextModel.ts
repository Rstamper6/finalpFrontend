import Board from "../models/GraveBook";

export interface BoardContextModel {
  boards: Board[];
  getBoards: () => void;
  getSingleBoard: (id: string) => void;
}
