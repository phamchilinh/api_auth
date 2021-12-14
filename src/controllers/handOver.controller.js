const { getHand_overById, createHand_over, checkHand_overAccessed, accessHand_over, updateHand_over } = require('../services/handOver.service');

async function postHandOver(req, res, next) {
  try {
    const hand_over = await createHand_over(req.body);
    if (!hand_over) {
      return res.send("hand over not added.");
    }
    return res.send({hand_over: hand_over._id});
  } catch (error) {
    next(error);
  }
}

async function getHandOver(req, res, next) {
  try {
    const hand_over = await getHand_overById(req.query.id);
    if (!hand_over) {
      return res.send("No hand over by this ID");
    }
    return res.json(hand_over);
  } catch (error) {
    next(error);
  }
}

async function putHandOver(req, res, next) {
  try {
    const hand_overAccessed = await checkHand_overAccessed(req.query.id);
    if (hand_overAccessed) {
      return res.send("Not update, user accessed!");
    }
    const hand_overUpdated = await updateHand_over(req.query.id, req.body);
    if (hand_overUpdated) {
      return res.send("Not Updated!");
    }
    return res.send({hand_overUpdated: hand_overUpdated._id});
  } catch (error) {
    next(error);
  } 
}

async function userAccessHandOver(req, res, next) {
    try {
      const hand_over = await accessHand_over(req.user.id, req.query.id, req.body);
      if (!hand_over) {
        return res.send("hand over not access denied.");
      }
      return res.send({hand_over: hand_over._id});
    } catch (error) {
      next(error);
    } 
}

module.exports = {
    postHandOver,
    getHandOver,
    putHandOver,
    userAccessHandOver,
};
