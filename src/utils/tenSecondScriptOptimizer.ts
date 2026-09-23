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
    audioPhoneticsGuide: "Glasgow [GLAZ-go], GoMA [GO-ma], Wellington [WEL-ing-ton]",
    overlayHook: "GLASGOW'S TRAFFIC CONE DUKE 🦺",
    overlayCoreFact: "Locals crown the Duke since the 1980s — 10,000 revolted when council tried to ban it!",
    overlayLocationBadge: "📍 GoMA • Royal Exchange Sq, Glasgow",
    extraImportantContext: "10,000 citizens signed a petition within 24 hours to protect the cone. Banksy declared it his favourite UK artwork."
  },
  2: {
    id: 2,
    tenSecAudioScript: "Need to set your watch? Edinburgh Castle has fired this cannon at one o'clock every day since 1861!",
    audioPhoneticsGuide: "Edinburgh [ED-in-bur-ruh], Firth of Forth [FERTH of FORTH]",
    overlayHook: "EDINBURGH'S 1 O'CLOCK CANNON 💥",
    overlayCoreFact: "Fired since 1861 for ship chronometers — 50,000+ blasts startling Princes St tourists!",
    overlayLocationBadge: "📍 Mills Mount Battery • Edinburgh Castle",
    extraImportantContext: "Synchronized with the Nelson Monument time ball on Calton Hill. Fired over 50,000 times since 1861."
  },
  3: {
    id: 3,
    tenSecAudioScript: "Scotland's official national animal isn't a stag or an eagle—it is literally a wild mythical Unicorn!",
    audioPhoneticsGuide: "Celtic [KEL-tik], Heraldry [HER-uld-ree]",
    overlayHook: "SCOTLAND'S NATIONAL UNICORN 🦄",
    overlayCoreFact: "Adopted in the 12th century — chained because wild unicorns are too powerful to roam!",
    overlayLocationBadge: "📍 Royal Arms of Scotland • Stirling Castle",
    extraImportantContext: "In Celtic lore, the unicorn was the natural enemy of the lion (symbol of England) and too noble to be tamed."
  },
  4: {
    id: 4,
    tenSecAudioScript: "Glasgow's subway opened in 1896, making it the third oldest underground on Earth—and it's a perfect loop!",
    audioPhoneticsGuide: "St Enoch [saynt EE-nok], Subway [SUB-way]",
    overlayHook: "GLASGOW'S CLOCKWORK ORANGE 🚇",
    overlayCoreFact: "World's 3rd oldest metro (1896) — a 6.5-mile circle that never expanded by a single inch!",
    overlayLocationBadge: "📍 SPT Subway • St Enoch Station, Glasgow",
    extraImportantContext: "Older than the Paris and New York subways. Full 6.5-mile circle takes just 24 minutes."
  },
  5: {
    id: 5,
    tenSecAudioScript: "Loyal Skye Terrier Bobby guarded his master's grave in Edinburgh for fourteen years until his own death!",
    audioPhoneticsGuide: "Greyfriars [GRAY-fry-erz], Kirkyard [KIRK-yard]",
    overlayHook: "GREYFRIARS BOBBY'S 14-YR VIGIL 🐕",
    overlayCoreFact: "Guarded master's grave from 1858 to 1872 — Lord Provost bought his collar & licence!",
    overlayLocationBadge: "📍 Greyfriars Kirkyard • Candlemaker Row, Edinburgh",
    extraImportantContext: "Buried inside the churchyard gates near his master. His memorial statue is Edinburgh's most photographed pet monument."
  },
  6: {
    id: 6,
    tenSecAudioScript: "Glasgow's famous Barras market started with wheelbarrows in 1921—and the ballroom upstairs has a bouncing horsehair floor!",
    audioPhoneticsGuide: "Barrowlands [BAH-roh-landz], Barras [BAH-rahz], Gallowgate [GAH-loh-gate]",
    overlayHook: "THE GLASGOW BARRAS & BALLROOM 🎸",
    overlayCoreFact: "Started with wheelbarrows in 1921 — sprung horsehair floor bounces like a trampoline!",
    overlayLocationBadge: "📍 Barrowland Ballroom • Gallowgate, Glasgow",
    extraImportantContext: "Margaret McIver rented wheelbarrows to street traders, then built the ballroom so traders had a place to dance."
  },
  7: {
    id: 7,
    tenSecAudioScript: "In medieval Edinburgh, residents yelled 'Gardyloo!' at ten PM before emptying chamber pots right out of tenement windows!",
    audioPhoneticsGuide: "Gardyloo [gar-dee-LOO], Gare de l'eau [gar duh LOH], Auld Reekie [awld REE-kee]",
    overlayHook: "AULD REEKIE & 'GARDYLOO!' 🪣💩",
    overlayCoreFact: "10-storey medieval tenements emptied chamberpots from windows onto the street at 10 PM!",
    overlayLocationBadge: "📍 Royal Mile • Old Town, Edinburgh",
    extraImportantContext: "From the French 'Gare de l'eau' (watch out for the water). Pedestrians had to shout 'Hold your hand!' in response."
  },
  8: {
    id: 8,
    tenSecAudioScript: "Scotland is one of the only countries on Earth where Coca-Cola isn't number one—beaten by bright orange Irn-Bru!",
    audioPhoneticsGuide: "Irn-Bru [IRON-BREW], Cumbernauld [kum-ber-NAWLD]",
    overlayHook: "IRN-BRU: SCOTLAND'S SECRET NECTAR 🥤",
    overlayCoreFact: "Brewed since 1901 — Scotland is one of few nations where Coca-Cola isn't #1!",
    overlayLocationBadge: "📍 AG Barr • Cumbernauld, Scotland",
    extraImportantContext: "Brewed to a secret recipe containing 32 ingredients known to only three people in the world."
  },
  9: {
    id: 9,
    tenSecAudioScript: "Glasgow's Victorian Necropolis holds fifty thousand souls—and its dark gothic monuments inspired Batman's Gotham City!",
    audioPhoneticsGuide: "Necropolis [neh-KROP-oh-lis], Cathedral [kuh-THEE-drul]",
    overlayHook: "GLASGOW'S VICTORIAN NECROPOLIS 🪦",
    overlayCoreFact: "50,000 souls buried on the hill — inspired the dark gothic architecture of Batman's Gotham!",
    overlayLocationBadge: "📍 Glasgow Necropolis • Beside Glasgow Cathedral",
    extraImportantContext: "Modeled after Paris's Père Lachaise cemetery. Filming location for Hollywood blockbusters including The Batman."
  },
  10: {
    id: 10,
    tenSecAudioScript: "Arthur's Seat in Edinburgh isn't just a scenic hill—it is a colossal extinct volcano that erupted 350 million years ago!",
    audioPhoneticsGuide: "Holyrood [HOL-ee-rood], Salisbury [SAWLZ-bree]",
    overlayHook: "ARTHUR'S SEAT: EXTINCT VOLCANO 🌋",
    overlayCoreFact: "350-million-year-old volcano rising 822 ft right in the middle of Edinburgh!",
    overlayLocationBadge: "📍 Holyrood Park • Edinburgh",
    extraImportantContext: "Geologist James Hutton used its volcanic basalt crags in 1788 to prove modern geological science."
  },
  11: {
    id: 11,
    tenSecAudioScript: "Britain's favorite curry, Chicken Tikka Masala, was invented in Glasgow in 1971 using a tin of tomato soup!",
    audioPhoneticsGuide: "Tikka [TIK-uh], Masala [muh-SAH-luh], Shish Mahal [SHISH muh-HAHL]",
    overlayHook: "CHICKEN TIKKA MASALA: BORN IN GLASGOW! 🍛",
    overlayCoreFact: "Invented in 1971 at the Shish Mahal when a customer asked for gravy on dry tikka!",
    overlayLocationBadge: "📍 Shish Mahal • Gibson St, Glasgow",
    extraImportantContext: "Chef Ali Ahmed Aslam whipped up a sauce with Campbell's condensed tomato soup, yogurt, and spices."
  },
  12: {
    id: 12,
    tenSecAudioScript: "Edinburgh councillor Deacon Brodie was a respected locksmith by day, but a secret burglar by night—inspiring Dr Jekyll and Mr Hyde!",
    audioPhoneticsGuide: "Brodie [BROH-dee], Jekyll [JEE-kull]",
    overlayHook: "THE REAL JEKYLL & HYDE 🗝️",
    overlayCoreFact: "City councillor by day, cat burglar by night — hanged in 1788 on gallows he designed!",
    overlayLocationBadge: "📍 Deacon Brodie's Close • Royal Mile, Edinburgh",
    extraImportantContext: "Took wax impressions of clients' door keys. Hanged in 1788 before 40,000 spectators."
  },
  13: {
    id: 13,
    tenSecAudioScript: "The world's shortest scheduled flight is in Orkney, taking just fifty-three seconds between two islands!",
    audioPhoneticsGuide: "Westray [WEST-ray], Papa Westray [PAH-pah WEST-ray], Orkney [ORK-nee]",
    overlayHook: "WORLD'S SHORTEST FLIGHT (53 SECS) ✈️",
    overlayCoreFact: "1.7 miles across Orkney islands — official record is 47 seconds with tailwind!",
    overlayLocationBadge: "📍 Westray to Papa Westray • Orkney Islands",
    extraImportantContext: "Covering 1.7 miles, shorter than the main runway at Heathrow Airport. Passengers receive a souvenir certificate."
  },
  14: {
    id: 14,
    tenSecAudioScript: "Inside a Glasgow park lies an ancient rainforest with eleven fossilized tree stumps older than the dinosaurs!",
    audioPhoneticsGuide: "Lepidodendron [lep-ih-doh-DEN-dron], Victoria [vik-TOR-ee-uh]",
    overlayHook: "GLASGOW'S 330M-YEAR-OLD TREES 🌳",
    overlayCoreFact: "11 fossilized tree stumps in Victoria Park — older than the dinosaurs and older than Scotland!",
    overlayLocationBadge: "📍 Fossil Grove • Victoria Park, Glasgow",
    extraImportantContext: "Discovered in 1887 when quarrying stone. These giant club-moss trees grew in tropical swamp forests 330 million years ago."
  },
  15: {
    id: 15,
    tenSecAudioScript: "Edinburgh's Royal Mile isn't an English statute mile—it's an ancient Scottish Mile, two hundred yards longer!",
    audioPhoneticsGuide: "Holyroodhouse [HOL-ee-rood-howss], High Street [HY street]",
    overlayHook: "THE SCOTTISH MILE (1.07 MILES) 📏",
    overlayCoreFact: "Runs from Castle to Palace — measures 1 Scottish mile, exactly 200 yards longer than English!",
    overlayLocationBadge: "📍 The Royal Mile • Edinburgh Castle to Holyrood",
    extraImportantContext: "A traditional Scots mile was defined as 5,952 feet compared to the standard 5,280-foot English mile."
  },
  16: {
    id: 16,
    tenSecAudioScript: "The world-famous Deep-Fried Mars Bar was created in 1995 at a chip shop in Stonehaven, Scotland!",
    audioPhoneticsGuide: "Stonehaven [stone-HAY-ven], Aberdeenshire [ab-er-DEEN-sheer]",
    overlayHook: "THE DEEP-FRIED MARS BAR 🍫",
    overlayCoreFact: "Invented in 1995 at The Carron Fish Bar — dipped in fish batter and fried in beef dripping!",
    overlayLocationBadge: "📍 The Carron Fish Bar • Stonehaven, Aberdeenshire",
    extraImportantContext: "Over 150 deep-fried Mars bars sold weekly to travelers from across the globe."
  },
  17: {
    id: 17,
    tenSecAudioScript: "Did Kelvingrove Museum's architect jump from the roof because it was built backwards? Total myth—it was designed that way!",
    audioPhoneticsGuide: "Kelvingrove [KEL-vin-grohv], Dalí [dah-LEE], Simpson [SIMP-sun]",
    overlayHook: "KELVINGROVE'S 'BACKWARDS' MYTH 🏛️",
    overlayCoreFact: "Architect didn't jump from the roof! Features Salvador Dalí's £10M masterpiece.",
    overlayLocationBadge: "📍 Kelvingrove Art Gallery • Argyle St, Glasgow",
    extraImportantContext: "The grand entrance faces the park by design for the 1901 International Exhibition. Houses Christ of Saint John of the Cross."
  },
  18: {
    id: 18,
    tenSecAudioScript: "See that heart mosaic on Edinburgh's Royal Mile? Locals spit on it for good luck where a brutal prison once stood!",
    audioPhoneticsGuide: "Midlothian [mid-LOH-thee-un], Tolbooth [TOLL-booth]",
    overlayHook: "SPITTING ON THE HEART OF MIDLOTHIAN 💖",
    overlayCoreFact: "Mosaic where the Old Tolbooth prison stood — locals spit on it for good luck since 1817!",
    overlayLocationBadge: "📍 St Giles' Cathedral • High St, Edinburgh",
    extraImportantContext: "Spitting originated as a sign of contempt for the grim execution site and prison, later transforming into a good luck ritual."
  },
  19: {
    id: 19,
    tenSecAudioScript: "The giant red Forth Bridge has 6.5 million rivets—and its 'never-ending paint job' was finally finished in 2011!",
    audioPhoneticsGuide: "Forth [FORTH], Queensferry [KWEENZ-feh-ree]",
    overlayHook: "THE FORTH RED BRIDGE OF STEEL 🌉",
    overlayCoreFact: "53,000 tonnes of steel, 6.5M rivets — new 2011 glass-flake paint stopped the endless cycle!",
    overlayLocationBadge: "📍 Firth of Forth • Queensferry, Scotland",
    extraImportantContext: "Special 25-year glass-flake epoxy coating applied in 2011 finally retired the famous British idiom 'like painting the Forth Bridge'."
  },
  20: {
    id: 20,
    tenSecAudioScript: "Glasgow's 175-foot Finnieston Crane could lift entire steam locomotives onto ships bound for every corner of the world!",
    audioPhoneticsGuide: "Finnieston [FIN-iss-ton], Stobcross [STOB-kross], Clydebuilt [KLYDE-bilt]",
    overlayHook: "THE FINNIESTON CRANE (175 TONS) 🏗️",
    overlayCoreFact: "Built 1931 to lift steam engines into ships — one of only 11 giant cantilever cranes on Earth!",
    overlayLocationBadge: "📍 River Clyde • Finnieston St, Glasgow",
    extraImportantContext: "Capable of hoisting 175 tonnes. Symbol of the era when 20% of the world's ships were built on the River Clyde."
  },
  21: {
    id: 21,
    tenSecAudioScript: "In 1828, Edinburgh body snatchers Burke and Hare murdered 16 victims to sell their corpses to anatomy lectures!",
    audioPhoneticsGuide: "Knox [NOKS], Hare [HAIR], Burke [BERK]",
    overlayHook: "BURKE & HARE: BODY SNATCHERS 💀",
    overlayCoreFact: "Murdered 16 victims in 1828 to sell corpses to medical school — Burke's skeleton still in museum!",
    overlayLocationBadge: "📍 Anatomical Museum • University of Edinburgh",
    extraImportantContext: "Burke was dissected in the same anatomy theatre. His skeleton, death mask, and pocketbook made of his skin remain on display."
  },
  22: {
    id: 22,
    tenSecAudioScript: "Glasgow's coat of arms tells a poetic tale: the bird that never flew, the tree that never grew, the bell that never rang, and the fish that never swam!",
    audioPhoneticsGuide: "Mungo [MUNG-go], Kentigern [KEN-tih-gern]",
    overlayHook: "GLASGOW'S MIRACLE COAT OF ARMS 🐟🔔",
    overlayCoreFact: "The bird that never flew, tree that never grew, bell that never rang, fish that never swam!",
    overlayLocationBadge: "📍 St Mungo • Glasgow City Chambers",
    extraImportantContext: "Commemorates the 6th-century miracles of Saint Mungo, the patron saint and founder of Glasgow."
  },
  23: {
    id: 23,
    tenSecAudioScript: "Standing 100 feet tall in Falkirk are The Kelpies—the largest equine horse sculptures on planet Earth!",
    audioPhoneticsGuide: "Kelpies [KEL-peez], Falkirk [FAWL-kirk], Clydesdale [KLYDZ-dayl]",
    overlayHook: "THE KELPIES: 100-FT STEEL HORSES 🐴",
    overlayCoreFact: "300 tonnes of steel each — celebrates Scotland's heavy Clydesdale canal barge horses!",
    overlayLocationBadge: "📍 The Helix Park • Falkirk, Scotland",
    extraImportantContext: "Sculpted by Andy Scott from 300 tonnes of structural steel each, inspired by the mythical shape-shifting water horses."
  },
  24: {
    id: 24,
    tenSecAudioScript: "Edinburgh inspired Harry Potter! Victoria Street became Diagon Alley, and Tom Riddle's real grave sits in Greyfriars Kirkyard!",
    audioPhoneticsGuide: "Diagon [DY-uh-gon], Heriot's [HAIR-ee-uts], McGonagall [muh-GON-uh-gull]",
    overlayHook: "EDINBURGH: REAL DIAGON ALLEY ⚡",
    overlayCoreFact: "Victoria Street inspired Diagon Alley; Tom Riddle's grave is in Greyfriars Kirkyard!",
    overlayLocationBadge: "📍 Victoria Street • Old Town, Edinburgh",
    extraImportantContext: "JK Rowling wrote the early chapters in Edinburgh cafes. George Heriot's School inspired the 4 houses of Hogwarts."
  },
  25: {
    id: 25,
    tenSecAudioScript: "Television was invented in 1926 by Scottish genius John Logie Baird using cardboard, bicycle lenses, and an old tea chest!",
    audioPhoneticsGuide: "Baird [BAIRD], Helensburgh [HEL-enz-bur-ruh], Logie [LOH-gee]",
    overlayHook: "TELEVISION INVENTED BY A SCOT 📺",
    overlayCoreFact: "John Logie Baird built first TV in 1926 out of cardboard, glue, bicycle lenses and tea chest!",
    overlayLocationBadge: "📍 Helensburgh & Royal College • Glasgow",
    extraImportantContext: "Baird transmitted the first real television picture of a human face (office boy William Taynton) in London."
  },
  26: {
    id: 26,
    tenSecAudioScript: "Loch Ness contains more fresh water than every single lake, river, and reservoir in England and Wales combined!",
    audioPhoneticsGuide: "Loch Ness [LOKH NESS], Urquhart [UR-kurt]",
    overlayHook: "LOCH NESS WATER VOLUME SECRETS 🦕",
    overlayCoreFact: "Holds more fresh water than all lakes and rivers in England and Wales combined!",
    overlayLocationBadge: "📍 Urquhart Castle • Loch Ness, Highlands",
    extraImportantContext: "Contains 7.4 cubic kilometers of water and plunges to 754 feet deep. Peat-rich black water makes visibility zero."
  },
  27: {
    id: 27,
    tenSecAudioScript: "Edinburgh Castle is built directly on top of Castle Rock, a volcanic basalt plug that cooled 350 million years ago!",
    audioPhoneticsGuide: "Castlehill [KASS-ul-hill], Basalt [BAY-sawlt]",
    overlayHook: "EDINBURGH CASTLE'S VOLCANIC PLUG 🏰",
    overlayCoreFact: "Built atop a 350-million-year-old basalt volcanic crag with 260-ft cliffs on three sides!",
    overlayLocationBadge: "📍 Castlehill • Old Town, Edinburgh",
    extraImportantContext: "The sheer volcanic cliffs provided a natural fortress that has withstood 26 sieges throughout history."
  },
  28: {
    id: 28,
    tenSecAudioScript: "In 1903, Charles Rennie Mackintosh designed the famous Willow Tearooms in Glasgow to give workers a stylish alternative to the pub!",
    audioPhoneticsGuide: "Mackintosh [MAK-in-tosh], Sauchiehall [SAW-kee-hall]",
    overlayHook: "MACKINTOSH & THE WILLOW TEAROOMS 🌹",
    overlayCoreFact: "1903 Art Nouveau masterpiece built for temperance to give workers an alternative to pubs!",
    overlayLocationBadge: "📍 Mackintosh at the Willow • Sauchiehall St, Glasgow",
    extraImportantContext: "Mackintosh designed every detail, from the high-backed ladder chairs and purple stained glass to the silverware and waitresses' dresses."
  },
  29: {
    id: 29,
    tenSecAudioScript: "With just five million people, Scotland invented the telephone, penicillin, the steam engine, television, and radar!",
    audioPhoneticsGuide: "Fleming [FLEM-ing], Watt [WOT], Dunlop [DUN-lop]",
    overlayHook: "SCOTLAND INVENTED THE MODERN WORLD 💡",
    overlayCoreFact: "Telephone, Penicillin, Steam Engine, TV, Radar & Tyres — all created by Scottish minds!",
    overlayLocationBadge: "📍 National Museum of Scotland • Edinburgh",
    extraImportantContext: "Alexander Graham Bell (telephone), Alexander Fleming (penicillin), James Watt (steam engine), and John Boyd Dunlop (pneumatic tyres)."
  },
  30: {
    id: 30,
    tenSecAudioScript: "Beneath Edinburgh City Chambers lies Mary King's Close, an entire 17th-century street sealed underground in 1753!",
    audioPhoneticsGuide: "Mary King's [MARE-ee KINGZ], Chambers [CHAYM-berz]",
    overlayHook: "MARY KING'S BURIED UNDERGROUND STREET 🕯️",
    overlayCoreFact: "17th-century street sealed beneath City Chambers in 1753 — frozen in time for 250 years!",
    overlayLocationBadge: "📍 The Real Mary King's Close • Royal Mile, Edinburgh",
    extraImportantContext: "Rather than demolish the narrow alley, builders sliced off the upper storeys to use the buildings as foundation vaults."
  },
  31: {
    id: 31,
    tenSecAudioScript: "Glasgow's oldest restaurant, Rogano, was fitted out in 1935 by the very shipyard joiners who built the Queen Mary liner!",
    audioPhoneticsGuide: "Rogano [roh-GAH-no], Vitrolite [VIT-roh-lyte]",
    overlayHook: "ROGANO: GLASGOW'S ART DECO LINER 🍸",
    overlayCoreFact: "Fitted out in 1935 by shipyard joiners building the Queen Mary using spare ocean liner materials!",
    overlayLocationBadge: "📍 Exchange Place • Royal Exchange Sq, Glasgow",
    extraImportantContext: "Features the exact sea-green vitrolite glass and burr walnut panelling used on the luxury transatlantic ocean liner."
  },
  32: {
    id: 32,
    tenSecAudioScript: "Standing 200 feet tall in Edinburgh is the Scott Monument, the largest memorial dedicated to any writer on Earth!",
    audioPhoneticsGuide: "Scott [SKOT], Carrara [kuh-RAH-ruh], Maida [MAY-dah]",
    overlayHook: "WORLD'S LARGEST WRITER MONUMENT 📚",
    overlayCoreFact: "200 feet tall with 287 spiral steps, 68 carved book characters & Sir Walter Scott's dog!",
    overlayLocationBadge: "📍 Scott Monument • Princes St, Edinburgh",
    extraImportantContext: "Honors Sir Walter Scott. Visitors can climb all 287 narrow spiral steps to the viewing gallery."
  },
  33: {
    id: 33,
    tenSecAudioScript: "Britain's oldest living thing is the Fortingall Yew in Scotland—up to 5,000 years old, alive when the Pyramids were built!",
    audioPhoneticsGuide: "Fortingall [FOR-tin-gull], Yew [YOO], Perthshire [PERTH-sheer]",
    overlayHook: "BRITAIN'S OLDEST LIVING TREE (5000 YRS) 🌲",
    overlayCoreFact: "Alive when the Pyramids were built! Folklore says Pontius Pilate was born under its boughs.",
    overlayLocationBadge: "📍 Fortingall Churchyard • Glen Lyon, Perthshire",
    extraImportantContext: "Pre-dates Stonehenge and the Egyptian Pyramids. In 2015, one branch of the male tree began producing female berries."
  },
  34: {
    id: 34,
    tenSecAudioScript: "Did you know Saint Valentine is in Glasgow? In the Gorbals district lies the genuine bone relics of the patron saint of love!",
    audioPhoneticsGuide: "Gorbals [GOR-bulz], Duns Scotus [DUNZ SKOH-tus]",
    overlayHook: "SAINT VALENTINE IS IN GLASGOW 💘",
    overlayCoreFact: "Genuine bone relics brought from Rome in 1868 — couples bless engagement rings here!",
    overlayLocationBadge: "📍 Duns Scotus Church • The Gorbals, Glasgow",
    extraImportantContext: "Gifted by a wealthy French family in 1868. Lovers visit every February 14th to have their engagement rings blessed."
  },
  35: {
    id: 35,
    tenSecAudioScript: "Outside Edinburgh Castle, the Witches' Well marks where over 300 innocent people were executed during the 16th-century witch trials!",
    audioPhoneticsGuide: "Castlehill [KAH-sul-hill], Daemonologie [day-mon-OL-oh-jee]",
    overlayHook: "EDINBURGH'S WITCHES' WELL 🧙‍♀️",
    overlayCoreFact: "Over 300 executed on Castlehill under King James VI — Scotland officially pardoned them in 2022!",
    overlayLocationBadge: "📍 The Witches' Well • Castlehill, Edinburgh",
    extraImportantContext: "King James VI was obsessed with witch hunting. In 2022, the Scottish Government issued a formal state apology."
  },
  36: {
    id: 36,
    tenSecAudioScript: "Golf was invented in Scotland, but in 1457, King James II banned it because men played golf instead of practicing archery!",
    audioPhoneticsGuide: "St Andrews [SAYNT AN-drooz], Swilcan [SWIL-kan]",
    overlayHook: "GOLF WAS BANNED BY THE KING (1457) ⛳",
    overlayCoreFact: "Banned because Scots played golf instead of archery practice until King James IV got hooked!",
    overlayLocationBadge: "📍 The Old Course • St Andrews, Fife",
    extraImportantContext: "The ban lasted until 1502, when King James IV bought his own custom clubs and fell in love with the game."
  },
  37: {
    id: 37,
    tenSecAudioScript: "Glasgow's most romantic cobblestone street is Ashton Lane, lit by thousands of twinkling fairy lights above cozy West End pubs!",
    audioPhoneticsGuide: "Ashton [ASH-ton], Grosvenor [GROHV-ner], Byres [BY-erz]",
    overlayHook: "ASHTON LANE: GLASGOW'S FAIRY-LIT HEART ✨",
    overlayCoreFact: "Victorian cobbled mews with thousands of twinkling fairy lights & 1921 vintage cinema!",
    overlayLocationBadge: "📍 Ashton Lane • West End, Glasgow",
    extraImportantContext: "Originally 19th-century horse stables, converted in the 1970s into Glasgow's bohemian cultural nightlife center."
  },
  38: {
    id: 38,
    tenSecAudioScript: "On Edinburgh's Calton Hill stands a replica Parthenon that ran completely out of money in 1829 with only 12 pillars built!",
    audioPhoneticsGuide: "Calton [KAWL-ton], Parthenon [PAR-theh-non]",
    overlayHook: "CALTON HILL: 'EDINBURGH'S DISGRACE' 🏛️",
    overlayCoreFact: "Planned a full Greek Parthenon — ran out of money after just 12 columns in 1829!",
    overlayLocationBadge: "📍 National Monument • Calton Hill, Edinburgh",
    extraImportantContext: "Commissioned to honor Scottish soldiers of the Napoleonic Wars. Known affectionately as 'Edinburgh's Disgrace'."
  },
  39: {
    id: 39,
    tenSecAudioScript: "Meet the Highland Coo! That iconic ginger fringe is called a 'dossan', and it keeps cold rain and midges out of their eyes!",
    audioPhoneticsGuide: "Coo [KOO], Dossan [DOSS-an], Pollok [POL-uk]",
    overlayHook: "THE HIGHLAND COO: GENTLE GIANTS 🐮",
    overlayCoreFact: "Oldest registered cattle breed on Earth — shaggy 'dossan' fringe keeps rain and midges away!",
    overlayLocationBadge: "📍 Scottish Highlands & Pollok Park, Glasgow",
    extraImportantContext: "Oldest registered cattle breed in the world (1884). Famous for their gentle, docile temperament."
  },
  40: {
    id: 40,
    tenSecAudioScript: "Glasgow is home to the Britannia Panopticon, the world's oldest surviving music hall where Stan Laurel made his 1906 stage debut!",
    audioPhoneticsGuide: "Panopticon [pan-OP-tih-kon], Trongate [TRON-gate], Laurel [LAH-rul]",
    overlayHook: "WORLD'S OLDEST SURVIVING MUSIC HALL 🎭",
    overlayCoreFact: "Opened 1857 on Trongate — where 16-year-old Stan Laurel made his comedic stage debut in 1906!",
    overlayLocationBadge: "📍 Britannia Panopticon • 117 Trongate, Glasgow",
    extraImportantContext: "Audiences threw rivets and rotten turnips at bad performers. Preserved in its raw Victorian condition."
  },
  41: {
    id: 41,
    tenSecAudioScript: "Beneath Edinburgh's South Bridge lie 120 dark stone vaults where illegal whisky stills and slums operated, sealed up for a century!",
    audioPhoneticsGuide: "Cowgate [KOW-gate], Rowan [ROH-an]",
    overlayHook: "EDINBURGH'S SECRET BRIDGE VAULTS 🦇",
    overlayCoreFact: "120 chambers inside the 1788 bridge — slums & moonshine stills forgotten for 100 years!",
    overlayLocationBadge: "📍 South Bridge Vaults • Cowgate, Edinburgh",
    extraImportantContext: "Built in 1788. After dampness forced tradesmen out, they became underground slums rediscovered in 1985."
  },
  42: {
    id: 42,
    tenSecAudioScript: "Glasgow's Barrowland Ballroom has the world's largest animated neon sign and a sprung dancefloor that bounces like a trampoline!",
    audioPhoneticsGuide: "Barrowlands [BAH-roh-landz], Gallowgate [GAH-loh-gate]",
    overlayHook: "THE BARROWLAND BOUNCE 🎸✨",
    overlayCoreFact: "World's biggest animated neon sign & sprung Canadian maple floor that bounces like a trampoline!",
    overlayLocationBadge: "📍 Barrowland Ballroom • 244 Gallowgate, Glasgow",
    extraImportantContext: "Built on flexible timber and horsehair. When 2,000 fans jump in unison, the floor flexes several inches."
  },
  43: {
    id: 43,
    tenSecAudioScript: "After the Battle of Culloden in 1746, wearing tartan and kilts was made a crime punishable by seven years deportation!",
    audioPhoneticsGuide: "Proscription [proh-SKRIP-shun], Culloden [kuh-LOD-un]",
    overlayHook: "TARTAN WAS ILLEGAL FOR 36 YEARS 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    overlayCoreFact: "Wearing kilts banned in 1746 under penalty of 7 years deportation to penal colonies!",
    overlayLocationBadge: "📍 Scottish Register of Tartans • Edinburgh",
    extraImportantContext: "The Dress Act 1746 banned Highland dress for 36 years until repealed in 1782."
  },
  44: {
    id: 44,
    tenSecAudioScript: "Greyfriars Kirkyard held 1,200 prisoners in 1679. Right beside it lies 'Bluidy Mackenzie's' tomb—the infamous Mackenzie Poltergeist!",
    audioPhoneticsGuide: "Covenanter [KUV-eh-nan-ter], Mackenzie [muh-KEN-zee]",
    overlayHook: "COVENANTERS' PRISON & POLTERGEIST ⛓️👻",
    overlayCoreFact: "1,200 held outdoors in 1679 winter — Mackenzie's tomb is now the world's most haunted poltergeist!",
    overlayLocationBadge: "📍 Greyfriars Kirkyard • Candlemaker Row, Edinburgh",
    extraImportantContext: "Over 400 documented paranormal incidents reported by visitors around the Black Mausoleum."
  },
  45: {
    id: 45,
    tenSecAudioScript: "Glasgow University's 1870 Gothic Cloisters are so stunning that Hollywood uses them to film blockbusters like The Batman and Outlander!",
    audioPhoneticsGuide: "Gilmorehill [GIL-mor-hill], Cloisters [KLOY-sterz]",
    overlayHook: "GLASGOW'S MAGICAL GOTHIC CLOISTERS 🏛️🎬",
    overlayCoreFact: "Founded 1451! Hollywood filming spot for The Batman, Outlander & Cloud Atlas.",
    overlayLocationBadge: "📍 University of Glasgow • Gilmorehill, Glasgow",
    extraImportantContext: "Fourth-oldest university in the English-speaking world. Designed by Sir George Gilbert Scott."
  },
  46: {
    id: 46,
    tenSecAudioScript: "Scotland chose the Unicorn as its national animal in the 12th century, depicting it in chains because free unicorns are wild and untamable!",
    audioPhoneticsGuide: "Heraldry [HER-uld-ree], Stirling [STER-ling]",
    overlayHook: "SCOTLAND'S CHAINED UNICORN 🦄⛓️",
    overlayCoreFact: "Adopted in 1100s for untamable strength — depicted in golden chains because free unicorns are wild!",
    overlayLocationBadge: "📍 Stirling & Edinburgh Castles • Scotland",
    extraImportantContext: "In medieval heraldry, only a true king could tame the noble unicorn. Appears across Scottish Mercat Crosses."
  },
  47: {
    id: 47,
    tenSecAudioScript: "William Brodie was a respected Edinburgh city deacon who led a secret double life as a burglar, inspiring Dr Jekyll and Mr Hyde!",
    audioPhoneticsGuide: "Brodie [BROH-dee], Lawnmarket [LAWN-mar-kit]",
    overlayHook: "DEACON BRODIE'S SECRET DOUBLE LIFE 🗝️🎩",
    overlayCoreFact: "Town councillor by day, cat burglar by night — hanged in 1788 on gallows he redesigned!",
    overlayLocationBadge: "📍 Lawnmarket • Royal Mile, Edinburgh",
    extraImportantContext: "Robert Louis Stevenson's family owned furniture built by Brodie. Hanged on the Royal Mile in 1788."
  },
  48: {
    id: 48,
    tenSecAudioScript: "The 175-foot Finnieston Crane on the River Clyde is one of only eleven left on Earth—the mighty symbol of Clydebuilt shipbuilding!",
    audioPhoneticsGuide: "Finnieston [FIN-iss-ton], Clydebuilt [KLYDE-bilt]",
    overlayHook: "THE FINNIESTON CRANE: 175-TON TITAN 🏗️",
    overlayCoreFact: "Built 1931 to hoist steam locomotives into ships — one of only 11 giant cantilever cranes left on Earth!",
    overlayLocationBadge: "📍 North Bank River Clyde • Glasgow",
    extraImportantContext: "Constructed to load heavy steam locomotives manufactured at Glasgow's Springburn works onto cargo ships."
  },
  49: {
    id: 49,
    tenSecAudioScript: "Why does Scotland celebrate New Year's so big? Because Christmas was banned in Scotland for 400 years until 1958!",
    audioPhoneticsGuide: "Hogmanay [HOG-muh-nay], Auld Lang Syne [AWLD lang SYNE]",
    overlayHook: "WHY SCOTLAND CELEBRATES HOGMANAY 🎆🥃",
    overlayCoreFact: "Christmas was banned for nearly 400 years (until 1958)! First footing with coal, whisky & Burns!",
    overlayLocationBadge: "📍 Princes Street & George Square • Scotland",
    extraImportantContext: "Following the 1640 Reformation ban on Yule, Scots focused winter celebrations on Hogmanay and 'First Footing'."
  },
  50: {
    id: 50,
    tenSecAudioScript: "From Edinburgh Castle's volcanic crags to Glasgow's warm heart and the wild Highlands—Scotland is one unforgettable nation!",
    audioPhoneticsGuide: "Flourish [FLUR-ish], Edinburgh [ED-in-bur-ruh], Glasgow [GLAZ-go]",
    overlayHook: "SCOTLAND FOREVER: 50 UNBELIEVABLE FACTS 🏴󠁧󠁢󠁳󠁣󠁴󠁿❤️",
    overlayCoreFact: "From Edinburgh Castle to Glasgow's warm heart — one unforgettable nation that built the world!",
    overlayLocationBadge: "📍 Glasgow • Edinburgh • Highlands, Scotland",
    extraImportantContext: "'Let Glasgow Flourish' and Edinburgh's Enlightenment: 50 verified historical facts celebrating Scotland's genius."
  }
};

export function getOptimized10sScript(factId: number): TenSecondScriptOptimization | undefined {
  return TEN_SECOND_OPTIMIZATIONS[factId];
}

export function getOptimizedOverlayData(blueprint: ShortsBlueprint): {
  hook: string;
  coreFact: string;
  locationBadge: string;
  extraContext: string;
} {
  const opt = TEN_SECOND_OPTIMIZATIONS[blueprint.id];
  return {
    hook: opt?.overlayHook || blueprint.subtitles?.line1Hook || blueprint.title || '',
    coreFact: opt?.overlayCoreFact || blueprint.subtitles?.line2Fact || blueprint.factText || '',
    locationBadge: opt?.overlayLocationBadge || blueprint.subtitles?.line3Location || blueprint.location || '',
    extraContext: opt?.extraImportantContext || blueprint.overlayExtraContext || ''
  };
}

export interface AudioTimingMetric {
  wordCount: number;
  estimatedDurationSec: number;
  paceRating: 'PERFECT (8.0-9.5s)' | 'SLIGHTLY FAST (<8.0s)' | 'TOO LONG (>10.0s)';
  statusLabel: string;
  statusColor: string;
  wpm: number;
}

export function calculateAudioTiming(text: string, wpm: number = 145): AudioTimingMetric {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const estimatedDurationSec = Number(((wordCount / wpm) * 60).toFixed(1));

  let paceRating: AudioTimingMetric['paceRating'] = 'PERFECT (8.0-9.5s)';
  let statusColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
  let statusLabel = `${estimatedDurationSec}s • Perfect Pacing`;

  if (estimatedDurationSec > 10.0) {
    paceRating = 'TOO LONG (>10.0s)';
    statusColor = 'bg-rose-950/80 text-rose-300 border-rose-500/40';
    statusLabel = `${estimatedDurationSec}s • Too Long (>10s)`;
  } else if (estimatedDurationSec < 8.0) {
    paceRating = 'SLIGHTLY FAST (<8.0s)';
    statusColor = 'bg-sky-950/80 text-sky-300 border-sky-500/40';
    statusLabel = `${estimatedDurationSec}s • Punchy Fast`;
  }

  return {
    wordCount,
    estimatedDurationSec,
    paceRating,
    statusLabel,
    statusColor,
    wpm
  };
}
