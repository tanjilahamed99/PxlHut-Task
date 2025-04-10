"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: "onTouched",
  });
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [userData, setUserData] = useState();

  // tanstack query mutate method for data sending at backend
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/api/your-endpoint", data);
      return response.data;
    },
    onSuccess: () => {
      handleCloseModal();
    },
    onError: (error) => {
      // Swal.fire({
      //   title: "Error!",
      //   text: error?.response?.data?.message || "Something went wrong",
      //   icon: "error",
      // });
    },
  });

  // react hook form function
  const onSubmit = (data) => {
    setUserData({ ...data });
    document.getElementById("my_modal_1").showModal();
  };

  // send next step
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

  // back previews step
  const handlePrev = () => {
    if (stepThree) {
      setStepThree(false);
      return setStepTwo(true);
    } else if (stepTwo) {
      setStepTwo(false);
      return setStepOne(true);
    }
  };

  // close modal
  const handleCloseModal = () => {
    document.getElementById("my_modal_1").close();
  };

  // sending data at backend and show preview-
  const handleSendDataAtBackend = () => {
    console.log(userData);
    Swal.fire({
      title: "Good job!",
      text: "Account create completed",
      icon: "success",
    });
    mutate(userData);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white shadow-lg border border-gray-300 rounded-2xl p-8 space-y-6"
      >
        {stepOne && (
          <>
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Personal Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("fullName")}
                placeholder="ex: Tanjil"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("phoneNumber")}
                placeholder="+88"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </>
        )}

        {stepTwo && (
          <>
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Address Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("streetAddress", { required: true })}
                placeholder="ex: saheprotab"
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("city", { required: true })}
                placeholder="ex: Narsingdi"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("zipcode", { required: true })}
                placeholder="ex: 1600"
              />
              {errors.zipcode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.zipcode.message}
                </p>
              )}
            </div>
          </>
        )}

        {stepThree && (
          <>
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Account Setup
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("userName")}
                placeholder="ex: Tanjil"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password")}
                placeholder="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPass")}
                placeholder="confirm password"
              />
              {errors.confirmPass && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPass.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="flex items-center justify-between pt-4">
          {!stepOne && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
            >
              Prev
            </button>
          )}

          <div className="ml-auto">
            {stepThree ? (
              <button
                type="submit"
                className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white rounded-xl shadow-xl max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Submitted Information
          </h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Full Name:</span>
              <span>{userData?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{userData?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{userData?.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Street Address:</span>
              <span>{userData?.streetAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">City:</span>
              <span>{userData?.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Zip Code:</span>
              <span>{userData?.zipcode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Username:</span>
              <span>{userData?.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Password:</span>
              <span>{userData?.password}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Confirm Password:</span>
              <span>{userData?.confirmPass}</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition"
            >
              Close
            </button>
            <button
              onClick={handleSendDataAtBackend}
              className="px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-50 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
}
