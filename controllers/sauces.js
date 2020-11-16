const Sauce = require('../models/Sauce');
const fs = require('fs');

  // POST /api/sauces 
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

  // GET api/sauces Renvoie le tableau de toutes les sauces dans la base de données
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

  // GET api/sauce/:id Renvoie la sauce avec l'ID fourni
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

  // DELETE /api/sauces/:id supprime la ressource
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

// PUT /api/sauces/:id mofifie 1 objet de la BD
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// PUT /api/sauces/:id/like  enregistre le nb 0/1 de l'id et l'ajoute au total like/dislike
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const userId = req.body.userId;
      const userWantsToLike = req.body.like === 1;
      const userWantsToDislike = req.body.like === -1;
      const userWantsToCancel = req.body.like === 0;
      const userCanLike = !sauce.usersLiked.includes(userId);
      const userCanDislike = !sauce.usersDisliked.includes(userId);
      const userCanCancel = (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId));
      // identifie letat  de la ressource -1 0 1  
        // res status sauce req.param = userCanToLike || userCanDislike || userCanCancel

      // annule l'etat pour permettre l'action ou autorise l'action 
        // si userWantsToLike || userWantsToDislike => userWantsToCancel

      //  effectue l'action L D
        // sauce.updateOne => userWantsToLike || userWantsToDislike

      // ajoute l'action aux statuts et renvoie le tableau des statuts.
        // sauce.save 

       // { ...JSON.parse(req.body.sauce)} : { ...req.body };


    })
    .catch(error => res.status(400).json({ error }));


};