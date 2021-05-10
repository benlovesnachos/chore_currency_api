const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const choreCurrencySchema = new Schema({
    userId: String,
    choreCurrency: Number
});

choreCurrencySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
choreCurrencySchema.set('toJSON', {
    virtuals: true
});

choreCurrencySchema.findById = function (cb) {
    return this.model('ChoreCurrency').find({id: this.id}, cb);
};

const ChoreCurrency = mongoose.model('ChoreCurrency', choreCurrencySchema);

exports.findByUserId = (userId) => {
    return ChoreCurrency.find({userId: userId});
};

exports.findById = (id) => {
    return ChoreCurrency.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
            }
            return result;
        });
};

exports.createChoreCurrency = (choreCurrencyData) => {
    const choreCurrency = new ChoreCurrency(choreCurrencyData);
    return choreCurrency.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        ChoreCurrency.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchChoreCurrency = (id, choreCurrencyData) => {
    return ChoreCurrency.findOneAndUpdate(
            { _id: id },
            choreCurrencyData
        );
};

exports.addToChoreCurrency = (id, choreCurrencyData) => {
    return ChoreCurrency.updateOne(
            { _id: id },
            { $inc: { "choreCurrency": choreCurrencyData.amount } }
        );
};

exports.assignChoreCurrency = (id, choreCurrencyData) => {
    return ChoreCurrency.updateOne(
            { _id: id },
            { $set: { "userId": choreCurrencyData.userId } }
        );
};

exports.removeById = (choreCurrencyId) => {
    return new Promise((resolve, reject) => {
        ChoreCurrency.deleteMany({_id: choreCurrencyId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

