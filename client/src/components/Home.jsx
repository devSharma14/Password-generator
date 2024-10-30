import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const toastDisplayed = useRef(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:4000/auth/",
          {},
          { withCredentials: true }
        );

        const { status, user } = data;
        if (status) {
          setUsername(user);
          if (!toastDisplayed.current) {
            toast(`Hello ${user}`, {
              position: "top-right",
            });
            toastDisplayed.current = true;
          }
          navigate("/home");
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        toast.error("An error occurred during verification.");
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const Logout = async () => {
    try {
      await axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true });
      removeCookie("token");
      setUsername("");
      toastDisplayed.current = false;
      navigate("/login");

      // refreshing the page so that new user can login
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("An error occurred during logout.");
    }
  };
  
  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
