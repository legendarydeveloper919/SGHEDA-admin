const corsMiddleware = (handler) => (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with the appropriate origin or origins
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Update with the allowed HTTP methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Update with the allowed headers

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    return handler(req, res);
};

export default corsMiddleware;
