export const nodeEntry = new WeakMap();

export const makeEntry = (method, args) => ({
  id: 0,
  method,
  args,
  depth: 0,
  count: 1,
  time: new Date(),
});