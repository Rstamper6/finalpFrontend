import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { signOut, signInWithGoogle } from '../firebaseconfig';
import Button from 'react-bootstrap/Button';


export function SignIn () {
    const { user } = useContext(AuthContext)

  return (
    <div className="login-signup-buttons">
    <div>
    {user ? 
            <div className="signin-div">
              <div><Button variant="outline-success" style={{marginLeft: '10px'}} onClick={signOut}>Sign Out</Button></div>
            </div>  
            :
            <div>
              <Button variant="outline-success" style={{marginLeft: '10px'}} onClick={signInWithGoogle}>Sign in With Google</Button>
            </div>
          }
    </div>
  </div>
  );
}
