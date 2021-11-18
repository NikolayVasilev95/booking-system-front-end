import { auth, firebase } from "./firebaseInitializer";

export async function firebaseFacebookAuth() {
  return await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
}

export async function firebaseGoogleAuth() {
  return await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}