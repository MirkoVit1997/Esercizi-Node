import { Request, Response } from 'express';
import Joi from 'joi';

type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Pianeta non trovato" });
  res.status(200).json(planet);
};

export const create = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet: Planet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Pianeta creato con successo" });
};

export const updateById = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planets = planets.map(p => 
    p.id === parseInt(req.params.id) ? { ...p, name: req.body.name } : p
  );

  const updatedPlanet = planets.find(p => p.id === parseInt(req.params.id));
  if (!updatedPlanet) return res.status(404).json({ msg: "Pianeta non trovato" });

  res.status(200).json({ msg: "Pianeta aggiornato con successo" });
};

export const deleteById = (req: Request, res: Response) => {
  const initialLength = planets.length;
  planets = planets.filter(p => p.id !== parseInt(req.params.id));

  if (planets.length === initialLength) {
    return res.status(404).json({ msg: "Pianeta non trovato" });
  }

  res.status(200).json({ msg: "Pianeta eliminato con successo" });
};

