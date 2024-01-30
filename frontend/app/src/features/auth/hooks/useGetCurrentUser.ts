import { useAuth } from "providers/useAuthProvider";
import getCurrentUserApi from "../api/currentUserApi";

const useGetCurrentUser = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();

  const handelGetCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUserApi();
      if (res.data.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res.data.currentUser);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return { handelGetCurrentUser };
};
export default useGetCurrentUser;
