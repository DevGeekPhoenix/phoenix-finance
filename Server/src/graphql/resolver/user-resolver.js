import User from "../../models/user";
import Tag from "../../models/tag";
import { createWriteStream, unlink } from "fs";
import path from "path";
import authorizeUser from "../../lib/auth";
import { finished } from "stream/promises";

path.join(process.cwd(), "/src/db/users");

export default {
  root: {},
  Query: {
    me: async (_, data, { user }) => {
      try {
        const thisuser = await authorizeUser(user);

        return thisuser;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    signup: async (_, data) => {
      try {
        const token = await User.signup(data);

        return {
          token,
        };
      } catch (error) {
        throw error;
      }
    },
    login: async (_, data) => {
      try {
        const token = await User.login(data);
        return {
          token,
        };
      } catch (error) {
        throw error;
      }
    },
    editMe: async (_, { name, img }, { user }) => {
      console.log("************");
      console.log(img);
      console.log(name);

      let imgurl;
      try {
        const thisuser = await authorizeUser(user);

        imgurl = thisuser.img;

        if (img) {
          const { createReadStream, mimetype } = await img;
          const wtf = mimetype.split("/")[1];
          if (wtf !== "jpeg" && wtf !== "jpg" && wtf !== "png")
            throw new Error("bad request: Invalid file type");
          const stream = createReadStream();
          // await storeImageUpload({ stream, userId: thisuser._id });
          imgurl = `${thisuser._id}.${wtf}`;
          const out = createWriteStream(
            path.join(process.cwd(), `/src/public/${thisuser._id}.${wtf}`)
          );
          stream.pipe(out);
          await finished(out);
        }

        console.log("salamasadsad");
        await User.findByIdAndUpdate(thisuser._id, {
          name,
          img: imgurl,
        });

        return {
          status: 200,
          msg: "ok!",
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
