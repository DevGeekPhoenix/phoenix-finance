import {
  writeFileSync,
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
} from "fs";
import path from "path";

import { UID } from "../lib";
import { genSaltSync, compareSync, hashSync } from "bcrypt";

// import dotenv from 'dotenv'

import jwt from "jsonwebtoken";

// dotenv.config();

let doesCacheneedsUpdate = true;
let cache = null;

const userDirectory = path.join(process.cwd(), "/src/db/users");

class UserSchema {
  constructor() {}

  async create({ name, username, password }) {
    try {
      if (!name || !username || !password) throw new Error("bad input");

      const allUsers = await this.findAll();

      const ifuserexists = allUsers.some((item) => item.username === username);

      if (ifuserexists) throw new Error("this is username already exists");

      const salt = genSaltSync(9);
      const hash = hashSync(password, salt);
      const userID = UID();
      const userInfo = { name, username, _id: userID, password: hash };

      const data = JSON.stringify(userInfo);

      if (!existsSync(`${userDirectory}/${userID}`)) {
        mkdirSync(`${userDirectory}/${userID}`);
      }

      const dest = `${userDirectory}/${userID}/info.txt`;

      writeFileSync(dest, data, "utf8");
      doesCacheneedsUpdate = true;

      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      // if (!doesCacheneedsUpdate && cache) return cache

      const x = readdirSync(userDirectory).reduce(
        (acc, cur, i) =>
          acc +
          `${i == 0 ? "" : ","}` +
          readFileSync(path.join(userDirectory, `/${cur}/info.txt`), {
            encoding: "utf8",
          }),
        "["
      );
      const y = `${x}]`;

      const result = JSON.parse(y);

      // doesCacheneedsUpdate = false
      // cache = result

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findById(_id) {
    try {
      const thisUser = JSON.parse(
        readFileSync(path.join(userDirectory, `/${_id}/info.txt`), {
          encoding: "utf8",
        })
      );
      if (!thisUser || !thisUser._id) throw new Error("bad request");
      return thisUser;
    } catch (error) {
      console.log("error in findbyid", error);
      throw error;
    }
  }

  async signup({ name, username, password }) {
    try {
      const thisUser = await this.create({ name, username, password });

      return this.createToken(thisUser._id);
    } catch (error) {
      throw error;
    }
  }

  createToken(_id) {
    return jwt.sign(
      {
        _id,
      },
      "SECRET"
    );
  }

  async login({ username, password }) {
    try {
      const thisUser = (await this.findAll()).find(
        (user) => user.username === username
      );

      if (!thisUser || !thisUser._id) throw new Error("bad request");

      if (!compareSync(password, thisUser.password))
        throw new Error("password doesnt match");

      return this.createToken(thisUser._id);
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndUpdate(_id, data) {
    console.log(data);
    try {
      const thisUser = await this.findById(_id);

      Object.entries(data).forEach(([key, value]) => (thisUser[key] = value));

      console.log("2");
      const dest = path.join(
        process.cwd(),
        `/src/db/users/${thisUser._id}/info.txt`
      );

      console.log("3");

      writeFileSync(dest, JSON.stringify(thisUser), "utf8");

      console.log("whaaaaaaaaaaaat");
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const User = new UserSchema();

export default User;
