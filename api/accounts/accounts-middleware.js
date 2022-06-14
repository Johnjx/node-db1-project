const accountsModel = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body;
  if (typeof name === 'undefined' || typeof budget === 'undefined') {
    next({
      status: 400,
      message: "name and budget are required"
    })
    return;
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100"
    })
    return;
  }
  if (typeof budget !== 'number') {
    next({
      status: 400,
      message: "budget of account must be a number"
    })
    return;
  }
  if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small"
    })
    return;
  }
  name = name.trim();
  req.body = { name, budget };
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  accountsModel.getByName(req.body.name)
  .then(result => {
    if (result) {
      next({
        status: 400,
        message: "that name is taken"
      });
      return;
    }
    next();
  })
  .catch(next);
}

exports.checkAccountId = (req, res, next) => {
  accountsModel.getById(req.params.id)
  .then(result => {
    if (result == null) {
      next({
        status: 404,
        message: "account not found"
      });
      return;
    }
    req.account = result;
    next();
  })
  .catch(next);
}
