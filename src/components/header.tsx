import "../css/header.css"

export function Header () {
  return (
    <div className='header'>
        <div>
            <button>Boards</button>
        </div>
        <div>
            <label>Search</label>
            <input type='text'></input>
            <button>search</button>
        </div>
        <div className="login-signup-buttons">
            <div><button>Login</button></div>
            <div><button>Sign up</button></div>
        </div>
      
    </div>
  );
}
