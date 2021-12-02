function authUser(req, res, next) {
    if (req.user == null) {
      res.status(403);
      return res.send('You need to sign in');
    }
  
    next()
}
  
function authPermission(per) {
    return (req, res, next) => {
        if (req.per == null) {
            return res.status(401).send('Not allowed');
        }
        if (req.per.permisson_type !== per) {
            return res.res.status(401).send('Not allowed');
        }

    next()
    }
}
  
  module.exports = {
    authUser,
    authPermission
  }