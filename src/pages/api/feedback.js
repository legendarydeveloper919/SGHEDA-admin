import dbConnect from "src/server/dbConnect";
import Feedback from "src/server/model/feedback.model";
import corsMiddleware from "./cors";
async function handler(req, res) {
    console.log(req.method);
    await dbConnect();
    if (req.method === "POST") {
        try {
            const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
            console.log("----- debug signin1 ------", ipAddress);
            const new_Feedback = new Feedback({
                username: req.body.username,
                email: req.body.email,
                context: req.body.context,
                country: req.body.country,
            });
            new_Feedback
                .save()
                .then((feedback) => {
                    res.statusCode = 200;
                    res.json({ feedback: feedback });
                })
                .catch((err) => {
                    console.log("error", err);
                    res.status(500).send({ message: "error occurred" });
                });
        } catch (err) {
            console.log("error", err);
            res.status(500).send({ message: err.message });
        }
    }
    if (req.method === "GET") {
        const feedbacks = await Feedback.find();
        res.statusCode = 200;
        res.json({ feedbacks: feedbacks });
    }
}
export default corsMiddleware(handler);
export const runtime = "edge";
