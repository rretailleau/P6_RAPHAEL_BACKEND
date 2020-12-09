const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

///POST api/auth/signup Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
            const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(409).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

  // POST api/auth/login rifie les infos d'identification en nvoyant l'identifiant userID depuis la BD et un jeton Web JSON signé
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'gqvdfnvwnv-è_-èT528',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};