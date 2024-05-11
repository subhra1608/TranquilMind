import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, signInAnonymously,onAuthStateChanged} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Cookies from 'universal-cookie';


const firebaseConfig = {
  apiKey: "AIzaSyDRGTTN4tF2qo3HVQj8xOG8WNpBfg1tEEM",
  authDomain: "onemoredemo-3a29b.firebaseapp.com",
  projectId: "onemoredemo-3a29b",
  storageBucket: "onemoredemo-3a29b.appspot.com",
  messagingSenderId: "464847659710",
  appId: "1:464847659710:web:deec45927c07dcc37bb4ef"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
// export const auth = getAuth(app);
// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

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
// export const signInAnonymouslyIfNeeded = async () => {

//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe(); // Unsubscribe to avoid memory leaks
//       console.log(unsubscribe);
//       if (user) {
//         console.log("User is already authenticated:", user);
//         resolve(auth);
//       } else {
//         signInAnonymously(auth)
//           .then(() => {
//             console.log("Anonymous user signed in:", auth.currentUser);
//             resolve(auth);
//           })
//           .catch((error) => {
//             console.error("Error signing in anonymously:", error);
//             reject(error);
//           });
//       }
//     });
//   });
// };
export const signInAnonymouslyIfNeeded = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to avoid memory leaks
      console.log(unsubscribe);
      if (user) {
        // console.log("User is already authenticated:", user);
        resolve(auth);
      } else {
        signInAnonymously(auth)
          .then(() => {
            // console.log("Anonymous user signed in:", auth.currentUser);
            resolve(auth);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
            reject(error);
          });
      }
    });

    // Handle the case where the initial authentication state check takes too long
    setTimeout(() => {
      unsubscribe(); // Unsubscribe if the check takes too long
      // console.log("Initial authentication state check timed out");
      signInAnonymously(auth)
        .then(() => {
          // console.log("Anonymous user signed in:", auth.currentUser);
          resolve(auth);
        })
        .catch((error) => {
          console.error("Error signing in anonymously:", error);
          reject(error);
        });
    }, 5000); // Adjust the timeout duration as needed
  });
};