module.exports = async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            await ctx.render("404");
        }
    } catch (err) {
        console.error(err.stack);
        const status = err.status || 500;
        ctx.status = status;
        if (status === 404 || status === 400) {
            await ctx.render("404");
        } else if (status === 500) {
            await ctx.render("404");
        }
    }
};