/* AJ Job Seekers – Resume builder: live preview, print/PDF, checklist.
   Everything stays in the browser. Drafts are kept in sessionStorage (cleared when the tab closes). */
(function () {
  'use strict';

  var STORE_KEY = 'ajjs_resume_draft';
  var FIELDS = ['name', 'title', 'phone', 'email', 'location', 'summary', 'skills', 'referees'];

  var SAMPLE = {
    style: 'classic',
    name: 'Ama Mensah',
    title: 'Administrative Assistant',
    phone: '+233 24 000 0000',
    email: 'ama.mensah@example.com',
    location: 'Accra, Ghana',
    summary: 'Organised and dependable administrative assistant with three years of experience supporting busy teams. ' +
      'Skilled in record keeping, scheduling and customer service, and eager to take on more responsibility.',
    skills: 'Microsoft Office, Record keeping, Customer service, Scheduling, Written communication, Teamwork',
    referees: 'Available on request',
    experience: [
      {
        role: 'Administrative Assistant',
        company: 'Sample Trading Ltd, Accra',
        dates: '2023 – Present',
        details: 'Manage schedules and correspondence for a team of 12\n' +
          'Reduced filing time by 30% by introducing a digital records system\n' +
          'Handle about 40 customer enquiries a day with a 95% satisfaction rating'
      },
      {
        role: 'Office Intern',
        company: 'Example Services, Tema',
        dates: '2022 – 2023',
        details: 'Supported the accounts team with data entry and invoice filing\nOrganised meeting rooms and prepared documents for weekly meetings'
      }
    ],
    education: [
      { qualification: 'Diploma in Business Administration', school: 'Sample Technical University', dates: '2019 – 2022' }
    ]
  };

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function blank() {
    var s = { style: 'classic', experience: [], education: [] };
    FIELDS.forEach(function (f) { s[f] = ''; });
    return s;
  }
  function lines(t) {
    return String(t || '').split(/\n+/).map(function (x) { return x.replace(/^[\s•\-–*]+/, '').trim(); }).filter(Boolean);
  }
  function clean(t) { return String(t || '').trim(); }

  /* ---------- state ---------- */
  var state;
  try {
    var saved = sessionStorage.getItem(STORE_KEY);
    state = saved ? JSON.parse(saved) : null;
    if (!state || !Array.isArray(state.experience) || !Array.isArray(state.education)) state = null;
  } catch (e) { state = null; }
  if (!state) state = clone(SAMPLE);

  function persist() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }

  /* ---------- preview ---------- */
  var sheet = $('resumePreview');

  function section(title) {
    var s = el('section', 'r-section');
    s.appendChild(el('h3', '', title));
    return s;
  }

  function renderPreview() {
    sheet.className = 'sheet ' + (state.style === 'modern' ? 'modern' : 'classic');
    sheet.textContent = '';

    sheet.appendChild(el('h2', '', clean(state.name) || 'Your Name'));
    if (clean(state.title)) sheet.appendChild(el('p', 'r-title', clean(state.title)));
    var contact = [state.phone, state.email, state.location].map(clean).filter(Boolean).join('  ·  ');
    if (contact) sheet.appendChild(el('p', 'r-contact', contact));

    if (clean(state.summary)) {
      var sum = section('Professional Summary');
      sum.appendChild(el('p', '', clean(state.summary)));
      sheet.appendChild(sum);
    }

    var exps = state.experience.filter(function (x) { return clean(x.role) || clean(x.company); });
    if (exps.length) {
      var ex = section('Work Experience');
      exps.forEach(function (x) {
        var item = el('div', 'r-item');
        var row = el('div', 'r-row');
        row.appendChild(el('strong', '', clean(x.role)));
        if (clean(x.dates)) row.appendChild(el('span', 'r-dates', clean(x.dates)));
        item.appendChild(row);
        if (clean(x.company)) item.appendChild(el('div', 'r-sub', clean(x.company)));
        var bullets = lines(x.details);
        if (bullets.length) {
          var ul = el('ul');
          bullets.forEach(function (b) { ul.appendChild(el('li', '', b)); });
          item.appendChild(ul);
        }
        ex.appendChild(item);
      });
      sheet.appendChild(ex);
    }

    var edus = state.education.filter(function (x) { return clean(x.qualification) || clean(x.school); });
    if (edus.length) {
      var ed = section('Education and Training');
      edus.forEach(function (x) {
        var item = el('div', 'r-item');
        var row = el('div', 'r-row');
        row.appendChild(el('strong', '', clean(x.qualification)));
        if (clean(x.dates)) row.appendChild(el('span', 'r-dates', clean(x.dates)));
        item.appendChild(row);
        if (clean(x.school)) item.appendChild(el('div', 'r-sub', clean(x.school)));
        ed.appendChild(item);
      });
      sheet.appendChild(ed);
    }

    var skills = clean(state.skills).split(/[,\n]+/).map(clean).filter(Boolean);
    if (skills.length) {
      var sk = section('Skills');
      var ul2 = el('ul', 'r-skills');
      skills.forEach(function (s) { ul2.appendChild(el('li', '', s)); });
      sk.appendChild(ul2);
      sheet.appendChild(sk);
    }

    if (clean(state.referees)) {
      var rf = section('Referees');
      rf.appendChild(el('p', '', clean(state.referees)));
      sheet.appendChild(rf);
    }
  }

  function changed() { persist(); renderPreview(); }

  /* ---------- form: simple fields ---------- */
  function fillSimpleFields() {
    FIELDS.forEach(function (f) { $('f-' + f).value = state[f] || ''; });
    Array.prototype.forEach.call(document.querySelectorAll('input[name="style"]'), function (r) {
      r.checked = r.value === (state.style === 'modern' ? 'modern' : 'classic');
    });
  }

  FIELDS.forEach(function (f) {
    $('f-' + f).addEventListener('input', function (e) {
      state[f] = e.target.value;
      changed();
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="style"]'), function (r) {
    r.addEventListener('change', function () {
      if (r.checked) { state.style = r.value; changed(); }
    });
  });

  /* ---------- form: repeatable entries ---------- */
  var uid = 0;
  function entryField(labelText, tag, value, placeholder, onInput) {
    var wrap = el('div', 'field');
    var id = 'e-' + (++uid);
    var label = el('label', '', labelText);
    label.htmlFor = id;
    var input = el(tag);
    if (tag === 'input') input.type = 'text';
    else input.rows = 4;
    input.id = id;
    input.value = value || '';
    if (placeholder) input.placeholder = placeholder;
    input.addEventListener('input', function () { onInput(input.value); });
    wrap.appendChild(label);
    wrap.appendChild(input);
    return wrap;
  }

  function renderEntries(listId, key, kind) {
    var list = $(listId);
    list.textContent = '';
    state[key].forEach(function (item, i) {
      var box = el('div', 'entry');
      var head = el('div', 'entry-head');
      head.appendChild(el('strong', '', (kind === 'exp' ? 'Experience ' : 'Education ') + (i + 1)));
      var rm = el('button', 'remove-btn', 'Remove');
      rm.type = 'button';
      rm.addEventListener('click', function () {
        state[key].splice(i, 1);
        renderEntries(listId, key, kind);
        changed();
      });
      head.appendChild(rm);
      box.appendChild(head);

      if (kind === 'exp') {
        box.appendChild(entryField('Job title', 'input', item.role, 'e.g. Sales Assistant', function (v) { item.role = v; changed(); }));
        box.appendChild(entryField('Company and place', 'input', item.company, 'e.g. ABC Ltd, Kumasi', function (v) { item.company = v; changed(); }));
        box.appendChild(entryField('Dates', 'input', item.dates, 'e.g. 2022 – Present', function (v) { item.dates = v; changed(); }));
        box.appendChild(entryField('What you did and achieved', 'textarea', item.details, 'One achievement per line', function (v) { item.details = v; changed(); }));
      } else {
        box.appendChild(entryField('Qualification', 'input', item.qualification, 'e.g. BSc Accounting', function (v) { item.qualification = v; changed(); }));
        box.appendChild(entryField('School or institution', 'input', item.school, 'e.g. University of Ghana', function (v) { item.school = v; changed(); }));
        box.appendChild(entryField('Dates', 'input', item.dates, 'e.g. 2018 – 2022', function (v) { item.dates = v; changed(); }));
      }
      list.appendChild(box);
    });
  }

  $('addExp').addEventListener('click', function () {
    state.experience.push({ role: '', company: '', dates: '', details: '' });
    renderEntries('expList', 'experience', 'exp');
    changed();
    var inputs = $('expList').querySelectorAll('.entry:last-child input');
    if (inputs[0]) inputs[0].focus();
  });
  $('addEdu').addEventListener('click', function () {
    state.education.push({ qualification: '', school: '', dates: '' });
    renderEntries('eduList', 'education', 'edu');
    changed();
    var inputs = $('eduList').querySelectorAll('.entry:last-child input');
    if (inputs[0]) inputs[0].focus();
  });

  /* ---------- actions ---------- */
  $('printBtn').addEventListener('click', function () {
    var original = document.title;
    var name = clean(state.name).replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
    // The browser suggests the document title as the PDF file name.
    document.title = (name || 'My') + '-Resume';
    window.print();
    setTimeout(function () { document.title = original; }, 500);
  });

  $('clearBtn').addEventListener('click', function () {
    if (!window.confirm('Clear everything and start with a blank resume?')) return;
    var style = state.style;
    state = blank();
    state.style = style;
    fillSimpleFields();
    renderEntries('expList', 'experience', 'exp');
    renderEntries('eduList', 'education', 'edu');
    changed();
    $('f-name').focus();
  });

  /* ---------- checklist ---------- */
  var boxes = Array.prototype.slice.call(document.querySelectorAll('#checklist input'));
  function updateProgress() {
    var done = boxes.filter(function (b) { return b.checked; }).length;
    boxes.forEach(function (b) { b.closest('li').classList.toggle('done', b.checked); });
    $('checkProgress').textContent = done === boxes.length
      ? 'All ' + boxes.length + ' done. Your resume is ready to send!'
      : done + ' of ' + boxes.length + ' done';
  }
  boxes.forEach(function (b) { b.addEventListener('change', updateProgress); });

  /* ---------- init ---------- */
  var yearEl = $('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  fillSimpleFields();
  renderEntries('expList', 'experience', 'exp');
  renderEntries('eduList', 'education', 'edu');
  renderPreview();
  updateProgress();
})();
