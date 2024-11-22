"use client"
import { AuthCard } from "@repo/ui/AuthCard";
import { AuthInputs } from "@repo/ui/AuthInputs";
import { useState } from "react";
export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        // handleSignIn(email, password, setError, setLoading);
    };

    return (
        <div className="w-100 h-screen flex justify-center items-center">

            <AuthCard title="Sign-in">
                <AuthInputs
                    placeholder={"email or phone"}
                    label={"Email/Phone"}
                    type={"text"}
                    onChange={(value:string)=> setEmail(value)}
                    >
                </AuthInputs>

                <AuthInputs
                    placeholder={"email or phone"}
                    label={"Email/Phone"}
                    type={"text"}
                    onChange={(value:string)=> setEmail(value)}
                    >
                </AuthInputs>
            </AuthCard>
        </div>
    )
}