const Department = require('../models/department.model');

exports.getAllRecords = async (req, res) => {
  try {
    res.json(await Department.find())
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomRecord = async (req, res) => {

  try {

    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getRecordById = async (req, res) => {

  try {

    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.addNewRecord = async (req, res) => {

  try {

    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'Ok' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
  
};

exports.editRecord = async (req, res) => {
  const { name } = req.body;

  try {

    const dep = await Department.findById(req.params.id);
    if(dep) {
      dep.name = name;
      await dep.save();
      res.json(await Department.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteRecord = async (req, res) => {

  try {

    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json(await Department.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};