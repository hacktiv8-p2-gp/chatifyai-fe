import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

const useAuthStore = create(
  immer((set) => ({
    currentUser: null,

    login: async (email, password) => {
      const user = await signInWithEmailAndPassword(auth, email, password);
      set((state) => {
        state.currentUser = user;
      });
      return user;
    },

    register: async (email, password) => {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      set((state) => {
        state.currentUser = user;
      });
      return user;
    },

    loginGoogle: async () => {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      set((state) => {
        state.currentUser = user;
      });
      return user;
    },

    loginGithub: async () => {
      const provider = new GithubAuthProvider();
      const user = await signInWithPopup(auth, provider);
      set((state) => {
        state.currentUser = user;
      });
      return user;
    },

    setCurrentUser: (user) => {
      set((state) => {
        state.currentUser = user;
      });
      return user;
    },

    clearUser: async () => {
      await signOut(auth);
      set((state) => {
        state.currentUser = null;
      });
    },
  }))
);

export default useAuthStore;
