import { Box, Button, TextField } from "@mui/material";
import React from "react";

type sellerFormTypes = {
  refrence: React.MutableRefObject<null>;
};
const SellerForm: React.FC<sellerFormTypes> = ({ refrence }) => {
  return (
    <Box
      sx={{ padding: "10rem 2rem", display: "flex ", justifyContent: "center" }}
      ref={refrence}
    >
      <form
        className="flex justify-center flex-col gap-8 w-4/5 h-fit items-center max-sm:gap-6"
        //   onSubmit={handleSubmit}
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
            color="secondary"
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
            color="secondary"
            focused
            required
          />
        </div>
        <div className="flex gap-8 max-sm:flex-col  w-full">
          <TextField
            id="storeName"
            label="Store Name"
            variant="outlined"
            name="storeName"
            sx={{
              width: "100%",
              borderRadius: "10px",
              outlineColor: "transparent",
              borderColor: "none",
            }}
            color="secondary"
            focused
            required
          />
          <TextField
            id="registrationNumber"
            label="Registration Number"
            name="registrationNumber"
            variant="outlined"
            sx={{
              width: "100%",
              //   bgcolor: "#E3E3E3",
              borderRadius: "10px",
              outline: "none",
              border: "none",
            }}
            color="secondary"
            focused
            required
          />
          <TextField
            id="gstin"
            label="GST Number"
            name="gstin"
            variant="outlined"
            sx={{
              width: "100%",
              //   bgcolor: "#E3E3E3",
              borderRadius: "10px",
              outline: "none",
              border: "none",
            }}
            color="secondary"
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
            color="secondary"
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
            color="secondary"
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
            color="secondary"
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
            color="secondary"
            focused
            required
          />
        </Box>
        <div className="w-fit">
          <Button
            type="submit"
            variant="contained"
            // color={status === "error" ? "error" : "primary"}
            sx={{ width: "164px", height: "45px" }}
          >
            Register
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default SellerForm;
