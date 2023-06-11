import NoteDAO from "../DAO/NoteDAO";

const create = (context) => {
  const query = async () => {
    const result = NoteDAO.query();
    if (result) {
      return result;
    }
  };

  const createNewOrUpdate = async (data) => {
    const result = await NoteDAO.createNewOrUpdate(data);
    if (result) {
      return result;
    }
  };

  const removeById = async (noteId) => {
    const result = await NoteDAO.removeById(noteId);
    if (result) {
      return result;
    }
  };

  const getById = async (noteId) => {
    const result = await NoteDAO.getById(noteId);
    if (result) {
      return result;
    }
  };

  return {
    query,
    createNewOrUpdate,
    removeById,
    getById,
  };
};

export default {
  create,
};