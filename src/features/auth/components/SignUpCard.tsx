import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuthActions();

  //signin with providers
  const handleProviderSignin = async (provider: string) => {
    console.log("signin", provider);
    setPending(true);
    await signIn(provider).finally(() => setPending(false));
  };
  const onPasswordSignup = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("password signup");
    setError("");
    e.preventDefault();
    if (password != confirmPassword) {
      setError("passowrd don't match");
      return;
    }
    setPending(true);

    signIn("password", { name, email, password, flow: "signUp" })
      .catch((e) => {
        setError("faild to signup");
      })
      .finally(() => setPending(false));
  };
  return (
    <Card className="w-full h-full p-6 md:p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 flex items-center gap-x-2 p-3 rounded-3 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="p-3 md:p-6">
        <form action="#" className="space-y-2.5" onSubmit={onPasswordSignup}>
          <Input
            disabled={false}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Full Name"
            type="text"
            // required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            type="password"
            required
          />
          <Input
            disabled={false}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="confirm password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-3 mt-2">
          <Button
            disabled={pending}
            onClick={() => {
              handleProviderSignin("google");
            }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="absolute size-5 top-1/2 left-4 -translate-y-1/2" />
            continue with google
          </Button>
          <Button
            onClick={() => {
              handleProviderSignin("github");
            }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="absolute size-5 top-1/2 left-4 -translate-y-1/2" />
            continue with github
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
