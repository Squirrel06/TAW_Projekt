import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';


const noteSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
}, {
  collection: 'notes'
});


const NoteModel = mongoose.model('notes', noteSchema);

function createNewOrUpdate(note) {
  return Promise.resolve().then(() => {
    if (!note.id) {
      return new  NoteModel(note).save().then(result => {
        if (result) {
          return mongoConverter(result);
        }
      });
    } else {
      return NoteModel.findByIdAndUpdate(note.id, _.omit(note, 'id'), { new: true });
    }
  }).catch(error => {
    throw error;
  });
}

async function getById(id) {
  const result = await NoteModel.findOne({_id:id});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Note not found');
}

async function removeById(id) {
  return await NoteModel.findByIdAndRemove(id);
}

async function query() {
  const result = await NoteModel.find();
  if (result) {
      return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Note not found');
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getById,
  query,
  removeById: removeById,
  model: NoteModel
};
