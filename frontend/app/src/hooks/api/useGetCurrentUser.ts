import { useAuth } from "hooks/providers/useAuthProvider";
import { getCurrentUser } from "lib/api/auth";

const useGetCurrentUser = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();

  const handelGetCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
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
