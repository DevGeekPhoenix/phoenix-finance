import jwt from "jsonwebtoken";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import path from "path";

async function decodeToken(token) {
  const arr = token.split(" ");

  try {
    if (arr[0] === "ut") {
      return jwt.verify(arr[1], "SECRET");
    }

    throw new Error("Please Re-Sign In");
  } catch (error) {
    throw error;
  }
}

async function auth(req, res, next) {
  try {
    const token = req.headers.auth;

    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
      return next();
    }
  } catch (error) {}
  req.user = null;
  return next();
}

export default (app) => {
  app.use(auth);
  app.use(graphqlUploadExpress());
  console.log("__dirname :", __dirname);
  // path.join(process.cwd(), `/src/public/`);

  app.use(express.static(path.join(process.cwd(), `/src/public/`)));
};
