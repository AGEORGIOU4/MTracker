import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Google Sign-in function
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Retrieved signed-in user
    return user;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

// Sign-out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User successfully signed out.");
  } catch (error: any) {
    console.error("Sign-Out Error:", error.message);
    throw error;
  }
};
