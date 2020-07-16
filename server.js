const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

const usersRoutes = require('./routes/users');
const packagesRoutes = require('./routes/packages');
const shippoRoutes = require('./routes/shippoAPI');
const { allowedNodeEnvironmentFlags } = require('process');

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

app.use('/api/users', usersRoutes);
// Load config/auth
app.use(require('./config/auth'));
app.use('/api/packages', packagesRoutes);
app.use('/api/shippoAPI', shippoRoutes);

// Catch all
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});