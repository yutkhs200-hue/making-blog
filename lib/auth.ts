import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) return null

        const isValidUsername = credentials.username === process.env.AUTH_USERNAME
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          process.env.AUTH_PASSWORD as string
        )

        if (!isValidUsername || !isValidPassword) return null

        return { id: "1", name: process.env.AUTH_USERNAME as string }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
