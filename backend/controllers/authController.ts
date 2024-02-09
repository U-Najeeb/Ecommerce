import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

//@Route            api/v1/auth/login
//@Description      Logging The User In 
const login = catchAsync((req: Request, res: Response) => {
    
});


//@Route            api/v1/auth/signup
//@Description      Registering A User 
const signUp = catchAsync((req: Request, res: Response) => {});

export { login, signUp };
