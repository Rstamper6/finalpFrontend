import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { signOut, signInWithGoogle } from '../firebaseconfig';


export function SignIn () {
    const { user } = useContext(AuthContext)

  return (
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
  );
}
