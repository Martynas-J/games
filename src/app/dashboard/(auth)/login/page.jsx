import LoginComponent from "@/app/games/spin/components/login/loginComponent";
import { Suspense } from "react";

const Login = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <LoginComponent/>
      </Suspense>
    </div>
  );
};

export default Login;



