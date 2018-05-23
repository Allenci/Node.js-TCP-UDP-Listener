var dgram = require('dgram'); // 引入 UDP/Datagram 模組
var HOST = '192.168.0.133';
var PORT = 12345;

// 定義資料封包內容
var message = new Buffer('{ "Serial": "A08888", "Data":[ {  "ID": "01", "value":["0026", "0020", "0051", "1", "0" ]}]}');

// 建立 UDP 用戶端
console.info('建立UDP Client端...');

// 使用 dgram.createSocket 方法建立一個 UDP 用戶端
var client = dgram.createSocket('udp4');

// 向伺服器發送 UDP 資料封包
setInterval(function(){
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes){
		  if(err) throw err;
		  console.log('UDP 封包傳送到 : ' + HOST + ':' + PORT);
		  console.info('封包 bytes : ' + bytes); // bytes 為用戶端發送到伺服器端資料封包的位元組長度
		  // 關閉用戶端
		  //client.close();
		});
 }, 10000);
// 為 UDP 用戶端新增一個 close 事件函式
client.on('close', function(){
  console.log('client disconnected');
});
