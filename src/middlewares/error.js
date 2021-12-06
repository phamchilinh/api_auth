const errorHandler = (err, req, res, next) => {
    res.send(err);
    next();
}

module.exports = {
    errorHandler
}
