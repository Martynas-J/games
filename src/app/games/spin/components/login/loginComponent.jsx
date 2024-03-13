"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  useEffect(() => {
    if (session.status === "authenticated") {
      toast.success("Jūs prisijungėte");
      router?.push("/dashboard");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };
  if (session.status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <p>{error && toast.error(error)}</p>
        <h1 className={styles.title}>{success ? success : "Sveiki sugryžę"}</h1>
        <h2 className={styles.subtitle}>
          Reikia prisijungti kad matyti turinį.
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
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
          <button className={styles.button}>Prisijungti</button>
          {error && error}
        </form>
        <button
          onClick={() => {
            signIn("google");
          }}
          className={styles.button + " " + styles.google}
        >
          Prisijungti su Google
        </button>
        {/* <button
          onClick={() => {
            signIn("facebook");
          }}
          className={styles.button + " " + styles.facebook}
        >
          Login with Facebook
        </button> */}
        <span className={styles.or}>- Arba -</span>
        <Link className={styles.link} href="/dashboard/register">
          Sukurti nują paskyrą
        </Link>
      </div>
    );
  }
};

export default LoginComponent;
