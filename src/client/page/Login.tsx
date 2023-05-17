import { FC, useState } from "react";
import Button from "../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { proxyClient } from "../util/proxyClient";
import { useLoginStore } from "../store/loginStore";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage: FC = () => {
  const { setToken, setLoggedIn, setUsername } = useLoginStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: any) => {
    setIsLoading(true);
    proxyClient.auth.login
      .query(data)
      .then(({ token, username }) => {
        setToken(token);
        setLoggedIn(true);
        setUsername(username ?? "");
        navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes("password: "))
          setError("password", {
            message: error.message.replace("password: ", ""),
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 absolute inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-2"
      >
        <div className="text-2xl font-bold">Log in</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
            <div className="text-red-500">
              {errors && errors.password?.message}
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="justify-center">
            {isLoading ? "Loading..." : "Log in"}
          </Button>
          <Link to="/register" className="text-left underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
