const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
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
};

const createNewContact = async(req, res) => {
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
    res.status(201).json(response);
  } else {
    res.status(500).json(result.error);
  }

};

const updateContact = async (req, res) => {
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
    res.status(500).json(result.error);
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db()
  .collection('contacts')
  .remove({ _id: userId });

  if (result.deletedCount > 0){
    res.status(200).send();
  } else {
    res.status(500).json(result.error);
  }

};


module.exports = { getAll, getSingle, createNewContact, updateContact, deleteContact };