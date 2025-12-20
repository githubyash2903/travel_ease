import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUser, useRegisterUser } from "@/hooks/useAuth";
import { toast } from "react-toastify";

type TabType = "login" | "signup";

interface FormState {
  loginEmail: string;
  loginPassword: string;
  name: string;
  email: string;
  countryCode: string;
  phoneNo: string;
  password: string;
}

const INITIAL_FORM: FormState = {
  loginEmail: "",
  loginPassword: "",
  name: "",
  email: "",
  countryCode: "+91",
  phoneNo: "",
  password: "",
};

export const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState<TabType>("login");
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState<string>("");

  const loginMutation = useLoginUser();
  const registerMutation = useRegisterUser();
  const navigate = useNavigate();

  const isSubmitting =
    loginMutation.isPending || registerMutation.isPending;

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setError("");
    },
    []
  );

  /* ---------------- VALIDATIONS ---------------- */
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const { loginEmail, loginPassword } = form;

    if (!loginEmail || !loginPassword) {
      setError("Email and password are required");
      return;
    }

    loginMutation.mutate(
      { email: loginEmail, password: loginPassword },
      {
        onSuccess: (res) => {
          const data = res?.data?.data;
          toast.success(res?.data?.message);
          localStorage.setItem("token", data?.token);
          localStorage.setItem("role", data?.role?.toLowerCase());
          navigate(
            data?.role?.toLowerCase() === "admin"
              ? "/admin"
              : "/profile"
          );
        },
        onError: (err: any) => {
          setError(err?.message || "Login failed");
        },
      }
    );
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, phoneNo, countryCode, password } = form;

    if (!name || !email || !phoneNo || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    registerMutation.mutate(
      {
        name,
        email,
        phoneNumber: phoneNo,
        phoneCountryCode: countryCode,
        password,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.data?.message);
          setActiveTab("login");
          setForm((prev) => ({
            ...prev,
            loginEmail: email,
            loginPassword: "",
            password: "",
          }));
        },
        onError: (err: any) => {
          setError(err?.message || "Registration failed");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-[calc(100vh-8rem)] px-4">
      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v as TabType);
          setError("");
        }}
        className="w-full max-w-md"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* LOGIN */}
        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>Welcome back to TravelEase</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="loginEmail"
                    value={form.loginEmail}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="loginPassword"
                    value={form.loginPassword}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </CardContent>

              <CardFooter className="mt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-500"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* SIGNUP */}
        <TabsContent value="signup">
          <Card>
            <form onSubmit={handleSignup}>
              <CardHeader className="text-center">
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create your TravelEase account</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="space-y-2 w-1/3">
                    <Label>Code</Label>
                    <Input
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2 w-2/3">
                    <Label>Phone</Label>
                    <Input
                      name="phoneNo"
                      value={form.phoneNo}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </CardContent>

              <CardFooter className="mt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-500"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending
                    ? "Creating account..."
                    : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
