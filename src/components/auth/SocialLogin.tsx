
"use client";

import { authClient } from "@/lib/auth-client";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SocialLogin() {
  const [isLoading, setIsLoading] = useState(false);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google লগইন ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub লগইন ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
      >
        <FaGoogle className="text-red-500" />
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={handleGithubSignIn}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
      >
        <FaGithub className="text-lg" />
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
