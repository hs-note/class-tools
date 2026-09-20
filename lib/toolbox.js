(() => {
  'use strict';

  // ここに1件足すだけで、トップ（入口）と科目ページの両方に出ます。QRは自動で作られます。
  const TOOLS = [
    {
      subject: 'joho1',
      path: 'sound/',
      unit: '音のデジタル化',
      title: '音のデジタル化シミュレーター',
      desc: '標本化・量子化・符号化を、グラフの変化と音で確かめる。送る 0 と 1 の列や、データ量の計算も出る。',
      feats: ['グラフ', '音を聞く', '自分の声を録音', 'データ量の計算']
    },
    {
      subject: 'joho1',
      path: 'color/',
      unit: '画像と動画のデジタル化',
      title: '色の表現シミュレーター',
      desc: '光の三原色を混ぜて色を作り、色を数と 0・1 で表す。階調（ビット数）を変えると、見え方とデータ量がどう変わるかも確かめる。',
      feats: ['光の三原色', '階調', '16進数', 'データ量の計算']
    },
    {
      subject: 'joho1',
      path: 'image/',
      unit: '画像と動画のデジタル化',
      title: '画像のデジタル化シミュレーター',
      desc: '画像をマス目（画素）に区切り、色を数と 0・1 に変えるようすを確かめる。解像度クイズや、画像・動画のデータ量の計算も出る。',
      feats: ['解像度クイズ', '白黒・カラー', '自分の写真で試す', 'データ量の計算（動画も）']
    },
    {
      subject: 'joho2',
      path: 'interval/',
      unit: '統計的推測',
      title: '信頼区間シミュレーター',
      desc: '「10.38〜11.11」のような区間が何を意味するのかを、何度も引き直して確かめる。区間は測定値の入る範囲ではない、が図で分かる。',
      feats: ['1回ぶんを詳しく', '20回ぶん引く', '輪投げで見る', '当たりの本数を数える']
    }
  ];

  const SUBJECTS = [
    {
      key: 'joho1',
      label: '情報Ⅰ',
      path: 'joho1/',
      desc: 'デジタル化のしくみを、音・色・画像で確かめる教材です。'
    },
    {
      key: 'joho2',
      label: '情報Ⅱ',
      path: 'joho2/',
      desc: 'データサイエンスの考え方を、図を動かして確かめる教材です。'
    }
  ];

  const BASE = 'https://hs-note.github.io/class-tools/';
  const page = document.body.dataset.page || 'home';        // 'home' | 科目キー
  const PREFIX = page === 'home' ? '' : '../';              // 科目ページは1つ下の階層

  const subjectLabel = key => (SUBJECTS.find(s => s.key === key) || {}).label || key;

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  function qrSvg(text, label) {
    if (typeof qrcode !== 'function') return null;
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount(), q = 4, size = n + q * 2;
    let d = '';
    for (let r = 0; r < n; r++) {
      let c = 0;
      while (c < n) {
        if (!qr.isDark(r, c)) { c++; continue; }
        const start = c;
        while (c < n && qr.isDark(r, c)) c++;
        d += `M${start + q} ${r + q}h${c - start}v1h-${c - start}z`;
      }
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
    const bg = document.createElementNS(svg.namespaceURI, 'rect');
    bg.setAttribute('width', size); bg.setAttribute('height', size); bg.setAttribute('fill', '#ffffff');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', d); path.setAttribute('fill', '#14202B');
    svg.append(bg, path);
    return svg;
  }

  function fillQr(box, url, label) {
    box.replaceChildren();
    let svg = null;
    try { svg = qrSvg(url, label); } catch (e) { svg = null; }
    if (svg) box.append(svg);
    else box.append(el('p', 'qr-fail', 'QR コードを表示できませんでした。下の URL を使ってください。'));
  }

  // URLを「/」の直後だけで折り返す
  function urlText(node, url) {
    node.replaceChildren();
    const parts = url.replace(/^https:\/\//, '').split('/');
    parts.forEach((p, i) => {
      if (i < parts.length - 1) node.append(p + '/', document.createElement('wbr'));
      else if (p) node.append(p);
    });
    return node;
  }

  function tagRow(subjectLabelText, unit) {
    const p = el('p', 'tag');
    p.append(el('span', 'subject', subjectLabelText), el('span', null, unit));
    return p;
  }

  // ─ QRを大きく表示 ─
  const overlay = document.getElementById('overlay');
  let lastFocus = null;

  function openBig({ tagText, unit, title, url }) {
    document.getElementById('bigTag').replaceWith(Object.assign(tagRow(tagText, unit), { id: 'bigTag' }));
    document.getElementById('bigTitle').textContent = title;
    urlText(document.getElementById('bigUrl'), url);
    fillQr(document.getElementById('bigQr'), url, `${title}を開くQRコード`);
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('closeBig').focus();
  }
  function closeBig() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  if (overlay) {
    document.getElementById('closeBig').addEventListener('click', closeBig);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeBig(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) closeBig(); });
  }

  // ─ 入口ページ（科目を選ぶ） ─
  function renderHome(list) {
    const frag = document.createDocumentFragment();
    SUBJECTS.forEach(s => {
      const url = BASE + s.path;
      const n = TOOLS.filter(t => t.subject === s.key).length;
      const card = el('article', 'subject-card');
      const open = el('a', 'btn primary', `${s.label}の道具箱をひらく`);
      open.href = s.path;
      const bigBtn = el('button', 'btn', 'QR を大きく表示');
      bigBtn.type = 'button';
      bigBtn.addEventListener('click', () => openBig({
        tagText: s.label, unit: '道具箱', title: `${s.label}の道具箱`, url
      }));
      const actions = el('div', 'actions');
      actions.append(open, bigBtn);

      const fig = el('figure', 'qr');
      const box = el('div', 'qr-img');
      fillQr(box, url, `${s.label}の道具箱を開くQRコード`);
      fig.append(box, urlText(el('figcaption'), url));

      card.append(
        el('h2', null, `${s.label}の道具箱`),
        el('p', 'desc', s.desc),
        el('p', 'count', `教材 ${n} 本`),
        actions,
        fig
      );
      frag.append(card);
    });
    list.className = 'subjects';
    list.append(frag);
  }

  // ─ 科目ページ（教材の一覧） ─
  function renderSubject(list, key) {
    const frag = document.createDocumentFragment();
    TOOLS.filter(t => t.subject === key).forEach(t => {
      const url = BASE + t.path;
      const card = el('article', 'tool');
      const body = el('div', 'tool-body');
      const feats = el('ul', 'feats');
      t.feats.forEach(f => feats.append(el('li', null, f)));
      const actions = el('div', 'actions');
      const open = el('a', 'btn primary', '開く');
      open.href = PREFIX + t.path;
      const bigBtn = el('button', 'btn', 'QR を大きく表示');
      bigBtn.type = 'button';
      bigBtn.addEventListener('click', () => openBig({
        tagText: subjectLabel(t.subject), unit: t.unit, title: t.title, url
      }));
      actions.append(open, bigBtn);
      body.append(tagRow(subjectLabel(t.subject), t.unit), el('h2', null, t.title), el('p', 'desc', t.desc), feats, actions);

      const fig = el('figure', 'qr');
      const box = el('div', 'qr-img');
      fillQr(box, url, `${t.title}を開くQRコード`);
      fig.append(box, urlText(el('figcaption'), url));

      card.append(body, fig);
      frag.append(card);
    });
    list.append(frag);
  }

  const list = document.getElementById('list');
  if (!list) return;
  list.replaceChildren();
  if (page === 'home') renderHome(list);
  else renderSubject(list, page);
})();
