import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, signInAnonymously,onAuthStateChanged} from "firebase/auth";
import Cookies from 'universal-cookie';

const firebaseConfig = {
  apiKey: "AIzaSyD-EgPx9HPgmaa-tNrkaemiG_rL_3HxmRg",
  authDomain: "chatapp-d3313.firebaseapp.com",
  projectId: "chatapp-d3313",
  storageBucket: "chatapp-d3313.appspot.com",
  messagingSenderId: "858996075080",
  appId: "1:858996075080:web:61c37496e9a7917b8e067d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export const db=getFirestore(app);

// export const signInAnonymouslyIfNeeded = async () => {
//   console.log(auth.currentUser);
//   if (!auth.currentUser) {
//     try {
//       await signInAnonymously(auth);
//       console.log("Anonymous user signed in:", auth.currentUser);
//     } catch (error) {
//       console.error("Error signing in anonymously:", error);
//     }
//   } else {
//     console.log("User is already authenticated:", auth.currentUser);
//   }
  
//   return auth;
// };
export const signInAnonymouslyIfNeeded = async () => {

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to avoid memory leaks

      if (user) {
        console.log("User is already authenticated:", user);
        resolve(auth);
      } else {
        signInAnonymously(auth)
          .then(() => {
            console.log("Anonymous user signed in:", auth.currentUser);
            resolve(auth);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
            reject(error);
          });
      }
    });
  });
};