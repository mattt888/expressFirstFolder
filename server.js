const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-comment', (req, res) => {
    const comment = req.body.comment;

    console.log('Client IP:', req.connection.remoteAddress);
    console.log('Client Port:', req.connection.remotePort);
    console.log('Server IP:', req.connection.localAddress);
    console.log('Server Port:', req.connection.localPort);
    console.log('HTTP Method:', req.method);
    console.log('HTTP URL:', req.url);
    console.log('HTTP Headers:', req.headers);
    
    console.log('Submitted Comment:', comment);

    fs.appendFile('comments.txt', comment + '\n', (err) => {
        if (err) {
            console.error('Error saving comment:', err);
            res.status(500).json({ error: 'Error saving comment' });
        } else {
            res.json({ comment });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
