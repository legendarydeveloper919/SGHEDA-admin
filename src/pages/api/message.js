import dbConnect from "src/server/dbConnect";
import corsMiddleware from "./cors";
import Messages from "src/server/model/message.model";
async function handler(req, res) {
    console.log(req.body);
    await dbConnect();
    // if (req.method === "OPTIONS") {
    try {
        const newMessage = new Messages({
            name: req.body.name,
            email: req.body.email,
            content: req.body.message,
        });
        await newMessage.save();
        res.statusCode = 200;
        res.json({});
        // const newV = new Visitors({ address: "192.168.122.7", time: "2003.01.17" });
        // await newV.save();
    } catch (err) {
        console.log("error", err);
        res.status(500).send({ message: err.message });
    }
}
export default corsMiddleware(handler);

export const runtime = "edge";
