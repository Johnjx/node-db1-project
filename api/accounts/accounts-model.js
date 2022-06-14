const db = require('../../data/db-config');
const accounts = 'accounts';

const getAll = () => {
  return db(accounts);
}

const getById = id => {
  return db(accounts).where('id', id).first();
}

const getByName = name => {
  return db(accounts).where('name', name).first();
}

const create = async account => {
  const [id] = await db(accounts).insert(account);
  return getById(id);
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  const result = getById(id);
  await db(accounts).where('id', id).delete();
  return result;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
