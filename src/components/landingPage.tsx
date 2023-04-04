import { useEffect, useState } from "react";
import { fetchQuote, fetchBoards } from "../services/gravebookServices";
import Quote from "../models/quote";
import "../css/landingPage.css";
import Board from "../models/GraveBook";
import { Button } from 'react-bootstrap';
import _ from "lodash";

export interface ILandingPageProps {
  boardLists: Board[];
}

export function LandingPage(props: ILandingPageProps) {
  const [quote, setQuote] = useState<Quote[]>();
  const [boards, setBoards] = useState<Board[]>();

  //calls the quote api when the page loads then sets the quote state with the returned value
  useEffect(() => {
    let fetched = fetchQuote();

    fetched.then((y) => setQuote(y));
  }, []);

  //gets all of the boards
  useEffect(() => {
    fetchBoards().then((x) => setBoards(x));
  }, []);

  useEffect(() => {
    setBoards(props.boardLists);
  }, [props.boardLists]);

  let displayQuote = quote?.map((x) => x.quote);

 function checkBoard(){
  if(boards){
    return boards.length
  }
 }

  const pageSize = 4;
  const pageCount = boards ? Math.ceil(boards.length / pageSize) : 0;
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedPost, setPaginatedPost] = useState<Board[]>([]);
  useEffect(() => {
    setPaginatedPost(_(boards).slice(0).take(pageSize).value())
  }, [pageCount]);

  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo:number) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo - 1)* pageSize;
    const paginatedPost = _(boards).slice(startIndex).take(pageSize).value()
    setPaginatedPost(paginatedPost)
  }

  //maps all of the boards to display the data
  let cards = paginatedPost.map((board) => (
    <div className="board-card">
      <div className="imgDiv">      
        <img className="cardImg" src={board.img}></img>
      </div>
      <div className="board-info">
        <h3 className="cardName">{board.name}</h3>
        <div className="birth-death-div">
          <h5 className="cardDobDod">{`${board.dob} -`}</h5>
          <h5 className="cardDobDod">{`${board.dod}`}</h5>
        </div>
      </div>

      <Button variant="outline-success" className="viewButton">View Board</Button>
    </div>
  ));

  return (
    <div className="landingPage">
      <div className="headerImg-quote">
        <img className="headImg" src="griefimg1.jpg"></img>
        {/* displays the quote as long as it is defined */}
        <h2 className="quote"><strong>{quote !== undefined && displayQuote}</strong></h2>
      </div>
      {/* displays the boards as long as they are defined */}
      <div className="boardsDiv">{boards !== undefined && cards}</div>
      <nav className="paginationContainer">
        <ul className="pagination">
          {pages.map((page) => (
            <li className={
              page === currentPage? "page-item active"  : "page-item"
            }
            >
              <p className="page-link"
              onClick={() =>pagination(page) }>{page}</p>
              </li>
          ))}
        </ul>
      </nav>
    </div>
    
  );
}
