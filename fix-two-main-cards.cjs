const fs = require("fs");

const file = "src/App.tsx";
let text = fs.readFileSync(file, "utf8");

const startMarker = "        {/* Visual Dual Entry Cards: Chaykhana + Shko Maku */}";
const endMarker = "{/* Core Dashboard Content Switcher tabs */}";

const start = text.indexOf(startMarker);
const end = text.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error("Could not find the two main cards block. No file changed.");
}

const replacement = String.raw`
        {/* Visual Dual Entry Cards: Chaykhana + Shaku Maku */}
        <div className="mt-4 mb-6 max-w-5xl mx-auto px-1.5 sm:px-3" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5">

            {/* Chaykhana Social Card */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('feed');
                const catElem = document.getElementById('discovery-catalog-section');
                if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={
                'group relative min-h-[270px] overflow-hidden rounded-[2.25rem] border p-6 text-center transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] ' +
                (activeTab === 'feed'
                  ? 'border-rose-300/90 bg-[#2a1118] shadow-[0_0_42px_rgba(244,63,94,0.38)]'
                  : 'border-rose-300/35 bg-[#1a0d12]/95 shadow-[0_0_28px_rgba(244,63,94,0.18)] hover:border-rose-300/80')
              }
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.32),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(251,113,133,0.22),transparent_42%)]" />

              <div className="relative z-10 flex h-full flex-col items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-5xl font-black text-rose-100 leading-tight [font-family:Tahoma,Arial,sans-serif]">
                    {currentLang === 'en' ? 'Chaykhana' : currentLang === 'ku' ? "\u0686\u0627\u06cc\u062e\u0627\u0646\u06d5" : "\u0686\u0627\u064a\u062e\u0627\u0646\u0629"}
                  </h3>

                  <p className="mt-1 text-[11px] sm:text-lg font-bold text-rose-100/75 [font-family:Tahoma,Arial,sans-serif]">
                    {currentLang === 'en' ? 'See what is new' : currentLang === 'ku' ? "\u0628\u0628\u06cc\u0646\u06d5 \u0686\u06cc \u0646\u0648\u06ce\u06cc\u06d5" : "\u0634\u0648\u0641 \u0634\u0646\u0648 \u0627\u0644\u062c\u062f\u064a\u062f"}
                  </p>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute h-12 w-12 sm:h-24 sm:w-24 rounded-full bg-rose-400/20 blur-2xl" />
                  <Coffee className="relative h-20 w-20 text-rose-100 drop-shadow-[0_0_18px_rgba(255,190,190,0.5)]" />
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="rounded-2xl bg-white/10 p-3 text-rose-100"><MessageCircle className="h-5 w-5" /></span>
                  <span className="rounded-2xl bg-white/10 p-3 text-rose-100"><Heart className="h-5 w-5" /></span>
                  <span className="rounded-2xl bg-white/10 p-3 text-rose-100"><Share2 className="h-5 w-5" /></span>
                </div>

                <div className="w-full rounded-full border border-rose-200/45 px-2 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-black text-rose-50 [font-family:Tahoma,Arial,sans-serif]">
                  {currentLang === 'en' ? 'Enter' : currentLang === 'ku' ? "\u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5" : "\u0627\u0644\u062f\u062e\u0648\u0644"}
                </div>
              </div>
            </button>

            {/* Shaku Maku Business Card */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('discover');
                const catElem = document.getElementById('discovery-catalog-section');
                if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={
                'group relative min-h-[270px] overflow-hidden rounded-[2.25rem] border p-6 text-center transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] ' +
                (activeTab === 'discover'
                  ? 'border-cyan-200/90 bg-[#0b2529] shadow-[0_0_42px_rgba(34,211,238,0.38)]'
                  : 'border-cyan-200/35 bg-[#0b171a]/95 shadow-[0_0_28px_rgba(34,211,238,0.18)] hover:border-cyan-200/80')
              }
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.30),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.22),transparent_42%)]" />

              <div className="relative z-10 flex h-full flex-col items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-5xl font-black text-cyan-100 leading-tight [font-family:Tahoma,Arial,sans-serif]">
                    {currentLang === 'en' ? 'Shaku Maku' : currentLang === 'ku' ? "\u0634\u06a9\u0648 \u0645\u0627\u06a9\u0648" : "\u0634\u0643\u0648 \u0645\u0627\u0643\u0648"}
                  </h3>

                  <p className="mt-1 text-[11px] sm:text-lg font-bold text-cyan-100/75 [font-family:Tahoma,Arial,sans-serif]">
                    {currentLang === 'en' ? 'Business directory' : currentLang === 'ku' ? "\u0695\u06ce\u0628\u06d5\u0631\u06cc \u06a9\u0627\u0631 \u0648 \u062e\u0632\u0645\u06d5\u062a\u06af\u0648\u0632\u0627\u0631\u06cc" : "\u062f\u0644\u064a\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0648\u0627\u0644\u062e\u062f\u0645\u0627\u062a"}
                  </p>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute h-12 w-12 sm:h-24 sm:w-24 rounded-full bg-cyan-300/20 blur-2xl" />
                  <div className="relative grid grid-cols-2 gap-3 text-cyan-100">
                    <Search className="h-11 w-11" />
                    <Store className="h-11 w-11" />
                    <MapPin className="h-11 w-11" />
                    <Sparkles className="h-11 w-11" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 sm:gap-2 w-full text-[9px] sm:text-sm font-black [font-family:Tahoma,Arial,sans-serif]">
                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {currentLang === 'en' ? 'Cafes' : currentLang === 'ku' ? "\u06a9\u0627\u0641\u06ce" : "\u0643\u0627\u0641\u064a\u0647\u0627\u062a"}
                  </span>

                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {currentLang === 'en' ? 'Restaurants' : currentLang === 'ku' ? "\u0686\u06ce\u0634\u062a\u062e\u0627\u0646\u06d5" : "\u0645\u0637\u0627\u0639\u0645"}
                  </span>

                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {currentLang === 'en' ? 'Doctors' : currentLang === 'ku' ? "\u062f\u06a9\u062a\u06c6\u0631" : "\u0623\u0637\u0628\u0627\u0621"}
                  </span>

                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {currentLang === 'en' ? 'More' : currentLang === 'ku' ? "\u0632\u06cc\u0627\u062a\u0631" : "\u0627\u0644\u0645\u0632\u064a\u062f"}
                  </span>
                </div>

                <div className="w-full rounded-full border border-cyan-100/45 px-2 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-black text-cyan-50 [font-family:Tahoma,Arial,sans-serif]">
                  {currentLang === 'en' ? 'Enter' : currentLang === 'ku' ? "\u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5" : "\u0627\u0644\u062f\u062e\u0648\u0644"}
                </div>
              </div>
            </button>
          </div>

          <p className="mt-3 sm:mt-5 text-center text-[11px] sm:text-sm font-bold text-zinc-400 [font-family:Tahoma,Arial,sans-serif]">
            {currentLang === 'en' ? 'Choose the section you want to enter' : currentLang === 'ku' ? "\u0628\u06d5\u0634\u06ce\u06a9 \u0647\u06d5\u06b5\u0628\u0698\u06ce\u0631\u06d5 \u0628\u06c6 \u0686\u0648\u0648\u0646\u06d5\u0698\u0648\u0648\u0631\u06d5\u0648\u06d5" : "\u0627\u062e\u062a\u0631 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0630\u064a \u062a\u0631\u064a\u062f \u0627\u0644\u062f\u062e\u0648\u0644 \u0625\u0644\u064a\u0647"}
          </p>
        </div>

`;

text = text.slice(0, start) + replacement + text.slice(end);

fs.writeFileSync(file, text, "utf8");

console.log("Fixed the two main cards text safely.");
