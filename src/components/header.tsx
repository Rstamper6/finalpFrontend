import "../css/header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="header">
      <div>
        <Link to="/boards">Boards</Link>
        <Link to="/">Home</Link>
        <button>Boards</button>
      </div>
      <div>
        <label>Search</label>
        <input type="text"></input>
        <button>search</button>
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
