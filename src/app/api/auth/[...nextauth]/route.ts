import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				const { access_token } = account;
				token.accessToken = access_token;
				token.userRole = "admin";
			}
			return token;
		},
	},
	providers: [
		Providers({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials || {};
				const user: {
					email: string;
					password: string;
					id: string;
				} = {
					email: "user@example.com",
					password: "1Password",
					id: "testUser",
				};

				if (
					email === user.email &&
					password === user.password
				) {
					return {
						id: user.id,
						email: user.email,
						name: "John Doe",
					};
				} else {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	debug: process.env.NODE_ENV === "development",
	pages: {},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
