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
    if (name.includes(" ")) {
      setError("Vartotojo vardas negali turėti tarpo simbolio.");
      return;
    }
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
        setError("Vartotojas arba el. paštas jau egzistuoja.");
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
      <h1 className={styles.title}>Sukurti naują paskyrą</h1>
      <h2 className={styles.subtitle}>Reikalingas prisijungimas po sukurimo.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Vartotojo vardas"
          required
          className={styles.input}
        />
        <input
          type="Email"
          placeholder="El. paštas"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          required
          className={styles.input}
        />
        <button className={styles.button}>Registuotis</button>
      </form>
      <span className="text-red-500 font-bold">{error}</span>
      <span className={styles.or}>- Arba -</span>
      <Link className={styles.link} href="/dashboard/login">
        Prisijungri su esama paskyra
      </Link>
    </div>
  );
};

export default Register;
