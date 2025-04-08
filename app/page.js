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

  // console.log(watch("example"));

  console.log(stepOne);
  console.log(stepTwo);
  console.log(stepThree);

  const handleNext = () => {
    if (stepOne) {
      setStepOne(false);
      return setStepTwo(true);
    } else if (stepTwo) {
      setStepTwo(false);
      return setStepThree(true);
    }
  };

  const handlePrev = () => {
    if (stepOne) {
      setStepOne(false);
      return setStepTwo(true);
    } else if (stepTwo) {
      setStepTwo(false);
      return setStepThree(true);
    }
  };

  return (
    <div className="container mx-auto  flex items-center justify-center h-[100vh] text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-700 w-1/2 p-5 rounded-lg space-y-4"
      >
        {/* register your input into the hook by invoking the "register" function */}

        {stepOne && (
          <>
            <div>
              <h2 className="font-medium mb-1">Full Name</h2>
              <input
                className="input bg-white text-black border-black"
                defaultValue=""
                {...register("fullName")}
                placeholder="ex: Tanjil"
              />
            </div>
            <div>
              <h2 className="font-medium mb-1">Email</h2>
              <input
                className="input bg-white text-black border-black"
                defaultValue=""
                {...register("email", { required: true })}
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <h2 className="font-medium mb-1">Phone Number</h2>
              <input
                className="input bg-white text-black border-black"
                defaultValue=""
                {...register("phoneNumber", { required: true })}
                type="number"
                placeholder="+88"
              />
            </div>
          </>
        )}
        {stepTwo && <></>}
        {stepThree && <></>}

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <div className="flex items-center justify-between">
          <button className="btn btn-outline" type="button">
            Prev
          </button>
          <button
            className="btn btn-outline"
            onClick={handleNext}
            type="button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
