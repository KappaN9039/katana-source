const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
//const querystring = require("querystring");
const discord = require("discord.js");
const {
  Client,
  GatewayIntentBits,
  Partials,
  ClientApplication,
  CommandInteractionOptionResolver,
  Permissions,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  SelectMenuBuilder,
  TextInputBuilder,
  ModalBuilder,
  AttachmentBuilder,
  Events,
  Collection,
  ActivityType,
  PermissionsBitField,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Colors,
  ComponentType,
} = require("discord.js");

//   YT
const {joinVoiceChannel,
       entersState,
       VoiceConnectionStatus,
       createAudioResource,
       createAudioPlayer,
       StreamType,
       AudioPlayerStatus,
       NoSubscriberBehavior,
       generateDependencyReport,
       getVoiceConnection
      } = require("@discordjs/voice");
const ytdl = require('ytdl-core');


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
 ], partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
 ]});



//html,GAS-POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  if (req.body.type == "wake") {
    console.log("Woke up in post");
    res.status(200).end();
    return;
  }
  res.status(200).end();
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
//タイムゾーン
new Date().toLocaleString({ timeZone: "Asia/Tokyo" });
new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
const japanStandardTime = new Date().toLocaleString({ timeZone: "Asia/Tokyo" });
new Date(japanStandardTime).getHours();
new Date(new Date().toLocaleString({ timeZone: "Asia/Tokyo" })).getTime();

client.on("ready", () => {
  console.log("Bot準備完了～");
  console.log(`${client.user.tag} でログインしています。`);
  client.user.setActivity('k++help', { type: ActivityType.Watching });
  //dnd取り込み中、idle退席中
  //PLAYING、STREAMINGプレイ中 LISTENING再生中　WATCHING視聴中
});


client.on("ready", () => {
  
  //client.application.commands.set([])  //コマンドリセット
  
  /*  OPTION NUMBER
  SUB_COMMAND            1
  SUB_COMMAND_GROUP      2
  STRING                 3
  INTEGER                4
  BOOLEAN                5
  USER                   6
  CHANNEL                7
  ROLE                   8
  MENTIONABLE            9
  NUMBER                 10
  ATTACHMENT             11
  */
  
  
  // スラッシュ コマンド
  client.application.commands.create({
    name: 'invite',
    description: '募集アナウンスをします',
    options: [
      {
        name: 'role',
        description: '役職',
        type: 8,
        required: true
      },
      {
        name: 'msg',
        description: 'メッセージ',
        type: 3,
        required: true
      }
    ]
  })
  .catch(console.error);  

client.application.commands.create({
    name: 'role-info',
    description: 'roleの情報を表示します',
    options: [
      {
        name: 'role',
        description: '役職',
        type: 8,
        required: true
      }]

  })
  .catch(console.error);
client.application.commands.create({
  name: 'user',
  description: 'メンバーの情報',
  options: [
      {
        name: 'member',
        description: 'メンバー',
        type: 6,
        required: true
      }]
  })
.catch(console.error);

client.application.commands.create({
    name: 'weather',
    description: '天気を調べます',
    options: [
      {
        name: 'number',
        description: '地域',
        type: 3,
        required: true
      }]

  })
  .catch(console.error);
  client.application.commands.create({
    name: 'weatherhelp',
    description: 'weatherコマンドの地区番号',
  })
  .catch(console.error);
  
  client.application.commands.create({
    name: 'search',
    description: '検索のリンクを生成',
    options: [
      {
      name: 'engine',
      description: 'エンジン',
      type: 3,
      required: true,
      choices: [
        {
          name: 'google',
          value: 'gurl'
        },
        {
          name: 'bing',
          value: 'burl'
        },
        {
          name: 'yahoo',
          value: 'yurl'
        }
      ]
      },
      {
      name: 'word',
      description: '語句',
      type: 3,
      required: true,
      }
    ]
  })
  .catch(console.error);
  
  client.application.commands.create({
    name: 'join',
    description: 'VCに接続',
  })
  .catch(console.error);
  
  client.application.commands.create({
    name: 'leave',
    description: 'VCから切断',
  })
  .catch(console.error);
  
  
client.application.commands.create({
  name: 'ban',
  description: 'ユーザーのban',
  options: [
      {
        name: 'user',
        description: 'ユーザー',
        type: 6,
        required: true
      },
      {
        name: 'reason',
        description: '理由',
        type: 3,
        required: false
      }]
  })
.catch(console.error);
  
client.application.commands.create({
  name: 'kick',
  description: 'ユーザーのkick',
  options: [
      {
        name: 'user',
        description: 'ユーザー',
        type: 6,
        required: true
      },
      {
        name: 'reason',
        description: '理由',
        type: 3,
        required: false
      }]
  })
.catch(console.error);
  
client.application.commands.create({
  name: 'role-give',
  description: '役職の付与',
  options: [
      {
        name: 'user',
        description: 'ユーザー',
        type: 6,
        required: true
      },
      {
        name: 'role',
        description: '役職',
        type: 8,
        required: true
      }]
  }).catch(console.error);
  
  client.application.commands.create({
  name: 'role-remove',
  description: '役職の剥奪',
  options: [
      {
        name: 'user',
        description: 'ユーザー',
        type: 6,
        required: true
      },
      {
        name: 'role',
        description: '役職',
        type: 8,
        required: true
      }]
  }).catch(console.error);
  
  client.application.commands.create({
  name: 'play',
  description: 'Youtube音源の再生',
  options: [
      {
        name: 'url',
        description: 'リンク',
        type: 3,
        required: true
      }]
  }).catch(console.error);
  
  client.application.commands.create({
    name: 'stop',
    description: '音源の再生停止',
  })
  .catch(console.error);
  
  client.application.commands.create({
    name: 'report',
    description: 'レポート',
    options: [
      {
        name: 'string',
        description: '内容',
        type: 3,
        required: true
      }]
  }).catch(console.error);
  
  client.application.commands.create({
    name: 'say',
    description: '入力した文を送信します',
    options: [
      {
        name: 'string',
        description: '文',
        type: 3,
        required: true
      }]

  })
  .catch(console.error);
  
  
  
  
  
  

});


/*   BOT PERMISSIONS   */
/*
// GENERAL PERMISSIONS               //
Administrator                        8
View Audit Log                       128
Manage Server                        32
Manage Roles                         268435456
Manage Channels                      16
Kick Members                         2
Ban Members                          4
Create Instant Invite                1
Change Nickname                      67108864
Manage Nicknames                     134217728
Manage Emojis and Stickers           1073741824
Manage Webhooks                      536870912
Read Messages/View Channels          1024
Manage Events                         8589934592
Moderate Members                     1099511627776
View Server Insights                 524288
View Creator Monetization Insights   2199023255552
// TEXT PERMISSIONS                  //
Send Messages                        2048
Create Public Threads                34359738368
Create Private Threads               68719476736
Send Messages in Threads             274877906944
Send TTS Messages                    4096
Manage Messages                      8192
Manage Threads                       17179869184
Embed Links                          16384
Attach Files                         32768
Read Message History                 65536
Mention Everyone                     131072
Use External Emojis                  262144
Use External Stickers                137438953472
Add Reactions                        64
Use Slash Commands                   2147483648
// VOICE PERMISSIONS                 //
Connect                              1048576
Speak                                2097152
Video                                512
Mute Members                         4194304
Deafen Members                       8388608
Move Members                         16777216
Use Voice Activity                   33554432
Priority Speaker                     256
Request To Speak                     4294967296
Use Embedded Activities              549755813888
*/

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()){
    return;
  }else{
    if (!interaction.guild){
      interaction.reply("DMでは使用できません");
      return;
    }else{

  if (interaction.commandName === 'invite') {
    if (!interaction.member.permissions.has('131072')){await interaction.reply("メンションをする権限がありません");return}
    else{
      const role = interaction.options.getRole('role');
      const msg1 = interaction.options.getString('msg');
    
      const inviteEmbed = new EmbedBuilder()
      .setColor("#00ff00")
      .setAuthor({name: " ",})
      .addFields({
            name: ` `,
            value: `${msg1}`,
            inline: false,
          })
      await interaction.reply({content:`${role.toString()}`,embeds: [inviteEmbed],allowedMentions: { parse: ['roles'] }});
  }}
  
  if (interaction.commandName === 'role-info') {
    await interaction.guild.members.fetch();
    const role = interaction.options.getRole('role');
    
    const members = role.members;
    const memberCount = members.size;
    const roleColor = role.hexColor;
     const permissions = role.permissions.toArray().map(p => `- ${p}`).join('\n') || 'このロールには権限がありません。';
    
    
    const rhelpEmbed = new EmbedBuilder()
      .setColor("#ffff00")
      .setAuthor({name: " ",})
      .addFields({name: "人数：",value: `>>> ${memberCount}`,inline: false,},
                 {name: "色：",value: `>>> ${roleColor}`,inline: false,},
                 {name: "権限：",value: `>>> ${permissions}`,inline: false,})
    
    await interaction.reply({content:`${role}`,embeds: [rhelpEmbed]});
  }
  
  if (interaction.commandName === 'user') {
    const user = interaction.options.getMember("member");
    
    const name = user.user.tag;
    const nickname = user.nickname||"なし";
    
    const presence = user.presence;
let st = "不明";
if (presence) {
  const status = presence.status;
  if (status === "online") st = "オンライン";
  else if (status === "idle") st = "離席中";
  else if (status === "dnd") st = "取り込み中";
  else if (status === "invisible") st = "オフライン(非表示)";
  else if (status === "offline") st = "オフライン";
}

    var bot = user.user.bot
    if (bot == true)var bot ="はい"
    if (bot == false)var bot ="いいえ"
    
    const roles = user.roles.cache||"なし";
    const roleNames = roles.map(role => role.name);
    
    
    const moment = require('moment-timezone');
    moment.locale('ja');
    const createdAt = user.user.createdAt;
    const formattedCreatedDate = moment(createdAt).tz("Asia/Tokyo").format('LL');
    const joinedAt = user.joinedAt||"不明";
    const formattedJoinedDate = moment.tz(joinedAt, "Asia/Tokyo").format('LL');
    

    
    
    
    const embed = new EmbedBuilder()
      .setColor('#ffff00')
      .setAuthor({name: " ",})
      .addFields({name: "名前：",value: `>>> ${name}`,inline: false,},
                 {name: "あだ名：",value: `>>> ${nickname}`,inline: false,},
                 {name: "ステータス：",value: `>>> ${st}`,inline: false,},
                 {name: "Bot：",value: `>>> ${bot}`,inline: false,},
                 {name: "役職：",value: `>>> ${roleNames}`,inline: false,},
                 {name: "アカウント作成日：",value: `>>> ${formattedCreatedDate}`,inline: false,},
                 {name: "サーバー参加日：",value: `>>> ${formattedJoinedDate}`,inline: false,},)

    await interaction.reply({embeds: [embed] });
    
  }
  
   if (interaction.commandName === 'weatherhelp') {
     const wembed = new EmbedBuilder()
     .setColor('#7bafd1')
     .setAuthor({name: "地区番号",})
     .addFields({name: "北海道",value: `>>> 北海道：01`,inline: false,},
                {name: "東北",value: `>>> 青森：02、岩手県：03、宮城県：04、秋田県：05、山形県：06、福島県：07`,inline: false,},
                {name: "関東",value: `>>> 東京都：13、神奈川県：14、埼玉県：11、千葉県：12、茨城県：08、栃木県：09、群馬県：10、山梨県：19`,inline: false,},
                {name: "信越",value: `>>> 新潟県：15、長野県：20`,inline: false,},
                {name: "北陸",value: `>>> 富山県：16、石川県：17、：福井県：18`,inline: false,},
                {name: "東海",value: `>>> 愛知県：23、岐阜県：21、静岡県：22、三重県：24`,inline: false,},
                {name: "近畿",value: `>>> 大阪府：27、兵庫県：28、京都府：26、滋賀県：25、奈良県：29、和歌山県：30`,inline: false,},
                {name: "中国",value: `>>> 鳥取県：31、島根県：32、岡山県：33、広島県：34、山口県：35`,inline: false,},
                {name: "四国",value: `>>> 徳島県：36、香川県：37、愛媛県：38、高知県：39`,inline: false,},
                {name: "九州",value: `>>> 福岡県：40、佐賀県：41、長崎県：42、熊本県：43、大分県：44、宮崎県：45、鹿児島県：46`,inline: false,},
                {name: "沖縄",value: `>>> 沖縄：47`,inline: false,},)
     
     
     await interaction.reply({embeds: [wembed] });
   }
   if (interaction.commandName === 'weather') {
    var request = require('request');
    var parseString = require('xml2js').parseString;
    
    const nm = interaction.options.getString("number");
 
    var url = "https://www.drk7.jp/weather/xml/"+nm+".xml";
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parseString(body, function (err, result) {
            
            var tday = result.weatherforecast.pref[0].area[0].info[0]['$'].date;
            var tweather = result.weatherforecast.pref[0].area[0].info[0].weather[0];
            var timg = result.weatherforecast.pref[0].area[0].info[0].img[0]
            var tdetail = result.weatherforecast.pref[0].area[0].info[0].weather_detail[0];
            var tmax = result.weatherforecast.pref[0].area[0].info[0].temperature[0].range[0]._;
            var tmin = result.weatherforecast.pref[0].area[0].info[0].temperature[0].range[1]._;
     
     const weembed = new EmbedBuilder()
     .setColor('#7bafd1')
     .setAuthor({name: `地区番号：${nm}`,})
     .setTitle("今日の天気")
     .addFields({name: `日付：`, value: `${tday}` },
                {name: `天気：`, value: `${tweather}` },
                {name: `詳細：`, value: `${tdetail}` },
                {name: `最高気温：`, value: `${tmax}` },
                {name: `最低気温：`, value: `${tmin}` })
                 .setImage(`${timg}`)
                 .setTimestamp()
     
    interaction.reply({embeds: [weembed] });
    return;
    });} else {interaction.reply("```diff\n-Error```\n"+error + " : " + response);} });
   }
  
  
    if (interaction.commandName === 'search') {
      const eg = interaction.options.getString("engine");
      const wd = interaction.options.getString("word");
      var link = ""
      if(eg == "gurl"){
        var link = "https://www.google.com/search?q="+wd
      }
      if(eg == "burl"){
         var link = "https://www.bing.com/search?q="+wd
      }
      if(eg == "yurl"){
          var link = "https://search.yahoo.co.jp/search?p="+wd
        }
      const shembed = new EmbedBuilder()
        .setColor('#7bafd1')
        .addFields({name: `リンク：`, value: `${link}` })
      await interaction.reply({embeds: [shembed] });
      
    }
  
    if (interaction.commandName === 'join') {
      await interaction.guild.members.fetch();
      const guild = interaction.guild;
      const member = await guild.members.fetch(interaction.member.id);
      const memberVC = member.voice.channel;
        if (!memberVC) {
         return interaction.reply({
           content: "VCに参加してください",});
        }
        if (!memberVC.joinable) {
         return interaction.reply({
           content: "VCに接続できません。",});//非表示リプライ：ephemeral: true,
        }
        const connection = joinVoiceChannel({
          guildId: guild.id,
          channelId: memberVC.id,
          adapterCreator: guild.voiceAdapterCreator,
          selfMute: false,
          autoDisconnectTime: 0
        });
        const vcjembed = new EmbedBuilder()
        .setColor('#00ff00')
        .addFields({ name: ` `,value: "```diff\n+VCに接続しました```", })
        .setTimestamp();
        await interaction.reply({ embeds: [vcjembed] });
        }
    }
  
    if (interaction.commandName === 'leave') {
      await interaction.guild.members.fetch();
      const guild = interaction.guild;
      const member = await guild.members.fetch(interaction.member.id);
      const memberVC = member.voice.channel;
      if (!memberVC){
        await interaction.reply("VCに参加してください")
        return;
      }
      let connection = getVoiceConnection(memberVC.guild.id);
        if (connection) {
      connection.destroy();
    }

    
      const vclembed = new EmbedBuilder()
        .setColor('#ff0000')
        .addFields({ name: ` `,value: "```diff\n-VCから切断しました```", })
        .setTimestamp();
      await interaction.reply({ embeds: [vclembed] });
    }
  
  if (interaction.commandName === 'play') {
    await interaction.guild.members.fetch();
    const guild = interaction.guild;
    const member = await guild.members.fetch(interaction.member.id);
    const memberVC = member.voice.channel;
    if (!memberVC){
      await interaction.reply("VCに参加してください")
      return;
    }
    if (!memberVC.speakable) {
      return interaction.reply({
      ontent: "VCで発言する権限がありません。",});
    }
    const url = interaction.options.getString('url');
    const urlcheck = url.includes("https://www.youtube.com/watch?v=");
    const urlcheck2 = url.includes("https://youtu.be/");
    
    if (urlcheck||urlcheck2) {
    
    const connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      await interaction.reply('VCに接続していません');
      return;
    }
    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    connection.subscribe(player);
    player.play(resource);
    const vcpembed = new EmbedBuilder()
      .setColor('#00ff00')
      .addFields({ name: ` `,value: `再生を開始します：${url}`, })
      .setTimestamp();
    await interaction.reply({ embeds: [vcpembed] });
  }else{await interaction.reply('それはYoutubeのurlではありません');}}
  
  if (interaction.commandName === 'stop') {
    await interaction.guild.members.fetch();
    const guild = interaction.guild;
    const member = await guild.members.fetch(interaction.member.id);
    const memberVC = member.voice.channel;
    if (!memberVC){
      await interaction.reply("VCに参加してください")
      return;
    }
    const connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      await interaction.reply('VCに接続していません');
      return;
    }
    /*
    const player = AudioPlayerStatus();
    player.stop();*/
  const vcsembed = new EmbedBuilder()
      .setColor('#ff0000')
      .addFields({ name: ` `,value: `再生を停止します\n**※調整中(leaveで退出させるか、再生が終了するまでお待ちください。)**`, })
      .setTimestamp();
    await interaction.reply({ embeds: [vcsembed] });
  }
  
  
  if (interaction.commandName === 'ban') {
    if (!interaction.member.permissions.has('4')){
      return await interaction.reply("メンバーをBANする権限がありません");
    } else {
    const member = interaction.options.getMember('user');
    if (!member) {
      return await interaction.reply('そのユーザーはこのサーバーにいません。');
    }
    const reason = interaction.options.getString('reason') || 'No reason';
  
    if (member.bannable) {
      await member.ban({ reason: reason });
      const banembed = new EmbedBuilder()
        .setColor('#ff0000')
        .addFields({ name: ` `,value: `${member.user.tag}をBANしました\n理由：${reason}`, })
        .setTimestamp();
      await interaction.reply({ embeds: [banembed] });
    } else {
      const ban1embed = new EmbedBuilder()
        .setColor('#ff0000')
        .addFields({ name: ` `,value: `BANを実行できませんでした`, })
        .setTimestamp();
      await interaction.reply({ embeds: [ban1embed] });
    }}
  }
  
  if (interaction.commandName === 'kick') {
    if (!interaction.member.permissions.has('2')){
      return await interaction.reply("メンバーをKickする権限がありません");
    } else {
    const member = interaction.options.getMember('user');
    if (!member) {
      return await interaction.reply('そのユーザーはこのサーバーにいません。');
    }
    const reason = interaction.options.getString('reason') || 'No reason';
  
    if (member.kickable) {
      await member.kick({ reason: reason });
      const kickembed = new EmbedBuilder()
        .setColor('#ff0000')
        .addFields({ name: ` `,value: `${member.user.tag}をKickしました\n理由：${reason}`, })
        .setTimestamp();
      await interaction.reply({ embeds: [kickembed] });
    } else {
      const kick1embed = new EmbedBuilder()
        .setColor('#ff0000')
        .addFields({ name: ` `,value: `Kickを実行できませんでした`, })
        .setTimestamp();
      await interaction.reply({ embeds: [kick1embed] });
    }}
  }
  if (interaction.commandName === 'role-give') {
    if (!interaction.member.permissions.has('268435456')){
      return await interaction.reply("ロールを管理する権限がありません");
    } else {
      const member = interaction.options.getMember('user');
      if (!member) {
        return await interaction.reply('そのユーザーはこのサーバーにいません。');
      }
      const roleID = interaction.options.getRole('role').id;
      const role = interaction.guild.roles.cache.get(roleID);
      if (member.roles.cache.has(role.id)) {
        const roleembed = new EmbedBuilder()
          .setColor('#ff0000')
          .addFields({ name: ` `,value: `${member.displayName} は、すでに ${role.toString()} を持っています`, })
          .setTimestamp();
        await interaction.reply({ embeds: [roleembed] });
        return;
      }
      await member.roles.add(role);
      const role1embed = new EmbedBuilder()
        .setColor('#00ff00')
        .addFields({ name: ` `,value: `${member.displayName}に${role.toString()}を付与しました`, })
        .setTimestamp();
      await interaction.reply({ embeds: [role1embed] });
  }}
  
  if (interaction.commandName === 'role-remove') {
     if (!interaction.member.permissions.has('268435456')){
      return await interaction.reply("ロールを管理する権限がありません");
    } else {
      const member = interaction.options.getMember('user');
      if (!member) {
        return await interaction.reply('そのユーザーはこのサーバーにいません。');
      }
      const roleID = interaction.options.getRole('role').id;
      const role = interaction.guild.roles.cache.get(roleID);
      if (!member.roles.cache.has(role.id)) {
        const role2embed = new EmbedBuilder()
          .setColor('#ff0000')
          .addFields({ name: ` `,value: `${member.displayName} は、${role.toString()} を持っていません`, })
          .setTimestamp();
        await interaction.reply({ embeds: [role2embed] });
        return;
      }
      await member.roles.remove(role);
      const role3embed = new EmbedBuilder()
        .setColor('#00ff00')
        .addFields({ name: ` `,value: `${member.displayName}から${role.toString()}を剥奪しました`, })
        .setTimestamp();
      await interaction.reply({ embeds: [role3embed] });
    }
  }
  
  if (interaction.commandName === 'report') {
    var cmr = interaction.user;
    var cgl, cglid, cch, cchid = "undefined";
    if (interaction.channel && (interaction.channel.type === 'GUILD_TEXT' || interaction.channel.type === 'GUILD_VOICE')) {
      cgl = interaction.member.guild;
      cglid = cgl.id;
      cch = interaction.channel;
      cchid = cch.id;
    }
    var cbn = interaction.options.getString('string')
    
    
    
    const rpEmbed = new EmbedBuilder()
      .setColor("#ffff00")
      .setTitle("Report")
      .addFields(
        { name: `実行したユーザー：`, value: `${cmr}` },
        { name: `実行されたサーバー：`, value: `${cgl}\nID：${cglid}` },
        { name: `実行されたチャンネル：`, value: `${cch}\nID：${cchid}` },
        { name: `本文：`, value: `${cbn}` },
      )
      .setTimestamp()
    const neo = client.users.cache.get('744432575598034946')
    neo.send({ embeds: [rpEmbed] });
    await interaction.reply("レポートを送信しました")
    return;
  }
  
   if (interaction.commandName === 'say') {
      const str = interaction.options.getString('string');
      const regex = /<@!?\d+>/;
      const containsMention = regex.test(str);
      if (containsMention) {
        if (!interaction.member.permissions.has('131072')){
        await interaction.reply("実行するにはメンションを実行する権限が必要です");
        return;
      }else{
          await interaction.reply(`${str}`);
          return;
        }
      }else{
        await interaction.reply(`${str}`);
        return;
      }
   }
  
    
    
    
    
}});


///     K++Help    Embed
// embed1
let helpEmbed = new EmbedBuilder()
    
      .setColor("#00FFCA")
      .setAuthor({name: "Help",})
      .setTitle("bot追加")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=1076374489350291548&permissions=8&scope=bot%20applications.commands")
      .setDescription("```fix\nこのBOTについて```")
      .addFields(
        {name: "概要",value: ">>> 開発：||KappaN#7024||\nコマンドを追加するBot。\nプレフィックスは`k++`です。",inline: false,},
        {name: "歴史",value: ">>> 2023/02/18：作成開始\n2023/02/27：DjsV14移行開始/完了",inline: false,},
        {name: "目次",value: ">>> P1：概要など\nP2：k++のコマンド一覧\nP3：/コマンドの一覧",inline: false,},
        {name: "利用規約",value: ">>> ・荒らしやSpamに使用しないでください\n・随時追加/変更/削除",inline: false,}
      )
      .setFooter({text: "ページ1/3"})
      .setTimestamp()
    
    const pbutton1 = new ButtonBuilder()
    .setCustomId('embed1')
    .setLabel('ページ1')
    .setStyle('Success');
    const pb1 = new ActionRowBuilder().addComponents(pbutton1);
    
    const pbutton2 = new ButtonBuilder()
    .setCustomId('embed2')
    .setLabel('ページ2')
    .setStyle('Success');
    const pb2 = new ActionRowBuilder().addComponents(pbutton2);
    
    const pbutton3 = new ButtonBuilder()
    .setCustomId('embed3')
    .setLabel('ページ3')
    .setStyle('Success');
    const pb3 = new ActionRowBuilder().addComponents(pbutton3);



///   ///



//  K++[cmd]
client.on("messageCreate", message => {
  if (message.author.bot) {
    return;
  }
  
  if (message.content == "k++help") {
    const pbt = new ActionRowBuilder()
      .addComponents(pb2.components)
	    .addComponents(pb3.components);
    message.channel.send({ embeds: [helpEmbed],components: [pbt] });
    return; 
  }
  
  if (message.content == "k++time") {
    // 現在のローカル時間が格納された、Date オブジェクトを作成する
    let d = new Date();
    var str =
      "```fix\n" +d.getFullYear() +"年 " +("0" + (d.getMonth() + 1)).slice(-2) +"月 " +("0" + d.getDate()).slice(-2) +"日 " +
      ("0" + (d.getHours() + 9)).slice(-2) +"時 " +("0" + d.getMinutes()).slice(-2) +"分 " +("0" + d.getSeconds()).slice(-2) +"秒 (日本時間)```";
    const data_ob = str.toString();
    const text = data_ob;
    message.channel.send(text);
    return;
  }
  
  if (message.content == "k++size") {
    message.channel.send(`BOTサーバー導入数：${client.guilds.cache.size}`);
    return;
  }
  
  if (message.content == "k++ping") {
    message.channel.send(`BOTのping値：${client.ws.ping}ms`);
    return;
  }
  
  if (message.content == "k++member") {
    var MCount=message.guild.memberCount
    message.channel.send(`サーバーの人数：${MCount}`);
  }
  
});

// k++ interaction
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

    ///  help-embed
  if (interaction.customId === 'embed1') {
      helpEmbed.setDescription("```fix\nこのBOTについて```")
      helpEmbed.setFields(
        {name: "概要",value: ">>> 開発：||KappaN#7024||\nコマンドを追加するBot。\nプレフィックスは`k++`です。",inline: false,},
        {name: "歴史",value: ">>> 2023/02/18：作成開始\n2023/02/27：DjsV14移行開始/完了",inline: false,},
        {name: "目次",value: ">>> P1：概要など\nP2：k++のコマンド一覧\nP3：/コマンドの一覧",inline: false,},
        {name: "利用規約",value: ">>> ・荒らしやSpamに使用しないでください\n・随時追加/変更/削除",inline: false,}
      )
      helpEmbed.setFooter({text: "ページ1/3"})
      helpEmbed.setTimestamp()
    
      const pbt = new ActionRowBuilder()
        .addComponents(pb2.components)
	      .addComponents(pb3.components);
    
      interaction.update({embeds: [helpEmbed],components: [pbt]});
    }
  if (interaction.customId === 'embed2') {
      helpEmbed.setDescription("```fix\nコマンド一覧[k++]```")
      helpEmbed.setFields(
        {name: "k++help",value: ">>> このHelpを開きます",inline: true,},
        {name: "k++member",value: ">>> サーバーの人数を取得できます",inline: true,},
        {name: "k++time",value: ">>> 現在時刻を取得できます",inline: true,},
        {name: "k++ping",value: ">>> Botの遅延を取得できます",inline: true,},
        {name: "k++size",value: ">>> このbotの導入数を取得できます",inline: true,},
        )
      helpEmbed.setFooter({text: "ページ2/3"})
      helpEmbed.setTimestamp()
      
    const pbt = new ActionRowBuilder()
      .addComponents(pb1.components)
	    .addComponents(pb3.components);
    
      interaction.update({embeds: [helpEmbed],components: [pbt]});
    }
    
  if (interaction.customId === 'embed3') {
      helpEmbed.setDescription("```fix\nコマンド一覧[/]```")
      helpEmbed.setFields(
        {name: "/user <user>",value: ">>> ユーザーのロールなどを取得できます",inline: true,},
        {name: "/kick <member> <reason>",value: ">>> メンバーをKickします",inline: true,},
        {name: "/ban <member> <reason>",value: ">>> メンバーをBANします",inline: true,},
        {name: "/role-give <member> <role>",value: ">>> メンバーに役職を付与します",inline: true,},
        {name: "/role-remove <member> <role>",value: ">>> メンバーから役職を剥奪します",inline: true,},
        {name: "/role-info <role>",value: ">>> ロールの人数や権限などを取得できます",inline: true,},
        {name: "/join",value: ">>> VCに接続します",inline: true,},
        {name: "/leave",value: ">>> VCから切断します",inline: true,},
        {name: "/play <url>",value: ">>> Youtubeの音源を再生します",inline: true,},
        {name: "/stop",value: ">>> 音源の再生を停止します```diff\n-※故障中```",inline: true,},
        {name: "/weather <number>",value: ">>> 地区番号(独自)の天気予報を取得します",inline: true,},
        {name: "/weatherhelp",value: ">>> 天気予報の地区番号(独自)を取得します",inline: true,},
        {name: "/report <string>",value: ">>> レポートします",inline: true,},
        {name: "/invite <role> <msg>",value: ">>> 簡易な募集Embedが作れます",inline: true,},
        {name: "/search <engine> <word>",value: ">>> 選択したエンジンの検索のリンクを取得します",inline: true,},
      )
      helpEmbed.setFooter({text: "ページ3/3"})
      helpEmbed.setTimestamp()
      
      const pbt = new ActionRowBuilder()
        .addComponents(pb1.components)
	      .addComponents(pb2.components);
    
      interaction.update({embeds: [helpEmbed],components: [pbt]});
    }
     
});





//envファイルのdiscord_bot_tokenのトークンにアクセス、ログイン
if (!process.env.DISCORD_BOT_TOKEN) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(1);
}

client.login(process.env.DISCORD_BOT_TOKEN);
