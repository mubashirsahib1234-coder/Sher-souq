import { Book } from '../types';

// Each book is linked to a sher from the gallery so the verse can "sell" the book.
export const BOOKS: Book[] = [
  {
    id: 'diwan-e-ghalib',
    title: 'Diwan-e-Ghalib',
    urduTitle: 'دیوانِ غالب',
    poet: 'Mirza Ghalib',
    pricePkr: 1200,
    oldPricePkr: 1500,
    pages: 320,
    cover: { bg: '#7a1f2b', accent: '#f3d9a4' },
    blurb: 'Ghalib ka mukammal diwan — har ghazal ke saath asaan alfaaz ke maani.',
    sherId: 'ghalib-hazaron-khwahishen'
  },
  {
    id: 'shayad',
    title: 'Shayad',
    urduTitle: 'شاید',
    poet: 'Jaun Elia',
    pricePkr: 950,
    oldPricePkr: 1200,
    pages: 240,
    cover: { bg: '#1f2a37', accent: '#e5e7eb' },
    blurb: 'Jaun Elia ka pehla majmua — tanhai, ishq aur baghawat ki awaaz.',
    sherId: 'jaun-elia-be-dili'
  },
  {
    id: 'nuskha-ha-e-wafa',
    title: 'Nuskha-ha-e-Wafa',
    urduTitle: 'نسخہ ہائے وفا',
    poet: 'Faiz Ahmad Faiz',
    pricePkr: 1450,
    oldPricePkr: 1800,
    pages: 560,
    cover: { bg: '#14532d', accent: '#fde68a' },
    blurb: 'Faiz ki tamaam shayari ek jild mein — mohabbat aur inquilab dono.',
    sherId: 'faiz-hum-dekhenge'
  },
  {
    id: 'khushboo',
    title: 'Khushboo',
    urduTitle: 'خوشبو',
    poet: 'Parveen Shakir',
    pricePkr: 850,
    oldPricePkr: 1000,
    pages: 200,
    cover: { bg: '#9d174d', accent: '#fce7f3' },
    blurb: 'Parveen Shakir ki pehli kitaab — nazuk jazbaat ki mehekti shayari.',
    sherId: 'parveen-shakir-khushboo'
  },
  {
    id: 'kulliyat-e-mir',
    title: 'Kulliyat-e-Mir',
    urduTitle: 'کلیاتِ میر',
    poet: 'Mir Taqi Mir',
    pricePkr: 1600,
    oldPricePkr: 2000,
    pages: 640,
    cover: { bg: '#78350f', accent: '#fef3c7' },
    blurb: 'Khuda-e-Sukhan Mir ka kalaam — dard aur dil ki sachi tasveer.',
    sherId: 'mir-taqi-mir-dil-ki-chot'
  },
  {
    id: 'bal-e-jibril',
    title: 'Bal-e-Jibril',
    urduTitle: 'بالِ جبریل',
    poet: 'Allama Iqbal',
    pricePkr: 900,
    oldPricePkr: 1100,
    pages: 230,
    cover: { bg: '#1e3a8a', accent: '#dbeafe' },
    blurb: 'Khudi aur ruhaniyat ka paigham — Iqbal ki mashhoor Urdu kitaab.',
    sherId: 'allama-iqbal-khudi'
  },
  {
    id: 'naraz',
    title: 'Naraz',
    urduTitle: 'ناراض',
    poet: 'Rahat Indori',
    pricePkr: 800,
    oldPricePkr: 950,
    pages: 180,
    cover: { bg: '#b91c1c', accent: '#fee2e2' },
    blurb: 'Mushairon ki jaan Rahat Indori — bebaak aur dil ko chhoo lene wale sher.',
    sherId: 'rahat-indori-aag'
  },
  {
    id: 'janan-janan',
    title: 'Janan Janan',
    urduTitle: 'جاناں جاناں',
    poet: 'Ahmad Faraz',
    pricePkr: 850,
    oldPricePkr: 1050,
    pages: 210,
    cover: { bg: '#4c1d95', accent: '#ede9fe' },
    blurb: 'Faraz ki romani ghazlein — jo aaj bhi har dil ki zuban hain.',
    sherId: 'ahmad-faraz-silsile'
  },
  {
    id: 'raat-pashmine-ki',
    title: 'Raat Pashmine Ki',
    urduTitle: 'رات پشمینے کی',
    poet: 'Gulzar',
    pricePkr: 1100,
    oldPricePkr: 1350,
    pages: 260,
    cover: { bg: '#0f766e', accent: '#ccfbf1' },
    blurb: 'Gulzar ki nazmein aur triveniyan — waqt, yaad aur zindagi ke rang.',
    sherId: 'gulzar-waqt'
  },
  {
    id: 'talkhiyaan',
    title: 'Talkhiyaan',
    urduTitle: 'تلخیاں',
    poet: 'Sahir Ludhianvi',
    pricePkr: 900,
    oldPricePkr: 1100,
    pages: 220,
    cover: { bg: '#374151', accent: '#f3f4f6' },
    blurb: 'Sahir ki talkh sachaiyan — mohabbat, samaj aur dard ki shayari.',
    sherId: 'sahir-ludhianvi-chalo-ek-baar'
  }
];
