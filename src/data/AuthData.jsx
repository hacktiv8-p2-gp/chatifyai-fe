import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const useAuthStore = create(
  immer((set) => ({
    currentUser: null,

    login: async (email, password) => {
      return await signInWithEmailAndPassword(auth, email, password);
    },

    register: async (email, password) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    },

    loginGoogle: async () => {
      const provider = new GoogleAuthProvider();

      return await signInWithPopup(auth, provider);
    },

    loginGithub: async () => {
      const provider = new GithubAuthProvider();
      return await signInWithPopup(auth, provider);
    },

    setCurrentUser: (user) =>
      set((state) => {
        state.currentUser = user;
      }),
    clearUser: () =>
      set((state) => {
        state.currentUser = null;
      }),
  }))
);

export default useAuthStore;
