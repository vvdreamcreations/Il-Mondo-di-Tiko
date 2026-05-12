import { Book, Review, ValueItem } from './types';

export const BOOKS: Book[] = [
  {
    id: '5',
    asin: 'B0GNGSPKSZ',
    title: 'Tiko e il Segreto della Pazienza',
    age: '2-5 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0GNGSPKSZ.01.LZZZZZZZ.jpg',
    shortDescription: 'Una fiaba dolcissima sulla magia di saper aspettare.',
    fullDescription: 'Insegnare ai bambini il valore della pazienza è una delle sfide più grandi. Tiko impara che l\'attesa non è un vuoto noioso, ma un tempo magico in cui prendersi cura di ciò che si ama. Una dolce fiaba tra i ritmi lenti della natura.',
    benefits: [
      { title: 'Pazienza', description: 'Imparare a rispettare i tempi della natura.' },
      { title: 'Gestione della noia', description: 'Trasformare l\'attesa in scoperta.' },
      { title: 'Cura', description: 'Prendersi cura di ciò che amiamo.' }
    ],
    targetAudience: 'Perfetto per insegnare ai bambini a gestire la frustrazione dell\'attesa.',
    themeColor: 'bg-purple-100',
    accentColor: '#A78BFA',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(139,92,246,0.08) 100%)',
    internalImages: [
      '/img/libri/pazienza/p3.jpg',
      '/img/libri/pazienza/p7.jpg',
      '/img/libri/pazienza/p12.jpg',
      '/img/libri/pazienza/p17.jpg',
    ],
  },
  {
    id: '1',
    asin: 'B0F9NZJ3CZ',
    title: 'Tiko e il Pennello Magico',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0F9NZJ3CZ.01.LZZZZZZZ.jpg',
    shortDescription: 'Un\'avventura a colori per scoprire il valore dell\'amicizia.',
    fullDescription: 'Scopri la magia dell\'amicizia con Tiko. Una storia illustrata che insegna il coraggio, l\'unicità e il potere della gentilezza. Perché insieme si va più lontano, e ogni momento condiviso può diventare un capolavoro di emozioni.',
    benefits: [
      { title: 'Amicizia', description: 'Il valore dei legami speciali.' },
      { title: 'Fiducia', description: 'Credere in se stessi e negli altri.' },
      { title: 'Resilienza', description: 'La magia di non arrendersi mai.' }
    ],
    targetAudience: 'Perfetto per insegnare il valore dell\'amicizia e della non rinuncia.',
    themeColor: 'bg-orange-100',
    accentColor: '#FB923C',
    gradient: 'linear-gradient(135deg, rgba(251,146,60,0.18) 0%, rgba(245,158,11,0.08) 100%)',
    internalImages: [
      '/img/libri/pennello/pag2.jpg',
      '/img/libri/pennello/pag5.jpg',
      '/img/libri/pennello/pag11.jpg',
      '/img/libri/pennello/pag14.jpg',
    ],
  },
  {
    id: '2',
    asin: 'B0FNCSWHNM',
    title: 'Tiko e il Sassolino della Calma',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0FNCSWHNM.01.LZZZZZZZ.jpg',
    shortDescription: 'Un piccolo segreto per gestire la rabbia e ritrovare la serenità.',
    fullDescription: 'Anche i piccoli scoiattoli si arrabbiano! Tiko impara un trucco magico per trasformare la rabbia in calma. Una guida gentile che insegna ai bambini ad ascoltare le proprie emozioni e a ritrovare la pace interiore con un respiro profondo.',
    benefits: [
      { title: 'Gestione della rabbia', description: 'Tecniche semplici per calmarsi.' },
      { title: 'Mindfulness', description: 'Vivere il momento presente.' },
      { title: 'Serenità', description: 'Ritrovare l\'equilibrio interiore.' }
    ],
    targetAudience: 'Ideale per gestire i capricci e momenti di stress.',
    themeColor: 'bg-blue-100',
    accentColor: '#38BDF8',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(59,130,246,0.08) 100%)',
    internalImages: [
      '/img/libri/sassolino/05.jpg',
      '/img/libri/sassolino/07.jpg',
      '/img/libri/sassolino/10.jpg',
      '/img/libri/sassolino/16.jpg',
    ],
  },
  {
    id: '3',
    asin: 'B0FJ1JZQSV',
    title: 'Tiko e il Coniglietto Bibi',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0FJ1JZQSV.01.LZZZZZZZ.jpg',
    shortDescription: 'Una tenera favola sulla bellezza dell\'accoglienza e dell\'adozione.',
    fullDescription: 'Il cuore non ha confinis quando si tratta di voler bene. Tiko accoglie Bibi e scopre che famiglia non è solo chi ti assomiglia, ma chi ti sceglie con amore. Un racconto delicato per spiegare ai più piccoli la meraviglia dell\'adozione.',
    benefits: [
      { title: 'Accoglienza', description: 'Aprire il cuore agli altri.' },
      { title: 'Adozione', description: 'L\'amore che crea una famiglia.' },
      { title: 'Inclusione', description: 'Nessuno deve sentirsi solo.' }
    ],
    targetAudience: 'Per insegnare la gentilezza e la socializzazione.',
    themeColor: 'bg-green-100',
    accentColor: '#34D399',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.08) 100%)',
    internalImages: [
      '/img/libri/bibi/pag6.jpg',
      '/img/libri/bibi/pag8.jpg',
      '/img/libri/bibi/pag10.jpg',
      '/img/libri/bibi/pag15.jpg',
    ],
  },
  {
    id: '4',
    asin: 'B0FTS8H6ZJ',
    title: 'Tiko e la Magia del Natale',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0FTS8H6ZJ.01.LZZZZZZZ.jpg',
    shortDescription: 'Scopri che il dono più prezioso non si trova sotto l\'albero.',
    fullDescription: 'Le luci brillano, ma Tiko impara che la vera magia del Natale non sono i giocattoli. Una storia incantevole che ricorda a grandi e piccini che il regalo più grande è il tempo trascorso insieme a chi si ama.',
    benefits: [
      { title: 'Condivisione', description: 'La gioia di stare insieme.' },
      { title: 'Valori familiari', description: 'Il calore delle tradizioni.' },
      { title: 'Altruismo', description: 'Pensare agli altri rende felici.' }
    ],
    targetAudience: 'La lettura perfetta per il periodo natalizio.',
    themeColor: 'bg-red-100',
    accentColor: '#F87171',
    gradient: 'linear-gradient(135deg, rgba(248,113,113,0.18) 0%, rgba(244,63,94,0.08) 100%)',
    internalImages: [
      '/img/libri/natale/1.jpg',
      '/img/libri/natale/04.jpg',
      '/img/libri/natale/11.jpg',
      '/img/libri/natale/17.jpg',
    ],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Federica',
    rating: 5,
    text: "Questo libro è bellissimo! Le immagini sono stupende e la storia è veramente emozionante. Il bambino a cui l'ho regalato se n'è subito innamorato."
  },
  {
    id: 2,
    author: 'Inchiostro Vivo',
    rating: 5,
    text: "Una piccola gemma tra i libri per bambini: colorato, dolce e ricco di significato. Mia figlia si illumina ogni volta che vede Tiko."
  },
  {
    id: 3,
    author: 'Chiara',
    rating: 5,
    text: "Finalmente una storia che educa senza essere noiosa. I disegni sono pura magia, sembra di entrare nel bosco con Tiko."
  },
  {
    id: 4,
    author: 'Papà Davide',
    rating: 5,
    text: "Lettura serale obbligatoria ormai! I temi trattati sono delicati e aiutano davvero a spiegare le emozioni ai più piccoli."
  }
];

export const VALUES: ValueItem[] = [
  {
    id: 1,
    title: "Stimola la Fantasia",
    description: "Le avventure di Tiko incoraggiano i bambini a immaginare mondi nuovi.",
    fullDescription: "In un mondo dominato dagli schermi, i libri di Tiko aprono le porte a universi infiniti. Ogni storia è un trampolino di lancio che invita il bambino a chiudere gli occhi e sognare, inventando finali alternativi e nuovi amici immaginari. La fantasia è il muscolo più importante per il problem-solving futuro!",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
    iconName: 'Rocket'
  },
  {
    id: 2,
    title: "Educano con Dolcezza",
    description: "Ogni storia aiuta i piccoli lettori a riconoscere emozioni e coltivare la gentilezza.",
    fullDescription: "Non ci sono lezioni noiose qui, solo esempi gentili. Attraverso le azioni di Tiko, i bambini imparano che essere gentili non è solo 'buona educazione', ma un superpotere che rende il mondo più bello. Le storie affrontano temi complessi come la condivisione e il perdono con una semplicità disarmante.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
    iconName: 'Heart'
  },
  {
    id: 3,
    title: "Crescita Emotiva",
    description: "Storie pensate per aiutare i bambini a esprimere sentimenti e capire sé stessi.",
    fullDescription: "La rabbia, la paura del buio, la timidezza: Tiko prova tutto quello che provano i bambini. Vedere un piccolo scoiattolo affrontare e superare queste emozioni aiuta i piccoli lettori a dare un nome a ciò che sentono e a capire che non c'è nulla di sbagliato nell'essere vulnerabili.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop",
    iconName: 'Sprout'
  },
  {
    id: 4,
    title: "Illustrazioni Magiche",
    description: "Disegni delicati accompagnano le narrazioni, rendendo la lettura un’esperienza visiva.",
    fullDescription: "Ogni pagina è un'opera d'arte. I colori pastello, le linee morbide e i dettagli nascosti nel bosco catturano l'attenzione anche dei più piccoli che non sanno ancora leggere. È un'educazione al bello che inizia fin dalla prima infanzia.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    iconName: 'Palette'
  }
];