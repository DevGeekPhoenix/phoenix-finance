import User from "../models/user";

export default async function requireAuth(user) {
  if (!user || !user._id) throw new Error("Unathorized");

  const me = await User.findById(user._id);

  if (!me) throw new Error("Unauthorized");

  return me;
}
