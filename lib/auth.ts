import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import { APIError } from "better-auth";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),



  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ url }) => {
        console.log('旧邮箱验证');
        console.log(url)
      },
      updateEmailWithoutVerification:true,
    },
    deleteUser: {
      enabled: true,
      beforeDelete: async (user, ctx) => {
        console.log('不允许删除');
        throw new APIError("BAD_REQUEST");
      },
    }
  },


  session: {
    deferSessionRefresh: true,
    cookieCache: {
      enabled: true,
      maxAge: 60,
      strategy:"jwt"
    },
  },


  rateLimit: {
    enabled: true,
    storage:'database'
  },



  plugins: [
    customSession(async ({user, session}) => {
      return {
        user,session,a:1
      }
    })
  ],

  advanced: {
    database: {
      generateId: "uuid",
    },
    // useSecureCookies: true,
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
    sendVerificationEmail: async ({  url }) => {
      console.log('新邮箱验证')
      console.log(url)
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


type session  = typeof auth.$Infer.Session


// auth.api.signUpEmail({
//   body: {
//     name:'',
//     email: "",
//     password: "",
//     role:''
//   }
// })
