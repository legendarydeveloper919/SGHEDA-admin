import dbConnect from "src/server/dbConnect";
import corsMiddleware from "./cors";
import bcrypt from "bcryptjs";
import Users from "src/server/model/user.model";

async function handler(req, res) {
  console.log(req.body);
  await dbConnect();
  if (req.method === "POST") {
    try {
      const hased_password = await bcrypt.hash(req.body.password, 12);
      const newAdmin = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hased_password,
        role: "admin",
      });
      newAdmin.save();
      res.statusCode = 200;
      res.json({ status: "success" });
    } catch (err) {
      console.log("error", err);
      res.status(500).send({ message: err.message });
    }
  }
  if (req.method === "GET") {
    try {
      const data = await Users.find();
      res.statusCode = 200;
      res.json(data);
    } catch (err) {
      console.log("error", err);
      res.status(500).send({ message: err.message });
    }
  }
}
export default corsMiddleware(handler);
