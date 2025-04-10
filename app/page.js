"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

// 1. Create the Zod schema
const zodSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z
      .string()
      .min(10, "Phone number is required")
      .max(11, "Phone number max length 11"),
    streetAddress: z.string().min(1, "Street address required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(5, "Zip code is required"),
    userName: z.string().min(4, "User name minimum length 4"),
    password: z.string().min(6, "Password is required"),
    confirmPass: z
      .string()
      .min(6, "Confirm Password is required")
      .refine((val) => !!val, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPass, {
    path: ["confirmPass"],
    message: "Passwords do not match",
  });

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    Swal.fire({
      title: "Good job!",
      text: "Account create completed",
      icon: "success",
    });
  };

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (stepOne) {
      setStepOne(false);
      return setStepTwo(true);
    } else if (stepTwo) {
      setStepTwo(false);
      return setStepThree(true);
    }
  };

  const handlePrev = () => {
    if (stepThree) {
      setStepThree(false);
      return setStepTwo(true);
    } else if (stepTwo) {
      setStepTwo(false);
      return setStepOne(true);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-[100vh] text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-700 w-[40%] p-5 rounded-lg space-y-4"
      >
        {stepOne && (
          <>
            <h2 className="text-2xl font-bold text-center mb-5">
              Personal Information
            </h2>
            <div>
              <h2 className="font-medium mb-1">Full Name</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("fullName")}
                placeholder="ex: Tanjil"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-medium mb-1">Email</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("email")}
                type="email"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-medium mb-1">Phone Number</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("phoneNumber")}
                type="text"
                placeholder="+88"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </>
        )}

        {stepTwo && (
          <>
            <h2 className="text-2xl font-bold text-center mb-5">
              Address Details
            </h2>
            <div>
              <h2 className="font-medium mb-1">Street Address</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("streetAddress")}
                placeholder="ex: saheprotab"
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-medium mb-1">City</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("city")}
                type="text"
                placeholder="ex: Narsingdi"
              />
              {errors.city && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-medium mb-1">Zip code</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("zipcode")}
                type="text"
                placeholder="ex: 1600"
              />
              {errors.zipcode && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.zipcode.message}
                </p>
              )}
            </div>
          </>
        )}

        {stepThree && (
          <>
            <h2 className="text-2xl font-bold text-center mb-5">
              Account Setup
            </h2>
            <div>
              <h2 className="font-medium mb-1">UserName</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("userName")}
                placeholder="ex: Tanjil"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-medium mb-1">Password</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("password")}
                type="password"
                placeholder="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-medium mb-1">Confirm Password</h2>
              <input
                className="input bg-white text-black border-black w-full"
                {...register("confirmPass")}
                type="password"
                placeholder="confirm password"
              />
              {errors.confirmPass && (
                <p className="text-red-500 text-sm font-bold mt-2">
                  {errors.confirmPass.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          {stepOne ? (
            <div></div>
          ) : (
            <button
              onClick={handlePrev}
              className="btn btn-outline"
              type="button"
            >
              Prev
            </button>
          )}

          {stepThree ? (
            <button className="btn btn-outline" type="submit">
              Submit
            </button>
          ) : (
            <button
              className="btn btn-outline"
              onClick={handleNext}
              type="button"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
