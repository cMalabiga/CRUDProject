// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crud-project-4ecfa.firebaseio.com',
});

// Initialize Firestore database
const db = admin.firestore();

// Create Express app    
const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Get a single item
app.get('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const doc = await db.collection('items').doc(itemId).get();
    if (!doc.exists) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// Create a new item
app.post('/api/items', async (req, res) => {
  const newItem = req.body;
  try {
    const docRef = await db.collection('items').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Update an item
app.put('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    const docRef = db.collection('items').doc(itemId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      await docRef.update(updatedItem);
      res.json({ id: itemId, ...updatedItem });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item. Please try again later.' });
  }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const docRef = db.collection('items').doc(itemId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      await docRef.delete();
      res.json({ message: 'Item deleted successfully.' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
