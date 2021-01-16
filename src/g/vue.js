const set = t => {
  const c = t
    .trim()
    .replace(/^\s*/gim, 'u.qi("')
    .replace(/\s*{\s*/gim, '").attr("')
    .replace(/: /gim, '", db["')
    .replace(/\s*}/gim, '"])')
    .replace(/"/g, "'");
  u.log(c);
};

function mounted(rs) {
  return function() {
    const query = this.$route.query;
    this.rs = rs;

    if (rs.db) {
      u.set(rs.db, query);
      rs.db.set = val => {
        u.set(this.rs.db, val);
        u.set(this.$data, val);
        this.db = this.rs.db;
        // u.en(rs.db).filter(([k, v]) => ['string', 'boolean', 'number'].includes((typeof v))).forEach(([k, v]) => u.i('pg').attr(k, v))
        rs.doms && rs.doms();
      };
      rs.db.set(rs.db);
      // rs.dom && set(rs.dom)
    }

    rs.fn.init && rs.fn.init.bind(this)();
  };
}

function gen(rs) {
  const opt = {
    data() {
      return rs.db;
    }
  };

  opt.methods = u.set(rs.fn, {
    click: u.click
  });
  opt.mounted = mounted(rs);

  opt.beforeDestroy = function() {
    rs.fn.last && rs.fn.last.bind(this)();
  };

  return opt;
}

u.vue = gen;
