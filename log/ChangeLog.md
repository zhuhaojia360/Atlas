
### 更新日志：

2018-10-05
- 改用微信直接登录，再加绑定手机模式，方便阿姨进行操作。

2018-10-04
- 发送申请，接单

2018-10-03
- 功能：退出登录，修改密码
- 功能：短信验证码登录
- 设计：画出设计图纸

2018-10-02
- 个人中心信息丰富

2018-09-30
- 小程序内聊天
  - Nignx反向代理port(80、443) + NodeJS服务器端 wss listen:8888 + xampp https listen:8080，即：
  - https://www.zhuhaojia360.com -> nignx代理80,443端口-> 跳转至xampp/appache web:http://localhost:8080；跳转至nodejs websocket: ws://localhost:8090。
  - 先写一个简单的功能，A发送数据，根据ID来匹配，B接收数据。

2018-09-29
- 优化：密码加盐存储和解密；php echo 即代表值返回；用什么加密，就用什么解密



