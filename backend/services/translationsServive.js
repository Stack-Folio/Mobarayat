const mongoose = require("mongoose");
const axios = require("axios");

// Define a schema for translations
const translationSchema = new mongoose.Schema({
    originalText: { type: String, required: true, unique: true, index: true },
    translatedText: { type: String, required: true },
});

const Translation = mongoose.model("Translation", translationSchema);

async function translateToArabicByGoogle(texts) {
    const chunkSize = 100;
    const translatedTexts = [];

    // Step 1: Check existing translations in the database
    const existingTranslations = await Translation.find({
        originalText: { $in: texts },
    });

    const translationMap = new Map();
    existingTranslations.forEach((translation) => {
        translationMap.set(translation.originalText, translation.translatedText);
    });

    const untranslatedTexts = texts.filter((text) => !translationMap.has(text));

    // Step 2: Call Google Translate API for untranslated texts
    for (let i = 0; i < untranslatedTexts.length; i += chunkSize) {
        const chunk = untranslatedTexts.slice(i, i + chunkSize);
        const response = await axios.post(`${process.env.GoogleAPIBaseURL}?key=${process.env.GoogleAPIKey}`, {
            q: chunk,
            target: "ar",
            format: "text",
            source: "en",
            model: "nmt",
        });

        const newTranslations = response.data.data.translations.map((translation, index) => ({
            originalText: chunk[index],
            translatedText: translation.translatedText,
        }));

        // Step 3: Save new translations to the database
        await Translation.insertMany(newTranslations, { ordered: false }).catch(() => {
            // Ignore duplicate key errors from `ordered: false`
        });

        // Update the map with new translations
        newTranslations.forEach((translation) => {
            translationMap.set(translation.originalText, translation.translatedText);
        });
    }

    // Step 4: Build the result array in the original order
    texts.forEach((text) => {
        translatedTexts.push(translationMap.get(text));
    });

    return translatedTexts;
}

module.exports = translateToArabicByGoogle;