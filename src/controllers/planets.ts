import { Response, Request } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()(
  "postgres://postgres:postgres@localhost:5432/TestServer"
);

const setupDB = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
    );
  `);
  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
};

setupDB();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );
  res.status(200).json(planet);
};

const planetsSchema = Joi.object({
  name: Joi.string().required(),
});

const createOne = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };
  const validateNewPlanet = planetsSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res.status(400).json({
      msg: validateNewPlanet.error.details[0].message,
    });
  } else {
    await db.none(
      `INSERT INTO planets (name) VALUES ($1)`,
      name
    );
    res.status(201).json({
      msg: "Planet created successfully!",
    });
  }
};

const updateOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  // planets = planets.map((pEl) =>
  //   pEl.id === Number(id) ? { ...pEl, name } : pEl
  // );
  // res.status(201).json({
  //   msg: "Planet Updated successfully!",
  //   planets: planets,
  // });
};

const deleteOneById = async (req: Request, res: Response) => {
  const { id } = req.params;

  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({
    msg: "Planet deleted successfully!",
  });
};

export {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
};

// I already did that part for Ex-12, Everything tested works perfectly!
