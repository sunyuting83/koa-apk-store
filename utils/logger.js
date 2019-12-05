module.exports = async (ctx, next) => {
    const start = Date.now();
    await next();
    const end = Date.now() - start;
    console.log(`\x1b[35m==> request \x1b[0m ${ctx.method} ${ctx.url} \x1b[35m==> response \x1b[0m ${ctx.status} respones time ${end}ms`);
}