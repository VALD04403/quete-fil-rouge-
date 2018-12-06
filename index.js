
const express = require('express')
const app = express()
const port = 3000
const connection = require('./conf')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    res.send('Bienvenue sur cars')
})
app.get('/api/movie', (req, res) => {
    connection.query('SELECT * from movie', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération des films')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/movie/genre', (req, res) => {
    connection.query('SELECT genre from movie', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération du genre des films')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/cars/genre/action', (req, res) => {
    connection.query('SELECT * from movie WHERE genre LIKE "action"', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération du genre action')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/movie/genre/r', (req, res) => {
    connection.query('SELECT * from movie WHERE genre LIKE "r%"', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération du genre commençant par r')
       } else {
           res.json(results)
        }
    })
})
app.get('/api/movie/date_sortie', (req, res) => {
    connection.query('SELECT * from movie WHERE date_sortie > "2015"', (err, results) => {
       if (err) {
       res.status(500).send('Erreur lors de la récupération de la date de sortie des films')
       } else {
           res.json(results)
        }
    })
})
 app.get('/api/movie/id/:order', (req, res) => {
     const order = req.params.order;
     connection.query(`SELECT * FROM cars WHERE id ORDER BY id ${order}`, (err, results) => {
         if (err) {
             res.status(500).send('Erreur lors de la récupération des genres par ordre')
             } else {
               res.json(results);
       }
   });
});
app.post('/api/movie', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
    if (err) {
        res.status(500).send("Erreur lors de la sauvegarde d'un film");
        } else {
          res.sendStatus(200);
          }
    });
});
app.put('/api/movie/:id', (req, res) => {
   const idMovie = req.params.id;
   const formData = req.body;
       connection.query('UPDATE movie SET ? WHERE id = ?', [formData, idMovie], err => {
         if (err) {
            res.status(500).send("Erreur lors de la modification d'un film");
            } else {
               res.sendStatus(200);
        }
    });
});
app.put('/api/movie/photo/:id', (req, res) => {
    const photoMovie = req.params.id;
        connection.query('UPDATE movie SET photo = !photo WHERE id = ?', [photoMovie], err => {
          if (err) {
             res.status(500).send("Erreur lors de la modification du boolean");
             } else {
                res.sendStatus(200);
         }
     });
 });
 app.delete('/api/movie/:id', (req, res) => {
    const idMovie = req.params.id;
    connection.query('DELETE FROM movie WHERE id = ?', [idMovie], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d'un film");
      } else {
        res.sendStatus(200);
      }
    });
  });
  app.delete('/api/movie/photo', (req, res) => {
    connection.query('DELETE FROM movie WHERE photo = "0"', err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d'un film'");
      } else {
        res.sendStatus(200);
      }
    });
  });

app.listen(port, (err) => {
    console.log(`server is listening on ${port}`)
})