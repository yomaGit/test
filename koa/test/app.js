const App = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser')
const resourceStatic = require('koa-static')

const app = new App();
app.use(bodyParser());

const resStatic = resourceStatic(path.join(__dirname));
app.use(resStatic);

const controller = require('./controller');
app.use(controller());

// log
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
})

app.listen(3003);
console.log('app started at port 3003...');
