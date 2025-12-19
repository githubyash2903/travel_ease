import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

export const LoginSignup = () => {
  /* ---------------- LOGIN STATES ---------------- */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* ---------------- SIGNUP STATES ---------------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login, signup ,user } = useAuth();
  const navigate = useNavigate();

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {

      await login(loginEmail, loginPassword);
       if(user.role==="admin"){
        navigate("/admin");
        return
       }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  /* ---------------- SIGNUP HANDLER ---------------- */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phoneNo || !countryCode || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await signup({
        name,
        email,
        phone_no: phoneNo,
        country_code: countryCode,
        password,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  

  return (
    <div className="flex items-center w-screen justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* ---------------- LOGIN ---------------- */}
        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Welcome back! Access your TravelEase account.
                </CardDescription>
              </CardHeader>
            
              <CardContent className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full my-4 bg-blue-400">
                  Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* ---------------- SIGNUP ---------------- */}
        <TabsContent value="signup">
          <Card>
            <form onSubmit={handleSignup}>
              <CardHeader className="text-center">
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create your TravelEase account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-1/3 space-y-2">
                    <Label>Code</Label>
                    <Input
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                  </div>

                  <div className="w-2/3 space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full my-4 bg-blue-400">
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
