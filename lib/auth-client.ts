import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  disableDefaultFetchPlugins:true,
  fetchOptions: {},
  sessionOptions: {
    "refetchInterval": 0,
    "refetchOnWindowFocus": true,
    "refetchWhenOffline":false,
  }
});

if (typeof window !== "undefined") {
  console.log(authClient.$ERROR_CODES);
}
