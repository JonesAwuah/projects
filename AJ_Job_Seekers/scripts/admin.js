/* AJ Job Seekers – Admin (static page).
   Password gate + managers for jobs and blog articles.
   Publishing: when connected to GitHub (Settings tab) every Post / Save / Delete is committed
   straight to the website's data files. When not connected it falls back to drafts + Download.
   NOTE: this is a static site, so the password only keeps casual visitors out.
   It is not server-side security. */
(function () {
  'use strict';

  /* sha256( SALT + password ). Default password: ChangeMe-2026!
     Change it from Settings after logging in, then paste the new line here. */
  var PASS_HASH = 'b23e724b891f3094864b26af4a5f7ad5b916945a2d8eed4fde9d1ab0796cae54';
  var SALT = 'ajjs-admin|';
  var MAX_FAILS = 5;
  var LOCK_MS = 60 * 1000;
  var IDLE_MS = 30 * 60 * 1000;

  var K = {
    auth: 'ajjs_admin_auth',        // sessionStorage: unlocked in this tab only
    pass: 'ajjs_admin_hash',        // localStorage: password override for this browser
    fails: 'ajjs_admin_fails',
    lock: 'ajjs_admin_lock',
    gh: 'ajjs_gh_cfg',              // localStorage: GitHub connection (includes token)
    draftA: 'ajjs_draft_articles',
    draftJ: 'ajjs_draft_jobs'
  };

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function btn(text, cls) { var b = el('button', cls, text); b.type = 'button'; return b; }
  function sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function sdel(k) { try { sessionStorage.removeItem(k); } catch (e) { /* ignore */ } }
  function lget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function ldel(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  function setMsg(id, text, ok) {
    var m = $(id);
    m.textContent = text;
    m.className = 'form-msg' + (ok ? ' ok' : '');
  }
  function safeImage(u) { return /^(https?:\/\/|images\/|\.\/images\/)/i.test(u || ''); }
  function slug(t) {
    return String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'item';
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function validDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return false;
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getFullYear() === +m[1] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[3];
  }

  function sha256(text) {
    if (!(window.crypto && window.crypto.subtle)) return Promise.reject(new Error('no-crypto'));
    return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }
  function currentHash() { return lget(K.pass) || PASS_HASH; }

  /* ---------- GitHub publishing ---------- */
  function ghCfg() {
    try { return JSON.parse(lget(K.gh) || 'null'); } catch (e) { return null; }
  }
  function ghReady() {
    var c = ghCfg();
    return !!(c && c.owner && c.repo && c.branch && c.token);
  }
  function enc(s) { return encodeURIComponent(s); }
  function ghRepoUrl(c) { return 'https://api.github.com/repos/' + enc(c.owner) + '/' + enc(c.repo); }
  function ghFileUrl(c, path) {
    return ghRepoUrl(c) + '/contents/' + path.split('/').map(enc).join('/');
  }
  function ghHeaders(c) {
    return {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + c.token,
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }
  function ghPath(file) { var c = ghCfg(); return ((c && c.folder) || '') + file; }

  function b64enc(str) {
    var bytes = new TextEncoder().encode(str), bin = '', i;
    for (i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function b64dec(b64) {
    var bin = atob(String(b64).replace(/\s/g, '')), bytes = new Uint8Array(bin.length), i;
    for (i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function ghError(res) {
    return res.json().then(function (b) { return b || {}; }, function () { return {}; }).then(function (b) {
      var msg;
      if (res.status === 401) msg = 'GitHub rejected the access token (it may be wrong or expired).';
      else if (res.status === 403) msg = 'GitHub denied access. Check the token permissions (Contents: Read and write) or try again later.';
      else if (res.status === 404) msg = 'Repository, branch or folder not found. Check the connection settings.';
      else msg = b.message || ('GitHub error ' + res.status);
      var e = new Error(msg);
      e.status = res.status;
      throw e;
    });
  }

  function ghTest(c) {
    return fetch(ghRepoUrl(c), { headers: ghHeaders(c), cache: 'no-store' }).then(function (res) {
      if (!res.ok) return ghError(res);
      return res.json().then(function (r) {
        if (r.permissions && r.permissions.push === false) {
          throw new Error('Connected, but this token cannot write to the repository. Give it “Contents: Read and write”.');
        }
        return r;
      });
    });
  }

  function ghRead(path) {
    var c = ghCfg();
    var url = ghFileUrl(c, path) + '?ref=' + enc(c.branch) + '&t=' + Date.now();
    return fetch(url, { headers: ghHeaders(c), cache: 'no-store' }).then(function (res) {
      if (res.status === 404) {
        // Either the file does not exist yet (fine) or the repo/branch is wrong (not fine).
        return ghTest(c).then(function () { return { items: [], sha: null }; });
      }
      if (!res.ok) return ghError(res);
      return res.json().then(function (j) {
        var data = JSON.parse(b64dec(j.content));
        return { items: Array.isArray(data) ? data : [], sha: j.sha };
      });
    });
  }

  function ghPut(c, path, items, message, sha) {
    var body = {
      message: message,
      content: b64enc(JSON.stringify(items, null, 2) + '\n'),
      branch: c.branch
    };
    if (sha) body.sha = sha;
    var headers = ghHeaders(c);
    headers['Content-Type'] = 'application/json';
    return fetch(ghFileUrl(c, path), { method: 'PUT', headers: headers, body: JSON.stringify(body) });
  }

  function ghWrite(path, items, message, sha) {
    var c = ghCfg();
    return ghPut(c, path, items, message, sha).then(function (res) {
      if (res.status === 409 || res.status === 422) {
        // The file changed on GitHub since we loaded it: fetch the newest version id and retry once.
        return ghRead(path).then(function (cur) {
          return ghPut(c, path, items, message, cur.sha);
        });
      }
      return res;
    }).then(function (res) {
      if (!res.ok) return ghError(res);
      return res.json().then(function (j) { return j.content && j.content.sha; });
    });
  }

  /* ---------- generic manager ---------- */
  function Manager(cfg) {
    var root = $(cfg.root);
    var items = [];
    var sha = null;
    var dirty = false;
    var loadError = '';
    var loadFailed = false;
    var editingId = '';
    var ui = { inputs: {} };

    function live() { return ghReady(); }
    function path() { return ghPath(cfg.filename); }

    function buildField(f) {
      var id = cfg.root + '-' + f.key, wrap, input;
      if (f.type === 'checkbox') {
        wrap = el('label', 'check');
        input = el('input');
        input.type = 'checkbox';
        input.id = id;
        wrap.appendChild(input);
        wrap.appendChild(document.createTextNode(' ' + f.label));
        return { wrap: wrap, input: input };
      }
      wrap = el('div', 'field' + (f.full ? ' full' : ''));
      var label = el('label', '', f.label);
      label.htmlFor = id;
      wrap.appendChild(label);
      if (f.type === 'textarea') {
        input = el('textarea');
        input.rows = f.rows || 4;
      } else if (f.type === 'select') {
        input = el('select');
        f.options.forEach(function (o) {
          var op = el('option', '', o);
          op.value = o;
          input.appendChild(op);
        });
      } else {
        input = el('input');
        input.type = f.type || 'text';
        if (f.type === 'number') { input.min = f.min; input.max = f.max; input.step = 1; }
      }
      input.id = id;
      if (f.required) input.required = true;
      if (f.placeholder) input.placeholder = f.placeholder;
      wrap.appendChild(input);
      if (f.help) wrap.appendChild(el('small', '', f.help));
      return { wrap: wrap, input: input };
    }

    function build() {
      root.textContent = '';

      /* list panel */
      ui.listPanel = el('div', 'panel');
      var head = el('div', 'panel-head');
      var hl = el('div');
      hl.appendChild(el('h2', '', cfg.title));
      hl.appendChild(el('p', '', cfg.blurb));
      head.appendChild(hl);
      ui.listPanel.appendChild(head);

      ui.mode = el('p', 'mode-line');
      ui.status = el('div', 'banner');
      ui.status.hidden = true;
      ui.status.setAttribute('role', 'status');
      ui.errBanner = el('div', 'banner err');
      ui.errBanner.hidden = true;
      ui.draftBanner = el('div', 'banner');
      ui.draftBanner.hidden = true;
      [ui.mode, ui.status, ui.errBanner, ui.draftBanner].forEach(function (n) { ui.listPanel.appendChild(n); });

      var bar = el('div', 'toolbar');
      var addBtn = btn('Post New ' + cfg.noun, 'btn small primary');
      var dlBtn = btn('Download ' + cfg.filename, 'btn small outline');
      var impBtn = btn('Import JSON', 'btn small outline');
      ui.file = el('input', 'file-input');
      ui.file.type = 'file';
      ui.file.accept = 'application/json,.json';
      [addBtn, dlBtn, impBtn, ui.file].forEach(function (n) { bar.appendChild(n); });
      ui.listPanel.appendChild(bar);

      ui.list = el('ul', 'admin-list');
      ui.listPanel.appendChild(ui.list);
      root.appendChild(ui.listPanel);

      /* form panel */
      ui.formPanel = el('div', 'panel');
      ui.formPanel.hidden = true;
      ui.formHeading = el('h3');
      ui.formPanel.appendChild(ui.formHeading);
      var form = el('form');
      form.autocomplete = 'off';
      var grid = el('div', 'form-grid');
      var checks = el('div');
      cfg.fields.forEach(function (f) {
        var built = buildField(f);
        ui.inputs[f.key] = built.input;
        (f.type === 'checkbox' ? checks : grid).appendChild(built.wrap);
      });
      form.appendChild(grid);
      form.appendChild(checks);
      ui.formMsg = el('p', 'form-msg');
      ui.formMsg.setAttribute('role', 'alert');
      form.appendChild(ui.formMsg);
      var actions = el('div', 'form-actions');
      ui.saveBtn = el('button', 'btn primary');
      ui.saveBtn.type = 'submit';
      var cancel = btn('Cancel', 'btn outline');
      actions.appendChild(ui.saveBtn);
      actions.appendChild(cancel);
      form.appendChild(actions);
      ui.formPanel.appendChild(form);
      root.appendChild(ui.formPanel);

      /* events */
      addBtn.addEventListener('click', function () { openForm(null); });
      dlBtn.addEventListener('click', download);
      impBtn.addEventListener('click', function () { ui.file.click(); });
      ui.file.addEventListener('change', importFile);
      cancel.addEventListener('click', function () { ui.formPanel.hidden = true; });
      form.addEventListener('submit', onSave);
    }

    /* ----- status + banners ----- */
    function showStatus(kind, text) {
      ui.status.className = 'banner ' + kind;
      ui.status.textContent = text;
      ui.status.hidden = false;
    }
    function setBusy(b) { root.classList.toggle('busy', b); }

    function updateBanners() {
      var on = live();
      ui.mode.className = 'mode-line ' + (on ? 'on' : 'off');
      ui.mode.textContent = on
        ? '● Auto-publish is ON: changes go straight to your website.'
        : '● Auto-publish is OFF: changes are saved as drafts here. Connect GitHub in Settings to publish automatically.';

      ui.errBanner.textContent = '';
      ui.errBanner.hidden = !loadError;
      if (loadError) ui.errBanner.appendChild(el('div', '', loadError));

      ui.draftBanner.textContent = '';
      ui.draftBanner.hidden = !(dirty && !on);
      if (dirty && !on) {
        ui.draftBanner.appendChild(el('div', '',
          'You have unpublished changes. Download ' + cfg.filename +
          ' and upload it to the data/ folder of your website to publish them.'));
        var acts = el('div', 'banner-actions');
        var dl = btn('Download ' + cfg.filename, 'btn small primary');
        var done = btn('Mark as published', 'btn small outline');
        var discard = btn('Discard draft', 'btn small outline');
        dl.addEventListener('click', download);
        done.addEventListener('click', function () {
          ldel(cfg.draftKey);
          dirty = false;
          updateBanners();
        });
        discard.addEventListener('click', function () {
          if (window.confirm('Discard all unpublished changes and reload the published list?')) {
            ldel(cfg.draftKey);
            load();
          }
        });
        [dl, done, discard].forEach(function (n) { acts.appendChild(n); });
        ui.draftBanner.appendChild(acts);
      }
    }

    /* ----- list ----- */
    function render() {
      ui.list.textContent = '';
      updateBanners();
      if (!items.length) {
        ui.list.appendChild(el('li', 'empty', 'Nothing here yet. Use “Post New ' + cfg.noun + '” to add one.'));
        return;
      }
      items.forEach(function (it) {
        var li = el('li', 'admin-row');
        var info = el('div');
        info.appendChild(el('strong', '', it.title + (it.featured ? '  ★' : '')));
        info.appendChild(el('span', 'sub', cfg.rowSub(it)));
        li.appendChild(info);

        var actions = el('div', 'row-actions');
        var edit = el('button', 'mini-btn', 'Edit');
        edit.type = 'button';
        edit.addEventListener('click', function () { openForm(it); });
        var del = el('button', 'mini-btn danger', 'Delete');
        del.type = 'button';
        del.addEventListener('click', function () {
          if (!window.confirm('Delete “' + it.title + '”? This removes it from the website.')) return;
          var next = items.filter(function (x) { return x.id !== it.id; });
          apply(next, 'Delete ' + cfg.noun.toLowerCase() + ': ' + it.title).then(render, function () {});
        });
        actions.appendChild(edit);
        actions.appendChild(del);
        li.appendChild(actions);
        ui.list.appendChild(li);
      });
    }

    /* ----- saving: live (GitHub) or draft ----- */
    function saveDraft() {
      lset(cfg.draftKey, JSON.stringify(items));
      dirty = true;
    }

    function apply(next, message) {
      if (!live()) {
        items = next;
        saveDraft();
        showStatus('info', 'Saved as a draft. Download ' + cfg.filename + ' and upload it to publish (or connect GitHub in Settings to publish automatically).');
        return Promise.resolve();
      }
      if (loadFailed) {
        var msg = 'The current list could not be loaded from GitHub, so publishing is paused to avoid overwriting it. Fix the connection in Settings, then reload.';
        showStatus('err', msg);
        return Promise.reject(new Error(msg));
      }
      setBusy(true);
      showStatus('info', 'Publishing to your website…');
      return ghWrite(path(), next, message, sha).then(function (newSha) {
        sha = newSha;
        items = next;
        setBusy(false);
        showStatus('ok', 'Published ✓ It will appear on the website in about a minute.');
      }, function (err) {
        setBusy(false);
        showStatus('err', 'Could not publish: ' + err.message + ' Nothing was changed.');
        throw err;
      });
    }

    /* ----- loading ----- */
    function fetchPublished() {
      fetch(cfg.dataUrl + '?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          items = Array.isArray(data) ? data : [];
          dirty = false;
          loadError = '';
        })
        .catch(function () {
          items = [];
          dirty = false;
          loadError = 'Could not load the published ' + cfg.dataUrl + '. If you opened this page straight from your ' +
            'computer, open it through your published site or a local server instead. You can also use “Import JSON”.';
        })
        .then(render);
    }

    function load() {
      ui.status.hidden = true;
      loadFailed = false;
      loadError = '';
      if (live()) {
        ghRead(path()).then(function (r) {
          items = r.items;
          sha = r.sha;
          dirty = false;
        }).catch(function (err) {
          items = [];
          sha = null;
          loadFailed = true;
          loadError = 'Could not load ' + cfg.filename + ' from GitHub: ' + err.message;
        }).then(render);
        return;
      }
      var draft = lget(cfg.draftKey);
      if (draft) {
        try {
          items = JSON.parse(draft);
          if (!Array.isArray(items)) throw new Error('bad draft');
          dirty = true;
          render();
          return;
        } catch (e) { ldel(cfg.draftKey); }
      }
      fetchPublished();
    }

    /* ----- form ----- */
    function openForm(item) {
      editingId = item ? item.id : '';
      ui.formHeading.textContent = (item ? 'Edit ' : 'Post New ') + cfg.noun;
      ui.saveBtn.textContent = item ? 'Save Changes' : (live() ? 'Post ' + cfg.noun : 'Save ' + cfg.noun);
      cfg.fields.forEach(function (f) {
        var input = ui.inputs[f.key];
        if (f.type === 'checkbox') input.checked = !!(item && item[f.key]);
        else input.value = item ? (item[f.key] || '') : (f.type === 'select' ? f.options[0] : '');
      });
      ui.formMsg.textContent = '';
      ui.formPanel.hidden = false;
      ui.formPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function makeId(title) {
      var base = slug(title), id = base, n = 2;
      while (items.some(function (x) { return x.id === id; })) { id = base + '-' + n++; }
      return id;
    }

    function onSave(e) {
      e.preventDefault();
      var data = {}, i, f, v, err;
      for (i = 0; i < cfg.fields.length; i++) {
        f = cfg.fields[i];
        v = f.type === 'checkbox' ? ui.inputs[f.key].checked : ui.inputs[f.key].value.trim();
        if (f.required && !v) {
          ui.formMsg.textContent = 'Please fill in: ' + f.label + '.';
          ui.inputs[f.key].focus();
          return;
        }
        if (f.type !== 'checkbox' && v && f.validate) {
          err = f.validate(v);
          if (err) { ui.formMsg.textContent = err; ui.inputs[f.key].focus(); return; }
        }
        data[f.key] = v;
      }
      if (cfg.extraValidate) {
        err = cfg.extraValidate(data, !editingId);
        if (err) { ui.formMsg.textContent = err; return; }
      }
      ui.formMsg.textContent = '';

      var next = items.map(function (x) {
        var c = Object.assign({}, x);
        if (cfg.singleFeatured && data.featured) c.featured = false;
        return c;
      });
      var message;
      if (editingId) {
        next = next.map(function (x) { return x.id === editingId ? Object.assign({}, x, data) : x; });
        message = 'Update ' + cfg.noun.toLowerCase() + ': ' + data.title;
      } else {
        var item = Object.assign({ id: makeId(data.title) }, data);
        if (cfg.onCreate) cfg.onCreate(item);
        next.unshift(item);
        message = 'Add ' + cfg.noun.toLowerCase() + ': ' + data.title;
      }
      apply(next, message).then(function () {
        ui.formPanel.hidden = true;
        render();
      }, function (er) {
        ui.formMsg.textContent = 'Could not save: ' + er.message;
      });
    }

    /* ----- download / import ----- */
    function download() {
      var blob = new Blob([JSON.stringify(items, null, 2) + '\n'], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = cfg.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    }

    function clean(raw) {
      var out = { id: String(raw.id || slug(raw.title)) };
      cfg.fields.forEach(function (f) {
        out[f.key] = f.type === 'checkbox' ? !!raw[f.key] : String(raw[f.key] == null ? '' : raw[f.key]);
      });
      if (raw.posted) out.posted = String(raw.posted);
      return out;
    }

    function importFile() {
      var file = ui.file.files && ui.file.files[0];
      ui.file.value = '';
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var valid;
        try {
          var data = JSON.parse(reader.result);
          if (!Array.isArray(data)) throw new Error('not a list');
          valid = data.filter(function (x) { return x && typeof x === 'object' && x.title; }).map(clean);
          if (!valid.length && data.length) throw new Error('no valid items');
        } catch (e) {
          window.alert('That file could not be imported. Please choose a valid ' + cfg.filename + ' file.');
          return;
        }
        if (window.confirm('Replace the current list with ' + valid.length + ' item(s) from this file?')) {
          apply(valid, 'Import ' + valid.length + ' ' + cfg.noun.toLowerCase() + '(s)').then(render, function () {});
        }
      };
      reader.readAsText(file);
    }

    build();
    load();
    return { reload: load };
  }

  /* ---------- configs ---------- */
  var JOBS = {
    root: 'tab-jobs',
    title: 'Jobs',
    blurb: 'Vacancies shown on the public Jobs page. Jobs disappear from the website automatically after their due date.',
    noun: 'Job',
    filename: 'jobs.json',
    dataUrl: 'data/jobs.json',
    draftKey: K.draftJ,
    singleFeatured: false,
    onCreate: function (item) { item.posted = todayStr(); },
    extraValidate: function (d, isNew) {
      return isNew && d.dueDate < todayStr() ? 'The due date is in the past. Please choose today or a later date.' : '';
    },
    rowSub: function (j) {
      var parts = [j.company, j.location, j.type];
      if (j.dueDate) parts.push((j.dueDate < todayStr() ? 'Expired ' : 'Due ') + j.dueDate);
      return parts.filter(Boolean).join(' · ');
    },
    fields: [
      { key: 'company', label: 'Company Name', required: true },
      { key: 'title', label: 'Job Title', required: true },
      { key: 'location', label: 'Location', required: true, placeholder: 'e.g. Accra, Ghana' },
      {
        key: 'type', label: 'Job Type', type: 'select',
        options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Remote', 'Volunteer']
      },
      {
        key: 'description', label: 'Job Description', type: 'textarea', rows: 8, required: true, full: true,
        help: 'Describe the role and responsibilities. Leave a blank line between paragraphs.'
      },
      {
        key: 'qualification', label: 'Qualification', type: 'textarea', rows: 5, required: true, full: true,
        help: 'One qualification per line, for example: BSc in Accounting.'
      },
      {
        key: 'positions', label: 'Number of Applicants Needed', type: 'number', min: 1, max: 9999, required: true,
        placeholder: 'e.g. 3',
        validate: function (v) { return /^\d{1,4}$/.test(v) && +v >= 1 ? '' : 'Enter a whole number of 1 or more.'; }
      },
      {
        key: 'dueDate', label: 'Due Date', type: 'date', required: true,
        validate: function (v) { return validDate(v) ? '' : 'Please choose a valid due date.'; }
      },
      {
        key: 'applyTo', label: 'How to Apply (optional)', full: true,
        placeholder: 'https://company.com/careers  or  jobs@company.com',
        help: 'A web link or email address. Leave empty to send applicants to your Contact page.',
        validate: function (v) {
          return /^(https?:\/\/\S+|[^\s@]+@[^\s@]+\.[^\s@]+)$/i.test(v)
            ? '' : 'Enter a full web link (https://…) or an email address.';
        }
      },
      { key: 'featured', type: 'checkbox', label: 'Mark as featured / urgent' }
    ]
  };

  var ARTICLES = {
    root: 'tab-articles',
    title: 'Blog Articles',
    blurb: 'Articles shown on the public Blog page.',
    noun: 'Article',
    filename: 'articles.json',
    dataUrl: 'data/articles.json',
    draftKey: K.draftA,
    singleFeatured: true,
    rowSub: function (a) { return [a.category, a.date].filter(Boolean).join(' · '); },
    fields: [
      { key: 'title', label: 'Title', required: true, full: true },
      { key: 'category', label: 'Category', required: true },
      { key: 'date', label: 'Date Label', placeholder: 'e.g. October 2026' },
      { key: 'readTime', label: 'Read Time', placeholder: 'e.g. 5 min read' },
      {
        key: 'image', label: 'Image URL', full: true,
        placeholder: 'https://… or images/photo.jpg (optional)',
        validate: function (v) { return safeImage(v) ? '' : 'Image URL must start with http://, https:// or images/.'; }
      },
      { key: 'summary', label: 'Summary', type: 'textarea', rows: 3, required: true, full: true },
      {
        key: 'body', label: 'Article Body', type: 'textarea', rows: 12, required: true, full: true,
        help: 'Leave a blank line between paragraphs. Start a paragraph with “## ” to make it a sub-heading.'
      },
      { key: 'featured', type: 'checkbox', label: 'Mark as featured article' }
    ]
  };

  /* ---------- gate, lock, tabs, settings ---------- */
  var started = false;
  var managers = [];
  var idleTimer;

  function updatePubState() {
    var on = ghReady();
    var chip = $('pubState');
    chip.textContent = 'Auto-publish: ' + (on ? 'ON' : 'OFF');
    chip.className = 'pub-state ' + (on ? 'on' : 'off');
  }

  function loadGhForm() {
    var c = ghCfg() || {};
    $('ghOwner').value = c.owner || 'jonesawuah';
    $('ghRepo').value = c.repo || 'wdd231';
    $('ghBranch').value = c.branch || 'main';
    $('ghFolder').value = c.folder != null ? c.folder : 'finalproject/data/';
    $('ghToken').value = '';
    $('ghToken').placeholder = c.token ? 'Saved in this browser (leave empty to keep it)' : 'github_pat_…';
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(lock, IDLE_MS);
  }
  function startIdle() {
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(function (ev) {
      document.addEventListener(ev, resetIdle, { passive: true });
    });
    resetIdle();
  }

  function unlock() {
    $('gate').hidden = true;
    $('app').hidden = false;
    $('topActions').hidden = false;
    startIdle();
    updatePubState();
    loadGhForm();
    if (!started) {
      started = true;
      managers.push(Manager(JOBS));
      managers.push(Manager(ARTICLES));
    }
  }

  function lock() {
    sdel(K.auth);
    location.reload();
  }

  $('gateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var until = Number(lget(K.lock) || 0);
    if (Date.now() < until) {
      setMsg('gateMsg', 'Too many attempts. Try again in ' + Math.ceil((until - Date.now()) / 1000) + ' seconds.');
      return;
    }
    var pw = $('gatePass').value;
    // Two-argument then: only a hashing failure is reported as a connection problem.
    sha256(SALT + pw).then(function (h) {
      $('gatePass').value = '';
      if (h === currentHash()) {
        lset(K.fails, '0');
        sset(K.auth, '1');
        setMsg('gateMsg', '');
        unlock();
        return;
      }
      var fails = Number(lget(K.fails) || 0) + 1;
      if (fails >= MAX_FAILS) {
        lset(K.lock, String(Date.now() + LOCK_MS));
        lset(K.fails, '0');
        setMsg('gateMsg', 'Too many attempts. Locked for 60 seconds.');
      } else {
        lset(K.fails, String(fails));
        setMsg('gateMsg', 'Incorrect password.');
      }
    }, function () {
      setMsg('gateMsg', 'This page needs a secure (https) connection to check the password.');
    });
  });

  $('lockBtn').addEventListener('click', lock);

  Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (tab) {
    tab.addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
        var on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      ['jobs', 'articles', 'settings'].forEach(function (name) {
        $('tab-' + name).hidden = name !== tab.getAttribute('data-tab');
      });
    });
  });

  /* --- GitHub connection form --- */
  function readGhForm() {
    var existing = ghCfg() || {};
    var folder = $('ghFolder').value.trim().replace(/^\/+/, '');
    if (folder && !/\/$/.test(folder)) folder += '/';
    return {
      owner: $('ghOwner').value.trim(),
      repo: $('ghRepo').value.trim(),
      branch: $('ghBranch').value.trim(),
      folder: folder,
      token: $('ghToken').value.trim() || existing.token || ''
    };
  }

  $('ghForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var c = readGhForm();
    if (!c.token) { setMsg('ghMsg', 'Please paste your access token.'); return; }
    setMsg('ghMsg', 'Checking connection…', true);
    ghTest(c).then(function (r) {
      lset(K.gh, JSON.stringify(c));
      loadGhForm();
      updatePubState();
      setMsg('ghMsg', 'Connected to ' + r.full_name + ' ✓ Auto-publish is now ON.', true);
      managers.forEach(function (m) { m.reload(); });
    }).catch(function (err) {
      setMsg('ghMsg', 'Could not connect: ' + err.message);
    });
  });

  $('ghTestBtn').addEventListener('click', function () {
    var c = readGhForm();
    if (!c.token) { setMsg('ghMsg', 'Please paste your access token first.'); return; }
    setMsg('ghMsg', 'Checking connection…', true);
    ghTest(c).then(function (r) {
      setMsg('ghMsg', 'Connection works: ' + r.full_name + ' ✓', true);
    }).catch(function (err) {
      setMsg('ghMsg', 'Could not connect: ' + err.message);
    });
  });

  $('ghDisconnectBtn').addEventListener('click', function () {
    if (!window.confirm('Disconnect auto-publish and remove the saved token from this browser?')) return;
    ldel(K.gh);
    loadGhForm();
    updatePubState();
    setMsg('ghMsg', 'Disconnected. The token was removed from this browser.', true);
    managers.forEach(function (m) { m.reload(); });
  });

  /* --- password + drafts --- */
  $('passForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var p1 = $('newPass').value, p2 = $('newPass2').value;
    if (p1.length < 10) { setMsg('passMsg', 'Password must be at least 10 characters.'); return; }
    if (p1 !== p2) { setMsg('passMsg', 'The two passwords do not match.'); return; }
    sha256(SALT + p1).then(function (h) {
      lset(K.pass, h);
      $('passForm').reset();
      setMsg('passMsg', 'Password updated for this browser.', true);
      var out = $('hashOut');
      out.hidden = false;
      out.textContent = "To use it on every device, replace the PASS_HASH line in scripts/admin.js with:\n\nvar PASS_HASH = '" + h + "';";
    }, function () {
      setMsg('passMsg', 'This page needs a secure (https) connection to change the password.');
    });
  });

  $('clearDraftsBtn').addEventListener('click', function () {
    if (window.confirm('Clear all unpublished drafts stored in this browser?')) {
      ldel(K.draftA);
      ldel(K.draftJ);
      location.reload();
    }
  });

  /* ---------- init ---------- */
  if (sget(K.auth) === '1') unlock();
})();
