import { Bot, Context, Schema, Session, h } from 'koishi'

export const name = 'notl'

export interface Config {
  checkUser : string[]
  silenceTime : number
  quoteMessage : string
}

export const Config: Schema<Config> = Schema.object({
  checkUser : Schema.array(Schema.string()).default([]).description("监听的userId"),
  silenceTime : Schema.number().default(60).description("多久(分钟)未发言后，下一次发言被认定为跳脸"),
  quoteMessage : Schema.string().default("TL???").description("触发时回复用户的消息")
})

export function apply(ctx: Context, config: Config) {
  var userLastMessageTime = new Map
  ctx.on( 'message', (session) => {
    if(session.userId == session.bot.userId) return  // 不要回复机器人自己的消息

    if(config.checkUser.includes(session.userId)){ // 如果用户在监听列表中

      var lastMessageTime = userLastMessageTime.get(session.userId)
      var thisMessageTime = session.event.timestamp
      userLastMessageTime.set(session.userId, thisMessageTime)  // 更新消息时间

      if(lastMessageTime == undefined){
        // 插件重启后首次发消息，无法获取lastMessageTime，但仍然回复消息
        session.send(h.at(session.userId) + ' ' + config.quoteMessage)
      }
      else{
        var deltaTime = Math.floor( ( thisMessageTime - lastMessageTime ) / 1000 / 60 ) // 与上次发消息时间差（分钟）
        if(deltaTime >= config.silenceTime){
          session.send(h.at(session.userId) + ' ' + config.quoteMessage)  //  回复消息
        }
      }
    }
    else 
      return
  } )
}
