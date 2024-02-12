import { Box, Button, TextField } from "@mui/material";
import logo from "../../assets/logo.png";
import { useMutation } from "react-query";
import { useAxios } from "../../hooks/useAxios";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { SignUpTypes } from "../../types/User";

const SignUp = () => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  const signupFn = (signupData: SignUpTypes) => {
    return useAxios.post("/auth/signup", signupData);
  };
  const { mutate, status } = useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      setUserData(data?.data);
      navigate("/homepage");
    },
  });

  useEffect(()=> {
    const autoLogin = async () =>{
      const response = await useAxios.post("/auth/validate-token", {},)

      if(response.status === 200){
        navigate("/homepage")
      }
    }
    autoLogin()
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const signupData: SignUpTypes = {
      fName: (e.currentTarget as HTMLFormElement).fName.value,
      lName: (e.currentTarget as HTMLFormElement).lName.value,
      email: (e.currentTarget as HTMLFormElement).email.value,
      password: (e.currentTarget as HTMLFormElement).password.value,
      address: (e.currentTarget as HTMLFormElement).address.value,
    };
    mutate(signupData);
  };

  return (
    <div className="flex justify-center h-screen items-center border-2 max-sm:p-1 overflow-y-auto ">
      <div className="border-solid border-2 border-input-grey flex justify-center flex-col gap-7  h-fit items-center rounded-xl p-8 max-sm:p-3 max-sm:w-full max-sm:gap-5 max-sm:mt-2">
        <div className="w-fit max-sm:w-9/12 max-sm:flex max-sm:justify-center ">
          <img src={logo} alt="logo" />
        </div>
        <form
          className="flex justify-center flex-col gap-8 w-full h-fit items-center max-sm:gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-8 max-sm:flex-col  w-full">
            <TextField
              id="fName"
              label="First Name"
              variant="outlined"
              name="fName"
              sx={{
                width: "100%",
                borderRadius: "10px",
                outlineColor: "transparent",
                borderColor: "none",
              }}
              color="primary"
              focused
              required
            />
            <TextField
              id="lName"
              label="Last Name"
              name="lName"
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
          </div>
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
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
          </Box>
          <div className="flex gap-8 w-full max-sm:gap-4">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
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
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
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
          </div>
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              variant="outlined"
              name="address"
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
          </Box>
          <div className="w-fit">
            <Button
              type="submit"
              variant="contained"
              color={status === "error" ? "error" : "primary"}
              sx={{ width: "164px", height: "45px" }}
            >
              SIGNUP
            </Button>
          </div>
        </form>
        <div>
          <h3 className="text-text-grey text-xs ">Already A GoCarter?</h3>
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: "10rem",
              height: "45px",
              fontSize: "12px",
              fontWeight: "600",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
