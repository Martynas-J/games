"use client";
import React, { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }); 
      if (res.status === 201) {
        toast.success("Vartotojas sukurtas")
        router.push("/dashboard/login?success=Account has been created");
      } else if (res.status === 409) {
        toast.error("Toks vartotojas arba el. paštas jau yra sukurtas ")
        setError("Username or email already exists.");
      } else {
        toast.error("Klaida")
        setError("Something went wrong!");
      }
    } catch (err) {
      toast.error("Tinklo klaida")
      setError("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          required
          className={styles.input}
        />
        <input
          type="Email"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Register</button>
      </form>
      {error}
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;
