const accountsModel = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  
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
