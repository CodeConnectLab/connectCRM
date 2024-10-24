"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignUPForm from "../SignUpForm";

export default function SignUp() {
  return (
    <>
      <GoogleSigninButton text="Sign up" />

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign up with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SignUPForm />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
