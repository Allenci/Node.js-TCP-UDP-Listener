var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var fs = require('fs');
var mysql = require('mysql');

//建立資料庫連線
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_name"
});

socket.on('message', function(msg) {
var buf = Buffer.from(msg, 'utf-8');
console.log("------------Buffer資料------------");
console.log(buf);
console.log("--------------原始資料--------------");
console.log(msg);
// console.log("--------------轉字串資料--------------");
var temp_a = msg.toString();
// var temp_b = JSON.stringify(temp_a);
console.log("--------------轉JSON資料--------------");
var temp_c = JSON.parse(temp_a);
console.log(temp_c);
console.log(typeof(temp_c));
var temp_b = temp_c.Data;
console.log(temp_b);
console.log(typeof(temp_b));
//var dataIn = (msg.toString()).length;
//在txt檔中寫入log
fs.appendFile("C:/Program Files/nodejs/apps/log/plclog.txt", msg.toString()+"\r\n" , function (err) {
	if (err){
		console.log(err);
		}else{
			console.log("一筆記錄已寫入txt檔.");
		}     
	});
//寫入資料庫
var opData = "INSERT INTO db(data) VALUES ('"+temp_b+"')";
// 執行SQL
	con.query(opData, function (err, result) {
		if (err) throw err;
	});
});
socket.bind(12345, '192.168.0.133');
