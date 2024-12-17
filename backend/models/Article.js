const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  NameAr: { type: String, required: true },
  Title: { type: String, required: true },
  TitleAr: { type: String, required: true },
  Description: { type: String, required: false },
  DescriptionAr: { type: String, required: false },
  Keywords: { type: String, required: false },
  KeywordsAr: { type: String, required: false },
  Body: { type: String, required: true },
  BodyAr: { type: String, required: true },
  ImageURL: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
