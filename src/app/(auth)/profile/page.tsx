
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { LogOut, Lock, UserRound } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  // Update Name
  const handleUpdateName = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setNameLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট হয়নি");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      setName("");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে!");
    } finally {
      setNameLoading(false);
    }
  };

  // Change Password
  const handleChangePassword = async (
    e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("নতুন পাসওয়ার্ড মিলছে না");
      return;
    }

    setPasswordLoading(true);

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "পাসওয়ার্ড পরিবর্তন হয়নি");
        return;
      }

      toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("কিছু সমস্যা হয়েছে!");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    setSignOutLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট হয়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    } finally {
      setSignOutLoading(false);
    }
  };

  // Loading
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Not Logged In
  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-600">
          প্রোফাইল দেখতে সাইন ইন করুন।
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="rounded-lg bg-[#07893e] px-6 py-2 text-white"
        >
          সাইন ইন
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#202b23]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-[#07893e] sm:h-20 sm:w-20">
            <UserRound
                size={36}
                strokeWidth={1.8}
            />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="break-all text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signOutLoading}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut size={16} />
            {signOutLoading ? "অপেক্ষা করুন..." : "সাইন আউট"}
          </button>
        </div>

        {/* Update Name */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white/80 p-5 sm:p-7">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            তথ্য
          </h2>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-gray-700"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user.name}
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={nameLoading}
              className="w-full cursor-pointer rounded-lg bg-[#07893e] py-3 font-semibold text-white shadow-md transition hover:bg-[#067a37] disabled:opacity-50"
            >
              {nameLoading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

        {/* Password Change */}
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 sm:p-7">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Lock size={20} />
            পাসওয়ার্ড পরিবর্তন
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-4">

            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm text-gray-700"
              >
                বর্তমান পাসওয়ার্ড
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm text-gray-700"
              >
                নতুন পাসওয়ার্ড
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm text-gray-700"
              >
                নতুন পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full cursor-pointer rounded-lg bg-[#07893e] py-3 font-semibold text-white shadow-md transition hover:bg-[#067a37] disabled:opacity-50"
            >
              {passwordLoading
                ? "পরিবর্তন হচ্ছে..."
                : "পাসওয়ার্ড পরিবর্তন করুন"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
};

export default ProfilePage;
