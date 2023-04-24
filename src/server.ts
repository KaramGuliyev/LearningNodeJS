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

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id: Number(id), name: name };
  planets = [...planets, newPlanet];

  res.status(201).json({ msg: "Planet created successfully!" });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((pEl) =>
    pEl.id === Number(id) ? { ...pEl, name } : pEl
  );
  res.status(201).json({ msg: "Planet Updated successfully!" });
});

app.delete("/api/planets", (req, res) => {
  const { id } = req.body;
  planets.filter((el) => el.id !== Number(id));
  res.status(200).json({ msg: "Planet deleted successfully!" });
});

app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}`
  );
});
