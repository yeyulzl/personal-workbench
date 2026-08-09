// ============================================================
// 个人工作台 - 本地服务器 (无需 npm install, 纯 Node.js 内置模块)
// 功能: 1. 提供静态文件服务  2. 代理 AI 对话 API (Groq)
// 用法: node server.js
// 前提: 在同目录下创建 config.json 写入 {"groqKey": "你的key"}
// 获取免费 key: https://console.groq.com/keys
// ============================================================

var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

var PORT = 8766;
var config = {};
try {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
} catch (e) {
  console.log('⚠️  未找到 config.json，AI 笔友功能将不可用。');
  console.log('   请创建 config.json: {"groqKey": "你的key"}');
  console.log('   免费获取 key: https://console.groq.com/keys\n');
}

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

var server = http.createServer(function (req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // === AI Chat API 代理 ===
  if (req.url === '/api/chat' && req.method === 'POST') {
    var body = '';
    req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
      if (!config.groqKey && !postData.apiKey) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '未配置 Groq API Key' }));
        return;
      }

      var apiKey = postData.apiKey || config.groqKey;
      // 从请求中移除 apiKey，不传给 Groq
      delete postData.apiKey;

      var postData;
      try {
        postData = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '无效的 JSON' }));
        return;
      }

      // 调用 Groq API (OpenAI 兼容格式)
      var groqData = JSON.stringify({
        model: postData.model || 'llama-3.3-70b-versatile',
        messages: postData.messages,
        temperature: postData.temperature || 0.8,
        max_tokens: postData.max_tokens || 200
      });

      var options = {
        hostname: 'api.groq.com',
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.groqKey,
          'Content-Length': Buffer.byteLength(groqData)
        }
      };

      var groqReq = https.request(options, function (groqRes) {
        var data = '';
        groqRes.on('data', function (chunk) { data += chunk; });
        groqRes.on('end', function () {
          res.writeHead(groqRes.statusCode, { 'Content-Type': 'application/json' });
          res.end(data);
        });
      });

      groqReq.on('error', function (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      });

      groqReq.write(groqData);
      groqReq.end();
    });
    return;
  }

  // === 静态文件服务 ===
  var url = req.url.split('?')[0];
  if (url === '/') url = '/personal-workbench.html';

  // 安全检查: 防止目录遍历
  var filePath = path.join(__dirname, url);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + url);
      return;
    }
    var ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, function () {
  console.log('🚀 个人工作台运行中: http://localhost:' + PORT);
  if (config.groqKey) {
    console.log('✅ AI 笔友功能已就绪 (Groq API)');
  } else {
    console.log('⚠️  AI 笔友需要配置 Groq API Key (免费)');
    console.log('   1. 访问 https://console.groq.com/keys 获取免费 key');
    console.log('   2. 创建 config.json: {"groqKey": "你的key"}');
    console.log('   3. 重启服务器');
  }
});
