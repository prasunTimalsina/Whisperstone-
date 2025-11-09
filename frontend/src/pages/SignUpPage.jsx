import { Eye, EyeOff, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signUpSchema } from "@/schemas/signUpSchema";
import { useAuthStore } from "@/store/useAuthStore";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const signupData = {
      fullname: data.firstname.trim() + " " + data.lastname.trim(),
      email: data.email,
      password: data.password,
    };
    try {
      await signup(signupData);
    } catch (error) {
      console.log("Error signing up", error);
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center px-4 py-12">
      <div className="max-w-sm w-full mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <Link to="/">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-zinc-950" />
              </div>
              <h1 className="text-xl font-bold text-white">Whisper Stone</h1>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">
            Create your account
          </h2>
          <p className="text-zinc-400 text-sm">
            Join us to start broadcasting messages
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                First name
              </label>
              <Input
                {...register("firstname")}
                type="text"
                className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700"
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Last name
              </label>
              <Input
                {...register("lastname")}
                type="text"
                className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700"
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Email address
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="user@example.com"
              className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-zinc-950 hover:bg-zinc-100 font-semibold h-10 mt-8 cursor-pointer"
          >
            Create account
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-zinc-400 text-sm mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
