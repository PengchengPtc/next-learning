const koa = require("koa");
const next = require("next");
const Router = require("koa-router");
// 判断是否是开发环境
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: true });
const handle = app.getRequestHandler();

// app.prepare().then(() => {
const server = new koa();
const router = new Router();

router.get("/test/:id", async (ctx) => {
  ctx.body = `<p>request /test/${ctx.params.id}</p>`;
});

server.use(async (ctx, next) => {
  //   const path = ctx.path;
  //   const method = ctx.method;
  //   ctx.body = `<span>koa render ${method} ${path}</span>`;
  await next();
});
server.use(router.routes());
// server.use(async (ctx, next) => {
//     ctx.body = "<span>koa render2</span>";
//   });
// server.use(async (ctx, next) => {
//     await handle(ctx.req, ctx.res)
//     ctx.respond = false
// })
server.listen(3000, () => {
  console.log("koa server listening on 3000");
});
// })  // 服务端渲染

// Path: package.json
