const express = require('express')
const app = express()
const port = 3000
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:postgres@localhost:5433/cronogramas')
app.use(express.json());

// Codido do Hugo sincronização de maquinas

const IP_1 = `172.16.221.204`
const PORT_1 = 3000
const SERVER_1 = [IP_1,PORT_1].join(':');

const IP_2 = `172.16.221.33`
const PORT_2 = 3030
const SERVER_2 = [IP_2,PORT_2].join(':');

const IP_3 = `172.16.222.233`
const PORT_3 = 3001
const SERVER_3 = [IP_3,PORT_3].join(':');

const IP_4 = `172.16.221.55`
const PORT_4 = 3000
const SERVER_4 = [IP_4,PORT_4].join(':');

const IP_5 = `172.16.221.155`
const PORT_5 = 3000
const SERVER_5 = [IP_5,PORT_5].join(':');


db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })

  app.get('/turmas', (req, res) => {
    let id = req.params.id
    db.any(`SELECT * FROM turmas`)
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou todas as pessoas"
      });
    })
    .catch(function(error) {
      console.log('ERROR:', error)
    })
    
  })
  
  
  app.get('/aulas', (req, res) => {
    let id = req.params.id
    db.any(`SELECT * FROM aulas`)
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou todas as pessoas"
      });
    })
    .catch(function(error) {
      console.log('ERROR:', error)
    })
    
  })
  app.post('/aulas', (req, res) => {
    const {id_aula, data_aula, status_aula, fk_turma, fk_unidade, fk_sala} = req.body;
    db.any('INSERT INTO aulas(id_aula, data_aula, status_aula, fk_turma, fk_unidade, fk_sala) VALUES ($1, $2, $3, $4, $5, $6)',
  [id_aula, data_aula, status_aula, fk_turma, fk_unidade, fk_sala]
)
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou todas as pessoas"
      });
})
    .catch(function(error) {
      console.log('ERROR:', error)
    })
  })

  app.post('/turmas', (req, res) => {
    const {id_turma, polo_educacional, turno, presencial, data_inicio, data_fim, horas_aula_dia, fk_curso} = req.body;
    db.any('INSERT INTO turmas(id_turma, polo_educacional, turno, presencial, data_inicio, data_fim, horas_aula_dia, fk_curso) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
  [id_turma, polo_educacional, turno, presencial, data_inicio, data_fim, horas_aula_dia, fk_curso]
)
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou todas as pessoas"
      });
})
    .catch(function(error) {
      console.log('ERROR:', error)
    })
  })

  app.put("/aulas/:id", (req, res) => {
    const id_aula = req.params.id;
    const { status_aula } = req.body;
    db.none(
      "UPDATE aulas SET status_aula = $1 WHERE id_aula = $2",
      [status_aula, id_aula]
    )
      .then(() => {
        res.json({ status: "success", message: "aula atualizada com sucesso." });
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.status(500).json({ status: "error", message: "Erro ao atualizar a aula." });
      });
  });
  
  app.put("/turmas/:id", (req, res) => {
    const id_turma = req.params.id;
    const { presencial } = req.body; // Corrigido o nome da variável
    db.none(
      "UPDATE turmas SET presencial = $1 WHERE id_turma = $2",
      [presencial, id_turma]
    )
      .then(() => {
        res.json({ status: "success", message: "Turma atualizada com sucesso." });
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.status(500).json({ status: "error", message: "Erro ao atualizar a turma." });
      });
});

app.delete("/aulas/:id", (req, res) => {
  const id_aula = req.params.id;
  db.none("DELETE FROM aulas WHERE id_aula = $1", [id_aula])
    .then(() => {
      res.json({ status: "success", message: "Aula excluída com sucesso." });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).json({ status: "error", message: "Erro ao excluir a aula." });
    
    });
});

app.delete("/turmas/:id", (req, res) => {
  const id_turma = req.params.id;
  db.none("DELETE FROM turmas WHERE id_turma = $1", [id_turma])
    .then(() => {
      res.json({ status: "success", message: "turma excluída com sucesso." });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).json({ status: "error", message: "Erro ao excluir turma." });
    });
});
app.delete('/delete/:id', function (req, res) {
  res.send('DELETE ainda em desenvolvimento')
})


app.get('/tableid/:id', (req, res) => {
  let id = req.params.id
  db.any(`SELECT * FROM instrutores WHERE id = ${id}`)
  .then(function (data) {
    res.json({
      data: data
    });
  })
  .catch(function(error) {
    console.log('ERROR:', error)
  })
  
})

app.get('/instrutores', async (req, res) => {
  try {
    const { data } = await server2.get('/instrutores')
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

var server2 = require('axios').create({
  baseURL: 'http://' + SERVER_2
})

app.get('/suspensoes', async (req, res) => {
  try {
    const { data } = await server5.get('/suspensoes')
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})


var server5 = require('axios').create({
  baseURL: 'http://' + SERVER_5
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
