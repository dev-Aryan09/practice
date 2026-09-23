import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { generateTokens } from "../utils/auth.js";

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

    const { accessToken, refreshToken } = generateTokens({ userId: user._id });

    // update existing doc in DB
    user.refreshToken = refreshToken;
    await user.save(); // wait until document is updating in DB

    // set in Cookie Storage
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

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

/**
 * @POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing email or password",
    });
  }

  try {
    const user = await UserModel.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Unauthorized, invalid password or email",
      });
    }

    const { accessToken, refreshToken } = generateTokens({ userId: user._id });

    // update existing doc in DB
    user.refreshToken = refreshToken;
    await user.save();

    // set RT to Cookie Storage
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    // response
    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
});

export default router;
