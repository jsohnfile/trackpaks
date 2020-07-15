const Package = require('../models/package');

module.exports = {
    index,
    create,
    update,
    delete: deleteOne,
};

// index
async function index(req, res) {
    try{
        const packages = await Package.find({user: req.user._id}).populate('user');
        res.status(200).json(packages);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// create
async function create(req, res) {
    req.body.user = req.user._id;
    try{
        const package = await Package.create(req.body);
        res.status(201).json(package);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// update
async function update(req, res) {
    try{
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedPackage);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// delete
async function deleteOne(req, res) {
    try{
        const deletedPackage = await Package.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPackage);
    }
    catch(err){
        res.status(500).json(err);
    }
}