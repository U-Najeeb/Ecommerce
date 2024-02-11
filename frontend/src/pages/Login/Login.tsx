import { Button, TextField } from "@mui/material";
import logo from "../../assets/logo.png";
import { useMutation } from "react-query";
import { useAxios } from "../../hooks/useAxios";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { loginTypes } from "../../types/User";

const Login = () => {
  const {setUserData } = useUserContext();
  const navigate = useNavigate();

  const loginFn = (loginData: loginTypes) => {
    return useAxios.post("/auth/login", loginData);
  };
  const { mutate, status } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      setUserData(data?.data?.user);
      navigate("/homepage");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const loginData: loginTypes = {
      email: (e.currentTarget as HTMLFormElement).email.value,
      password: (e.currentTarget as HTMLFormElement).password.value,
    };
    mutate(loginData);
  };

  return (
    <div className="flex justify-center h-screen items-center border-2">
      <div className="border-solid border-2 border-input-grey flex justify-center flex-col gap-9  h-5/6 items-center rounded-xl p-8 ">
        <div className="w-fit">
          <img src={logo} alt="logo" />
        </div>
        <form
          className="flex justify-center flex-col gap-8 w-full h-fit items-center"
          onSubmit={handleSubmit}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            sx={{
              width: "100%",
              //   bgcolor: "#E3E3E3",
              borderRadius: "10px",
              outlineColor: "transparent",
              borderColor: "none",
            }}
            color="primary"
            focused
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            sx={{
              width: "100%",
              //   bgcolor: "#E3E3E3",
              borderRadius: "10px",
              outline: "none",
              border: "none",
            }}
            focused
            required
          />
          <div className="w-fit">
            <Button
              type="submit"
              variant="contained"
              color={status === "error" ? "error" : "primary"}
              sx={{ width: "164px", height: "45px" }}
            >
              LOGIN
            </Button>
          </div>
        </form>
        <div>
          <h3 className="text-text-grey text-xs ">New to GoCart?</h3>
        </div>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              width: "100%",
              height: "45px",
              fontSize: "12px",
              fontWeight: "600",
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            CREATE YOUR GoCart ACCOUNT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
