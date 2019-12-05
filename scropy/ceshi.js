const cheerio = require('cheerio');
const {delHtmlTag} = require('./utils');

var data = '<div class="txtwrap"><div class="txtcont"><p style="text-indent:2em"><strong>美小鱼的秘密20：爱的承诺</strong>是一款画风十分精美的模拟美人鱼恋爱类手游，采用精湛的美术效果给玩家营造了生动形象的游戏氛围，在美小鱼的秘密20：爱的承诺中，感受美人鱼和恋人之间的浪漫故事，亦或是一场甜蜜的约会，在浪漫的夜晚一起欣赏美景，那就多少惬意啊!</p><h3>美小鱼的秘密20：爱的承诺 游戏特色</h3><p style="text-indent:2em">美人鱼恋爱，废宅美人鱼谈恋爱。</p><p style="text-indent:2em">作为一条美人鱼跟你的高中生男朋友亲亲密密吧。</p><p style="text-indent:2em">应付突发的事件，在与男朋友度假时小心不要被人看到。</p><h3>美小鱼的秘密20：爱的承诺 游戏功能</h3><p style="text-indent:2em">1.天呐!高中男孩艾瑞克的邻居苏珊在泳池里发现了一只美人鱼!</p><p style="text-indent:2em">2.美人鱼公主咪雅提前离开了艾瑞克的家中,这使得她成功躲避了可能会发生的危险。</p><p style="text-indent:2em">3.记者露比本打算公开揭露关于美人鱼的真相,但最后却只找到一个假的美人鱼公仔。</p><p style="text-indent:2em">4.为了躲避危险,咪雅已经在房间里藏了好几周.咪雅觉得十分无聊,特别渴望能自由自在地游泳。</p><p style="text-indent:2em">5.美人鱼公主咪雅的初恋艾瑞克和咪雅约定,一起去海边度过一个愉快的假期。</p><p style="text-indent:2em">6.这对高中情侣来到一个风景优美的小岛,开始了他们的浪漫约会.真是一段快乐的恋爱时光!</p><p style="text-indent:2em">7.哇!好漂亮的日落啊!美丽的咪雅和她的真爱艾瑞克一起看着风景,聊着天.这一切简直太美好了!</p><p style="text-indent:2em">8.在岛上,有一个象征着爱情的情人桥.咪雅和艾瑞克来到桥上,一起做了一个同心锁,并将它紧紧锁在桥上。他们彼此都深爱着对方。</p><p style="text-indent:2em">9.高中男孩艾瑞克和咪雅一起甜蜜地约会。爱情总是让人感到十分浪漫。</p><p style="text-indent:2em">10.天呐!为什么美人鱼公主咪雅会在海底消失?她究竟去了哪里?</p><h3>美小鱼的秘密20：爱的承诺 游戏亮点</h3><p style="text-indent:2em">精美的卡通风格，带你走进这个充满爱的世界;</p><p style="text-indent:2em">丰富的剧情故事，根据你的选择剧情发展也会不同;</p><p style="text-indent:2em">多种故事结局，你的选择会影响结局，快来经营你的爱吧。</p></div><div class="txt_foot"><span>免费</span> <span>无病毒</span><div class="open_btn">展开</div></div></div>';

var $ = cheerio.load(data);
let text = $('div.txtwrap').children('div.txtcont').html();
let title = '美小鱼的秘密20';

text = text.replace("/[\r\n]+/", '\\n', text);
console.log(text);
// text = text.replace(/<[/]?p>/g, '|||||').replace(/<\p[^>]*>/g, '').replace(/<\/?[^>]*>/g, '');
// text = unescape(text.replace(/&#x/g, '%u').replace(/\\u/g, '%u').replace(/;/g, '').replace('\n', ''));
// t = text.split('|||||');