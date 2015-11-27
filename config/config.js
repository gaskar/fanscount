'use strict';

module.exports = {
    shared: {
        apiVersion: '1'
    },

    local: {
        db: 'mongodb://localhost/fanscount',
        facebook: {
            clientID: '1181266078551054',
            clientSecret: '11c9c0e5cbf9c499b1f40ff98b533881',
            callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email'],
            enableProof: false
        },
        google: {
            clientID: '586086766292-9fcgflakrnpbfkk2amig8se89uammqq0.apps.googleusercontent.com',
            clientSecret: '4MsPvlSzLHtPc6ssy-1TTXgg',
            callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
        }
    },

    testing: {
        db: 'mongodb://localhost/fanscount-testing',
        facebook: {
            clientID: '1181266078551054',
            clientSecret: '11c9c0e5cbf9c499b1f40ff98b533881',
            callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email'],
            enableProof: false
        },
        google: {
            clientID: '586086766292-9fcgflakrnpbfkk2amig8se89uammqq0.apps.googleusercontent.com',
            clientSecret: '4MsPvlSzLHtPc6ssy-1TTXgg',
            callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
        }
    },

    staging: {
        db: 'mongodb://localhost/fanscount',
        facebook: {
            clientID: '1505714743059869',
            clientSecret: 'fee83c5a046624bb2fa20c6ab606e1f4',
            callbackURL: 'http://fanscount-staging.herokuapp.com/api/v1/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email'],
            enableProof: false
        },
        google: {
            clientID: '586086766292-9fcgflakrnpbfkk2amig8se89uammqq0.apps.googleusercontent.com',
            clientSecret: '4MsPvlSzLHtPc6ssy-1TTXgg',
            callbackURL: 'http://fanscount.herokuapp.com/api/v1/auth/google/callback'
        }
    },

    production: {
        db: 'mongodb://localhost/fanscount',
        facebook: {
            clientID: '1181266078551054',
            clientSecret: '11c9c0e5cbf9c499b1f40ff98b533881',
            callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email'],
            enableProof: false
        },
        google: {
            clientID: '586086766292-9fcgflakrnpbfkk2amig8se89uammqq0.apps.googleusercontent.com',
            clientSecret: '4MsPvlSzLHtPc6ssy-1TTXgg',
            callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
        }
    }
};