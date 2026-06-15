const fs = require("fs");

const indexPath = "index.html";
let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(
  /<!-- SHAKU_MAKU_PWA_INSTALL_CAPTURE_START -->[\s\S]*?<!-- SHAKU_MAKU_PWA_INSTALL_CAPTURE_END -->/g,
  ""
);

const captureScript = `
<!-- SHAKU_MAKU_PWA_INSTALL_CAPTURE_START -->
<script>
  window.__shakuMakuInstallPrompt = null;
  window.__shakuMakuInstalled = false;

  window.addEventListener('beforeinstallprompt', function(event) {
    event.preventDefault();
    window.__shakuMakuInstallPrompt = event;
    window.dispatchEvent(new CustomEvent('shaku-maku-install-ready'));
  });

  window.addEventListener('appinstalled', function() {
    window.__shakuMakuInstalled = true;
    window.__shakuMakuInstallPrompt = null;
    window.dispatchEvent(new CustomEvent('shaku-maku-installed'));
  });
</script>
<!-- SHAKU_MAKU_PWA_INSTALL_CAPTURE_END -->
`;

html = html.replace("</head>", captureScript + "\n</head>");

fs.writeFileSync(indexPath, html, "utf8");
console.log("Added early PWA install prompt capture to index.html");
