# @ktmitax/koishi-plugin-notl

[![npm](https://img.shields.io/npm/v/@ktmitax/koishi-plugin-notl?style=flat-square)](https://www.npmjs.com/package/@ktmitax/koishi-plugin-notl)

## 别跳脸啦！（自用插件）
你是否有这样的朋友，平日里在群中蛰伏，不知何时又突然出来跳脸？

## 功能
监听指定用户，如果超出一定时间未发送消息，则下一次发送消息时机器人会做出特定回复。

## 配置项
```typescript
checkUser : string[ ]   // 要监听的userId
silenceTime : number  // 多久(分钟)未发言后，下一次发言被认定为跳脸
quoteMessage : string  // 机器人回复的消息
```
