import { createAuthClient } from "better-auth/react";
import { customSessionClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  disableDefaultFetchPlugins:true,
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if(response.status === 429) {
        console.log('限流了')
      }

    }
  },
  sessionOptions: {
    "refetchInterval": 0,
    "refetchOnWindowFocus": true,
    "refetchWhenOffline":false,
  },
  plugins:[customSessionClient<typeof auth>(),inferAdditionalFields<typeof auth>()]
});



type session  = typeof authClient.$Infer.Session

if (typeof window !== "undefined") {
  console.log(authClient.$ERROR_CODES);
}
