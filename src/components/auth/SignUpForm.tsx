
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("পাসওয়ার্ড মিলছে না!");
      return;
    }

    alert("Form validated! এখন Authentication API connect করতে হবে।");
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করুন সব ফিচার ব্যবহার করতে।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm">
            নাম
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="আবার লিখুন"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 py-3 font-medium text-white hover:bg-green-800"
        >
          অ্যাকাউন্ট তৈরি করুন
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
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-green-700">
            সাইন ইন করুন
          </Link>
        </p>
      </form>
    </div>
  );
}
