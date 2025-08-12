// app/(admin)/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useLoginMutation } from "@/graphql/generated";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin1@gmail.com");
  const [password, setPassword] = useState("password");
  const router = useRouter();

  const [login, { loading, error }] = useLoginMutation({
    onCompleted: (data) => {
      console.log(data);
      document.cookie = `admin-auth-token=${
        data.login.token
      }; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;

      localStorage.setItem("authToken", data.login.token);
      console.log("Login successful! Token stored in cookie & localStorage.");
      router.push("/admin/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-5" disabled={loading}>
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
