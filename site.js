// Shared script for all pages. Kept in a file (not inline) so the
// Content-Security-Policy in _headers can forbid inline scripts.

// Send first-time visitors whose browser prefers Swedish from the English
// homepage to /sv/, unless they picked a language with the EN/SV switch
// or arrived from another page on this site. Runs before the page renders.
(function () {
  try {
    if (location.pathname !== "/") return;
    var lang = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    var chosen = /(?:^|; )lang=/.test(document.cookie);
    var fromSite = document.referrer.indexOf(location.origin + "/") === 0;
    if (/^sv\b/i.test(lang) && !chosen && !fromSite) location.replace("/sv/");
  } catch (e) {}
})();

document.addEventListener("DOMContentLoaded", function () {
  // Remember the language picked in the EN/SV switch.
  document.querySelectorAll(".lang a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.cookie = "lang=" + a.hreflang + "; path=/; max-age=31536000; SameSite=Lax";
    });
  });
  // Keep the copyright year current.
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
});
