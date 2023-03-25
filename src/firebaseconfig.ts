import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfrDJJ4q23FGK-o2yNE6GYqI88dKfDmG0",
    authDomain: "finalproject-8c02e.firebaseapp.com",
    projectId: "finalproject-8c02e",
    storageBucket: "finalproject-8c02e.appspot.com",
    messagingSenderId: "667033660471",
    appId: "1:667033660471:web:b5373cf1be9a945fb723b2"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  const authProvider = new GoogleAuthProvider();

  export function signInWithGoogle(): void {
    signInWithPopup(auth, authProvider)
  }

  export function signOut(): void {
    auth.signOut();
  }