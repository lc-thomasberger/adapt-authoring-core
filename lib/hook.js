class AsyncHook {

  constructor() {
    this._hooks = [];
  }

  add(fn) {
    this._hooks.push(fn);
  }

}


class AsyncWaterfallHook extends AsyncHook {

  async call(payload) {
    for (let fn of this._hooks) {
      await fn(payload);
    }
    return payload;
  }
}

class AsyncParallelHook extends AsyncHook {

  async call(payload) {
    return Promise.all(this._hooks.map(fn => fn(payload)));
  }

}

module.exports = {
  AsyncWaterfallHook,
  AsyncParallelHook
};
