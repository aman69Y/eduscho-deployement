// NCERT Official Book Links - These link to the official NCERT textbooks
// Source: https://ncert.nic.in/textbook.php

export interface NCERTChapter {
  number: number;
  title: string;
  url: string;
}

export interface NCERTBook {
  id: string;
  className: string;
  subject: string;
  chapters: NCERTChapter[];
}

const NCERT_BASE_URL = "https://ncert.nic.in/textbook.php?";

export const ncertBooks: NCERTBook[] = [
  // Class 10 Mathematics
  {
    id: "math-10",
    className: "10",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Real Numbers", url: `${NCERT_BASE_URL}jemh1=1-1` },
      { number: 2, title: "Polynomials", url: `${NCERT_BASE_URL}jemh1=2-2` },
      { number: 3, title: "Pair of Linear Equations", url: `${NCERT_BASE_URL}jemh1=3-3` },
      { number: 4, title: "Quadratic Equations", url: `${NCERT_BASE_URL}jemh1=4-4` },
      { number: 5, title: "Arithmetic Progressions", url: `${NCERT_BASE_URL}jemh1=5-5` },
      { number: 6, title: "Triangles", url: `${NCERT_BASE_URL}jemh1=6-6` },
      { number: 7, title: "Coordinate Geometry", url: `${NCERT_BASE_URL}jemh1=7-7` },
      { number: 8, title: "Introduction to Trigonometry", url: `${NCERT_BASE_URL}jemh1=8-8` },
      { number: 9, title: "Applications of Trigonometry", url: `${NCERT_BASE_URL}jemh1=9-9` },
      { number: 10, title: "Circles", url: `${NCERT_BASE_URL}jemh1=10-10` },
      { number: 11, title: "Areas Related to Circles", url: `${NCERT_BASE_URL}jemh1=11-11` },
      { number: 12, title: "Surface Areas and Volumes", url: `${NCERT_BASE_URL}jemh1=12-12` },
      { number: 13, title: "Statistics", url: `${NCERT_BASE_URL}jemh1=13-13` },
      { number: 14, title: "Probability", url: `${NCERT_BASE_URL}jemh1=14-14` },
    ],
  },
  // Class 10 Science
  {
    id: "science-10",
    className: "10",
    subject: "Science",
    chapters: [
      { number: 1, title: "Chemical Reactions and Equations", url: `${NCERT_BASE_URL}jesc1=1-1` },
      { number: 2, title: "Acids, Bases and Salts", url: `${NCERT_BASE_URL}jesc1=2-2` },
      { number: 3, title: "Metals and Non-metals", url: `${NCERT_BASE_URL}jesc1=3-3` },
      { number: 4, title: "Carbon and its Compounds", url: `${NCERT_BASE_URL}jesc1=4-4` },
      { number: 5, title: "Life Processes", url: `${NCERT_BASE_URL}jesc1=5-5` },
      { number: 6, title: "Control and Coordination", url: `${NCERT_BASE_URL}jesc1=6-6` },
      { number: 7, title: "How do Organisms Reproduce", url: `${NCERT_BASE_URL}jesc1=7-7` },
      { number: 8, title: "Heredity", url: `${NCERT_BASE_URL}jesc1=8-8` },
      { number: 9, title: "Light - Reflection and Refraction", url: `${NCERT_BASE_URL}jesc1=9-9` },
      { number: 10, title: "Human Eye and Colourful World", url: `${NCERT_BASE_URL}jesc1=10-10` },
      { number: 11, title: "Electricity", url: `${NCERT_BASE_URL}jesc1=11-11` },
      { number: 12, title: "Magnetic Effects of Electric Current", url: `${NCERT_BASE_URL}jesc1=12-12` },
      { number: 13, title: "Our Environment", url: `${NCERT_BASE_URL}jesc1=13-13` },
    ],
  },
  // Class 9 Mathematics
  {
    id: "math-9",
    className: "9",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Number Systems", url: `${NCERT_BASE_URL}iemh1=1-1` },
      { number: 2, title: "Polynomials", url: `${NCERT_BASE_URL}iemh1=2-2` },
      { number: 3, title: "Coordinate Geometry", url: `${NCERT_BASE_URL}iemh1=3-3` },
      { number: 4, title: "Linear Equations in Two Variables", url: `${NCERT_BASE_URL}iemh1=4-4` },
      { number: 5, title: "Introduction to Euclid's Geometry", url: `${NCERT_BASE_URL}iemh1=5-5` },
      { number: 6, title: "Lines and Angles", url: `${NCERT_BASE_URL}iemh1=6-6` },
      { number: 7, title: "Triangles", url: `${NCERT_BASE_URL}iemh1=7-7` },
      { number: 8, title: "Quadrilaterals", url: `${NCERT_BASE_URL}iemh1=8-8` },
      { number: 9, title: "Circles", url: `${NCERT_BASE_URL}iemh1=9-9` },
      { number: 10, title: "Heron's Formula", url: `${NCERT_BASE_URL}iemh1=10-10` },
      { number: 11, title: "Surface Areas and Volumes", url: `${NCERT_BASE_URL}iemh1=11-11` },
      { number: 12, title: "Statistics", url: `${NCERT_BASE_URL}iemh1=12-12` },
    ],
  },
  // Class 9 Science
  {
    id: "science-9",
    className: "9",
    subject: "Science",
    chapters: [
      { number: 1, title: "Matter in Our Surroundings", url: `${NCERT_BASE_URL}iesc1=1-1` },
      { number: 2, title: "Is Matter Around Us Pure", url: `${NCERT_BASE_URL}iesc1=2-2` },
      { number: 3, title: "Atoms and Molecules", url: `${NCERT_BASE_URL}iesc1=3-3` },
      { number: 4, title: "Structure of the Atom", url: `${NCERT_BASE_URL}iesc1=4-4` },
      { number: 5, title: "The Fundamental Unit of Life", url: `${NCERT_BASE_URL}iesc1=5-5` },
      { number: 6, title: "Tissues", url: `${NCERT_BASE_URL}iesc1=6-6` },
      { number: 7, title: "Motion", url: `${NCERT_BASE_URL}iesc1=7-7` },
      { number: 8, title: "Force and Laws of Motion", url: `${NCERT_BASE_URL}iesc1=8-8` },
      { number: 9, title: "Gravitation", url: `${NCERT_BASE_URL}iesc1=9-9` },
      { number: 10, title: "Work and Energy", url: `${NCERT_BASE_URL}iesc1=10-10` },
      { number: 11, title: "Sound", url: `${NCERT_BASE_URL}iesc1=11-11` },
      { number: 12, title: "Improvement in Food Resources", url: `${NCERT_BASE_URL}iesc1=12-12` },
    ],
  },
  // Class 11 Physics
  {
    id: "physics-11",
    className: "11",
    subject: "Physics",
    chapters: [
      { number: 1, title: "Units and Measurements", url: `${NCERT_BASE_URL}keph1=1-1` },
      { number: 2, title: "Motion in a Straight Line", url: `${NCERT_BASE_URL}keph1=2-2` },
      { number: 3, title: "Motion in a Plane", url: `${NCERT_BASE_URL}keph1=3-3` },
      { number: 4, title: "Laws of Motion", url: `${NCERT_BASE_URL}keph1=4-4` },
      { number: 5, title: "Work, Energy and Power", url: `${NCERT_BASE_URL}keph1=5-5` },
      { number: 6, title: "System of Particles", url: `${NCERT_BASE_URL}keph1=6-6` },
      { number: 7, title: "Gravitation", url: `${NCERT_BASE_URL}keph1=7-7` },
      { number: 8, title: "Mechanical Properties of Solids", url: `${NCERT_BASE_URL}keph1=8-8` },
      { number: 9, title: "Mechanical Properties of Fluids", url: `${NCERT_BASE_URL}keph1=9-9` },
      { number: 10, title: "Thermal Properties of Matter", url: `${NCERT_BASE_URL}keph1=10-10` },
      { number: 11, title: "Thermodynamics", url: `${NCERT_BASE_URL}keph1=11-11` },
      { number: 12, title: "Kinetic Theory", url: `${NCERT_BASE_URL}keph1=12-12` },
      { number: 13, title: "Oscillations", url: `${NCERT_BASE_URL}keph1=13-13` },
      { number: 14, title: "Waves", url: `${NCERT_BASE_URL}keph1=14-14` },
    ],
  },
  // Class 11 Chemistry
  {
    id: "chemistry-11",
    className: "11",
    subject: "Chemistry",
    chapters: [
      { number: 1, title: "Some Basic Concepts of Chemistry", url: `${NCERT_BASE_URL}kech1=1-1` },
      { number: 2, title: "Structure of Atom", url: `${NCERT_BASE_URL}kech1=2-2` },
      { number: 3, title: "Classification of Elements", url: `${NCERT_BASE_URL}kech1=3-3` },
      { number: 4, title: "Chemical Bonding", url: `${NCERT_BASE_URL}kech1=4-4` },
      { number: 5, title: "Thermodynamics", url: `${NCERT_BASE_URL}kech1=5-5` },
      { number: 6, title: "Equilibrium", url: `${NCERT_BASE_URL}kech1=6-6` },
      { number: 7, title: "Redox Reactions", url: `${NCERT_BASE_URL}kech1=7-7` },
      { number: 8, title: "Organic Chemistry", url: `${NCERT_BASE_URL}kech1=8-8` },
      { number: 9, title: "Hydrocarbons", url: `${NCERT_BASE_URL}kech1=9-9` },
    ],
  },
  // Class 12 Physics
  {
    id: "physics-12",
    className: "12",
    subject: "Physics",
    chapters: [
      { number: 1, title: "Electric Charges and Fields", url: `${NCERT_BASE_URL}leph1=1-1` },
      { number: 2, title: "Electrostatic Potential", url: `${NCERT_BASE_URL}leph1=2-2` },
      { number: 3, title: "Current Electricity", url: `${NCERT_BASE_URL}leph1=3-3` },
      { number: 4, title: "Moving Charges and Magnetism", url: `${NCERT_BASE_URL}leph1=4-4` },
      { number: 5, title: "Magnetism and Matter", url: `${NCERT_BASE_URL}leph1=5-5` },
      { number: 6, title: "Electromagnetic Induction", url: `${NCERT_BASE_URL}leph1=6-6` },
      { number: 7, title: "Alternating Current", url: `${NCERT_BASE_URL}leph1=7-7` },
      { number: 8, title: "Electromagnetic Waves", url: `${NCERT_BASE_URL}leph1=8-8` },
      { number: 9, title: "Ray Optics", url: `${NCERT_BASE_URL}leph1=9-9` },
      { number: 10, title: "Wave Optics", url: `${NCERT_BASE_URL}leph1=10-10` },
      { number: 11, title: "Dual Nature of Radiation", url: `${NCERT_BASE_URL}leph1=11-11` },
      { number: 12, title: "Atoms", url: `${NCERT_BASE_URL}leph1=12-12` },
      { number: 13, title: "Nuclei", url: `${NCERT_BASE_URL}leph1=13-13` },
      { number: 14, title: "Semiconductor Electronics", url: `${NCERT_BASE_URL}leph1=14-14` },
    ],
  },
  // Class 12 Chemistry
  {
    id: "chemistry-12",
    className: "12",
    subject: "Chemistry",
    chapters: [
      { number: 1, title: "The Solid State", url: `${NCERT_BASE_URL}lech1=1-1` },
      { number: 2, title: "Solutions", url: `${NCERT_BASE_URL}lech1=2-2` },
      { number: 3, title: "Electrochemistry", url: `${NCERT_BASE_URL}lech1=3-3` },
      { number: 4, title: "Chemical Kinetics", url: `${NCERT_BASE_URL}lech1=4-4` },
      { number: 5, title: "Surface Chemistry", url: `${NCERT_BASE_URL}lech1=5-5` },
      { number: 6, title: "p-Block Elements", url: `${NCERT_BASE_URL}lech1=6-6` },
      { number: 7, title: "d and f Block Elements", url: `${NCERT_BASE_URL}lech1=7-7` },
      { number: 8, title: "Coordination Compounds", url: `${NCERT_BASE_URL}lech1=8-8` },
      { number: 9, title: "Haloalkanes and Haloarenes", url: `${NCERT_BASE_URL}lech1=9-9` },
      { number: 10, title: "Alcohols, Phenols and Ethers", url: `${NCERT_BASE_URL}lech1=10-10` },
    ],
  },
];

// Group books by class
export const getBooksByClass = () => {
  const grouped: Record<string, NCERTBook[]> = {};
  ncertBooks.forEach((book) => {
    if (!grouped[book.className]) {
      grouped[book.className] = [];
    }
    grouped[book.className].push(book);
  });
  return grouped;
};
