u.jn = JSON.parse;
u.nj = JSON.stringify;

u.set = Object.assign;
u.en = Object.entries;
u.ne = Object.fromEntries;

u.db = {};

const env = {};
// env.rt = isWeixin ? 'wx' : 'web'
// env.os = agent ? 'i' : 'a'
u.env = env;

const go = (href, body, cfg) => {
  if (!href) {
    wx.navigateTo({ url: "/" });
    return;
  }

  if (href == -1) {
    wx.navigateBack();
    return;
  }

  if (href.startsWith("http")) {
    wx.navigateTo({ url: "/pages/web/index?src=" + encodeURIComponent(href) });
    return;
  }
  const search = href.split("?");
  const path =
    href.startsWith("/") || href.startsWith("pages")
      ? ("/" + search[0]).replace("//", "/")
      : "./" + search[0];
  const url =
    path + (search[1] ? "?" + search[1] : body ? "?" + u.net.qs(body) : "");
  if (cfg && cfg.r) {
    wx.redirectTo({ url });
    wx.switchTab({ url });
  } else {
    wx.navigateTo({ url });
    wx.switchTab({ url });
  }
};
u.go = go;

const click = function(e) {
  if (e.target.dataset && e.target.dataset.href) {
    go(e.target.dataset.href);
  }
  const id = e.target.id.includes("_")
    ? e.target.id.split("_")[0]
    : e.target.id;

  const rs = this.rs;
  if (rs.href) {
    const href = rs.href[id];
    href && go(href);
  }

  if (rs.click) {
    const handler = rs.fn[rs.click[id]];
    handler && handler.bind(this)(e);
  }
};
u.click = click;
