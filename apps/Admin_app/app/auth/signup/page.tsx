"use client"
import { useState } from "react";
export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = () => {
        // handleSignIn(email, password, setError, setLoading);
    };

    return (
        <div>
            Signup
        </div>
    )
}