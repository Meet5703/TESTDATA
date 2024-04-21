"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NavbarByMe from "@/components/navbar";
import Image from "next/image";
import img1 from "../../assets/bgsignup.png";

const ResetPasswordPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    password: "",
    token: ""
  });

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser({ ...user, token: urlToken || "" });
  }, []);
  const onReset = async (e) => {
    e.preventDefault();
    if (!passwordPattern.test(user.password)) {
      alert(
        "Invalid password. It must contain at least 1 capital letter, 1 small letter, 1 number, 1 special character, and have a maximum length of 8 characters."
      );
      return;
    }
    try {
      const response = await axios.post("/api/users/resetpass", user);
      console.log("Password reset successfully", response);
      router.push("/login");
    } catch (error) {
      console.log("reset error", error);
      toast.error(error.message);
    }
  };
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,16}$/;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="fixed w-full z-50">
        <NavbarByMe />
      </div>

      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1  text-center hidden md:flex">
            <Image
              className="m-12 pt-16 xl:m-16 w-2/3 bg-contain bg-center bg-no-repeat bg-transparent"
              src={img1}
              alt="reset password"
              width={1000}
              height={1000}
            />
          </div>
          <div className="lg:w-1/2 xl:w-5/12 pt-40 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-[#6105bd]">
                  Reset Password
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your reset your password
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto  flex flex-col gap-4">
                  <div className="mb-4 relative flex bg-white ">
                    <input
                      name="password"
                      className="border-2 relative rounded-md peer py-4 px-2 bg-transparent  w-full focus:border-[#6105bd] focus:outline-none"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      maxLength={16}
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <button
                      onClick={handleShowPassword}
                      className="absolute right-2 top-2 inset-y-0"
                    >
                      {showPassword ? (
                        <span class="material-symbols-outlined">
                          visibility_off
                        </span>
                      ) : (
                        <span class="material-symbols-outlined">
                          visibility
                        </span>
                      )}
                    </button>
                    <label
                      htmlFor="password"
                      className={`absolute peer-focus:text-xs cursor-text bg-transparent top-5 ${
                        user.password
                          ? "hidden"
                          : " peer-focus:-top-2 peer-focus:uppercase peer-focus:tracking-[2px]  peer-focus:bg-[#6105bd] peer-focus:px-1 peer-focus:text-white left-2 text-gray-400 transition-all duration-150"
                      }
                     
                  }`}
                    >
                      Password
                    </label>
                  </div>
                  <div className="mb-4 md:flex md:space-x-12">
                    {/* Add conditional classes to change color based on password criteria */}
                    <div>
                      <div
                        className={`${
                          user.password.match(/[A-Z]/)
                            ? "text-green-500"
                            : "text-red-500"
                        } mr-1 flex items-center`}
                      >
                        <span
                          className={`material-symbols-outlined  ${
                            user.password.match(/[A-Z]/)
                              ? "scale-75"
                              : "scale-0"
                          }`}
                        >
                          check_circle
                        </span>
                        1 uppercase letter
                      </div>
                      <div
                        className={`${
                          user.password.match(/[a-z]/)
                            ? "text-green-500"
                            : "text-red-500"
                        } mr-1`}
                      >
                        <span
                          className={`material-symbols-outlined  ${
                            user.password.match(/[a-z]/)
                              ? "scale-75"
                              : "scale-0"
                          }`}
                        >
                          check_circle
                        </span>
                        1 lowercase letter
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${
                          user.password.match(/[0-9]/)
                            ? "text-green-500"
                            : "text-red-500"
                        } mr-1`}
                      >
                        {" "}
                        <span
                          className={`material-symbols-outlined  ${
                            user.password.match(/[0-9]/)
                              ? "scale-75"
                              : "scale-0"
                          }`}
                        >
                          check_circle
                        </span>
                        1 number
                      </div>
                      <div
                        className={`${
                          user.password.match(/[!@#$%^&*]/)
                            ? "text-green-500"
                            : "text-red-500"
                        } mr-1`}
                      >
                        <span
                          className={`material-symbols-outlined  ${
                            user.password.match(/[!@#$%^&*]/)
                              ? "scale-75"
                              : "scale-0"
                          }`}
                        >
                          check_circle
                        </span>
                        1 special character
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onReset}
                    className="mt-5 tracking-wide font-semibold bg-[#6105bd] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span class="material-symbols-outlined bg-transparent">
                      published_with_changes
                    </span>
                    <span className="ml-3 bg-transparent">Reset Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
