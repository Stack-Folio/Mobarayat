require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const leaguesRoute = require('./routes/football_api/leagues');
const savedLeaguesRoute = require('./routes/football_api/savedLeagues');
const bestEventsRoute = require('./routes/football_api/bestEvents');
const fixturesRoute = require('./routes/football_api/fixtures');
const fixtureDetailsRoute = require('./routes/football_api/fixtureDetails');
const topscorersRoute = require('./routes/football_api/topscorers');
const standingsRoute = require('./routes/football_api/standings');
const articleRoutes = require('./routes/article');
const favoriteRoutes = require('./routes/favorite');
const translationsRoutes = require('./routes/translations');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/getLeagues', leaguesRoute);
app.use('/api/getSavedLeagues', savedLeaguesRoute);
app.use('/api/getBestEvents', bestEventsRoute);
app.use('/api/getFixtures', fixturesRoute);
app.use('/api/getFixtureDetails', fixtureDetailsRoute);
app.use('/api/getTopscorers', topscorersRoute);
app.use('/api/getStandings', standingsRoute);
app.use('/api/articles', articleRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/translations', translationsRoutes);

// Simple route
app.get('/', (req, res) => {
    res.send('Welcome to YallaBuz!');
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));