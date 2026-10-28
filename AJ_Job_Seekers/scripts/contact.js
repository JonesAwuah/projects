/* AJ Job Seekers – Contact page.
   GitHub Pages has no server, so the form works in one of two ways:
   1. If FORM_ENDPOINT is set (for example a free Formspree form), the message is sent from the page.
   2. Otherwise the visitor's email app opens with the message already written, and a WhatsApp button is offered.
   >>> EDIT THE VALUES IN CONFIG BELOW, and the matching links in contact.html (look for "EDIT"). <<< */
(function () {
  'use strict';

  var CONFIG = {
    EMAIL: 'info@example.com',            // EDIT: your real contact email
    WHATSAPP: '233240000000',             // EDIT: WhatsApp number with country code, digits only (233 = Ghana)
    FORM_ENDPOINT: '',                    // OPTIONAL: e.g. 'https://formspree.io/f/xxxxxxx'. Leave '' to use email app instead
    SUBJECT_PREFIX: 'AJ Job Seekers: '
  };
  if (window.CONTACT_CONFIG) for (var k in window.CONTACT_CONFIG) CONFIG[k] = window.CONTACT_CONFIG[k];

  var TOPICS = {
    general: 'General enquiry',
    seeker: 'Job seeker support',
    employer: 'Employer: post a job',
    partner: 'Partnership or media',
    feedback: 'Feedback or report a problem'
  };

  var form = document.getElementById('contactForm');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var status = $('formStatus'), box = $('formBox'), done = $('formDone');

  function val(id) { var e = $(id); return e ? String(e.value || '').trim() : ''; }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  /* ---- employer extras */
  var extra = $('employerExtra'), topic = $('topic');
  function syncTopic() {
    var emp = topic.value === 'employer';
    extra.hidden = !emp;
    Array.prototype.forEach.call(extra.querySelectorAll('input,textarea'), function (e) { e.disabled = !emp; });
    var m = $('message'); m.placeholder = emp ? 'Anything else we should know about the vacancy…' : 'How can we help you?';
    $('msgLabel').textContent = emp ? 'Additional details' : 'Your message';
  }
  topic.addEventListener('change', syncTopic);
  try {
    var q = new URLSearchParams(window.location.search).get('topic');
    if (q && TOPICS[q]) topic.value = q;
  } catch (e) { /* ignore */ }
  syncTopic();

  /* ---- character counter */
  var msg = $('message'), count = $('msgCount');
  function upd() { count.textContent = msg.value.length + ' / 2000'; }
  msg.addEventListener('input', upd); upd();

  /* ---- validation */
  function setErr(id, text) {
    var e = $(id), p = e.closest('.field'), m = p.querySelector('.err');
    if (text) { p.classList.add('invalid'); e.setAttribute('aria-invalid', 'true'); m.textContent = text; }
    else { p.classList.remove('invalid'); e.removeAttribute('aria-invalid'); m.textContent = ''; }
  }
  function validate() {
    var bad = [];
    function chk(id, ok, text) { setErr(id, ok ? '' : text); if (!ok) bad.push(id); }
    chk('name', val('name').length >= 2, 'Please enter your name.');
    chk('email', emailOk(val('email')), 'Please enter a valid email address.');
    var ph = val('phone'); chk('phone', !ph || /^[+()\d\s-]{7,20}$/.test(ph), 'Use digits only, for example +233 24 000 0000.');
    if (topic.value === 'employer') {
      chk('company', val('company').length >= 2, 'Please enter the company or organisation name.');
      chk('jobTitle', val('jobTitle').length >= 2, 'Please enter the job title.');
    }
    chk('message', val('message').length >= (topic.value === 'employer' ? 0 : 10), 'Please write at least 10 characters.');
    return bad;
  }

  /* ---- build the message text */
  function collect() {
    var d = { topic: TOPICS[topic.value], topicKey: topic.value, name: val('name'), email: val('email'), phone: val('phone'), message: val('message') };
    if (topic.value === 'employer') { d.company = val('company'); d.jobTitle = val('jobTitle'); d.positions = val('positions'); d.dueDate = val('dueDate'); d.location = val('jobLocation'); }
    return d;
  }
  function bodyText(d) {
    var L = ['Topic: ' + d.topic, 'Name: ' + d.name, 'Email: ' + d.email];
    if (d.phone) L.push('Phone: ' + d.phone);
    if (d.topicKey === 'employer') {
      L.push('', 'VACANCY DETAILS', 'Company: ' + d.company, 'Job title: ' + d.jobTitle);
      if (d.location) L.push('Location: ' + d.location);
      if (d.positions) L.push('Number of positions: ' + d.positions);
      if (d.dueDate) L.push('Application due date: ' + d.dueDate);
    }
    if (d.message) L.push('', d.message);
    return L.join('\n');
  }
  function buildMailto(d) {
    var body = bodyText(d);
    if (body.length > 1700) body = body.slice(0, 1700) + '…';
    return 'mailto:' + CONFIG.EMAIL + '?subject=' + encodeURIComponent(CONFIG.SUBJECT_PREFIX + d.topic + ' (' + d.name + ')') + '&body=' + encodeURIComponent(body);
  }
  function buildWhatsApp(d) {
    var t = 'Hello AJ Job Seekers. ' + (d && d.name ? 'My name is ' + d.name + '. ' : '') + (d ? 'Topic: ' + d.topic + '. ' + (d.message || '') : '');
    return 'https://wa.me/' + String(CONFIG.WHATSAPP).replace(/\D/g, '') + '?text=' + encodeURIComponent(t.slice(0, 900));
  }

  function say(text, cls) { status.className = 'form-status ' + (cls || ''); status.textContent = text; status.hidden = !text; }
  function showDone(kind, d) {
    box.hidden = true; done.hidden = false; done.textContent = '';
    function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
    done.appendChild(el('div', 'done-ico', '✓'));
    done.appendChild(el('h3', '', kind === 'sent' ? 'Thank you. Your message has been sent.' : 'Almost done. Please send the email that just opened.'));
    done.appendChild(el('p', 'muted', kind === 'sent'
      ? 'We usually reply within one to two working days. A copy of your details was sent to ' + CONFIG.EMAIL + '.'
      : 'Your email app should have opened with your message ready. Press Send there. If nothing opened, use the buttons below.'));
    var row = el('div', 'actions');
    if (kind !== 'sent') {
      var a = el('a', 'btn primary', 'Open email again'); a.href = buildMailto(d); row.appendChild(a);
      var c = el('button', 'btn ghost', 'Copy my message'); c.type = 'button';
      c.addEventListener('click', function () { var t = bodyText(d); function ok() { c.textContent = 'Copied ✓'; } try { navigator.clipboard.writeText(t).then(ok, function () { c.textContent = 'Copy failed'; }); } catch (e) { c.textContent = 'Copy failed'; } });
      row.appendChild(c);
    }
    var w = el('a', 'btn ghost', 'Chat on WhatsApp'); w.href = buildWhatsApp(d); w.target = '_blank'; w.rel = 'noopener'; row.appendChild(w);
    var n = el('button', 'learn-more', 'Send another message'); n.type = 'button';
    n.addEventListener('click', function () { done.hidden = true; box.hidden = false; form.reset(); syncTopic(); upd(); say(''); try { $('name').focus(); } catch (e) { /* ignore */ } });
    row.appendChild(n);
    done.appendChild(row);
    done.setAttribute('tabindex', '-1'); try { done.focus(); } catch (e) { /* ignore */ }
  }

  var sending = false;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (sending) return;
    if ($('website').value) return;                           // honeypot: bots fill this hidden field
    var bad = validate();
    if (bad.length) { say('Please fix the highlighted ' + (bad.length === 1 ? 'field' : 'fields') + ' and try again.', 'error'); try { $(bad[0]).focus(); } catch (e) { /* ignore */ } return; }
    var d = collect();
    if (CONFIG.FORM_ENDPOINT) {
      sending = true; var btn = $('sendBtn'); btn.disabled = true; btn.textContent = 'Sending…'; say('Sending your message…', '');
      var payload = { name: d.name, email: d.email, phone: d.phone, topic: d.topic, message: bodyText(d), _subject: CONFIG.SUBJECT_PREFIX + d.topic };
      fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); showDone('sent', d); })
        .catch(function () { say('We could not send your message from this page. Your email app will open instead so that nothing is lost.', 'error'); window.location.href = buildMailto(d); showDone('mail', d); })
        .then(function () { sending = false; btn.disabled = false; btn.textContent = 'Send message'; });
    } else {
      showDone('mail', d);
      window.location.href = buildMailto(d);
    }
  });
  Array.prototype.forEach.call(form.querySelectorAll('input,textarea,select'), function (e) {
    e.addEventListener('input', function () { if (e.closest('.field') && e.closest('.field').classList.contains('invalid')) setErr(e.id, ''); });
  });

  /* ---- contact links use the config */
  Array.prototype.forEach.call(document.querySelectorAll('[data-contact]'), function (a) {
    var t = a.getAttribute('data-contact');
    if (t === 'email') { a.href = 'mailto:' + CONFIG.EMAIL; if (a.hasAttribute('data-show')) a.textContent = CONFIG.EMAIL; }
    if (t === 'whatsapp') { a.href = buildWhatsApp(null); a.target = '_blank'; a.rel = 'noopener'; }
    if (t === 'phone') { a.href = 'tel:+' + String(CONFIG.WHATSAPP).replace(/\D/g, ''); if (a.hasAttribute('data-show')) a.textContent = '+' + String(CONFIG.WHATSAPP).replace(/^(\d{3})(\d{2})(\d{3})(\d+)$/, '$1 $2 $3 $4'); }
  });

  var y = $('year'); if (y) y.textContent = new Date().getFullYear();
  window.__CT = { buildMailto: buildMailto, buildWhatsApp: buildWhatsApp, collect: collect, config: CONFIG };
})();
