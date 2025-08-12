// stores.js
// Düzenle: her mağaza için lat ve lng alanlarını doldurun (number).
const stores = [
  // örnek dolu kayıtlar (test için)
  {
    id: "crescent-mall",
    name_en: "Crescent Mall",
    name_az: "Crescent Mall",
    address: "Neftçilər prospekti, Aypara Palace and Town 66, Baku",
    lat: 40.3739,
    lng: 49.8572,
    note: ""
  },
  { 
    id: "bravo-xetai",
    name_en: "Bravo Xətai – Babək prospekti - ENGRAVING",
    name_az: "Bravo Xətai – Babək prospekti - Qravür",
    address: "Babək prospekti, Xətai, Baku",
    lat: 40.38796137155803, 
    lng: 49.87406898506839,
    note: "ENGRAVING"
  },
  {
    id: "bravo-koroglu",
    name_en: "Bravo Koroğlu – Heydər Əliyev prospekti, 173",
    name_az: "Bravo Koroğlu – Heydər Əliyev prospekti, 173",
    address: "Heydər Əliyev prospekti, 173, Baku",
    lat: 40.41809330908716, 
    lng: 49.915037383539484,
    note: ""
  },


  // kullanıcının verdiği tam liste — lat/lng doldurun
  { id:"bravo-20-yanvar", name_en:"Bravo 20 Yanvar", name_az:"Bravo 20 Yanvar", address:"Tbilisi prospekti, 3007, Baku", lat:40.401695662558105, lng:49.810991248374314, note:"ENGRAVING" },
  { id:"bravo-ahmedli", name_en:"Bravo Əhmədli", name_az:"Bravo Əhmədli", address:"Ramiz Guliyev küçəsi, 4, Baku", lat:40.37527900972745, lng:49.94449340466641, note:"" },
  { id:"bravo-oasis", name_en:"Bravo Oasis", name_az:"Bravo Oasis", address:"Şövkət Məmmədova küçəsi 2, Baku", lat:40.419846899979966,  lng:49.846977559756404, note:"" },
  { id:"ganjlik-mall", name_en:"Ganjlik Mall", name_az:"Gənclik Mall", address:"Fətəli Xan Xoyski, 14, Baku", lat:40.40030244970395,  lng:49.85303042771635, note:"" },
  { id:"28-mall", name_en:"28 Mall", name_az:"28 Mall", address:"Azadlıq prospekti, 15a/4, Baku", lat:40.37925862220428,  lng:49.84669029518282, note:"" },
  { id:"deniz-mall", name_en:"Deniz Mall", name_az:"Deniz Mall", address:"Neftçilər prospekti, 26A, Baku", lat:40.358380077254644, lng:49.83728943682874, note:"" },
  { id:"park-bulvar", name_en:"Park Bulvar", name_az:"Park Bulvar", address:"Neftçilər prospekti, Baku", lat:40.370862980881796, lng:49.84973158353783, note:"" },
  { id:"sea-breeze-shorehouse", name_en:"Sea Breeze (Shore House)", name_az:"Sea Breeze (Shore House)", address:"Sea Breeze / Shore House, Baku (beach)", lat:40.59135832594675, lng:49.98455485286161, note:"" },
  { id:"sea-breeze-white", name_en:"Sea Breeze (White Beach Club)", name_az:"Sea Breeze (White Beach Club)", address:"Sea Breeze / White Beach Club, Baku (beach)", lat:40.593065254353995, lng:49.98450845486514, note:"" },
  { id:"torqovaya-boutique", name_en:"Torqovaya Boutique", name_az:"Torqovaya Boutique", address:"Fəvvarələr Meydanı, 6, Baku", lat:40.37168266750397,  lng:49.83813947525257, note:"ENGRAVING" },
  { id:"port-bazar", name_en:"Port Bazar", name_az:"Port Bazar", address:"Üzeyir Hacıbəyov, 151, Baku", lat:40.37677545007666, lng:49.860453881314044, note:"NO TRADE-IN" },
  { id:"araz-store", name_en:"Araz Store", name_az:"Araz Store", address:"İsmayıl Qutqaşınlı küçəsi, Baku", lat:40.370351141748976,  lng:49.820735332958265, note:"NO TRADE-IN" },
  { id:"araz-yasamal", name_en:"Araz Yasamal", name_az:"Araz Yasamal", address:"Abdurrahim Bəy Haqverdiyev küçəsi, Baku", lat:40.380265660721086, lng:49.81109514612156, note:"NO TRADE-IN" },
  { id:"araz-neftciler", name_en:"Araz Neftçilər", name_az:"Araz Neftçilər", address:"Mammadali Sharifli küçəsi, Baku", lat:40.413461405294875, lng: 49.949496146121554, note:"NO TRADE-IN" },
  { id:"araz-novxani", name_en:"Araz Novxani", name_az:"Araz Novxani", address:"Araz Supermarket Novxani, Novxanı", lat:40.53726404460094,  lng:49.78330640471164, note:"NO TRADE-IN" },
  { id:"rahat-gourmet-akademik", name_en:"Rahat Gourmet (Akademik Həsən Əliyev 1d)", name_az:"Rahat Gourmet (Akademik Həsən Əliyev küçəsi 1d)", address:"Akademik Həsən Əliyev küçəsi 1d", lat:40.39605165139278, lng:49.819716497032026, note:"NO TRADE-IN" },
  { id:"rahat-gourmet-merdaken", name_en:"Rahat Gourmet – Mərdəkən yolu", name_az:"Rahat Gourmet – Mərdəkən yolu", address:"Mərdəkən yolu", lat:40.47163842793118, lng:50.105581351413775, note:"NO TRADE-IN" },
  { id:"neptun-supermarket", name_en:"Neptun Supermarket", name_az:"Neptun Supermarket", address:"Mərkəzi Bulvar küçəsi, Baku", lat:40.38349842673802,  lng:49.89011919004341, note:"NO TRADE-IN" },
  { id:"amburan-beach", name_en:"Amburan beach", name_az:"Amburan çimərliyi", address:"Bilgəh qəsəbəsi, Amburan, Baku (beach)", lat:40.587798373466796, lng:50.06395485554929, note:"" },

  // Other cities
  { id:"ganja-ganjemall", name_en:"Gəncə: Gənjə Mall", name_az:"Gəncə: Gəncə Mall", address:"Gəncə, Gəncə Mall", lat:40.67720973826351,  lng:46.35944138170045, note:"" },
  { id:"sumqayit-babek5", name_en:"Sumqayıt: Babək 5 - Gold Qayalı", name_az:"Sumqayıt: Babək 5 - Gold Qayalı", address:"Sumqayıt, Babək 5, Gold Qayalı Ticarət mərkəzi", lat:40.56872979141323, lng:49.692285115155315, note:"" },
  { id:"sheki-rahat", name_en:"Şəki: Rahat Supermarket", name_az:"Şəki: Rahat Supermarket", address:"Şəki, Sabit Rəhman 6a", lat:41.204523539238394, lng:47.167568579271276, note:"NO TRADE-IN" },
  { id:"quba-tofiq", name_en:"Quba: (Tofiq Əhmədov küçəsi 1)", name_az:"Quba: Tofiq Əhmədov küçəsi 1", address:"Quba, Tofiq Əhmədov küçəsi 1", lat:41.3667434662082, lng: 48.527088738178314, note:"NO TRADE-IN" }
];
