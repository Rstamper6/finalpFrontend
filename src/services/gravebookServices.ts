import Board from "../models/GraveBook";
import axios from "axios";
import Quotes from "../models/quote";
import { BoardPost } from "../models/GraveBook";

const baseUrl = "https://us-central1-finalproject-8c02e.cloudfunctions.net/api";
const quoteUrl = "https://api.api-ninjas.com/v1/quotes";
const quoteKey = "7hP4Kwh2LKxzcqQoOOtUrQ==Ha0S2CjhbCMLF1gs";
let category = "car";
let limit = 1;

export function fetchBoards(): Promise<Board[]> {
  //gets all boards from the API
  return axios.get<Board[]>(`${baseUrl}/boards`).then((res) => res.data);
}
export function fetchBoard(id: string | undefined): Promise<Board> {
  //gets a single board based on the ID
  return axios.get<Board>(`${baseUrl}/boards/${id}`).then((res) => res.data);
}

export function addBoard(board: Board): Promise<Board> {
  //adds a board
  return axios.post<Board>(`${baseUrl}/boards`, board).then((res) => res.data);
}

export function fetchBoardPosts(id: string | undefined) {
  //gets the board posts associated with an ID
  return axios
    .get(`${baseUrl}/boards/boardposts/${id}`)
    .then((res) => res.data);
}
export function addBoardPost(
  id: string | undefined,
  post: BoardPost
): Promise<BoardPost> {
  //adds a post
  return axios
    .post<BoardPost>(`${baseUrl}/boards/boardposts/${id}`, post)
    .then((res) => res.data);
}

export function fetchQuote(): Promise<Quotes[]> {
  //gets a quote from the quote API to display on the home page
  const config = {
    params: { category },
    //the API key is required in the header of the api call
    headers: { "X-Api-Key": quoteKey },
  };
  return axios.get<Quotes[]>(quoteUrl, config).then((res) => res.data);
}

export async function getBoardData(boardSearch: any) {
  let result = axios.get<Board[]>(
    `${baseUrl}/boards/boards/${boardSearch}`,
    {}
  );
  console.log(result);
  return result;
}

export function fetchUserData(id: string | undefined) {
  //gets a single board based on the ID
  return axios.get(`${baseUrl}/boards/boardposts/byuser/${id}`).then((res) => res.data);
}
