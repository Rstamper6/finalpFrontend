import { useEffect, useState } from "react";
import { fetchQuote, fetchBoards } from "../services/gravebookServices";
import Quote from "../models/quote";
import "../css/landingPage.css";
import Board from "../models/GraveBook";
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

  //maps all of the boards to display the data
  let cards = boards?.map((board) => (
    <div className="board-card">
      <div className="imgDiv">      
        <img className="cardImg" src={board.img}></img>
      </div>
      <h3 className="cardName">{board.name}</h3>
      <div className="birth-death-div">
        <h5 className="cardDobDod">{`${board.dob} -`}</h5>
        <h5 className="cardDobDod">{`${board.dod}`}</h5>
      </div>
      <button className="viewButton">View Board</button>
    </div>
  ));

  return (
    <div className="landingPage">
      <div className="headerImg-quote">
        <img className="headImg" src="bgimg2.jpg"></img>
        {/* displays the quote as long as it is defined */}
        <h2 className="quote">{quote !== undefined && displayQuote}</h2>
      </div>
      {/* displays the boards as long as they are defined */}
      <div className="boardsDiv">{boards !== undefined && cards}</div>
    </div>
  );
}
