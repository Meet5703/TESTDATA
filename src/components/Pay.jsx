// Pay.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Pay = () => {
  const router = useRouter();

  const [btnDisabled, setIsBtnDisabled] = useState(false);
  const [applycode, setApplycode] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: "",
    courses: [],
    status: "failed",
    price: 0,
    coupenCode: ""
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleBtnDisabled = () => {
    if (user.courses.length > 0) {
      setIsBtnDisabled(!btnDisabled);
    }
  };
  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/profile");
      console.log("User details response:", response.data.user); // Log response data
      setUser({
        ...user,
        username: response.data.user.username,
        email: response.data.user.email,
        courses: response.data.user.courses,
        number: response.data.user.number,
        price: response.data.user.price,
        coupenCode: response.data.user.coupenCode
      });
      if (!response) {
        router.push("/login");
      } else if (user.number >= 10 && user.courses.length > 0) {
        setIsBtnDisabled(true);
      } else {
        setIsBtnDisabled(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUserProfile = async (e) => {
    try {
      // Update user profile
      await axios.post("/api/users/payment", user);
      console.log("User profile updated successfully.");
      if (!user) {
        e.preventDefault();
        console.log("User data is not available.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error.message);
      // Handle user profile update error
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const makePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User data is not available.");
      return;
    }

    const transactionId = "Tr-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: "M22SOKFPZOLXL",
      merchantTransactionId: transactionId,
      merchantUserId: user.sub, // Use user's unique identifier
      amount: user.price,
      redirectUrl: `https://dataskillshub.com/api/status/${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `https://dataskillshub.com/api/status/${transactionId}`,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");

    const fullURL =
      dataBase64 + "/pg/v1/pay" + "b73bd309-e957-486b-901f-e4e0fd84b277";
    const dataSha256 = sha256(fullURL);
    const checksum = dataSha256 + "###" + "1";

    const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
        { request: dataBase64 },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum
          }
        }
      );

      console.log("Payment response:", response.data.data.instrumentResponse);
      await updateUserProfile();
      console.log("User profile updated successfully.", user);
      const redirectUrl =
        response.data.data.instrumentResponse.redirectInfo.url;
      router.push(redirectUrl);
    } catch (error) {
      console.error("Payment error:", error.message);
      // Handle payment error
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST">
          <div className="mb-4 bg-white relative flex">
            <input
              name="name"
              className="border-2 rounded-md peer py-4 px-2 bg-transparent  w-full focus:border-[#6105bd] focus:outline-none"
              id="name"
              type="text"
              required
              value={user.username}
            />
            <label
              htmlFor="name"
              className={`absolute cursor-text bg-transparent top-5 ${
                user.username
                  ? "hidden"
                  : "peer-focus:text-xs peer-focus:-top-2 peer-focus:uppercase peer-focus:tracking-[2px]  peer-focus:bg-[#6105bd] peer-focus:px-1 peer-focus:text-white left-2 text-gray-400 transition-all duration-150"
              }`}
            >
              Name
            </label>
          </div>
          <div className="mb-4 bg-white relative flex">
            <input
              name="email"
              className="border-2 rounded-md peer py-4 px-2 bg-transparent  w-full focus:border-[#6105bd] focus:outline-none"
              id="email"
              type="text"
              required
              value={user.email}
            />
            <label
              htmlFor="email"
              className={`absolute cursor-text bg-transparent top-5 ${
                user.email
                  ? "hidden"
                  : "peer-focus:text-xs peer-focus:-top-2 peer-focus:uppercase peer-focus:tracking-[2px]  peer-focus:bg-[#6105bd] peer-focus:px-1 peer-focus:text-white left-2 text-gray-400 transition-all duration-150"
              }`}
            >
              Email
            </label>
          </div>
          <div className="mb-4 bg-white relative flex">
            <input
              name="number"
              className="border-2 rounded-md peer py-4 px-2 bg-transparent  w-full focus:border-[#6105bd] focus:outline-none"
              id="number"
              type="text"
              required
              value={user.number}
            />
            <label
              htmlFor="number"
              className={`absolute cursor-text bg-transparent top-5 ${
                user.number
                  ? "hidden"
                  : "peer-focus:text-xs peer-focus:-top-2 peer-focus:uppercase peer-focus:tracking-[2px]  peer-focus:bg-[#6105bd] peer-focus:px-1 peer-focus:text-white left-2 text-gray-400 transition-all duration-150"
              }`}
            >
              Number
            </label>
          </div>
          <div>
            <div className="mt-2">
              <select
                id="courses"
                name="courses"
                onChange={onChange}
                className="w-full  py-4 text-lg border  rounded-md focus:outline-none focus:border-[#6105bd] bg-white sm:text-sm"
                value={user.courses} // Set the value attribute to user.courses
              >
                <option
                  className="w-full h-full"
                  value={"select an option"}
                  selected
                >
                  select an option
                </option>
                <option
                  className="w-full h-full"
                  value="Data Science & Generative AI"
                  selected={user.courses.includes(
                    "Data Science & Generative AI"
                  )}
                >
                  Data Science & Generative AI
                </option>

                {/* Add other options here */}
              </select>
            </div>
            <div className="mt-6 bg-white relative flex">
              <input
                name="coupenCode"
                className="border-2 rounded-md peer py-4 px-2 bg-transparent  w-full focus:border-[#6105bd] focus:outline-none"
                id="coupenCode"
                type="text"
                onChange={onChange}
                value={user.coupenCode}
              />
              <label
                htmlFor="coupenCode"
                className={`absolute cursor-text bg-transparent top-5 ${
                  user.coupenCode
                    ? "hidden"
                    : "peer-focus:text-xs peer-focus:-top-2 peer-focus:uppercase peer-focus:tracking-[2px]  peer-focus:bg-[#6105bd] peer-focus:px-1 peer-focus:text-white left-2 text-gray-400 transition-all duration-150"
                }`}
              >
                Coupens
              </label>
              <span
                className="text-red-500"
                value={
                  user.coupenCode == ""
                    ? (user.price = 300)
                    : user.coupenCode == "JS30"
                    ? (user.price = 200)
                    : user.coupenCode == "PP20"
                    ? (user.price = 100)
                    : (user.price = 300)
                }
                onChange={onChange}
              >
                Price :{" "}
                {user.coupenCode == "JS30"
                  ? (user.price = 200)
                  : user.coupenCode == "PP20"
                  ? (user.price = 100)
                  : (user.price = 300)}
              </span>
            </div>
          </div>

          <div>
            <button
              disabled={handleBtnDisabled == true ? true : false}
              type="submit"
              onClick={(e) => makePayment(e)}
              className="flex w-full justify-center disabled:bg-[#b980f1] rounded-md bg-[#6105bd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#aa54ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6105bd]"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Pay;
