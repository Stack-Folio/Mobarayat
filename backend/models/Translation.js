const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
});

// Avoid recompiling the model
module.exports = mongoose.models.Translation || mongoose.model('Translation', translationSchema);
