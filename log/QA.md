### 常见问题及解决方案

#### 疑难问题及解答
```
1. 开发者工具提示错误`WebSocket connection to 'ws://10.4.96.52:8001/' 
   failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED`
答：这是本地WebSocket服务没有开启，请先开启本地服务。


#### bug
```
1. bug: 语音发送时，偶尔出现longpress失效，需要重启小程序才能恢复正常 [issues#14](https://github.com/unmagic/wechat-im/issues/14)
答：微信官方说明，长按的事件在低版本是有偶尔失效的情况，在sdk2.1.0之后才修复的。
   [官方社区回复链接](https://developers.weixin.qq.com/blogdetail?action=get_post_info&docid=000c4254c706005604e6356cc5c800&highline=longpress)





