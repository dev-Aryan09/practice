import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import config from "../config/config.js";

const router = Router();

/**
 * @POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    // user input
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing name or email or password",
      });
    }

    // check user exist or NOT
    const isUserAlreadyExist = await UserModel.findOne({ email });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exist",
        errors: [
          {
            path: `email:- ${email}`,
            message: "User already exists with provided email",
          },
        ],
      });
    }

    // hashing
    const passwordHash = await bcrypt.hash(password, 10);

    // save to DB
    const user = await UserModel.create({
      name,
      email,
      password: passwordHash,
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    // update existing doc in DB
    user.refreshToken = refreshToken;
    await user.save(); // wait until document is updating in DB

    // set in Cookie Storage
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    const accessToken = jwt.sign({ id: user._d }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    // response
    return res.status(201).json({
      message: "User Created Successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      },
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error, R",
      error: error,
    });
  }
});

export default router;
