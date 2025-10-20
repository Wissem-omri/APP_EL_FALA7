import Farm from "../models/Farm.js";
export const createFarm = async (req, res) => {
  try {
    const farm = await Farm.create({ ...req.body, user: req.user.id });
    res.status(201).json(farm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getFarms = async (req, res) => {
  const farms = await Farm.find({ user: req.user.id });
  res.json(farms);
};
export const updateFarm = async (req, res) => {
  const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(farm);
};
export const deleteFarm = async (req, res) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.json({ message: "Farm deleted" });
};
//farm