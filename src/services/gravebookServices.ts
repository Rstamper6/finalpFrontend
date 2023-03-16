import Board from "../models/GraveBook";
import axios from "axios";
import Quotes from '../models/quote';
import { BoardPost } from '../models/GraveBook';

const baseUrl = "https://us-central1-finalproject-8c02e.cloudfunctions.net/api";
const quoteUrl = 'https://api.api-ninjas.com/v1/quotes'
const quoteKey = '7hP4Kwh2LKxzcqQoOOtUrQ==Ha0S2CjhbCMLF1gs'
let category = 'hope'
let limit = 1

export function fetchBoards():Promise<Board[]> {
  return axios.get<Board[]>(`${baseUrl}/boards`)
  .then(res => res.data)
}
export function fetchBoard(id: string | undefined):Promise<Board> {
  // const id = ''
  return axios.get<Board>(`${baseUrl}/boards/${id}`)
  .then(res => res.data)
}

export function addBoard(board:Board):Promise<Board> {
  return axios.post<Board>(`${baseUrl}/boards`, board).then(res => res.data);
}


export function addBoardPost(id: string | undefined, post:BoardPost | undefined):Promise<BoardPost>{
  const posti = {
    from: post?.from,
    text: post?.text
  }
  return axios.put<BoardPost>(`${baseUrl}/boards/${id}`, posti)
    .then(res =>res.data)
}
// export function addBoardPost(id: string | undefined, post: BoardPost):Promise<BoardPost>{
//   return axios.put<BoardPost>(`${baseUrl}/boards/${id}`, post).then(res =>res.data)
// }

export function fetchQuote():Promise<Quotes[]> {
    const config = {
      params: {category, limit},
      headers: {'X-Api-Key': quoteKey}
	  };
    return axios
    .get<Quotes[]>(quoteUrl, config)
    .then(res => res.data)
}
