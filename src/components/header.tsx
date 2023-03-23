import "../css/header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getBoardData } from "../services/gravebookServices";

interface IHeaderProps {
  UpdateBoards: Function;
}

export function Header(props: IHeaderProps) {
  const [boardlists, setBoardLists] = useState<string>("");
  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const result = data.get("searchBarInput")?.toString() || "";
    getBoardData(boardlists).then((response) =>
      props.UpdateBoards(response.data)
    );
    console.log(boardlists);
  };

  return (
    <div className="header">
      <div>
        <Link to="/boards">Boards</Link>
        <Link to="/">Home</Link>
        <button>Boards</button>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <label>Search</label>
          <input
            type="text"
            name="searchBarInput"
            placeholder="Search name here"
            id="searchBarInput"
            onChange={(e) => setBoardLists(e.target.value)}
          ></input>
          <button type="submit">search</button>
        </form>
      </div>
      <div className="login-signup-buttons">
        <div>
          <button>Login</button>
        </div>
        <div>
          <button>Sign up</button>
        </div>
      </div>
    </div>
  );
}
