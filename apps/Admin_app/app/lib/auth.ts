import CredentialsProvider from "next-auth/providers/credentials"
import db from "@repo/db/client"
import bcrypt from "bcrypt"

interface Credentials {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // @ts-ignore
            async authorize(credentials: Credentials, req) {
                if (!credentials) {
                    throw new Error("Credentials are required");
                }
                const { name, email, phone, password } = credentials || {};
                const action = req.body?.action;
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const phonePattern = /^\d{10}$/;

                if (action === 'signIn') {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email/Phone and password are required for sign-in");
                    }

                    if(/[a-zA-Z]/.test(credentials.email)){
                        if(!emailPattern.test(credentials.email)){
                            throw new Error("Invalid Email")
                        }
                    }else{
                        if(!phonePattern.test(credentials.email)){
                            throw new Error("Phone number must consist 10 Digits")
                        }
                    }

                    const existingAdmin = await db.admin.findFirst({
                        where: {
                            OR: [{ email: credentials?.email }, { phone: credentials?.email }],
                        },
                    });

                    if (!existingAdmin) {
                        throw new Error("No admin found with the provided credentials");
                    }
                    
                    const passwordValid = await bcrypt.compare(credentials.password, existingAdmin.password);
                    if (!passwordValid) {
                        throw new Error("Invalid password");
                    }
                    return { id: existingAdmin.id, email: existingAdmin.email, phone: existingAdmin.phone, name: existingAdmin.name };
                }

                if (action == "signUp") {
                    if (!name || !email || !password || !phone) {
                        throw new Error("~ All Field are Required!")
                    }
                    const existingAdmin = await db.admin.findUnique({ where: { email } });
                    if (existingAdmin) {
                        throw new Error("admin with this email already exists.");
                    }
                    const hashedPass = await bcrypt.hash(credentials?.password, 10);
                    const newAdmin = await db.admin.create({
                        data: {
                            name: credentials?.name,
                            email: credentials?.email ,
                            phone: credentials?.phone,
                            password: hashedPass
                        }
                    });
                    return newAdmin;
                }
                throw new Error("Invalid Action")
            }
        })
    ],
    pages:{
        signIn:"/auth/signin",
        signUp:"/auth/signup"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token, admin}:any){
            if(admin){
                token.id = admin.id;
                token.name = admin.name;
                token.email = admin.email;
                token.phone = admin.phone;
            }
            return token
        },
        async session({token, session}:any){
            session.admin.id = token.id;
            session.admin.email = token.email;
            session.admin.phone = token.phone;
            session.admin.name = token.name;
            return session
        },
        async redirect({  baseUrl }: {  baseUrl: string }) {
            // Redirect to /dashboard after a successful login
            return baseUrl + '/home';
        }
    }
}