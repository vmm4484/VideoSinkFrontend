//Install express server
const express = require('express');
const path = require('path');

const app = express();
const port=process.env.PORT || 8080;
// Serve only the static files form the dist directory
app.use(express.static('./dist/chat-application'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/chat-application'}),
);

// Start the app by listening on the default Heroku port
app.listen(port,() => console.log(`listening on port ${port}`));