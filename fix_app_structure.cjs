// Fix the App.tsx structure by moving PWAInstallButton inside the main return
const fs = require('fs');

const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the problematic section and fix it
const oldStructure = `    </div>

      {/* Prominent PWA Installation Button */}
      <PWAInstallButton
        currentLang={currentLang}
        isVisible={true}
        onInstall={() => console.log('PWA install requested')}
        onDismiss={() => console.log('PWA install dismissed')}
      />
    </div>
  );
}`;

const newStructure = `    </div>

      {/* Prominent PWA Installation Button */}
      <PWAInstallButton
        currentLang={currentLang}
        isVisible={true}
        onInstall={() => console.log('PWA install requested')}
        onDismiss={() => console.log('PWA install dismissed')}
      />
    </div>
  );
}`;

content = content.replace(oldStructure, newStructure);

fs.writeFileSync(filePath, content);
console.log('Fixed App.tsx structure');
