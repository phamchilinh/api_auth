const Hand_over = require('../models/Hand_over');

const getHand_overById = async (id) => {
    return Hand_over.find({ _id: id });
};

const createHand_over = async (request_Hand_over) => {
    const hand_over = new Hand_over({
        user_id: request_Hand_over.user_id,
        device_id: request_Hand_over.device_id,
        prev_user_id: request_Hand_over.prev_user_id
    });
    hand_over.save();
    return hand_over;
};

const checkHand_overAccessed = async (id) => {
    const query = { _id: id, accept_user: null };
    const hand_over = await Hand_over.findOne(query);
    if (hand_over) {
        return false;
    }
    return true;
};

const updateHand_over = async (id, request_Hand_over) => {
    const query = { _id: id };
    const hand_over = Hand_over.findOneAndUpdate(query, {
        user_id: request_Hand_over.user_id,
        device_id: request_Hand_over.device_id,
        prev_user_id: request_Hand_over.prev_user_id,
    }, {upsert:true});
    return hand_over;
};

const accessHand_over = async (idUser, idHand_over, request_Hand_over) => {
    const query = { _id: idHand_over, user_id: idUser, accept_user: null};
    const hand_over = Hand_over.findOneAndUpdate(query, {
        accept_user: request_Hand_over.accept_user,    
      }, {upsert:true});
    return hand_over;
};

module.exports = {
    getHand_overById,
    createHand_over,
    updateHand_over,
    checkHand_overAccessed,
    accessHand_over

}