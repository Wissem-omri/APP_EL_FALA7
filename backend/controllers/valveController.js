import Valve from "../models/Valve.js";
export const createValve = async (req, res) => {
  try {
    const valve = await Valve.create(req.body);
    res.status(201).json(valve);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getValvesByFarm = async (req, res) => {
  const valves = await Valve.find({ farm: req.params.farmId });
  res.json(valves);
};
export const updateValve = async (req, res) => {
  const valve = await Valve.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(valve);
};
export const deleteValve = async (req, res) => {
  await Valve.findByIdAndDelete(req.params.id);
  res.json({ message: "Valve deleted" });
};