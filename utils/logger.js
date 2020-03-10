const now = new Date().toLocaleString();
const getMethods = methods => {
  let color = '';
  switch (methods) {
    case 'GET':
      color = '\x1B[32m█GET    \x1B[0m';
      break;
    case 'POST':
      color = '\x1B[33m█POST   \x1B[0m';
      break;
    case 'PUT':
      color = '\x1B[35m█PUT    \x1B[0m';
      break;
    case 'DELETE':
      color = '\x1B[31m█DELETE \x1B[0m';
      break;
    case 'HEAD':
      color = '\x1B[37m█HEAD   \x1B[0m';
      break;
    case 'OPTIONS':
      color = '\x1B[36m█OPTIONS\x1B[0m';
      break;
    default:
      color = '\x1B[32m█GET    \x1B[0m';
      break;
  };
  return color
};
const getStatus = statu => {
  let color = '';
  switch (statu) {
    case 200:
      color = `|\x1B[42m\x1B[30m ${statu} \x1B[0m\x1B[0m|`;
      break;
    case 404:
      color = `|\x1B[44m\x1B[37m ${statu} \x1B[0m\x1B[0m|`;
      break;
    case 500:
      color = `|\x1B[41m\x1B[30m ${statu} \x1B[0m\x1B[0m|`;
      break;
    default:
      color = `|\x1B[42m\x1B[30m ${statu} \x1B[0m\x1B[0m|`;
      break;
  };
  return color
};

let logger = async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const end = new Date().getTime() - start;

  // console.log(`\x1b[35m==> response \x1b[0m ${ctx.status} ${ctx.method} ${ctx.path} time ${end}ms`);
  console.log(`${getMethods(ctx.method)} ${getStatus(ctx.status)}  ${ctx.path} | ${now} | ${ctx.ip} | ${end}ms`);
};

module.exports = logger