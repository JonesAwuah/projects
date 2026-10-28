/* AJ Job Seekers – Interview coaching: field → lesson → theory test → live voice interview → results.
   Voice questions use SpeechSynthesis; spoken answers use SpeechRecognition (typed fallback when unavailable).
   Nothing is uploaded. Progress is kept in sessionStorage only. */
(function () {
  'use strict';

  var DATA = window.IV_DATA, LESSON = window.IV_LESSON, SC = window.IV_SCORE;
  var stage = document.getElementById('stage');
  if (!stage || !DATA || !LESSON || !SC) return;

  var CFG = (function () {
    var d = { durationMin: 30, answerSec: 60, probeSec: 30, closeBufferSec: 100, probeMax: 3, speech: true, sayMs: 0, theoryGeneral: 20, theoryField: 3, passMark: 60 };
    var o = window.IV_CONFIG || {};
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) d[k] = o[k];
    return d;
  })();

  var STORE = 'ajjs_interview';
  var ST = { field: null, stage: 'field', mod: 0, done: {}, theory: null, theoryPass: false, theoryPct: null, interview: null, results: null };

  /* ------------------------------------------------------------ helpers */
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
  function pill(text, fn, extra) { var a = { type: 'button', class: 'learn-more', onclick: fn }; if (extra) for (var k in extra) a[k] = extra[k]; var b = h('button', a, [text, h('span', { 'aria-hidden': 'true', text: ' →' })]); return b; }
  function ulist(items, cls) { return h('ul', cls ? { class: cls } : null, items.map(function (i) { return h('li', { text: i }); })); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function now() { return Date.now(); }
  function mmss(s) { s = Math.max(0, Math.round(s)); var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
  function fieldById(id) { for (var i = 0; i < DATA.fields.length; i++) if (DATA.fields[i].id === id) return DATA.fields[i]; return null; }
  function F() { return fieldById(ST.field); }
  function save() { try { sessionStorage.setItem(STORE, JSON.stringify({ field: ST.field, done: ST.done, theoryPass: ST.theoryPass, theoryPct: ST.theoryPct })); } catch (e) { /* ignore */ } }
  function load() {
    try {
      var s = JSON.parse(sessionStorage.getItem(STORE) || 'null');
      if (s && fieldById(s.field)) { ST.field = s.field; ST.done = s.done || {}; ST.theoryPass = !!s.theoryPass; ST.theoryPct = s.theoryPct == null ? null : s.theoryPct; ST.stage = 'lesson'; }
    } catch (e) { /* ignore */ }
  }
  function scrollTop() { var s = document.getElementById('trainer'); if (s && s.scrollIntoView) { try { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { s.scrollIntoView(); } } }

  /* ------------------------------------------------------------ stepper + routing */
  var STEP_OF = { field: 0, lesson: 1, theory: 2, ready: 3, live: 3, results: 4 };
  function paintStepper() {
    var cur = STEP_OF[ST.stage] || 0;
    Array.prototype.forEach.call(document.querySelectorAll('#stepper li'), function (li, i) {
      li.className = i < cur ? 'done' : i === cur ? 'current' : '';
      if (i === cur) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
  }
  function go(name, noScroll) {
    stopLive(true);
    ST.stage = name;
    stage.textContent = '';
    paintStepper();
    ({ field: viewField, lesson: viewLesson, theory: viewTheory, ready: viewReady, live: viewReady, results: viewResults })[name]();
    var hd = stage.querySelector('h2'); if (hd) { hd.setAttribute('tabindex', '-1'); try { hd.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    if (!noScroll) scrollTop();
  }

  /* ============================================================ 1. FIELD */
  function viewField() {
    var chosen = ST.field;
    var grid = h('div', { class: 'field-grid', role: 'radiogroup', 'aria-label': 'Your field' });
    var next = btn('Continue to the lesson', 'primary', function () { if (!chosen) return; if (chosen !== ST.field) { ST.field = chosen; ST.done = {}; ST.theoryPass = false; ST.theoryPct = null; ST.theory = null; ST.results = null; ST.mod = 0; } save(); go('lesson'); }, { disabled: chosen ? null : true });
    DATA.fields.forEach(function (f) {
      var id = 'field-' + f.id;
      var inp = h('input', { type: 'radio', name: 'field', id: id, value: f.id, onchange: function () { chosen = f.id; next.disabled = false; } });
      if (chosen === f.id) inp.checked = true;
      grid.appendChild(h('label', { class: 'field-card', for: id }, [inp, h('span', { class: 'fc-body' }, [h('strong', { text: f.name }), h('small', { text: f.blurb })])]));
    });
    stage.appendChild(h('div', { class: 'panel' }, [
      h('span', { class: 'eyebrow', text: 'Step 1' }),
      h('h2', { text: 'Choose your field' }),
      h('p', { class: 'muted', text: 'Your theory test includes questions for your field, and your live interview is built from questions that employers in that field really ask. Pick the one closest to the job you want.' }),
      grid,
      h('div', { class: 'actions' }, [next])
    ]));
  }

  /* ============================================================ 2. LESSON */
  function renderBlock(b) {
    switch (b.t) {
      case 'h': return h('h3', { text: b.text });
      case 'p': return h('p', { text: b.text });
      case 'ul': return ulist(b.items, 'bullets');
      case 'ol': return h('ol', { class: 'numbers' }, b.items.map(function (i) { return h('li', { text: i }); }));
      case 'tip': return h('div', { class: 'callout tip' }, [h('strong', { text: b.title }), h('p', { text: b.text })]);
      case 'ex': return h('div', { class: 'callout ex' }, [h('strong', { text: b.title }), h('p', { text: b.text })]);
      case 'table':
        return h('div', { class: 'table-wrap' }, [h('table', null, [
          h('thead', null, [h('tr', null, b.head.map(function (x) { return h('th', { text: x }); }))]),
          h('tbody', null, b.rows.map(function (r) { return h('tr', null, r.map(function (c, i) { return h(i === 0 ? 'th' : 'td', { text: c, scope: i === 0 ? 'row' : null }); })); }))
        ])]);
      case 'qa':
        return h('div', { class: 'qa-card' }, [
          h('h4', { text: '“' + b.q + '”' }),
          b.tests ? h('p', null, [h('strong', { text: 'What they are testing: ' }), b.tests]) : null,
          b.how ? h('p', null, [h('strong', { text: 'How to answer: ' }), b.how]) : null,
          b.avoid ? h('p', null, [h('strong', { text: 'Avoid: ' }), b.avoid]) : null,
          b.example ? h('div', { class: 'callout ex' }, [h('strong', { text: 'Strong example' }), h('p', { text: b.example })]) : null
        ]);
      case 'fieldGuide': return renderFieldGuide();
    }
    return h('span');
  }
  function renderFieldGuide() {
    var f = F(); if (!f) return h('span');
    var g = f.guide;
    return h('div', { class: 'field-guide' }, [
      h('h3', { text: 'Field guide: ' + f.name }),
      h('p', { text: g.intro }),
      h('div', { class: 'two-col' }, [
        h('div', null, [h('h4', { text: 'What employers look for' }), ulist(g.looksFor, 'bullets')]),
        h('div', null, [h('h4', { text: 'Topics to expect' }), ulist(g.topics, 'bullets')])
      ]),
      h('h4', { text: 'Tips for your field' }), ulist(g.tips, 'bullets'),
      h('div', { class: 'callout ex' }, [h('strong', { text: 'Sample question and strong answer' }), h('p', null, [h('em', { text: g.sample.q })]), h('p', { text: g.sample.a })]),
      h('h4', { text: 'Words and phrases that show you know your field' }),
      h('ul', { class: 'chips' }, f.vocab.slice(0, 24).map(function (v) { return h('li', { text: v }); })),
      h('p', { class: 'muted small', text: 'Use the ones that are true for you. The live interview rewards accurate use of field language.' })
    ]);
  }
  function doneCount() { var n = 0; for (var i = 0; i < LESSON.length; i++) if (ST.done[i]) n++; return n; }
  function viewLesson() {
    var m = LESSON[ST.mod];
    var nav = h('ol', { class: 'module-nav' }, LESSON.map(function (mod, i) {
      return h('li', { class: (i === ST.mod ? 'current ' : '') + (ST.done[i] ? 'done' : '') }, [
        h('button', { type: 'button', onclick: function () { ST.mod = i; go('lesson'); } }, [h('span', { class: 'mn', text: ST.done[i] ? '✓' : String(i + 1) }), h('span', { text: mod.title })])
      ]);
    }));
    var total = LESSON.reduce(function (a, x) { return a + x.minutes; }, 0);
    var body = h('div', { class: 'lesson-body' }, [h('p', { class: 'lead-in', text: m.intro })].concat(m.blocks.map(renderBlock)));
    var take = h('div', { class: 'callout tip takeaways' }, [h('strong', { text: 'Key takeaways' }), ulist(m.takeaways, 'bullets')]);
    var last = ST.mod === LESSON.length - 1;
    var actions = h('div', { class: 'actions' });
    if (ST.mod > 0) actions.appendChild(btn('Previous', 'ghost', function () { ST.mod--; go('lesson'); }));
    actions.appendChild(btn(last ? 'Finish the lesson' : 'Mark complete and continue', 'primary', function () {
      ST.done[ST.mod] = true; save();
      if (!last) { ST.mod++; go('lesson'); }
      else if (doneCount() === LESSON.length) go('theory');
      else go('lesson');
    }));
    var all = doneCount() === LESSON.length;
    stage.appendChild(h('div', { class: 'panel lesson' }, [
      h('span', { class: 'eyebrow', text: 'Step 2 · ' + F().name }),
      h('h2', { text: 'Theory lesson' }),
      h('p', { class: 'muted', text: 'Eight modules, about ' + total + ' minutes in total. Complete every module to unlock the theory test. You may return to any module at any time.' }),
      h('div', { class: 'lesson-grid' }, [
        h('aside', { class: 'lesson-side' }, [
          h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(LESSON.length), 'aria-valuenow': String(doneCount()) }, [h('span', { style: 'width:' + Math.round(doneCount() / LESSON.length * 100) + '%' })]),
          h('p', { class: 'small muted', text: doneCount() + ' of ' + LESSON.length + ' modules complete' }),
          nav,
          all ? btn('Go to the theory test', 'primary full', function () { go('theory'); }) : null
        ]),
        h('article', { class: 'lesson-main' }, [
          h('p', { class: 'small muted', text: 'Module ' + (ST.mod + 1) + ' of ' + LESSON.length + ' · about ' + m.minutes + ' minutes' }),
          h('h3', { class: 'module-title', text: m.title }),
          body, take, actions
        ])
      ]),
      h('div', { class: 'actions' }, [pill('Change field', function () { go('field'); })])
    ]));
  }

  /* ============================================================ 3. THEORY TEST */
  function buildTheory() {
    var f = F();
    var gen = shuffle(DATA.theory).slice(0, Math.min(CFG.theoryGeneral, DATA.theory.length));
    var fld = shuffle(f.theory).slice(0, CFG.theoryField);
    return shuffle(gen.concat(fld)).map(function (q) {
      var opts = q.o.map(function (t, i) { return { t: t, ok: i === q.a }; });
      opts = shuffle(opts);
      var a = 0; opts.forEach(function (o, i) { if (o.ok) a = i; });
      return { q: q.q, o: opts.map(function (o) { return o.t; }), a: a, e: q.e };
    });
  }
  function viewTheory() {
    if (doneCount() < LESSON.length) { go('lesson'); return; }
    var T = ST.theory;
    if (!T || T.result) { T = ST.theory = { qs: buildTheory(), ans: [], i: 0, result: null }; }
    renderTheoryQuestion();
  }
  function renderTheoryQuestion() {
    var T = ST.theory, q = T.qs[T.i];
    stage.textContent = '';
    var sel = T.ans[T.i] == null ? null : T.ans[T.i];
    var next = btn(T.i === T.qs.length - 1 ? 'Submit test' : 'Next question', 'primary', function () {
      if (sel == null) return;
      T.ans[T.i] = sel;
      if (T.i < T.qs.length - 1) { T.i++; renderTheoryQuestion(); } else finishTheory();
    }, { disabled: sel == null ? true : null });
    var opts = h('div', { class: 'options', role: 'radiogroup', 'aria-labelledby': 'tq' });
    q.o.forEach(function (t, i) {
      var id = 'to-' + T.i + '-' + i;
      var inp = h('input', { type: 'radio', name: 'tq', id: id, onchange: function () { sel = i; next.disabled = false; } });
      if (sel === i) inp.checked = true;
      opts.appendChild(h('label', { class: 'option', for: id }, [inp, h('span', { text: t })]));
    });
    stage.appendChild(h('div', { class: 'panel' }, [
      h('span', { class: 'eyebrow', text: 'Step 3 · Theory test' }),
      h('h2', { text: 'Question ' + (T.i + 1) + ' of ' + T.qs.length }),
      h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(T.qs.length), 'aria-valuenow': String(T.i) }, [h('span', { style: 'width:' + Math.round(T.i / T.qs.length * 100) + '%' })]),
      h('p', { class: 'question', id: 'tq', text: q.q }),
      opts,
      h('div', { class: 'actions' }, [T.i > 0 ? btn('Previous', 'ghost', function () { if (sel != null) T.ans[T.i] = sel; T.i--; renderTheoryQuestion(); }) : null, next]),
      h('p', { class: 'small muted', text: 'Pass mark: ' + CFG.passMark + '%. You can retake the test with new questions.' })
    ]));
    var hd = stage.querySelector('h2'); if (hd) { hd.setAttribute('tabindex', '-1'); try { hd.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }
  function finishTheory() {
    var T = ST.theory;
    var r = SC.scoreTheory(T.qs, T.ans);
    T.result = r;
    ST.theoryPct = r.pct; ST.theoryPass = r.pct >= CFG.passMark; save();
    stage.textContent = '';
    var review = h('div', { class: 'review' });
    if (r.wrong.length) {
      review.appendChild(h('h3', { text: 'Review the questions you missed' }));
      r.wrong.forEach(function (i) {
        var q = T.qs[i];
        review.appendChild(h('div', { class: 'review-item' }, [
          h('p', { class: 'question', text: q.q }),
          h('p', { class: 'bad' }, [h('strong', { text: 'Your answer: ' }), T.ans[i] == null ? 'No answer' : q.o[T.ans[i]]]),
          h('p', { class: 'good' }, [h('strong', { text: 'Correct answer: ' }), q.o[q.a]]),
          h('p', { class: 'muted', text: q.e })
        ]));
      });
    } else review.appendChild(h('p', { class: 'good', text: 'Perfect score. You answered every question correctly.' }));
    stage.appendChild(h('div', { class: 'panel' }, [
      h('span', { class: 'eyebrow', text: 'Step 3 · Theory test' }),
      h('h2', { text: 'Your theory result' }),
      h('div', { class: 'score-hero ' + r.band.id }, [h('div', { class: 'score-num', text: r.pct + '%' }), h('div', null, [h('strong', { class: 'band-label', text: r.band.label }), h('p', { text: r.right + ' of ' + r.total + ' correct. ' + (r.band.pass ? 'You may now take the live interview.' : 'The pass mark is ' + CFG.passMark + '%. Review the lesson and try again.') })])]),
      h('div', { class: 'actions' }, [
        r.band.pass ? btn('Continue to the live interview', 'primary', function () { go('ready'); }) : btn('Review the lesson', 'primary', function () { ST.mod = 0; go('lesson'); }),
        btn(r.band.pass ? 'Retake the test' : 'Retake the test now', 'ghost', function () { ST.theory = null; go('theory'); })
      ]),
      review
    ]));
    paintStepper(); scrollTop();
  }

  /* ============================================================ 4. LIVE INTERVIEW */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var hasTTS = function () { return CFG.speech && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function'; };
  var hasSR = function () { return CFG.speech && !!SR; };
  var IV = null; // live interview state

  function viewReady() {
    var f = F();
    var mode = hasSR() ? 'voice' : 'typed';
    var forceTyped = false;
    var status = h('p', { class: 'notice ' + (hasSR() ? 'ok' : 'warn'), role: 'status', text: hasSR() ? 'Voice answers are supported in this browser. Run the quick sound check, then start.' : 'This browser cannot turn speech into text, so you will type your answers. The interviewer will still ask the questions aloud where possible. For voice answers use Chrome or Edge.' });
    var heard = h('p', { class: 'heard', 'aria-live': 'polite' });
    var testBtn = btn('Test voice and microphone', 'ghost', function () {
      if (!hasSR() || forceTyped) { status.className = 'notice warn'; status.textContent = 'Voice answers are off. Untick “type my answers” to test the microphone.'; return; }
      testBtn.disabled = true; heard.textContent = '';
      status.className = 'notice'; status.textContent = 'Listen to the interviewer, then say: “I am ready for my interview.”';
      speakOnce('Hello. This is a sound check. Please say: I am ready for my interview.').then(function () {
        status.textContent = 'Listening… please speak now.';
        return listenOnce(7000);
      }).then(function (r) {
        testBtn.disabled = false;
        if (r.error) { mode = 'typed'; status.className = 'notice warn'; status.textContent = 'We could not use your microphone (' + r.error + '). You can allow the microphone in your browser settings and test again, or continue by typing your answers.'; }
        else if (!r.text) { status.className = 'notice warn'; status.textContent = 'We did not hear anything. Check that your microphone is on and not muted, then test again.'; }
        else { status.className = 'notice ok'; status.textContent = 'Your microphone works.'; heard.textContent = 'We heard: “' + r.text + '”'; }
      });
    });
    var chk = h('input', { type: 'checkbox', id: 'typed', onchange: function (e) { forceTyped = e.target.checked; } });
    if (!hasSR()) { chk.checked = true; chk.disabled = true; forceTyped = true; }
    var start = btn('Start the interview', 'primary', function () { startInterview(forceTyped || mode === 'typed' ? 'typed' : 'voice'); });
    stage.appendChild(h('div', { class: 'panel' }, [
      h('span', { class: 'eyebrow', text: 'Step 4 · Live interview' }),
      h('h2', { text: 'Your live interview: ' + f.name }),
      h('p', { class: 'muted', text: 'A voice will ask you questions one at a time. After each question you hear a short beep, then you answer by speaking. The interview lasts ' + CFG.durationMin + ' minutes and ends with your score.' }),
      h('div', { class: 'rules' }, [
        h('ul', { class: 'bullets' }, [
          h('li', { text: 'You have a maximum of ' + CFG.answerSec + ' seconds for each answer. Press “Finish answer” sooner if you are done.' }),
          h('li', { text: 'Questions cannot be repeated, just like a real interview, but they appear on screen as well.' }),
          h('li', { text: 'Use the STAR method for “tell me about a time” questions: Situation, Task, Action, Result.' }),
          h('li', { text: 'You will not see feedback until the end. Your results then show every answer with advice.' })
        ])
      ]),
      status, heard,
      h('div', { class: 'row' }, [testBtn, h('label', { class: 'check', for: 'typed' }, [chk, ' I prefer to type my answers'])]),
      h('div', { class: 'actions' }, [btn('Back to the theory result', 'ghost', function () { go('theory'); }), start])
    ]));
  }

  function voice() {
    var vs = (window.speechSynthesis && speechSynthesis.getVoices && speechSynthesis.getVoices()) || [];
    var en = vs.filter(function (v) { return /^en/i.test(v.lang); });
    return en.filter(function (v) { return /en[-_]GB/i.test(v.lang); })[0] || en.filter(function (v) { return /en[-_]US/i.test(v.lang); })[0] || en[0] || null;
  }
  /* speak a line; resolves when finished (or after a fallback delay) */
  function speakOnce(text) {
    return new Promise(function (resolve) {
      if (IV && IV.stop) return resolve();
      var fallback = CFG.sayMs || Math.min(9000, 800 + text.length * 45);
      if (!hasTTS()) { setTimeout(resolve, fallback); return; }
      var settled = false, guard;
      function end() { if (settled) return; settled = true; clearTimeout(guard); resolve(); }
      try {
        speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        var v = voice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
        u.rate = 0.95; u.pitch = 1;
        u.onend = end; u.onerror = end;
        guard = setTimeout(end, 5000 + text.length * 90);
        if (IV) IV.cancelSpeech = end;
        speechSynthesis.speak(u);
      } catch (e) { setTimeout(end, fallback); }
    });
  }
  function listenOnce(ms) {
    return new Promise(function (resolve) {
      var done = false, text = '', r;
      function fin(err) { if (done) return; done = true; try { r.stop(); } catch (e) { /* ignore */ } resolve({ text: text.trim(), error: err || null }); }
      try {
        r = new SR(); r.lang = 'en-GB'; r.interimResults = true; r.continuous = false;
        r.onresult = function (e) { text = ''; for (var i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + ' '; };
        r.onerror = function (e) { if (e.error === 'no-speech' || e.error === 'aborted') fin(null); else fin(e.error || 'error'); };
        r.onend = function () { fin(null); };
        r.start(); setTimeout(function () { fin(null); }, ms);
      } catch (e) { fin('unavailable'); }
    });
  }
  function beep() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      IV.audio = IV.audio || new AC();
      var o = IV.audio.createOscillator(), g = IV.audio.createGain();
      o.frequency.value = 880; g.gain.value = 0.08; o.connect(g); g.connect(IV.audio.destination);
      o.start(); o.stop(IV.audio.currentTime + 0.18);
    } catch (e) { /* ignore */ }
  }

  function buildPlan(f) {
    var fq = shuffle(f.questions.map(function (q) { return { t: q.t, type: q.type, src: 'field' }; }));
    var gq = shuffle(DATA.general.questions.map(function (q) { return { t: q.t, type: q.type, src: 'general' }; }));
    var mix = [];
    while (fq.length || gq.length) {
      if (fq.length) mix.push(fq.shift());
      if (fq.length) mix.push(fq.shift());
      if (gq.length) mix.push(gq.shift());
    }
    return mix;
  }

  function startInterview(mode) {
    stage.textContent = '';
    ST.stage = 'live'; paintStepper();
    var f = F();
    IV = { mode: mode, field: f, plan: buildPlan(f), items: [], stop: false, startedAt: now(), endsAt: now() + CFG.durationMin * 60000, probes: 0, asked: 0, closed: false, abort: null, cancelSpeech: null, clock: null, audio: null };
    window.onbeforeunload = function (e) { e.preventDefault(); e.returnValue = ''; return ''; };

    var ui = IV.ui = {};
    ui.timer = h('span', { class: 'big-timer', text: mmss(CFG.durationMin * 60) });
    ui.qcount = h('span', { text: 'Question 1' });
    ui.caption = h('p', { class: 'caption', 'aria-live': 'polite', text: 'The interview is starting…' });
    ui.state = h('div', { class: 'state', 'aria-live': 'polite', text: 'Interviewer speaking' });
    ui.bar = h('div', { class: 'answer-bar', hidden: true }, [h('span', { style: 'width:100%' })]);
    ui.left = h('span', { class: 'answer-left', text: '' });
    ui.live = h('p', { class: 'transcript', 'aria-live': 'off', text: '' });
    ui.typed = h('textarea', { class: 'typed', rows: '6', placeholder: 'Type your answer here…', 'aria-label': 'Your answer', hidden: true });
    ui.finish = btn('Finish answer', 'primary', function () { if (IV.finishAnswer) IV.finishAnswer('done'); }, { disabled: true });
    ui.skip = btn('Skip question', 'ghost', function () { if (IV.finishAnswer) IV.finishAnswer('skip'); }, { disabled: true });
    ui.end = btn('End interview', 'ghost danger', function () { if (window.confirm('End the interview now? You will see your results for the questions answered so far.')) { IV.stop = true; if (IV.cancelSpeech) IV.cancelSpeech(); if (IV.finishAnswer) IV.finishAnswer('abort'); } });
    stage.appendChild(h('div', { class: 'panel live' }, [
      h('div', { class: 'live-head' }, [h('div', null, [h('span', { class: 'eyebrow', text: 'Live interview · ' + f.name }), h('div', { class: 'qcount' }, [ui.qcount])]), h('div', { class: 'timebox' }, [h('small', { text: 'Time remaining' }), ui.timer])]),
      h('div', { class: 'interviewer' }, [h('div', { class: 'avatar', 'aria-hidden': 'true' }, [h('span', { text: 'AJ' })]), h('div', { class: 'bubble' }, [h('strong', { text: 'Interviewer' }), ui.caption])]),
      h('div', { class: 'answer-zone' }, [ui.state, ui.bar, ui.left, ui.live, ui.typed]),
      h('div', { class: 'actions' }, [ui.end, ui.skip, ui.finish])
    ]));

    IV.clock = setInterval(function () {
      ui.timer.textContent = mmss((IV.endsAt - now()) / 1000);
      ui.timer.classList.toggle('low', IV.endsAt - now() < 120000);
    }, 500);
    runInterview().then(function () { if (IV && !IV.finished) finishInterview(); });
  }

  function stopLive(silent) {
    window.onbeforeunload = null;
    if (!IV) return;
    IV.stop = true; IV.finished = true;
    clearInterval(IV.clock);
    try { if (IV.cancelSpeech) IV.cancelSpeech(); if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    if (IV.finishAnswer) { try { IV.finishAnswer('abort'); } catch (e) { /* ignore */ } }
    if (IV.audio && IV.audio.close) { try { IV.audio.close(); } catch (e) { /* ignore */ } }
    IV = null;
  }

  function nextQuestion() {
    if (IV.asked === 0) return Object.assign({ src: 'opening' }, pick(DATA.general.opening));
    var remaining = (IV.endsAt - now()) / 1000;
    if (IV.closed) return null;
    if (remaining <= CFG.closeBufferSec || !IV.plan.length) { IV.closed = true; return Object.assign({ src: 'closing' }, pick(DATA.general.closing)); }
    return IV.plan.shift();
  }

  function setState(txt, cls) { IV.ui.state.textContent = txt; IV.ui.state.className = 'state ' + (cls || ''); }

  function capture(secs) {
    return new Promise(function (resolve) {
      var ui = IV.ui, start = now(), done = false, finalText = '', interim = '', rec = null, timer, active = true, netErrors = 0;
      var typedMode = IV.mode === 'typed';
      ui.finish.disabled = false; ui.skip.disabled = false;
      ui.bar.hidden = false; ui.bar.firstChild.style.width = '100%';
      ui.live.textContent = ''; ui.typed.value = '';
      function text() { return typedMode ? ui.typed.value : (finalText + ' ' + interim).replace(/\s+/g, ' ').trim(); }
      function finish(why) {
        if (done) return; done = true; active = false;
        clearInterval(timer);
        try { if (rec) { rec.onend = null; rec.stop(); } } catch (e) { /* ignore */ }
        IV.finishAnswer = null;
        ui.finish.disabled = true; ui.skip.disabled = true; ui.bar.hidden = true; ui.left.textContent = ''; ui.typed.hidden = true; ui.live.textContent = '';
        resolve({ text: why === 'skip' ? '' : text(), seconds: Math.min(secs, (now() - start) / 1000), why: why });
      }
      IV.finishAnswer = finish;
      function showTyped(keep) {
        typedMode = true; ui.typed.hidden = false; ui.typed.value = keep || '';
        try { rec && (rec.onend = null, rec.stop()); } catch (e) { /* ignore */ }
        try { ui.typed.focus(); } catch (e) { /* ignore */ }
        setState('Type your answer', 'listening');
      }
      if (typedMode) showTyped('');
      else {
        setState('Listening… speak now', 'listening');
        try {
          rec = new SR(); rec.lang = 'en-GB'; rec.continuous = true; rec.interimResults = true;
          rec.onresult = function (e) {
            interim = '';
            for (var i = e.resultIndex; i < e.results.length; i++) { var r = e.results[i]; if (r.isFinal) finalText += r[0].transcript + ' '; else interim += r[0].transcript; }
            ui.live.textContent = text();
          };
          rec.onerror = function (e) {
            var er = e.error;
            if (er === 'not-allowed' || er === 'service-not-allowed' || er === 'audio-capture' || (er === 'network' && ++netErrors > 2) || er === 'language-not-supported') {
              IV.mode = 'typed'; IV.fallbackReason = er; showTyped(text());
              ui.left.textContent = 'Speech recognition stopped working (' + er + '). Please type your answer.';
            }
          };
          rec.onend = function () { if (active && !typedMode) { try { rec.start(); } catch (e) { /* ignore */ } } };
          rec.start();
        } catch (e) { IV.mode = 'typed'; showTyped(''); }
      }
      timer = setInterval(function () {
        var left = secs - (now() - start) / 1000;
        ui.bar.firstChild.style.width = Math.max(0, left / secs * 100) + '%';
        ui.bar.classList.toggle('low', left < 10);
        if (!ui.left.textContent || /^\d/.test(ui.left.textContent)) ui.left.textContent = Math.max(0, Math.ceil(left)) + 's left';
        if (left <= 0) finish('time');
      }, 200);
    });
  }

  async function runInterview() {
    var ui = IV.ui, f = IV.field;
    var vocab = f.vocab;
    while (IV && !IV.stop) {
      var q = nextQuestion();
      if (!q) break;
      IV.asked++;
      ui.qcount.textContent = q.src === 'closing' ? 'Final question' : 'Question ' + IV.asked;
      var line = q.spoken || ((IV.asked > 1 ? pick(DATA.general.acks) + ' ' : '') + q.t);
      setState('Interviewer speaking', 'speaking');
      ui.finish.disabled = true; ui.skip.disabled = true;
      ui.caption.textContent = q.t;
      await speakOnce(line);
      if (!IV || IV.stop) break;
      beep();
      var type = q.src === 'opening' ? 'open' : q.src === 'closing' ? 'close' : q.type;
      var ans = await capture(CFG.answerSec);
      if (!IV) return;
      var text = ans.text;
      /* a follow-up probe when the answer is too thin */
      var wc = (text.match(/\S+/g) || []).length;
      var remaining = (IV.endsAt - now()) / 1000;
      if (!IV.stop && ans.why !== 'skip' && (type === 'beh' || type === 'tech') && wc >= 3 && wc < 25 && IV.probes < CFG.probeMax && remaining > CFG.closeBufferSec + 40) {
        IV.probes++;
        var probe = pick(DATA.general.probes);
        ui.caption.textContent = probe; setState('Interviewer speaking', 'speaking');
        await speakOnce(probe);
        if (!IV || IV.stop) { IV && IV.items.push({ q: { t: q.t, type: type }, text: text, seconds: ans.seconds }); break; }
        beep();
        var more = await capture(CFG.probeSec);
        if (!IV) return;
        text = (text + ' ' + more.text).trim(); ans.seconds += more.seconds;
      }
      IV.items.push({ q: { t: q.t, type: type }, text: text, seconds: ans.seconds, why: ans.why });
      if (ans.why === 'abort') break;
      if (q.src === 'closing') break;
      setState('Thinking…', '');
    }
    if (IV && !IV.stop && IV.items.length) { ui.caption.textContent = DATA.general.ending; setState('Interview finished', ''); await speakOnce(DATA.general.ending); }
  }

  function finishInterview() {
    var items = IV.items.slice(), mode = IV.mode, f = IV.field, elapsed = Math.min((now() - IV.startedAt) / 1000, CFG.durationMin * 60 + 120), fb = IV.fallbackReason;
    stopLive(true);
    var iv = SC.scoreInterview(items, { vocab: f.vocab });
    var theory = ST.theoryPct == null ? null : { pct: ST.theoryPct };
    ST.results = { interview: iv, theory: theory, overall: SC.overall(theory, iv), mode: mode, field: f.name, elapsed: elapsed, when: new Date(), fallback: fb };
    go('results');
  }

  /* ============================================================ 5. RESULTS */
  function critBar(label, val) {
    return h('div', { class: 'crit' }, [h('div', { class: 'crit-top' }, [h('span', { text: label }), h('strong', { text: val + '%' })]), h('div', { class: 'progress' }, [h('span', { style: 'width:' + val + '%' })])]);
  }
  function viewResults() {
    var R = ST.results;
    if (!R) { go(ST.theoryPass ? 'ready' : 'field'); return; }
    var iv = R.interview, ov = R.overall, sum = SC.summary(iv);
    var verdictText = {
      excellent: 'Outstanding. You answered like a well-prepared, confident candidate. Keep this standard and you will stand out.',
      good: 'Very good. Your answers were clear and relevant. Add more numbers and results to move into the excellent band.',
      pass: 'You passed. Your foundation is sound. Work on the focus areas below and practise again to build confidence.',
      fail: 'Not yet. This is a practice session, and every attempt makes you stronger. Review the lesson, work on the focus areas below and try again.'
    }[ov.band.id];
    var why = '';
    if (!ov.band.pass && ov.gates.length) why = 'You need at least ' + SC.BANDS.pass + '% in both the theory test and the interview. ';
    if (iv.completion < 50) why += 'You answered fewer than half of the questions. ';

    var items = h('div', { class: 'answers' });
    iv.items.forEach(function (it, i) {
      var r = it.result;
      items.appendChild(h('details', { class: 'answer-item' }, [
        h('summary', null, [h('span', { class: 'ai-q', text: (i + 1) + '. ' + it.q.t }), h('span', { class: 'ai-score ' + SC.band(r.score).id, text: r.flags.noAnswer ? 'No answer' : r.score + '%' })]),
        h('div', { class: 'ai-body' }, [
          h('p', { class: 'ai-text' }, [h('strong', { text: 'Your answer: ' }), r.flags.noAnswer ? 'No answer was given.' : it.text]),
          h('p', { class: 'small muted', text: r.words + ' words' + (it.seconds ? ' · ' + Math.round(it.seconds) + ' seconds' : '') + (r.flags.wpm ? ' · ' + r.flags.wpm + ' words per minute' : '') }),
          r.strengths.length ? h('div', { class: 'good' }, [h('strong', { text: 'What worked' }), ulist(r.strengths, 'bullets')]) : null,
          r.notes.length ? h('div', { class: 'bad' }, [h('strong', { text: 'To improve' }), ulist(r.notes, 'bullets')]) : null
        ])
      ]));
    });

    var focusList = sum.focus.length ? h('ul', { class: 'bullets' }, sum.focus.map(function (x) { return h('li', null, [h('strong', { text: x.label + ' (' + x.score + '%). ' }), x.tip]); })) : h('p', { text: 'No weak areas. Keep practising to stay sharp.' });

    stage.appendChild(h('div', { class: 'panel results' }, [
      h('span', { class: 'eyebrow', text: 'Step 5 · Results' }),
      h('h2', { text: 'Your interview results' }),
      h('p', { class: 'small muted print-only', text: 'AJ Job Seekers · ' + R.field + ' · ' + R.when.toLocaleDateString() }),
      h('div', { class: 'score-hero ' + ov.band.id }, [
        h('div', { class: 'score-num', text: ov.score + '%' }),
        h('div', null, [h('strong', { class: 'band-label', text: ov.band.label }), h('p', { text: why + verdictText })])
      ]),
      h('div', { class: 'score-split' }, [
        h('div', { class: 'mini' }, [h('small', { text: 'Theory test (30%)' }), h('strong', { text: R.theory ? R.theory.pct + '%' : 'Not taken' })]),
        h('div', { class: 'mini' }, [h('small', { text: 'Live interview (70%)' }), h('strong', { text: iv.score + '%' })]),
        h('div', { class: 'mini' }, [h('small', { text: 'Questions answered' }), h('strong', { text: iv.answered + ' of ' + iv.asked })]),
        h('div', { class: 'mini' }, [h('small', { text: 'Time used' }), h('strong', { text: mmss(R.elapsed) })])
      ]),
      R.mode === 'typed' ? h('p', { class: 'notice warn', text: R.fallback ? 'Voice recognition stopped working, so some answers were typed. Delivery scores for typed answers cannot reflect your speaking pace.' : 'Answers were typed, so delivery and pace were not measured by voice.' }) : null,
      h('div', { class: 'two-col' }, [
        h('div', null, [h('h3', { text: 'Score by skill' })].concat(Object.keys(iv.criteria).map(function (k) { return critBar(SC.CRIT_LABEL[k], iv.criteria[k]); }))),
        h('div', null, [
          h('h3', { text: 'Your strengths' }), sum.strengths.length ? ulist(sum.strengths, 'bullets') : h('p', { class: 'muted', text: 'Keep practising. Strengths will show as your answers improve.' }),
          h('h3', { text: 'Focus for next time' }), focusList
        ])
      ]),
      h('h3', { text: 'Question by question' }), h('p', { class: 'small muted no-print', text: 'Select a question to see your answer and feedback.' }), items,
      h('div', { class: 'scale' }, [h('strong', { text: 'How scoring works: ' }), 'Excellent 85% and above · Pass – Good 70–84% · Pass 60–69% · Fail below 60%. To pass overall you need at least 60% in both the theory test and the interview, and you must answer at least half of the questions. Scores are automatic estimates based on structure, examples, relevance, length and delivery. They cannot judge the truth of what you say or your tone of voice.']),
      h('div', { class: 'actions no-print' }, [
        btn('Print or save as PDF', 'ghost', function () { window.print(); }),
        btn('Review the lesson', 'ghost', function () { ST.mod = 0; go('lesson'); }),
        btn('Take another interview', 'primary', function () { ST.results = null; go('ready'); })
      ]),
      h('div', { class: 'actions no-print' }, [pill('Change field', function () { go('field'); }), h('a', { class: 'learn-more', href: 'jobs.html' }, ['Find job opportunities ', h('span', { 'aria-hidden': 'true', text: '→' })])])
    ]));
  }

  /* ============================================================ init */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  load();
  if (ST.field && (ST.done && doneCount() === LESSON.length)) ST.stage = ST.theoryPass ? 'ready' : 'theory';
  go(ST.stage === 'field' ? 'field' : ST.stage, true);
  if (window.speechSynthesis && speechSynthesis.getVoices) { try { speechSynthesis.getVoices(); } catch (e) { /* ignore */ } }
  window.__IV = { state: ST, go: go, cfg: CFG };
})();
