const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://trex-b4169.firebaseio.com'
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

app.post('/updateUser', (req, res) => {
  const { user_id, username } = req.body;
  db.collection('users').doc(user_id).update({
    referrals: admin.firestore.FieldValue.arrayUnion(username)
  }).then(() => {
    res.status(200).send('User updated successfully');
  }).catch((error) => {
    console.error('Error updating user: ', error);
    res.status(500).send('Error updating user');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
