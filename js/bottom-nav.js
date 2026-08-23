function renderBottomNav(active) {
  const items = [
    { id: "feed", href: "feed.html", label: "Feed", icon: "🏠" },
    { id: "ai-chat", href: "ai-chat.html", label: "AI Chat", icon: "🧠" },
    { id: "chat", href: "chat.html", label: "Messages", icon: "💬" },
    { id: "profile", href: "profile.html", label: "Profile", icon: "👤" },
  ];

  const nav = document.getElementById("bottomNav");
  if (!nav) return;

  nav.innerHTML = items.map(item => `
    <a href="${item.href}" class="nav-item ${item.id === active ? 'active' : ''}">
      <span style="font-size:18px;">${item.icon}</span>
      <span>${item.label}</span>
    </a>
  `).join("");
}