/* ==========================================================================
   FTG — data store (browser localStorage) and shared helpers
   Shared by the public site and the admin area.
   ========================================================================== */
(function () {
  "use strict";
  var CFG = window.FTG_CONFIG;
  var SEED = window.FTG_SEED;
  var KEY = "ftg.demo.v" + SEED.version;
  var mem = null;

  /* ---------- formatting ---------- */
  var fmt = {
    eur: function (n, dp) {
      var d = dp === undefined ? 0 : dp;
      return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: d, maximumFractionDigits: d }).format(n || 0);
    },
    num: function (n) { return new Intl.NumberFormat("en-IE").format(Math.round(n || 0)); },
    compact: function (n) { return new Intl.NumberFormat("en-IE", { notation: "compact", maximumFractionDigits: 1 }).format(n || 0); },
    date: function (d, o) {
      return new Date(d).toLocaleDateString("en-IE", o || { day: "numeric", month: "long", year: "numeric" });
    },
    dateShort: function (d) { return new Date(d).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" }); },
    day: function (d) { return new Date(d).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" }); },
    time: function (d) { return new Date(d).toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit", hour12: false }); },
    monthDay: function (d) { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric" }).toUpperCase(); },
    pct: function (n, dp) { return (n || 0).toFixed(dp === undefined ? 0 : dp) + "%"; },
    iso: function (d) {
      var x = new Date(d);
      return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
    },
    esc: function (s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    },
    initials: function (name) {
      return String(name || "").split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase();
    }
  };

  /* ---------- seeded random ---------- */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function uid(p) { return (p || "id") + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* ---------- demo data generation ---------- */
  function pickWeighted(r, ids, pull) {
    var total = 0, i;
    for (i = 0; i < ids.length; i++) total += pull[ids[i]] || 0.1;
    var x = r() * total;
    for (i = 0; i < ids.length; i++) { x -= pull[ids[i]] || 0.1; if (x <= 0) return ids[i]; }
    return ids[ids.length - 1];
  }

  function build() {
    var r = rng(20260214);
    var now = Date.now();
    var DAY = 86400000;
    var fighters = clone(SEED.fighters);
    var events = clone(SEED.events);
    var ids = fighters.map(function (f) { return f.id; });
    var pull = SEED.fighterPull;
    var tx = [], expenses = [], payouts = [], n = 0;
    var tiers = CFG.ticketTiers;

    function add(o) { o.id = "tx-" + (++n); tx.push(o); }
    function isoDay(t) { return fmt.iso(new Date(t)) + "T12:00:00"; }

    var targets = { "ev-fn1": 780, "ev-fn2": 1050, "ev-fn3": 1380, "ev-fn4": 640 };
    var ppvTargets = { "ev-fn2": 610, "ev-fn3": 1460 };

    events.forEach(function (ev) {
      if (ev.type !== "fight" || !targets[ev.id]) return;
      var evT = new Date(ev.date).getTime();
      var rows = 36, total = targets[ev.id], weights = [], sum = 0, i;
      for (i = 0; i < rows; i++) { var w = 0.4 + r() * 1.6 + (i > rows - 8 ? 1.2 : 0); weights.push(w); sum += w; }
      for (i = 0; i < rows; i++) {
        var qty = Math.max(1, Math.round(total * weights[i] / sum));
        var u = r(), tier = u < 0.62 ? tiers[0] : (u < 0.9 ? tiers[1] : tiers[2]);
        /* the upcoming card has been on sale for the last four weeks; past cards sold in the two months before the show */
        var when = ev.id === "ev-fn4" ? (now - 28 * DAY + (i / rows) * 27 * DAY) : (evT - 60 * DAY + (i / rows) * 58 * DAY);
        add({ ts: isoDay(when), source: "events", amount: qty * tier.price, qty: qty, eventId: ev.id, fighterId: pickWeighted(r, ev.id === "ev-fn4" ? ids.slice(0, 6) : ids, pull), desc: tier.name + " tickets" });
      }
      if (ppvTargets[ev.id]) {
        var pr = 24, ps = 0, pw = [];
        for (i = 0; i < pr; i++) { var q = 0.5 + r() * 1.5 + (i > pr - 6 ? 2 : 0); pw.push(q); ps += q; }
        for (i = 0; i < pr; i++) {
          var pq = Math.max(1, Math.round(ppvTargets[ev.id] * pw[i] / ps));
          add({ ts: isoDay(evT - 20 * DAY + (i / pr) * 21 * DAY), source: "ppv", amount: pq * CFG.ppvPrice, qty: pq, eventId: ev.id, fighterId: pickWeighted(r, ids, pull), desc: "Pay-per-view access" });
        }
      }
      if (ev.id !== "ev-fn4") {
        ids.forEach(function (fid) {
          var amt = Math.round((350 + pull[fid] * 3400 * (0.7 + r() * 0.6)) / 10) * 10;
          add({ ts: isoDay(evT - 9 * DAY), source: "fighters", amount: amt, qty: Math.round(amt / 45), eventId: ev.id, fighterId: fid, desc: "Tickets sold directly by fighter" });
        });
      }
    });

    /* website shop and subscriptions, Mar to Nov 2026 */
    var shopNames = ["Fight night merchandise", "FTG apparel drop", "Online shop orders", "Digital programme sales"];
    for (var m = 2; m <= 10; m++) {
      for (var k = 0; k < 2; k++) {
        var d2 = new Date(2026, m, 6 + k * 13, 12);
        add({ ts: fmt.iso(d2) + "T12:00:00", source: "website", amount: Math.round((750 + r() * 1700) / 10) * 10, qty: 0, eventId: "", fighterId: r() < 0.55 ? pickWeighted(r, ids, pull) : "", desc: shopNames[Math.floor(r() * shopNames.length)] });
      }
    }

    /* sponsors */
    add({ ts: "2026-03-02T12:00:00", source: "sponsors", amount: 6000, qty: 0, eventId: "ev-fn1", fighterId: "", desc: "Harbour Gym Supplies: equipment partnership" });
    add({ ts: "2026-05-20T12:00:00", source: "sponsors", amount: 7500, qty: 0, eventId: "ev-fn2", fighterId: "", desc: "Northside Motors: fight night sponsorship" });
    add({ ts: "2026-08-12T12:00:00", source: "sponsors", amount: 2500, qty: 0, eventId: "ev-fn3", fighterId: "", desc: "Emerald Print Co.: print partnership" });
    add({ ts: "2026-09-18T12:00:00", source: "sponsors", amount: 7500, qty: 0, eventId: "ev-fn3", fighterId: "", desc: "Northside Motors: fight night sponsorship" });
    add({ ts: "2026-11-02T12:00:00", source: "sponsors", amount: 2500, qty: 0, eventId: "ev-fn4", fighterId: "", desc: "Tech It Out: technology partnership" });

    /* expenses */
    var exp = [["Venue hire", 0.12], ["Production and lighting", 0.1], ["Security and medical", 0.05], ["Insurance and licensing", 0.03], ["Marketing and media", 0.06]];
    ["ev-fn1", "ev-fn2", "ev-fn3"].forEach(function (eid) {
      var ev = events.filter(function (e) { return e.id === eid; })[0];
      var base = { "ev-fn1": 41000, "ev-fn2": 68000, "ev-fn3": 99000 }[eid];
      exp.forEach(function (e, i) {
        expenses.push({ id: "ex-" + eid + i, ts: fmt.iso(new Date(ev.date).getTime() - (14 - i) * DAY) + "T12:00:00", category: e[0], amount: Math.round(base * e[1] / 50) * 50, eventId: eid, desc: ev.title + ": " + e[0].toLowerCase() });
      });
    });
    expenses.push({ id: "ex-fn4-dep", ts: "2026-11-10T12:00:00", category: "Venue hire", amount: 8000, eventId: "ev-fn4", desc: "FTG Fight Night IV: venue deposit" });
    expenses.push({ id: "ex-fn4-mk", ts: "2026-11-18T12:00:00", category: "Marketing and media", amount: 2400, eventId: "ev-fn4", desc: "FTG Fight Night IV: launch campaign" });
    for (var mm = 2; mm <= 10; mm++) {
      expenses.push({ id: "ex-sw" + mm, ts: fmt.iso(new Date(2026, mm, 1, 12)) + "T12:00:00", category: "Software and hosting", amount: 140, eventId: "", desc: "Website, tools and subscriptions" });
    }

    /* payouts to fighters */
    var onCard = { "ev-fn1": ids, "ev-fn2": ids, "ev-fn3": ids, "ev-fn4": ids.slice(0, 6), "ev-fn5": ["mateus-brannigan"] };
    Object.keys(onCard).forEach(function (eid) {
      var ev = events.filter(function (e) { return e.id === eid; })[0];
      var evT = new Date(ev.date).getTime();
      onCard[eid].forEach(function (fid) {
        var amt = Math.round((1500 + pull[fid] * 6000) / 50) * 50;
        var paid = eid === "ev-fn1" || eid === "ev-fn2" || (eid === "ev-fn3" && fid !== "mateus-brannigan" && fid !== "sione-hartigan");
        payouts.push({ id: "po-" + eid + "-" + fid, fighterId: fid, eventId: eid, amount: amt, status: paid ? "paid" : "owed", due: fmt.iso(evT + 7 * DAY), paidAt: paid ? fmt.iso(evT + 6 * DAY) : "" });
      });
    });

    /* per-fighter site analytics */
    var fighterStats = {};
    ids.forEach(function (fid) {
      var p = pull[fid], j = 0.85 + r() * 0.3;
      var views = Math.round(p * 21000 * j), bio = Math.round(views * (0.22 + r() * 0.1)), tickets = Math.round(views * (0.07 + r() * 0.03)), train = Math.round(views * (0.05 + r() * 0.03));
      fighterStats[fid] = { views: views, bio: bio, tickets: tickets, train: train, l30: { views: Math.round(views * 0.26), bio: Math.round(bio * 0.26), tickets: Math.round(tickets * 0.26), train: Math.round(train * 0.26) } };
    });

    /* sample requests */
    var requests = [
      { id: "rq-1", type: "sponsor", name: "Orla Brennan", org: "Brennan Motors", email: "orla@brennanmotors.example", phone: "+353 87 000 0001", ts: "2026-11-21T10:14:00", status: "new", fields: { budget: "€5,000 to €10,000", interest: "Fight night title sponsor" }, message: "We would love to discuss title sponsorship for Fight Night IV and a long-term partnership." },
      { id: "rq-2", type: "sponsor", name: "Ciarán Doyle", org: "Doyle Fitness", email: "ciaran@doylefitness.example", phone: "", ts: "2026-11-18T16:40:00", status: "contacted", fields: { budget: "€1,000 to €5,000", interest: "Fighter apparel" }, message: "Interested in sponsoring a fighter's kit and cross-promoting through our gyms." },
      { id: "rq-3", type: "fight", name: "Patrick Nolan", org: "", email: "pnolan@example.com", phone: "+353 86 000 0002", ts: "2026-11-22T19:05:00", status: "new", fields: { weight: "Welterweight", record: "6-1-0", gym: "Tallaght Boxing Club", age: "24" }, message: "Six fights, five wins. Looking to step up and fight on an FTG card in 2027." },
      { id: "rq-4", type: "fight", name: "Eamon Kerrigan", org: "", email: "eamon.kerrigan@example.com", phone: "", ts: "2026-11-15T09:30:00", status: "new", fields: { weight: "Featherweight", record: "9-2-0", gym: "Dublin Boxing Academy", age: "28" }, message: "Available at short notice for any featherweight bout." },
      { id: "rq-5", type: "fight", name: "Callum Dray", org: "", email: "callum.dray@example.com", phone: "+353 85 000 0003", ts: "2026-11-09T14:22:00", status: "closed", fields: { weight: "Super Welterweight", record: "10-3-0", gym: "Kildare Fight Team", age: "30" }, message: "Happy to take the Fight Night IV bout." },
      { id: "rq-6", type: "collab", name: "Saoirse Mac Con Iomaire", org: "Frame by Frame Studios", email: "saoirse@framebyframe.example", phone: "", ts: "2026-11-20T11:11:00", status: "new", fields: { interest: "Join the team", role: "Video editor" }, message: "Experienced sports video editor looking to join the FTG media crew." },
      { id: "rq-7", type: "collab", name: "Dara Kinsella", org: "", email: "dara.k@example.com", phone: "", ts: "2026-11-12T18:47:00", status: "contacted", fields: { interest: "Join the team", role: "Ring crew and event staff" }, message: "Five years in live events and keen to join the FTG event crew." },
      { id: "rq-8", type: "collab", name: "Beau Fitzgerald", org: "Fitz Podcast", email: "beau@fitzpodcast.example", phone: "", ts: "2026-11-05T13:02:00", status: "new", fields: { interest: "Collaboration", role: "Podcast feature" }, message: "Would love to host a fight-week special with FTG fighters on the show." }
    ];

    return {
      version: SEED.version, built: now,
      events: events, fighters: fighters, requests: requests,
      transactions: tx, expenses: expenses, payouts: payouts,
      fighterStats: fighterStats, hits: {}, openingBalance: SEED.openingBalance,
      sources: { instagram: 0, direct: 0, search: 0, youtube: 0, other: 0 }
    };
  }

  /* ---------- persistence ---------- */
  function load() {
    if (mem) return mem;
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (raw) {
      try {
        var p = JSON.parse(raw);
        if (p && p.version === SEED.version) { mem = p; return mem; }
      } catch (e2) { /* fall through to rebuild */ }
    }
    mem = build();
    save();
    return mem;
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* storage unavailable: keep in memory */ }
  }
  function reset() {
    try { window.localStorage.removeItem(KEY); window.localStorage.removeItem("ftg.ppv"); } catch (e) { /* ignore */ }
    mem = null;
    return load();
  }

  /* ---------- queries ---------- */
  function byDate(a, b) { return new Date(a.date) - new Date(b.date); }
  var S = {
    get: load, save: save, reset: reset,
    events: function (all) { return load().events.filter(function (e) { return all || e.published; }).sort(byDate); },
    event: function (id) { return load().events.filter(function (e) { return e.id === id; })[0] || null; },
    upcoming: function () { var n = Date.now(); return S.events().filter(function (e) { return new Date(e.date).getTime() >= n; }); },
    past: function () { var n = Date.now(); return S.events().filter(function (e) { return new Date(e.date).getTime() < n; }).reverse(); },
    nextFightNight: function () { return S.upcoming().filter(function (e) { return e.type === "fight"; })[0] || null; },
    children: function (id) { return S.events().filter(function (e) { return e.parentId === id; }); },
    fighters: function (all) { return load().fighters.filter(function (f) { return all || f.published; }); },
    fighter: function (id) { return load().fighters.filter(function (f) { return f.id === id; })[0] || null; },
    card: function (eventId) {
      return S.fighters().filter(function (f) { return f.nextFight && f.nextFight.eventId === eventId; });
    },
    ticketsSold: function (eventId) {
      return load().transactions.filter(function (t) { return t.eventId === eventId && t.source === "events"; }).reduce(function (a, t) { return a + (t.qty || 0); }, 0);
    },
    ppvBuys: function (eventId) {
      return load().transactions.filter(function (t) { return t.eventId === eventId && t.source === "ppv"; }).reduce(function (a, t) { return a + (t.qty || 0); }, 0);
    }
  };

  /* ---------- mutations ---------- */
  S.saveEvent = function (ev) {
    var st = load(), i;
    if (!ev.id) { ev.id = uid("ev"); st.events.push(ev); }
    else {
      for (i = 0; i < st.events.length; i++) if (st.events[i].id === ev.id) { st.events[i] = ev; break; }
      if (i === st.events.length) st.events.push(ev);
    }
    save(); return ev;
  };
  S.deleteEvent = function (id) {
    var st = load();
    st.events = st.events.filter(function (e) { return e.id !== id && e.parentId !== id; });
    st.fighters.forEach(function (f) { if (f.nextFight && f.nextFight.eventId === id) f.nextFight.eventId = ""; });
    save();
  };
  S.saveFighter = function (f) {
    var st = load();
    for (var i = 0; i < st.fighters.length; i++) if (st.fighters[i].id === f.id) { st.fighters[i] = f; save(); return f; }
    st.fighters.push(f);
    if (!st.fighterStats[f.id]) st.fighterStats[f.id] = { views: 0, bio: 0, tickets: 0, train: 0, l30: { views: 0, bio: 0, tickets: 0, train: 0 } };
    save(); return f;
  };
  S.addRequest = function (rq) {
    var st = load();
    rq.id = uid("rq"); rq.ts = new Date().toISOString(); rq.status = "new";
    st.requests.unshift(rq); save();
    if (CFG.formEndpoint) {
      try {
        fetch(CFG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(rq) }).catch(function () { /* offline: kept locally */ });
      } catch (e) { /* ignore */ }
    }
    return rq;
  };
  S.setRequestStatus = function (id, status) {
    var st = load();
    st.requests.forEach(function (q) { if (q.id === id) q.status = status; });
    save();
  };
  S.deleteRequest = function (id) {
    var st = load();
    st.requests = st.requests.filter(function (q) { return q.id !== id; });
    save();
  };
  S.addTransaction = function (t) {
    var st = load();
    t.id = uid("tx"); t.ts = t.ts || new Date().toISOString();
    st.transactions.push(t); save(); return t;
  };
  S.markPaid = function (payoutId) {
    var st = load();
    st.payouts.forEach(function (p) { if (p.id === payoutId) { p.status = "paid"; p.paidAt = fmt.iso(new Date()); } });
    save();
  };

  /* ---------- tracking (real visits on this browser feed the admin stats) ---------- */
  var ref = null;
  try { ref = window.sessionStorage.getItem("ftg.ref"); } catch (e) { ref = null; }
  S.setRef = function (fid) { ref = fid; try { window.sessionStorage.setItem("ftg.ref", fid || ""); } catch (e) { /* ignore */ } };
  S.getRef = function () { return ref || ""; };
  S.track = function (type, fid) {
    var st = load(), key = fmt.iso(new Date());
    if (type === "view") {
      st.hits[key] = (st.hits[key] || 0) + 1;
      var src = "direct", rf = document.referrer || "";
      if (/instagram|facebook|l\.ig/i.test(rf)) src = "instagram"; else if (/google|bing|duckduckgo/i.test(rf)) src = "search"; else if (/youtube|youtu\.be/i.test(rf)) src = "youtube"; else if (rf && rf.indexOf(location.host) < 0) src = "other";
      st.sources[src] = (st.sources[src] || 0) + 1;
    } else if (fid && st.fighterStats[fid]) {
      var fs = st.fighterStats[fid];
      fs[type] = (fs[type] || 0) + 1;
      if (fs.l30) fs.l30[type] = (fs.l30[type] || 0) + 1;
    }
    save();
  };

  /* Deterministic daily traffic for any date, plus real visits recorded on this browser. */
  S.traffic = function (dateStr) {
    var st = load(), d = new Date(dateStr + "T12:00:00");
    var rr = rng(hashStr(dateStr)), dow = d.getDay();
    var base = 520 + (dow === 0 || dow === 6 ? 140 : 0) + (dow === 5 ? 90 : 0);
    var boost = 1;
    st.events.forEach(function (e) {
      if (e.type !== "fight") return;
      var diff = (new Date(e.date) - d) / 86400000;
      if (diff >= -1 && diff < 21) boost += 0.9 * Math.exp(-Math.max(diff, 0) / 6);
    });
    var growth = 1 + Math.max(0, (d - new Date("2026-03-01")) / 86400000) / 600;
    var views = Math.round(base * boost * growth * (0.82 + rr() * 0.36)) + (st.hits[dateStr] || 0);
    return { date: dateStr, views: views, visitors: Math.round(views * (0.52 + rr() * 0.06)) };
  };
  S.trafficRange = function (days) {
    var out = [], now = new Date();
    for (var i = days - 1; i >= 0; i--) out.push(S.traffic(fmt.iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i))));
    return out;
  };

  /* ---------- PPV access (this browser) ---------- */
  S.ppvAccess = function () {
    try {
      var v = JSON.parse(window.localStorage.getItem("ftg.ppv") || "null");
      if (v && v.expires > Date.now()) return v;
    } catch (e) { /* ignore */ }
    return null;
  };
  S.grantPpv = function (email, eventId) {
    var v = { email: email, eventId: eventId || "", at: Date.now(), expires: Date.now() + 7 * 86400000 };
    try { window.localStorage.setItem("ftg.ppv", JSON.stringify(v)); } catch (e) { /* ignore */ }
    return v;
  };

  window.FTG = { config: CFG, seed: SEED, store: S, fmt: fmt, rng: rng, hashStr: hashStr, clone: clone, uid: uid };
})();
