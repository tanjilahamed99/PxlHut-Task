"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  console.log(watch("example"));

  return (
    <div className="container mx-auto  flex items-center justify-center h-[100vh] text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-700 w-1/2 p-5 rounded-lg space-y-4"
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div>
          <h2 className="font-medium mb-1">Full Name</h2>
          <input
            className="input bg-white text-black border-black"
            defaultValue="fullName"
            {...register("fullName")}
            placeholder="ex: Tanjil"
          />
        </div>
        <div>
          <h2 className="font-medium mb-1">Email</h2>
          <input
            className="input bg-white text-black border-black"
            defaultValue="email"
            {...register("email" , {required: true })}
            type="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <h2 className="font-medium mb-1">Phone Number</h2>
          <input
            className="input bg-white text-black border-black"
            defaultValue="phoneNumber"
            {...register("phoneNumber" , {required: true }) }
            type="number"
            placeholder="+88"
          />
        </div>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <div className="flex items-center justify-between">
          <button className="btn btn-outline" type="submit">
            Prev
          </button>
          <button className="btn btn-outline" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
