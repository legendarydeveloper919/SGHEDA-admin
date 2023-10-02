import dbConnect from "src/server/dbConnect";
import Customers from "src/server/model/customer.model";
// import geoip from "geoip-lite";
import corsMiddleware from "./cors";
import ConfigDatas from "src/server/model/config_data";

// first, define caesarEncrypt function

function caesarEncrypt(plaintext, shift) {
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];

        if (char.match(/[a-z]/i)) {
            // It's an alphabet character
            let code = plaintext.charCodeAt(i);
            let encrypted_char = String.fromCharCode(
                char.toUpperCase() === char
                    ? ((code - 65 + shift) % 26) + 65
                    : ((code - 97 + shift) % 26) + 97
            );
            ciphertext += encrypted_char;
        } else if (char.match(/[0-9]/)) {
            // It's a digit
            let encrypted_char = String.fromCharCode(((char.charCodeAt(0) - 48 + shift) % 10) + 48);
            ciphertext += encrypted_char;
        } else {
            ciphertext += char;
        }
    }
    console.log("ciphertext", ciphertext);
    return ciphertext;
}

// then use caesarEncrypt inside generateLicense function

function generateLicense(props) {
    const { type, encryption_key, machine_number, design, analysic } = props;
    let current_time = new Date();
    console.log(current_time);

    if (machine_number) {
        let num_design;
        let num_analysis;

        if (type == "Fully") {
            num_design = "g8u4";
            num_analysis = "bisk";
        } else {
            num_design = ("0000" + design).slice(-4);
            num_analysis = ("0000" + analysic).slice(-4);
        }

        let time = current_time.toISOString().split("T")[1].split(":").join("").slice(0, 4);
        let day = current_time
            .toISOString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("")
            .slice(0, 4);
        let year = current_time.getFullYear().toString().slice(2);
        // console.log("time:", time);
        let data =
            time +
            num_design +
            machine_number.slice(8, 16) +
            day +
            num_analysis +
            machine_number.slice(0, 8) +
            year;

        const encrypted_data = caesarEncrypt(data, encryption_key);
        return encrypted_data;
    }
}

async function handler(req, res) {
    console.log(
        generateLicense({
            type: "Fully",
            encryption_key: 5,
            machine_number: "0079dd7b4fdad3ea",
            design: 10,
            analysic: 10,
        })
    );
    await dbConnect();
    if (req.method === "POST") {
        try {
            const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
            // const geo = geoip.lookup(ipAddress);
            console.log("----- debug signin1 ------", req.body.price);
            const new_Customer = new Customers({
                name: req.body.name,
                email: req.body.email,
                machine_number: req.body.machine_number,
                country: req.body.country,
                reigon: req.body.reigon,
                payment_history: [{ price: req.body.price, state: "pending" }],
                createdAt: new Date().getTime(),
            });
            new_Customer.save();
            res.statusCode = 200;
            res.json({ status: "success" });
        } catch (err) {
            console.log("error", err);
            res.status(500).send({ message: err.message });
        }
    }
    if (req.method === "GET") {
        const customers = await Customers.find();
        res.statusCode = 200;
        res.json(customers);
    }
}
export default corsMiddleware(handler);
