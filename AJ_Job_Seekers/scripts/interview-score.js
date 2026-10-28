/* AJ Job Seekers – Interview scoring (pure functions, no DOM).
   Scores a spoken/typed answer on five criteria, then combines theory + interview into a verdict.
   This is a transparent heuristic: it rewards what interviewers reward (structure, specifics,
   relevance, right length, clean delivery). It cannot judge truthfulness or tone of voice. */
(function (root) {
  'use strict';

  var BANDS = { excellent: 85, good: 70, pass: 60 };
  var WEIGHTS = { theory: 0.3, interview: 0.7 };

  var FILLERS = ['um', 'uh', 'erm', 'er', 'hmm', 'like', 'you know', 'i mean', 'sort of', 'kind of', 'basically', 'actually', 'literally', 'okay so', 'so yeah'];
  var HEDGES = ['i think maybe', 'i guess', 'i am not sure', "i'm not sure", 'i do not know', "i don't know", 'maybe', 'perhaps', 'probably', 'hopefully', 'not really', 'i suppose'];
  var STOP = 'a an the and or but of to in on at for with from by is are was were be been being am i you he she it we they my me our your their this that these those as so if then than do does did have has had not no yes can could would should will just very really about into over after before when what which who how why where tell time me us'.split(' ');

  var CUES = {
    situation: ['when i', 'while i', 'at my', 'in my', 'during', 'last year', 'previously', 'at the time', 'there was', 'we had', 'i was working', 'i was asked', 'one day', 'once'],
    task: ['my task', 'my role', 'my responsibility', 'i was responsible', 'i had to', 'i needed to', 'i was asked to', 'the goal', 'the aim', 'my job was', 'i wanted to', 'i was in charge'],
    action: ['i decided', 'i started', 'i created', 'i organised', 'i organized', 'i planned', 'i checked', 'i asked', 'i explained', 'i worked', 'i introduced', 'i made', 'i spoke', 'i led', 'i set up', 'i developed', 'i fixed', 'i contacted', 'i trained', 'i built', 'i first', 'i then', 'i also', 'i prepared', 'i reviewed'],
    result: ['as a result', 'the result', 'result was', 'resulted in', 'this led to', 'we achieved', 'i achieved', 'successfully', 'improved', 'increased', 'reduced', 'saved', 'received praise', 'praised', 'learned', 'learnt', 'lesson', 'outcome', 'in the end', 'finally', 'delivered', 'on time', 'exceeded']
  };
  var SEQUENCE = ['first', 'firstly', 'second', 'secondly', 'then', 'next', 'after that', 'finally', 'because', 'therefore', 'so that', 'in order to', 'for example', 'for instance', 'such as'];
  var EVIDENCE = ['for example', 'for instance', 'such as', 'in my experience', 'at my', 'when i', 'i once', 'one time', 'on one occasion', 'specifically'];

  function norm(t) { return String(t || '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9'%\s-]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function words(t) { var n = norm(t); return n ? n.split(' ') : []; }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function countPhrase(text, phrase) {
    var m = (' ' + text + ' ').match(new RegExp('\\b' + esc(phrase) + '\\b', 'g'));
    return m ? m.length : 0;
  }
  function countAny(text, list) { var n = 0; list.forEach(function (p) { n += countPhrase(text, p); }); return n; }
  function hitAny(text, list) { var n = 0; list.forEach(function (p) { if (countPhrase(text, p)) n++; }); return n; }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function round(n) { return Math.round(n); }
  function keywords(t) {
    var seen = {}, out = [];
    words(t).forEach(function (w) { if (w.length > 3 && STOP.indexOf(w) < 0 && !seen[w]) { seen[w] = 1; out.push(w); } });
    return out;
  }
  function stem(w) { return w.replace(/(ing|ed|es|s|ly)$/, ''); }

  /* ------------------------------------------------------------------ one answer
     q:    { t, type }  type: open | beh | tech | motive | close
     opts: { vocab: [..], seconds: spoken time (number, optional), maxSeconds: 60 }  */
  function scoreAnswer(text, q, opts) {
    opts = opts || {};
    q = q || {};
    var type = q.type || 'beh';
    var raw = String(text || '');
    var n = norm(raw);
    var w = words(raw);
    var wc = w.length;
    var out = { words: wc, parts: {}, score: 0, notes: [], strengths: [], flags: {} };

    if (wc < 3) {
      out.parts = { content: 0, structure: 0, specifics: 0, relevance: 0, delivery: 0 };
      out.flags.noAnswer = true;
      out.notes.push('No answer was given.');
      return out;
    }

    /* 1. Content / length (0-100): ideal 70-140 words in a minute, 40+ acceptable */
    var content;
    var isClose = type === 'close';
    var lo = isClose ? 12 : 55, hi = isClose ? 90 : 150, min = isClose ? 4 : 18;
    if (wc >= lo && wc <= hi) content = 100;
    else if (wc > hi) content = clamp(100 - (wc - hi) * 0.6, 70, 100);
    else content = clamp(((wc - min) / (lo - min)) * 100, 8, 100);
    out.parts.content = round(content);
    if (wc < lo * 0.7) out.notes.push('Your answer was short. Aim for about 90 to 130 words (roughly a minute).');
    else if (wc >= lo) out.strengths.push('Good answer length.');

    /* 2. Structure (STAR / logical flow) */
    var star = 0, starHit = [];
    ['situation', 'task', 'action', 'result'].forEach(function (k) {
      if (hitAny(n, CUES[k])) { star++; starHit.push(k); }
    });
    var seq = Math.min(hitAny(n, SEQUENCE), 4);
    var structure;
    if (type === 'beh') structure = (star / 4) * 78 + (seq / 4) * 22;
    else if (type === 'open') structure = clamp(30 + hitAny(n, ['currently', 'i am', "i'm", 'graduat', 'experience', 'studied', 'worked', 'looking', 'seeking', 'my goal', 'in future', 'because']) * 11 + seq * 6, 0, 100);
    else if (isClose) structure = clamp(40 + hitAny(n, ['thank', 'question', 'ask', 'would like', 'could you', 'what', 'how']) * 12, 0, 100);
    else structure = clamp(((star >= 2 ? 40 : star * 18) + seq * 16 + hitAny(n, ['because', 'therefore', 'so that']) * 8), 0, 100);
    out.parts.structure = round(structure);
    out.flags.star = starHit;
    if (type === 'beh') {
      if (star >= 3) out.strengths.push('Clear STAR structure (' + starHit.join(', ') + ').');
      else {
        var miss = ['situation', 'task', 'action', 'result'].filter(function (k) { return starHit.indexOf(k) < 0; });
        out.notes.push('Use the STAR method. Missing: ' + miss.join(', ') + '.');
      }
    } else if (seq < 2 && type !== 'open' && !isClose) {
      out.notes.push('Walk through your reasoning step by step (first, then, because…).');
    }

    /* 3. Specifics: numbers, evidence phrases, first-person ownership */
    var nums = (raw.match(/\b\d+(\.\d+)?\s?(%|percent|people|staff|clients|customers|days|weeks|months|years|hours|students|patients)?\b/gi) || []).length +
      (n.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|fifty|hundred|thousand|half|double|triple)\b/g) || []).length +
      (n.match(/\b(within|before|by|after) (an? |the |one |two |three )?(hour|day|week|month|noon|morning|deadline|friday|monday)/g) || []).length;
    var evid = hitAny(n, EVIDENCE);
    var own = countPhrase(n, 'i') + countPhrase(n, "i'm") + countPhrase(n, "i've") + countPhrase(n, 'my');
    var ownRate = own / Math.max(wc, 1);
    var weRate = (countPhrase(n, 'we') + countPhrase(n, 'our')) / Math.max(wc, 1);
    var specifics = Math.min(nums, 3) * 18 + Math.min(evid, 3) * 14 + (ownRate > 0.04 ? 14 : ownRate > 0.02 ? 8 : 0) + (wc > 40 ? 6 : 0);
    if (weRate > 0.07 && weRate > ownRate) specifics -= 8;
    specifics = clamp(specifics, 0, 100);
    out.parts.specifics = round(specifics);
    if (nums >= 1) out.strengths.push('You used numbers or measurable detail.');
    else if (!isClose && type !== 'open') out.notes.push('Add a figure or concrete detail (for example “reduced errors by 20%”).');
    if (weRate > 0.07 && weRate > ownRate) out.notes.push('Say what YOU did, not only what “we” did.');

    /* 4. Relevance: overlap with the question's keywords + field vocabulary */
    var qk = keywords(q.t || '').map(stem);
    var ak = {};
    words(raw).forEach(function (x) { ak[stem(x)] = 1; });
    var overlap = 0;
    qk.forEach(function (k) { if (ak[k]) overlap++; });
    var qRatio = qk.length ? overlap / Math.min(qk.length, 6) : 0.5;
    var vocab = (opts.vocab || []);
    var vHits = 0;
    vocab.forEach(function (v) { if (countPhrase(n, norm(v))) vHits++; });
    var vScore = Math.min(vHits, 4) / 4;
    var relevance;
    if (type === 'tech') relevance = clamp(qRatio * 45 + vScore * 55, 0, 100);
    else if (isClose) relevance = clamp(50 + qRatio * 30 + vScore * 20, 0, 100);
    else relevance = clamp(25 + qRatio * 45 + vScore * 20 + (wc > 30 ? 10 : 0), 0, 100);
    if (wc >= 40 && relevance < 35) relevance = 35;
    out.parts.relevance = round(relevance);
    out.flags.vocabHits = vHits;
    if (type === 'tech' && vHits >= 3) out.strengths.push('Good use of field language.');
    else if (type === 'tech' && vHits < 2) out.notes.push('Use more of the specific terms and tools of your field.');
    if (qRatio < 0.15 && wc > 25) out.notes.push('Stay closer to what the question asked.');

    /* 5. Delivery: fillers, hedging, pace (if timing known) */
    var fill = countAny(n, FILLERS.filter(function (f) { return f !== 'like' && f !== 'actually'; })) + Math.max(0, countPhrase(n, 'like') - 2);
    var hedge = countAny(n, HEDGES);
    var fillRate = fill / Math.max(wc, 1);
    var delivery = 100 - Math.min(fillRate * 400, 45) - Math.min(hedge * 7, 28);
    var wpm = null;
    if (opts.seconds && opts.seconds > 8) {
      wpm = wc / (opts.seconds / 60);
      out.flags.wpm = round(wpm);
      if (wpm > 190) { delivery -= 12; out.notes.push('You spoke very fast. Slow down and pause between points.'); }
      else if (wpm < 65 && wc > 15) { delivery -= 8; out.notes.push('Your pace was slow. Try to keep the answer flowing.'); }
    }
    if (/\b(\w+)( \1\b){2,}/.test(n)) delivery -= 8;
    delivery = clamp(delivery, 0, 100);
    out.parts.delivery = round(delivery);
    out.flags.fillers = fill;
    out.flags.hedges = hedge;
    if (fill >= 4 || fillRate > 0.05) out.notes.push('Reduce filler words (“um”, “you know”). Pause silently instead.');
    if (hedge >= 2) out.notes.push('Avoid hedging words like “maybe” and “I guess”. Sound sure of your experience.');
    if (fill <= 1 && hedge === 0 && wc > 40) out.strengths.push('Clean, confident delivery.');

    /* weights by question type */
    var W = type === 'beh' ? { content: 0.2, structure: 0.3, specifics: 0.2, relevance: 0.15, delivery: 0.15 }
          : type === 'tech' ? { content: 0.2, structure: 0.15, specifics: 0.15, relevance: 0.35, delivery: 0.15 }
          : type === 'open' ? { content: 0.25, structure: 0.25, specifics: 0.15, relevance: 0.15, delivery: 0.2 }
          : isClose ? { content: 0.3, structure: 0.15, specifics: 0.05, relevance: 0.25, delivery: 0.25 }
          : { content: 0.25, structure: 0.2, specifics: 0.2, relevance: 0.2, delivery: 0.15 };
    var total = 0;
    Object.keys(W).forEach(function (k) { total += out.parts[k] * W[k]; });
    /* curve: a plain, unstructured answer lands in the 50s-60s; only well-built, specific answers reach 85+ */
    out.score = round(clamp(total * 1.3 - 22, 0, 100));
    if (wc < 12) out.score = Math.min(out.score, 30);
    else if (wc < 25 && !isClose) out.score = Math.min(out.score, 52);
    return out;
  }

  /* ------------------------------------------------------------------ band helpers */
  function band(score) {
    if (score >= BANDS.excellent) return { id: 'excellent', label: 'Excellent', pass: true };
    if (score >= BANDS.good) return { id: 'good', label: 'Pass – Good', pass: true };
    if (score >= BANDS.pass) return { id: 'pass', label: 'Pass', pass: true };
    return { id: 'fail', label: 'Not yet – Fail', pass: false };
  }

  /* ------------------------------------------------------------------ theory test
     answers: array of chosen indexes (or null) aligned with questions */
  function scoreTheory(questions, answers) {
    var right = 0, wrong = [];
    questions.forEach(function (q, i) {
      if (answers[i] === q.a) right++; else wrong.push(i);
    });
    var pct = questions.length ? round((right / questions.length) * 100) : 0;
    var b = pct >= 85 ? { id: 'excellent', label: 'Excellent', pass: true } : pct >= 60 ? { id: 'pass', label: 'Pass', pass: true } : { id: 'fail', label: 'Fail', pass: false };
    return { right: right, total: questions.length, pct: pct, band: b, wrong: wrong };
  }

  /* ------------------------------------------------------------------ whole interview
     items: [{ q, text, seconds, result? }]  (unanswered => empty text)
     asked: how many questions were planned; unanswered/unasked count as 0 only if they were asked. */
  function scoreInterview(items, opts) {
    opts = opts || {};
    var scored = items.map(function (it) {
      var r = it.result || scoreAnswer(it.text, it.q, { vocab: opts.vocab, seconds: it.seconds });
      return { q: it.q, text: it.text, seconds: it.seconds, result: r };
    });
    var answered = scored.filter(function (s) { return !s.result.flags.noAnswer; });
    var avg = scored.length ? scored.reduce(function (a, s) { return a + s.result.score; }, 0) / scored.length : 0;
    var criteria = {};
    ['content', 'structure', 'specifics', 'relevance', 'delivery'].forEach(function (k) {
      criteria[k] = answered.length ? round(answered.reduce(function (a, s) { return a + s.result.parts[k]; }, 0) / answered.length) : 0;
    });
    var completion = scored.length ? answered.length / scored.length : 0;
    var score = round(avg);
    return {
      score: score, band: band(score), items: scored, criteria: criteria,
      answered: answered.length, asked: scored.length, completion: round(completion * 100)
    };
  }

  /* ------------------------------------------------------------------ overall verdict */
  function overall(theory, interview) {
    var t = theory ? theory.pct : null;
    var i = interview ? interview.score : null;
    var score;
    if (t != null && i != null) score = round(t * WEIGHTS.theory + i * WEIGHTS.interview);
    else score = round(t != null ? t : (i != null ? i : 0));
    var b = band(score);
    var gates = [];
    if (t != null && t < BANDS.pass) gates.push('theory');
    if (i != null && i < BANDS.pass) gates.push('interview');
    var verdict = b;
    if (gates.length && b.pass) verdict = { id: 'fail', label: 'Not yet – Fail', pass: false };
    if (interview && interview.completion < 50 && verdict.pass) verdict = { id: 'fail', label: 'Not yet – Fail', pass: false };
    return { score: score, band: verdict, gates: gates };
  }

  /* ------------------------------------------------------------------ coaching summary */
  var CRIT_LABEL = { content: 'Answer length and completeness', structure: 'Structure (STAR, logical flow)', specifics: 'Specific examples and numbers', relevance: 'Relevance to the question and field', delivery: 'Delivery (fillers, hedging, pace)' };
  var CRIT_TIP = {
    content: 'Practise answering in 90 to 130 words, which is about one minute.',
    structure: 'Rehearse the STAR method: Situation, Task, Action, Result. Finish every story with the result.',
    specifics: 'Add numbers, names of tools and one real example to each answer.',
    relevance: 'Answer the exact question asked, and use the terms of your field.',
    delivery: 'Replace filler words with short silent pauses, and speak with certainty.'
  };
  function summary(interview) {
    var c = interview.criteria;
    var keys = Object.keys(c).sort(function (a, b) { return c[b] - c[a]; });
    var best = keys[0], worst = keys[keys.length - 1];
    var strengths = [], focus = [];
    keys.slice(0, 2).forEach(function (k) { if (c[k] >= 65) strengths.push(CRIT_LABEL[k] + ' (' + c[k] + '%)'); });
    keys.slice(-2).reverse().forEach(function (k) { if (c[k] < 75) focus.push({ label: CRIT_LABEL[k], score: c[k], tip: CRIT_TIP[k] }); });
    return { best: best, worst: worst, strengths: strengths, focus: focus, labels: CRIT_LABEL };
  }

  root.IV_SCORE = {
    BANDS: BANDS, WEIGHTS: WEIGHTS, CRIT_LABEL: CRIT_LABEL,
    scoreAnswer: scoreAnswer, scoreTheory: scoreTheory, scoreInterview: scoreInterview,
    overall: overall, band: band, summary: summary
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.IV_SCORE;
})(typeof window !== 'undefined' ? window : globalThis);
