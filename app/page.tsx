"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from '@heroui/react';
import { verifyPassword } from "./actions";

export default function Home() {
  let [obj, setObj] = useState({});

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
        disableSignal: true,
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
    setObj(session);
  };

  const listSessions = async () => {
    const sessions = await authClient.listSessions();
    setObj(sessions);
  };

  const session = authClient.useSession();

  const verifyEmail = async () => {
    await authClient.sendVerificationEmail({
      email: "fqymtu@gmail.com",
      callbackURL: "/blog",
    });
  };

  const revokeSession = async () => {
    await authClient.revokeSessions();
  };

  const updateUserInfo = async () => {
    await authClient.updateUser({
name:'12123',
    });
  }

  const changeEmail = async () => {
    await authClient.changeEmail({newEmail:'fqymtu@qq.cc'})
  };

  const changePassword = async () => {
    await authClient.changePassword({
      newPassword: 'fqy102611',
      currentPassword: 'fqy1028511',
      revokeOtherSessions:true,
    })
  }

  const verifyPwd = async () => {
    const res = await verifyPassword('fqy10122611');
    console.log('verifyPassword 结果:', res);
    setObj(res);
  };


  const deleteUser = async () => {
    await authClient.deleteUser();
  }

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={signUp}>Sign Up</Button>
        <Button onClick={signIn}>Sign In</Button>
        <Button onClick={signOut}>Sign Out</Button>
        <Button onClick={getSession}>Get Session</Button>
        <Button onClick={verifyEmail}>Verify Email</Button>
        <Button onClick={listSessions}>List Sessions</Button>
        <Button onClick={revokeSession}>Revoke Session</Button>
        <Button onClick={updateUserInfo}>Update User Info</Button>
        <Button onClick={changeEmail}>Change Email</Button>
        <Button onClick={changePassword}>Change Password</Button>
        <Button onClick={verifyPwd}>Verify Password</Button>
        <Button onClick={deleteUser}>Delete User</Button>
      </div>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
   </>
  );
}
