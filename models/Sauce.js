const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  heat: { type: Number, required: true }, //1-10
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  usersLiked: { type: String, required: true }, //tableau
  usersDisliked: { type: String, required: true }, //tableau
  userId: { type: String, required: true }
  });

module.exports = mongoose.model('Sauce', sauceSchema);