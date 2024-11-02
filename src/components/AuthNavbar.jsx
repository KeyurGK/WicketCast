import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthNavbar = () => {
  const navigate = useNavigate();
    const [accStatus, setAccStatus] = useState(false);
    
  useEffect(() => {
    if (accStatus && window.location.pathname !== "/home") {
      navigate("/home"); // Navigate after login
    } else if (!accStatus && window.location.pathname !== "/") {
      navigate("/"); // Navigate to the landing page after logout
    }
  }, [accStatus, navigate]);

  const googleLogin = useGoogleLogin({
      onSuccess: (response) => {
          console.log(response)
          localStorage.setItem("access_token",response.access_token)
      setAccStatus(true); // Update account status to logged in
    },
    onError: () => {
      console.log("Login failed");
    },
  });

  const handleLogout = () => {
    googleLogout();
    setAccStatus(false); // Update account status to logged out
  };

  return (
    <div className="w-full flex justify-between items-center p-1 lg:p-2">
      <h1>
        Wicket<span className="text-blue-600">Cast</span>
      </h1>
      {accStatus ? (
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white text-xs p-2 rounded hover:text-blue-600 hover:bg-white hover:border border-blue-600"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => googleLogin()}
          className="bg-blue-600 text-white text-xs p-2 rounded hover:text-blue-600 hover:bg-white hover:border border-blue-600"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default AuthNavbar;



