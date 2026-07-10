import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import { APIError } from "better-auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),



  plugins: [],

  advanced: {
    database: {
      generateId: "uuid",
    },
    useSecureCookies: true,
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user,ctx) => {
          console.log('开始创建')
          console.log(ctx)
        },
        after: async () => {
          console.log('创建完成')
        }
      },
    },
    session: {
      create: {
        after: async () => {
          console.log('session 创建完成')
        }
      }
    }
  },

  experimental: { joins: true },


  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log(user, url, token)
    },
    sendOnSignUp: true,
    sendOnSignIn:true,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification:true,
  },






  // user: {
  //   additionalFields: {
  //     role: {
  //       type: 'string',
  //       defaultValue: '123',
  //       required: false,
  //     }
  //   }
  // }
});


// auth.api.signUpEmail({
//   body: {
//     name:'',
//     email: "",
//     password: "",
//     role:''
//   }
// })
