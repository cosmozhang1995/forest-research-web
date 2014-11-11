var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var fs = require('fs');
var path = require('path');
var Forest = require('forest-research');

var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/result', multipartMiddleware, function(req, res) {
	// console.log('Received file:\n',req.files);
	var file = req.files.file;
	var category = req.body.category;
	var singleFeature = false;
	if ((req.body.single_feature === true) || (req.body.single_feature === "true")) singleFeature = true;
	// console.log(category);
	// var targetName = __dirname + '/../upload/' + file.originalFilename;
	// fs.renameSync(file.path, targetName);
	var err = null;
	var forest = null;
	var tableData = [];
	var stringifiedData = null;
	try {
		forest = Forest.loadFile(file.path, {
			category: category,
			singleFeature: singleFeature
		});
		forest.forEach(function(item) {
			tableData.push({
				name: item.name,
				table: item.getSummaryTable()
			});
		});
		stringifiedData = JSON.stringify(tableData);
	} catch (e) {
		err = e;
	}
	res.render('result', {
		// data: tableData,
		data: stringifiedData,
		error: err
	});
});

module.exports = router;
