/* AJ Job Seekers – Resources page: shows the latest open jobs from data/jobs.json */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var list = document.getElementById('latestJobs');
  if (!list) return;

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

  function message(text) {
    list.textContent = '';
    list.appendChild(el('li', 'job-mini-empty', text));
  }

  fetch('data/jobs.json?t=' + Math.floor(Date.now() / 60000), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var today = todayStr();
      var open = (Array.isArray(data) ? data : []).filter(function (j) {
        return j && j.title && (!j.dueDate || j.dueDate >= today);
      }).sort(function (a, b) {
        if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
        return String(b.posted || '').localeCompare(String(a.posted || ''));
      }).slice(0, 3);

      if (!open.length) {
        message('No vacancies are open right now. New jobs are added regularly, so please check back soon.');
        return;
      }
      list.textContent = '';
      open.forEach(function (j) {
        var li = el('li');
        var a = el('a');
        a.href = 'jobs.html?q=' + encodeURIComponent(j.title);
        a.appendChild(el('strong', '', j.title));
        a.appendChild(el('span', '', [j.company, j.location].filter(Boolean).join(' · ')));
        li.appendChild(a);
        list.appendChild(li);
      });
    })
    .catch(function () {
      message('The latest vacancies could not be loaded right now. Please open the Jobs page to see them.');
    });
})();
