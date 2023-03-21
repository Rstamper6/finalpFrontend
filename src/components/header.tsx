import "../css/header.css";
import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from '../firebaseconfig';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

export function Header() {
  const { user } = useContext(AuthContext)
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
          {
            user ? 
            <div>
              <p>welcome {user.displayName}</p>
              <button onClick={signOut}>Sign Out</button>
            </div>  :
            <div>
              <button onClick={signInWithGoogle}>Sign in With Google</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
