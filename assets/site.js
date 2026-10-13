// Light/dark toggle. Follows the OS setting until the visitor picks one.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-btn");
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);

  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paint() {
    if (!btn) return;
    btn.textContent = isDark() ? "☀" : "☾";
    btn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
  }
  paint();
  if (btn) btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
