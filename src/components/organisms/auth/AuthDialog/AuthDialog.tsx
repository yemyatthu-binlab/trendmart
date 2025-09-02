"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useCustomerLoginMutation,
  useRequestRegistrationOtpMutation,
  useVerifyOtpAndCompleteRegistrationMutation,
} from "@/graphql/generated";
import OtpInput from "react-otp-input";

import { useAuthStore } from "@/store/auth";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const AuthDialog = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [view, setView] = useState<"login" | "register" | "otp">("login");
  const [registrationEmail, setRegistrationEmail] = useState(""); // To remember email for OTP step
  const authLogin = useAuthStore((state) => state.login);
  const [otp, setOtp] = useState("");

  const [loginMutation, { loading: loginLoading }] = useCustomerLoginMutation({
    onCompleted: (data) => {
      authLogin(data.customerLogin.token, data.customerLogin.user);
      toast.success("Welcome back!");
      onOpenChange(false);
    },
    onError: (error) => {
      if (error.message.includes("Invalid credentials")) {
        setLoginError("password", { message: " " });
      } else {
        toast.error(error.message);
      }
    },
  });

  const [requestOtpMutation, { loading: requestOtpLoading }] =
    useRequestRegistrationOtpMutation({
      onCompleted: (data) => {
        toast.success(data.requestRegistrationOtp);
        setView("otp"); // Switch to OTP view on success
      },
      onError: (error) => toast.error(error.message),
    });

  const [verifyOtpMutation, { loading: verifyOtpLoading }] =
    useVerifyOtpAndCompleteRegistrationMutation({
      onCompleted: (data) => {
        authLogin(
          data.verifyOtpAndCompleteRegistration.token,
          data.verifyOtpAndCompleteRegistration.user
        );
        toast.success("Welcome to TrendMart!");
        onOpenChange(false);
      },
      onError: (error) => toast.error(error.message),
    });

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    setError: setLoginError,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onLogin = (data: LoginFormData) => {
    loginMutation({ variables: data });
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    setRegistrationEmail(data.email); // Save email
    requestOtpMutation({ variables: data });
  };

  const onVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }
    verifyOtpMutation({ variables: { email: registrationEmail, otp } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        {view !== "otp" && (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <DialogHeader>
                <DialogTitle>Welcome Back</DialogTitle>
                <DialogDescription>
                  Sign in to continue your shopping.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleLoginSubmit(onLogin)}
                className="space-y-4 py-4"
              >
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    {...registerLogin("email")}
                  />
                  {loginErrors.email && (
                    <p className="text-sm text-red-500">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    {...registerLogin("password")}
                  />
                  {loginErrors.password && (
                    <p className="text-sm text-red-500">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>
                {(loginErrors.email?.message === "Invalid email or password" ||
                  loginErrors.password?.message === " ") && (
                  <p className="text-sm text-red-500">
                    Invalid email credentails. Please try again.
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>
                  Join TrendMart to discover amazing products.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleRegisterSubmit(onRegisterSubmit)}
                className="space-y-4 py-4"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="register-fullname">Full Name</Label>
                  <Input
                    id="register-fullname"
                    type="text"
                    placeholder="Enter your name"
                    {...registerRegister("fullName")}
                  />
                  {registerErrors.fullName && (
                    <p className="text-sm text-red-500">
                      {registerErrors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    {...registerRegister("email")}
                  />
                  {registerErrors.email && (
                    <p className="text-sm text-red-500">
                      {registerErrors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Enter your password"
                    {...registerRegister("password")}
                  />
                  {registerErrors.password && (
                    <p className="text-sm text-red-500">
                      {registerErrors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={requestOtpLoading}
                >
                  {requestOtpLoading ? "Sending OTP..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
        {view === "otp" && (
          <div>
            <DialogHeader>
              <DialogTitle>Enter Verification Code</DialogTitle>
              <DialogDescription>
                We&#39;ve sent a 6-digit code to {registrationEmail}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onVerifyOtpSubmit} className="space-y-6 py-4">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                containerStyle={{ justifyContent: "center", gap: "8px" }}
                inputStyle={{
                  width: "3rem",
                  height: "3.5rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #aaa",
                }}
                renderInput={(props) => <input {...props} />}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={verifyOtpLoading}
              >
                {verifyOtpLoading ? "Verifying..." : "Verify and Sign Up"}
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => setView("register")}
              >
                Back to sign up
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
