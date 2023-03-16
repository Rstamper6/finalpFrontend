import { createContext } from "react";
import Board from '../models/GraveBook';
import { BoardContextModel } from './BoardContextModel';

const defaultValue: BoardContextModel =  {
    boards: [],
    getBoards: () => {},
    getSingleBoard: (id:string) => {}
}

const boardContext = createContext(defaultValue)

export default boardContext;