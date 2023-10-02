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
            newAdmin
                .save()
                .then((result) => {
                    res.statusCode = 200;
                    res.json({ data: result });
                })
                .catch((e) => {
                    console.log("error on saving: ", e);
                    res.status(500).send({ message: "Error occurred on saving" });
                });
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
    if (req.method === "PUT") {
        try {
            const default_password = await bcrypt.hash("123456", 12);
            const data = await Users.findOneAndUpdate(
                { _id: req.body._id },
                {
                    password: default_password,
                },
                { new: true }
            );
            res.statusCode = 200;
            res.json(data);
        } catch (err) {
            console.log("error", err);
            res.status(500).send({ message: err.message });
        }
    }
    if (req.method === "DELETE") {
        try {
            const data = await Users.findOneAndDelete({ _id: req.body._id });
            res.statusCode = 200;
            res.json(data);
        } catch (err) {
            console.log("error", err);
            res.status(500).send({ message: err.message });
        }
    }
}
export default corsMiddleware(handler);
