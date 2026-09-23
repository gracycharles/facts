import { ShortsBlueprint } from '../types';

export interface TenSecondScriptOptimization {
  id: number;
  tenSecAudioScript: string;
  audioPhoneticsGuide: string;
  overlayHook: string;
  overlayCoreFact: string;
  overlayLocationBadge: string;
  extraImportantContext: string;
}

export const TEN_SECOND_OPTIMIZATIONS: Record<number, TenSecondScriptOptimization> = {
  1: {
    id: 1,
    tenSecAudioScript: "Glasgow's most iconic landmark isn't a castle—it's a Duke crowned with a traffic cone! Locals replace it every weekend!",
    audioPhoneticsGuide: "Glasgow [GLAZ-go], GoMA [GO-ma]",
    overlayHook: "GLASGOW'S TRAFFIC CONE DUKE",
    overlayCoreFact: "Council spent £65K trying to remove it — 10,000 locals revolted in 24 hours!",
    overlayLocationBadge: "📍 GoMA, Glasgow • Banksy's #1 UK Landmark",
    extraImportantContext: "10,000 citizens signed a petition within 24 hours to protect the cone. Banksy declared it his favourite UK artwork."
  },
  2: {
    id: 2,
    tenSecAudioScript: "Need to set your watch? Edinburgh Castle has fired this cannon at one o'clock every day since 1861!",
    audioPhoneticsGuide: "Edinburgh [ED-in-bur-ruh], Firth of Forth [FERTH of FORTH]",
    overlayHook: "EDINBURGH'S 1 O'CLOCK CANNON",
    overlayCoreFact: "Fired since 1861 for ship chronometers — 50,000+ blasts still startling Princes St tourists!",
    overlayLocationBadge: "📍 Mills Mount Battery • Edinburgh Castle",
    extraImportantContext: "Synchronized with the Nelson Monument time ball on Calton Hill. Fired over 50,000 times since 1861."
  },
  3: {
    id: 3,
    tenSecAudioScript: "Scotland's official national animal isn't a stag or an eagle—it is literally a wild mythical Unicorn!",
    audioPhoneticsGuide: "Celtic [KEL-tik]",
    overlayHook: "SCOTLAND'S NATIONAL UNICORN",
    overlayCoreFact: "Adopted by King William I in the 12th century — chained because unchained unicorns are too wild!",
    overlayLocationBadge: "📍 Royal Arms of Scotland • Stirling Castle",
    extraImportantContext: "In Celtic lore, the unicorn was the natural enemy of the lion (symbol of England) and too noble to be tamed."
  },
  4: {
    id: 4,
    tenSecAudioScript: "The world's famous deep-fried Mars bar was invented in 1995 right here at a Stonehaven chip shop!",
    audioPhoneticsGuide: "Stonehaven [stone-HAY-ven]",
    overlayHook: "THE DEEP-FRIED MARS BAR",
    overlayCoreFact: "Born 1995 in Aberdeenshire — dipped in fish batter and fried in beef dripping at 190°C!",
    overlayLocationBadge: "📍 The Carron Fish Bar • Stonehaven",
    extraImportantContext: "Over 150 deep-fried Mars bars sold weekly to travelers from across the globe."
  },
  5: {
    id: 5,
    tenSecAudioScript: "Glasgow's subway opened in 1896, making it the third oldest underground on Earth—and it's a perfect loop!",
    audioPhoneticsGuide: "St Enoch [saynt EE-nok]",
    overlayHook: "THE CLOCKWORK ORANGE SUBWAY",
    overlayCoreFact: "World's 3rd oldest metro (1896) — 15 stations, 4-foot narrow gauge, never expanded by a single inch!",
    overlayLocationBadge: "📍 SPT Subway • St Enoch Station, Glasgow",
    extraImportantContext: "Older than the Paris and New York subways. Full 6.5-mile circle takes just 24 minutes."
  },
  6: {
    id: 6,
    tenSecAudioScript: "Loyal Skye Terrier Bobby guarded his master's grave in Edinburgh for fourteen years until his own death!",
    audioPhoneticsGuide: "Greyfriars [GRAY-fry-erz], Kirkyard [KIRK-yard]",
    overlayHook: "GREYFRIARS BOBBY'S 14-YEAR VIGIL",
    overlayCoreFact: "Guarded John Gray's grave from 1858 to 1872 — Edinburgh Lord Provost bought his collar & licence!",
    overlayLocationBadge: "📍 Greyfriars Kirkyard • Candlemaker Row, Edinburgh",
    extraImportantContext: "Buried inside the churchyard gates near his master. His memorial statue is Edinburgh's most photographed pet monument."
  },
  7: {
    id: 7,
    tenSecAudioScript: "The world's shortest flight is in Orkney, Scotland—taking only fifty-three seconds from takeoff to landing!",
    audioPhoneticsGuide: "Westray [WEST-ray], Papa Westray [PAH-pah WEST-ray]",
    overlayHook: "WORLD'S SHORTEST FLIGHT (53 SECONDS)",
    overlayCoreFact: "1.7 miles across Orkney islands — Loganair Islander flight costs £17 and awards passenger certificates!",
    overlayLocationBadge: "📍 Westray to Papa Westray • Orkney Islands",
    extraImportantContext: "Official record flight time with tailwind is just 47 seconds. Vital link for teachers and doctors."
  },
  8: {
    id: 8,
    tenSecAudioScript: "The shortest street on Earth is in Wick, Scotland—measuring just six feet and nine inches long!",
    audioPhoneticsGuide: "Wick [WIK], Ebenezer [eb-en-EE-zer]",
    overlayHook: "WORLD'S SHORTEST STREET (6 FT 9 IN)",
    overlayCoreFact: "Ebenezer Place has only one address: Door No. 1 of Mackays Hotel, built in 1883!",
    overlayLocationBadge: "📍 Ebenezer Place • Wick, Caithness",
    extraImportantContext: "Guinness World Record verified. Built in 1883 after the town council instructed the owner to name the narrow facade."
  },
  9: {
    id: 9,
    tenSecAudioScript: "Loch Ness contains more fresh water than every lake, river, and reservoir in England and Wales combined!",
    audioPhoneticsGuide: "Loch Ness [LOKH NESS], Urquhart [UR-kurt]",
    overlayHook: "LOCH NESS WATER VOLUME SECRETS",
    overlayCoreFact: "7.4 cubic km of water, 754 ft deep — pitch-black peat water where monsters could easily hide!",
    overlayLocationBadge: "📍 Urquhart Castle • Loch Ness, Highlands",
    extraImportantContext: "Never freezes due to depth thermocline. Total water volume exceeds 263 billion cubic feet."
  },
  10: {
    id: 10,
    tenSecAudioScript: "Edinburgh Castle sits directly on top of a 350-million-year-old extinct volcano called Castle Rock!",
    audioPhoneticsGuide: "Castlehill [KASS-ul-hill]",
    overlayHook: "EDINBURGH CASTLE'S VOLCANO",
    overlayCoreFact: "Built atop a 350-million-year-old basalt plug with 260-ft sheer cliffs on three sides!",
    overlayLocationBadge: "📍 Castle Rock • Royal Mile, Edinburgh",
    extraImportantContext: "Fortified since the Iron Age (900 BC). Besieged over 26 times in recorded history."
  },
  11: {
    id: 11,
    tenSecAudioScript: "Britain's favourite curry was invented in Glasgow when a chef poured tomato soup over chicken tikka!",
    audioPhoneticsGuide: "Tikka Masala [TIK-kah mah-SAH-lah], Shish Mahal [SHEESH mah-HALL]",
    overlayHook: "CHICKEN TIKKA MASALA: BORN IN GLASGOW 🍛",
    overlayCoreFact: "1971: Bus driver wanted gravy — Chef Ali added Campbell's tomato soup & created a global icon!",
    overlayLocationBadge: "📍 Shish Mahal • Gibson St, Glasgow",
    extraImportantContext: "Created by chef Ali Ahmed Aslam in 1971. UK Foreign Secretary Robin Cook declared it a British national dish."
  },
  12: {
    id: 12,
    tenSecAudioScript: "Edinburgh city councillor Deacon Brodie was a respected craftsman by day and a notorious burglar by night!",
    audioPhoneticsGuide: "Deacon Brodie [DEE-kon BRO-dee]",
    overlayHook: "THE REAL JEKYLL & HYDE",
    overlayCoreFact: "Deacon William Brodie copied client keys by day to rob them by night — inspired R.L. Stevenson!",
    overlayLocationBadge: "📍 Deacon Brodie's Tavern • Royal Mile, Edinburgh",
    extraImportantContext: "Executed in 1788 on gallows he had designed himself. Directly inspired Robert Louis Stevenson's Jekyll and Hyde."
  },
  13: {
    id: 13,
    tenSecAudioScript: "The Fortingall Yew in Perthshire is estimated to be up to five thousand years old!",
    audioPhoneticsGuide: "Fortingall [FOR-tin-gawl], Perthshire [PERTH-sheer]",
    overlayHook: "EUROPE'S OLDEST LIVING TREE",
    overlayCoreFact: "3,000 to 5,000 years old in Perthshire — stood before Stonehenge and the Pyramids were built!",
    overlayLocationBadge: "📍 Fortingall Churchyard • Aberfeldy, Perthshire",
    extraImportantContext: "Trunk measured 52 feet around in 1769. Local legend claims Pontius Pilate was born beneath its boughs."
  },
  14: {
    id: 14,
    tenSecAudioScript: "Scotland is one of the only countries on Earth where local soda Irn-Bru outsells Coca-Cola!",
    audioPhoneticsGuide: "Irn-Bru [IRON-brew], Falkirk [FAWL-kirk]",
    overlayHook: "IRN-BRU: SCOTLAND'S OTHER NATIONAL DRINK",
    overlayCoreFact: "Invented in 1901 — secret formula known by only 3 people on Earth, contains real iron!",
    overlayLocationBadge: "📍 A.G. Barr Headquarters • Cumbernauld, Scotland",
    extraImportantContext: "Known as 'Scotland's other national drink'. Built by Scottish steelworkers and miners for endurance."
  },
  15: {
    id: 15,
    tenSecAudioScript: "The world's oldest working post office is in Sanquhar, Scotland—running continuously since 1712!",
    audioPhoneticsGuide: "Sanquhar [SANK-er], Dumfriesshire [dum-FREECE-sheer]",
    overlayHook: "WORLD'S OLDEST POST OFFICE (1712)",
    overlayCoreFact: "Operating 312+ years in Dumfriesshire — opened 64 years before the US Declaration of Independence!",
    overlayLocationBadge: "📍 Sanquhar Post Office • Dumfriesshire, Scotland",
    extraImportantContext: "Recognized by Guinness World Records. Pre-dates the modern British postal system."
  },
  16: {
    id: 16,
    tenSecAudioScript: "Edinburgh's famous Royal Mile isn't a mile at all—it's an old Scots mile, one hundred yards longer!",
    audioPhoneticsGuide: "Holyrood [HOL-ee-rood]",
    overlayHook: "THE ROYAL MILE'S HIDDEN LENGTH",
    overlayCoreFact: "Measures 1 Scots Mile (1.12 standard miles / 1,970 yards) from Castle to Holyrood Palace!",
    overlayLocationBadge: "📍 The Royal Mile • Old Town, Edinburgh",
    extraImportantContext: "Consists of five consecutive historic streets: Castlehill, Lawnmarket, High Street, Canongate, and Abbey Strand."
  },
  17: {
    id: 17,
    tenSecAudioScript: "The Falkirk Wheel is the world's only rotating boat lift, lifting canal barges one hundred and fifteen feet!",
    audioPhoneticsGuide: "Falkirk [FAWL-kirk], Tamfourhill [tam-FOR-hill]",
    overlayHook: "THE ROTATING FALKIRK WHEEL",
    overlayCoreFact: "Connects Forth & Clyde and Union Canals — rotates 600 tonnes using energy of just 8 electric kettles!",
    overlayLocationBadge: "📍 Falkirk Wheel • Tamfourhill, Falkirk",
    extraImportantContext: "Opened by Queen Elizabeth II in 2002. Operates on Archimedes' principle of displacement."
  },
  18: {
    id: 18,
    tenSecAudioScript: "Glasgow's coat of arms features a bird that never flew, a tree that never grew, and a fish!",
    audioPhoneticsGuide: "St Mungo [SAYNT MUN-go]",
    overlayHook: "GLASGOW'S COAT OF ARMS MYTHS",
    overlayCoreFact: "Based on St Mungo's 6th-century 4 miracles — Robin, Hazel branch, Cathedral bell, and Queen's ring salmon!",
    overlayLocationBadge: "📍 Glasgow Cathedral • Cathedral Square, Glasgow",
    extraImportantContext: "Traditional Glasgow rhyme: 'Here is the bird that never flew / Here is the tree that never grew / Here is the bell that never rang / Here is the fish that never swam.'"
  },
  19: {
    id: 19,
    tenSecAudioScript: "Forty miles out into the Atlantic, the remote archipelago of St Kilda was inhabited for four thousand years!",
    audioPhoneticsGuide: "St Kilda [SAYNT KIL-dah], Hirta [HER-tah]",
    overlayHook: "ST KILDA: THE LOST ATLANTIC HEBRIDES",
    overlayCoreFact: "Isolated archipelago inhabited 4,000 years until last 36 islanders were evacuated in 1930!",
    overlayLocationBadge: "📍 Village Bay • Hirta, St Kilda Archipelago",
    extraImportantContext: "Dual UNESCO World Heritage site for both natural and cultural significance. Survived on fulmars and gannets."
  },
  20: {
    id: 20,
    tenSecAudioScript: "Fingal's Cave on the Isle of Staffa features natural hexagonal basalt columns formed sixty million years ago!",
    audioPhoneticsGuide: "Fingal [FING-gawl], Staffa [STAH-fah]",
    overlayHook: "FINGAL'S CAVE ON STAFFA",
    overlayCoreFact: "Formed by Paleocene lava cooling into 6-sided basalt columns — natural sea cave acoustics inspired Mendelssohn!",
    overlayLocationBadge: "📍 Isle of Staffa • Inner Hebrides",
    extraImportantContext: "Visited by Felix Mendelssohn, Queen Victoria, Turner, and Jules Verne. Known in Gaelic as An Uamh Bhinn (The Melodious Cave)."
  },
  21: {
    id: 21,
    tenSecAudioScript: "Sherlock Holmes was based on Dr Joseph Bell, an Edinburgh surgeon who deduced patient histories from tiny clues!",
    audioPhoneticsGuide: "Arthur Conan Doyle [KON-an DOYL]",
    overlayHook: "THE REAL-LIFE SHERLOCK HOLMES",
    overlayCoreFact: "Arthur Conan Doyle studied under Dr Joseph Bell at Edinburgh — Bell deduced life stories at a glance!",
    overlayLocationBadge: "📍 Old College & Royal Infirmary • Edinburgh",
    extraImportantContext: "Bell could tell a patient's occupation, accent, and military service by examining their trousers and mud stains."
  },
  22: {
    id: 22,
    tenSecAudioScript: "Glasgow's world-famous Barras Market was founded in 1921 by street hawker Maggie McIver with two hundred barrows!",
    audioPhoneticsGuide: "Barras [BAH-raz], Gallowgate [GAL-o-gayt]",
    overlayHook: "THE FAMOUS BARRAS MARKET",
    overlayCoreFact: "Founded 1921 by Maggie McIver — grew into Barrowland Ballroom with 2,000 dancers on sprung timber floors!",
    overlayLocationBadge: "📍 The Barras • Gallowgate, East End, Glasgow",
    extraImportantContext: "Maggie McIver became a legendary millionaire businesswoman who gave market traders free Christmas dinners."
  },
  23: {
    id: 23,
    tenSecAudioScript: "The Kelpies in Falkirk are the largest horse sculptures in the world, standing one hundred feet tall in steel!",
    audioPhoneticsGuide: "Kelpies [KEL-peez]",
    overlayHook: "THE KELPIES: 300-TON STEEL GIANTS",
    overlayCoreFact: "Sculpted by Andy Scott from 600 tonnes of stainless steel — honoring Scotland's industrial draught horses!",
    overlayLocationBadge: "📍 The Helix Park • Grangemouth / Falkirk",
    extraImportantContext: "Modeled after real Clydesdale horses Duke and Baron. Each head is 30 metres (100 ft) high."
  },
  24: {
    id: 24,
    tenSecAudioScript: "Scots invented the television, telephone, modern steam engine, pneumatic tyre, radar, and penicillin!",
    audioPhoneticsGuide: "Alexander Fleming [FLEM-ing]",
    overlayHook: "SCOTLAND: NATION OF INVENTORS",
    overlayCoreFact: "Logarithms (Napier), Steam (Watt), Phone (Bell), TV (Baird), Penicillin (Fleming), Radar (Watson-Watt)!",
    overlayLocationBadge: "📍 National Museum of Scotland • Chambers St, Edinburgh",
    extraImportantContext: "Scotland holds one of the highest numbers of world-changing technological innovations per capita in human history."
  },
  25: {
    id: 25,
    tenSecAudioScript: "Authentic traditional Scottish haggis has been banned from import into the USA since nineteen seventy-one!",
    audioPhoneticsGuide: "Haggis [HAG-is], Alloway [AL-o-way]",
    overlayHook: "THE US BAN ON SCOTTISH HAGGIS",
    overlayCoreFact: "USDA rule prohibits animal lung in human food — forcing Scots-Americans to use modified recipes!",
    overlayLocationBadge: "📍 Burns Monument • Alloway, Ayrshire",
    extraImportantContext: "Celebrated every January 25th on Burns Night with Robert Burns' 'Address to a Haggis'."
  },
  26: {
    id: 26,
    tenSecAudioScript: "The Old Course at St Andrews has hosted golf since the fifteenth century, creating the eighteen-hole standard!",
    audioPhoneticsGuide: "St Andrews [SAYNT AN-drooz]",
    overlayHook: "ST ANDREWS: HOME OF GOLF (1400s)",
    overlayCoreFact: "Golf played here since before 1457 when King James II banned it for distracting from archery practice!",
    overlayLocationBadge: "📍 The Old Course • St Andrews, Fife",
    extraImportantContext: "Standardized 18-hole round in 1764 when the Society of St Andrews Golfers reduced their course from 22 holes."
  },
  27: {
    id: 27,
    tenSecAudioScript: "The River Clyde in Glasgow built one-fifth of the entire world's ships, including the Queen Mary!",
    audioPhoneticsGuide: "Clyde [KLYD], Finnieston [FIN-iss-tun]",
    overlayHook: "THE SHIPYARDS OF THE CLYDE",
    overlayCoreFact: "'Clydebuilt' became world gold standard for engineering — launched 25,000+ vessels from Govan!",
    overlayLocationBadge: "📍 Finnieston Crane & Govan Shipyards • Glasgow",
    extraImportantContext: "Built the RMS Titanic's engines, HMS Hood, Queen Elizabeth 2, and the Royal Yacht Britannia."
  },
  28: {
    id: 28,
    tenSecAudioScript: "Beneath the Royal Mile lies Mary King's Close, a real 17th-century street buried under City Chambers!",
    audioPhoneticsGuide: "Mary King's Close [MARE-ee KINGZ KLOHS]",
    overlayHook: "THE BURIED CITY BENEATH EDINBURGH",
    overlayCoreFact: "Sealed under 1753 Royal Exchange foundations — preserved narrow closes, plague homes, and 1600s workshops!",
    overlayLocationBadge: "📍 The Real Mary King's Close • High Street, Edinburgh",
    extraImportantContext: "Never demolished, only built over. Reopened in 2003 as an underground historical museum."
  },
  29: {
    id: 29,
    tenSecAudioScript: "The ancient Stone of Destiny was used for centuries to crown Scotland's kings before being stolen in 1296!",
    audioPhoneticsGuide: "Scone [SKOON], Lia Fáil [LEE-uh FOYL]",
    overlayHook: "THE STONE OF DESTINY (LIA FÁIL)",
    overlayCoreFact: "Inaugurated Scottish kings — taken by Edward I in 1296, retaken by Glasgow students in 1950!",
    overlayLocationBadge: "📍 Perth Museum & Edinburgh Castle • Scotland",
    extraImportantContext: "Returned permanently to Scotland in 1996. Used under King Charles III's coronation chair in Westminster Abbey."
  },
  30: {
    id: 30,
    tenSecAudioScript: "Dolly the Sheep was the first mammal ever cloned from an adult somatic cell, born in Scotland in 1996!",
    audioPhoneticsGuide: "Roslin [ROZ-lin]",
    overlayHook: "DOLLY THE SHEEP: FIRST CLONED MAMMAL",
    overlayCoreFact: "Born 5 July 1996 at Roslin Institute — preserved and on display today at the National Museum of Scotland!",
    overlayLocationBadge: "📍 Roslin Institute • Midlothian, Scotland",
    extraImportantContext: "Named after country singer Dolly Parton. Revolutionized modern stem cell and genetic research."
  },
  31: {
    id: 31,
    tenSecAudioScript: "Loch Lomond sits directly across the Highland Boundary Fault, separating the Lowlands from the rugged Highlands!",
    audioPhoneticsGuide: "Loch Lomond [LOKH LO-mund]",
    overlayHook: "THE HIGHLAND BOUNDARY FAULT",
    overlayCoreFact: "Great geological divide: tranquil southern islands in Lowlands, dramatic deep glacial fjord in Highlands!",
    overlayLocationBadge: "📍 Loch Lomond & The Trossachs • Balloch / Tarbet",
    extraImportantContext: "Contains 30+ islands. Largest inland body of water by surface area in Great Britain."
  },
  32: {
    id: 32,
    tenSecAudioScript: "Edinburgh formed the world's first modern municipal fire brigade in 1824, led by pioneer James Braidwood!",
    audioPhoneticsGuide: "Braidwood [BRAYD-wood]",
    overlayHook: "WORLD'S 1ST MUNICIPAL FIRE BRIGADE (1824)",
    overlayCoreFact: "James Braidwood recruited stonemasons and carpenters who knew building structures inside out!",
    overlayLocationBadge: "📍 Parliament Square • Royal Mile, Edinburgh",
    extraImportantContext: "Braidwood established the world's first scientific firefighting principles and later created the London Fire Brigade."
  },
  33: {
    id: 33,
    tenSecAudioScript: "Glasgow's Victorian Necropolis is home to fifty thousand people buried across thirty-seven hilltop acres!",
    audioPhoneticsGuide: "Necropolis [neh-KROP-o-lis]",
    overlayHook: "THE GLASGOW NECROPOLIS",
    overlayCoreFact: "Victorian garden cemetery with 3,500 monuments — John Knox memorial towers over 50,000 souls!",
    overlayLocationBadge: "📍 The Necropolis • Cathedral Precinct, Glasgow",
    extraImportantContext: "Modeled on Père Lachaise in Paris. Built on a dramatic volcanic hill overlooking Glasgow Cathedral."
  },
  34: {
    id: 34,
    tenSecAudioScript: "Scotland comprises over seven hundred and ninety offshore islands, but only ninety-four are permanently inhabited!",
    audioPhoneticsGuide: "Hebrides [HEB-ri-deez]",
    overlayHook: "SCOTLAND'S 790+ ISLANDS",
    overlayCoreFact: "Hebrides, Orkney, and Shetland archipelagos — 94 inhabited islands with unique Gaelic & Norse heritage!",
    overlayLocationBadge: "📍 Outer Hebrides & Shetland Islands",
    extraImportantContext: "Coastline measures over 11,000 miles including all islands, longer than mainland Great Britain."
  },
  35: {
    id: 35,
    tenSecAudioScript: "Eilean Donan Castle sits where three sea lochs meet, rebuilt from rubble in the early twentieth century!",
    audioPhoneticsGuide: "Eilean Donan [AY-len DOH-nun], Loch Duich [LOKH DOO-ikh]",
    overlayHook: "EILEAN DONAN CASTLE",
    overlayCoreFact: "Blown up in 1719 during Jacobite uprising — restored by Lt. Col. John MacRae-Gilstrap between 1912 and 1932!",
    overlayLocationBadge: "📍 Dornie • Kyle of Lochalsh, Highlands",
    extraImportantContext: "Reconstructed according to the surviving medieval plans. Starred in Highlander and James Bond."
  },
  36: {
    id: 36,
    tenSecAudioScript: "William Wallace's legendary two-handed battle sword measures five feet four inches long and weighs six pounds!",
    audioPhoneticsGuide: "Stirling [STIR-ling]",
    overlayHook: "WALLACE'S 5-FOOT GREATSWORD",
    overlayCoreFact: "13th-century two-handed blade kept at Wallace Monument — wielded by Scotland's legendary Guardian!",
    overlayLocationBadge: "📍 National Wallace Monument • Abbey Craig, Stirling",
    extraImportantContext: "Requires immense physical strength to wield. Kept in Dumbarton Castle for over 500 years."
  },
  37: {
    id: 37,
    tenSecAudioScript: "Robert the Bruce learned perseverance in a cave watching a tiny spider try seven times to spin its web!",
    audioPhoneticsGuide: "Bannockburn [BAN-uk-burn]",
    overlayHook: "ROBERT THE BRUCE & THE SPIDER",
    overlayCoreFact: "'If at first you don't succeed, try, try again' — inspired Bruce's victory at Bannockburn in 1314!",
    overlayLocationBadge: "📍 King's Cave • Isle of Arran / Bannockburn",
    extraImportantContext: "Bruce defeated King Edward II's army in 1314 despite being outnumbered three to one."
  },
  38: {
    id: 38,
    tenSecAudioScript: "Glasgow Cathedral is the only medieval cathedral on the Scottish mainland to survive the 1560 Reformation intact!",
    audioPhoneticsGuide: "Glasgow [GLAZ-go]",
    overlayHook: "GLASGOW MEDIEVAL CATHEDRAL",
    overlayCoreFact: "Glasgow trade guild craftsmen guarded the 1197 Gothic cathedral from destruction during the Reformation!",
    overlayLocationBadge: "📍 Castle Street • Cathedral Precinct, Glasgow",
    extraImportantContext: "Tomb of St Mungo, patron saint of Glasgow, lies in the lower crypt since 612 AD."
  },
  39: {
    id: 39,
    tenSecAudioScript: "Scotland is the birthplace of modern golf, Olympic curling on frozen lochs, and Highland shinty!",
    audioPhoneticsGuide: "Ailsa Craig [AYL-sah KRAYG], Shinty [SHIN-tee]",
    overlayHook: "SCOTLAND: BIRTHPLACE OF SPORTS",
    overlayCoreFact: "First recorded curling in 1511 — Olympic stones quarried exclusively from Ailsa Craig granite!",
    overlayLocationBadge: "📍 Ailsa Craig & St Andrews • Scotland",
    extraImportantContext: "Every official Olympic curling stone on Earth is made of microgranite from the uninhabited island of Ailsa Craig."
  },
  40: {
    id: 40,
    tenSecAudioScript: "In 1828, Burke and Hare murdered sixteen victims in Edinburgh to sell bodies to anatomy schools!",
    audioPhoneticsGuide: "Burke & Hare [BURK and HAIR]",
    overlayHook: "BURKE & HARE: BODY SNATCHERS (1828)",
    overlayCoreFact: "Murdered 16 victims in West Port — Burke was hanged in 1829 & his skeleton remains at Edinburgh Med School!",
    overlayLocationBadge: "📍 West Port & Surgeon's Hall • Old Town, Edinburgh",
    extraImportantContext: "Led directly to the Anatomy Act of 1832. Burke's skin was tanned into pocketbooks after dissection."
  },
  41: {
    id: 41,
    tenSecAudioScript: "Flora MacDonald helped Bonnie Prince Charlie escape to Skye disguised as an Irish maidservant!",
    audioPhoneticsGuide: "Flora MacDonald [FLOR-ah mak-DON-uld], Skye [SKY]",
    overlayHook: "PRINCE CHARLIE'S FLIGHT TO SKYE",
    overlayCoreFact: "Disguised as spinning maid 'Betty Burke' across stormy waters — immortalized in the Skye Boat Song!",
    overlayLocationBadge: "📍 Uig & Kilmuir • Isle of Skye",
    extraImportantContext: "Price on Charlie's head was £30,000 (millions today), but not a single Highlander betrayed him."
  },
  42: {
    id: 42,
    tenSecAudioScript: "Charles Rennie Mackintosh transformed modern architecture and Glasgow style with the iconic Willow Tea Rooms!",
    audioPhoneticsGuide: "Mackintosh [MAK-in-tosh], Sauchiehall [SAWK-ee-hawl]",
    overlayHook: "MACKINTOSH & THE WILLOW TEAROOMS",
    overlayCoreFact: "Designed in 1903 for tea pioneer Catherine Cranston — high-backed chairs & Art Nouveau geometry!",
    overlayLocationBadge: "📍 217 Sauchiehall Street • Glasgow",
    extraImportantContext: "Pioneered total design where furniture, cutlery, stained glass, and architecture formed a single harmonic artwork."
  },
  43: {
    id: 43,
    tenSecAudioScript: "The twenty-one concrete arches of Glenfinnan Viaduct carry the Jacobite steam train across the Highlands!",
    audioPhoneticsGuide: "Glenfinnan [glen-FIN-un], Jacobite [JAK-o-byte]",
    overlayHook: "THE GLENFINNAN VIADUCT (1901)",
    overlayCoreFact: "Built by 'Concrete Bob' McAlpine — 21 massive curved spans rising 100 ft above Loch Shiel!",
    overlayLocationBadge: "📍 Glenfinnan Viaduct • Fort William / Mallaig",
    extraImportantContext: "Famous Hogwarts Express bridge. Built entirely from mass unreinforced concrete in 1901."
  },
  44: {
    id: 44,
    tenSecAudioScript: "Glasgow's Loch Katrine aqueduct project of 1859 supplied the purest gravity-fed drinking water in Britain!",
    audioPhoneticsGuide: "Katrine [KAH-trin], Milngavie [mill-GUY]",
    overlayHook: "THE LOCH KATRINE AQUEDUCT (1859)",
    overlayCoreFact: "Opened by Queen Victoria — 26-mile mountain tunnels carrying 50M gallons daily with zero pumps!",
    overlayLocationBadge: "📍 Loch Katrine • The Trossachs to Milngavie",
    extraImportantContext: "Eradicated cholera in Glasgow. Works entirely by gravity fall of 10 inches per mile."
  },
  45: {
    id: 45,
    tenSecAudioScript: "The Scott Monument in Edinburgh is the largest memorial dedicated to a writer anywhere on Earth!",
    audioPhoneticsGuide: "Princes Street [PRIN-siz Street]",
    overlayHook: "WORLD'S LARGEST WRITER MONUMENT",
    overlayCoreFact: "200-foot Victorian Gothic spire on Princes Street — 287 spiral steps and 64 carved novel characters!",
    overlayLocationBadge: "📍 Princes Street Gardens • Edinburgh",
    extraImportantContext: "Designed by self-taught carpenter George Meikle Kemp. Made of Binny sandstone."
  },
  46: {
    id: 46,
    tenSecAudioScript: "Scottish Highland cows have double coats of shaggy hair, making them the oldest registered cattle breed!",
    audioPhoneticsGuide: "Heilan Coo [HAY-lan KOO]",
    overlayHook: "HIGHLAND 'HEILAN COO' HERITAGE",
    overlayCoreFact: "Official herd book established 1884 — long horns and oily double-layer fleece that withstands blizzards!",
    overlayLocationBadge: "📍 Scottish Highlands & Trossachs National Park",
    extraImportantContext: "Their thick coat keeps them warm so they don't need thick fat, producing naturally lean, tender beef."
  },
  47: {
    id: 47,
    tenSecAudioScript: "In the 18th century, Edinburgh was known as the Athens of the North, shaping modern economics and science!",
    audioPhoneticsGuide: "Calton Hill [KAWL-tun Hill]",
    overlayHook: "EDINBURGH: ATHENS OF THE NORTH",
    overlayCoreFact: "Adam Smith (Economics), David Hume (Philosophy), and James Hutton (Geology) met in Old Town taverns!",
    overlayLocationBadge: "📍 Calton Hill & Royal Mile • Edinburgh",
    extraImportantContext: "Voltaire wrote: 'We look to Scotland for all our ideas of civilization.'"
  },
  48: {
    id: 48,
    tenSecAudioScript: "The Barrowland Ballroom in Glasgow is legendary for its giant animated neon sign and sprung dancefloor!",
    audioPhoneticsGuide: "Barrowland [BAH-ro-land]",
    overlayHook: "THE BARROWLAND BALLROOM",
    overlayCoreFact: "Rebuilt 1960 — giant animated neon facade, acoustic barrel vault ceiling, and floating dance floor!",
    overlayLocationBadge: "📍 Gallowgate • East End, Glasgow",
    extraImportantContext: "Voted best music venue in the UK by artists from David Bowie to Oasis and Foo Fighters."
  },
  49: {
    id: 49,
    tenSecAudioScript: "The Royal Burgh of Culross on the Firth of Forth is Scotland's most completely preserved 16th-century village!",
    audioPhoneticsGuide: "Culross [KOO-russ], Forth [FORTH]",
    overlayHook: "CULROSS: TIME CAPSULE 16TH-CENTURY BURGH",
    overlayCoreFact: "Ochre-washed Culross Palace, cobbled wynds, and Sir George Bruce's underwater coal mine of 1575!",
    overlayLocationBadge: "📍 Royal Burgh of Culross • Fife",
    extraImportantContext: "Featured in Outlander as Cranesmuir. Home to the world's first underwater coal mine under the sea bed."
  },
  50: {
    id: 50,
    tenSecAudioScript: "Scotland produces forty bottles of Scotch whisky every single second, exported to over 170 countries!",
    audioPhoneticsGuide: "Slàinte Mhath [SLAHN-juh VAH], Speyside [SPAY-side]",
    overlayHook: "SCOTCH WHISKY & SLÀINTE MHATH 🥃",
    overlayCoreFact: "From Gaelic 'uisge beatha' (water of life) — 140+ distilleries, matured min 3 years in oak casks!",
    overlayLocationBadge: "📍 Speyside, Islay, Highlands & Lowlands",
    extraImportantContext: "More Scotch whisky rests in barrels in Scotland than there are citizens in the entire country."
  }
};

export interface AudioTimingMetric {
  wordCount: number;
  estimatedDurationSec: number;
  status: 'safe' | 'warning' | 'too_long';
  statusLabel: string;
  statusColor: string;
  recommendation: string;
}

/**
 * Calculates speaking duration for a given script at a standard rate of 145 words per minute
 */
export function calculateAudioTiming(script: string = ''): AudioTimingMetric {
  const clean = script.trim();
  if (!clean) {
    return {
      wordCount: 0,
      estimatedDurationSec: 0,
      status: 'safe',
      statusLabel: '0.0s (Ready)',
      statusColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80',
      recommendation: 'Script is empty'
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  const count = words.length;
  // ~2.35 words per second (141 words per minute with pauses)
  const duration = Math.round((count / 2.35) * 10) / 10;

  if (count <= 20 && duration <= 8.5) {
    return {
      wordCount: count,
      estimatedDurationSec: duration,
      status: 'safe',
      statusLabel: `${count} words • ~${duration}s (10s Safe)`,
      statusColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80',
      recommendation: 'Perfect for 10-second video. Finishes with a 1.5s visual outro buffer before cutoff.'
    };
  } else if (count <= 24 && duration <= 10.0) {
    return {
      wordCount: count,
      estimatedDurationSec: duration,
      status: 'warning',
      statusLabel: `${count} words • ~${duration}s (Tight Fit)`,
      statusColor: 'text-amber-300 border-amber-500/40 bg-amber-950/80',
      recommendation: 'Tight fit for 10-second video. May finish right at the last second.'
    };
  } else {
    return {
      wordCount: count,
      estimatedDurationSec: duration,
      status: 'too_long',
      statusLabel: `${count} words • ~${duration}s (Exceeds 10s)`,
      statusColor: 'text-rose-300 border-rose-500/40 bg-rose-950/80',
      recommendation: 'Script will cut off midway in a 10s video. Use the 10-Second Snappy Script option.'
    };
  }
}

/**
 * Retrieves the optimized 10-second script for any fact
 */
export function getOptimized10sScript(blueprint: ShortsBlueprint): string {
  const opt = TEN_SECOND_OPTIMIZATIONS[blueprint.id];
  if (opt && opt.tenSecAudioScript) {
    return opt.tenSecAudioScript;
  }
  return blueprint.audioScript || blueprint.factText || '';
}

/**
 * Retrieves the optimized overlay hook & core fact for any fact
 */
export function getOptimizedOverlayData(blueprint: ShortsBlueprint): {
  hook: string;
  coreFact: string;
  locationBadge: string;
  extraContext: string;
} {
  const opt = TEN_SECOND_OPTIMIZATIONS[blueprint.id];
  if (opt) {
    return {
      hook: opt.overlayHook,
      coreFact: opt.overlayCoreFact,
      locationBadge: opt.overlayLocationBadge,
      extraContext: opt.extraImportantContext
    };
  }

  return {
    hook: blueprint.subtitles?.line1Hook || blueprint.title || 'SCOTLAND FACT',
    coreFact: blueprint.subtitles?.line2Fact || blueprint.factText || '',
    locationBadge: blueprint.subtitles?.line3Location || blueprint.location || `${blueprint.city}, Scotland`,
    extraContext: blueprint.comicalElement || ''
  };
}
