export type AnswerType = "single" | "multi";

export type GameQuestion = {
  id: string;
  stem: string;
  options: string[];
  correctAnswers: string[];
  explanation: string;
  type: AnswerType;
};

export type GameLevel = {
  number: number;
  hero: string;
  title: string;
  shortTitle: string;
  hue: "cyan" | "coral" | "gold" | "mint";
  goal: string;
  emblem: string;
  portrait: string;
  scene: string;
  callouts: string[];
  questions: GameQuestion[];
};

export const artwork = {
  keyArt: "/images/key-art.webp",
  worldMap: "/images/world-map.webp",
  arena: "/images/arena.webp",
} as const;

const single = (
  id: string,
  stem: string,
  correct: string,
  distractors: string[],
  explanation: string,
): GameQuestion => ({
  id,
  stem,
  options: [correct, ...distractors],
  correctAnswers: [correct],
  explanation,
  type: "single",
});

export const levels: GameLevel[] = [
  {
    number: 1,
    portrait: "/images/hero-comp-scout.webp",
    scene: "/images/sector-1.webp",
    hero: "Comp Scout",
    title: "Introduction to Transaction Comps",
    shortTitle: "Transaction Comps",
    hue: "cyan",
    goal: "Identify comparable transactions and build a reliable valuation from documented deal information.",
    emblem: "⌕",
    callouts: ["Comparable universe", "Control premium", "Source documentation"],
    questions: [
      single("L1-01", "What does transaction comps analysis infer?", "Value from public transaction information and the price paid", ["Value from a company's daily stock-price movement", "Value from forecast revenue alone", "Value from the cost of replacing company assets"], "Transaction comps infer value from information about public transactions and the prices paid."),
      single("L1-02", "Which advantage does transaction comps capture?", "The control premium", ["A guaranteed future return", "The target's standalone book value", "The acquirer's cost of debt"], "A transaction price can reflect a control premium paid to acquire a company."),
      single("L1-03", "Which step is most important in a transaction comps process?", "Comparable-universe choice", ["Choosing a font for the analysis", "Selecting the target's fiscal year-end", "Estimating the acquirer's share price"], "The choice of comparable transactions is the most important step in the process."),
      single("L1-04", "Which factor belongs in the comparable universe?", "A recent time period", ["The analyst's preferred spreadsheet format", "The target's office floor", "An unrelated buyer's logo"], "A recent time period is one of the factors used to identify a comparable universe."),
      single("L1-05", "What must transaction information be verified against?", "Original source documentation", ["An undocumented estimate", "A social-media comment", "A source from an unrelated transaction"], "Reliable source documentation is needed to verify the information used in the analysis."),
    ],
  },
  {
    number: 2,
    portrait: "/images/hero-deal-shaper.webp",
    scene: "/images/sector-2.webp",
    hero: "Deal Shaper",
    title: "Understanding Deal Consideration",
    shortTitle: "Deal Consideration",
    hue: "coral",
    goal: "Read transaction overview fields and distinguish offer value from transaction value.",
    emblem: "⇄",
    callouts: ["Announcement date", "Offer value", "Transaction value"],
    questions: [
      single("L2-01", "Which date distinguishes a deal announcement from a rumor?", "Announcement Date", ["Date Completed", "A rumor date", "The target's fiscal year-end"], "The transaction overview records the Announcement Date, distinct from a rumor date."),
      single("L2-02", "Which expression gives Transaction Value?", "Offer Value + debt + preferred stock + minority interest − cash", ["Offer Value − debt − preferred stock − minority interest + cash", "Offer Value + cash − debt", "Offer Value × debt × preferred stock"], "The stated formula adds debt, preferred stock and minority interest to Offer Value, then subtracts cash."),
      single("L2-03", "Which item is an overview field?", "Acquirer", ["Premium percentage", "LTM EBITDA", "Comparable-universe factor"], "The overview fields are Announcement Date, Target, Acquirer and Date Completed."),
      single("L2-04", "What is the equity value in the Piramed example?", "TODO — client to supply the Piramed example value", ["The value is not provided in the brief", "Transaction Value less cash", "Offer Value plus debt"], "The Piramed example value was not supplied. The client must fill in this clearly marked TODO rather than assume a number."),
      single("L2-05", "What does an exchange ratio express in a stock offer?", "The number of acquirer shares offered for each target share", ["The target's cash balance", "The date a transaction is completed", "The transaction's comparable time period"], "An exchange ratio describes the shares offered in exchange for each target share."),
    ],
  },
  {
    number: 3,
    portrait: "/images/hero-multiple-master.webp",
    scene: "/images/sector-3.webp",
    hero: "Multiple Master",
    title: "Calculation and Application of Key Transaction Multiples",
    shortTitle: "Key Multiples",
    hue: "gold",
    goal: "Apply LTM and premium formulas, compare transaction multiples and read a valuation range.",
    emblem: "×",
    callouts: ["LTM calculation", "Premium", "7.0x–8.0x range"],
    questions: [
      single("L3-01", "What does LTM represent?", "Latest twelve months", ["Last transaction multiple", "Lowest target market value", "Long-term merger"], "LTM refers to the latest twelve months used in a financial measure."),
      single("L3-02", "Which expression calculates LTM?", "Latest fiscal year + current stub − prior stub ± extraordinary/nonrecurring items", ["Latest fiscal year − current stub + prior stub", "Current stub + prior stub only", "Offer Price ÷ Target Price"], "The LTM formula adjusts the latest fiscal year with the current and prior stub periods and extraordinary or nonrecurring items."),
      single("L3-03", "Why may precedent transaction multiples be higher?", "They can include a control premium", ["They exclude the transaction price", "They always use a lower target price", "They remove all deal consideration"], "Precedent transaction multiples may be higher because transaction prices can include a control premium."),
      single("L3-04", "Offer Price is 8.0 and Target Price is 10.0. Using the stated formula, what is the premium?", "−20%", ["20%", "80%", "−2%"], "Premium = (Offer Price ÷ Target Price) − 1 = (8.0 ÷ 10.0) − 1 = −20%."),
      single("L3-05", "Which terms are used after an amendment?", "Final amended terms", ["The original rumor", "The first draft only", "The target's prior stub period"], "When deal terms are amended, use the final amended terms."),
    ],
  },
  {
    number: 4,
    portrait: "/images/hero-source-guardian.webp",
    scene: "/images/sector-4.webp",
    hero: "Source Guardian",
    title: "Key Sources",
    shortTitle: "Key Sources",
    hue: "mint",
    goal: "Match the supplied public-target documents to an analysis and weigh the stated pros and cons.",
    emblem: "▤",
    callouts: ["Public targets", "Filing-date timing", "Source pros & cons"],
    questions: [
      single("L4-01", "Which documents support public-target analysis in this brief?", "Offer document, annual report, press release, proxy, tender offer and filings", ["Only an informal rumor", "Only an acquirer's share-price chart", "Only a list of private-company divisions"], "The brief lists these six documents as sources supporting public-target analysis."),
      single("L4-02", "When selecting information for a deal analysis, what timing does the brief call out?", "Filing-date timing", ["A date chosen after the analysis is complete", "A date unrelated to the transaction", "A forecast date not in the source"], "Filing-date timing is explicitly identified as a source consideration in the brief."),
      single("L4-03", "What should change when transaction terms are amended?", "Use the final amended terms", ["Keep using the first rumor", "Ignore the amended terms", "Replace the terms with a market multiple"], "The final amended terms should be used after an amendment."),
      single("L4-04", "Which is a stated pro of transaction comps?", "Market-based", ["Limited information", "Time lag", "Market conditions"], "Market-based is one of the stated advantages."),
      single("L4-05", "Which is a stated con of transaction comps?", "Limited comparables", ["Simplicity", "Objectivity", "Relativity"], "Limited comparables is one of the stated disadvantages."),
    ],
  },
];

export const arenaQuestions: GameQuestion[] = [
  {
    id: "A-01",
    stem: "Company X acquires Y at 0.65 X shares per Y share; X share price $40; Y has 500,000 shares. Cost of acquisition in millions?",
    options: ["$13.00", "$20.00", "$0.33"],
    correctAnswers: ["$13.00"],
    explanation: "0.65 × $40 × 500,000 = $13.0M.",
    type: "single",
  },
  {
    id: "A-02",
    stem: "Which is not a characteristic of M&A deals that earn high returns?",
    options: ["Relatively high transaction premium", "Strong buyer with earnings/share-price growth above industry average", "Favorable market reaction after announcement"],
    correctAnswers: ["Relatively high transaction premium"],
    explanation: "The exact answer key identifies a relatively high transaction premium as the choice that is not a characteristic of high-return deals.",
    type: "single",
  },
  {
    id: "A-03",
    stem: "Which are examples of synergies? I. Closing overlapping facilities II. Cost savings from headcount reduction III. Hiring a new brand marketing team IV. Loss of sales due to overlapping customers.",
    options: ["I and II", "I and III", "II and IV", "III and IV"],
    correctAnswers: ["I and II"],
    explanation: "The answer key identifies closing overlapping facilities and cost savings from headcount reduction as synergies.",
    type: "single",
  },
  {
    id: "A-04",
    stem: "Which are types of purchase consideration?",
    options: ["Cash", "Synergies", "Taxes", "Stock"],
    correctAnswers: ["Cash", "Stock"],
    explanation: "Cash and Stock are the two correct purchase consideration types in this question.",
    type: "multi",
  },
  {
    id: "A-05",
    stem: "Most generic and widely used multiples in Precedent Transactions Analysis?",
    options: ["Enterprise Value-to-Net Income", "Enterprise Value-to-LTM EBITDA", "Offer Price-to-LTM Diluted EPS", "Offer Price-to-LTM EBITDA"],
    correctAnswers: ["Enterprise Value-to-LTM EBITDA", "Offer Price-to-LTM Diluted EPS"],
    explanation: "The two keyed choices are EV-to-LTM EBITDA and Offer Price-to-LTM Diluted EPS.",
    type: "multi",
  },
];

export const valuationSteps = [
  "Comparable universe identification",
  "Collecting the comps data",
  "Choice of multiple",
  "Data analysis and target valuation",
];

export const universeFactors = [
  "Business relevance",
  "Geographical location",
  "Transaction / buyer type",
  "Size and growth profiles",
  "Recent time period",
];

export const transactionValueFormula = "Offer Value + debt + preferred stock + minority interest − cash = Transaction Value";
export const premiumFormula = "(Offer Price ÷ Target Price) − 1";
