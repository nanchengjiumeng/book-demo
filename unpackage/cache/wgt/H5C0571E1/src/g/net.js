function promisify(func) {
  return (args = {}) =>
    new Promise((resolve, reject) => {
      func(
        Object.assign(args, {
          success: resolve,
          fail: reject
        })
      );
    });
}

wx.promisify = promisify;

function sq(qs) {
  if (!qs) {
    return {};
  }
  return Object.fromEntries(qs.split("&").map(it => it.split("=")));
}

function qs(obj = {}) {
  return Object.entries(obj)
    .map(it => it.join("="))
    .join("&");
}

function fet(url, body, config) {
  const ContentType = {
    json: "application/json",
    form: "application/x-www-form-urlencoded"
  };

  const init = {
    url: url,
    data: body,
    method: "POST"
  };

  config &&
    config.form &&
    Object.assign(init, {
      headers: { "Content-Type": ContentType.form }
    });

  if (wx && wx.showLoading) {
    config &&
      config.loading &&
      wx.showLoading({
        title: "加载中",
        mask: true
      });
  }

  if (config && config.headers && config.headers.headers) {
    init.header = config.headers.headers;
  }

  return wx
    .promisify(wx.request)(init)
    .then(res => {
      if (wx && wx.hideLoading) {
        config && config.loading && wx.hideLoading();
      }

      if (res.statusCode == 200) {
        //响应成功
        // if (config && config.text) {
        //   return res.text()
        // } else if (config && config.blob) {
        //   return res.blob()
        // } else {
        //   return res.json()
        // }
        return res.data;
      }
      const error = new Error(res.statusText);
      error.data = res;
      throw error;
    })
    .catch(e => console.log(e));
}

function get(url, body, config) {
  var _url = url;
  if (!url.includes("?") && body) {
    _url += "?" + (body ? qs(body) : "");
  }
  if (wx && wx.showLoading) {
    config &&
      config.loading &&
      wx.showLoading({
        title: "加载中",
        mask: true
      });
  }
  const init = {
    url: _url,
    data: body,
    method: "GET"
  };

  if (config && config.headers && config.headers.headers) {
    init.header = config.headers.headers;
  }

  return wx
    .promisify(wx.request)(init)
    .then(res => {
      if (wx && wx.hideLoading) {
        config && config.loading && wx.hideLoading();
      }

      if (res.statusCode == 200) {
        return res.data;
        // if (config && config.text) {
        //   return res.text()
        // } else if (config && config.blob) {
        //   return res.blob()
        // } else {
        //   return res.json()
        // }
      }
      const error = new Error(res.statusText);
      error.data = res;
      throw error;
    })
    .catch(e => console.log(e));
}

u.net = { get, fet, qs, sq };
