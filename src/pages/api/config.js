import dbConnect from "src/server/dbConnect";
import corsMiddleware from "./cors";
import ConfigDatas from "src/server/model/config_data";
async function handler(req, res) {
  console.log(req.body);
  await dbConnect();
  if (req.method === "POST") {
    try {
      const data = await ConfigDatas.find();
      if (data.length == 0) {
        const newconfig = new ConfigDatas({
          downloaders: 0,
          auto_reply: true,
        });
        newconfig.save();
      }
      await ConfigDatas.updateOne({}, { $set: { auto_reply: req.body.value } }, { upsert: true });
      console.log("here");
      res.statusCode = 200;
      res.json({ status: "success" });
    } catch (err) {
      console.log("error", err);
      res.status(500).send({ message: err.message });
    }
  }
  if (req.method === "GET") {
    try {
      const data = await ConfigDatas.findOne();
      console.log(data.auto_reply);
      if (!data) {
        res.statusCode = 200;
        res.json({ auto_reply: true });
      } else res.json(data.auto_reply);
    } catch (err) {
      console.log("error", err);
      res.status(500).send({ message: err.message });
    }
  }
}
export default corsMiddleware(handler);
