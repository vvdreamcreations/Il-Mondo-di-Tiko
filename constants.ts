import { Book, Review, ValueItem } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    asin: 'B0F9NZJ3CZ',
    title: 'Tiko e il Pennello Magico',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0F9NZJ3CZ.01.LZZZZZZZ.jpg',
    shortDescription: 'La magia della creatività e dei colori.',
    fullDescription: 'Tiko trova un pennello speciale che colora il mondo con le emozioni. Una storia per imparare a esprimere ciò che si ha nel cuore attraverso l\'arte e la fantasia.',
    benefits: [
      { title: 'Creatività', description: 'Stimola l\'immaginazione e l\'arte.' },
      { title: 'Espressione emotiva', description: 'Imparare a comunicare i sentimenti.' },
      { title: 'Fiducia', description: 'Credere nelle proprie capacità uniche.' }
    ],
    targetAudience: 'Perfetto per stimolare la creatività nei bambini.',
    themeColor: 'bg-orange-100'
  },
  {
    id: '2',
    asin: 'B0FNCSWHNM',
    title: 'Tiko e il Sassolino della Calma',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0FNCSWHNM.01.LZZZZZZZ.jpg',
    shortDescription: 'Un piccolo segreto per trovare la serenità.',
    fullDescription: 'Quando la rabbia o l\'agitazione arrivano, Tiko impara un trucco magico con un sassolino per ritrovare la pace interiore e sorridere di nuovo.',
    benefits: [
      { title: 'Gestione della rabbia', description: 'Tecniche semplici per calmarsi.' },
      { title: 'Mindfulness', description: 'Vivere il momento presente.' },
      { title: 'Serenità', description: 'Ritrovare l\'equilibrio interiore.' }
    ],
    targetAudience: 'Ideale per gestire i capricci e momenti di stress.',
    themeColor: 'bg-blue-100'
  },
  {
    id: '3',
    asin: 'B0FJ1JZQSV',
    title: 'Tiko e il Coniglietto Bibi',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0FJ1JZQSV.01.LZZZZZZZ.jpg',
    shortDescription: 'Una storia tenera sull\'amicizia e l\'accoglienza.',
    fullDescription: 'Tiko incontra Bibi, un coniglietto timido. Insieme scopriranno che la gentilezza è la chiave per costruire legami speciali e superare la timidezza.',
    benefits: [
      { title: 'Amicizia', description: 'Il valore di accogliere gli altri.' },
      { title: 'Gentilezza', description: 'Piccoli gesti che scaldano il cuore.' },
      { title: 'Inclusione', description: 'Nessuno deve sentirsi solo.' }
    ],
    targetAudience: 'Per insegnare la gentilezza e la socializzazione.',
    themeColor: 'bg-green-100'
  },
  {
    id: '4',
    asin: 'B0FTS8H6ZJ',
    title: 'Tiko e la magia del Natale',
    age: '3-6 anni',
    price: '€ 10,99',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/P/B0FTS8H6ZJ.01.LZZZZZZZ.jpg',
    shortDescription: 'Il vero significato del Natale nel bosco.',
    fullDescription: 'Non sono i regali a rendere speciale il Natale, ma lo stare insieme. Tiko e i suoi amici festeggiano condividendo calore, gioia e affetto sotto l\'albero.',
    benefits: [
      { title: 'Condivisione', description: 'La gioia di stare insieme.' },
      { title: 'Valori familiari', description: 'Il calore delle tradizioni.' },
      { title: 'Altruismo', description: 'Pensare agli altri rende felici.' }
    ],
    targetAudience: 'La lettura perfetta per il periodo natalizio.',
    themeColor: 'bg-red-100'
  }
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
    author: 'Mamma Lettora',
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
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop",
    iconName: 'Rocket'
  },
  {
    id: 2,
    title: "Educano con Dolcezza",
    description: "Ogni storia aiuta i piccoli lettori a riconoscere emozioni e coltivare la gentilezza.",
    fullDescription: "Non ci sono lezioni noiose qui, solo esempi gentili. Attraverso le azioni di Tiko, i bambini imparano che essere gentili non è solo 'buona educazione', ma un superpotere che rende il mondo più bello. Le storie affrontano temi complessi come la condivisione e il perdono con una semplicità disarmante.",
    image: "https://images.unsplash.com/photo-1549488497-6cb569d020e5?q=80&w=1000&auto=format&fit=crop",
    iconName: 'Heart'
  },
  {
    id: 3,
    title: "Crescita Emotiva",
    description: "Storie pensate per aiutare i bambini a esprimere sentimenti e capire sé stessi.",
    fullDescription: "La rabbia, la paura del buio, la timidezza: Tiko prova tutto quello che provano i bambini. Vedere un piccolo scoiattolo affrontare e superare queste emozioni aiuta i piccoli lettori a dare un nome a ciò che sentono e a capire che non c'è nulla di sbagliato nell'essere vulnerabili.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
    iconName: 'Sprout'
  },
  {
    id: 4,
    title: "Illustrazioni Magiche",
    description: "Disegni delicati accompagnano le narrazioni, rendendo la lettura un’esperienza visiva.",
    fullDescription: "Ogni pagina è un'opera d'arte. I colori pastello, le linee morbide e i dettagli nascosti nel bosco catturano l'attenzione anche dei più piccoli che non sanno ancora leggere. È un'educazione al bello che inizia fin dalla prima infanzia.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
    iconName: 'Palette'
  }
];