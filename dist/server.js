// Configure your app (app.use()) to:
// accept JSON from the Client
// log the Client's requests
import express from "express";
import morgan from "morgan";
import "dotenv/config";
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
app.get("/planets", (req, res) => {
    res.status(200).json(planets);
});
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
