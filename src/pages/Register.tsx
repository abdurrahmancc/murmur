import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import axiosPrivet from "../hooks/axiosPrivet";
import Cookies from "js-cookie";
import { accessToken } from "../hooks/useCookies";

const Register = () => {
    const location = useLocation();
    const [isRegister, setIsRegister] = useState(false);
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigator = useNavigate();


    const onSubmit = async (data) => {
        try {
            setIsRegister(true);
            const response = await axiosPrivet.post(`/user/register`, data);
            if (response.status == 201 && response?.data?.token) {
                Cookies.set(accessToken, response.data.token);
                navigator(from, { replace: true });
            }
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
        } finally {
            setIsRegister(false);
        }
    };

    const password = watch("password");

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-300">
            <div className="w-full max-w-md bg-black text-black shadow-2xl p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/*================ first Name ================ */}
                    <div>
                        <label className="label">
                            <span className="label-text text-white">First Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your first name"
                            className="input input-bordered w-full text-white border-gray-300"
                            {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && <p className="text-error text-sm">{errors?.firstName?.message as String}</p>}
                    </div>
                    {/*================ last Name ================ */}
                    <div>
                        <label className="label">
                            <span className="label-text text-white">Last Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your last name"
                            className="input input-bordered w-full text-white border-gray-300"
                            {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && <p className="text-error text-sm">{errors?.lastName?.message as String}</p>}
                    </div>

                    {/*================  Email ================ */}
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
                        {errors.email && <p className="text-error text-sm">{errors.email.message as String}</p>}
                    </div>

                    {/*================  Password ================ */}
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
                        {errors?.password && <p className="text-error text-sm">{errors?.password?.message as String}</p>}
                    </div>

                    {/*================  Confirm Password ================ */}
                    <div>
                        <label className="label">
                            <span className="label-text text-white">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="input input-bordered w-full text-white border-gray-300"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === password || "Passwords do not match",
                            })}
                        />
                        {errors?.confirmPassword && (
                            <p className="text-error text-sm">{errors?.confirmPassword?.message as String}</p>
                        )}
                    </div>
                    {isRegister ? (
                        <button type="submit" className="btn bg-white text-black w-full">
                            <span className="btn-loading inline-block"></span>
                        </button>
                    ) : (
                        <button type="submit" className="btn bg-white text-black w-full">
                            <span>Create Account</span>
                        </button>                       
                    )}
                </form>
                <p className="mt-4 text-center text-sm text-white">
                    Already have an account?{" "}
                    <Link to="/Login" className="text-blue-500 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
