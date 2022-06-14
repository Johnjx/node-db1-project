const router = require('express').Router()
const accountsModel = require('./accounts-model');
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  accountsModel.getAll()
  .then(result => res.json(result))
  .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  accountsModel.create(req.body)
  .then(result => res.status(201).json(result))
  .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  accountsModel.updateById(req.params.id, req.body)
  .then(result => res.json(result))
  .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  accountsModel.deleteById(req.params.id)
  .then(result => res.json(req.account))
  .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error on Accounts Route',
    stack: err.stack
});
})

module.exports = router;
