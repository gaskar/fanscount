'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {
        type: String,
        index: {
            unique: true
        }
    },

    name: {
        type: String,
        index: true
    },

    email: {
        type: String,
        index: {unique: true}
    },

    avatar: {
        source: String,
        path: String
    },

    likes: {
        type: [mongoose.Schema.ObjectId]
    },

    disLikes: {
        type: [mongoose.Schema.ObjectId]
    },

    deleted: {
        type: Boolean,
        default: false,
        sparse: true
    },

    updated: {
        type: Date,
        default: Date.now
    },

    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.hashedPassword = this.encryptPassword(this._password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.statics.sensetiveFields = [
    'deleted',
    '__v'
];

UserSchema.index({fullName: 1, email: 1});

UserSchema.pre('save', function (next) {
    this.updated = new Date();
    next();
});

var transform = function (doc, ret) {
    ret = ret || {};

    for (var i = 0; i < UserSchema.statics.sensetiveFields.length; i++) {
        var field = UserSchema.statics.sensetiveFields[i];
        if (ret[field] !== 'undefined') {
            delete ret[field];
        }
    }

    return ret;
};

UserSchema.set('toJSON', {transform: transform});
UserSchema.set('toObject', {transform: transform});

mongoose.model('User', UserSchema);
