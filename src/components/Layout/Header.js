import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { setUser } from '../../store/userSlice';
import { getUserProfile } from "../../api/internal";
function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.auth);
  const userRole = useSelector((state) => state.user.role);
  const profilePicture = useSelector((state) => state.user.profilePicturePath);
  const user = useSelector((state) => state.user);
  const name = useSelector((state) => state.user.name);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(user.accessToken, user._id);
        const profile = response.data;
        console.log('Fetched Profile:', profile);
        dispatch(setUser({
          _id: profile._id,
          name: profile.name,
          profilePicturePath: profile.profilePicturePath,
          auth: true
        }));
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    if (user.auth) {
      fetchProfile();
    }
  }, [user.auth, dispatch, user.accessToken, user._id]);

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };



  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to={userRole === "admin" ? "/admin-dashboard" : "/student-dashboard"}
              className="text-white text-xl font-bold"
            >
              AMS
            </Link>
          </div>
          <div className="text-white text-xl font-bold text-center flex justify-center items-center">
            <h1>{name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={userRole === "admin" ? "/admin-dashboard" : "/student-dashboard"}
                  className="text-white hover:text-gray-300"
                >
                  Dashboard
                </Link>
                <Link to="/update-profile" className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                </Link>

                <button
                  onClick={handleSignout}
                  className="text-white hover:text-gray-300 ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
