import initialdb from "./../../server/utils/initialdb";

export default async function handler(req, res) {
    console.log("----- debug api initialdb");
    if (req.method == "GET") {
        try {
            initialdb().then(() => {
                console.log("initialize the database");
                res.status(200).send({ message: "Successfully!!!" });
            });
        } catch (err) {
            console.log("error", err);
            res.status(500).send({ message: err.message });
        }
    } else {
        console.log("----- debug not get");
    }
}
export const runtime = "edge";
