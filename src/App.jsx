import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Shuffle } from "lucide-react";

const quotes = [
  {
    quote: "Vaikų darželio žaidimas: atėjo senelis, liepė susirinkti žaislus ir dabar nežinau, ką toliau darys.",
    context: "Apie chaosą Seime ir TS-LKD veiksmus po „čekiukų“ skandalo.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2007044/nauseda-chaosa-seime-ir-konservatoriu-partijoje-vadina-vaiku-darzelio-zaidimu-atejo-senelis-ir-liepe-susirinkti-zaislus"
  },
  {
    quote: "Aš manau, kad Tėvynės sąjunga-Lietuvos krikščionys demokratai mėgino vėl pastatyti vežimą prieš arklį.",
    context: "Apie pirmalaikių rinkimų iniciatyvą politinės krizės metu.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2007044/nauseda-chaosa-seime-ir-konservatoriu-partijoje-vadina-vaiku-darzelio-zaidimu-atejo-senelis-ir-liepe-susirinkti-zaislus"
  },
  {
    quote: "Pagaliau reikia prisiimti atsakomybę už tai, ką kalbi viešojoje erdvėje. Kitą kartą geriau tarp keturių sienų pakalbėti ir kad niekas to negirdėtų.",
    context: "Komentaras apie viešus politinius pasisakymus.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Pastaruosius 20 metų pasakų nebeskaitau. Kažkada dukroms skaitydavau, dabar nebeskaitau.",
    context: "Atsakymas į žurnalistų klausimą apie politinius „pasakojimus“.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "O, Dieve mano, tai tikrai didelė naujiena. Tikiuosi, kad tie, kurie kalti, bus nubausti.",
    context: "Reakcija į vieną iš 2023 m. politinių skandalų.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Galima mėginti nuimti mažesnę galvą tam, kad būtų išsaugota didesnė. Klausimai yra poniai Armonaitei.",
    context: "Apie atsakomybės perkėlimą politinėje krizėje.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Vėl esame priversti stebėti naujųjų, kad ir kitomis spalvomis pasidabinusių, bebrų atgimimą, savotišką neobebrystės reiškinį.",
    context: "Apie politinį protekcionizmą ir „bebrų“ metaforą.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Na, džiaugiuosi, kad žolės dažyti nereikia, nes lietus pasirūpino tuo, kad Vilnius ir visa Lietuva tampa vėl natūraliai žalia.",
    context: "Apie pasiruošimą NATO viršūnių susitikimui Vilniuje.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Neplakime savęs, kad nusprendėme truputį dar lūpas pasidažyti prieš renginį.",
    context: "Apie Vilniaus pasiruošimą NATO viršūnių susitikimui.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Jūs norite, kad aš su bizūnėliu Seimą ginčiau greičiau įstatymą priimti?",
    context: "Apie prezidento spaudimą Seimui priimti įstatymus.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Staiga spalvos labai sutirštinamos. Siūlyčiau tiesiog užsienio reikalų ministrui atsisėsti ir nusiraminti.",
    context: "Apie įtampas su užsienio reikalų ministru.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Jeigu yra imitacija ir norima pasirūpinti parašiutais, tai mes čia parašiutų nesiuvame Prezidentūroje. Yra galbūt karinėse bazėse užsilikę ar dar kur nors.",
    context: "Apie ambasadorių atranką ir galimus „parašiutus“.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Konstitucijos 38 straipsnio turinys neturi būti išplaunamas per užpakalines duris.",
    context: "Apie Civilinės sąjungos įstatymą.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2084839/nauseda-nesigaili-pasipiktinima-sukelusiu-pareiskimu-del-civilines-sajungos-jokiu-kitu-minciu-neturejau"
  },
  {
    quote: "Jeigu kažkieno fantazija šiuo klausimu vaizdingesnė, galbūt pamato daugiau negu reikia, tačiau metaforų savo kalboje neketinu atsisakyti.",
    context: "Po reakcijų į „užpakalinių durų“ metaforą.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2084839/nauseda-nesigaili-pasipiktinima-sukelusiu-pareiskimu-del-civilines-sajungos-jokiu-kitu-minciu-neturejau"
  },
  {
    quote: "Pačių Vakarų bendruomenių mėginimai pro užpakalines duris įvesti Rusijos ir Baltarusijos sportininkus į tarptautinę areną.",
    context: "Apie Rusijos ir Baltarusijos sportininkų grąžinimą į tarptautines varžybas.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Mes, politikai, turėtume sutrumpinti savo kalbas, kad statybos greičiau vyktų.",
    context: "Viešame renginyje apie statybų eigą.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/2023-uju-prezidento-perliukai-neplakime-saves-kad-nusprendeme-dar-truputi-pasidazyti-lupas-1155247"
  },
  {
    quote: "Kartais man atrodo, kad konservatoriai reikalauja išsirengti žmogų prieš juos, kad jis įrodytų savo neteisumą.",
    context: "2024 m. frazė apie konservatorius.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/politiku-perliukai-2024-aisiais-apie-sanitarus-braskes-ir-valkatas-1206174"
  },
  {
    quote: "Ši partija turbūt gulasi ir keliasi galvodama apie mane.",
    context: "Apie konservatorių dėmesį prezidentui.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/politiku-perliukai-2024-aisiais-apie-sanitarus-braskes-ir-valkatas-1206174"
  },
  {
    quote: "Konservatoriai dažnai turi suvokimo problemą. Sakyčiau, dirbkite su literatūra, su tam tikromis disciplinomis.",
    context: "Atsakas konservatoriams dėl prezidento pozicijų.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/politiku-perliukai-2024-aisiais-apie-sanitarus-braskes-ir-valkatas-1206174"
  },
  {
    quote: "Mano, kaip prezidento, vaidmuo bus, sakyčiau, sanitarinis, jeigu galima taip pavadinti.",
    context: "Apie prezidento vaidmenį formuojant Vyriausybę.",
    source: "LNK / Kauno diena",
    url: "https://kauno.diena.lt/naujienos/lietuva/politika/politiku-perliukai-2024-aisiais-apie-sanitarus-braskes-ir-valkatas-1206174"
  },
  {
    quote: "Jeigu norima sėti sumaištį visuomenėje arba trolinti visus aplinkui – galima ir antilopę pasiūlyti į ministro pareigas.",
    context: "Apie „Nemuno aušros“ siūlomas ministrų kandidatūras.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2681245/nauseda-atsake-zemaitaiciui-norint-seti-sumaisti-i-ministrus-galima-pasiulyti-ir-antilope"
  },
  {
    quote: "Visas šitas vaikų žaidimas smėlio dėžėje vykdomas dėl labai paprastos priežasties – ši partija arba žmonių grupė tiesiog neturi kandidatų, kurių pasiūlymas nesukeltų šypsenos arba neverstų stvertis už galvos.",
    context: "Apie „Nemuno aušros“ ministrų kandidatūrų siūlymus ir politinį trolinimą formuojant Vyriausybę.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2681245/nauseda-atsake-zemaitaiciui-norint-seti-sumaisti-i-ministrus-galima-pasiulyti-ir-antilope"
  },
  {
    quote: "Aš ne mokytojas ir ne kažkoks pamokslautojas socialdemokratams. Kartais nusistebiu, kokia milžiniška yra socialdemokratų kantrybė.",
    context: "Apie socialdemokratų laikyseną koalicijoje.",
    source: "LRT / ELTA",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2681245/nauseda-atsake-zemaitaiciui-norint-seti-sumaisti-i-ministrus-galima-pasiulyti-ir-antilope"
  },
  {
    quote: "Tikrai nenorėčiau būti vaikų darželio auklėtojas ir nurodinėti, su kuo reikia draugauti, o su kuo ne.",
    context: "Apie tai, ar prezidentas kišis į koalicijos santykius.",
    source: "LRT / BNS",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2705489/nauseda-neketina-kistis-i-koalicijos-reikalus-nenoreciau-buti-darzelio-aukletoju"
  },
  {
    quote: "Pati politinė partija turi įvertinti, kaip ir vaikas, kuris draugauja su kitu vaiku, kuris jį skriaudžia arba atiminėja pinigus, tėvų duotus.",
    context: "Apie prezidento nenorą kištis į koalicijos santykius ir politinių partijų tarpusavio „draugystes“.",
    source: "LRT / BNS",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2705489/nauseda-neketina-kistis-i-koalicijos-reikalus-nenoreciau-buti-darzelio-aukletoju"
  },
  {
    quote: "Tai truputį panašu į nabašnyko pašlakstymą žaliąja arbata.",
    context: "Apie siūlomą PVM lengvatą šildymui.",
    source: "LRT",
    url: "https://www.lrt.lt/naujienos/verslas/4/1599285/nauseda-apie-valdzios-siuloma-pvm-lengvata-uz-sildyma-tai-panasu-i-nabasnyko-paslakstyma"
  },
  {
    quote: "Pagal nesudėtingus paskaičiavimus, padės sutaupyti 5–6 eurus. Jei su tokia žinute norime nueiti ir pasakyti, kiek daug padarėme žmonių labui, tai geriau jau gal neikime.",
    context: "Apie valdžios siūlytą PVM lengvatą šildymui ir jos menką praktinį poveikį žmonėms.",
    source: "LRT",
    url: "https://www.lrt.lt/naujienos/verslas/4/1599285/nauseda-apie-valdzios-siuloma-pvm-lengvata-uz-sildyma-tai-panasu-i-nabasnyko-paslakstyma"
  },
  {
    quote: "Kartais metafora padeda, bet kartais yra labai plona riba – kai jas mėtai į dešinę ir į kairę, jos praranda skonį.",
    context: "Knygos pristatyme apie savo metaforas.",
    source: "LRT",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2501418/nausedos-knygos-pristatyme-vaikystes-isdaigos-garsiosios-metaforos-ir-laimes-akimirkos"
  },
  {
    quote: "Metaforos tikslas – padėti geriau suprasti mintį, kurią nori pasakyti.",
    context: "Knygos pristatyme apie savo viešąją retoriką ir metaforų naudojimą politikoje.",
    source: "LRT",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2501418/nausedos-knygos-pristatyme-vaikystes-isdaigos-garsiosios-metaforos-ir-laimes-akimirkos"
  },
  {
    quote: "Sėdėti mašinoje, vairuoti ją pačiam, kas dabar neįmanoma. Visos problemos išgaruoja, lieki tik tu, nepažinti vaizdai už posūkio – va, čia yra laimė.",
    context: "Apie keliones ir vairavimą.",
    source: "LRT",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2501418/nausedos-knygos-pristatyme-vaikystes-isdaigos-garsiosios-metaforos-ir-laimes-akimirkos"
  },
  {
    quote: "Taip, kaip D. Trumpas, aš nepretenduoju į trečią kadenciją. Dabar tos kelionės nebe kelionės.",
    context: "Knygos pristatymo epizodas apie keliones ir prezidentavimą.",
    source: "LRT",
    url: "https://www.lrt.lt/naujienos/lietuvoje/2/2501418/nausedos-knygos-pristatyme-vaikystes-isdaigos-garsiosios-metaforos-ir-laimes-akimirkos"
  }
];

function Button({ children, onClick, variant = "dark", ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`nav-button ${variant === "light" ? "nav-button-light" : ""}`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  const progress = useMemo(() => `${index + 1} / ${quotes.length}`, [index]);

  const next = () => setIndex((current) => (current + 1) % quotes.length);
  const previous = () => setIndex((current) => (current - 1 + quotes.length) % quotes.length);
  const random = () => {
    if (quotes.length <= 1) return;
    let nextIndex = index;
    while (nextIndex === index) {
      nextIndex = Math.floor(Math.random() * quotes.length);
    }
    setIndex(nextIndex);
  };

  return (
    <main className="page-shell">
      <section className="content-wrap">
        <header className="topbar">
          <div>
            <p className="eyebrow">Gitano Nausėdos citatos</p>
            <h1>Retorikos karuselė</h1>
          </div>
          <div className="counter">{progress}</div>
        </header>

        <article className="quote-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="quote-content"
            >
              <Quote className="quote-icon" aria-hidden="true" />

              <blockquote>
                <p>„{quote.quote}“</p>
              </blockquote>

              <footer className="quote-footer">
                <p className="context">{quote.context}</p>
                <a href={quote.url} target="_blank" rel="noreferrer" className="source-link">
                  Source: {quote.source}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </footer>
            </motion.div>
          </AnimatePresence>
        </article>

        <nav className="controls" aria-label="Citatos navigacija">
          <Button onClick={previous} ariaLabel="Ankstesnė citata">
            <ChevronLeft size={18} />
            Back
          </Button>
          <Button onClick={random} ariaLabel="Atsitiktinė citata">
            <Shuffle size={18} />
            Random
          </Button>
          <Button onClick={next} variant="light" ariaLabel="Kita citata">
            Next
            <ChevronRight size={18} />
          </Button>
        </nav>
      </section>
    </main>
  );
}
