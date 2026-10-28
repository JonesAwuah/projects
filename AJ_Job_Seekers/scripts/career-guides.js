/* AJ Job Seekers – Career Guides: guided training (Learn → Practise → Check) ending in a printable Career Plan.
   Progress and answers are saved in this browser only (localStorage). */
(function () {
  'use strict';

  var DATA = window.CG_DATA;
  var stage = document.getElementById('cgStage');
  if (!stage || !DATA) return;
  var MODS = DATA.modules, PASS = DATA.passMark;
  var C = (function () {
    var d = { key: 'ajjs_career_guide', eyebrow: 'Career Guide training', planNav: 'My Career Plan', planName: 'Career Plan', doneTitle: 'Career Guide completed', course: 'Career Guide', targetMod: 'explore', targetKey: 'target', targetLabel: 'Target role',
      next: [
        { t: 'Build or update your resume', d: 'Turn your achievements and skills into a one-page resume.', href: 'resume.html' },
        { t: 'Practise your interview', d: 'Take the coaching and a live 30-minute practice interview.', href: 'interview-coaching.html' },
        { t: 'Search for jobs', d: 'See current vacancies and apply with your tailored CV.', href: 'jobs.html' }
      ] };
    var o = DATA.config || {};
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) d[k] = o[k];
    return d;
  })();
  var KEY = C.key;

  var S = { data: {}, steps: {}, view: 'welcome', mod: 0, tab: 'learn', quiz: null };

  /* ---------------------------------------------------------------- helpers */
  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, k) || attrs[k] == null || attrs[k] === false) continue;
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c == null) return; n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function btn(text, cls, fn, extra) { var a = { type: 'button', class: 'btn ' + (cls || ''), text: text, onclick: fn }; if (extra) for (var k in extra) a[k] = extra[k]; return h('button', a); }
  function ulist(items, cls) { return h('ul', cls ? { class: cls } : null, items.map(function (i) { return h('li', { text: i }); })); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function save() { try { localStorage.setItem(KEY, JSON.stringify({ data: S.data, steps: S.steps })); } catch (e) { /* storage unavailable */ } }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && typeof s === 'object') { S.data = s.data && typeof s.data === 'object' ? s.data : {}; S.steps = s.steps && typeof s.steps === 'object' ? s.steps : {}; }
    } catch (e) { S.data = {}; S.steps = {}; }
  }
  function st(i) { var id = MODS[i].id; return S.steps[id] || (S.steps[id] = { read: false, activity: false, passed: false }); }
  function isDone(i) { return !!(S.steps[MODS[i].id] && S.steps[MODS[i].id].passed); }
  function doneCount() { var n = 0; for (var i = 0; i < MODS.length; i++) if (isDone(i)) n++; return n; }
  function allDone() { return doneCount() === MODS.length; }
  function modStarted(i) { var s = S.steps[MODS[i].id]; return !!(s && (s.read || s.activity || s.passed)); }
  function nextModule() { for (var i = 0; i < MODS.length; i++) if (!isDone(i)) return i; return -1; }
  function unlocked(i) { return i === 0 || isDone(i - 1); }
  function scrollTop() { var s = document.getElementById('guide'); if (s && s.scrollIntoView) { try { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { s.scrollIntoView(); } } }

  /* ---------------------------------------------------------------- navigation */
  function go(view, mod, tab, noScroll) {
    S.view = view; if (mod != null) S.mod = mod; if (tab) S.tab = tab; S.quiz = null;
    stage.textContent = '';
    if (view === 'welcome') viewWelcome();
    else if (view === 'plan') viewPlan();
    else viewModule();
    var hd = stage.querySelector('h2'); if (hd) { hd.setAttribute('tabindex', '-1'); try { hd.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    paintProgress();
    if (!noScroll) scrollTop();
  }
  function paintProgress() {
    var n = doneCount(), pct = Math.round(n / MODS.length * 100);
    var bar = document.getElementById('cgBar'), lab = document.getElementById('cgBarLabel');
    if (bar) { bar.style.width = pct + '%'; bar.parentNode.setAttribute('aria-valuenow', String(n)); }
    if (lab) lab.textContent = n + ' of ' + MODS.length + ' modules complete';
  }

  function sideNav() {
    var items = [h('li', { class: S.view === 'welcome' ? 'current' : '' }, [h('button', { type: 'button', onclick: function () { go('welcome'); } }, [h('span', { class: 'mn', text: '★' }), h('span', { text: 'Start here' })])])];
    MODS.forEach(function (m, i) {
      var ok = unlocked(i);
      var cls = (S.view === 'module' && S.mod === i ? 'current ' : '') + (isDone(i) ? 'done ' : '') + (ok ? '' : 'locked');
      items.push(h('li', { class: cls }, [h('button', { type: 'button', disabled: ok ? null : true, onclick: function () { go('module', i, st(i).read ? (st(i).activity ? 'check' : 'practise') : 'learn'); }, 'aria-label': m.title + (ok ? '' : ' (locked until the previous module is complete)') },
        [h('span', { class: 'mn', text: isDone(i) ? '✓' : ok ? String(i + 1) : '🔒' }), h('span', { text: m.title })])]));
    });
    items.push(h('li', { class: (S.view === 'plan' ? 'current ' : '') + (allDone() ? '' : 'locked') }, [h('button', { type: 'button', disabled: allDone() ? null : true, onclick: function () { go('plan'); } }, [h('span', { class: 'mn', text: allDone() ? '🎓' : '🔒' }), h('span', { text: C.planNav })])]));
    return h('ol', { class: 'module-nav' }, items);
  }
  function shell(main) {
    return h('div', { class: 'cg-grid' }, [h('aside', { class: 'cg-side no-print' }, [sideNav()]), h('div', { class: 'cg-main' }, main)]);
  }

  /* ---------------------------------------------------------------- coach banner */
  function coach(text, cta) {
    return h('div', { class: 'coach no-print' }, [h('div', { class: 'coach-ico', 'aria-hidden': 'true', text: '🧭' }), h('div', null, [h('strong', { text: 'Your next step' }), h('p', { text: text })]), cta || null]);
  }

  /* ---------------------------------------------------------------- welcome */
  function viewWelcome() {
    var W = DATA.welcome, nxt = nextModule();
    var started = MODS.some(function (m, i) { return modStarted(i); });
    var cards = h('div', { class: 'mod-cards' }, MODS.map(function (m, i) {
      var ok = unlocked(i), d = isDone(i), cls = d ? 'complete' : modStarted(i) ? 'progress' : ok ? 'ready' : 'locked';
      var label = d ? 'Complete' : modStarted(i) ? 'In progress' : ok ? 'Ready' : 'Locked';
      return h('div', { class: 'mod-card ' + cls }, [
        h('div', { class: 'mc-top' }, [h('span', { class: 'mn big', text: d ? '✓' : String(i + 1) }), h('span', { class: 'badge ' + cls, text: label })]),
        h('h3', { text: m.title }), h('p', { class: 'muted', text: m.goal }),
        h('p', { class: 'small muted', text: 'About ' + m.minutes + ' minutes · Learn · Practise · Check' }),
        btn(d ? 'Review module' : modStarted(i) ? 'Continue' : 'Start module', d ? 'ghost' : 'primary', function () { go('module', i, 'learn'); }, { disabled: ok ? null : true })
      ]);
    }));
    var cta = nxt >= 0 ? btn(started ? 'Continue: ' + MODS[nxt].title : 'Start Module 1', 'primary', function () { var s = st(nxt); go('module', nxt, s.read ? (s.activity ? 'check' : 'practise') : 'learn'); }) : btn('Open my ' + C.planName, 'primary', function () { go('plan'); });
    var total = MODS.reduce(function (a, m) { return a + m.minutes; }, 0);
    stage.appendChild(shell([
      h('div', { class: 'panel' }, [
        h('span', { class: 'eyebrow', text: C.eyebrow }),
        h('h2', { text: W.title }),
        h('p', { class: 'lead-in', text: W.intro }),
        h('div', { class: 'two-col' }, [
          h('div', null, [h('h3', { text: 'How each module works' }), ulist(W.promises, 'bullets')]),
          h('div', null, [h('h3', { text: 'To get the most from it' }), ulist(W.tips, 'bullets')])
        ]),
        h('p', { class: 'small muted', text: 'Six modules · about ' + Math.round(total / 60 * 10) / 10 + ' hours in total · you can stop and continue any time.' }),
        coach(nxt < 0 ? 'You have completed every module. Open your ' + C.planName + ', print it and start acting on it.' : started ? 'Pick up where you stopped: ' + MODS[nxt].title + '.' : 'Begin with Module 1, “' + MODS[0].title + '”. It takes about ' + MODS[0].minutes + ' minutes.', cta)
      ]),
      h('h3', { class: 'cg-h3', text: 'Your journey' }), cards
    ]));
  }

  function fallbackCopy(t, ok) {
    try { var ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); ok(); } catch (e) { /* ignore */ }
  }

  /* ---------------------------------------------------------------- lesson blocks */
  function block(b) {
    switch (b.t) {
      case 'h': return h('h3', { text: b.text });
      case 'p': return h('p', { text: b.text });
      case 'ul': return ulist(b.items, 'bullets');
      case 'ol': return h('ol', { class: 'numbers' }, b.items.map(function (i) { return h('li', { text: i }); }));
      case 'tip': return h('div', { class: 'callout tip' }, [h('strong', { text: b.title }), h('p', { text: b.text })]);
      case 'ex': return h('div', { class: 'callout ex' }, [h('strong', { text: b.title }), h('p', { class: 'pre', text: b.text })]);
      case 'tpl': {
        var pre = h('pre', { class: 'tpl-text', text: b.text });
        var cb = h('button', { type: 'button', class: 'copy-btn', text: 'Copy message', onclick: function () {
          function ok() { cb.textContent = 'Copied ✓'; setTimeout(function () { cb.textContent = 'Copy message'; }, 1800); }
          try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(b.text).then(ok, function () { fallbackCopy(b.text, ok); }); } else fallbackCopy(b.text, ok); } catch (e) { fallbackCopy(b.text, ok); }
        } });
        return h('div', { class: 'tpl' }, [h('div', { class: 'tpl-head' }, [h('strong', { text: b.title }), cb]), pre, b.note ? h('p', { class: 'small muted', text: b.note }) : null]);
      }
      case 'warn': return h('div', { class: 'callout warn' }, [h('strong', { text: b.title }), h('p', { text: b.text })]);
      case 'table':
        return h('div', { class: 'table-wrap' }, [h('table', null, [
          h('thead', null, [h('tr', null, b.head.map(function (x) { return h('th', { text: x, scope: 'col' }); }))]),
          h('tbody', null, b.rows.map(function (r) { return h('tr', null, r.map(function (c, i) { return h(i === 0 ? 'th' : 'td', { text: c, scope: i === 0 ? 'row' : null }); })); }))
        ])]);
    }
    return h('span');
  }

  /* ---------------------------------------------------------------- module view */
  function tabsBar(i) {
    var s = st(i);
    var defs = [['learn', '1', 'Learn', true], ['practise', '2', 'Practise', s.read], ['check', '3', 'Check', s.activity]];
    return h('div', { class: 'tabs no-print', role: 'tablist' }, defs.map(function (d) {
      var done = d[0] === 'learn' ? s.read : d[0] === 'practise' ? s.activity : s.passed;
      return h('button', { type: 'button', role: 'tab', 'aria-selected': S.tab === d[0] ? 'true' : 'false', class: 'tab' + (S.tab === d[0] ? ' on' : '') + (done ? ' done' : ''), disabled: d[3] ? null : true,
        onclick: function () { go('module', i, d[0]); } }, [h('span', { class: 'tn', text: done ? '✓' : d[1] }), d[2]]);
    }));
  }
  function viewModule() {
    var i = S.mod, m = MODS[i];
    if (!unlocked(i)) { go('welcome'); return; }
    var s = st(i);
    if (S.tab === 'practise' && !s.read) S.tab = 'learn';
    if (S.tab === 'check' && !s.activity) S.tab = s.read ? 'practise' : 'learn';
    var body;
    if (S.tab === 'learn') body = tabLearn(i); else if (S.tab === 'practise') body = tabPractise(i); else body = tabCheck(i);
    stage.appendChild(shell([h('div', { class: 'panel' }, [
      h('span', { class: 'eyebrow', text: 'Module ' + (i + 1) + ' of ' + MODS.length + ' · about ' + m.minutes + ' minutes' }),
      h('h2', { text: m.title }),
      h('p', { class: 'goal' }, [h('strong', { text: 'By the end you will: ' }), m.goal]),
      tabsBar(i)
    ].concat(body))]));
  }

  function tabLearn(i) {
    var m = MODS[i], s = st(i);
    var last = h('div', { class: 'actions' }, [
      i > 0 ? btn('Previous module', 'ghost', function () { go('module', i - 1, 'learn'); }) : btn('Back to start', 'ghost', function () { go('welcome'); }),
      btn(s.read ? 'Continue to the activity' : 'I have read this. Go to the activity', 'primary', function () { s.read = true; save(); go('module', i, 'practise'); })
    ]);
    return [
      coach('Read the lesson at your own pace. When you finish, go to the activity where you apply it to your own life.'),
      h('div', { class: 'lesson-body' }, [h('p', { class: 'lead-in', text: m.intro })].concat(m.blocks.map(block))),
      h('div', { class: 'callout tip takeaways' }, [h('strong', { text: 'Key takeaways' }), ulist(m.takeaways, 'bullets')]),
      last
    ];
  }

  /* ---- practise (activity) */
  function getVal(modId, key) { var d = S.data[modId]; return d ? d[key] : undefined; }
  function setVal(modId, key, v) { (S.data[modId] = S.data[modId] || {})[key] = v; save(); }
  function fieldFilled(f, v) { return f.kind === 'chips' ? Array.isArray(v) && v.length >= 1 : typeof v === 'string' && v.trim().length > 0; }

  function tabPractise(i) {
    var m = MODS[i], a = m.activity, s = st(i), id = m.id;
    var errBox = h('p', { class: 'form-error', role: 'alert', hidden: true });
    var nodes = [];
    a.fields.forEach(function (f, fi) {
      var fid = 'f-' + id + '-' + f.key, wrap = h('div', { class: 'field', 'data-key': f.key });
      if (f.kind === 'chips') {
        var cur = Array.isArray(getVal(id, f.key)) ? getVal(id, f.key).slice() : [];
        var counter = h('span', { class: 'counter', text: cur.length + ' of ' + f.max + ' chosen' });
        var list = h('div', { class: 'chip-list', role: 'group', 'aria-labelledby': fid + '-l' });
        f.options.forEach(function (o) {
          var b = h('button', { type: 'button', class: 'chip' + (cur.indexOf(o) >= 0 ? ' on' : ''), 'aria-pressed': cur.indexOf(o) >= 0 ? 'true' : 'false', text: o, onclick: function () {
            var k = cur.indexOf(o);
            if (k >= 0) cur.splice(k, 1);
            else { if (cur.length >= f.max) { counter.textContent = 'You can choose up to ' + f.max + '. Remove one first.'; return; } cur.push(o); }
            b.classList.toggle('on', cur.indexOf(o) >= 0); b.setAttribute('aria-pressed', cur.indexOf(o) >= 0 ? 'true' : 'false');
            counter.textContent = cur.length + ' of ' + f.max + ' chosen'; setVal(id, f.key, cur.slice());
          } });
          list.appendChild(b);
        });
        wrap.appendChild(h('div', { class: 'f-head' }, [h('span', { class: 'f-label', id: fid + '-l', text: f.label }), counter])); wrap.appendChild(list);
      } else if (f.kind === 'select') {
        var sl = h('select', { id: fid, onchange: function (e) { setVal(id, f.key, e.target.value); } }, [h('option', { value: '', text: 'Choose one…' })].concat(f.options.map(function (o) { return h('option', { value: o, text: o }); })));
        sl.value = getVal(id, f.key) || '';
        wrap.appendChild(h('label', { class: 'f-label', for: fid, text: f.label })); wrap.appendChild(sl);
      } else {
        var inp = f.kind === 'area' ? h('textarea', { id: fid, rows: '4', placeholder: f.ph || '' }) : h('input', { id: fid, type: 'text', placeholder: f.ph || '' });
        inp.value = getVal(id, f.key) || '';
        inp.addEventListener('input', function () { setVal(id, f.key, inp.value); });
        wrap.appendChild(h('label', { class: 'f-label', for: fid, text: f.label })); wrap.appendChild(inp);
      }
      nodes.push(wrap);
    });
    var form = h('div', { class: 'activity' }, nodes);
    var cont = btn(s.activity ? 'Save and go to the check' : 'Save and continue', 'primary', function () {
      var missing = a.fields.filter(function (f) { return !fieldFilled(f, getVal(id, f.key)); });
      Array.prototype.forEach.call(form.querySelectorAll('.field'), function (w) { w.classList.remove('invalid'); });
      if (missing.length) {
        missing.forEach(function (f) { var w = form.querySelector('[data-key="' + f.key + '"]'); if (w) w.classList.add('invalid'); });
        errBox.hidden = false; errBox.textContent = 'Please complete ' + (missing.length === 1 ? 'the highlighted question' : 'all ' + missing.length + ' highlighted questions') + ' before you continue.';
        var w0 = form.querySelector('.invalid'); if (w0 && w0.scrollIntoView) w0.scrollIntoView({ block: 'center' });
        return;
      }
      s.activity = true; save(); go('module', i, 'check');
    });
    return [
      coach('Do the activity now, while the lesson is fresh. Your answers are saved as you type and become part of your ' + C.planName + '.'),
      h('div', { class: 'activity-box' }, [h('h3', { text: 'Activity: ' + a.title }), h('p', { class: 'muted', text: a.prompt }), form, errBox]),
      h('div', { class: 'actions' }, [btn('Back to the lesson', 'ghost', function () { go('module', i, 'learn'); }), cont])
    ];
  }

  /* ---- check (quiz) */
  function buildQuiz(i) {
    return MODS[i].quiz.map(function (q) {
      var opts = shuffle(q.o.map(function (t, k) { return { t: t, ok: k === q.a }; }));
      var a = 0; opts.forEach(function (o, k) { if (o.ok) a = k; });
      return { q: q.q, o: opts.map(function (o) { return o.t; }), a: a, e: q.e };
    });
  }
  function tabCheck(i) {
    var m = MODS[i], s = st(i);
    var Q = S.quiz = S.quiz || { qs: buildQuiz(i), ans: [], done: false };
    var out = h('div', { class: 'quiz-out', 'aria-live': 'polite' });
    var submit = btn('Check my answers', 'primary', null, { disabled: true });
    function refresh() { submit.disabled = Q.ans.filter(function (x) { return x != null; }).length < Q.qs.length; }
    var list = h('div', { class: 'quiz' }, Q.qs.map(function (q, qi) {
      var group = 'q' + qi;
      return h('fieldset', { class: 'quiz-q' }, [h('legend', { text: (qi + 1) + '. ' + q.q })].concat(q.o.map(function (t, k) {
        var id = 'qq-' + qi + '-' + k;
        var inp = h('input', { type: 'radio', name: group, id: id, onchange: function () { Q.ans[qi] = k; refresh(); } });
        return h('label', { class: 'option', for: id }, [inp, h('span', { text: t })]);
      })));
    }));
    submit.addEventListener('click', function () {
      var right = 0;
      Q.qs.forEach(function (q, qi) { if (Q.ans[qi] === q.a) right++; });
      Q.done = true; submit.disabled = true;
      Array.prototype.forEach.call(list.querySelectorAll('input'), function (x) { x.disabled = true; });
      Array.prototype.forEach.call(list.querySelectorAll('.quiz-q'), function (fs, qi) {
        var q = Q.qs[qi], ok = Q.ans[qi] === q.a;
        fs.classList.add(ok ? 'right' : 'wrong');
        fs.appendChild(h('p', { class: ok ? 'good' : 'bad' }, [h('strong', { text: ok ? 'Correct. ' : 'Not quite. The best answer: “' + q.o[q.a] + '”. ' }), q.e]));
      });
      var pass = right >= PASS;
      out.textContent = '';
      if (pass) {
        s.passed = true; save(); paintProgress();
        var last = i === MODS.length - 1;
        out.appendChild(h('div', { class: 'result pass' }, [h('strong', { text: 'Well done! ' + right + ' out of ' + Q.qs.length + '. Module complete.' }), h('p', { text: last ? 'You have finished the whole ' + C.course + '. Your personal ' + C.planName + ' is ready.' : 'Next up: ' + MODS[i + 1].title + '.' })]));
        out.appendChild(h('div', { class: 'actions' }, [last ? btn('Open my ' + C.planName, 'primary', function () { go('plan'); }) : btn('Start Module ' + (i + 2), 'primary', function () { go('module', i + 1, 'learn'); }), btn('Back to start', 'ghost', function () { go('welcome'); })]));
      } else {
        out.appendChild(h('div', { class: 'result fail' }, [h('strong', { text: right + ' out of ' + Q.qs.length + '. You need ' + PASS + ' to complete this module.' }), h('p', { text: 'Read the explanations above, review the lesson if you need to, and try again with fresh answer order.' })]));
        out.appendChild(h('div', { class: 'actions' }, [btn('Review the lesson', 'ghost', function () { go('module', i, 'learn'); }), btn('Try again', 'primary', function () { go('module', i, 'check'); })]));
      }
      try { out.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ }
    });
    return [
      coach(s.passed ? 'You have already completed this module. You may retake the check any time.' : 'Answer all three questions. You need ' + PASS + ' correct to complete the module.'),
      h('h3', { text: 'Check your understanding' }), list,
      h('div', { class: 'actions' }, [btn('Back to the activity', 'ghost', function () { go('module', i, 'practise'); }), submit]), out
    ];
  }

  /* ---------------------------------------------------------------- Career Plan */
  var NEXT = C.next;
  function viewPlan() {
    if (!allDone()) { go('welcome'); return; }
    var sections = MODS.map(function (m) {
      var rows = m.activity.fields.map(function (f) {
        var v = getVal(m.id, f.key); if (!fieldFilled(f, v)) return null;
        return h('div', { class: 'plan-row' }, [h('dt', { text: f.label }), h('dd', null, Array.isArray(v) ? [h('ul', { class: 'chips' }, v.map(function (x) { return h('li', { text: x }); }))] : [h('span', { class: 'pre', text: v })])]);
      }).filter(Boolean);
      return h('section', { class: 'plan-sec' }, [h('h3', null, [h('span', { class: 'mn', text: String(MODS.indexOf(m) + 1) }), m.title]), h('dl', null, rows)]);
    });
    var target = getVal(C.targetMod, C.targetKey);
    stage.appendChild(shell([h('div', { class: 'panel plan' }, [
      h('span', { class: 'eyebrow', text: 'Your ' + C.planName }),
      h('h2', { text: 'My ' + C.planName }),
      h('div', { class: 'badge-hero' }, [h('div', { class: 'seal', 'aria-hidden': 'true', text: '🎓' }), h('div', null, [h('strong', { text: C.doneTitle }), h('p', { text: 'All ' + MODS.length + ' modules finished' + (target ? '. ' + C.targetLabel + ': ' + target + '.' : '.') }), h('p', { class: 'small muted print-only', text: 'Prepared with AJ Job Seekers · ' + new Date().toLocaleDateString() })])]),
      h('p', { class: 'muted no-print', text: 'This plan is made from your own answers. Print it, save it as a PDF and review it every month. You can edit any answer by returning to that module.' })
    ].concat(sections).concat([
      h('div', { class: 'next-steps no-print' }, [h('h3', { text: 'What to do next' }), h('div', { class: 'ns-grid' }, NEXT.map(function (n) { return h('a', { class: 'ns-card', href: n.href }, [h('strong', { text: n.t }), h('span', { text: n.d }), h('span', { class: 'learn-more', text: 'Open →' })]); }))]),
      h('div', { class: 'actions no-print' }, [
        btn('Print or save as PDF', 'primary', function () { window.print(); }),
        btn('Review a module', 'ghost', function () { go('welcome'); }),
        btn('Start over', 'ghost danger', function () { if (window.confirm('This clears all your answers and progress on this device. Continue?')) { S.data = {}; S.steps = {}; try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } go('welcome'); } })
      ])
    ]))]));
  }

  /* ---------------------------------------------------------------- init */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  load();
  go('welcome', null, null, true);
  window.__CG = { state: S, go: go, cfg: C };
})();
