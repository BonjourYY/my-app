"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Separator } from "@heroui/react";
import {
  banUser,
  createUser,
  getUser,
  impersonateUser,
  listUsers,
  listUserSessions,
  removeUser,
  revokeUserSession,
  revokeUserSessions,
  setRole,
  setUserPassword,
  signIn,
  stopImpersonation,
  unbanUser,
  updateUser,
  userHasPermission,
  verifyPassword,
} from "./actions";

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

  // const signIn = async () => {
  //   await authClient.signIn.email({
  //     email: "fqymtu@gmail.com",
  //     password: "fqy1028511",
  //     // callbackURL: "/blog",
  //     // rememberMe: false,
  //   });
  // };

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
      name: "12123",
    });
  };

  const changeEmail = async () => {
    await authClient.changeEmail({ newEmail: "fqymtu@qq.cc" });
  };

  const changePassword = async () => {
    await authClient.changePassword({
      newPassword: "fqy102611",
      currentPassword: "fqy1028511",
      revokeOtherSessions: true,
    });
  };

  const verifyPwd = async () => {
    const res = await verifyPassword("fqy10122611");
    console.log("verifyPassword 结果:", res);
    setObj(res);
  };

  const deleteUser = async () => {
    await authClient.deleteUser();
  };

  return (
    <>
      <div className="flex gap-2 mt-4">
        <Button onPress={signUp}>Sign Up</Button>
        <Button onPress={signIn}>Sign In</Button>
        <Button onPress={signOut}>Sign Out</Button>
        <Button onPress={getSession}>Get Session</Button>
        <Button onPress={verifyEmail}>Verify Email</Button>
        <Button onPress={listSessions}>List Sessions</Button>
        <Button onPress={revokeSession}>Revoke Session</Button>
        <Button onPress={updateUserInfo}>Update User Info</Button>
        <Button onPress={changeEmail}>Change Email</Button>
        <Button onPress={changePassword}>Change Password</Button>
        <Button onPress={verifyPwd}>Verify Password</Button>
        <Button onPress={deleteUser}>Delete User</Button>
      </div>
      <Separator className="my-4" />
      <div className="flex-wrap flex gap-2 mt-4">
        <Button onPress={createUser}>Create User</Button>
        <Button onPress={listUsers}>List Users</Button>
        <Button onPress={getUser}>Get User</Button>
        <Button
          onPress={() =>
            setRole("admin", "6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")
          }
        >
          Set Role
        </Button>
        <Button
          onPress={() =>
            setUserPassword("fqy102611", "6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")
          }
        >
          Set Password
        </Button>
        <Button
          onPress={() =>
            updateUser("123", "6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")
          }
        >
          Update User
        </Button>
        <Button onPress={() => banUser("6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")}>
          Ban User
        </Button>
        <Button
          onPress={() => unbanUser("6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")}
        >
          Unban User
        </Button>
        <Button
          onPress={() =>
            listUserSessions("5915f06f-8f2e-472b-826b-27a47f9addcb")
          }
        >
          List User Sessions
        </Button>
        <Button
          onPress={() => revokeUserSession("TCuX7Bz4bmc1rZPbIDXNDGxQr6wCSLHx")}
        >
          Revoke User Session
        </Button>
        <Button
          onPress={() =>
            revokeUserSessions("5915f06f-8f2e-472b-826b-27a47f9addcb")
          }
        >
          Revoke User Sessions
        </Button>
        <Button
          onPress={() =>
            impersonateUser("6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")
          }
        >
          Impersonate User
        </Button>
        <Button onPress={() => stopImpersonation()}>Stop Impersonating</Button>
        <Button
          onPress={() => removeUser("6a5cfa08-5ec2-44e2-a5ca-8c32d1a493f3")}
        >
          Remove User
        </Button>

        <Button
          onPress={() =>
            userHasPermission("5915f06f-8f2e-472b-826b-27a47f9addcb", {
              project: ["create"],
            })
          }
        >
          Check Permission
        </Button>
      </div>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </>
  );
}
