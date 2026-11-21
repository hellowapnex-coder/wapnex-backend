<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard - WapNex</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;transition:0.2s}
body{display:flex;min-height:100vh;background:#f8fafc}
.sidebar{width:240px;background:#fff;border-right:1px solid #eee;padding:20px;position:fixed;height:100vh;overflow:auto}
.logo{font-size:22px;font-weight:900;color:#2563eb}
.logo span{color:#111}
.menu{margin-top:24px;display:flex;flex-direction:column;gap:4px}
.menu a{padding:11px 12px;border-radius:8px;cursor:pointer;font-size:14px;color:#333;display:block}
.menu a.active{background:#2563eb;color:#fff;font-weight:bold}
.menu a:hover{background:#eef2ff}
.menu .label{font-size:11px;color:#999;margin:16px 0 6px;font-weight:bold}
.user-box{margin-top:20px;display:flex;gap:10px;align-items:center;background:#f8fafc;padding:10px;border-radius:10px}
.avatar{width:38px;height:38px;background:#2563eb;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold}
.main{flex:1;margin-left:240px;padding:24px;max-width:1100px}
.page{display:none}
.page.active{display:block}
h1{font-size:24px}
.sub{color:#666;font-size:13px;margin-top:4px}
.trial-bar{background:linear-gradient(90deg,#2563eb,#1e3a8a);color:#fff;border-radius:12px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;margin-top:16px;flex-wrap:wrap;gap:10px}
.trial-bar.purchased{background:linear-gradient(90deg,#16a34a,#15803d)}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:20px}
.card{background:#fff;border:1px solid #eee;border-radius:14px;padding:16px}
.card b{font-size:22px}
.card p{font-size:12px;color:#888;margin-top:4px}
.box{background:#fff;border:1px solid #eee;border-radius:14px;padding:18px;margin-top:16px}
.btn{background:#2563eb;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:bold;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn:hover{background:#1d4ed8}
.btn:disabled{opacity:0.7;cursor:not-allowed}
.btn-green{background:#25D366;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:bold;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-green:hover{background:#1eb857}
.btn-outline{background:#fff;border:1px solid #ddd;padding:10px 16px;border-radius:8px;cursor:pointer;font-weight:bold;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-outline:hover{background:#f8fafc}
.btn-sm{padding:6px 12px;font-size:12px;border-radius:7px}
.btn-danger{background:#fef2f2;color:#dc2626;border:1px solid #fecaca}
.btn-danger:hover{background:#fee2e2}
input,select,textarea{width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-top:6px;outline:none;background:#fff}
input:focus,select:focus,textarea:focus{border-color:#2563eb}
label{font-size:13px;font-weight:bold;display:block;margin-top:12px}
table{width:100%;border-collapse:collapse;margin-top:12px;font-size:13px}
th,td{padding:10px;border-bottom:1px solid #eee;text-align:left}
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:#fff;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.18);padding:11px 18px;display:flex;gap:10px;font-size:14px;z-index:9999;opacity:0;pointer-events:none;transition:0.25s}
.toast.show{opacity:1}
.toast .t-icon{width:22px;height:22px;background:#ef4444;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px}
.toast.success .t-icon{background:#16a34a}
.toggle{display:flex;gap:8px;margin:14px 0}
.toggle button{padding:8px 16px;border-radius:20px;border:1px solid #ddd;background:#fff;cursor:pointer;font-weight:bold;font-size:13px}
.toggle button.active{background:#2563eb;color:#fff;border-color:#2563eb}
.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}
.plan{border:1px solid #e2e8f0;border-radius:14px;padding:18px;position:relative;background:#fff;cursor:pointer}
.plan.popular{border:1px solid #e2e8f0}
.plan.selected{border:2px solid #2563eb !important;box-shadow:0 8px 24px rgba(37,99,235,0.12)}
.plan .badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#2563eb;color:#fff;font-size:11px;padding:4px 10px;border-radius:20px}
.plan .price{font-size:28px;font-weight:900;margin:10px 0 2px}
.plan ul{list-style:none;margin-top:10px;font-size:13px;line-height:2;color:#444}
.plan ul li:before{content:"✓ ";color:#16a34a;font-weight:bold}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:none;align-items:center;justify-content:center;z-index:1000;padding:16px}
.modal-bg.show{display:flex}
.modal{background:#fff;border-radius:16px;width:100%;max-width:480px;padding:24px;position:relative;max-height:92vh;overflow:auto}
.close{position:absolute;right:16px;top:14px;font-size:22px;cursor:pointer;border:none;background:none}
.lock-banner{background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:14px 16px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
.lock-banner b{color:#92400e;font-size:14px}
.lock-banner p{color:#78350f;font-size:12px;margin-top:3px}
.camp-meta{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;background:#f1f5f9;padding:10px 12px;border-radius:10px;margin-top:12px;font-size:12px;color:#334155}
.camp-item{margin-top:12px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px}
.camp-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.pill-sent{background:#dcfce7;color:#166534;font-size:11px;font-weight:bold;padding:3px 9px;border-radius:999px}
.pill-off{background:#f1f5f9;color:#64748b;font-size:11px;font-weight:bold;padding:3px 9px;border-radius:999px}
.preset-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.preset-chip{background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;padding:5px 10px;border-radius:999px;font-size:12px;font-weight:bold;cursor:pointer}
.preset-chip:hover{background:#dbeafe}
.temp-card{margin-top:12px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px}
.temp-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.contact-toolbar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9}
.action-group{display:flex;gap:6px;flex-wrap:wrap}
.auto-rule{border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;padding:14px;margin-top:12px}
.auto-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.auto-check{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:bold;cursor:pointer;margin-top:0}
.auto-check input{width:auto;margin-top:0;cursor:pointer}
.auto-desc{font-size:12px;color:#64748b;margin-top:4px}
.auto-msg{margin-top:8px;font-size:13px}
.auto-footer{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px}
.ai-chat-box{margin-top:18px;padding-top:16px;border-top:1px solid #e2e8f0}
.ai-messages{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;max-height:260px;overflow:auto;display:flex;flex-direction:column;gap:8px;margin-top:10px}
.ai-bubble{padding:9px 12px;border-radius:10px;font-size:13px;line-height:1.45;max-width:85%}
.ai-bubble.bot{background:#fff;border:1px solid #e2e8f0;align-self:flex-start;color:#1e293b}
.ai-bubble.user{background:#2563eb;color:#fff;align-self:flex-end}
.support-thread{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;max-height:200px;overflow:auto;display:flex;flex-direction:column;gap:8px;margin-top:12px}
.support-meta{font-size:10px;opacity:0.75;margin-top:3px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.demo-list-box{margin-top:18px;padding-top:14px;border-top:1px solid #e2e8f0}
.demo-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-top:8px;font-size:12px}
.pay-banner{margin-top:14px;padding:12px 14px;border-radius:12px;border:1px solid #e2e8f0;background:#f8fafc;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
.pay-banner.ok{background:#f0fdf4;border-color:#bbf7d0;color:#166534}
.pay-banner.err{background:#fef2f2;border-color:#fecaca;color:#991b1b}
.pay-banner.wait{background:#eff6ff;border-color:#bfdbfe;color:#1e40af}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.spinner{width:16px;height:16px;border:2.5px solid rgba(255,255,255,0.35);border-radius:50%;border-top-color:#fff;animation:spin 0.8s linear infinite;display:inline-block}
@media(max-width:800px){.sidebar{width:70px;padding:12px}.sidebar .hide-m{display:none}.main{margin-left:70px}.cards{grid-template-columns:1fr 1fr}.plans{grid-template-columns:1fr}.grid-2{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="toast" id="toast"><span class="t-icon" id="toast-icon">✕</span><span id="toast-text">Done</span></div>

<div class="sidebar">
<div class="logo">Wap<span>Nex</span></div>
<div class="menu">
<a id="m-dashboard" class="active" onclick="showPage('dashboard')">🏠 <span class="hide-m">Dashboard</span></a>
<a id="m-chats" onclick="showPage('chats')">💬 <span class="hide-m">Chats</span></a>
<a id="m-campaigns" onclick="showPage('campaigns')">📢 <span class="hide-m">Campaigns</span></a>
<a id="m-templates" onclick="showPage('templates')">📄 <span class="hide-m">Templates</span></a>
<a id="m-contacts" onclick="showPage('contacts')">👥 <span class="hide-m">Contacts</span></a>
<a id="m-automation" onclick="showPage('automation')">⚡ <span class="hide-m">Automation</span></a>
<a id="m-ai" onclick="showPage('ai')">🤖 <span class="hide-m">AI Agent</span></a>
<a id="m-plans" onclick="showPage('plans')">⭐ <span class="hide-m">Plans</span></a>
<div class="label hide-m">NEED HELP?</div>
<a onclick="openSupportChat()">💬 <span class="hide-m">Chat with us</span></a>
<a onclick="openBookDemo()">📅 <span class="hide-m">Book a demo</span></a>
</div>
<div class="user-box"><div class="avatar" id="user-avatar">T</div><div class="hide-m"><b style="font-size:13px" id="user-name">Talim</b><div style="font-size:11px;color:#888" id="user-email">customer@wapnex.in</div></div></div>
<button class="btn-outline" style="width:100%;margin-top:12px" onclick="doLogout()">Logout</button>
</div>

<div class="main">
<!-- DASHBOARD -->
<div class="page active" id="page-dashboard">
<h1>Welcome back, <span id="welcome-name"></span> 👋</h1>
<div class="trial-bar" id="dashboard-top-bar"><div><b>🎉 7-Day Free Trial Active</b><div style="font-size:12px;opacity:0.9"><span id="trial-days">7</span> days left - Upgrade to continue</div></div><button class="btn" style="background:#fff;color:#2563eb" onclick="showPage('plans')">Upgrade Now</button></div>
<div class="cards">
<div class="card"><b id="stat-chats">0</b><p>Total Chats</p></div>
<div class="card"><b id="stat-contacts">0</b><p>Total Contacts</p></div>
<div class="card"><b id="stat-campaigns">0</b><p>Campaigns</p></div>
<div class="card"><b id="stat-messages">0</b><p>Messages Sent</p></div>
</div>
<div class="box"><b>Connect WhatsApp</b><p class="sub">Apna WhatsApp connect karo aur chatting start karo</p><br><button class="btn-green" onclick="openConnect()">Connect WhatsApp</button> <button class="btn-outline" onclick="showPage('chats')">Open Chats</button></div>
<div class="box"><b>Quick Actions</b><br><br><button class="btn" onclick="showPage('chats')">Open Chats</button> <button class="btn-green" onclick="openAddContact()">+ Add Contact</button> <button class="btn-outline" onclick="showPage('campaigns')">New Campaign</button> <button class="btn-outline" onclick="showPage('plans')">View Plans</button></div>
<div class="box"><b>Your Plan: <span id="current-plan">Pro - Monthly (Trial)</span></b><p class="sub" id="plan-status-sub">7-day free trial active. Upgrade anytime.</p><br><button class="btn" id="plan-action-btn" onclick="showPage('plans')">Upgrade Plan</button></div>
</div>

<!-- CHATS -->
<div class="page" id="page-chats">
<h1>Chats</h1>
<p class="sub">Manage customer conversations and message your contacts</p>

<div class="lock-banner" id="chat-premium-banner">
  <div>
    <b>🔒 Premium Plan Required for Live Chats</b>
    <p>You can add contacts now, but opening chats and sending messages is available only on an active paid plan.</p>
  </div>
  <button class="btn" style="margin-top:0" onclick="showPage('plans')">Upgrade to Premium</button>
</div>

<div class="box">
<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
<input id="chat-search" placeholder="🔍 Search name or number" style="flex:1;min-width:180px" oninput="renderChats()">
<button class="btn" onclick="openAddContact()">+ Add Contact</button>
</div>
<div id="chat-list" style="display:flex;flex-direction:column;gap:8px"></div>
<div id="chat-empty" style="text-align:center;color:#888;padding:30px;border:1px dashed #ddd;border-radius:10px">No chats yet. Click <b>+ Add Contact</b> above to save a customer contact.</div>
<div id="chat-open-box" style="display:none;margin-top:14px;border:1px solid #e2e8f0;border-radius:14px;padding:16px;background:#f8fafc">
<b id="chat-open-name">Talim</b><p style="font-size:12px;color:#666" id="chat-open-number">+91 98127 27771</p>
<div id="chat-msgs" style="margin-top:12px;display:flex;flex-direction:column;gap:8px;max-height:220px;overflow:auto"></div>
<div style="display:flex;gap:8px;margin-top:12px"><input id="chat-msg-input" placeholder="Type a message..." onkeydown="if(event.key==='Enter') sendChatMsg()"><button class="btn-green" onclick="sendChatMsg()">Send</button></div>
<p style="font-size:11px;color:#999;margin-top:8px">* Messages are saved in your workspace chat history.</p>
</div>
</div>
</div>

<!-- CAMPAIGNS -->
<div class="page" id="page-campaigns">
<h1>Campaigns</h1>
<p class="sub">Send broadcast messages to your contacts</p>
<div class="box">
<div class="camp-meta">
  <span>📋 Saved Contacts: <b id="camp-contact-count">0</b></span>
  <span style="cursor:pointer;color:#2563eb;font-weight:bold" onclick="showPage('contacts')">+ Manage Contacts</span>
</div>

<label>Campaign Name</label>
<input id="camp-name" placeholder="Enter name">

<label>Audience</label>
<select id="camp-audience" onchange="toggleCampSingleNumber()">
  <option value="all">All Saved Contacts</option>
  <option value="single">Single Number</option>
</select>

<div id="camp-single-wrap" style="display:none">
<label>Recipient Number</label>
<input id="camp-single-num" placeholder="Enter number" maxlength="10">
</div>

<label>Message</label>
<textarea id="camp-msg" rows="3" placeholder="Write your broadcast message here..."></textarea>

<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
  <button class="btn" id="send-camp-btn" onclick="createCampaign()">Send Campaign</button>
  <button class="btn-outline" onclick="clearCampaigns()">Clear History</button>
</div>

<div id="camp-list"></div>
</div>
</div>

<!-- TEMPLATES -->
<div class="page" id="page-templates">
<h1>Templates</h1>
<p class="sub">Create ready-made message templates and reuse them anytime</p>
<div class="box">
<div style="font-size:12px;color:#666">Quick Sample Fill:</div>
<div class="preset-row">
  <button type="button" class="preset-chip" onclick="fillTemplatePreset('welcome')">👋 Welcome Message</button>
  <button type="button" class="preset-chip" onclick="fillTemplatePreset('offer')">🎁 Special Offer</button>
  <button type="button" class="preset-chip" onclick="fillTemplatePreset('reminder')">⏰ Friendly Reminder</button>
</div>

<label>Template Name</label>
<input id="temp-name" placeholder="Enter template name (e.g. Welcome Message)">

<label>Message</label>
<textarea id="temp-msg" rows="3" placeholder="Type ready-made message here..."></textarea>

<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
  <button class="btn" onclick="saveTemplate()">Save Template</button>
  <button class="btn-outline" onclick="clearTemplateInputs()">Clear</button>
</div>

<div id="temp-list"></div>
</div>
</div>

<!-- CONTACTS -->
<div class="page" id="page-contacts">
<h1>Contacts</h1>
<p class="sub">Manage and view all your saved customer contacts</p>
<div class="box">
<label>Name</label>
<input id="contact-name" placeholder="Full Name" onkeydown="if(event.key==='Enter') saveContact()">

<label>Number</label>
<input id="contact-number" placeholder="10 digit number" maxlength="10" oninput="this.value=this.value.replace(/[^0-9]/g,'')" onkeydown="if(event.key==='Enter') saveContact()">

<button type="button" class="btn" style="margin-top:14px" onclick="saveContact()">+ Add Contact</button>

<div class="contact-toolbar">
  <input id="contact-search" placeholder="🔍 Search contact by name or number" style="flex:1;min-width:200px;margin-top:0" oninput="renderContacts()">
  <span style="font-size:12px;color:#64748b">Total Saved: <b id="contacts-total-label">0</b></span>
</div>

<table>
<thead>
<tr><th>Name</th><th>Number</th><th>Action</th></tr>
</thead>
<tbody id="contacts-table"></tbody>
</table>
</div>
</div>

<!-- AUTOMATION -->
<div class="page" id="page-automation">
<h1>Automation</h1>
<p class="sub">Set it once, run forever</p>
<div class="box">
<div class="camp-meta" style="margin-top:0">
  <span>⚡ Active Automations: <b id="auto-active-count">0 / 3</b></span>
  <span id="auto-last-saved" style="color:#64748b">Not saved yet</span>
</div>

<div class="auto-rule">
  <div class="auto-head">
    <label class="auto-check">
      <input type="checkbox" id="auto-welcome-enabled" onchange="syncAutomationBadges()">
      Welcome Message
    </label>
    <span id="badge-welcome" class="pill-off">OFF</span>
  </div>
  <div class="auto-desc">Trigger: When a new contact or first-time customer messages you.</div>
  <textarea id="auto-welcome-msg" class="auto-msg" rows="2" placeholder="Welcome message text..."></textarea>
  <div class="auto-footer">
    <span style="font-size:11px;color:#64748b">Delay: Instant</span>
    <button type="button" class="btn-outline btn-sm" onclick="testAutomationRule('welcome')">Test Rule</button>
  </div>
</div>

<div class="auto-rule">
  <div class="auto-head">
    <label class="auto-check">
      <input type="checkbox" id="auto-cart-enabled" onchange="syncAutomationBadges()">
      Cart Recovery
    </label>
    <span id="badge-cart" class="pill-off">OFF</span>
  </div>
  <div class="auto-desc">Trigger: When a customer leaves checkout or inquiry incomplete.</div>
  <textarea id="auto-cart-msg" class="auto-msg" rows="2" placeholder="Cart recovery message text..."></textarea>
  <div class="auto-footer">
    <span style="font-size:11px;color:#64748b">Delay: 30 mins</span>
    <button type="button" class="btn-outline btn-sm" onclick="testAutomationRule('cart')">Test Rule</button>
  </div>
</div>

<div class="auto-rule">
  <div class="auto-head">
    <label class="auto-check">
      <input type="checkbox" id="auto-birthday-enabled" onchange="syncAutomationBadges()">
      Birthday Offer
    </label>
    <span id="badge-birthday" class="pill-off">OFF</span>
  </div>
  <div class="auto-desc">Trigger: Sends a special greeting or discount on customer birthday.</div>
