const router = require('express').Router()
const accountsModel = require('./accounts-model');
const { checkAccountId } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  accountsModel.getAll()
  .then(result => res.json(result))
  .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account);
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error on Accounts Route',
    stack: err.stack
});
})

module.exports = router;
