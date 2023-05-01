// Configure your app (app.use()) to:
// accept JSON from the Client
// log the Client's requests
import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { getAll, getOneById, createOne, updateOneById, deleteOneById, createImage, } from "./controllers/planets.js";
import { logIn, signUp, logOut } from "./controllers/users.js";
import multer from "multer";
import authorize from "./authorize.js";
import './passport.js';
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage });
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);
app.post("/api/planets", createOne);
app.put("/api/planets/:id", updateOneById);
app.delete("/api/planets/:id", deleteOneById);
app.post("/api/planets/:id/image", upload.single("image"), createImage);
app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.get("/api/users/logout", authorize, logOut);
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
