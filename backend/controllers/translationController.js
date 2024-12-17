// const Translation = require('../models/Translation'); // Import the model

// // Get all original texts
// exports.getOriginalTexts = async (req, res) => {
//   try {
//     const texts = await Translation.find({}, 'originalText'); // Fetch only originalText field
//     const originalTexts = texts.map((record) => record.originalText);
//     res.status(200).json(originalTexts);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching original texts', details: err.message });
//   }
// };

// // Update translated text by original text
// exports.updateTranslatedText = async (req, res) => {
//   const { originalText, value } = req.body;

//   if (!originalText || !value) {
//     return res.status(400).json({ error: 'Both originalText and value are required' });
//   }

//   try {
//     const updatedRecord = await Translation.findOneAndUpdate(
//       { originalText },
//       { translatedText: value },
//       { new: true } // Return the updated document
//     );

//     if (!updatedRecord) {
//       return res.status(404).json({ message: 'Record not found' });
//     }

//     res.status(200).json({
//       message: 'Translation updated successfully',
//       record: updatedRecord,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating translation', details: err.message });
//   }
// };

// // Get translatedText by originalText
// exports.getTranslatedText = async (req, res) => {
//   const { originalText } = req.query;

//   if (!originalText) {
//     return res.status(400).json({ error: 'originalText query parameter is required' });
//   }

//   try {
//     const translation = await Translation.findOne({ originalText });
//     if (!translation) {
//       return res.status(404).json({ error: 'Translation not found' });
//     }

//     res.status(200).json({ translatedText: translation.translatedText });
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching translation', details: err.message });
//   }
// };

// // Search records by translatedText
// exports.searchByTranslatedText = async (req, res) => {
//   const { translatedText } = req.query;

//   if (!translatedText) {
//     return res.status(400).json({ error: 'translatedText query parameter is required' });
//   }

//   try {
//     // Perform a case-insensitive search using a regular expression
//     const matches = await Translation.find({
//       translatedText: { $regex: translatedText, $options: 'i' }
//     });

//     if (matches.length === 0) {
//       return res.status(404).json({ message: 'No records found matching the search term' });
//     }

//     res.status(200).json(matches);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching records', details: err.message });
//   }
// };
const Translation = require('../models/Translation'); // Import the model

// Get all original texts
exports.getOriginalTexts = async (req, res) => {
  try {
    const texts = await Translation.find({}, '_id originalText translatedText'); // Fetch only originalText field
   
    res.status(200).json(texts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching original texts', details: err.message });
  }
};

// Update translated text by original text
exports.updateTranslatedText = async (req, res) => {
  const { originalText, value } = req.body;

  if (!originalText || !value) {
    return res.status(400).json({ error: 'Both originalText and value are required' });
  }

  try {
    const updatedRecord = await Translation.findOneAndUpdate(
      { originalText },
      { translatedText: value },
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({
      message: 'Translation updated successfully',
      record: updatedRecord,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error updating translation', details: err.message });
  }
};

// Get translatedText by originalText
exports.getTranslatedText = async (req, res) => {
  const { originalText } = req.query;

  if (!originalText) {
    return res.status(400).json({ error: 'originalText query parameter is required' });
  }

  try {
    const translation = await Translation.findOne({ originalText });
    if (!translation) {
      return res.status(404).json({ error: 'Translation not found' });
    }

    res.status(200).json({ translatedText: translation.translatedText });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching translation', details: err.message });
  }
};

// Search records by translatedText
exports.searchByTranslatedText = async (req, res) => {
  const { translatedText } = req.query;

  if (!translatedText) {
    return res.status(400).json({ error: 'translatedText query parameter is required' });
  }

  try {
    // Perform a case-insensitive search using a regular expression
    const matches = await Translation.find({
      translatedText: { $regex: translatedText, $options: 'i' }
    });

    if (matches.length === 0) {
      return res.status(404).json({ message: 'No records found matching the search term' });
    }

    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching records', details: err.message });
  }
};