const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getSingle = async (req, res, next) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewContact = async(req, res) => {
  try{
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
  .getDb()
  .db()
  .collection('contacts')
  .insertOne(newContact);

  if (result.acknowledged){
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error);
  }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateContact = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  
  if (result.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteContact = async (req, res) => {
  try {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db()
  .collection('contacts')
  .deleteOne({ _id: userId }, true);
  console.log(response);
  if (result.deletedCount > 0){
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { getAll, getSingle, createNewContact, updateContact, deleteContact };