// Vota Chi? — v4: posizioni reali anonime al posto delle domande generiche.
// Meccanica: per ogni tema, l'utente vede la posizione reale di un partito (senza sapere quale)
// e dice se è d'accordo. Solo alla fine il partito viene rivelato, nella scheda profilo.
//
// STATO DEI DATI (onestà prima di tutto):
// - Tutti e 10 i temi sono popolati con 12 posizioni reali ciascuno (120 totali), parafrasate.
// - Ogni voce ha una fonte. Dove non è stata trovata una dichiarazione diretta e specifica del
//   partito (soprattutto per i partiti più piccoli o su temi meno documentati), la fonte lo dice
//   esplicitamente: "posizione dedotta... nessuna dichiarazione diretta trovata". Questo NON ha
//   lo stesso livello di affidabilità di una fonte diretta (dichiarazione, voto, mozione) — è
//   un'inferenza ragionevole dal posizionamento noto del partito, non un fatto verificato.
// - Le schede "Storia" dei partiti sono fatti pubblici verificabili (fondazione, leader, ideologia).
// Scenario 2026, pre-liste ufficiali per le elezioni politiche 2027. Da aggiornare quando
// la composizione di liste/coalizioni sarà definitiva.

const THEMES = [
  { key: "economia", label: "Economia" },
  { key: "lavoro", label: "Lavoro" },
  { key: "ambiente", label: "Ambiente" },
  { key: "sanita", label: "Sanità" },
  { key: "istruzione", label: "Istruzione" },
  { key: "sicurezza", label: "Sicurezza" },
  { key: "immigrazione", label: "Immigrazione" },
  { key: "diritti", label: "Diritti civili" },
  { key: "giustizia", label: "Giustizia" },
  { key: "europa", label: "Europa ed estero" },
];

const PARTY_COLORS = {
  fdi: "#0B4C2E", lega: "#1E7A3D", fi: "#1B4F8C", noimoderati: "#3E8FC9",
  pd: "#C0234B", m5s: "#D4A017", avs: "#7A3E5C", iv: "#C94F8C", piueuropa: "#E0459A",
  azione: "#2E8B8B", fn: "#2B2B2B", pld: "#6B6F76",
};

// Partiti reali — scenario 2026, PRE-liste ufficiali (elezioni 2027 non ancora convocate).
// "storia": fatti pubblici verificabili (fondazione, leadership, posizionamento).
const PARTIES = [
  { id: "01", slug: "fdi", initials: "FdI", name: "Fratelli d'Italia", leader: "Giorgia Meloni",
    color: PARTY_COLORS.fdi,
    storia: "Fondato nel dicembre 2012 da Giorgia Meloni, Ignazio La Russa e Guido Crosetto come costola conservatrice nata dallo scioglimento del Popolo della Libertà. Conservatorismo nazionale, gruppo ECR in Europa. Al governo dall'ottobre 2022, con Meloni presidente del Consiglio." },
  { id: "02", slug: "lega", initials: "LEGA", name: "Lega", leader: "Matteo Salvini",
    color: PARTY_COLORS.lega,
    storia: "Nata come Lega Nord tra il 1989 e il 1991 attorno a Umberto Bossi, con un'agenda originaria di autonomia del Nord Italia. Sotto la segreteria di Matteo Salvini (dal 2013) si è trasformata in forza nazionale sovranista, mantenendo il radicamento territoriale nordista." },
  { id: "03", slug: "fi", initials: "FI", name: "Forza Italia", leader: "Antonio Tajani",
    color: PARTY_COLORS.fi,
    storia: "Fondata da Silvio Berlusconi nel gennaio 1994. Dopo la sua morte (giugno 2023) è guidata da Antonio Tajani. Membro del PPE a livello europeo, posizionamento liberale-moderato e atlantista." },
  { id: "04", slug: "noimoderati", initials: "NM", name: "Noi Moderati", leader: "Maurizio Lupi",
    color: PARTY_COLORS.noimoderati,
    storia: "Federazione centrista nata nel 2022 attorno a Maurizio Lupi (già Noi con l'Italia), che riunisce diverse liste moderate del centrodestra. Parte della coalizione di governo dal 2022." },
  { id: "05", slug: "pd", initials: "PD", name: "Partito Democratico", leader: "Elly Schlein",
    color: PARTY_COLORS.pd,
    storia: "Fondato nel 2007 dalla fusione di Democratici di Sinistra e Democrazia è Libertà - La Margherita. Guidato da Elly Schlein dal 2023, prima segretaria donna del partito." },
  { id: "06", slug: "m5s", initials: "M5S", name: "Movimento 5 Stelle", leader: "Giuseppe Conte",
    color: PARTY_COLORS.m5s,
    storia: "Fondato nel 2009 da Beppe Grillo e Gianroberto Casaleggio come movimento anti-establishment. Ha governato in coalizione con Lega (2018-19), PD (2019-21) e nel governo Draghi. Guidato da Giuseppe Conte dal 2021." },
  { id: "07", slug: "avs", initials: "AVS", name: "Alleanza Verdi e Sinistra", leader: "Angelo Bonelli / Nicola Fratoianni",
    color: PARTY_COLORS.avs,
    storia: "Federazione nata il 26 luglio 2022 dall'alleanza elettorale tra Sinistra Italiana (Nicola Fratoianni) ed Europa Verde (Angelo Bonelli), per superare la soglia di sbarramento del 3%. I due restano co-portavoce." },
  { id: "08", slug: "iv", initials: "IV", name: "Italia Viva", leader: "Matteo Renzi",
    color: PARTY_COLORS.iv,
    storia: "Fondata da Matteo Renzi nel settembre 2019, a seguito di una scissione dal Partito Democratico. Posizionamento liberale-riformista di centro." },
  { id: "09", slug: "piueuropa", initials: "+EU", name: "+Europa", leader: "Riccardo Magi",
    color: PARTY_COLORS.piueuropa,
    storia: "Nata nel 2017 su iniziativa di Emma Bonino, di tradizione radicale e liberale, con forte impronta europeista. Guidata oggi da Riccardo Magi." },
  { id: "10", slug: "azione", initials: "AZ", name: "Azione", leader: "Carlo Calenda",
    color: PARTY_COLORS.azione,
    storia: "Fondata da Carlo Calenda nel 2019 dopo l'uscita dal PD. Orientamento liberale-riformista, si richiama esplicitamente all'esperienza del governo Draghi." },
  { id: "11", slug: "fn", initials: "FN", name: "Futuro Nazionale", leader: "Roberto Vannacci",
    color: PARTY_COLORS.fn,
    storia: "Fondato il 3 febbraio 2026 da Roberto Vannacci, generale ed eurodeputato, dopo l'uscita dalla Lega. Programma incentrato su identità, sicurezza e \"remigrazione\", pubblicato come \"B.I.P. 2027-2037\"." },
  { id: "12", slug: "pld", initials: "PLD", name: "Partito Liberal Democratico", leader: "Luigi Marattin (segretario) / Andrea Marcucci (presidente)",
    color: PARTY_COLORS.pld,
    storia: "Nato l'8 marzo 2025 a Roma dalla fusione di quattro realtà liberali (Orizzonti Liberali, Nos, Liberal Forum, Libdem), nel solco dell'\"agenda Draghi\". Affiliato ad ALDE Party a livello europeo." },
];

function partyById(id) { return PARTIES.find((p) => p.id === id); }

// Coalizioni reali (scenario 2026, provvisorio — la composizione può cambiare fino al deposito liste).
const COALITIONS = [
  { id: "cdx", name: "Centrodestra (coalizione di governo)", color: "#1B4F8C", partyIds: ["01", "02", "03", "04"] },
  { id: "cs", name: "Campo largo (centrosinistra esteso)", color: "#C0234B", partyIds: ["05", "06", "07", "08", "09"] },
  { id: "na", name: "Non allineati / fuori coalizione", color: "#5B6478", partyIds: ["10", "11", "12"] },
];

function coalitionOf(partyId) {
  return COALITIONS.find((c) => c.partyIds.includes(partyId)) || null;
}

// Legge elettorale: stato reale a inizio agosto 2026.
const ELECTORAL_LAW = {
  statoAttuale: "Rosatellum (l. 165/2017), in vigore",
  riformaInCorso: "\"Stabilicum\": approvata dalla Camera il 16/07/2026, in attesa del voto finale al Senato (15/09/2026)",
  sogliaPartito: "3% (invariata anche nello Stabilicum)",
  sogliaCoalizione: "10% (invariata anche nello Stabilicum)",
  premioStabilicum: "42% dei voti validi → premio di 70 seggi Camera + 35 Senato, fino a un tetto di 220/113",
  fonte: "Camera dei Deputati; cronaca parlamentare, luglio 2026",
};

// ---- OPINIONI: una posizione reale per partito per tema, mostrata in forma anonima. ----
// Parafrasi in linguaggio proprio, non citazioni testuali. Ogni voce ha una fonte.
// Temi senza voci = "in preparazione", non vengono mostrati come survey.
const OPINIONS = {
  economia: [
    { partyId: "01", text: "Le tasse vanno abbassate in modo lineare per famiglie e imprese, privilegiando la stabilità dei conti pubblici rispetto a nuova spesa.", source: "posizionamento noto del partito, programmi e dichiarazioni di governo 2022-2026" },
    { partyId: "02", text: "La flat tax va estesa il più possibile, insieme a più autonomia fiscale per le Regioni.", source: "posizionamento noto del partito, programmi e dichiarazioni pubbliche ricorrenti" },
    { partyId: "03", text: "La riduzione della pressione fiscale e la libertà d'impresa restano la priorità, in un quadro di piena collaborazione con l'Unione Europea.", source: "posizionamento noto del partito, linea PPE" },
    { partyId: "04", text: "Le piccole e medie imprese meritano più sostegno diretto e meno burocrazia, in continuità con le politiche della coalizione di governo.", source: "posizionamento noto del partito" },
    { partyId: "05", text: "Chi guadagna di più deve contribuire di più, per finanziare servizi pubblici e ridurre le disuguaglianze.", source: "posizionamento noto del partito, linea Schlein" },
    { partyId: "06", text: "Servono più tutele per chi lavora — salario minimo per legge e strumenti contro la povertà — anche a costo di intervenire di più sul mercato.", source: "posizionamento noto del partito" },
    { partyId: "07", text: "Tassare chi ha di più non è un tabù: giustizia sociale e transizione ecologica vanno finanziate insieme.", source: "N. Fratoianni, dichiarazione ANSA, giugno 2026" },
    { partyId: "08", text: "Le riforme che rendono il mercato del lavoro più flessibile aiutano l'occupazione più dei vincoli burocratici.", source: "posizionamento noto del partito, eredità Jobs Act" },
    { partyId: "09", text: "Meno tasse, meno burocrazia e più concorrenza, dentro un quadro europeo più integrato.", source: "posizionamento noto del partito, tradizione radicale-liberale" },
    { partyId: "10", text: "La competitività del Paese si costruisce con riforme strutturali e responsabilità di bilancio, non con nuova spesa a debito.", source: "posizionamento noto del partito, agenda Draghi" },
    { partyId: "11", text: "Secondo la proposta del partito: un'aliquota fiscale unica e più bassa per le piccole imprese, con il taglio del cuneo fiscale finanziato dai risparmi attesi dalle politiche di \"remigrazione\" (proposta contestata dagli oppositori, non verificata in modo indipendente).", source: "Pagella Politica e Sardegnagol, luglio 2026 — programma \"B.I.P.\"" },
    { partyId: "12", text: "Il Paese ha bisogno di riforme liberali serie — fisco, concorrenza, PA — nel solco del governo Draghi, senza slogan populisti.", source: "posizionamento noto del partito, fondazione marzo 2025" },
  ],
  lavoro: [
    { partyId: "01", text: "Il salario giusto va ancorato alla contrattazione collettiva nazionale, non fissato per legge: lo abbiamo già trasformato in norma con il Decreto Lavoro.", source: "Decreto Legge 62/2026 (\"salario giusto\"), dichiarazioni G. Meloni, giugno 2026" },
    { partyId: "02", text: "Il salario va deciso dalla contrattazione tra le parti sociali, non imposto per legge dallo Stato.", source: "posizione di maggioranza sul Decreto Lavoro 2026 (linea di coalizione, non dichiarazione individuale specifica trovata)" },
    { partyId: "03", text: "La contrattazione collettiva resta lo strumento giusto per fissare i salari: un minimo legale rischia di livellare verso il basso i contratti già migliori.", source: "posizione di maggioranza sul Decreto Lavoro 2026 (linea di coalizione, non dichiarazione individuale specifica trovata)" },
    { partyId: "04", text: "Il salario giusto, ancorato ai contratti collettivi, è la strada giusta: lo abbiamo sostenuto nella maggioranza di governo.", source: "posizione di maggioranza sul Decreto Lavoro 2026 (linea di coalizione)" },
    { partyId: "05", text: "Serve un salario minimo legale di 9 euro l'ora: il \"salario giusto\" del governo lascia la situazione com'era.", source: "Pagella Politica, giugno 2026; proposta di legge unitaria delle opposizioni" },
    { partyId: "06", text: "Il salario minimo legale è una battaglia che portiamo avanti da più di dieci anni, ora anche con una proposta di legge di iniziativa popolare.", source: "Movimento 5 Stelle, sito ufficiale, 2026" },
    { partyId: "07", text: "Il salario minimo legale è necessario, insieme al rafforzamento della contrattazione collettiva: le due cose non si escludono.", source: "adesione alla proposta di legge unitaria delle opposizioni, Confcommercio/Pagella Politica" },
    { partyId: "08", text: "Il salario minimo legale è tra le misure che sosteniamo, insieme alle altre opposizioni.", source: "Pagella Politica, giugno 2026" },
    { partyId: "09", text: "Un salario minimo legale, insieme a PD, M5S e le altre opposizioni, è una misura di civiltà che il governo continua a rifiutare.", source: "Pagella Politica, giugno 2026; proposta di legge unitaria delle opposizioni" },
    { partyId: "10", text: "Siamo firmatari della proposta di legge sul salario minimo a 9 euro l'ora, insieme alle altre opposizioni.", source: "proposta di legge unitaria delle opposizioni, 2023-2026" },
    { partyId: "11", text: "In dichiarazione di voto abbiamo criticato l'assenza di una soglia minima oraria nel Decreto Lavoro: anche a destra si può sostenere un minimo salariale.", source: "Pagella Politica, giugno 2026 — dichiarazione di voto alla Camera" },
    { partyId: "12", text: "Un minimo legale imposto per decreto rischia di essere uno slogan: meglio riformare sul serio la contrattazione collettiva.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata nelle fonti consultate" },
  ],
  ambiente: [
    { partyId: "01", text: "Abbiamo votato compatti per riportare il nucleare in Italia: è una delle leggi simbolo di questa legislatura.", source: "voto compatto di maggioranza sul ddl nucleare, Camera, giugno 2026 (Mondo Professionisti)" },
    { partyId: "02", text: "Il nucleare, insieme alle rinnovabili programmabili, serve per un mix energetico che non dipenda solo dal gas straniero.", source: "programma Lega — ricerca su piccoli reattori modulari e fusione (QualEnergia)" },
    { partyId: "03", text: "Non possiamo rinunciare al nucleare: parliamo di piccoli reattori modulari, non di nuove grandi centrali.", source: "A. Tajani, intervista al Sole 24 Ore" },
    { partyId: "04", text: "Abbiamo sostenuto insieme al resto della maggioranza il ritorno del nucleare civile in Italia.", source: "voto compatto di maggioranza, ddl nucleare, giugno 2026" },
    { partyId: "05", text: "Ci stiamo aprendo con più attenzione al nucleare, pur restando cauti: non vogliamo chiudere porte per pregiudizio ideologico.", source: "Il Foglio, luglio 2026 — \"Il Pd sempre più vicino al nucleare\"" },
    { partyId: "06", text: "Siamo contrari al nucleare da fissione: la vera priorità sono rinnovabili diffuse, efficienza e riduzione dei consumi, una vera \"democrazia energetica\".", source: "programma M5S; G. Conte, giugno 2026 (Il Foglio)" },
    { partyId: "07", text: "Il nucleare non è la soluzione: servono una rete moderna e investimenti su accumulo e rinnovabili, non centrali che costano troppo e arrivano troppo tardi.", source: "A. Bonelli, giugno 2026 (Il Foglio)" },
    { partyId: "08", text: "Non siamo pregiudizialmente contrari al nucleare, se la ricerca lo rende sicuro e conveniente.", source: "posizione dedotta dal posizionamento riformista del partito — nessuna dichiarazione diretta specifica trovata per il 2026" },
    { partyId: "09", text: "Non ci opponiamo per principio alla ricerca sul nucleare, ma va valutata su basi tecniche e di sicurezza, non ideologiche.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "10", text: "Il nucleare va rimesso nel mix energetico italiano: è tecnologia matura altrove, ed escluderla per principio è stato un errore.", source: "posizionamento noto di C. Calenda in interviste e dichiarazioni pubbliche ricorrenti — nessuna citazione diretta 2026 trovata" },
    { partyId: "11", text: "Il nucleare serve anche per l'indipendenza energetica e la sovranità nazionale, in linea con la posizione della maggioranza di cui facevamo parte.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "Va superato il tabù ideologico sul nucleare, con un approccio tecnico e non politico alla sicurezza energetica.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  sanita: [
    { partyId: "01", text: "Abbiamo dato al Servizio sanitario nazionale le risorse più alte della sua storia: 18 miliardi in più in quattro anni. Il problema, semmai, è che alcune Regioni non spendono i fondi già stanziati.", source: "sottosegretario M. Gemmato, Commissione Affari Sociali, marzo 2026 (Quotidiano Sanità)" },
    { partyId: "02", text: "Più fondi da soli non bastano: servono anche riorganizzazione regionale e responsabilità dei manager sanitari sui tempi di attesa.", source: "mozioni di maggioranza, Camera, aprile 2026" },
    { partyId: "03", text: "Il Fondo sanitario nazionale è cresciuto come mai prima: la sfida ora è superare i tetti di spesa per il personale.", source: "mozione di maggioranza, Camera, aprile 2026" },
    { partyId: "04", text: "Serve completare la Piattaforma nazionale delle liste d'attesa e sbloccare le assunzioni straordinarie di personale.", source: "mozione bipartisan approvata alla Camera, aprile 2026" },
    { partyId: "05", text: "Il Governo sta smontando pezzo per pezzo il diritto alla salute: la spesa pubblica scende rispetto al Pil, mentre cresce quanto pagano le famiglie di tasca propria.", source: "E. Schlein; mozione Gruppo PD Camera, aprile 2026" },
    { partyId: "06", text: "Il Servizio sanitario nazionale è stato svuotato da anni di sottofinanziamento, eccessiva regionalizzazione e aziendalizzazione: va rifinanziato sul serio.", source: "mozione M5S, Senato, 2026" },
    { partyId: "07", text: "Difendiamo un servizio sanitario davvero pubblico e universale: la sanità privata non può diventare un ripiego per chi non può aspettare.", source: "posizione dedotta dall'allineamento con le mozioni di opposizione — nessuna dichiarazione diretta specifica trovata per il 2026" },
    { partyId: "08", text: "Il problema non è solo quanto si spende, ma come: servono più efficienza gestionale nelle Regioni, insieme a risorse adeguate.", source: "posizione dedotta dal posizionamento riformista del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "09", text: "Un servizio sanitario pubblico forte è un pilastro della cittadinanza: va difeso dai tagli, non progressivamente sostituito dal privato.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "10", text: "Servono riforme strutturali della gestione sanitaria regionale, non solo l'annuncio di nuovi miliardi ogni anno.", source: "posizione dedotta dal posizionamento riformista del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "11", text: "Come parte della maggioranza che ha aumentato i fondi al Ssn, la priorità ora è far funzionare meglio quello che già c'è.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "La sanità pubblica va difesa, ma con una gestione più efficiente e meno sprechi regionali, non solo con nuovi stanziamenti.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  istruzione: [
    { partyId: "01", text: "La Scuola del Merito valorizza il talento di ogni studente, non crea élite: regole, responsabilità e impegno reale sono la base.", source: "G. Valditara, ministro Istruzione e Merito, dichiarazioni 2026" },
    { partyId: "02", text: "A scuola serve pluralismo vero e libertà di opinione per tutti: le nuove circolari vanno in questa direzione, non contro l'autonomia scolastica.", source: "R. Sasso, capogruppo Lega Commissione Cultura, Orizzonte Scuola" },
    { partyId: "03", text: "Il ritorno del voto di condotta come strumento educativo serio è un passo giusto per una scuola più autorevole.", source: "posizione dedotta dall'allineamento di maggioranza — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "04", text: "L'autonomia differenziata può essere un'opportunità anche per la scuola nei territori, se accompagnata da investimenti veri nel Mezzogiorno.", source: "posizione dedotta dall'allineamento di maggioranza — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "05", text: "L'autonomia differenziata rischia di sancire cittadini di scuola di serie A e di serie B, a seconda della Regione in cui si nasce.", source: "E. Schlein, citata in Notizie Scuola" },
    { partyId: "06", text: "L'autonomia differenziata sulla scuola aumenta le disuguaglianze tra Nord e Sud invece di ridurle.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "07", text: "La scuola pubblica deve restare uguale in tutto il Paese: l'autonomia differenziata la spezza in tanti sistemi regionali diversi.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "08", text: "Il merito nella scuola va premiato, ma serve anche colmare i divari territoriali reali, non solo parlarne.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "09", text: "La scuola pubblica ha bisogno di più investimenti uguali per tutti, non di una frammentazione regionale che aumenta le disuguaglianze.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "10", text: "Il principio del merito nella scuola è giusto, ma va accompagnato da standard nazionali chiari, non lasciato alle singole Regioni.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "11", text: "La scuola deve tornare a insegnare regole, disciplina e rispetto delle istituzioni, non solo competenze.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "Il merito va valorizzato, ma con standard nazionali uguali per tutti gli studenti, indipendentemente dalla Regione.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  sicurezza: [
    { partyId: "01", text: "Il decreto sicurezza rafforza gli strumenti per polizia e prefetti contro violenza giovanile, armi improprie e disordini nelle manifestazioni: era necessario.", source: "Decreto-legge 23/2026, Governo, febbraio 2026" },
    { partyId: "02", text: "Più poteri di prevenzione per le forze dell'ordine nelle città e nelle manifestazioni pubbliche: la sicurezza urbana viene prima di tutto.", source: "linea di maggioranza sul Decreto-legge 23/2026" },
    { partyId: "03", text: "Il decreto sicurezza tocca insieme sicurezza, accoglienza, ingressi e lavoro: un provvedimento valido nel complesso.", source: "M. Gasparri, capogruppo FI Senato (Pagella Politica)" },
    { partyId: "04", text: "Abbiamo sostenuto il decreto sicurezza come parte della maggioranza: servono regole più chiare su armi e ordine pubblico nelle città.", source: "linea di maggioranza sul Decreto-legge 23/2026" },
    { partyId: "05", text: "Alcune norme di questo decreto rischiano di essere incostituzionali: lo ha fatto capire lo stesso Presidente della Repubblica.", source: "Internazionale, aprile 2026 — Mattarella convoca il sottosegretario Mantovano" },
    { partyId: "06", text: "Un decreto securitario che comprime diritti e libertà, spacciato per sicurezza.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione individuale specifica trovata per il DL 23/2026" },
    { partyId: "07", text: "Sotto la bandiera della sicurezza si comprimono il diritto di manifestare e le garanzie individuali.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "08", text: "Alcune misure sulla sicurezza urbana sono condivisibili, ma il metodo del decreto d'urgenza continuo non è quello giusto.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "09", text: "Sicurezza sì, ma non a scapito delle garanzie costituzionali: questo decreto solleva più di un dubbio.", source: "posizione dedotta dal posizionamento liberale-garantista del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "10", text: "Sull'ordine pubblico un approccio pragmatico serve più delle bandiere ideologiche, ma il decreto va valutato norma per norma.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "11", text: "Le regole sull'ordine pubblico andrebbero rese ancora più stringenti di quanto fa questo decreto.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "La sicurezza urbana è un tema reale, ma va affrontato con norme stabili approvate dal Parlamento, non con decreti d'urgenza ripetuti.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  immigrazione: [
    { partyId: "01", text: "Potenziare i centri di permanenza per il rimpatrio e velocizzare le espulsioni è la strada giusta per gestire l'immigrazione irregolare.", source: "Decreto-legge 23/2026, disposizioni su CPR e rimpatrio" },
    { partyId: "02", text: "I rimpatri devono diventare la norma per chi non ha diritto a restare: su questo abbiamo sempre insistito.", source: "linea storica del partito; Decreto-legge 23/2026" },
    { partyId: "03", text: "Il decreto riguarda insieme sicurezza, accoglienza, ingressi regolari e lavoro: un equilibrio che condividiamo.", source: "M. Gasparri, capogruppo FI Senato (Pagella Politica)" },
    { partyId: "04", text: "Più ordine sui rimpatri, ma anche canali regolari per chi lavora: serve equilibrio, non solo repressione.", source: "posizione dedotta dall'allineamento di maggioranza — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "05", text: "Questo decreto aumenterà le presenze irregolari e lo sfruttamento, non la sicurezza: lo abbiamo detto in Aula.", source: "senatore PD, Pagella Politica" },
    { partyId: "06", text: "Il vero problema è la mancanza di canali legali, non la linea dura che aumenta solo irregolarità e sfruttamento.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione diretta specifica trovata per il DL 23/2026" },
    { partyId: "07", text: "L'emendamento che paga gli avvocati per ogni rimpatrio \"volontario\" è un incentivo alla remigrazione di massa, non un aiuto alle persone.", source: "Internazionale, aprile 2026 — critica dell'opposizione all'emendamento sui rimpatri" },
    { partyId: "08", text: "I flussi regolari andrebbero ampliati, non solo i rimpatri: mancano lavoratori in molti settori.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "09", text: "L'accoglienza diffusa e i corridoi umanitari funzionano meglio della sola repressione: su questo il governo sbaglia approccio.", source: "posizione dedotta dal posizionamento storicamente pro-immigrazione del partito — nessuna dichiarazione diretta specifica trovata per il 2026" },
    { partyId: "10", text: "Servono regole certe su ingressi e rimpatri, applicate davvero: né buonismo né propaganda.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "11", text: "Il decreto va nella direzione giusta, ma i rimpatri restano troppo pochi rispetto a chi non ha titolo per restare.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "L'immigrazione regolare legata al lavoro andrebbe favorita con regole semplici, insieme a rimpatri credibili per chi non ha diritto a restare.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  diritti: [
    { partyId: "01", text: "Lo Stato deve rafforzare cure palliative e sostegno alle famiglie, non trasformare l'aiuto al suicidio in una procedura garantita dal Servizio sanitario nazionale.", source: "G. Meloni, gennaio 2026 (Pagella Politica)" },
    { partyId: "02", text: "Siamo d'accordo con FdI: il Servizio sanitario nazionale non deve essere coinvolto nella procedura di suicidio assistito.", source: "Pagella Politica, maggio 2026" },
    { partyId: "03", text: "Alcuni di noi propongono che medici ospedalieri possano partecipare su base volontaria e gratuita alla morte medicalmente assistita: sul fine vita va lasciata libertà di coscienza.", source: "La Verità, giugno 2026 — emendamenti Craxi/Zanettin" },
    { partyId: "04", text: "Su un tema così delicato serve la massima cautela: prima le cure palliative, poi eventualmente il resto.", source: "posizione dedotta dall'allineamento di maggioranza — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "05", text: "Serve una legge che garantisca l'accesso al suicidio assistito anche attraverso il Servizio sanitario nazionale: non possiamo lasciare tutto alle sentenze della Corte costituzionale.", source: "proposta di legge A. Bazoli; F. Boccia, Il Messaggero, maggio 2026" },
    { partyId: "06", text: "Su questo tema vanno lasciate da parte le bandierine di partito: il Parlamento deve semplicemente fare il suo dovere e decidere.", source: "Il Messaggero, maggio 2026" },
    { partyId: "07", text: "Il diritto a scegliere come porre fine alla propria sofferenza va garantito pienamente, senza le restrizioni che la maggioranza vuole imporre.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "08", text: "Sul fine vita serve una legge, e deve garantire davvero la libertà di scelta della persona.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "09", text: "Il testo della maggioranza resta troppo restrittivo: la libertà di scelta sul fine vita va garantita in modo pieno, non simbolico.", source: "R. Magi, citato in ildiritto.it, maggio 2026" },
    { partyId: "10", text: "Serve una legge chiara sul fine vita, definita dal Parlamento e non lasciata solo alle sentenze della Corte costituzionale.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "11", text: "Prima di parlare di suicidio assistito lo Stato deve garantire cure palliative vere per tutti.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "La libertà di scelta della persona alla fine della vita va rispettata, con garanzie mediche solide.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  giustizia: [
    { partyId: "01", text: "Il referendum lo abbiamo voluto noi: separare le carriere tra chi giudica e chi accusa rende la giustizia più imparziale, anche se il Paese ha detto no.", source: "referendum costituzionale 22-23 marzo 2026, esito e dichiarazioni di Governo" },
    { partyId: "02", text: "Abbiamo sostenuto la riforma sulla separazione delle carriere fino alla fine, anche dopo la sconfitta al referendum.", source: "linea di maggioranza sul referendum giustizia 2026" },
    { partyId: "03", text: "Abbiamo dedicato questo voto alla memoria del nostro fondatore: una giustizia più giusta passa anche da qui.", source: "A. Tajani, voto Senato sulla separazione delle carriere (Avvenire)" },
    { partyId: "04", text: "Come tutta la maggioranza, abbiamo sostenuto la separazione delle carriere fino al referendum.", source: "linea di maggioranza sul referendum giustizia 2026" },
    { partyId: "05", text: "Abbiamo fatto campagna per il No: la riforma rischiava di mettere la magistratura sotto il controllo della politica, e gli italiani ci hanno dato ragione.", source: "E. Schlein, conferenza stampa referendum, marzo 2026 (Fanpage)" },
    { partyId: "06", text: "Abbiamo fatto una battaglia dura contro questa riforma, anche in piazza e in aula, richiamando la memoria di chi ha dato la vita per la giustizia.", source: "protesta parlamentare M5S, Avvenire" },
    { partyId: "07", text: "Ci siamo uniti al fronte del No: la separazione delle carriere indebolisce l'indipendenza della magistratura.", source: "posizione dedotta dall'allineamento di opposizione — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "08", text: "Abbiamo lasciato libertà di voto ai nostri elettori: il testo aveva dei limiti, ma il tema lo abbiamo sempre sostenuto in passato.", source: "Wikipedia Italia Viva; Sky TG24, marzo 2026" },
    { partyId: "09", text: "Sosteniamo in linea di principio la separazione delle carriere, pur con qualche riserva tecnica sul testo approvato.", source: "R. Magi, Sky TG24, marzo 2026" },
    { partyId: "10", text: "Abbiamo votato a favore in Parlamento: la separazione tra chi giudica e chi accusa è una battaglia liberale, anche se restiamo all'opposizione su tutto il resto.", source: "C. Calenda, Pagella Politica; voto Senato 106 sì" },
    { partyId: "11", text: "Preferiamo un sistema in cui i giudici siano scelti da chi ricopre cariche elettive, piuttosto che lasciarlo alle correnti della magistratura: per questo eravamo per il Sì.", source: "Sky TG24, marzo 2026" },
    { partyId: "12", text: "Sosteniamo storicamente la separazione delle carriere, nel solco della tradizione liberale.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
  europa: [
    { partyId: "01", text: "Ci presentiamo al vertice Nato con una spesa per difesa e sicurezza al 2,8% del Pil: una scelta di responsabilità. Il tema vero è la qualità della spesa, non solo la quantità.", source: "Formiche.net, giugno 2026 — posizione del Governo Meloni" },
    { partyId: "02", text: "Sull'aumento delle spese militari ci sono anche ragioni di sostenibilità dei conti pubblici da considerare, non solo di alleanza.", source: "Formiche.net, giugno 2026" },
    { partyId: "03", text: "Per le spese militari ci sarà tempo di discutere in modo più approfondito: non è un tema su cui correre.", source: "S. Craxi, capogruppo FI Senato, Il Sole 24 Ore, maggio 2026" },
    { partyId: "04", text: "La sicurezza dell'Italia passa anche dalla Nato, ma gli impegni di spesa vanno calibrati sulle reali capacità del Paese.", source: "posizione dedotta dall'allineamento di maggioranza — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "05", text: "Vogliamo rivedere gli impegni Nato sulla spesa e vincolare ogni margine di bilancio a povertà e sanità pubblica, non alle armi.", source: "mozione PD-M5S-AVS-IV, Camera, giugno 2026" },
    { partyId: "06", text: "Ci opponiamo all'aumento strutturale delle spese militari: contestiamo sia il quadro Nato sia gli strumenti finanziari europei per il riarmo.", source: "F. Silvestri, capogruppo M5S Commissione Esteri, Formiche.net, giugno 2026" },
    { partyId: "07", text: "Con noi niente 5% del Pil in spese militari: le risorse per la difesa si trovano tassando lo 0,1% più ricco del Paese, non tagliando il resto.", source: "dichiarazioni AVS, OLnews, luglio 2026" },
    { partyId: "08", text: "Anche noi chiediamo di rivedere gli impegni di spesa Nato e di vincolare eventuali risorse extra a povertà e sanità pubblica.", source: "mozione PD-M5S-AVS-IV, Camera, giugno 2026" },
    { partyId: "09", text: "Restare saldamente nella Nato e sostenere l'Ucraina non è negoziabile, anche se il modo di finanziarlo va discusso.", source: "posizione dedotta dal posizionamento storicamente atlantista del partito — nessuna dichiarazione diretta specifica trovata per il 2026" },
    { partyId: "10", text: "L'Italia non può permettersi di arretrare sulla Nato e sul sostegno all'Ucraina: la sicurezza si paga, prima o poi.", source: "posizione dedotta dal posizionamento storicamente atlantista del partito — nessuna dichiarazione diretta specifica trovata per il 2026" },
    { partyId: "11", text: "La difesa nazionale va rafforzata, ma senza subordinare le scelte italiane agli interessi di altri Paesi alleati.", source: "posizione dedotta dal posizionamento del partito — nessuna dichiarazione diretta specifica trovata" },
    { partyId: "12", text: "Nel solco dell'agenda Draghi, un impegno serio sulla difesa europea è necessario per la sicurezza del continente.", source: "posizione dedotta dal posizionamento liberale-atlantista del partito — nessuna dichiarazione diretta specifica trovata" },
  ],
};

function themeHasOpinions(themeKey) {
  return (OPINIONS[themeKey] || []).length > 0;
}

const ELIMINATION_THRESHOLD = 35; // affinità % sotto la quale un partito esce
const ELIMINATION_MIN_ANSWERS = 15; // almeno ~1,5 temi risposti prima che l'eliminazione scatti

// ---- stato ----
const state = {
  activeTheme: null,
  answers: {},          // { themeKey: { partyId: -1|0|1 } }
  order: {},             // { themeKey: [partyId in ordine anonimo casuale] }
  posInOrder: 0,
  manualOverride: {},
};

THEMES.forEach((t) => { state.answers[t.key] = {}; });

function shuffledPartyOrder(themeKey) {
  const ids = OPINIONS[themeKey].map((o) => o.partyId);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

// ---- DOM refs ----
const board = document.getElementById("board");
const remainingCountEl = document.getElementById("remainingCount");
const resetBtn = document.getElementById("resetBtn");
const themeTabsEl = document.getElementById("themeTabs");
const qCategoryEl = document.getElementById("qCategory");
const qTextEl = document.getElementById("qText");
const qGlobalDoneEl = document.getElementById("qGlobalDone");
const progressFill = document.getElementById("progressFill");
const answerButtons = document.querySelectorAll(".answer-btn");
const profileEmpty = document.getElementById("profileEmpty");
const profileContent = document.getElementById("profileContent");
const profileTag = document.getElementById("profileTag");
const profileName = document.getElementById("profileName");
const profileParty = document.getElementById("profileParty");
const profileValues = document.getElementById("profileValues");
const toggleElectoralLawBtn = document.getElementById("toggleElectoralLaw");
const toggleCoalitionsBtn = document.getElementById("toggleCoalitions");
const electoralLawPanel = document.getElementById("electoralLawPanel");
const coalitionsPanel = document.getElementById("coalitionsPanel");
const electoralLawGrid = document.getElementById("electoralLawGrid");
const coalitionLegend = document.getElementById("coalitionLegend");
const coalitionDisplayToggle = document.getElementById("coalitionDisplayToggle");

// ---- helper ----
function themeAnsweredCount(themeKey) {
  return Object.keys(state.answers[themeKey]).length;
}

function themeTotal(themeKey) {
  return (OPINIONS[themeKey] || []).length;
}

function themeIsComplete(themeKey) {
  const total = themeTotal(themeKey);
  return total > 0 && themeAnsweredCount(themeKey) === total;
}

function totalOpinionsCount() {
  return THEMES.reduce((sum, t) => sum + themeTotal(t.key), 0);
}

function totalAnsweredCount() {
  return THEMES.reduce((sum, t) => sum + themeAnsweredCount(t.key), 0);
}

// ---- affinità: quota di posizioni reali con cui l'utente si è detto d'accordo ----
function computeMatch(party) {
  let agree = 0;
  let total = 0;
  THEMES.forEach((theme) => {
    const val = state.answers[theme.key][party.id];
    if (val === undefined || val === 0) return;
    total += 1;
    if (val === 1) agree += 1;
  });
  if (total === 0) return null;
  return Math.round((agree / total) * 100);
}

// ---- tab dei temi ----
function renderThemeTabs() {
  themeTabsEl.innerHTML = "";
  THEMES.forEach((theme) => {
    const total = themeTotal(theme.key);
    const done = themeAnsweredCount(theme.key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-tab";
    if (theme.key === state.activeTheme) btn.classList.add("active");
    if (total > 0 && done === total) btn.classList.add("complete");
    if (total === 0) btn.classList.add("pending");
    btn.innerHTML = `
      <span class="theme-tab-name">${theme.label}</span>
      <span class="theme-tab-progress">${total === 0 ? "in preparazione" : `${done}/${total}${done === total ? " ✓" : ""}`}</span>
    `;
    btn.addEventListener("click", () => startTheme(theme.key));
    themeTabsEl.appendChild(btn);
  });
}

function startTheme(themeKey) {
  state.activeTheme = themeKey;

  if (!themeHasOpinions(themeKey)) {
    renderThemeTabs();
    renderQuestion();
    return;
  }

  if (!state.order[themeKey]) {
    state.order[themeKey] = shuffledPartyOrder(themeKey);
  }
  const order = state.order[themeKey];
  const firstUnanswered = order.findIndex((pid) => state.answers[themeKey][pid] === undefined);
  state.posInOrder = firstUnanswered === -1 ? 0 : firstUnanswered;
  answerButtons.forEach((b) => (b.disabled = false));
  renderThemeTabs();
  renderQuestion();
}

// ---- vista corrente ----
function renderQuestion() {
  const totalOpinions = totalOpinionsCount();
  progressFill.style.width = totalOpinions === 0 ? "0%" : `${(totalAnsweredCount() / totalOpinions) * 100}%`;
  qGlobalDoneEl.textContent = totalAnsweredCount();

  if (state.activeTheme === null) {
    qCategoryEl.textContent = "Seleziona un tema per iniziare";
    qTextEl.textContent = "Tocca uno dei temi qui sopra per vedere le posizioni reali (anonime) dei partiti su quel tema.";
    answerButtons.forEach((b) => (b.disabled = true));
    return;
  }

  const theme = THEMES.find((t) => t.key === state.activeTheme);

  if (!themeHasOpinions(theme.key)) {
    qCategoryEl.textContent = `${theme.label} · in preparazione`;
    qTextEl.textContent = "Le posizioni reali per questo tema non sono ancora state inserite. Scegli un altro tema, o torna più avanti.";
    answerButtons.forEach((b) => (b.disabled = true));
    return;
  }

  const order = state.order[theme.key];
  const partyId = order[state.posInOrder];
  const opinion = OPINIONS[theme.key].find((o) => o.partyId === partyId);

  qCategoryEl.textContent = `${theme.label} · posizione ${state.posInOrder + 1}/${order.length}`;
  qTextEl.textContent = `"${opinion.text}"`;
  answerButtons.forEach((b) => (b.disabled = false));
}

function nextThemeToDo(afterKey) {
  const idx = THEMES.findIndex((t) => t.key === afterKey);
  for (let i = idx + 1; i < THEMES.length; i++) {
    if (themeHasOpinions(THEMES[i].key) && !themeIsComplete(THEMES[i].key)) return THEMES[i].key;
  }
  for (let i = 0; i < THEMES.length; i++) {
    if (themeHasOpinions(THEMES[i].key) && !themeIsComplete(THEMES[i].key)) return THEMES[i].key;
  }
  return null;
}

answerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (state.activeTheme === null || !themeHasOpinions(state.activeTheme)) return;
    const theme = state.activeTheme;
    const order = state.order[theme];
    const partyId = order[state.posInOrder];
    state.answers[theme][partyId] = Number(btn.dataset.value);

    if (state.posInOrder < order.length - 1) {
      state.posInOrder += 1;
      renderQuestion();
    } else {
      const next = nextThemeToDo(theme);
      if (next) {
        startTheme(next);
      } else {
        state.activeTheme = null;
        qCategoryEl.textContent = "Temi disponibili completati";
        qTextEl.textContent = "Guarda il tabellone per le affinità. Gli altri temi sono ancora in preparazione — torna più avanti.";
        answerButtons.forEach((b) => (b.disabled = true));
      }
    }
    renderThemeTabs();
    refreshBoard();
  });
});

// ---- toolbar: legge elettorale ----
function renderElectoralLaw() {
  const labels = {
    statoAttuale: "Stato attuale",
    riformaInCorso: "Riforma in corso",
    sogliaPartito: "Soglia partito",
    sogliaCoalizione: "Soglia coalizione",
    premioStabilicum: "Premio (se Stabilicum diventa legge)",
    fonte: "Fonte",
  };
  electoralLawGrid.innerHTML = Object.entries(ELECTORAL_LAW)
    .map(([key, val]) => `<dt>${labels[key]}</dt><dd>${val}</dd>`)
    .join("");
}

toggleElectoralLawBtn.addEventListener("click", () => {
  const isHidden = electoralLawPanel.hidden;
  electoralLawPanel.hidden = !isHidden;
  toggleElectoralLawBtn.setAttribute("aria-expanded", String(isHidden));
  if (isHidden) {
    coalitionsPanel.hidden = true;
    toggleCoalitionsBtn.setAttribute("aria-expanded", "false");
  }
});

// ---- toolbar: coalizioni ----
function renderCoalitionLegend() {
  coalitionLegend.innerHTML = COALITIONS.map((c) => {
    const remaining = c.partyIds.filter((id) => {
      const tile = document.querySelector(`.tile[data-id="${id}"]`);
      return tile && !tile.classList.contains("eliminated");
    }).length;
    return `
      <li>
        <span class="coalition-swatch" style="background:${c.color}"></span>
        <span>${c.name}</span>
        <span class="coalition-members">${remaining}/${c.partyIds.length} rimasti</span>
      </li>
    `;
  }).join("");
}

toggleCoalitionsBtn.addEventListener("click", () => {
  const isHidden = coalitionsPanel.hidden;
  coalitionsPanel.hidden = !isHidden;
  toggleCoalitionsBtn.setAttribute("aria-expanded", String(isHidden));
  if (isHidden) {
    electoralLawPanel.hidden = true;
    toggleElectoralLawBtn.setAttribute("aria-expanded", "false");
    renderCoalitionLegend();
  }
});

coalitionDisplayToggle.addEventListener("change", () => {
  board.classList.toggle("show-coalitions", coalitionDisplayToggle.checked);
});

// ---- loghi con fallback a monogramma ----
window.__logoFallback = function (imgEl, slug) {
  const tried = imgEl.dataset.tried || "";
  if (!tried.includes("png")) {
    imgEl.dataset.tried = tried + "png";
    imgEl.src = `assets/logos/${slug}.png`;
  } else {
    imgEl.style.display = "none";
    const mono = imgEl.nextElementSibling;
    if (mono) mono.style.display = "flex";
  }
};

function logoMarkup(p) {
  return `
    <img class="party-logo" src="assets/logos/${p.slug}.svg" alt="" aria-hidden="true"
         onerror="window.__logoFallback(this, '${p.slug}')">
    <div class="party-monogram" style="display:none; background:${p.color}">${p.initials}</div>
  `;
}

// ---- tabellone ----
function renderBoard() {
  board.innerHTML = "";
  PARTIES.forEach((p) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = p.id;

    const coalition = coalitionOf(p.id);
    tile.innerHTML = `
      <div class="tile-inner" role="button" tabindex="0"
           aria-label="${p.name}, leader ${p.leader}. Tocca per vedere il profilo.">
        <div class="tile-face tile-front">
          <span class="tile-coalition-stripe" style="background:${coalition ? coalition.color : "transparent"}"></span>
          <button class="manual-toggle" type="button" aria-label="Elimina o ripristina manualmente" data-id="${p.id}">✕</button>
          <div class="tile-portrait">
            ${logoMarkup(p)}
          </div>
          <div class="tile-label">
            <span class="tile-name">${p.name}</span>
            <span class="tile-party">${p.leader}</span>
            <span class="tile-affinity" data-affinity-for="${p.id}">—</span>
          </div>
        </div>
        <div class="tile-face tile-back">
          <span class="stamp">ELIMINATO</span>
        </div>
      </div>
    `;

    board.appendChild(tile);
  });

  attachTileEvents();
  refreshBoard();
}

function attachTileEvents() {
  document.querySelectorAll(".tile").forEach((tile) => {
    const id = tile.dataset.id;
    const inner = tile.querySelector(".tile-inner");
    const manualBtn = tile.querySelector(".manual-toggle");

    inner.addEventListener("click", () => showProfile(id));
    inner.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showProfile(id);
      }
    });

    manualBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentlyEliminated = tile.classList.contains("eliminated");
      state.manualOverride[id] = !currentlyEliminated;
      refreshBoard();
    });
  });
}

function refreshBoard() {
  PARTIES.forEach((p) => {
    const tile = document.querySelector(`.tile[data-id="${p.id}"]`);
    if (!tile) return;

    const match = computeMatch(p);
    const affinityEl = tile.querySelector(`[data-affinity-for="${p.id}"]`);
    affinityEl.textContent = match === null ? "affinità: dati non disponibili" : `affinità: ${match}%`;

    // Eliminazione automatica: sotto soglia dopo un numero minimo di risposte, salvo override manuale.
    let eliminated;
    if (p.id in state.manualOverride) {
      eliminated = state.manualOverride[p.id];
    } else {
      eliminated = match !== null && totalAnsweredCount() >= ELIMINATION_MIN_ANSWERS && match < ELIMINATION_THRESHOLD;
    }
    tile.classList.toggle("eliminated", eliminated);
  });

  const remaining = document.querySelectorAll(".tile:not(.eliminated)").length;
  remainingCountEl.textContent = remaining;

  if (!coalitionsPanel.hidden) renderCoalitionLegend();
}

// ---- profilo partito ----
function showProfile(id) {
  const p = partyById(id);
  if (!p) return;

  profileEmpty.hidden = true;
  profileContent.hidden = false;
  profileTag.style.background = p.color;
  profileName.textContent = p.name;
  profileParty.textContent = `Leader: ${p.leader}`;

  const rows = [`<li class="profile-storia">${p.storia}</li>`];

  THEMES.forEach((theme) => {
    if (!themeHasOpinions(theme.key)) return;
    const opinion = OPINIONS[theme.key].find((o) => o.partyId === p.id);
    if (!opinion) return;
    const answer = state.answers[theme.key][p.id];
    let statusLabel = "Non ancora votata";
    let statusClass = "status-pending";
    if (answer === 1) { statusLabel = "Hai detto D'accordo"; statusClass = "status-agree"; }
    else if (answer === -1) { statusLabel = "Hai detto Contrario"; statusClass = "status-disagree"; }
    else if (answer === 0) { statusLabel = "Non ti sei espresso"; statusClass = "status-skip"; }

    rows.push(`
      <li class="opinion-row">
        <div class="opinion-head">
          <span class="opinion-theme">${theme.label}</span>
          <span class="opinion-status ${statusClass}">${statusLabel}</span>
        </div>
        <p class="opinion-text">"${opinion.text}"</p>
        <p class="opinion-source">Fonte: ${opinion.source}</p>
      </li>
    `);
  });

  profileValues.innerHTML = rows.join("");
}

// ---- reset ----
resetBtn.addEventListener("click", () => {
  state.activeTheme = null;
  state.posInOrder = 0;
  state.order = {};
  state.manualOverride = {};
  THEMES.forEach((t) => { state.answers[t.key] = {}; });
  profileEmpty.hidden = false;
  profileContent.hidden = true;
  coalitionDisplayToggle.checked = false;
  board.classList.remove("show-coalitions");
  renderThemeTabs();
  renderQuestion();
  renderBoard();
});

// ---- avvio ----
renderElectoralLaw();
renderThemeTabs();
renderQuestion();
renderBoard();
