(function() {
  if (document.getElementById('_ann_panel')) return;

  var style = document.createElement('style');
  style.textContent = [
    '#_ann_overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:2147483640;opacity:0;pointer-events:none;transition:opacity .3s}',
    '#_ann_overlay.on{opacity:1;pointer-events:auto}',
    '#_ann_drawer{position:fixed;top:0;right:0;bottom:0;width:88%;max-width:380px;background:#fafafa;z-index:2147483641;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;font-family:-apple-system,sans-serif;box-shadow:-8px 0 30px rgba(0,0,0,.15)}',
    '#_ann_drawer.on{transform:translateX(0)}',
    '#_ann_dh{padding:16px 18px 14px;border-bottom:1px solid #e5e7eb;background:#fff;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}',
    '#_ann_dtitle{font-size:17px;font-weight:700;color:#111;display:flex;align-items:center;gap:8px}',
    '#_ann_dcount{font-size:12px;background:#fef08a;color:#713f12;border-radius:10px;padding:2px 8px;border:1px solid #eab308;font-weight:600}',
    '#_ann_dclose{background:transparent;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;color:#6b7280;font-size:20px;display:flex;align-items:center;justify-content:center}',
    '#_ann_dlist{flex:1;overflow-y:auto;padding:12px 14px 90px}',
    '#_ann_dfooter{position:absolute;bottom:0;left:0;right:0;background:#fff;padding:12px 14px;border-top:1px solid #e5e7eb}',
    '#_ann_export{width:100%;background:#111;color:#fff;border:none;padding:13px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif}',
    '#_ann_export:disabled{background:#e5e7eb;color:#9ca3af;cursor:not-allowed}',
    '#_ann_panel{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:3px solid #6366f1;z-index:2147483639;font-family:-apple-system,sans-serif;box-shadow:0 -8px 30px rgba(0,0,0,.12);transform:translateY(100%);transition:transform .3s cubic-bezier(.34,1.56,.64,1)}',
    '#_ann_panel.on{transform:translateY(0)}',
    '#_ann_ptop{padding:12px 14px 0}',
    '#_ann_info{font-size:11px;color:#6366f1;background:#eef2ff;padding:6px 10px;border-radius:6px;margin-bottom:8px;font-family:Courier New,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#_ann_ttoggle{display:flex;align-items:center;gap:6px;font-size:12px;color:#6366f1;cursor:pointer;padding:4px 0 10px;user-select:none}',
    '#_ann_ticon{font-size:9px;transition:transform .2s;display:inline-block}',
    '#_ann_ticon.on{transform:rotate(90deg)}',
    '#_ann_tree{display:none;background:#0f172a;padding:10px 12px;max-height:180px;overflow-y:auto;font-family:Courier New,monospace;font-size:11px;line-height:2;color:#94a3b8;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b}',
    '#_ann_tree.on{display:block}',
    '._ann_tn{display:block;cursor:pointer;padding:0 4px;border-radius:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '._ann_tn:hover{background:rgba(99,102,241,.2)}',
    '._ann_tn.ap{background:rgba(99,102,241,.25);color:#c7d2fe}',
    '._ann_tn.as{background:rgba(245,158,11,.2);color:#fde68a}',
    '._ann_tg{color:#7dd3fc}._ann_ta{color:#86efac}._ann_tv{color:#fca5a5}',
    '#_ann_pbot{padding:10px 14px 14px}',
    '._ann_inp{width:100%;border:1.5px solid #e5e7eb;border-radius:8px;padding:9px 12px;font-size:14px;font-family:-apple-system,sans-serif;color:#111;outline:none;margin-bottom:8px;background:#fff}',
    '._ann_inp:focus{border-color:#6366f1}',
    '#_ann_desc{width:100%;height:50px;border:1.5px solid #e5e7eb;border-radius:8px;padding:9px 12px;font-size:13px;font-family:-apple-system,sans-serif;resize:none;color:#111;outline:none;background:#fff}',
    '#_ann_desc:focus{border-color:#6366f1}',
    '#_ann_btns{display:flex;gap:8px;margin-top:8px}',
    '#_ann_save{flex:1;background:#6366f1;color:#fff;border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif}',
    '#_ann_cancel{flex:1;background:#f3f4f6;color:#374151;border:none;padding:12px;border-radius:8px;font-size:14px;cursor:pointer;font-family:-apple-system,sans-serif}',
    '#_ann_toolbar{position:fixed;top:12px;right:12px;display:flex;align-items:center;gap:8px;z-index:2147483645}',
    '#_ann_launch{background:#6366f1;color:#fff;border:none;padding:7px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;box-shadow:0 2px 8px rgba(99,102,241,.4)}',
    '#_ann_launch.active{background:#dc2626;box-shadow:0 2px 8px rgba(220,38,38,.4)}',
    '#_ann_badge{background:#fef08a;color:#713f12;border-radius:20px;padding:6px 14px;font-size:13px;font-weight:600;border:1px solid #eab308;cursor:pointer;font-family:-apple-system,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15)}',
    '.ann-sticky{position:absolute;background:#fef08a;border:1px solid #eab308;padding:6px 10px;border-radius:8px;font-size:11px;font-weight:600;font-family:-apple-system,sans-serif;max-width:160px;box-shadow:0 4px 12px rgba(0,0,0,.15);z-index:2147483630;line-height:1.3;color:#713f12;cursor:pointer;pointer-events:auto}',
    '._ann_nc{background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;overflow:hidden}',
    '._ann_nc.op{box-shadow:0 4px 14px rgba(99,102,241,.12);border-color:#c7d2fe}',
    '._ann_nh{padding:12px 14px;cursor:pointer;display:flex;align-items:center;gap:10px;user-select:none}',
    '._ann_nhc{flex:1;min-width:0}',
    '._ann_ntit{font-size:14px;font-weight:600;color:#111;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '._ann_ncls{font-size:11px;color:#6366f1;font-family:Courier New,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '._ann_nchev{color:#9ca3af;font-size:12px;transition:transform .2s;flex-shrink:0}',
    '._ann_nc.op ._ann_nchev{transform:rotate(180deg);color:#6366f1}',
    '._ann_nb{max-height:0;overflow:hidden;transition:max-height .3s ease}',
    '._ann_nc.op ._ann_nb{max-height:400px}',
    '._ann_nbi{padding:12px 14px 14px;border-top:1px solid #f3f4f6}',
    '._ann_ndesc{font-size:13px;color:#4b5563;line-height:1.5;margin-bottom:12px;white-space:pre-wrap;word-break:break-word}',
    '._ann_ndel{background:#fef2f2;color:#dc2626;border:1px solid #fecaca;padding:6px 12px;border-radius:6px;font-size:12px;cursor:pointer;float:right;font-family:-apple-system,sans-serif}',
    '._ann_empty{text-align:center;color:#9ca3af;font-size:13px;padding:60px 20px;line-height:1.6}',
    'body.ann-mode *{cursor:crosshair !important}',
    'body.ann-mode #_ann_toolbar,body.ann-mode #_ann_toolbar *,body.ann-mode #_ann_panel,body.ann-mode #_ann_panel *,body.ann-mode #_ann_overlay,body.ann-mode #_ann_drawer,body.ann-mode #_ann_drawer *{cursor:default !important}'
  ].join('');
  document.head.appendChild(style);

  // Toolbar (launch + badge)
  var toolbar = el('div', {id:'_ann_toolbar'});
  var badge = el('div', {id:'_ann_badge'}, '0 notes');
  badge.onclick = function() { openDrawer(0); };
  var launchBtn = el('button', {id:'_ann_launch'}, 'Launch');
  launchBtn.onclick = toggleAnnotator;
  toolbar.appendChild(badge);
  toolbar.appendChild(launchBtn);
  document.body.appendChild(toolbar);

  // Bottom panel
  var panel = el('div', {id:'_ann_panel'});
  panel.innerHTML = [
    '<div id="_ann_ptop">',
    '<div id="_ann_info">Tap any element on the page</div>',
    '<div id="_ann_ttoggle"><span id="_ann_ticon">&#9654;</span>&nbsp;HTML structure</div>',
    '</div>',
    '<div id="_ann_tree"></div>',
    '<div id="_ann_pbot">',
    '<input type="text" class="_ann_inp" id="_ann_title" placeholder="Title (e.g. Spacing issue)">',
    '<textarea id="_ann_desc" class="_ann_inp" placeholder="Description..."></textarea>',
    '<div id="_ann_btns">',
    '<button id="_ann_save">Save note</button>',
    '<button id="_ann_cancel">Cancel</button>',
    '</div></div>'
  ].join('');
  document.body.appendChild(panel);

  var overlay = el('div', {id:'_ann_overlay'});
  overlay.onclick = closeDrawer;
  document.body.appendChild(overlay);

  var drawer = el('div', {id:'_ann_drawer'});
  drawer.innerHTML = [
    '<div id="_ann_dh">',
    '<div id="_ann_dtitle">Notes <span id="_ann_dcount">0</span></div>',
    '<button id="_ann_dclose">&#10005;</button>',
    '</div>',
    '<div id="_ann_dlist"></div>',
    '<div id="_ann_dfooter"><button id="_ann_export" disabled>&#11015; Export all notes</button></div>'
  ].join('');
  document.body.appendChild(drawer);

  g('_ann_ttoggle').onclick = toggleTree;
  g('_ann_save').onclick = saveNote;
  g('_ann_cancel').onclick = closePanel;
  g('_ann_dclose').onclick = closeDrawer;
  g('_ann_export').onclick = exportNotes;
  document.addEventListener('click', onPageClick, true);

  var isOn = false;
  var treeOpen = false;
  var primaryEl = null;
  var secondaryEl = null;
  var ancestors = [];
  var notes = [];
  var openCardId = null;

  function toggleAnnotator() {
    if (isOn) {
      closePanel();
    } else {
      openPanel();
    }
  }

  function openPanel() {
    isOn = true;
    document.body.classList.add('ann-mode');
    g('_ann_panel').classList.add('on');
    g('_ann_launch').textContent = 'Stop';
    g('_ann_launch').classList.add('active');
  }

  function closePanel() {
    isOn = false;
    document.body.classList.remove('ann-mode');
    g('_ann_panel').classList.remove('on');
    g('_ann_launch').textContent = 'Launch';
    g('_ann_launch').classList.remove('active');
    g('_ann_info').textContent = 'Tap any element on the page';
    g('_ann_title').value = '';
    g('_ann_desc').value = '';
    clearHL();
    primaryEl = null; secondaryEl = null; ancestors = [];
    if (treeOpen) {
      treeOpen = false;
      g('_ann_tree').classList.remove('on');
      g('_ann_ticon').classList.remove('on');
    }
  }

  function clearHL() {
    document.querySelectorAll('._ann_p,._ann_s').forEach(function(e) {
      e.classList.remove('_ann_p', '_ann_s');
      e.style.outline = '';
      e.style.outlineOffset = '';
      e.style.background = '';
    });
    if (primaryEl) { primaryEl.style.outline = ''; primaryEl.style.outlineOffset = ''; }
    if (secondaryEl) { secondaryEl.style.outline = ''; secondaryEl.style.outlineOffset = ''; secondaryEl.style.background = ''; }
  }

  function onPageClick(e) {
    if (!isOn) return;
    if (g('_ann_panel').contains(e.target)) return;
    if (g('_ann_drawer').contains(e.target)) return;
    if (g('_ann_toolbar').contains(e.target)) return;
    if (e.target.classList && e.target.classList.contains('ann-sticky')) return;
    e.preventDefault();
    e.stopPropagation();
    clearHL();
    secondaryEl = null;
    primaryEl = e.target;
    primaryEl.style.outline = '2px dashed #6366f1';
    primaryEl.style.outlineOffset = '2px';
    updateInfo(primaryEl, 'primary');
    buildAncestors(primaryEl);
    if (treeOpen) renderTree();
  }

  function updateInfo(el, type) {
    var tag = el.tagName.toLowerCase();
    var cls = (el.className || '').trim();
    var eid = el.id ? '#' + el.id : '';
    var prefix = type === 'secondary' ? '[secondary] ' : '[primary] ';
    g('_ann_info').textContent = prefix + '<' + tag + eid + '> .' + (cls || '-');
  }

  function buildAncestors(el) {
    ancestors = [];
    var cur = el;
    var depth = 0;
    while (cur && cur !== document.body.parentElement && depth < 20) {
      ancestors.unshift(cur);
      cur = cur.parentElement;
      depth++;
    }
  }

  function toggleTree() {
    treeOpen = !treeOpen;
    g('_ann_tree').classList.toggle('on', treeOpen);
    g('_ann_ticon').classList.toggle('on', treeOpen);
    if (treeOpen && primaryEl) renderTree();
  }

  function renderTree() {
    var tree = g('_ann_tree');
    if (!primaryEl) { tree.innerHTML = '<span style="color:#475569;font-size:11px">Select an element first</span>'; return; }
    var html = '';
    ancestors.forEach(function(node, depth) {
      var indent = '';
      for (var i = 0; i < depth; i++) indent += '&nbsp;&nbsp;';
      var tag = node.tagName.toLowerCase();
      var nid = node.id ? ' <span class="_ann_ta">id</span>=<span class="_ann_tv">"' + esc(node.id) + '"</span>' : '';
      var rawCls = (node.className || '').trim();
      var ncls = rawCls ? ' <span class="_ann_ta">class</span>=<span class="_ann_tv">"' + esc(rawCls) + '"</span>' : '';
      var ac = node === primaryEl ? ' ap' : (node === secondaryEl ? ' as' : '');
      html += '<span class="_ann_tn' + ac + '" onclick="_annSelectTree(' + depth + ')">'
            + indent + '<span class="_ann_tg">&lt;' + tag + '</span>' + nid + ncls + '<span class="_ann_tg">&gt;</span></span>';
    });
    tree.innerHTML = html;
    var active = tree.querySelector('.ap, .as');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  window._annSelectTree = function(depth) {
    var target = ancestors[depth];
    if (!target || target === primaryEl) return;
    if (secondaryEl) { secondaryEl.style.outline = ''; secondaryEl.style.outlineOffset = ''; secondaryEl.style.background = ''; }
    secondaryEl = target;
    secondaryEl.style.outline = '2px solid #f59e0b';
    secondaryEl.style.outlineOffset = '2px';
    secondaryEl.style.background = 'rgba(245,158,11,0.08)';
    updateInfo(secondaryEl, 'secondary');
    renderTree();
  };

  function saveNote() {
    var title = g('_ann_title').value.trim();
    var desc = g('_ann_desc').value.trim();
    var target = secondaryEl || primaryEl;
    if (!title) { alert('Please add a title'); return; }
    if (!target) { alert('Please tap an element first'); return; }
    var tag = target.tagName.toLowerCase();
    var cls = (target.className || '').trim();
    var eid = target.id || '';
    var selector = (eid ? '#' + eid : '') + (cls ? '.' + cls.split(/\s+/).join('.') : '') || tag;
    var noteId = Date.now();
    notes.push({ id: noteId, title: title, desc: desc, selector: selector, tag: tag, cls: cls, timestamp: new Date().toISOString() });
    var sticky = document.createElement('div');
    sticky.className = 'ann-sticky';
    sticky.textContent = title;
    sticky.setAttribute('data-note-id', String(noteId));
    sticky.onclick = (function(id) { return function(e) { e.stopPropagation(); openDrawer(id); }; })(noteId);
    var rect = target.getBoundingClientRect();
    sticky.style.top = (window.scrollY + rect.top) + 'px';
    sticky.style.left = Math.min(window.scrollX + rect.right + 8, window.innerWidth - 170) + 'px';
    document.body.appendChild(sticky);
    refreshBadge();
    g('_ann_title').value = '';
    g('_ann_desc').value = '';
    g('_ann_info').textContent = 'Saved! Tap another element';
    clearHL();
    primaryEl = null; secondaryEl = null;
  }

  function refreshBadge() {
    var n = notes.length;
    g('_ann_badge').textContent = n + (n === 1 ? ' note' : ' notes');
    g('_ann_dcount').textContent = n;
    g('_ann_export').disabled = n === 0;
  }

  function openDrawer(focusId) {
    g('_ann_overlay').classList.add('on');
    g('_ann_drawer').classList.add('on');
    if (focusId) openCardId = focusId;
    renderDrawer();
    if (focusId) {
      setTimeout(function() {
        var card = document.querySelector('._ann_nc[data-id="' + focusId + '"]');
        if (card) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 80);
    }
  }

  function closeDrawer() {
    g('_ann_overlay').classList.remove('on');
    g('_ann_drawer').classList.remove('on');
    openCardId = null;
  }

  function renderDrawer() {
    var list = g('_ann_dlist');
    if (notes.length === 0) {
      list.innerHTML = '<div class="_ann_empty">&#128221;<br><br>No notes yet.<br>Launch annotator and tap elements.</div>';
      return;
    }
    var html = '';
    notes.forEach(function(n) {
      var isOpen = n.id === openCardId;
      html += '<div class="_ann_nc' + (isOpen ? ' op' : '') + '" data-id="' + n.id + '">'
            +   '<div class="_ann_nh" onclick="_annToggleCard(' + n.id + ')">'
            +     '<div class="_ann_nhc">'
            +       '<div class="_ann_ntit">' + esc(n.title) + '</div>'
            +       '<div class="_ann_ncls">' + esc(n.selector) + '</div>'
            +     '</div>'
            +     '<span class="_ann_nchev">&#9660;</span>'
            +   '</div>'
            +   '<div class="_ann_nb"><div class="_ann_nbi">'
            +     '<div class="_ann_ndesc">' + (n.desc ? esc(n.desc) : '<em style="color:#9ca3af">No description</em>') + '</div>'
            +     '<button class="_ann_ndel" onclick="_annDeleteNote(' + n.id + ')">&#128465; Delete</button>'
            +   '</div></div>'
            + '</div>';
    });
    list.innerHTML = html;
  }

  window._annToggleCard = function(id) {
    openCardId = (openCardId === id) ? null : id;
    renderDrawer();
  };

  window._annDeleteNote = function(id) {
    var sticky = document.querySelector('.ann-sticky[data-note-id="' + String(id) + '"]');
    if (sticky) sticky.remove();
    notes = notes.filter(function(n) { return n.id !== id; });
    if (openCardId === id) openCardId = null;
    refreshBadge();
    renderDrawer();
  };

  function exportNotes() {
    if (!notes.length) return;
    var data = { url: window.location.href, exported: new Date().toISOString(), count: notes.length,
      notes: notes.map(function(n) { return { title: n.title, description: n.desc, selector: n.selector, tag: n.tag, cls: n.cls, timestamp: n.timestamp }; }) };
    var json = JSON.stringify(data, null, 2);
    var btn = g('_ann_export');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(json).then(function() { showCopied(btn); }).catch(function() { fallback(json, btn); });
    } else { fallback(json, btn); }
  }

  function fallback(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); showCopied(btn); } catch(e) { btn.textContent = 'Failed'; }
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    var orig = btn.innerHTML;
    btn.innerHTML = '&#10003; Copied!';
    btn.style.background = '#16a34a';
    setTimeout(function() { btn.innerHTML = orig; btn.style.background = '#111'; }, 2500);
  }

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k) { e.setAttribute(k, attrs[k]); });
    if (text) e.textContent = text;
    return e;
  }
  function g(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

})();
