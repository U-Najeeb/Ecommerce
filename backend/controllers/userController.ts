import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";


//@Route            GET api/v1/users/
//@Description      Get All Users
const getAllUsers = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await User.find();

    if (!users) {
      res.status(404).json({
        message: "No Users Found",
      });
    }
    res.status(200).json({
      message: "Users Found",
      users,
    });
  }
);


//@Route            GET api/v1/users/:id
//@Description      Get User By ID
const getUserById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const _id = req.params.id;
    const user = await User.findOne({ _id });

    if (!user) {
      res.status(404).json({
        message: "No User Found",
      });
    }
    res.status(200).json({
      message: "Users Found",
      user,
    });
  }
);


//@Route            PATCH api/v1/users/:id
//@Description      Update User By ID
const updateUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    interface Body {
      fName: string;
      lName: string;
      email: string;
      password: string;
      address: string;
    }

    const _id = req.params.id;
    const body: Body = req.body;
    const user = await User.findByIdAndUpdate({ _id }, body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({
        message: "No User Found",
      });
    }
    res.status(200).json({
      message: "User Updated",
      user,
    });
  }
);


//@Route            DELETE api/v1/users/:id
//@Description      Delete User By ID
const deleteUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
  
      const _id = req.params.id;
      await User.findByIdAndDelete({ _id });
  
      res.status(200).json({
        message: "User Deleted"
      });
    }
  );
export { getAllUsers, getUserById, updateUser, deleteUser};
