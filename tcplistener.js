var net = require('net');
var fs = require('fs');

var server = net.createServer(function (socket) {
  // data event： 到收到資料傳輸時觸發事件 ， argument 為對象傳輸的物件
  socket.on('data', function (data){
		//console.log(data.charCodeAt());
		console.log(data);
  });
});

server.listen(8087, function () {
  console.log('TCP Server start');
});

//在txt檔中寫入log
fs.appendFile("C:/Program Files/nodejs/apps/log/errLog.txt", data.toString()+"\r\n" , function (err) {
    if (err){
    	console.log(err);
    }else{
    	console.log("一筆記錄已寫入txt檔.");
    }     
});

var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
socket.on('message', function(msg) {
  console.log(msg.toString());
});

socket.bind(12345, '192.168.0.100');
