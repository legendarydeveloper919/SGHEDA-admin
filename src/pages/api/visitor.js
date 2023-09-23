import dbConnect from "src/server/dbConnect";
import Visitors from "src/server/model/visitor.model";
import geoip from "geoip-lite";
import corsMiddleware from "./cors";
async function handler(req, res) {
  console.log(req.method);
  await dbConnect();
  if (req.method === "POST") {
    try {
      const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const geo = geoip.lookup(ipAddress);
      console.log("----- debug signin1 ------", ipAddress);
      const new_Visitor = new Visitors({
        address: req.body.name,
        time: new Date.now(),
      });
      new_Visitor.save();
      res.statusCode = 200;
      res.json({ ipAddress, country });
    } catch (err) {
      console.log("error", err);
      res.status(500).send({ message: err.message });
    }
  }
  if (req.method === "GET") {
    const visitors = await Visitors.find();
    console.log("----- debug signin2 ------", geo);
    res.statusCode = 200;
    res.json(visitors.length);
    console.log(visitors.length);
  }
}
export default corsMiddleware(handler);
