// require("./style.css");
// get form from element html for reference and preform manipulation
const form : HTMLFormElement = document.querySelector('#defineform')!;
const list: HTMLUListElement = document.querySelector('.list-unstyled')!;
const header: HTMLHeadingElement = document.querySelector('h1')!; 

form.onsubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  //console.log(formData);
  const text = formData.get('defineword') as string;

  try{
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${text}`);
  const data = await response.json();

  header.innerText = text;

  list.innerHTML = '';

  // Add a class to the li elements that we're creating
  data[0].meanings.forEach((element: any) => {
    const li = document.createElement('li');
    li.classList.add('definition');
    li.innerText = `${element.partOfSpeech} - ${element.definitions[0].definition}`;
    list.appendChild(li);
  });
  
  // Create another li element for the word being defined
  const wordLi = document.createElement('li');
  wordLi.classList.add('word');
  wordLi.innerText = text;
  list.insertBefore(wordLi, list.firstChild);

} catch(err){
  console.log(err);
}


  return false; // prevent reload
};



export interface Definition {
  word: string;
  phonetic: string;
  phonetics?: (PhoneticsEntity)[] | null;
  meanings?: (MeaningsEntity)[] | null;
  license: License;
  sourceUrls?: (string)[] | null;
}
export interface PhoneticsEntity {
  text?: string | null;
  audio: string;
  sourceUrl?: string | null;
}
export interface MeaningsEntity {
  partOfSpeech: string;
  definitions?: (DefinitionsEntity)[] | null;
  synonyms?: (string | null)[] | null;
  antonyms?: (null)[] | null;
}
export interface DefinitionsEntity {
  definition: string;
  synonyms?: (string | null)[] | null;
  antonyms?: (null)[] | null;
}
export interface License {
  name: string;
  url: string;
}