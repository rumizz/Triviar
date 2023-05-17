import { FC } from "react";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import { proxyClient } from "../util/proxyClient";
import { useLoginStore } from "../store/loginStore";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
};

const RegisterPage: FC = () => {
  const { setToken, setLoggedIn, setUsername } = useLoginStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: any) => {
    proxyClient.auth.register
      .query(data)
      .then(({ token, username }) => {
        setToken(token);
        setLoggedIn(true);
        setUsername(username ?? "");
        navigate("/master", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes("username:"))
          setError("username", {
            message: error.message.replace("username: ", ""),
          });
      });
  };
  return (
    <div className="bg-gray-100 absolute inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg"
      >
        <div className="text-2xl font-bold">Register</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
            <div className="text-red-500">
              {errors && errors.username?.message}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
          <Button type="submit" className="justify-center bg-d">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
