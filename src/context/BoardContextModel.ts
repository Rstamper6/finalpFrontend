import Board from "../models/GraveBook";
import { BoardPost } from "../models/GraveBook";
export interface BoardContextModel {
  boards: Board[];
  getBoards: () => void;
  getSingleBoard: (id: string) => void;
}
