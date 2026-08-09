// ============================================================
// 个人工作台 - App逻辑 (v3)
// 细化任务 + 小树成长 + 每日内容 + 理财
// ============================================================
(function () {
  'use strict';

  // === 工具函数 ===
  function $(id) { return document.getElementById(id); }
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function showToast(msg, duration) { var t = $('toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, duration || 2200); }
  function shuffle(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // === LocalStorage 封装 ===
  var STORE_KEYS = {
    tasks: 'wb_tasks',        // 替代 checkins
    tree: 'wb_tree',          // 小树状态 {drops, xp, species, matured}
    dailyNews: 'wb_daily_news',
    dailyQuotes: 'wb_daily_quotes',
    dailyTheories: 'wb_daily_theories',
    dailyFinance: 'wb_daily_finance',
    dailyDate: 'wb_daily_date',
    dailyTasks: 'wb_daily_tasks',
    streak: 'wb_streak',
    streaks: 'wb_streaks',
    notes: 'wb_notes',
    phases: 'wb_phases',
    letters: 'wb_letters',
    quoteIdx: 'wb_quote_idx',
    theoryIdx: 'wb_theory_idx',
    financeIdx: 'wb_finance_idx',
    bookIdx: 'wb_book_idx',
    monthlyBookIdx: 'wb_monthly_book_idx',
    monthlyBookMonth: 'wb_monthly_book_month',
    pwaDismissed: 'wb_pwa_dismissed'
  };
  function getData(key) { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { return {}; } }
  function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  // === 页面导航 ===
  window.navigate = function (page) {
    var pages = document.querySelectorAll('.page');
    var navs = document.querySelectorAll('.nav-item');
    pages.forEach(function (p) { p.classList.remove('active'); });
    navs.forEach(function (n) { n.classList.remove('active'); });
    var target = $('page-' + page);
    if (target) target.classList.add('active');
    var navTarget = document.querySelector('.nav-item[data-page="' + page + '"]');
    if (navTarget) navTarget.classList.add('active');
    window.scrollTo(0, 0);
    if (page === 'drawing') renderStatsChart();
  };

  // === 首页：日期和问候 ===
  function initHeader() {
    var now = new Date();
    var wd = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var dateEl = $('hero-date');
    var greetEl = $('hero-greeting');
    if (dateEl) dateEl.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + wd[now.getDay()];
    if (greetEl) {
      var h = now.getHours();
      var g = h < 6 ? '夜深了，注意休息' : h < 9 ? '早上好，新的一天' : h < 12 ? '上午好，保持专注' : h < 14 ? '中午好，休息一下' : h < 18 ? '下午好，继续加油' : h < 22 ? '晚上好，今日如何' : '夜晚好，回顾成长';
      greetEl.textContent = g;
    }
  }

  // =========================================================
  // === 小树成长系统 ===
  // =========================================================

  function getTree() {
    var tree = getData(STORE_KEYS.tree);
    var defaults = { drops: 0, xp: 0, species: 'default', matured: 0, unlocked: ['default'], rewarded: false };
    Object.keys(defaults).forEach(function (k) {
      if (tree[k] === undefined) tree[k] = defaults[k];
    });
    if (!Array.isArray(tree.unlocked)) tree.unlocked = ['default'];
    if (tree.unlocked.indexOf('default') === -1) tree.unlocked.unshift('default');
    return tree;
  }
  function saveTree(tree) { setData(STORE_KEYS.tree, tree); }

  function getTreeStage(drops) {
    var stage = 0;
    for (var i = 0; i < GROWTH_STAGES.length; i++) {
      if (drops >= GROWTH_STAGES[i].dropsNeeded) stage = i;
    }
    return stage;
  }

  function getTreeEmoji(stage, speciesId) {
    var species = TREE_SPECIES.find(function (s) { return s.id === speciesId; }) || TREE_SPECIES[0];
    if (stage === 0) return GROWTH_STAGES[0].emoji;
    if (stage === 1) return species.sprout;
    if (stage === 2) return species.seedling;
    if (stage === 3) return species.young;
    return species.emoji;
  }

  function renderTree() {
    var tree = getTree();
    var stage = getTreeStage(tree.drops);
    var stageInfo = GROWTH_STAGES[stage];
    var species = TREE_SPECIES.find(function (s) { return s.id === tree.species; }) || TREE_SPECIES[0];
    var emoji = getTreeEmoji(stage, tree.species);

    var nextStage = GROWTH_STAGES[stage + 1];
    var progressPct;
    if (nextStage) {
      var range = nextStage.dropsNeeded - stageInfo.dropsNeeded;
      var current = tree.drops - stageInfo.dropsNeeded;
      progressPct = Math.min(100, Math.round((current / range) * 100));
    } else {
      progressPct = 100;
    }

    var el;
    if (el = $('tree-emoji')) el.textContent = emoji;
    if (el = $('tree-species-name')) el.textContent = species.name;
    if (el = $('tree-stage-name')) el.textContent = stageInfo.name + '阶段';
    if (el = $('tree-progress-fill')) el.style.width = progressPct + '%';
    if (el = $('tree-progress-text')) {
      if (nextStage) {
        el.innerHTML = '💧 ' + tree.drops + ' / ' + nextStage.dropsNeeded + '  ·  还差 <b>' + (nextStage.dropsNeeded - tree.drops) + '</b> 水滴到下一阶段  ·  ⭐ ' + tree.xp + ' XP  ·  🌳 已种 ' + tree.matured + ' 棵';
      } else {
        el.innerHTML = '🎉 已成熟！⭐ ' + tree.xp + ' XP  ·  🌳 已种 ' + tree.matured + ' 棵';
      }
    }

    // 成熟后显示重新种树按钮
    var matured = tree.drops >= 50;
    var treeSection = document.querySelector('.tree-section');
    if (treeSection) {
      var existingBtn = document.getElementById('plant-tree-btn');
      if (matured) {
        if (!existingBtn) {
          var btn = document.createElement('div');
          btn.id = 'plant-tree-btn';
          btn.style.cssText = 'margin-top:0.6rem;display:inline-block;padding:0.35rem 1rem;background:var(--gradient-3);color:white;border-radius:16px;font-size:0.75rem;font-weight:600;cursor:pointer;position:relative;z-index:1;';
          btn.textContent = '🌱 重新种树';
          btn.onclick = function (e) { e.stopPropagation(); plantNewTree(); };
          treeSection.appendChild(btn);
        }
      } else {
        if (existingBtn) existingBtn.remove();
      }
    }
  }

  window.openTreeShop = function () {
    var overlay = $('tree-shop-overlay');
    var content = $('tree-shop-content');
    if (!overlay || !content) return;
    var tree = getTree();
    var html = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.8rem;">' +
      '<h3 style="font-size:1rem;font-weight:700;">🌳 树种商店</h3>' +
      '<span style="font-size:0.78rem;color:var(--accent);font-weight:700;">⭐ ' + tree.xp + ' XP</span>' +
      '</div>';
    html += '<div class="tree-shop-grid">';
    TREE_SPECIES.forEach(function (sp) {
      var unlocked = tree.unlocked.indexOf(sp.id) !== -1;
      var current = tree.species === sp.id;
      var classes = 'tree-shop-item';
      if (current) classes += ' current';
      if (!unlocked && !current) classes += ' locked';
      html += '<div class="' + classes + '" ' + (unlocked ? 'onclick="' + (current ? '' : 'switchSpecies(\'' + sp.id + '\')') + '"' : (tree.xp >= sp.cost ? 'onclick="buySpecies(\'' + sp.id + '\')"' : '')) + '>';
      html += '<div class="tree-shop-emoji">' + sp.emoji + '</div>';
      html += '<div class="tree-shop-name">' + sp.name + '</div>';
      html += '<div class="tree-shop-desc">' + sp.desc + '</div>';
      if (current) {
        html += '<div class="tree-shop-tag">✓</div>';
        html += '<div class="tree-shop-cost owned">当前使用</div>';
      } else if (unlocked) {
        html += '<div class="tree-shop-cost owned">点击切换</div>';
      } else {
        html += '<div class="tree-shop-cost">🔒 ' + sp.cost + ' XP</div>';
      }
      html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;
    overlay.classList.add('show');
  };

  window.closeTreeShop = function (e) {
    if (e && e.target !== $('tree-shop-overlay')) return;
    var overlay = $('tree-shop-overlay');
    if (overlay) overlay.classList.remove('show');
  };

  window.buySpecies = function (speciesId) {
    var tree = getTree();
    var sp = TREE_SPECIES.find(function (s) { return s.id === speciesId; });
    if (!sp) return;
    if (tree.unlocked.indexOf(speciesId) !== -1) { showToast('已拥有该树种'); return; }
    if (tree.xp < sp.cost) { showToast('XP不足，还差' + (sp.cost - tree.xp) + 'XP'); return; }
    tree.xp -= sp.cost;
    tree.unlocked.push(speciesId);
    tree.species = speciesId;
    saveTree(tree);
    showToast('🎉 已解锁并切换为' + sp.name + '！');
    renderTree();
    openTreeShop();
    updateStats();
  };

  window.switchSpecies = function (speciesId) {
    var tree = getTree();
    if (tree.unlocked.indexOf(speciesId) === -1) return;
    tree.species = speciesId;
    saveTree(tree);
    var sp = TREE_SPECIES.find(function (s) { return s.id === speciesId; });
    showToast('已切换为' + (sp ? sp.name : '新树种'));
    renderTree();
    openTreeShop();
  };

  window.plantNewTree = function () {
    var tree = getTree();
    if (tree.drops < 50) { showToast('小树还未成熟'); return; }
    tree.drops = 0;
    tree.rewarded = false;
    tree.matured = (tree.matured || 0) + 1;
    saveTree(tree);
    showToast('🌱 新的小树已种下！已种' + tree.matured + '棵树');
    renderTree();
    updateStats();
  };

  function addDrops(n) {
    var tree = getTree();
    tree.drops = Math.max(0, tree.drops + n);
    // 完成任务也获得少量XP
    if (n > 0) {
      tree.xp = (tree.xp || 0) + 1;
    }
    if (tree.drops >= 50 && !tree.rewarded) {
      tree.rewarded = true;
      tree.xp = (tree.xp || 0) + 50;
      showToast('🎉 小树成熟了！获得50XP，可以重新种树', 4000);
    }
    saveTree(tree);
    renderTree();
    updateStats();
    checkStreak();
  }

  function checkStreak() {
    var streak = parseInt(localStorage.getItem(STORE_KEYS.streak) || '0');
    var lastDate = localStorage.getItem('wb_streak_date') || '';
    var today = todayKey();
    if (lastDate === today) return; // 今天已经检查过
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yKey = dateKey(yesterday);
    if (lastDate === yKey) {
      streak = streak + 1;
    } else if (lastDate !== today) {
      streak = 1;
    }
    localStorage.setItem(STORE_KEYS.streak, String(streak));
    localStorage.setItem('wb_streak_date', today);
    // 连续3天奖励
    if (streak > 0 && streak % 3 === 0) {
      var tree = getTree();
      tree.xp = (tree.xp || 0) + 10;
      saveTree(tree);
      showToast('🔥 连续学习' + streak + '天！+10 XP', 3000);
    }
  }

  function addXP(n) {
    var tree = getTree();
    tree.xp = (tree.xp || 0) + n;
    saveTree(tree);
    renderTree();
    updateStats();
  }

  // =========================================================
  // === 细化任务系统 ===
  // =========================================================

  function getTasks() {
    var tasks = getData(STORE_KEYS.tasks);
    var today = todayKey();
    if (!tasks[today]) tasks[today] = {};
    if (tasks.lastReset !== today) {
      tasks.lastReset = today;
      setData(STORE_KEYS.tasks, tasks);
    }
    return tasks;
  }

  function getDailyTaskList() {
    var cacheKey = STORE_KEYS.dailyTasks + '_' + todayKey();
    var cached = localStorage.getItem(cacheKey);
    if (cached) { try { return JSON.parse(cached); } catch(e) {} }
    // 每日从任务池中随机选择，每个大类最多4个
    var selected = [];
    TASK_CATEGORIES.forEach(function(cat) {
      var pool = DETAILED_TASKS.filter(function(t) { return t.cat === cat.id; });
      var shuffled = shuffle(pool);
      var count = Math.min(MAX_TASKS_PER_CATEGORY, shuffled.length);
      selected = selected.concat(shuffled.slice(0, count));
    });
    localStorage.setItem(cacheKey, JSON.stringify(selected));
    return selected;
  }

  function renderTasks() {
    var container = $('task-list-container');
    if (!container) return;
    var tasks = getTasks();
    var today = todayKey();
    var todayTasks = tasks[today] || {};
    container.innerHTML = '';
    var dailyTasks = getDailyTaskList();
    var totalDone = 0, totalAll = 0;

    TASK_CATEGORIES.forEach(function (cat) {
      var catTasks = dailyTasks.filter(function (t) { return t.cat === cat.id; });
      if (catTasks.length === 0) return;
      var group = document.createElement('div');
      group.className = 'task-group';
      var doneCount = catTasks.filter(function (t) { return todayTasks[t.id]; }).length;
      totalDone += doneCount;
      totalAll += catTasks.length;
      var head = document.createElement('div');
      head.className = 'task-group-head';
      head.innerHTML =
        '<span class="task-group-icon" style="background:' + cat.color + ';">' + cat.icon + '</span>' +
        '<span class="task-group-name">' + cat.name + '</span>' +
        '<span class="task-group-count">' + doneCount + '/' + catTasks.length + '</span>';
      group.appendChild(head);
      catTasks.forEach(function (task) {
        var done = todayTasks[task.id];
        var row = document.createElement('div');
        row.className = 'task-row' + (done ? ' done' : '');
        row.innerHTML =
          '<span class="task-icon">' + task.icon + '</span>' +
          '<div class="task-info">' +
            '<div class="task-name">' + task.name + '</div>' +
            '<div class="task-desc">' + task.desc + '</div>' +
          '</div>' +
          '<span class="drop-badge">💧' + task.drops + '</span>' +
          '<div class="task-check">' + (done ? '✓' : '') + '</div>';
        row.onclick = function () { toggleTask(task.id); };
        group.appendChild(row);
      });
      container.appendChild(group);
    });
    var subEl = $('task-progress-sub');
    if (subEl) subEl.textContent = totalDone + '/' + totalAll;
    // 显示连续天数
    var streakEl = $('streak-display');
    if (streakEl) {
      var streak = parseInt(localStorage.getItem(STORE_KEYS.streak) || '0');
      streakEl.textContent = streak > 0 ? '🔥 连续' + streak + '天' : '';
    }
    updateStats();
  }

  function toggleTask(taskId) {
    var tasks = getTasks();
    var today = todayKey();
    if (!tasks[today]) tasks[today] = {};
    var was = tasks[today][taskId];
    var task = DETAILED_TASKS.find(function (t) { return t.id === taskId; });
    if (!task) return;
    if (was) {
      tasks[today][taskId] = false;
      setData(STORE_KEYS.tasks, tasks);
      addDrops(-task.drops);
      showToast('已取消：' + task.name);
    } else {
      tasks[today][taskId] = true;
      setData(STORE_KEYS.tasks, tasks);
      addDrops(task.drops);
      showToast(task.icon + ' ' + task.name + ' +' + task.drops + '💧');
    }
    renderTasks();
  }

  function updateStats() {
    var tasks = getTasks();
    var today = todayKey();
    var todayTasks = tasks[today] || {};
    var todayDrops = 0;
    var dailyTasks = getDailyTaskList();
    dailyTasks.forEach(function (t) {
      if (todayTasks[t.id]) todayDrops += t.drops;
    });
    var tree = getTree();
    var el;
    if (el = $('stat-drops')) el.textContent = todayDrops;
    if (el = $('stat-exp')) el.textContent = tree.xp || 0;
    if (el = $('stat-trees')) el.textContent = tree.matured || 0;
  }

  // === 激励语录 ===
  var quoteIdx = -1;
  function renderDailyQuote() {
    var cached = getDailyContent('quotes');
    if (cached && cached.length > 0) {
      var now = new Date();
      var dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
      setQuote(dayOfYear % cached.length, cached);
      return;
    }
    var now2 = new Date();
    var dayOfYear2 = Math.floor((now2 - new Date(now2.getFullYear(), 0, 0)) / 86400000);
    var idx = dayOfYear2 % QUOTES.length;
    quoteIdx = idx;
    setQuote(idx, QUOTES);
  }
  function setQuote(idx, arr) {
    quoteIdx = idx;
    var q = arr[idx];
    if (!q) return;
    var qt = $('quote-text'); var qa = $('quote-author');
    if (qt) qt.textContent = '"' + q.text + '"';
    if (qa) qa.textContent = '— ' + (q.author || '佚名');
  }
  window.refreshQuote = function () {
    var cached = getDailyContent('quotes');
    var arr = (cached && cached.length > 0) ? cached : QUOTES;
    var idx;
    do { idx = Math.floor(Math.random() * arr.length); } while (idx === quoteIdx && arr.length > 1);
    setQuote(idx, arr);
  };

  // === 笔记功能 ===
  function renderNotes() {
    var notes = getData(STORE_KEYS.notes);
    var list = Object.values(notes).sort(function (a, b) { return b.ts - a.ts; });
    var container = $('note-list');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) { container.innerHTML = '<div class="empty-hint">还没有笔记</div>'; return; }
    list.forEach(function (n) {
      var item = document.createElement('div');
      item.className = 'note-item';
      item.innerHTML = '<span class="note-text">' + escapeHtml(n.text) + '</span><span class="note-date">' + n.date + '</span><span class="note-del" data-id="' + n.id + '">✕</span>';
      container.appendChild(item);
    });
    container.querySelectorAll('.note-del').forEach(function (el) {
      el.onclick = function () { deleteNote(el.getAttribute('data-id')); };
    });
  }
  window.addNote = function () {
    var input = $('note-input');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    var notes = getData(STORE_KEYS.notes);
    var id = 'n' + Date.now();
    var now = new Date();
    notes[id] = { id: id, text: text, ts: Date.now(), date: (now.getMonth() + 1) + '/' + now.getDate() };
    setData(STORE_KEYS.notes, notes);
    input.value = '';
    renderNotes();
    showToast('笔记已保存');
  };
  function deleteNote(id) {
    var notes = getData(STORE_KEYS.notes);
    delete notes[id];
    setData(STORE_KEYS.notes, notes);
    renderNotes();
  }

  // === 理论 ===
  var theoryIdx = -1;
  function renderDailyTheory() {
    var cached = getDailyContent('theories');
    var arr = (cached && cached.length > 0) ? cached : THEORIES;
    var now = new Date();
    var dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    theoryIdx = dayOfYear % arr.length;
    setTheory(theoryIdx, arr);
  }
  function setTheory(idx, arr) {
    theoryIdx = idx;
    var t = arr[idx];
    if (!t) return;
    var el;
    if (el = $('theory-cat')) el.textContent = t.category;
    if (el = $('theory-title')) el.textContent = t.title;
    if (el = $('theory-summary')) el.textContent = t.summary;
    if (el = $('theory-detail')) el.textContent = t.detail || '';
    if (el = $('theory-action')) el.textContent = t.action || '';
  }
  window.openTheoryDetail = function () {
    var cached = getDailyContent('theories');
    var arr = (cached && cached.length > 0) ? cached : THEORIES;
    var t = arr[theoryIdx];
    if (!t) return;
    var content = $('theory-detail-content');
    if (!content) return;
    content.innerHTML =
      '<span class="detail-tag" style="background:var(--gradient-2);">' + t.category + '</span>' +
      '<h2 class="detail-headline">' + t.title + '</h2>' +
      '<div class="detail-source">每日理论 · 拓展认知</div>' +
      '<div class="detail-body">' +
      '<p style="font-weight:600;margin-bottom:0.8rem;font-size:0.92rem;">' + t.summary + '</p>' +
      '<p style="margin-bottom:1rem;">' + (t.detail || '') + '</p>' +
      '<div style="background:rgba(245,158,11,0.08);border-left:3px solid var(--accent-amber);padding:0.8rem;border-radius:0 8px 8px 0;margin-top:0.5rem;">' +
      '<b style="color:var(--accent-amber);font-size:0.75rem;display:block;margin-bottom:0.3rem;">💡 今日行动建议</b>' +
      '<span style="font-size:0.85rem;">' + (t.action || '') + '</span>' +
      '</div></div>';
    var overlay = $('theory-overlay');
    if (overlay) overlay.classList.add('show');
  };
  window.closeTheoryDetail = function (e) {
    if (e && e.target !== $('theory-overlay')) return;
    var overlay = $('theory-overlay');
    if (overlay) overlay.classList.remove('show');
  };
  window.refreshTheory = function () {
    var cached = getDailyContent('theories');
    var arr = (cached && cached.length > 0) ? cached : THEORIES;
    var idx;
    do { idx = Math.floor(Math.random() * arr.length); } while (idx === theoryIdx && arr.length > 1);
    setTheory(idx, arr);
  };

  // === 每月一书 ===
  var bookIdx = -1;
  function renderMonthlyBook() {
    var now = new Date();
    var monthKey = now.getFullYear() + '-' + pad(now.getMonth() + 1);
    var savedIdx = localStorage.getItem(STORE_KEYS.monthlyBookIdx);
    var savedMonth = localStorage.getItem(STORE_KEYS.monthlyBookMonth);

    if (savedMonth !== monthKey || savedIdx === null) {
      var idx = Math.floor(Math.random() * BOOK_RECOMMENDATIONS.length);
      localStorage.setItem(STORE_KEYS.monthlyBookIdx, String(idx));
      localStorage.setItem(STORE_KEYS.monthlyBookMonth, monthKey);
      bookIdx = idx;
    } else {
      bookIdx = parseInt(savedIdx);
    }
    setBook(bookIdx);

    var subEl = $('monthly-book-sub');
    if (subEl) subEl.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月推荐';
  }
  function setBook(idx) {
    bookIdx = idx;
    var b = BOOK_RECOMMENDATIONS[idx];
    if (!b) return;
    var el;
    if (el = $('book-cover')) el.textContent = b.cover;
    if (el = $('book-cat')) el.textContent = b.category;
    if (el = $('book-title')) el.textContent = b.title;
    if (el = $('book-author')) el.textContent = '作者：' + b.author;
    if (el = $('book-rating')) el.innerHTML = '⭐ ' + b.rating + (b.chapters ? ' · 📖 ' + b.chapters + '章' : '');
    if (el = $('book-summary')) el.textContent = b.summary;
    if (el = $('book-reason')) el.innerHTML = '<b style="color:var(--accent2);">推荐理由：</b>' + b.reason;
    if (el = $('book-quote')) el.textContent = '"' + b.quote + '"';
  }
  window.refreshBook = function () {
    var idx;
    do { idx = Math.floor(Math.random() * BOOK_RECOMMENDATIONS.length); } while (idx === bookIdx && BOOK_RECOMMENDATIONS.length > 1);
    setBook(idx);
    showToast('已换一本好书');
  };

  // === 英文资源 ===
  function renderResources() {
    var list = $('resource-list');
    if (!list) return;
    list.innerHTML = '';
    shuffle(ENGLISH_RESOURCES).slice(0, 5).forEach(function (r) {
      var item = document.createElement('a');
      item.className = 'resource-item';
      item.href = r.url; item.target = '_blank'; item.rel = 'noopener';
      item.innerHTML =
        '<span class="resource-badge ' + r.type + '">' + r.type + '</span>' +
        '<div class="resource-info">' +
        '<div class="resource-name">' + r.title + '</div>' +
        '<div class="resource-desc">' + r.description + '</div>' +
        '<div class="resource-meta"><span>' + r.level + '</span><span>' + r.duration + '</span></div>' +
        '</div>';
      list.appendChild(item);
    });
  }
  window.refreshResources = function () { renderResources(); showToast('已刷新推荐'); };

  // === 新闻（首页摘要 + 全列表） ===
  function renderNewsSummary() {
    var newsData = getDailyContent('news') || TODAY_NEWS;
    var container = $('home-news-list');
    if (container) {
      container.innerHTML = '';
      newsData.slice(0, 3).forEach(function (n, i) {
        var item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML =
          '<span class="news-tag ' + (n.tag || '新闻') + '">' + (n.tag || '新闻') + '</span>' +
          '<span class="news-headline">' + escapeHtml(n.headline) + '</span>' +
          '<p class="news-summary">' + escapeHtml(n.summary || '') + '</p>';
        item.onclick = function () { openDetail(i, newsData); };
        container.appendChild(item);
      });
    }
    var fullList = $('news-list');
    if (fullList) {
      fullList.innerHTML = '';
      newsData.forEach(function (n, i) {
        var item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML =
          '<span class="news-tag ' + (n.tag || '新闻') + '">' + (n.tag || '新闻') + '</span>' +
          '<span class="news-headline">' + escapeHtml(n.headline) + '</span>' +
          '<p class="news-summary">' + escapeHtml(n.summary || '') + '</p>';
        item.onclick = function () { openDetail(i, newsData); };
        fullList.appendChild(item);
      });
    }
    var homeSrc = $('home-news-sources');
    if (homeSrc) {
      homeSrc.innerHTML = '';
      NEWS_SOURCES.forEach(function (s) {
        var a = document.createElement('a');
        a.className = 'news-src'; a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = s.name; homeSrc.appendChild(a);
      });
    }
    var srcDiv = $('news-sources');
    if (srcDiv) {
      srcDiv.innerHTML = '';
      NEWS_SOURCES.forEach(function (s) {
        var a = document.createElement('a');
        a.className = 'news-src'; a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = s.name; srcDiv.appendChild(a);
      });
    }
  }
  window.toggleHomeNewsSources = function () {
    var el = $('home-news-sources');
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'flex' : 'none';
  };
  function openDetail(idx, newsData) {
    var n = (newsData || getDailyContent('news') || TODAY_NEWS)[idx];
    if (!n) return;
    var tagColors = { '国际': 'var(--accent-blue)', '科技': '#8b5cf6', '财经': 'var(--accent-amber)', '经济': 'var(--accent2)', '产业': 'var(--accent-green)' };
    var content = $('detail-content');
    if (!content) return;
    var srcUrl = '#';
    var found = NEWS_SOURCES.find(function (s) { return s.name.includes(n.source) || n.source.includes(s.name); });
    if (found) srcUrl = found.url;
    content.innerHTML =
      '<span class="detail-tag" style="background:' + (tagColors[n.tag] || 'var(--accent)') + '">' + n.tag + '</span>' +
      '<h2 class="detail-headline">' + n.headline + '</h2>' +
      '<div class="detail-source">来源：' + n.source + ' · ' + new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日</div>' +
      '<div class="detail-body">' + n.summary + '</div>' +
      '<div style="margin-top:1.2rem;padding:0.8rem;background:var(--bg);border-radius:8px;font-size:0.78rem;color:var(--muted);">💡 想了解更多，请访问下方新闻源获取完整报道。</div>' +
      '<div style="margin-top:0.6rem;"><a href="' + srcUrl + '" target="_blank" rel="noopener" style="color:var(--accent);font-size:0.82rem;font-weight:600;">前往' + n.source + '查看完整报道 →</a></div>';
    var overlay = $('detail-overlay');
    if (overlay) overlay.classList.add('show');
  }
  window.closeDetail = function (e) {
    if (e && e.target !== $('detail-overlay')) return;
    var overlay = $('detail-overlay');
    if (overlay) overlay.classList.remove('show');
  };

  // === 板绘计划 ===
  function renderDrawing() {
    var pl = $('principle-list');
    if (pl) {
      pl.innerHTML = '';
      DRAWING_PRINCIPLES.forEach(function (p) {
        var li = document.createElement('li');
        li.textContent = p;
        pl.appendChild(li);
      });
    }

    var phases = getData(STORE_KEYS.phases);
    var phaseList = $('phase-list');
    var completedCount = 0;
    var currentPhaseId = null;
    DRAWING_PHASES.forEach(function (ph) {
      if (!phases[ph.id] && currentPhaseId === null) currentPhaseId = ph.id;
    });

    if (phaseList) {
      phaseList.innerHTML = '';
      DRAWING_PHASES.forEach(function (ph) {
        var done = phases[ph.id];
        if (done) completedCount++;
        var isCurrent = ph.id === currentPhaseId;
        var card = document.createElement('div');
        card.className = 'phase-card' + (done ? ' completed' : '') + (isCurrent ? ' current-phase' : '');

        var practicesHtml = ph.practices.map(function (p) { return '<li>' + p + '</li>'; }).join('');
        var resHtml = ph.resources.map(function (r) { return '<a class="phase-res-link" href="' + r.url + '" target="_blank" rel="noopener">' + r.name + '</a>'; }).join('');
        var currentBadge = isCurrent ? '<span style="font-size:0.6rem;padding:0.1rem 0.5rem;background:var(--accent-amber);color:white;border-radius:6px;margin-left:0.3rem;">当前阶段</span>' : '';

        card.innerHTML =
          '<div class="phase-header">' +
          '<span class="phase-badge" style="background:' + ph.color + ';">阶段' + ph.id + (ph.isCore ? ' · 核心' : '') + '</span>' +
          '<span class="phase-title">' + ph.title + '</span>' + currentBadge +
          '<span class="phase-duration">' + ph.duration + '</span>' +
          '</div>' +
          '<div class="phase-goal"><b>目标：</b>' + ph.goal + '</div>' +
          (isCurrent ? '<div style="background:rgba(245,158,11,0.08);border-left:3px solid var(--accent-amber);padding:0.5rem 0.7rem;border-radius:0 8px 8px 0;margin-bottom:0.6rem;font-size:0.72rem;color:var(--accent-amber);font-weight:600;">📍 你正在此阶段，以下是具体练习建议</div>' : '') +
          '<ul class="phase-practices">' + practicesHtml + '</ul>' +
          '<div class="phase-goal" style="margin-top:0.4rem;"><b>阶段作品：</b>' + ph.work + '</div>' +
          '<div class="phase-resources">' + resHtml + '</div>' +
          '<div class="phase-toggle">' +
          '<div class="phase-check' + (done ? ' done' : '') + '" data-phase="' + ph.id + '">✓</div>' +
          '<span class="phase-check-label">' + (done ? '已完成' : '标记为已完成') + '</span>' +
          '</div>';
        phaseList.appendChild(card);
      });

      var pp = $('phase-progress');
      if (pp) pp.textContent = completedCount + '/6';
      phaseList.querySelectorAll('.phase-check').forEach(function (el) {
        el.onclick = function () { togglePhase(el.getAttribute('data-phase')); };
      });
    }

    // 当前阶段具体练习建议
    var suggestionBox = $('current-phase-suggestion');
    if (suggestionBox) {
      if (currentPhaseId !== null) {
        var cp = DRAWING_PHASES.find(function (p) { return p.id === currentPhaseId; });
        var itemsHtml = cp.practices.map(function (p, i) {
          return '<div style="display:flex;align-items:flex-start;gap:0.4rem;padding:0.5rem 0.7rem;background:var(--bg);border-radius:8px;font-size:0.75rem;margin-bottom:0.35rem;">' +
            '<span style="color:var(--accent);font-weight:700;flex-shrink:0;">' + (i + 1) + '.</span>' +
            '<span>' + p + '</span></div>';
        }).join('');
        suggestionBox.innerHTML =
          '<div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.5rem;">' +
          '<span style="font-size:1.2rem;">🎯</span>' +
          '<span style="font-size:0.85rem;font-weight:700;">当前阶段：阶段' + cp.id + ' ' + cp.title + '</span>' +
          '</div>' +
          '<p style="font-size:0.78rem;color:var(--muted);margin-bottom:0.5rem;">以下是建议的练习重点：</p>' +
          itemsHtml;
      } else {
        suggestionBox.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--accent-green);font-size:0.85rem;font-weight:600;">🎉 恭喜！所有阶段已完成！</div>';
      }
    }

    var wt = $('weekly-table');
    if (wt) {
      wt.innerHTML = '<thead><tr><th>星期</th><th>内容</th><th>时长</th></tr></thead><tbody>';
      DRAWING_WEEKLY_PLAN.forEach(function (d) {
        wt.innerHTML += '<tr><td><b>' + d.day + '</b></td><td>' + d.content + '</td><td>' + d.hours + '</td></tr>';
      });
      wt.innerHTML += '</tbody>';
    }
  }
  function togglePhase(id) {
    var phases = getData(STORE_KEYS.phases);
    id = parseInt(id);
    phases[id] = !phases[id];
    setData(STORE_KEYS.phases, phases);
    renderDrawing();
    showToast(phases[id] ? '阶段' + id + ' 已标记完成！' : '已取消标记');
  }

  // === 板绘统计图表 ===
  var statsChart = null;
  function renderStatsChart() {
    var dom = $('chart-stats');
    if (!dom) return;
    if (typeof echarts === 'undefined') return;
    if (statsChart) { statsChart.dispose(); }
    statsChart = echarts.init(dom, null, { renderer: 'svg' });

    var style = getComputedStyle(document.documentElement);
    var muted = style.getPropertyValue('--muted').trim();
    var rule = style.getPropertyValue('--rule').trim();

    var tasks = getData(STORE_KEYS.tasks);
    var days = [];
    var seriesData = {};
    TASK_CATEGORIES.forEach(function (c) { seriesData[c.id] = []; });

    for (var i = 6; i >= 0; i--) {
      var d = new Date(); d.setDate(d.getDate() - i);
      days.push((d.getMonth() + 1) + '/' + d.getDate());
      var dd = tasks[dateKey(d)] || {};
      TASK_CATEGORIES.forEach(function (c) {
        var drops = 0;
        DETAILED_TASKS.forEach(function (t) {
          if (t.cat === c.id && dd[t.id]) drops += t.drops;
        });
        seriesData[c.id].push(drops);
      });
    }

    var series = TASK_CATEGORIES.map(function (c) {
      return { name: c.name, type: 'bar', stack: 'total', barWidth: '40%', itemStyle: { color: c.color }, data: seriesData[c.id] };
    });

    statsChart.setOption({
      tooltip: { trigger: 'axis', appendToBody: true,
        formatter: function (p) {
          var h = p[0].axisValue + '<br/>'; var total = 0;
          p.forEach(function (x) { h += x.marker + x.seriesName + ': ' + x.value + '💧<br/>'; total += x.value; });
          return h + '<b>合计: ' + total + ' 水滴</b>';
        }
      },
      legend: { data: TASK_CATEGORIES.map(function (c) { return c.name; }), bottom: 0, textStyle: { color: muted, fontSize: 10 }, itemWidth: 10, itemHeight: 10 },
      grid: { left: '3%', right: '4%', bottom: '18%', top: '8%', containLabel: true },
      xAxis: { type: 'category', data: days, axisLine: { lineStyle: { color: rule } }, axisLabel: { color: muted, fontSize: 10 } },
      yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: rule, type: 'dashed' } }, axisLabel: { color: muted, fontSize: 10 } },
      series: series, animation: false
    });
    window.addEventListener('resize', function () { if (statsChart) statsChart.resize(); });
  }

  // === 笔友功能 ===
  var currentPal = null;

  function renderPalList() {
    var grid = $('pal-grid');
    if (!grid) return;
    grid.innerHTML = '';
    var letters = getData(STORE_KEYS.letters);
    PEN_PALS.forEach(function (p) {
      var count = (letters[p.id] || []).length;
      var card = document.createElement('div');
      card.className = 'pal-card';
      card.innerHTML =
        '<span class="pal-avatar">' + p.avatar + '</span>' +
        '<div class="pal-info">' +
        '<div class="pal-name">' + p.name + ' <span class="pal-flag">' + p.flag + '</span></div>' +
        '<div class="pal-bio">' + p.bio + '</div>' +
        '</div>' +
        '<span class="pal-level">' + p.language + '<br>' + (count > 0 ? count + '封信' : '新') + '</span>';
      card.onclick = function () { openPalChat(p.id); };
      grid.appendChild(card);
    });
  }

  function openPalChat(palId) {
    currentPal = PEN_PALS.find(function (p) { return p.id === palId; });
    if (!currentPal) return;
    var sv = $('pal-select-view'); var cv = $('pal-chat-view');
    if (sv) sv.style.display = 'none';
    if (cv) cv.classList.add('active');
    var el;
    if (el = $('chat-avatar')) el.textContent = currentPal.avatar;
    if (el = $('chat-name')) el.textContent = currentPal.name + ' ' + currentPal.flag;
    if (el = $('chat-info')) el.textContent = currentPal.city + ' · ' + currentPal.language + ' · ' + currentPal.level;
    renderChatMessages();
  }

  function renderChatMessages() {
    var container = $('chat-messages');
    if (!container || !currentPal) return;
    var letters = getData(STORE_KEYS.letters);
    var conv = letters[currentPal.id] || [];
    container.innerHTML = '';

    var starter = document.createElement('div');
    starter.className = 'letter-bubble';
    starter.innerHTML = escapeHtml(currentPal.starter) + '<div class="letter-meta">' + currentPal.name + ' · 来信</div>';
    container.appendChild(starter);

    conv.forEach(function (msg) {
      var bubble = document.createElement('div');
      bubble.className = 'letter-bubble' + (msg.own ? ' own' : '');
      bubble.innerHTML = escapeHtml(msg.text) + '<div class="letter-meta">' + (msg.own ? '我' : currentPal.name) + ' · ' + msg.date + '</div>';
      container.appendChild(bubble);
    });

    if (conv.length === 0) {
      var hint = document.createElement('div');
      hint.className = 'empty-hint';
      hint.textContent = '阅读上方来信，然后用' + currentPal.language + '写回信吧！';
      container.appendChild(hint);
    }
    container.scrollTop = container.scrollHeight;
  }

  window.backToPalList = function () {
    var cv = $('pal-chat-view'); var sv = $('pal-select-view');
    if (cv) cv.classList.remove('active');
    if (sv) sv.style.display = 'block';
    currentPal = null;
    renderPalList();
    checkAIServer();
  };

  window.sendLetter = function () {
    if (!currentPal) return;
    var ta = $('write-textarea');
    if (!ta) return;
    var text = ta.value.trim();
    if (!text) { showToast('请先写一些内容'); return; }
    var letters = getData(STORE_KEYS.letters);
    if (!letters[currentPal.id]) letters[currentPal.id] = [];
    var now = new Date();
    letters[currentPal.id].push({ text: text, own: true, date: (now.getMonth() + 1) + '/' + now.getDate() + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()), ts: Date.now() });
    setData(STORE_KEYS.letters, letters);
    ta.value = '';
    renderChatMessages();
    showToast('回信已发送，等待回复...');

    // 显示"正在输入..."指示器
    var chatDiv = $('chat-messages');
    var typingEl = document.createElement('div');
    typingEl.id = 'typing-indicator';
    typingEl.className = 'letter-bubble';
    typingEl.style.opacity = '0.6';
    typingEl.innerHTML = '<span style="animation:spin 1s linear infinite;display:inline-block;">💬</span> ' + escapeHtml(currentPal.name) + ' 正在输入...';
    if (chatDiv) chatDiv.appendChild(typingEl);
    if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;

    // 构建AI对话请求
    var langName = currentPal.language;
    var langInstruction = langName === '德语'
      ? 'Du bist eine Deutschsprachige Person. Antworte IMMER auf Deutsch. Halte deine Antworten natürlich, freundlich und gesprächig (2-4 Sätze). Stelle am Ende oft eine Gegenfrage, um das Gespräch am Laufen zu halten.'
      : 'You are an English speaker. ALWAYS reply in English. Keep your responses natural, friendly and conversational (2-4 sentences). Ask follow-up questions to keep the conversation going.';

    var systemPrompt = 'You are ' + currentPal.name + ', a ' + currentPal.bio + ' You are from ' + currentPal.city + '. ' + langInstruction + ' You are a language exchange pen pal chatting with a language learner. Be encouraging but also a natural conversation partner. Respond to what they actually say — do NOT just praise their writing. Engage with the content of their message. If they ask a question, answer it. If they share something, react to it and share your own experience. Keep responses short (2-4 sentences) like a real chat message, not a long letter.';

    // 构建对话历史
    var messages = [{ role: 'system', content: systemPrompt }];
    var conv = letters[currentPal.id] || [];
    // 加入初始来信
    messages.push({ role: 'assistant', content: currentPal.starter });
    // 加入最近的对话历史（最多20条）
    var recent = conv.slice(-20);
    recent.forEach(function (msg) {
      messages.push({ role: msg.own ? 'user' : 'assistant', content: msg.text });
    });

    // 调用 Pollinations.ai AI API（纯客户端，无需本地服务器）
    callPenPalAI(messages, text, systemPrompt);
  };

  // === AI 对话配置管理 ===
  // 支持三个服务商，均为 OpenAI 兼容格式，支持浏览器 CORS 直连
  var AI_PROVIDERS = {
    deepseek: {
      name: 'DeepSeek',
      endpoint: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat'
    },
    openrouter: {
      name: 'OpenRouter',
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      model: 'meta-llama/llama-3.2-3b-instruct:free'
    },
    siliconflow: {
      name: '硅基流动',
      endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
      model: 'Qwen/Qwen2.5-7B-Instruct'
    }
  };

  function getAIConfig() {
    try {
      var saved = localStorage.getItem('penpal_ai_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  window.saveAIConfig = function () {
    var providerEl = $('ai-provider');
    var keyEl = $('ai-api-key');
    if (!providerEl || !keyEl) return;
    var key = keyEl.value.trim();
    if (!key) { showToast('请输入API Key'); return; }
    var config = { provider: providerEl.value, apiKey: key };
    localStorage.setItem('penpal_ai_config', JSON.stringify(config));
    showToast('AI设置已保存！');
    checkAIServer();
  };

  function loadAIConfigToForm() {
    var config = getAIConfig();
    var providerEl = $('ai-provider');
    var keyEl = $('ai-api-key');
    if (!providerEl || !keyEl) return;
    if (config) {
      providerEl.value = config.provider;
      keyEl.value = config.apiKey;
    }
  }

  // === AI对话核心函数 ===
  // 从浏览器直接调用 AI API（OpenAI兼容格式），无需本地服务器
  var aiServerOnline = false;

  function callPenPalAI(messages, userText, systemPrompt) {
    var config = getAIConfig();

    // 未配置 API Key → 使用内置回复
    if (!config || !config.apiKey) {
      console.log('未配置AI API Key，使用内置回复');
      aiServerOnline = false;
      setTimeout(function () {
        finishPalReply(generateContextualReply(currentPal, userText, messages));
      }, 600 + Math.random() * 800);
      return;
    }

    var provider = AI_PROVIDERS[config.provider] || AI_PROVIDERS.deepseek;

    // 带超时的 fetch
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 25000);

    fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.apiKey
      },
      body: JSON.stringify({
        model: provider.model,
        messages: messages,
        temperature: 0.8,
        max_tokens: 300,
        stream: false
      }),
      signal: controller.signal
    })
    .then(function (res) {
      clearTimeout(timer);
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error('HTTP ' + res.status + ': ' + t.substring(0, 150));
        });
      }
      return res.json();
    })
    .then(function (data) {
      var reply = '';
      if (data.choices && data.choices[0] && data.choices[0].message) {
        reply = data.choices[0].message.content.trim();
      }
      if (reply && reply.length > 1) {
        aiServerOnline = true;
        finishPalReply(reply);
      } else {
        throw new Error('Empty response');
      }
    })
    .catch(function (err) {
      clearTimeout(timer);
      console.log('AI API 调用失败，降级为内置回复:', err.message);
      aiServerOnline = false;
      setTimeout(function () {
        finishPalReply(generateContextualReply(currentPal, userText, messages));
      }, 600 + Math.random() * 800);
    });
  }

  // 检查 AI 配置状态并更新 UI
  function checkAIServer() {
    var dot = $('ai-status-dot');
    var txt = $('ai-status-text');
    if (!dot || !txt) return;

    loadAIConfigToForm();

    var config = getAIConfig();
    if (!config || !config.apiKey) {
      aiServerOnline = false;
      dot.style.background = '#f59e0b';
      txt.textContent = '未配置AI（使用内置回复）';
      txt.style.color = '#f59e0b';
      return;
    }

    aiServerOnline = true;
    dot.style.background = '#10b981';
    var pName = AI_PROVIDERS[config.provider] ? AI_PROVIDERS[config.provider].name : 'AI';
    txt.textContent = pName + ' 已就绪';
    txt.style.color = '#10b981';
  }

  // =========================================================
  // === 每日内容系统（AI生成 + 缓存） ===
  // =========================================================
  function getDailyContent(type) {
    var date = localStorage.getItem(STORE_KEYS.dailyDate);
    if (date !== todayKey()) return null;
    try {
      return JSON.parse(localStorage.getItem(STORE_KEYS['daily' + type.charAt(0).toUpperCase() + type.slice(1)]) || 'null');
    } catch(e) { return null; }
  }
  function setDailyContent(type, data) {
    localStorage.setItem(STORE_KEYS.dailyDate, todayKey());
    var key = STORE_KEYS['daily' + type.charAt(0).toUpperCase() + type.slice(1)];
    if (key) localStorage.setItem(key, JSON.stringify(data));
  }

  function callAIGeneric(prompt, callback) {
    var config = getAIConfig();
    if (!config || !config.apiKey) { callback(null); return; }
    var provider = AI_PROVIDERS[config.provider] || AI_PROVIDERS.deepseek;
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 30000);
    fetch(provider.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config.apiKey },
      body: JSON.stringify({
        model: provider.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9, max_tokens: 2000, stream: false
      }),
      signal: controller.signal
    })
    .then(function (res) { clearTimeout(timer); if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
    .then(function (data) {
      clearTimeout(timer);
      if (data.choices && data.choices[0] && data.choices[0].message) {
        callback(data.choices[0].message.content.trim());
      } else { callback(null); }
    })
    .catch(function (err) { clearTimeout(timer); console.log('AI call failed:', err.message); callback(null); });
  }

  function fetchDailyContent() {
    // 如果今天已经获取过，跳过
    if (localStorage.getItem(STORE_KEYS.dailyDate) === todayKey()) {
      var hasAny = getDailyContent('news') || getDailyContent('quotes') || getDailyContent('theories') || getDailyContent('finance');
      if (hasAny) return;
    }
    var prompt = '请为一个个人学习工作台生成今日内容，用JSON格式返回（只返回JSON，不要其他文字）。\n' +
      '包含以下四个部分：\n' +
      '1. "news": 5条今日新闻热点（国际/科技/财经/经济/产业），每条含headline(标题)、summary(一句话摘要)、tag(分类)、source(来源)\n' +
      '2. "quotes": 5条激励学习语录，每条含text(语录)和author(作者)\n' +
      '3. "theories": 5个学习或生活理论，每条含title(标题)、category(分类)、summary(一句话总结)、detail(详细解释)、action(行动建议)\n' +
      '4. "finance": 5个理财知识，每条含title(标题)、category(分类)、summary(一句话总结)、detail(详细解释)、action(行动建议)\n' +
      '格式：{"news":[...],"quotes":[...],"theories":[...],"finance":[...]}';
    callAIGeneric(prompt, function(response) {
      if (!response) { console.log('AI daily content failed, using static'); return; }
      try {
        var jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return;
        var data = JSON.parse(jsonMatch[0]);
        if (data.news && Array.isArray(data.news)) { setDailyContent('news', data.news); renderNewsSummary(); }
        if (data.quotes && Array.isArray(data.quotes)) { setDailyContent('quotes', data.quotes); renderDailyQuote(); }
        if (data.theories && Array.isArray(data.theories)) { setDailyContent('theories', data.theories); renderDailyTheory(); }
        if (data.finance && Array.isArray(data.finance)) { setDailyContent('finance', data.finance); renderFinance(); }
        console.log('AI daily content loaded');
      } catch(e) { console.log('Parse AI content failed:', e); }
    });
    // 同时尝试从RSS获取真实新闻
    fetchRSSNews();
  }

  function fetchRSSNews() {
    var feeds = [
      'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.chinanews.com.cn/rss/scroll-news.xml'),
      'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('http://www.people.com.cn/rss/politics.xml')
    ];
    var feedUrl = feeds[Math.floor(Math.random() * feeds.length)];
    fetch(feedUrl)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          var news = data.items.slice(0, 6).map(function(item) {
            return {
              headline: item.title,
              summary: (item.description || '').replace(/<[^>]+>/g, '').substring(0, 80),
              tag: '新闻',
              source: data.feed ? data.feed.title : 'RSS'
            };
          });
          setDailyContent('news', news);
          renderNewsSummary();
          console.log('RSS news loaded');
        }
      })
      .catch(function(err) { console.log('RSS fetch failed:', err.message); });
  }

  // 完成笔友回复的公共函数
  function finishPalReply(reply) {
    var ti = $('typing-indicator');
    if (ti) ti.remove();
    var letters2 = getData(STORE_KEYS.letters);
    if (!letters2[currentPal.id]) letters2[currentPal.id] = [];
    letters2[currentPal.id].push({ text: reply, own: false, date: '刚刚', ts: Date.now() });
    setData(STORE_KEYS.letters, letters2);
    renderChatMessages();
    showToast(currentPal.name + ' 回复了你！');
  }

  // === 智能本地回复系统 ===
  // 当AI服务器不可用时，基于消息分析+上下文+笔友性格生成自然回复
  function generateContextualReply(pal, userText, messages) {
    var isGerman = pal.language === '德语';
    var lower = userText.toLowerCase().trim();
    var words = lower.split(/[\s,.!?;:]+/).filter(function (w) { return w.length > 1; });

    // 获取对话上下文
    var convMsgs = messages.filter(function (m) { return m.role !== 'system'; });
    var userTurns = convMsgs.filter(function (m) { return m.role === 'user'; }).length;
    var isFirstMessage = userTurns <= 1;

    // 1. 消息类型检测
    var isGreeting = /\b(hallo|hi|hey|servus|guten\s*morgen|guten\s*tag|guten\s*abend|hello|good\s*morning|good\s*evening|howdy)\b/.test(lower);
    var isFarewell = /\b(bye|tschüss|tschus|auf\s*wiedersehen|goodbye|see\s*you|good\s*night|gute\s*nacht|bis\s*bald)\b/.test(lower);
    var isThanks = /\b(thank|thanks|danke|merci)\b/.test(lower);
    var isQuestion = /[?？]/.test(userText) || /\b(what|how|why|when|where|who|which|do\s*you|can\s*you|are\s*you|will\s*you|what's|how's|was|wie|wo|wer|wann|warum|welche|kannst\s*du|bist\s*du|hast\s*du|magst\s*du)\b/.test(lower);
    var isSharing = !isQuestion && !isGreeting && !isFarewell && !isThanks && userText.length > 5;

    // 2. 主题检测（扩展版）
    var topicKeywords = {
      weather: ['wetter', 'kalt', 'warm', 'sonne', 'regen', 'schnee', 'wind', 'weather', 'cold', 'warm', 'sun', 'rain', 'snow', 'windy', 'sunny'],
      food: ['essen', 'kochen', 'gericht', 'lecker', 'hunger', 'food', 'eat', 'cook', 'meal', 'delicious', 'hungry', 'restaurant', 'breakfast', 'lunch', 'dinner', 'frühstück', 'mittag', 'abendessen', 'pizza', 'pasta', 'nudeln', 'reis', 'cake', 'kuchen', 'brot', 'bread'],
      travel: ['reise', 'urlaub', 'reisen', 'stadt', 'besuchen', 'travel', 'trip', 'vacation', 'visit', 'city', 'country', 'hotel', 'flight', 'flug', 'japan', 'china', 'frankreich', 'italien', 'england', 'amerika', 'berlin', 'münchen', 'london', 'paris'],
      art: ['kunst', 'malen', 'zeichnen', 'art', 'paint', 'draw', 'illustration', 'gallery', 'galerie', 'design', 'color', 'farbe'],
      music: ['musik', 'lied', 'hören', 'music', 'song', 'listen', 'band', 'artist', 'guitar', 'gitarre', 'piano', 'klavier', 'rock', 'pop', 'jazz', 'klassik'],
      work: ['arbeit', 'beruf', 'job', 'work', 'office', 'company', 'büro', 'firma', 'meeting', 'projekt', 'project'],
      hobby: ['hobby', 'freizeit', 'hobbys', 'free\s*time', 'weekend', 'wochenende', 'samstag', 'sonntag'],
      language: ['lernen', 'studieren', 'sprache', 'learn', 'study', 'language', 'deutsch', 'english', 'üben', 'practice', 'wort', 'word', 'vokabel', 'grammar', 'grammatik'],
      family: ['familie', 'family', 'brother', 'sister', 'parents', 'bruder', 'schwester', 'eltern', 'mutter', 'vater', 'mother', 'father', 'mama', 'papa'],
      sport: ['sport', 'laufen', 'schwimmen', 'run', 'swim', 'gym', 'fitness', 'joggen', 'fahrrad', 'bike', 'cycling', 'fußball', 'football', 'soccer', 'tennis'],
      book: ['buch', 'lesen', 'book', 'read', 'novel', 'roman', 'autor', 'author', 'bibliothek', 'library', 'geschichte', 'story'],
      film: ['film', 'kino', 'movie', 'cinema', 'netflix', 'watch', 'schauen', 'serie', 'series', 'tv', 'serien'],
      pet: ['haustier', 'katze', 'hund', 'pet', 'cat', 'dog', 'tier', 'animal'],
      shopping: ['kaufen', 'einkaufen', 'shop', 'buy', 'shopping', 'laden', 'store', 'marktk', 'market'],
      weather_today: ['heute', 'today', 'morgen', 'tomorrow', 'gestern', 'yesterday', 'weekend', 'wochenende'],
      nature: ['park', 'garten', 'garden', 'natur', 'nature', 'baum', 'tree', 'blume', 'flower', 'berg', 'mountain', 'see', 'lake', 'meer', 'sea', 'strand', 'beach'],
      tech: ['computer', 'laptop', 'phone', 'handy', 'internet', 'software', 'code', 'programmieren', 'programming', 'app', 'technologie', 'technology'],
    };

    var matchedTopics = [];
    Object.keys(topicKeywords).forEach(function (t) {
      topicKeywords[t].forEach(function (kw) {
        if (lower.indexOf(kw) !== -1 && matchedTopics.indexOf(t) === -1) matchedTopics.push(t);
      });
    });
    var mainTopic = matchedTopics[0] || null;

    // 3. 笔友个性化数据
    var palPersonalities = {
      'lena': {
        interestsEn: ['reading books', 'hiking in the mountains', 'baking cakes', 'walking in the park'],
        interestsDe: ['Bücher lesen', 'in den Bergen wandern', 'Kuchen backen', 'im Park spazieren'],
        personalEn: 'I study literature at university in Munich',
        personalDe: 'Ich studiere Literatur an der Uni in München',
        cityEn: 'Munich is beautiful, especially the English Garden',
        cityDe: 'München ist wunderschön, besonders der Englische Garten'
      },
      'max': {
        interestsEn: ['coding side projects', 'listening to electronic music', 'exploring Berlin\'s nightlife', 'playing video games'],
        interestsDe: ['nebenbei programmieren', 'elektronische Musik hören', 'Berlins Nachtleben erkunden', 'Videospiele spielen'],
        personalEn: 'I work as a software engineer in Berlin',
        personalDe: 'Ich arbeite als Programmierer in Berlin',
        cityEn: 'Berlin is an amazing city with so much to do',
        cityDe: 'Berlin ist eine toll Stadt mit so vielen Möglichkeiten'
      },
      'emma': {
        interestsEn: ['drawing and painting', 'visiting art galleries', 'trying new coffee shops', 'sketching in the park'],
        interestsDe: ['zeichnen und malen', 'Galerien besuchen', 'neue Cafés ausprobieren', 'im Park skizzieren'],
        personalEn: 'I work as an illustrator in London',
        personalDe: 'Ich arbeite als Illustratorin in London',
        cityEn: 'London has the best art scene',
        cityDe: 'London hat die beste Kunstszene'
      },
      'jake': {
        interestsEn: ['cooking new recipes', 'trying international cuisine', 'food blogging', 'visiting markets'],
        interestsDe: ['neue Rezepte kochen', 'internationale Küche probieren', 'Food-Blogging', 'Märkte besuchen'],
        personalEn: 'I\'m a chef and food blogger in New York',
        personalDe: 'Ich bin Koch und Food-Blogger in New York',
        cityEn: 'New York has the best food from all over the world',
        cityDe: 'New York hat das beste Essen aus aller Welt'
      }
    };
    var personality = palPersonalities[pal.id] || palPersonalities['lena'];
    var interest = isGerman ? personality.interestsDe : personality.interestsEn;
    var randomInterest = interest[Math.floor(Math.random() * interest.length)];

    // 4. 回复生成
    var reply = '';

    // 问候语
    var greetingsDe = ['Hallo!', 'Hi!', 'Hey!', 'Servus!'];
    var greetingsEn = ['Hi!', 'Hello!', 'Hey there!', 'Hey!'];
    var greeting = isGerman
      ? greetingsDe[Math.floor(Math.random() * greetingsDe.length)]
      : greetingsEn[Math.floor(Math.random() * greetingsEn.length)];

    // 开场白
    var openersDe = [
      'Das ist toll!', 'Sehr interessant!', 'Cool!', 'Ich verstehe!', 'Das klingt schön!',
      'Oh, wirklich?', 'Das mag ich!', 'Spannend!', 'Auf jeden Fall!', 'Da stimme ich zu!'
    ];
    var openersEn = [
      'That\'s great!', 'Very interesting!', 'Cool!', 'I see!', 'That sounds lovely!',
      'Oh, really?', 'I love that!', 'Fascinating!', 'Absolutely!', 'I agree!'
    ];
    var opener = isGerman
      ? openersDe[Math.floor(Math.random() * openersDe.length)]
      : openersEn[Math.floor(Math.random() * openersEn.length)];

    // 追问
    var followUpsDe = [
      'Wie war dein Tag?', 'Was hast du heute noch vor?', 'Erzähl mir mehr!',
      'Und du, was denkst du?', 'Was machst du sonst noch gerne?',
      'Wie sieht dein Wochenende aus?', 'Hast du noch Fragen?', 'Wie geht es dir sonst?',
      'Was hast du gestern gemacht?', 'Hast du Pläne für das Wochenende?'
    ];
    var followUpsEn = [
      'How was your day?', 'What are you up to today?', 'Tell me more!',
      'And you, what do you think?', 'What else do you like to do?',
      'How\'s your weekend looking?', 'Do you have any questions?', 'How are you otherwise?',
      'What did you do yesterday?', 'Any plans for the weekend?'
    ];
    var followUp = isGerman
      ? followUpsDe[Math.floor(Math.random() * followUpsDe.length)]
      : followUpsEn[Math.floor(Math.random() * followUpsEn.length)];

    // 按类型生成回复
    if (isGreeting && isFirstMessage) {
      // 第一次打招呼
      if (isGerman) {
        reply = greeting + ' Schön, von dir zu hören! ' + personality.personalDe + '. ' +
          'Ich mag gerne ' + randomInterest + '. ' + followUp;
      } else {
        reply = greeting + ' So nice to hear from you! ' + personality.personalEn + '. ' +
          'In my free time I enjoy ' + randomInterest + '. ' + followUp;
      }
    } else if (isGreeting) {
      reply = greeting + ' ' + followUp;
    } else if (isFarewell) {
      reply = isGerman
        ? 'Tschüss! Bis bald! Schreib mir wieder, wenn du Zeit hast. Tschüss! 👋'
        : 'Bye! Talk to you soon! Write me again when you have time. Bye! 👋';
    } else if (isThanks) {
      reply = isGerman
        ? 'Kein Problem! Ich helfe immer gerne. Hast du noch Fragen? 😊'
        : 'No problem! I\'m always happy to help. Do you have any more questions? 😊';
    } else if (isQuestion) {
      // 尝试回答问题
      var answers = generateAnswer(pal, personality, mainTopic, isGerman, randomInterest);
      reply = opener + ' ' + answers + ' ' + followUp;
    } else if (isSharing) {
      // 对用户分享的内容做出反应
      var reactions = generateReaction(pal, personality, mainTopic, isGerman, randomInterest, userText);
      reply = opener + ' ' + reactions + ' ' + followUp;
    } else {
      // 默认回复
      reply = opener + ' ' + followUp;
    }

    // 确保回复长度合适（至少2句话）
    if (reply.split(/[.!?]/).filter(function (s) { return s.trim().length > 0; }).length < 2) {
      reply += ' ' + followUp;
    }

    return reply;
  }

  // 根据主题生成回答
  function generateAnswer(pal, personality, topic, isGerman, randomInterest) {
    var answers = {
      weather: {
        de: 'Das Wetter ist hier gerade ganz schön. ' + personality.cityDe + '.',
        en: 'The weather here is pretty nice. ' + personality.cityEn + '.'
      },
      food: {
        de: 'Ich koche sehr gerne! Mein Lieblingsessen ist Pasta. Als ich jung war, hat meine Mutter mir kochen beigebracht.',
        en: 'I love cooking! My favorite food is pasta. My mom taught me how to cook when I was young.'
      },
      travel: {
        de: 'Ich reise gerne! Mein Lieblingsort war bisher Japan. Die Kultur und das Essen waren unglaublich.',
        en: 'I love traveling! My favorite place so far has been Japan. The culture and food were incredible.'
      },
      art: {
        de: 'Ich liebe Kunst! Ich gehe oft in Galerien. Meine Lieblingsrichtung ist Impressionismus.',
        en: 'I love art! I go to galleries often. My favorite style is Impressionism.'
      },
      music: {
        de: 'Musik ist sehr wichtig für mich! Ich höre gerne verschiedene Genres. Und du, was hörst du gerne?',
        en: 'Music is very important to me! I enjoy listening to different genres. What about you?'
      },
      work: {
        de: personality.personalDe + '. Die Arbeit ist manchmal stressig, aber ich mag sie.',
        en: personality.personalEn + '. The work is sometimes stressful, but I enjoy it.'
      },
      hobby: {
        de: 'In meiner Freizeit ' + randomInterest + '. Das macht mich sehr glücklich!',
        en: 'In my free time I ' + randomInterest + '. It makes me really happy!'
      },
      language: {
        de: 'Du lernst Deutsch? Das ist super! Dein Deutsch wird immer besser. Übe weiter!',
        en: 'You\'re learning English? That\'s awesome! Your English is getting better. Keep practicing!'
      },
      family: {
        de: 'Ich habe eine kleine Familie. Wir sehen uns oft am Wochenende. Familie ist mir sehr wichtig.',
        en: 'I have a small family. We see each other often on weekends. Family is very important to me.'
      },
      sport: {
        de: 'Ich mache gerne Sport! Es hilft mir, fit zu bleiben. ' + randomInterest + ' ist mein Favorit.',
        en: 'I enjoy sports! It helps me stay fit. ' + randomInterest + ' is my favorite.'
      },
      book: {
        de: 'Ich lese sehr gerne! Mein Lieblingsbuch ist "Der Vorleser". Bücher öffnen neue Welten.',
        en: 'I love reading! My favorite book is "The Reader". Books open up new worlds.'
      },
      film: {
        de: 'Ich schaue gerne Filme! Mein Lieblingsfilm ist "Das Leben der Anderen". Und du?',
        en: 'I love watching movies! My favorite film is "The Lives of Others". What about you?'
      },
      pet: {
        de: 'Ich habe eine Katze! Sie heißt Milo und ist sehr verspielt. Hast du ein Haustier?',
        en: 'I have a cat! Her name is Milo and she\'s very playful. Do you have a pet?'
      },
      nature: {
        de: 'Ich liebe die Natur! ' + personality.cityDe + '. Wir gehen oft raus am Wochenende.',
        en: 'I love nature! ' + personality.cityEn + '. We often go out on weekends.'
      },
      tech: {
        de: 'Ich finde Technologie faszinierend! Ich verfolge gerne neue Entwicklungen.',
        en: 'I find technology fascinating! I like following new developments.'
      },
      shopping: {
        de: 'Ich gehe nicht oft einkaufen, aber ich mag Märkte. Es gibt tolle Dinge zu entdecken!',
        en: 'I don\'t go shopping often, but I like markets. There are great things to discover!'
      }
    };

    if (topic && answers[topic]) {
      return isGerman ? answers[topic].de : answers[topic].en;
    }

    // 默认回答
    return isGerman
      ? 'Das ist eine gute Frage! Ich denke, es kommt darauf an. ' + personality.personalDe + '.'
      : 'That\'s a good question! I think it depends. ' + personality.personalEn + '.';
  }

  // 对用户分享的内容做出反应
  function generateReaction(pal, personality, topic, isGerman, randomInterest, userText) {
    var reactions = {
      weather: {
        de: 'Das Wetter klingt toll! Hier ist es auch gerade schön.',
        en: 'The weather sounds great! It\'s also nice here right now.'
      },
      food: {
        de: 'Das hört sich lecker an! Ich koche auch gerne. ' + personality.personalDe + '.',
        en: 'That sounds delicious! I also love to cook. ' + personality.personalEn + '.'
      },
      travel: {
        de: 'Wow, das klingt nach einem tollen Erlebnis! Ich möchte auch dorthin reisen.',
        en: 'Wow, that sounds like an amazing experience! I\'d love to travel there too.'
      },
      art: {
        de: 'Ich finde es toll, dass du dich für Kunst interessierst! Ich ' + randomInterest + '.',
        en: 'I think it\'s great that you\'re interested in art! I ' + randomInterest + '.'
      },
      music: {
        de: 'Musik ist toll! Ich höre auch gerne Musik, wenn ich ' + randomInterest + '.',
        en: 'Music is great! I also like listening to music when I ' + randomInterest + '.'
      },
      work: {
        de: 'Das klingt interessant! Arbeit kann herausfordernd sein, aber auch erfüllend.',
        en: 'That sounds interesting! Work can be challenging but also fulfilling.'
      },
      hobby: {
        de: 'Das ist ein tolles Hobby! Ich ' + randomInterest + '. Wir haben ähnliche Interessen!',
        en: 'That\'s a great hobby! I ' + randomInterest + '. We have similar interests!'
      },
      language: {
        de: 'Dein Deutsch wird immer besser! Weiter so! Ich ' + randomInterest + '.',
        en: 'Your English is getting better! Keep it up! I ' + randomInterest + '.'
      },
      family: {
        de: 'Das ist schön! Familie ist wichtig. Ich vermisse meine Familie manchmal.',
        en: 'That\'s lovely! Family is important. I miss my family sometimes.'
      },
      sport: {
        de: 'Sport ist toll für die Gesundheit! Ich ' + randomInterest + '.',
        en: 'Sports are great for health! I ' + randomInterest + '.'
      },
      book: {
        de: 'Ich lese auch gerne! Bücher sind wunderbar. Was liest du gerade?',
        en: 'I also love reading! Books are wonderful. What are you reading right now?'
      },
      film: {
        de: 'Ich mag auch Filme! Hast du einen Favoriten?',
        en: 'I also like movies! Do you have a favorite?'
      },
      pet: {
        de: 'Tiere sind toll! Ich habe auch ein Haustier.',
        en: 'Animals are great! I also have a pet.'
      },
      nature: {
        de: 'Die Natur ist wunderschön! ' + personality.cityDe + '.',
        en: 'Nature is beautiful! ' + personality.cityEn + '.'
      },
      tech: {
        de: 'Technologie ist faszinierend! Ich verfolge gerne neue Trends.',
        en: 'Technology is fascinating! I like following new trends.'
      }
    };

    if (topic && reactions[topic]) {
      return isGerman ? reactions[topic].de : reactions[topic].en;
    }

    // 默认反应 - 引用用户说的内容
    var shortText = userText.length > 40 ? userText.substring(0, 40) + '...' : userText;
    return isGerman
      ? 'Es ist interessant, was du sagst. Ich ' + randomInterest + '. Das ist etwas, das wir teilen könnten!'
      : 'It\'s interesting what you say. I ' + randomInterest + '. That\'s something we could share!';
  }

  // 保留旧函数名兼容
  function generateFallbackReply(pal, userText) {
    return generateContextualReply(pal, userText, []);
  }

  window.showPhraseBank = function () {
    var lang = currentPal ? currentPal.language : '德语';
    var bank = PHRASE_BANK[lang] || PHRASE_BANK['德语'];
    var html = '';
    Object.keys(bank).forEach(function (cat) {
      html += '<div class="phrase-group"><h5>' + cat + '</h5>';
      bank[cat].forEach(function (p) {
        html += '<div class="phrase-item" onclick="insertPhrase(this)">' + p + '</div>';
      });
      html += '</div>';
    });
    var content = $('phrase-content');
    if (content) content.innerHTML = html;
    var popup = $('phrase-popup');
    if (popup) popup.classList.add('show');
  };
  window.hidePhraseBank = function () { var p = $('phrase-popup'); if (p) p.classList.remove('show'); };
  window.insertPhrase = function (el) {
    var ta = $('write-textarea');
    if (ta) { ta.value += (ta.value ? ' ' : '') + el.textContent; ta.focus(); }
    hidePhraseBank();
  };
  window.showPrompt = function () {
    var lang = currentPal ? currentPal.language : '德语';
    var prompts = WRITING_PROMPTS[lang] || WRITING_PROMPTS['德语'];
    var p = prompts[Math.floor(Math.random() * prompts.length)];
    showToast(p, 4000);
  };
  window.insertStarter = function () {
    if (currentPal) {
      var ta = $('write-textarea');
      if (ta) { ta.value = currentPal.starter + '\n\n--- 我的回信 ---\n'; ta.focus(); }
    }
  };

  // =========================================================
  // === 理财金融板块 ===
  // =========================================================
  var financeIdx = -1;
  function renderFinance() {
    var cached = getDailyContent('finance');
    var arr = (cached && cached.length > 0) ? cached : FINANCE_CONCEPTS;
    var now = new Date();
    var dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    var idx = dayOfYear % arr.length;
    financeIdx = idx;
    setFinance(idx, arr);
    // 理财资源
    var resDiv = $('finance-resource-list');
    if (resDiv) {
      resDiv.innerHTML = '';
      FINANCE_RESOURCES.forEach(function (r) {
        var a = document.createElement('a');
        a.className = 'finance-resource-item'; a.href = r.url; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = '<span class="resource-badge ' + r.type + '">' + r.type + '</span><div class="resource-info"><div class="resource-name">' + r.name + '</div><div class="resource-desc">' + r.desc + '</div></div>';
        resDiv.appendChild(a);
      });
    }
    // 理财书籍推荐列表
    var booksDiv = $('finance-book-list');
    if (booksDiv) {
      booksDiv.innerHTML = '';
      var financeBooks = BOOK_RECOMMENDATIONS.filter(function(b) { return b.category === '理财' || b.category === '经济'; }).slice(0, 5);
      if (financeBooks.length === 0) financeBooks = BOOK_RECOMMENDATIONS.slice(0, 5);
      financeBooks.forEach(function (b) {
        var item = document.createElement('div');
        item.className = 'finance-book-item';
        item.style.cursor = 'pointer';
        item.innerHTML =
          '<span class="finance-book-cover">' + (b.cover || '📘') + '</span>' +
          '<div class="finance-book-info"><div class="finance-book-title">' + b.title + ' <span class="finance-book-level">推荐</span></div>' +
          '<div class="finance-book-meta">' + b.author + ' · ⭐' + b.rating + '</div>' +
          '<div class="finance-book-desc">' + (b.summary || b.reason || '') + '</div></div>' +
          '<a href="' + bookSearchUrl(b.title) + '" target="_blank" style="font-size:0.66rem;padding:0.25rem 0.55rem;border-radius:8px;flex-shrink:0;align-self:center;background:var(--accent);color:white;text-decoration:none;">搜索</a>';
        booksDiv.appendChild(item);
      });
    }
  }
  function setFinance(idx, arr) {
    financeIdx = idx;
    var c = arr[idx];
    if (!c) return;
    var el;
    if (el = $('finance-cat')) el.textContent = c.category;
    if (el = $('finance-title')) el.textContent = c.title;
    if (el = $('finance-summary')) el.textContent = c.summary;
    if (el = $('finance-action')) el.textContent = c.action || '';
  }
  window.openFinanceDetail = function (idx) {
    if (idx === undefined) idx = financeIdx;
    var cached = getDailyContent('finance');
    var arr = (cached && cached.length > 0) ? cached : FINANCE_CONCEPTS;
    var c = arr[idx];
    if (!c) return;
    var content = $('finance-detail-content');
    if (!content) return;
    content.innerHTML =
      '<span class="detail-tag" style="background:var(--accent-amber);">' + c.category + '</span>' +
      '<h2 class="detail-headline">' + c.title + '</h2>' +
      '<div class="detail-source">每日理财 · 财富自由之路</div>' +
      '<div class="detail-body">' +
      '<p style="font-weight:600;margin-bottom:0.8rem;font-size:0.92rem;">' + c.summary + '</p>' +
      '<p style="margin-bottom:1rem;">' + (c.detail || '') + '</p>' +
      '<div style="background:rgba(16,185,129,0.08);border-left:3px solid var(--accent-green);padding:0.8rem;border-radius:0 8px 8px 0;margin-top:0.5rem;">' +
      '<b style="color:var(--accent-green);font-size:0.75rem;display:block;margin-bottom:0.3rem;">💰 今日行动建议</b>' +
      '<span style="font-size:0.85rem;">' + (c.action || '') + '</span></div></div>';
    var overlay = $('finance-overlay');
    if (overlay) overlay.classList.add('show');
  };
  window.closeFinanceDetail = function (e) {
    if (e && e.target !== $('finance-overlay')) return;
    var overlay = $('finance-overlay'); if (overlay) overlay.classList.remove('show');
  };
  window.refreshFinance = function () {
    var cached = getDailyContent('finance');
    var arr = (cached && cached.length > 0) ? cached : FINANCE_CONCEPTS;
    var idx;
    do { idx = Math.floor(Math.random() * arr.length); } while (idx === financeIdx && arr.length > 1);
    setFinance(idx, arr);
    showToast('已换一个理财概念');
  };

  // === 数据管理 ===
  window.exportData = function () {
    var data = {};
    Object.values(STORE_KEYS).forEach(function (k) { data[k] = localStorage.getItem(k); });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'workbench-backup-' + todayKey() + '.json';
    a.click();
    showToast('数据已导出');
  };
  window.importData = function (event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var data = JSON.parse(e.target.result);
        Object.keys(data).forEach(function (k) { if (data[k]) localStorage.setItem(k, data[k]); });
        showToast('数据导入成功！');
        init();
      } catch (err) { showToast('导入失败：文件格式错误'); }
    };
    reader.readAsText(file);
    event.target.value = '';
  };
  window.clearAllData = function () {
    if (confirm('确定清除所有数据吗？此操作不可恢复。')) {
      Object.values(STORE_KEYS).forEach(function (k) { localStorage.removeItem(k); });
      showToast('所有数据已清除');
      init();
    }
  };

  // === PWA 安装提示 ===
  var deferredPrompt = null;
  function initPWA() {
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
      var dismissed = localStorage.getItem(STORE_KEYS.pwaDismissed);
      if (!dismissed) {
        setTimeout(function () {
          var prompt = $('pwa-install-prompt');
          if (prompt) prompt.style.display = 'block';
        }, 3000);
      }
    });
    var installBtn = $('pwa-install-btn');
    if (installBtn) {
      installBtn.addEventListener('click', function () {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function () {
            deferredPrompt = null;
            var prompt = $('pwa-install-prompt');
            if (prompt) prompt.style.display = 'none';
          });
        } else {
          showToast('请使用浏览器菜单"添加到主屏幕"');
        }
      });
    }
    var dismissBtn = $('pwa-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        var prompt = $('pwa-install-prompt');
        if (prompt) prompt.style.display = 'none';
        localStorage.setItem(STORE_KEYS.pwaDismissed, '1');
      });
    }
    window.addEventListener('appinstalled', function () {
      var prompt = $('pwa-install-prompt');
      if (prompt) prompt.style.display = 'none';
      showToast('已安装！可在桌面找到应用');
    });
  }

  // === 初始化 ===
  function init() {
    initHeader();
    renderTree();
    renderTasks();
    renderDailyQuote();
    renderNotes();
    renderDailyTheory();
    renderMonthlyBook();
    renderFinance();
    renderResources();
    renderNewsSummary();
    renderDrawing();
    renderPalList();
    checkAIServer();
    initPWA();
    // 异步获取AI每日内容（不阻塞渲染）
    setTimeout(fetchDailyContent, 1000);
  }

  // 笔记输入回车支持
  document.addEventListener('DOMContentLoaded', function () {
    var ni = $('note-input');
    if (ni) ni.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addNote(); } });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
