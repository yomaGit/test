const fs=require('fs')

let fn_index = async (ctx, next) => {
    await next();
    ctx.response.type='text/html';
    ctx.response.body = await fs.readFileSync('./views/index.html')
}

let fn_signin = async (ctx, next) => {
    await next();
    let name = ctx.request.body.name || '', password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/index">Try again</a></p>`;
    }
}

module.exports = {
    'GET /index': fn_index,
    'POST /signin': fn_signin
};
