require('dotenv').config();
const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Connessione al database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Strategia Passport JWT
const opzioni = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(opzioni, async (jwt_payload, done) => {
    try {
      const risultato = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);
      if (risultato.rows.length > 0) {
        return done(null, risultato.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (errore) {
      return done(errore, false);
    }
  })
);

app.use(passport.initialize());

// Rotta per la registrazione
app.post('/registrazione', async (req, res) => {
  const { username, password } = req.body;
  try {
    const passwordCriptata = await bcrypt.hash(password, 10);
    const risultato = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, passwordCriptata]
    );
    res.json({ messaggio: 'Utente registrato con successo', idUtente: risultato.rows[0].id });
  } catch (errore) {
    res.status(500).json({ messaggio: 'Errore durante la registrazione dell\'utente' });
  }
});

// Rotta per il login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const risultato = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (risultato.rows.length > 0) {
      const utente = risultato.rows[0];
      const corrispondenza = await bcrypt.compare(password, utente.password);
      if (corrispondenza) {
        const payload = { id: utente.id, username: utente.username };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, utente.id]);
        res.json({ messaggio: 'Login effettuato con successo', token: `Bearer ${token}` });
      } else {
        res.status(400).json({ messaggio: 'Password non corretta' });
      }
    } else {
      res.status(400).json({ messaggio: 'Utente non trovato' });
    }
  } catch (errore) {
    res.status(500).json({ messaggio: 'Errore durante il login' });
  }
});

// Esempio di rotta protetta
app.get(
  '/protetta',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ messaggio: 'Hai accesso a questa rotta protetta', utente: req.user });
  }
);

const PORTA = process.env.PORT || 3005;
app.listen(PORTA, () => console.log(`Server in esecuzione sulla porta ${PORTA}`));