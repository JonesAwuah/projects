/* AJ Job Seekers – Jobs page. Reads data/jobs.json and lets visitors search it. */
(function () {
  'use strict';

  var list = document.getElementById('jobsList');
  var form = document.getElementById('jobSearchForm');
  var qIn = document.getElementById('jobQuery');
  var locIn = document.getElementById('jobLocation');
  var typeSel = document.getElementById('jobType');
  var countEl = document.getElementById('jobsCount');
  var clearBtn = document.getElementById('jobClear');
  var yearEl = document.getElementById('year');

  var jobs = [];
  var loadFailed = false;

  /* ---------- helpers ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function parseDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function fmtDate(s) {
    var d = parseDate(s);
    return d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : (s || '');
  }
  function daysLeft(s) {
    var d = parseDate(s);
    if (!d) return null;
    var t = new Date();
    var today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    return Math.round((d - today) / 86400000);
  }
  function isOpen(j) { return !j.dueDate || j.dueDate >= todayStr(); }
  function lines(text) {
    return String(text || '').split(/\n+/).map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function applyTarget(j) {
    var v = String(j.applyTo || '');
    if (/^https?:\/\/\S+$/i.test(v)) return { href: v, external: true, label: 'Apply Now' };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return { href: 'mailto:' + v + '?subject=' + encodeURIComponent('Application: ' + j.title), external: false, label: 'Apply Now' };
    }
    return { href: 'contact.html', external: false, label: 'Contact Us to Apply' };
  }
  function summaryOf(j) {
    var t = String(j.description || '').replace(/\s+/g, ' ').trim();
    return t.length > 190 ? t.slice(0, 187).replace(/\s+\S*$/, '') + '…' : t;
  }

  var ICON = {
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
  };
  function metaItem(iconKey, text) {
    var li = el('li');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = ICON[iconKey]; // static markup only
    li.appendChild(svg);
    li.appendChild(document.createTextNode(text));
    return li;
  }

  /* ---------- cards ---------- */
  function details(j) {
    var box = el('div', 'job-details');
    box.hidden = true;

    box.appendChild(el('h4', '', 'Job description'));
    String(j.description || '').split(/\n{2,}/).forEach(function (p) {
      p = p.trim();
      if (p) box.appendChild(el('p', '', p));
    });

    var quals = lines(j.qualification);
    if (quals.length) {
      box.appendChild(el('h4', '', 'Qualification'));
      var ul = el('ul', 'job-reqs');
      quals.forEach(function (q) { ul.appendChild(el('li', '', q)); });
      box.appendChild(ul);
    }

    var t = applyTarget(j);
    var a = el('a', 'btn small', t.label);
    a.href = t.href;
    if (t.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    box.appendChild(a);
    return box;
  }

  function card(j) {
    var art = el('article', 'job-card' + (j.featured ? ' featured' : ''));

    var top = el('div', 'job-top');
    if (j.featured) top.appendChild(el('span', 'job-badge', 'Featured'));
    if (j.type) top.appendChild(el('span', 'job-tag', j.type));
    var left = daysLeft(j.dueDate);
    if (left !== null && left >= 0 && left <= 7) {
      top.appendChild(el('span', 'job-tag soon', left === 0 ? 'Closes today' : 'Closing soon'));
    }
    art.appendChild(top);

    art.appendChild(el('h3', '', j.title));
    art.appendChild(el('p', 'job-company', j.company));

    var meta = el('ul', 'job-meta');
    if (j.location) meta.appendChild(metaItem('pin', j.location));
    var n = parseInt(j.positions, 10);
    if (n > 0) meta.appendChild(metaItem('users', n + (n === 1 ? ' applicant needed' : ' applicants needed')));
    if (j.dueDate) meta.appendChild(metaItem('cal', 'Apply by ' + fmtDate(j.dueDate)));
    art.appendChild(meta);

    art.appendChild(el('p', 'job-summary', summaryOf(j)));

    var box = details(j);
    var more = el('button', 'learn-more');
    more.type = 'button';
    more.setAttribute('aria-expanded', 'false');
    var label = document.createTextNode('Learn more ');
    var arrow = el('span', '', '→');
    arrow.setAttribute('aria-hidden', 'true');
    more.appendChild(label);
    more.appendChild(arrow);
    more.addEventListener('click', function () {
      var open = box.hidden;
      box.hidden = !open;
      more.setAttribute('aria-expanded', open ? 'true' : 'false');
      label.nodeValue = open ? 'Show less ' : 'Learn more ';
    });
    art.appendChild(more);
    art.appendChild(box);
    return art;
  }

  /* ---------- search ---------- */
  function haystack(j) {
    return [j.title, j.company, j.type, j.location, j.description, j.qualification].join(' ').toLowerCase();
  }

  function filtered() {
    var words = qIn.value.toLowerCase().split(/\s+/).filter(Boolean);
    var loc = locIn.value.trim().toLowerCase();
    var type = typeSel.value;

    return jobs.filter(function (j) {
      if (!isOpen(j)) return false;
      if (type && j.type !== type) return false;
      if (loc && String(j.location || '').toLowerCase().indexOf(loc) === -1) return false;
      var h = haystack(j);
      return words.every(function (w) { return h.indexOf(w) !== -1; });
    }).sort(function (a, b) {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return String(b.posted || '').localeCompare(String(a.posted || ''));
    });
  }

  function render() {
    var searching = !!(qIn.value.trim() || locIn.value.trim() || typeSel.value);
    clearBtn.hidden = !searching;
    list.textContent = '';

    if (loadFailed) {
      countEl.textContent = '';
      list.appendChild(el('p', 'jobs-empty', 'Jobs could not be loaded right now. Please refresh the page or try again shortly.'));
      return;
    }

    var shown = filtered();
    countEl.textContent = shown.length + (shown.length === 1 ? ' job found' : ' jobs found');

    if (!shown.length) {
      var open = jobs.filter(isOpen).length;
      list.appendChild(el('p', 'jobs-empty', open
        ? 'No jobs match your search. Try a different keyword or location, or clear the search.'
        : 'There are no open vacancies right now. New jobs are added regularly, so please check back soon.'));
      return;
    }
    shown.forEach(function (j) { list.appendChild(card(j)); });
  }

  function fillTypes() {
    var seen = {};
    jobs.filter(isOpen).forEach(function (j) { if (j.type) seen[j.type] = true; });
    Object.keys(seen).sort().forEach(function (t) {
      var o = el('option', '', t);
      o.value = t;
      typeSel.appendChild(o);
    });
  }

  function readParams() {
    try {
      var p = new URLSearchParams(location.search);
      if (p.get('q')) qIn.value = p.get('q');
      if (p.get('loc')) locIn.value = p.get('loc');
      if (p.get('type')) typeSel.value = p.get('type');
    } catch (e) { /* ignore */ }
  }

  /* ---------- events + init ---------- */
  form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
  qIn.addEventListener('input', render);
  locIn.addEventListener('input', render);
  typeSel.addEventListener('change', render);
  clearBtn.addEventListener('click', function () {
    qIn.value = '';
    locIn.value = '';
    typeSel.value = '';
    render();
    qIn.focus();
  });

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  fetch('data/jobs.json?t=' + Math.floor(Date.now() / 60000), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) { jobs = Array.isArray(data) ? data : []; })
    .catch(function () { jobs = []; loadFailed = true; })
    .then(function () {
      fillTypes();
      readParams();
      render();
    });
})();
