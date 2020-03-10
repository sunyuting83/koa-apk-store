const {
  getList,
  getCount,
  getClassify,
  posTopic,
  searchAPK,
  delAPK,
  addAPK
} = require('../utils/manage/manage_topic');
const fn_topic = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    let page = ctx.request.query.page;
    if (!page || page == 0) page = 1;
    let cid = ctx.request.query.cid;
    if (!cid) cid = 0;
    let dlist = await getList(cid, page);
    let classify = getClassify();
    let count = await getCount(cid);
    await ctx.render('manage/base', {
      user: user,
      link: '/manage/topic',
      title: '专题管理',
      template: './topic.html',
      topic: dlist,
      classify: classify,
      count: count,
      thisp: page,
      cid: cid
    });
    await next();
  } else {
    await ctx.response.redirect('/manage/login');
    await next();
  }
};

const fn_addtopic = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    let title = ctx.request.body.title,
      classify = ctx.request.body.classify,
      sort = ctx.request.body.sort,
      more = ctx.request.body.more,
      json = {
        'title': title,
        'classify': classify,
        'sort': sort,
        'more': more
      };
    // console.log(dlist);
    ctx.response.body = await posTopic(json);
    await next();
  } else {
    ctx.response.body = ctx.throw(403);
    await next();
  }
};

const fn_search = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    const key = ctx.request.query.key;
    let page = ctx.request.query.page;
    if (!page || page == 0) page = 1;
    // console.log(dlist);
    ctx.response.body = await searchAPK(key, page);
    await next();
  } else {
    ctx.response.body = ctx.throw(403);
    await next();
  }
};

const fn_addapk = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    const tid = ctx.request.body.tid,
          aid = ctx.request.body.aid;
    // console.log(dlist);
    ctx.response.body = await addAPK(tid, aid);
    await next();
  } else {
    ctx.response.body = ctx.throw(403);
    await next();
  }
};

const fn_delapk = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    const tid = ctx.request.body.tid,
          aid = ctx.request.body.aid;
    // console.log(dlist);
    ctx.response.body = await delAPK(tid, aid);
    await next();
  } else {
    ctx.response.body = ctx.throw(403);
    await next();
  }
};

const fn_changetopic = async (ctx, next) => {
  const user = ctx.session.current_user;
  if (user) {
    let id = ctx.request.body.id,
      title = ctx.request.body.title,
      classify = ctx.request.body.classify,
      sort = ctx.request.body.sort,
      more = ctx.request.body.more,
      json = {
        'id': id,
        'title': title,
        'classify': classify,
        'sort': sort,
        'more': more
      };
    // console.log(dlist);
    ctx.response.body = await posTopic(json);
    await next();
  } else {
    ctx.response.body = ctx.throw(403);
    await next();
  }
};

module.exports = {
  'GET /manage/topic': fn_topic,
  'POST /manage/addtopic': fn_addtopic,
  'GET /manage/search': fn_search,
  'POST /manage/addtapk': fn_addapk,
  'POST /manage/deltapk': fn_delapk,
  'POST /manage/changetopic': fn_changetopic
};