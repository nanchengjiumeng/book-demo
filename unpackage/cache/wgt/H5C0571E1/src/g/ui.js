var ui = {
  /**
   * 成功的提醒
   * @param text 提示文字
   * @param func 关闭提示后，要执行的方法
   */
  win: function(text, func) {
    wx.showToast({
      title: text,
      icon: "success",
      duration: 2000
    });
  },
  /**
   * 失败、错误的提醒
   * @param text 提示文字
   * @param func 关闭提示后，要执行的方法
   */
  fail: function(text, fn) {
    wx.showToast({
      title: text,
      icon: "none",
      duration: 2000,
      complete: fn
    });
  },
  /**
   * 提示信息
   * @param text 提示文字
   * @param func 关闭提示后，要执行的方法
   */
  tip: function(text, fn) {
    wx.showToast({
      title: text,
      icon: "none",
      duration: 2000,
      complete: fn
    });
  },
  /**
   * 加载中、等待中的动画效果
   * @param text 提示文字
   */
  loading: function(text = "加载中") {
    wx.showLoading({
      title: text,
      mask: true
    });
  },
  /**
   * 关闭各种提示，包括加载中、成功、失败、提示信息等，都可以用此强制关闭
   */
  close: function() {
    wx.hideLoading();
    wx.hideToast();
  },
  /**
   * 延迟几秒后关闭弹出提示
   * @param time 延迟多长时间，单位是毫秒
   * @param func 关闭提示后，要执行的方法
   */
  delayClose: function(time, func) {
    setTimeout(function() {
      ui.close();
      if (func) {
        func();
      }
    }, time);
  }
};

/***
 * showModal模态框  (opts 接收一个对象参数 )
 * @param title 标题
 * @param content 内容
 * @param cancelText 取消按钮的文字
 * @param confirmText 确认按钮的文字
 * @param skin 自定义class样式
 * @param showCancel 是否显示取消按钮，默认为 true
 * @param cancel {function} 取消按钮的回调函数
 * @param confirm {function}  确定按钮的回调函数
 * @param beforeHide {function}  退出模态框前的回调函数*/
ui.modal = function(content, confirm, opts) {
  var opts = opts || {};
  opts.title = opts.title || "提示";
  opts.content = content || opts.content || "内容";
  opts.cancelText = opts.cancelText || "取消";
  opts.confirmText = opts.confirmText || "确认";
  opts.skin = opts.skin || "";
  opts.showCancel = confirm || opts.showCancel || false;

  opts.success = res => {
    if (res.confirm) {
      opts.confirm && opts.confirm();
    } else if (res.cancel) {
      opts.cancel && opts.cancel();
    }
  };

  wx.showModal(opts);
};

u.ui = ui;
