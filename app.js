(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d", { alpha: false });
  const ui = {
    time: document.getElementById("time"),
    score: document.getElementById("score"),
    combo: document.getElementById("combo"),
    intro: document.getElementById("intro"),
    introLine: document.getElementById("introLine"),
    caption: document.getElementById("captionText"),
    finale: document.getElementById("finale"),
    rank: document.getElementById("rank"),
    finalScore: document.getElementById("finalScore"),
    restart: document.getElementById("restart"),
    fullscreen: document.getElementById("fullscreen"),
  };

  const params = new URLSearchParams(location.search);
  const autoDemo = params.get("demo") === "auto";
  const seconds = Math.max(45, Math.min(90, Number(params.get("time")) || 75));
  const colors = [
    { name: "cyan", hex: "#28f5ff", rgb: [40, 245, 255] },
    { name: "magenta", hex: "#ff3df2", rgb: [255, 61, 242] },
    { name: "gold", hex: "#ffd35a", rgb: [255, 211, 90] },
    { name: "lime", hex: "#a8ff6a", rgb: [168, 255, 106] },
    { name: "white", hex: "#f8fbff", rgb: [248, 251, 255] },
  ];
  const lines = [
    "Pattern rewritten in real time.",
    "Codex Core predicts the next chain.",
    "New rule synthesized from your trace.",
    "Signal amplified. Keep drawing light.",
    "The board adapts to your rhythm.",
    "Instant prototype energy detected.",
  ];

  const s = {
    w: 0,
    h: 0,
    dpr: 1,
    start: performance.now(),
    last: performance.now(),
    mode: "intro",
    score: 0,
    combo: 1,
    pulse: 0,
    nodes: [],
    pick: [],
    parts: [],
    rings: [],
    beams: [],
    pointer: null,
    bot: { active: autoDemo, path: [], next: 0, i: 0 },
    audio: null,
  };

  function rgba(c, a) {
    return `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},${a})`;
  }

  function metrics() {
    const min = Math.min(s.w, s.h);
    const top = s.h < 720 ? 96 : 120;
    const bottom = s.h < 720 ? 78 : 100;
    const size = Math.min(min * (s.w > s.h ? 0.78 : 0.9), s.h - top - bottom, s.w - 36);
    return {
      cx: s.w / 2,
      cy: top + (s.h - top - bottom) / 2,
      r: Math.max(180, size / 2),
      node: Math.max(16, Math.min(28, size * 0.035)),
      core: Math.max(58, Math.min(124, size * 0.14)),
    };
  }

  function resize() {
    s.dpr = Math.min(devicePixelRatio || 1, 2);
    s.w = innerWidth;
    s.h = innerHeight;
    canvas.width = Math.floor(s.w * s.dpr);
    canvas.height = Math.floor(s.h * s.dpr);
    canvas.style.width = `${s.w}px`;
    canvas.style.height = `${s.h}px`;
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    makeNodes(true);
  }

  function makeNodes(keep) {
    const old = s.nodes;
    const m = metrics();
    const specs = [
      [s.w < 600 ? 8 : 10, 0.43],
      [s.w < 600 ? 12 : 16, 0.68],
      [s.w < 600 ? 14 : 18, 0.89],
    ];
    let id = 0;
    s.nodes = [];
    specs.forEach(([count, rr], ring) => {
      for (let i = 0; i < count; i += 1) {
        const a = (i / count) * Math.PI * 2 + ring * 0.24 + Math.sin(i * 2.13 + ring) * 0.06;
        const oldNode = old[id];
        s.nodes.push({
          id,
          x: m.cx + Math.cos(a) * m.r * rr * (s.w < s.h ? 0.86 : 1),
          y: m.cy + Math.sin(a) * m.r * rr,
          r: m.node * (ring ? 1 : 0.94),
          ring,
          color: keep && oldNode ? oldNode.color : colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * 7,
          on: false,
        });
        id += 1;
      }
    });
    s.pick = [];
  }

  function ensureAudio() {
    if (s.audio) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const audio = new Ctx();
    const master = audio.createGain();
    master.gain.value = 0.06;
    master.connect(audio.destination);
    s.audio = { audio, master };
  }

  function tone(freq, dur, color, type = "sine") {
    if (!s.audio) return;
    const { audio, master } = s.audio;
    if (audio.state === "suspended") audio.resume();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.65, audio.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(audio.currentTime + dur + 0.02);
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function nearest(x, y) {
    let best = null;
    let bestD = Infinity;
    s.nodes.forEach((n) => {
      const d = Math.hypot(n.x - x, n.y - y);
      if (d < bestD && d < n.r * 2.35) {
        best = n;
        bestD = d;
      }
    });
    return best;
  }

  function canAdd(n) {
    if (!n || s.pick.includes(n)) return false;
    const last = s.pick[s.pick.length - 1];
    if (!last) return true;
    return last.color.name === n.color.name || dist(last, n) < metrics().r * 0.32;
  }

  function add(n) {
    if (!canAdd(n)) return;
    n.on = true;
    s.pick.push(n);
    s.pulse = Math.min(1, s.pulse + 0.16);
    s.rings.push({ x: n.x, y: n.y, c: n.color, life: 0.7, max: 0.7, k: 0.8 });
    tone(250 + s.pick.length * 64, 0.055, n.color);
  }

  function burst(x, y, c, count, speed = 1) {
    for (let i = 0; i < count; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const v = (1.2 + Math.random() * 4.8) * speed;
      s.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: 2 + Math.random() * 4, c, life: 0.9, max: 0.9 });
    }
  }

  function release() {
    const chain = s.pick.slice();
    if (chain.length < 2) {
      chain.forEach((n) => (n.on = false));
      s.pick = [];
      return;
    }
    const mult = Math.min(12, chain.length - 1 + Math.floor(s.combo / 2));
    s.score += chain.length * chain.length * 120 * mult;
    s.combo = Math.min(24, s.combo + chain.length - 1);
    s.pulse = 1;
    ui.caption.textContent = lines[(Math.floor(s.score / 1000) + chain.length) % lines.length];
    chain.forEach((n, i) => {
      burst(n.x, n.y, n.color, 20 + chain.length * 2, 1.4 + i * 0.15);
      if (i) s.beams.push({ a: chain[i - 1], b: n, c: n.color, life: 0.34, max: 0.34 });
      n.color = colors[Math.floor(Math.random() * colors.length)];
      n.phase = Math.random() * 7;
      n.on = false;
    });
    const m = metrics();
    s.rings.push({ x: m.cx, y: m.cy, c: chain[0].color, life: 0.8, max: 0.8, k: 1.8 });
    tone(190 + chain.length * 76, 0.13, chain[0].color, "triangle");
    s.pick = [];
    updateHud();
  }

  function updateHud() {
    ui.score.textContent = Math.round(s.score).toLocaleString();
    ui.combo.textContent = `x${Math.max(1, Math.floor(s.combo))}`;
  }

  function start(now) {
    s.mode = "play";
    s.start = now - 3000;
    ui.intro.classList.add("is-out");
    setTimeout(() => (ui.intro.hidden = true), 760);
    ui.caption.textContent = autoDemo ? "Auto demo: Codex Core is tracing the board." : "Trace matching light.";
  }

  function finish() {
    if (s.mode === "finale") return;
    s.mode = "finale";
    s.pick.forEach((n) => (n.on = false));
    s.pick = [];
    const rank = s.score > 24000 ? "Prism Virtuoso" : s.score > 17000 ? "Prototype Sorcerer" : s.score > 11000 ? "Signal Architect" : s.score > 5500 ? "Chain Designer" : "Prism Initiate";
    ui.rank.textContent = rank;
    ui.finalScore.textContent = `${Math.round(s.score).toLocaleString()} pts`;
    ui.finale.hidden = false;
    ui.caption.textContent = "Demo complete.";
    const m = metrics();
    for (let i = 0; i < 9; i += 1) {
      setTimeout(() => {
        s.rings.push({ x: m.cx, y: m.cy, c: colors[i % colors.length], life: 1, max: 1, k: 2.1 });
        burst(m.cx, m.cy, colors[i % colors.length], 36, 2.2);
      }, i * 90);
    }
  }

  function point(e) {
    const rect = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - rect.left, y: p.clientY - rect.top };
  }

  function down(e) {
    e.preventDefault();
    ensureAudio();
    if (s.mode === "intro") start(performance.now());
    if (s.mode !== "play") return;
    s.pointer = point(e);
    add(nearest(s.pointer.x, s.pointer.y));
  }

  function move(e) {
    if (!s.pointer || s.mode !== "play") return;
    e.preventDefault();
    s.pointer = point(e);
    add(nearest(s.pointer.x, s.pointer.y));
  }

  function up(e) {
    if (!s.pointer) return;
    e.preventDefault();
    s.pointer = null;
    release();
  }

  function bot(now, dt) {
    if (!s.bot.active || s.mode !== "play" || s.pointer) return;
    if (!s.bot.path.length && now > s.bot.next) {
      const seed = s.nodes[Math.floor(Math.random() * s.nodes.length)];
      s.bot.path = s.nodes.filter((n) => n.color.name === seed.color.name && dist(n, seed) < metrics().r * 0.78).slice(0, 6);
      if (s.bot.path.length < 2) s.bot.path = s.nodes.slice(0, 4);
      s.bot.i = 0;
    }
    if (!s.bot.path.length) return;
    const target = s.bot.path[s.bot.i];
    s.pointer = { x: target.x, y: target.y };
    add(target);
    s.bot.i += dt * 5.5;
    if (s.bot.i >= s.bot.path.length) {
      release();
      s.pointer = null;
      s.bot.path = [];
      s.bot.next = now + 700 + Math.random() * 500;
    }
  }

  function update(now) {
    const dt = Math.min(0.04, (now - s.last) / 1000);
    s.last = now;
    if (s.mode === "intro" && now - s.start > 3000) start(now);
    if (s.mode === "play") {
      const left = Math.max(0, Math.ceil(seconds - (now - s.start - 3000) / 1000));
      ui.time.textContent = left;
      if (left <= 0) finish();
      s.combo = Math.max(1, s.combo - dt * 0.38);
      ui.combo.textContent = `x${Math.max(1, Math.floor(s.combo))}`;
      bot(now, dt);
    }
    s.pulse = Math.max(0, s.pulse - dt * 1.7);
    s.nodes.forEach((n) => {
      n.phase += dt * (1.2 + n.ring * 0.3);
      n.x += Math.sin(n.phase + n.id) * 0.04;
      n.y += Math.cos(n.phase * 0.9 + n.id) * 0.04;
    });
    s.parts = s.parts.filter((p) => ((p.life -= dt), (p.x += p.vx * 52 * dt), (p.y += p.vy * 52 * dt), (p.vx *= 0.985), (p.vy *= 0.985), p.life > 0));
    s.rings = s.rings.filter((r) => ((r.life -= dt), r.life > 0));
    s.beams = s.beams.filter((b) => ((b.life -= dt), b.life > 0));
  }

  function background(now) {
    const g = ctx.createLinearGradient(0, 0, s.w, s.h);
    g.addColorStop(0, "#080915");
    g.addColorStop(0.45, "#101029");
    g.addColorStop(1, "#05060c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s.w, s.h);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 26; i += 1) {
      const x = ((Math.sin(now * 0.00055 + i * 12.9) * 0.5 + 0.5) * s.w + i * 47) % s.w;
      const y = ((Math.cos(now * 0.00042 + i * 8.3) * 0.5 + 0.5) * s.h + i * 29) % s.h;
      ctx.fillStyle = rgba(colors[i % colors.length], 0.05 + (i % 4) * 0.012);
      ctx.beginPath();
      ctx.arc(x, y, 110 + (i % 5) * 28, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function draw(now) {
    background(now);
    const m = metrics();
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.translate(m.cx, m.cy);
    ctx.rotate(Math.sin(now * 0.00022) * 0.08);
    for (let i = 0; i < 4; i += 1) {
      ctx.strokeStyle = rgba(colors[i], 0.18 + s.pulse * 0.12);
      ctx.lineWidth = 1.2 + i * 0.8;
      ctx.beginPath();
      ctx.ellipse(0, 0, m.r * (0.34 + i * 0.18), m.r * (0.29 + i * 0.16), 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    const core = m.core * (0.9 + s.pulse * 0.42 + Math.sin(now * 0.004) * 0.04);
    const cg = ctx.createRadialGradient(m.cx, m.cy, core * 0.08, m.cx, m.cy, core * 1.34);
    cg.addColorStop(0, "rgba(255,255,255,0.98)");
    cg.addColorStop(0.18, "rgba(40,245,255,0.88)");
    cg.addColorStop(0.52, "rgba(255,61,242,0.32)");
    cg.addColorStop(1, "rgba(40,245,255,0)");
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(m.cx, m.cy, core * 1.35, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 1; i < s.pick.length; i += 1) {
      const a = s.pick[i - 1], b = s.pick[i];
      ctx.strokeStyle = rgba(b.color, 0.86);
      ctx.lineWidth = Math.max(5, b.r * 0.45);
      ctx.shadowColor = b.color.hex;
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    if (s.pointer && s.pick.length) {
      const last = s.pick[s.pick.length - 1];
      ctx.strokeStyle = rgba(last.color, 0.38);
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(s.pointer.x, s.pointer.y);
      ctx.stroke();
    }

    s.beams.forEach((b) => {
      const a = b.life / b.max;
      ctx.strokeStyle = rgba(b.c, a * 0.9);
      ctx.lineWidth = 8 * a;
      ctx.shadowBlur = 30;
      ctx.shadowColor = b.c.hex;
      ctx.beginPath();
      ctx.moveTo(b.a.x, b.a.y);
      ctx.lineTo(b.b.x, b.b.y);
      ctx.stroke();
    });
    s.rings.forEach((r) => {
      const k = 1 - r.life / r.max;
      ctx.strokeStyle = rgba(r.c, (1 - k) * 0.48);
      ctx.lineWidth = 3 + r.k * 2;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 24 + k * 160 * r.k, 0, Math.PI * 2);
      ctx.stroke();
    });
    s.parts.forEach((p) => {
      const a = p.life / p.max;
      ctx.fillStyle = rgba(p.c, a * 0.95);
      ctx.shadowColor = p.c.hex;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * a, 0, Math.PI * 2);
      ctx.fill();
    });

    s.nodes.forEach((n) => {
      const throb = Math.sin(now * 0.003 + n.phase) * 0.12;
      const r = n.r * (n.on ? 1.5 : 1 + throb);
      const ng = ctx.createRadialGradient(n.x, n.y, r * 0.12, n.x, n.y, r * 2.2);
      ng.addColorStop(0, "rgba(255,255,255,0.95)");
      ng.addColorStop(0.32, rgba(n.color, n.on ? 0.92 : 0.72));
      ng.addColorStop(1, rgba(n.color, 0));
      ctx.fillStyle = ng;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = n.color.hex;
      ctx.shadowColor = n.color.hex;
      ctx.shadowBlur = n.on ? 34 : 18;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 0.78, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(n.x - r * 0.22, n.y - r * 0.24, Math.max(2, r * 0.18), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function loop(now) {
    update(now);
    draw(now);
    requestAnimationFrame(loop);
  }

  function restart() {
    s.start = performance.now();
    s.last = s.start;
    s.mode = "intro";
    s.score = 0;
    s.combo = 1;
    s.pulse = 0;
    s.pick = [];
    s.parts = [];
    s.rings = [];
    s.beams = [];
    s.bot.path = [];
    s.bot.next = 0;
    ui.finale.hidden = true;
    ui.intro.hidden = false;
    ui.intro.classList.remove("is-out");
    ui.introLine.textContent = autoDemo ? "Auto synthesis engaged." : "Touch to synthesize.";
    ui.caption.textContent = "Ready.";
    makeNodes(false);
    updateHud();
  }

  addEventListener("resize", resize);
  canvas.addEventListener("mousedown", down);
  canvas.addEventListener("mousemove", move);
  addEventListener("mouseup", up);
  canvas.addEventListener("touchstart", down, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  addEventListener("touchend", up, { passive: false });
  ui.restart.addEventListener("click", () => { ensureAudio(); restart(); });
  ui.fullscreen.addEventListener("click", () => {
    ensureAudio();
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  ui.time.textContent = seconds;
  ui.introLine.textContent = autoDemo ? "Auto synthesis engaged." : "Touch to synthesize.";
  resize();
  updateHud();
  requestAnimationFrame(loop);
})();
