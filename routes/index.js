var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Конфигурация пула
var pool = mysql.createPool({
	connectionLimit : 100,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});



// Стартовая страница приложения
router.get('/', (req, res, next) => {
	res.render('index', { title: "my test project" })
})


/* API
*************************************/


// Подсчёт количества регистраций и переходов
router.get('/getevent/:id/:event/:from/:to', (req, res, next) => {
	pool.getConnection( (err, connection) => {
		var sql = 'SELECT count(event) FROM test.stats WHERE ( date BETWEEN  ? AND ? ) && event = ? && partner_id = ?;';
		var inserts = [req.params.from, req.params.to, req.params.event, req.params.id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows, fields) => {
			if(err){
				connection.release();
				throw err
			}
			res.json(rows);
			connection.release();
		})
	})
})

// Подсчёт суммы оплат
router.get('/sumevent/:id/:from/:to', (req, res, next) => {
	pool.getConnection( (err, connection) => {
		var sql = "SELECT sum(event_value) FROM test.stats WHERE ( date BETWEEN  ? AND ? ) && event = 'PAYMENT' && partner_id = ?;";
		var inserts = [req.params.from, req.params.to, req.params.id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows, fields) => {
			if(err){
				connection.release();
				throw err
			}
			res.json(rows);
			connection.release();
		})
	})
})

// Запрос доходов за определённый период
router.get('/profit/:id/:from/:to', (req, res, next) => {
	pool.getConnection( (err, connection) => {
		var sql = "SELECT sum(event_value), date FROM test.stats WHERE ( date BETWEEN  ? AND ? ) && partner_id = ?  GROUP BY date";
		var inserts = [req.params.from, req.params.to, req.params.id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows, fields) => {
			if(err){
				connection.release();
				throw err
			}
			res.json(rows);
			connection.release();
		})
	})
})

// Запрос действий за определённый период
router.get('/events/:id/:from/:to', (req, res, next) => {
	pool.getConnection( (err, connection) => {
		var sql = "SELECT count(event), date FROM test.stats WHERE ( date BETWEEN  ? AND ? ) && partner_id = ?  GROUP BY date";
		var inserts = [req.params.from, req.params.to, req.params.id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows, fields) => {
			if(err){
				connection.release();
				throw err
			}
			res.json(rows);
			connection.release();
		})
	})
})

// Проверка на существовалие пользователя
router.get('/check/:id', (req, res, next) => {
	pool.getConnection( (err, connection) => {
		var sql = "SELECT partner_id FROM test.stats WHERE partner_id = ? LIMIT 1 ";
		var inserts = [req.params.id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows, fields) => {
			if(err){
				connection.release();
				throw err
			}
			res.json(rows);
			connection.release();
		})
	})
})

// Проверка на существовалие данных за период
router.get('/checkdata/:id/:from/:to', (req, res, next) => {
	pool.getConnection( (err, connection) => {
		var sql = "SELECT event FROM test.stats WHERE ( date BETWEEN  ? AND ? ) && partner_id = ? LIMIT 1 ";
		var inserts = [req.params.from, req.params.to, req.params.id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows, fields) => {
			if(err){
				connection.release();
				throw err
			}
			res.json(rows);
			connection.release();
		})
	})
})



module.exports = router;
