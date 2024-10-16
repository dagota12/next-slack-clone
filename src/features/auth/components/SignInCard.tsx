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
import { useRouter } from "next/navigation";
interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}
const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn } = useAuthActions();
  //signin with providers
  const handleProviderSignin = async (provider: string) => {
    console.log("signin", provider);
    setPending(true);
    await signIn(provider).finally(() => setPending(false));
  };
  const onPassowordSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", {
      email,
      password,
      flow: "signIn",
      redirect: "/",
      redirectTo: "/",
    })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        setError("invalid username or password!");
      })
      .finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-6 md:p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 flex items-center gap-x-2 p-3 rounded-3 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="p-3 md:p-6">
        <form action="#" className="space-y-2.5" onSubmit={onPassowordSignin}>
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
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
            disabled={pending}
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
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
