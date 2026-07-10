"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const signUp = async () => {
    await authClient.signUp.email(
      {
        email: "fqymtu@gmail.com",
        password: "fqy1028511",
        name: "JackFan",
        callbackURL: "/blog",
      },
      {
        onRequest: (ctx) => {
          console.log("Request", ctx);
        },
        onSuccess: (ctx) => {
          console.log("Success", ctx);
        },
        onError: (ctx) => {
          console.log("Error", ctx);
        },
      },
    );
  };
  const signIn = async () => {
    await authClient.signIn.email({
      email: "fqymtu@gmail.com",
      password: "fqy1028511",
      // callbackURL: "/blog",
      // rememberMe: false,
    });
  };

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        disableSignal:true,
        onSuccess: () => {
          // router.push("/shop");
        },
        onError: (ctx) => {
          console.log("Error", ctx);
        },
      },

    });
  };

  const getSession = async () => {
    const session = await authClient.getSession();
    console.log(session);
  };

  const session = authClient.useSession();


  const verifyEmail = async () => {
    await authClient.sendVerificationEmail({
      email: "fqymtu@gmail.com",
      callbackURL: "/blog",
    })
  };

  return (
    <div>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={getSession}>Get Session</button>
      <button onClick={verifyEmail}>Verify Email</button>
      <p>{session.data?.session.token}</p>
    </div>
  );
}
