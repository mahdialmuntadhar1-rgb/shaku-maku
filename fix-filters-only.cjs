const fs = require("fs");

const file = "src/App.tsx";
let text = fs.readFileSync(file, "utf8");

const startMarker = "        {/* Custom Premium Governorate & Category Filtering Dropdowns";
const endMarker = "        {/* Visual Dual Entry Cards:";

const start = text.indexOf(startMarker);
const end = text.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error("Could not find filter block. No file changed.");
}

const cleanFilterBlock = String.raw`
        {/* Custom Premium Governorate & Category Filtering Dropdowns (Directly beneath Hero Banner) */}
        <div className="mb-6 max-w-sm mx-auto px-2 space-y-4 relative z-30">
          <div>
            <div className="text-[10px] font-black text-luxury-gold uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
              <span>
                {currentLang === 'en'
                  ? 'Select Iraqi Governorate / Region'
                  : currentLang === 'ku'
                    ? "\u067e\u0627\u0631\u06ce\u0632\u06af\u0627 \u0647\u06d5\u06b5\u0628\u0698\u06ce\u0631\u06d5"
                    : "\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u062d\u0627\u0641\u0638\u0629 \u0627\u0644\u0639\u0631\u0627\u0642\u064a\u0629"}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setGovDropdownOpen(!govDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs font-bold bg-[#16161a] hover:bg-[#1f1f26] text-white px-4 py-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">📍</span>
                  <span>{GOVERNORATES.find(g => g.code === selectedGov)?.name[currentLang]}</span>
                </div>
                <ChevronDown className={'w-4 h-4 text-luxury-gold transition-transform duration-300 ' + (govDropdownOpen ? 'rotate-180' : '')} />
              </button>

              {govDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans">
                  {GOVERNORATES.map((gov) => (
                    <button
                      key={gov.code}
                      onClick={() => {
                        setSelectedGov(gov.code);
                        setGovDropdownOpen(false);
                        setActiveTab('discover');
                      }}
                      className={
                        'text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ' +
                        (selectedGov === gov.code
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold')
                      }
                    >
                      <span className="truncate">{gov.name[currentLang]}</span>
                      {selectedGov === gov.code && <span className="text-[9px]">✨</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black text-luxury-gold uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
              <span>
                {currentLang === 'en'
                  ? '🔎 Filter by Category'
                  : currentLang === 'ku'
                    ? "\u{1F50E} \u0628\u06d5\u067e\u06ce\u06cc \u067e\u06c6\u0644 \u0647\u06d5\u06b5\u0628\u0698\u06ce\u0631\u06d5"
                    : "\u{1F50E} \u062a\u0635\u0641\u064a\u0629 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629"}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setGovDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs font-bold bg-[#16161a] hover:bg-[#1f1f26] text-white px-4 py-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.icon || '🏷️' : '🏷️'}
                  </span>
                  <span>
                    {selectedCategory
                      ? CATEGORIES.find(c => c.id === selectedCategory)?.name[currentLang]
                      : (currentLang === 'en'
                          ? 'All Categories'
                          : currentLang === 'ku'
                            ? "\u0647\u06d5\u0645\u0648\u0648 \u067e\u06c6\u0644\u06d5\u06a9\u0627\u0646"
                            : "\u062c\u0645\u064a\u0639 \u0627\u0644\u0641\u0626\u0627\u062a")}
                  </span>
                </div>
                <ChevronDown className={'w-4 h-4 text-luxury-gold transition-transform duration-300 ' + (categoryDropdownOpen ? 'rotate-180' : '')} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCategoryDropdownOpen(false);
                      setActiveTab('discover');
                    }}
                    className={
                      'text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ' +
                      (selectedCategory === null
                        ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                        : 'text-zinc-300 hover:bg-white/5 font-semibold')
                    }
                  >
                    <span>
                      🏷️ {currentLang === 'en'
                        ? 'All Categories'
                        : currentLang === 'ku'
                          ? "\u0647\u06d5\u0645\u0648\u0648 \u067e\u06c6\u0644\u06d5\u06a9\u0627\u0646"
                          : "\u062c\u0645\u064a\u0639 \u0627\u0644\u0641\u0626\u0627\u062a"}
                    </span>
                    {selectedCategory === null && <span className="text-[9px]">✨</span>}
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCategoryDropdownOpen(false);
                        setActiveTab('discover');
                      }}
                      className={
                        'text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ' +
                        (selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold')
                      }
                    >
                      <span className="truncate">{cat.icon} {cat.name[currentLang]}</span>
                      {selectedCategory === cat.id && <span className="text-[9px]">✨</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

`;

text = text.slice(0, start) + cleanFilterBlock + text.slice(end);

fs.writeFileSync(file, text, "utf8");

console.log("Filters-only block fixed safely.");
