// const g = globalThis
const g = global;
g.g = g;
g.u = {};

u.log = console.log.bind(console);
