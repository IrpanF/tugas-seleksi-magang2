const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Simulasi database (dalam kenyataan, gunakan database yang sesungguhnya)
const users = [];

// Secret key untuk JWT
const secretKey = 'supersecretkey';

// Route untuk root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js JWT Authentication API');
});

// Route untuk pendaftaran (signup)
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
});

// Route untuk login (signin)
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
});

// Route yang dilindungi
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        res.status(200).json({ message: 'Welcome to the protected route', user: decoded.username });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
