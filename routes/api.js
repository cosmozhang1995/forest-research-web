var express = require('express');
var router = express.Router();
var fs = require('fs');

var forest = require('forest-research');
var uuid = require('node-uuid');

router.get('/', function(req, res) {
	var data = forest.loadFile('/Users/zhangcosmo/Downloads/青冈次生林/乔木原始数据.xlsx');
	var tableData = data[0].getSummaryTable();
  res.render('index', { title: 'Express', data: tableData });
});

// router.get('/test', function(req, res) {
// 	var data = forest.loadFile('/Users/zhangcosmo/Downloads/青冈次生林/乔木原始数据.xlsx');
// 	var tableData = data[0].getSummaryTable();
// 	res.send(JSON.stringify(tableData));
// });

router.post('/generate', function(req, res) {
	console.log('generate');
	var data = JSON.parse(req.body['data']);
	var dir_abs_path = '/public/output';
	var dir_path = __dirname + '/..' + dir_abs_path;
	if (!(fs.existsSync(dir_path) && fs.statSync(dir_path).isDirectory())) fs.mkdirSync(dir_path);
	var file_abs_path = dir_abs_path + '/' + uuid.v1() + '.xlsx';
	var filepath = __dirname + '/..' + file_abs_path;
	forest.putFileSync(filepath, data);
	var real_path = fs.realpathSync(filepath);
	res.download(real_path, '处理结果.xlsx');
});

router.get('/test', function(req,res) {
	var real_path = fs.realpathSync(__dirname + '/../public/output/f46b40d0-688b-11e4-bc7b-4f5b6caeb1c3.xlsx');
	console.log(real_path);
	// res.sendfile('/output/f46b40d0-688b-11e4-bc7b-4f5b6caeb1c3.xlsx');
	res.download(real_path);
});

module.exports = router;
