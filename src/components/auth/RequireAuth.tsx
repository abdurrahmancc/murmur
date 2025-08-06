import React, { useEffect, useState } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { accessToken, removeCookie } from "../../hooks/useCookies";
import axiosPrivet from "../../hooks/axiosPrivet";
import Loading from "../shared/Loading";


const RequireAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosPrivet.get("/user/me");
        setUser(data);
      } catch (error) {
        console.error("User fetch failed", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    removeCookie(accessToken);
  };

  if (loading) return <Loading />;

  if (!user) {
    handleSignOut();
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }


  return <Outlet />;
};

export default RequireAuth;
