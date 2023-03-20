import { useEffect, useState } from 'react';
import { fetchQuote, fetchBoards } from '../services/gravebookServices';
import Quote from '../models/quote';
import '../css/landingPage.css'
import Board from '../models/GraveBook';
export interface ILandingPageProps {
}

export function LandingPage (props: ILandingPageProps) {
    const [quote, setQuote] = useState<Quote[]>();
    const [boards, setBoards]= useState<Board[]>()

    useEffect(() => {
      let fetched = fetchQuote()

      fetched.then((y) => setQuote(y))
      
    }, [])

    useEffect(() => {
      fetchBoards().then((x) => setBoards(x))
    }, [])

    let displayQuote = quote?.map((x) => x.quote)

    let cards = boards?.map((board) =>
      <div className='board-card'>
        <img className='cardImg' src={board.img}></img>
        <h3 className='cardName'>{board.name}</h3>
        <div className='birth-death-div'>
          <h5 className='cardDobDod'>{`${board.dob} -`}</h5>
          <h5 className='cardDobDod'>{`${board.dod}`}</h5>
        </div>
        <button className='viewButton'>View Board</button>
      </div>
    )

  return (
    <div className='landingPage'>
      <div className='headerImg-quote'>
        <img className='headImg' src='bgimg2.jpg'></img>

        <h2 className='quote'>{quote !== undefined && displayQuote}</h2>
      </div>
      <div className='boardsDiv'>
        {boards !== undefined && cards}
      </div>
    </div>
  );
}
