function compare(name, minor) {
  return function(o, p) {
    var a, b;
    if (o && p && typeof o === "object" && typeof p === "object") {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === "function" ? minor(o, p) : 0;
      }
      if (typeof a === typeof b) {
        return a.localeCompare(b, "zh-CN");
        // return a.localeCompare(b, "zh")
      }
      // return typeof a < typeof b ? -1 : 1;
    } else {
      throw "error";
    }
  };
}

function groupBy(array, f) {
  const groups = {};
  array.forEach(function(o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

const dict = (kv, dict) => {
  if (!dict || Object.keys(dict) < 1) {
    return;
  }
  Object.keys(kv).forEach(k => {
    const p = Object.keys(dict).find(it => it.endsWith(k));
    if (p && dict[p]) {
      const list =
        dict[p][0] && dict[p][0].children
          ? dict[p].flatMap(it => it.children)
          : dict[p];
      const item = list.find(t => t.value == kv[k]);
      const name = item.chName;
      kv[k + "N"] = name;
    }
  });
  return kv;
};

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

u.ut = { compare, groupBy, dict, sleep };
