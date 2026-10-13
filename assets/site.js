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

  // "Last updated": GitHub Pages sets Last-Modified to the deploy time,
  // so this changes on every push. Stays hidden if the header is missing.
  var upd = document.getElementById("updated");
  if (upd && window.fetch && location.protocol.indexOf("http") === 0) {
    fetch(location.href, { method: "HEAD", cache: "no-store" })
      .then(function (r) {
        var lm = r.headers.get("Last-Modified");
        if (!lm) return;
        var d = new Date(lm);
        if (isNaN(d)) return;
        var t = upd.querySelector("time");
        t.dateTime = d.toISOString();
        t.textContent = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
        upd.hidden = false;
      })
      .catch(function () {});
  }
})();
