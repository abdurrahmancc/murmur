import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import axiosPrivet from "../hooks/axiosPrivet";
import { accessToken } from "../hooks/useCookies";


const Login = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const navigator = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    /*================ submit form start ================*/
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        try {
            setIsLogin(true);
            const { data: result } = await axiosPrivet.post("/user/login", { email, password });
            Cookies.set(accessToken, result.token);
            navigate(from, { replace: true });
            
        } catch (error) {
            console.log("error.message", error.message);
            toast.error("Login failed! Please try again", { autoClose: 1000 });
        }finally{
            setIsLogin(false);
        }
    };
    /*================ submit form end ================*/



    return (
        <div className="min-h-screen flex items-center justify-center bg-base-300">
            <div className="w-full max-w-md bg-black text-black shadow-2xl p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/*================ Email ================*/}
                    <div>
                        <label className="label">
                            <span className="label-text text-white">Email Address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="input input-bordered w-full text-white border-gray-300"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors?.email && (
                            <p className="text-error text-sm">{errors?.email?.message as string}</p>
                        )}
                    </div>

                    {/*================ Password ================*/}
                    <div>
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="input input-bordered w-full text-white border-gray-300"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors?.password && (
                            <p className="text-error text-sm">{errors?.password?.message as string}</p>
                        )}
                    </div>

                    {/*================ Submit Button ================*/}
                    <button type="submit" className="btn bg-white text-black w-full">
                        {isLogin ? (
                            <span className="btn-loading inline-block"></span>
                        ) : (
                            <span>Login</span>
                        )}
                    </button>
                </form>

                {/*================ Optional Link ================*/}
                <p className="mt-4 text-center text-sm text-white">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
