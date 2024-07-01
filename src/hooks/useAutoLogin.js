import { useState, useEffect } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { api } from "../api/internal";
function useAutoLogin() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await api.post('/refresh')

        if (response.status === 200) {
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        console.error('AutoLogin error: ', error)
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return loading;
}

export default useAutoLogin;
