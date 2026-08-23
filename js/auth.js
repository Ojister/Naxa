// ===== SHARED AUTH HELPERS =====

async function requireAuth() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = "/pages/login.html";
    return null;
  }
  return session.user;
}

async function redirectIfLoggedIn() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    window.location.href = "/pages/feed.html";
  }
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "/index.html";
}

function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "?";
  const base = nameOrEmail.split("@")[0];
  return base.slice(0, 2).toUpperCase();
}

async function ensureProfile(user) {
  const { data: existing } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!existing) {
    const username = (user.email || "user").split("@")[0];
    await supabaseClient.from("profiles").insert({
      id: user.id,
      username: username,
      email: user.email,
    });
    return { id: user.id, username, email: user.email };
  }
  return existing;
}