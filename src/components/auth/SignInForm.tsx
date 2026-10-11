
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInForm() {

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();


    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {email:string, password:string}

    const {data, error} = await authClient.signIn.email({
      ...user,
      callbackURL: "/"
    })

    if(data){
      toast.success("সফলভাবে সাইন ইন হয়েছে")
    }
    if(error){
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে")
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">
          স্বাগতম ফিরে আসায়
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টে সাইন ইন করুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm">
            ইমেইল
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm">
            পাসওয়ার্ড
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            required
            placeholder="আপনার পাসওয়ার্ড"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            মনে রাখুন
          </label>

          <span className="text-gray-400">
            পাসওয়ার্ড ভুলে গেছেন?
          </span>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 py-3 font-medium text-white hover:bg-green-800"
        >
          সাইন ইন করুন
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-500">
          Google ও GitHub Login পরে যুক্ত হবে।
        </p>

        <p className="text-center text-sm text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-green-700">
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </form>
    </div>
  );
}
