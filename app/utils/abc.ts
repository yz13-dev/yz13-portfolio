import { Project } from "@/components/project-logo";


const ENG_ABC = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const RUS_ABC = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"];

const NON_ABC = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#"];


export const getAbc = (projects: Project[]) => {

  const firstLetter = projects.map(project => project.name[0]);

  const ABC = [...NON_ABC, ...ENG_ABC, ...RUS_ABC].filter(letter => firstLetter.includes(letter));

  return ABC;
}

export const sortLetters = (letters: string[]) => {

  const ABC = [...NON_ABC, ...ENG_ABC, ...RUS_ABC];

  return letters.sort((a, b) => {
    const aIndex = ABC.indexOf(a);
    const bIndex = ABC.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

}

export const sortByAbc = (projects: Project[]): Map<string, Project[]> => {

  const letters = new Map();

  // const abc = [...NON_ABC, ...ENG_ABC, ...RUS_ABC];

  for (const project of projects) {
    const letter = project.name[0];
    if (!letters.has(letter)) {
      letters.set(letter, []);
    }
    letters.get(letter)?.push(project);
  }


  return letters;

}
