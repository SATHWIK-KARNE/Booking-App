import GoogleProvider from "next-auth/providers/google";

export const authOptions= {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // when a user logged in to app ok. From then whenever Login is clicked this google account is automatically selected.
      // so to prompt what account to use each time while logging in:
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    // invoked on successful signIn:
    async signIn({profile}){
      // 1.connect to db
      // 2. check if user trying to logging in exists
      // 3.if not=> add user to db and return true
      // 4.else return true to allow signIn 
    },
    // modifies the session object
    async session({session}){
      // 1.get user from db who is signed in
      // 2.assign user id to session
      // 3return this session
    }
  }
};