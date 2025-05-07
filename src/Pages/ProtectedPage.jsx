import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import useAuthStore from "../data/AuthData";
import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "../components/Spinner";
import Swal from "sweetalert2";
export default function ProtectedPage() {
  const navigate = useNavigate();

  const { setCurrentUser, clearUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        clearUser();

        Swal.fire({
          title: "Huh!",
          text: "You'r session has expired!",
          icon: "error",
        });

        navigate("/login");
      }

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Outlet />;
}
