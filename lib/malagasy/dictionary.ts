// Dictionnaire Malagasy complet avec traductions, définitions et métadonnées
// Source: tenymalagasy.org, Wikipedia MG, et autres corpus

export interface WordEntry {
  word: string
  definition: string
  translation: {
    fr?: string
    en?: string
  }
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'interjection' | 'article'
  root?: string
  synonyms?: string[]
  antonyms?: string[]
  examples?: string[]
  frequency?: number // 1-10, plus élevé = plus fréquent
}

// Dictionnaire de base avec les mots les plus courants
export const malagasyDictionary: WordEntry[] = [
  // Verbes courants
  { word: 'mandeha', definition: 'Mihetsika, mandroso', translation: { fr: 'aller, marcher', en: 'to go, to walk' }, partOfSpeech: 'verb', root: 'deha', synonyms: ['mandroso', 'mamindra'], frequency: 10 },
  { word: 'miasa', definition: 'Manao asa', translation: { fr: 'travailler', en: 'to work' }, partOfSpeech: 'verb', root: 'asa', frequency: 10 },
  { word: 'miteny', definition: 'Milaza, miresaka', translation: { fr: 'parler, dire', en: 'to speak, to say' }, partOfSpeech: 'verb', root: 'teny', synonyms: ['milaza', 'miresaka'], frequency: 10 },
  { word: 'mahita', definition: 'Mijery ka mahalala', translation: { fr: 'voir', en: 'to see' }, partOfSpeech: 'verb', root: 'hita', frequency: 10 },
  { word: 'mandre', definition: 'Mahare feo', translation: { fr: 'entendre', en: 'to hear' }, partOfSpeech: 'verb', root: 're', frequency: 9 },
  { word: 'mahalala', definition: 'Mahafantatra', translation: { fr: 'savoir, connaître', en: 'to know' }, partOfSpeech: 'verb', root: 'halatra', synonyms: ['mahafantatra'], frequency: 9 },
  { word: 'manao', definition: 'Manatanteraka zavatra', translation: { fr: 'faire', en: 'to do, to make' }, partOfSpeech: 'verb', root: 'ao', frequency: 10 },
  { word: 'mianatra', definition: 'Maka fahalalana', translation: { fr: 'apprendre, étudier', en: 'to learn, to study' }, partOfSpeech: 'verb', root: 'anatra', frequency: 9 },
  { word: 'mihinana', definition: 'Mandray sakafo', translation: { fr: 'manger', en: 'to eat' }, partOfSpeech: 'verb', root: 'hinana', frequency: 9 },
  { word: 'misotro', definition: 'Mandray rano na zavatra hafa sotroina', translation: { fr: 'boire', en: 'to drink' }, partOfSpeech: 'verb', root: 'sotro', frequency: 9 },
  { word: 'matory', definition: 'Miala sasatra amin\'ny alina', translation: { fr: 'dormir', en: 'to sleep' }, partOfSpeech: 'verb', root: 'tory', frequency: 9 },
  { word: 'mifoha', definition: 'Tsy matory intsony', translation: { fr: 'se réveiller', en: 'to wake up' }, partOfSpeech: 'verb', root: 'foha', frequency: 8 },
  { word: 'mankany', definition: 'Mandeha amin\'ny toerana iray', translation: { fr: 'aller vers', en: 'to go to' }, partOfSpeech: 'verb', root: 'any', frequency: 8 },
  { word: 'miverina', definition: 'Mody, miverina', translation: { fr: 'revenir, retourner', en: 'to return' }, partOfSpeech: 'verb', root: 'verina', frequency: 8 },
  { word: 'mamaky', definition: 'Mijery soratra', translation: { fr: 'lire', en: 'to read' }, partOfSpeech: 'verb', root: 'vaky', frequency: 8 },
  { word: 'manoratra', definition: 'Manao soratra', translation: { fr: 'écrire', en: 'to write' }, partOfSpeech: 'verb', root: 'soratra', frequency: 8 },
  { word: 'mampianatra', definition: 'Manome fahalalana', translation: { fr: 'enseigner', en: 'to teach' }, partOfSpeech: 'verb', root: 'anatra', frequency: 7 },
  { word: 'manampy', definition: 'Manohana', translation: { fr: 'aider', en: 'to help' }, partOfSpeech: 'verb', root: 'ampy', synonyms: ['manohana'], frequency: 8 },
  { word: 'mitia', definition: 'Manana fitiavana', translation: { fr: 'aimer', en: 'to love' }, partOfSpeech: 'verb', root: 'tia', frequency: 9 },
  { word: 'mankahala', definition: 'Tsy tia', translation: { fr: 'détester', en: 'to hate' }, partOfSpeech: 'verb', root: 'hala', antonyms: ['mitia'], frequency: 6 },
  { word: 'mihomehy', definition: 'Maneho fifaliana', translation: { fr: 'rire', en: 'to laugh' }, partOfSpeech: 'verb', root: 'homehy', frequency: 7 },
  { word: 'mitomany', definition: 'Mandrotsaka ranomaso', translation: { fr: 'pleurer', en: 'to cry' }, partOfSpeech: 'verb', root: 'tomany', antonyms: ['mihomehy'], frequency: 7 },
  { word: 'mipetraka', definition: 'Mijanona eo amin\'ny toerana iray', translation: { fr: 'habiter, s\'asseoir', en: 'to live, to sit' }, partOfSpeech: 'verb', root: 'petraka', frequency: 8 },
  { word: 'mitsangana', definition: 'Tsy mipetraka intsony', translation: { fr: 'se lever', en: 'to stand up' }, partOfSpeech: 'verb', root: 'tsangana', frequency: 7 },
  { word: 'mihazakazaka', definition: 'Mandeha haingana', translation: { fr: 'courir', en: 'to run' }, partOfSpeech: 'verb', root: 'hazakazaka', frequency: 7 },
  { word: 'manomboka', definition: 'Manao voalohany', translation: { fr: 'commencer', en: 'to begin, to start' }, partOfSpeech: 'verb', root: 'tomboka', frequency: 8 },
  { word: 'mamarana', definition: 'Manao farany', translation: { fr: 'terminer, finir', en: 'to finish, to end' }, partOfSpeech: 'verb', root: 'farana', antonyms: ['manomboka'], frequency: 8 },
  { word: 'mividy', definition: 'Mandray zavatra amin\'ny vola', translation: { fr: 'acheter', en: 'to buy' }, partOfSpeech: 'verb', root: 'vidy', frequency: 8 },
  { word: 'mivarotra', definition: 'Manome zavatra ho an\'ny vola', translation: { fr: 'vendre', en: 'to sell' }, partOfSpeech: 'verb', root: 'varotra', antonyms: ['mividy'], frequency: 7 },
  { word: 'mangataka', definition: 'Milaza fa mila zavatra', translation: { fr: 'demander', en: 'to ask, to request' }, partOfSpeech: 'verb', root: 'hataka', frequency: 7 },
  { word: 'mamaly', definition: 'Manome valiny', translation: { fr: 'répondre', en: 'to answer' }, partOfSpeech: 'verb', root: 'valy', frequency: 7 },
  { word: 'manosika', definition: 'Mandefa amin\'ny heriny', translation: { fr: 'pousser', en: 'to push' }, partOfSpeech: 'verb', root: 'tosika', frequency: 6 },
  { word: 'misintona', definition: 'Mitarika ho akaiky', translation: { fr: 'tirer', en: 'to pull' }, partOfSpeech: 'verb', root: 'sintona', antonyms: ['manosika'], frequency: 6 },
  { word: 'manidina', definition: 'Mitsambikina eny amin\'ny habakabaka', translation: { fr: 'voler', en: 'to fly' }, partOfSpeech: 'verb', root: 'sidina', frequency: 6 },
  { word: 'milomano', definition: 'Mihetsika ao anaty rano', translation: { fr: 'nager', en: 'to swim' }, partOfSpeech: 'verb', root: 'lomano', frequency: 6 },
  
  // Noms courants
  { word: 'olona', definition: 'Biby manana saina', translation: { fr: 'personne, homme', en: 'person, human' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'trano', definition: 'Toerana onenana', translation: { fr: 'maison', en: 'house' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'rano', definition: 'Zavatra fisotroana', translation: { fr: 'eau', en: 'water' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'tany', definition: 'Planeta', translation: { fr: 'terre, pays', en: 'earth, land, country' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'lanitra', definition: 'Eo ambonin\'ny tany', translation: { fr: 'ciel', en: 'sky' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'masoandro', definition: 'Kintana lehibe', translation: { fr: 'soleil', en: 'sun' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'volana', definition: 'Zanaky ny tany', translation: { fr: 'lune, mois', en: 'moon, month' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'kintana', definition: 'Fahazavana eny amin\'ny lanitra', translation: { fr: 'étoile', en: 'star' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'hazo', definition: 'Zavamaniry lehibe', translation: { fr: 'arbre', en: 'tree' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'voninkazo', definition: 'Ravina tsara', translation: { fr: 'fleur', en: 'flower' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'biby', definition: 'Zava-manan\'aina tsy olona', translation: { fr: 'animal', en: 'animal' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'omby', definition: 'Biby fiompiana lehibe', translation: { fr: 'zébu, boeuf', en: 'zebu, cattle' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'vorona', definition: 'Biby manidina', translation: { fr: 'oiseau', en: 'bird' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'trondro', definition: 'Biby ao anaty rano', translation: { fr: 'poisson', en: 'fish' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'alika', definition: 'Biby fiompiana', translation: { fr: 'chien', en: 'dog' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'saka', definition: 'Biby fiompiana', translation: { fr: 'chat', en: 'cat' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'vary', definition: 'Vokatra fihinanana', translation: { fr: 'riz', en: 'rice' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'mofo', definition: 'Sakafo vita amin\'ny lafarinina', translation: { fr: 'pain', en: 'bread' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'hena', definition: 'Nofon\'ny biby', translation: { fr: 'viande', en: 'meat' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'ronono', definition: 'Zavatra avy amin\'ny omby', translation: { fr: 'lait', en: 'milk' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'voankazo', definition: 'Vokatry ny hazo', translation: { fr: 'fruit', en: 'fruit' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'legioma', definition: 'Zavamaniry fihinanana', translation: { fr: 'légume', en: 'vegetable' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'andro', definition: 'Fotoana misy masoandro', translation: { fr: 'jour', en: 'day' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'alina', definition: 'Fotoana maizina', translation: { fr: 'nuit', en: 'night' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'maraina', definition: 'Fiantombohan\'ny andro', translation: { fr: 'matin', en: 'morning' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'hariva', definition: 'Fiafaran\'ny andro', translation: { fr: 'soir', en: 'evening' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'taona', definition: 'Fotoana 12 volana', translation: { fr: 'année, âge', en: 'year, age' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'herinandro', definition: 'Fotoana 7 andro', translation: { fr: 'semaine', en: 'week' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'ora', definition: 'Fotoana 60 minitra', translation: { fr: 'heure', en: 'hour' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'minitra', definition: 'Fotoana 60 segondra', translation: { fr: 'minute', en: 'minute' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'ray', definition: 'Lehilahy niteraka', translation: { fr: 'père', en: 'father' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'reny', definition: 'Vehivavy niteraka', translation: { fr: 'mère', en: 'mother' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'zaza', definition: 'Olona mbola kely', translation: { fr: 'enfant', en: 'child' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'zanaka', definition: 'Teraka', translation: { fr: 'enfant (de quelqu\'un)', en: 'son/daughter' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'rahalahy', definition: 'Zanaka lahy mitovy ray aman-dreny', translation: { fr: 'frère', en: 'brother' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'anabavy', definition: 'Zanaka vavy mitovy ray aman-dreny', translation: { fr: 'soeur', en: 'sister' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'vady', definition: 'Olona manambady', translation: { fr: 'époux/épouse', en: 'spouse' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'namana', definition: 'Olona tiana', translation: { fr: 'ami', en: 'friend' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'tanana', definition: 'Sampana amin\'ny vatana', translation: { fr: 'main', en: 'hand' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'tongotra', definition: 'Fitaovana famandehanana', translation: { fr: 'pied', en: 'foot' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'loha', definition: 'Ambony indrindra amin\'ny vatana', translation: { fr: 'tête', en: 'head' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'maso', definition: 'Fitaovana fijerena', translation: { fr: 'oeil', en: 'eye' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'sofina', definition: 'Fitaovana fandrenesana', translation: { fr: 'oreille', en: 'ear' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'orona', definition: 'Fitaovana fanoronana', translation: { fr: 'nez', en: 'nose' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'vava', definition: 'Fitaovana fihinanana sy fitenenana', translation: { fr: 'bouche', en: 'mouth' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'fo', definition: 'Ao anaty tratra', translation: { fr: 'coeur', en: 'heart' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'fiainana', definition: 'Ny maha-velona', translation: { fr: 'vie', en: 'life' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'fahafatesana', definition: 'Ny tsy ho velona intsony', translation: { fr: 'mort', en: 'death' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'fitiavana', definition: 'Fihetseham-po lalina', translation: { fr: 'amour', en: 'love' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'fahasalamana', definition: 'Tsy marary', translation: { fr: 'santé', en: 'health' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'aretina', definition: 'Fahasimban\'ny vatana', translation: { fr: 'maladie', en: 'disease, illness' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'fianarana', definition: 'Fakana fahalalana', translation: { fr: 'étude, éducation', en: 'study, education' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'sekoly', definition: 'Toerana fianarana', translation: { fr: 'école', en: 'school' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'mpianatra', definition: 'Olona mianatra', translation: { fr: 'étudiant, élève', en: 'student' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'mpampianatra', definition: 'Olona mampianatra', translation: { fr: 'enseignant, professeur', en: 'teacher' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'boky', definition: 'Fitaovana ianarana', translation: { fr: 'livre', en: 'book' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'penina', definition: 'Fitaovana fanoratana', translation: { fr: 'stylo', en: 'pen' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'kahie', definition: 'Taratasy fanoratana', translation: { fr: 'cahier', en: 'notebook' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'vola', definition: 'Fitaovana fividianana', translation: { fr: 'argent', en: 'money' }, partOfSpeech: 'noun', frequency: 9 },
  { word: 'asa', definition: 'Zavatra atao', translation: { fr: 'travail', en: 'work, job' }, partOfSpeech: 'noun', frequency: 10 },
  { word: 'lalana', definition: 'Toerana aleha', translation: { fr: 'route, chemin', en: 'road, way' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'fiara', definition: 'Fitaovana fitaterana', translation: { fr: 'voiture', en: 'car' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'fiaramanidina', definition: 'Fitaovana manidina', translation: { fr: 'avion', en: 'airplane' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'sambo', definition: 'Fitaovana mitsitsy', translation: { fr: 'bateau', en: 'boat, ship' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'bisikilety', definition: 'Fitaovana roa kodiarana', translation: { fr: 'vélo', en: 'bicycle' }, partOfSpeech: 'noun', frequency: 6 },
  { word: 'tanana', definition: 'Toerana misy olona maro', translation: { fr: 'ville, village', en: 'town, village' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'firenena', definition: 'Tany manana fitondrana', translation: { fr: 'nation, pays', en: 'nation, country' }, partOfSpeech: 'noun', frequency: 8 },
  { word: 'teny', definition: 'Zavatra lazaina', translation: { fr: 'mot, parole, langue', en: 'word, language' }, partOfSpeech: 'noun', frequency: 10 },
  
  // Adjectifs courants
  { word: 'tsara', definition: 'Mahafinaritra', translation: { fr: 'bon, bien, beau', en: 'good, nice, beautiful' }, partOfSpeech: 'adjective', antonyms: ['ratsy'], frequency: 10 },
  { word: 'ratsy', definition: 'Tsy mahafinaritra', translation: { fr: 'mauvais, laid', en: 'bad, ugly' }, partOfSpeech: 'adjective', antonyms: ['tsara'], frequency: 9 },
  { word: 'lehibe', definition: 'Tsy kely', translation: { fr: 'grand, gros', en: 'big, large' }, partOfSpeech: 'adjective', antonyms: ['kely'], frequency: 10 },
  { word: 'kely', definition: 'Tsy lehibe', translation: { fr: 'petit', en: 'small, little' }, partOfSpeech: 'adjective', antonyms: ['lehibe'], frequency: 10 },
  { word: 'lava', definition: 'Tsy fohy', translation: { fr: 'long', en: 'long, tall' }, partOfSpeech: 'adjective', antonyms: ['fohy'], frequency: 8 },
  { word: 'fohy', definition: 'Tsy lava', translation: { fr: 'court', en: 'short' }, partOfSpeech: 'adjective', antonyms: ['lava'], frequency: 7 },
  { word: 'vaovao', definition: 'Vao avy natao', translation: { fr: 'nouveau, neuf', en: 'new' }, partOfSpeech: 'adjective', antonyms: ['tranainy'], frequency: 8 },
  { word: 'tranainy', definition: 'Efa ela', translation: { fr: 'vieux, ancien', en: 'old' }, partOfSpeech: 'adjective', antonyms: ['vaovao'], frequency: 7 },
  { word: 'mafana', definition: 'Misy hafanana', translation: { fr: 'chaud', en: 'hot, warm' }, partOfSpeech: 'adjective', antonyms: ['mangatsiaka'], frequency: 8 },
  { word: 'mangatsiaka', definition: 'Tsy mafana', translation: { fr: 'froid', en: 'cold' }, partOfSpeech: 'adjective', antonyms: ['mafana'], frequency: 7 },
  { word: 'mafy', definition: 'Tsy malefaka', translation: { fr: 'dur, difficile', en: 'hard, difficult' }, partOfSpeech: 'adjective', antonyms: ['malefaka', 'mora'], frequency: 8 },
  { word: 'malefaka', definition: 'Tsy mafy', translation: { fr: 'mou, doux', en: 'soft' }, partOfSpeech: 'adjective', antonyms: ['mafy'], frequency: 6 },
  { word: 'mora', definition: 'Tsy sarotra', translation: { fr: 'facile, bon marché', en: 'easy, cheap' }, partOfSpeech: 'adjective', antonyms: ['sarotra', 'lafo'], frequency: 8 },
  { word: 'sarotra', definition: 'Tsy mora', translation: { fr: 'difficile', en: 'difficult' }, partOfSpeech: 'adjective', antonyms: ['mora'], frequency: 7 },
  { word: 'lafo', definition: 'Tsy mora vidiana', translation: { fr: 'cher', en: 'expensive' }, partOfSpeech: 'adjective', antonyms: ['mora'], frequency: 7 },
  { word: 'mavesatra', definition: 'Tsy maivana', translation: { fr: 'lourd', en: 'heavy' }, partOfSpeech: 'adjective', antonyms: ['maivana'], frequency: 7 },
  { word: 'maivana', definition: 'Tsy mavesatra', translation: { fr: 'léger', en: 'light' }, partOfSpeech: 'adjective', antonyms: ['mavesatra'], frequency: 6 },
  { word: 'haingana', definition: 'Tsy miadana', translation: { fr: 'rapide', en: 'fast, quick' }, partOfSpeech: 'adjective', antonyms: ['miadana'], frequency: 7 },
  { word: 'miadana', definition: 'Tsy haingana', translation: { fr: 'lent', en: 'slow' }, partOfSpeech: 'adjective', antonyms: ['haingana'], frequency: 6 },
  { word: 'fotsy', definition: 'Loko mangatsiaka', translation: { fr: 'blanc', en: 'white' }, partOfSpeech: 'adjective', antonyms: ['mainty'], frequency: 8 },
  { word: 'mainty', definition: 'Loko maizina', translation: { fr: 'noir', en: 'black' }, partOfSpeech: 'adjective', antonyms: ['fotsy'], frequency: 8 },
  { word: 'mena', definition: 'Loko toy ny ra', translation: { fr: 'rouge', en: 'red' }, partOfSpeech: 'adjective', frequency: 7 },
  { word: 'maitso', definition: 'Loko toy ny ravin-kazo', translation: { fr: 'vert', en: 'green' }, partOfSpeech: 'adjective', frequency: 7 },
  { word: 'manga', definition: 'Loko toy ny lanitra', translation: { fr: 'bleu', en: 'blue' }, partOfSpeech: 'adjective', frequency: 7 },
  { word: 'mavo', definition: 'Loko toy ny masoandro', translation: { fr: 'jaune', en: 'yellow' }, partOfSpeech: 'adjective', frequency: 6 },
  { word: 'sambatra', definition: 'Feno fifaliana', translation: { fr: 'heureux', en: 'happy' }, partOfSpeech: 'adjective', antonyms: ['malahelo'], frequency: 8 },
  { word: 'malahelo', definition: 'Tsy sambatra', translation: { fr: 'triste', en: 'sad' }, partOfSpeech: 'adjective', antonyms: ['sambatra'], frequency: 7 },
  { word: 'faly', definition: 'Manana fifaliana', translation: { fr: 'content, joyeux', en: 'glad, happy' }, partOfSpeech: 'adjective', frequency: 9 },
  { word: 'tezitra', definition: 'Maneho hatezerana', translation: { fr: 'fâché, en colère', en: 'angry' }, partOfSpeech: 'adjective', frequency: 7 },
  { word: 'reraka', definition: 'Vizana', translation: { fr: 'fatigué', en: 'tired' }, partOfSpeech: 'adjective', frequency: 7 },
  { word: 'marary', definition: 'Tsy salama', translation: { fr: 'malade', en: 'sick, ill' }, partOfSpeech: 'adjective', antonyms: ['salama'], frequency: 8 },
  { word: 'salama', definition: 'Tsy marary', translation: { fr: 'en bonne santé', en: 'healthy' }, partOfSpeech: 'adjective', antonyms: ['marary'], frequency: 8 },
  { word: 'hendry', definition: 'Manana fahendrena', translation: { fr: 'sage, intelligent', en: 'wise, smart' }, partOfSpeech: 'adjective', frequency: 7 },
  { word: 'adala', definition: 'Tsy hendry', translation: { fr: 'fou, bête', en: 'crazy, stupid' }, partOfSpeech: 'adjective', antonyms: ['hendry'], frequency: 6 },
  { word: 'mahery', definition: 'Manana hery', translation: { fr: 'fort, puissant', en: 'strong, powerful' }, partOfSpeech: 'adjective', antonyms: ['malemy'], frequency: 7 },
  { word: 'malemy', definition: 'Tsy mahery', translation: { fr: 'faible, doux', en: 'weak, gentle' }, partOfSpeech: 'adjective', antonyms: ['mahery'], frequency: 6 },
  
  // Adverbes courants
  { word: 'eto', definition: 'Amin\'ity toerana ity', translation: { fr: 'ici', en: 'here' }, partOfSpeech: 'adverb', antonyms: ['any'], frequency: 10 },
  { word: 'any', definition: 'Amin\'io toerana io', translation: { fr: 'là-bas', en: 'there' }, partOfSpeech: 'adverb', antonyms: ['eto'], frequency: 9 },
  { word: 'ankehitriny', definition: 'Amin\'izao fotoana izao', translation: { fr: 'maintenant', en: 'now' }, partOfSpeech: 'adverb', frequency: 9 },
  { word: 'omaly', definition: 'Ny andro lasa', translation: { fr: 'hier', en: 'yesterday' }, partOfSpeech: 'adverb', frequency: 9 },
  { word: 'rahampitso', definition: 'Ny andro ho avy', translation: { fr: 'demain', en: 'tomorrow' }, partOfSpeech: 'adverb', frequency: 9 },
  { word: 'foana', definition: 'Mandrakariva', translation: { fr: 'toujours', en: 'always' }, partOfSpeech: 'adverb', antonyms: ['tsy', 'na oviana na oviana'], frequency: 8 },
  { word: 'matetika', definition: 'Imbetsaka', translation: { fr: 'souvent', en: 'often' }, partOfSpeech: 'adverb', antonyms: ['indraindray'], frequency: 8 },
  { word: 'indraindray', definition: 'Tsy matetika', translation: { fr: 'parfois', en: 'sometimes' }, partOfSpeech: 'adverb', antonyms: ['matetika'], frequency: 7 },
  { word: 'vetivety', definition: 'Tsy ela', translation: { fr: 'bientôt', en: 'soon' }, partOfSpeech: 'adverb', frequency: 7 },
  { word: 'taloha', definition: 'Tamin\'ny lasa', translation: { fr: 'avant, autrefois', en: 'before, formerly' }, partOfSpeech: 'adverb', antonyms: ['aoriana'], frequency: 7 },
  { word: 'aoriana', definition: 'Amin\'ny ho avy', translation: { fr: 'après, plus tard', en: 'after, later' }, partOfSpeech: 'adverb', antonyms: ['taloha'], frequency: 7 },
  { word: 'tokoa', definition: 'Marina', translation: { fr: 'vraiment', en: 'really, truly' }, partOfSpeech: 'adverb', frequency: 8 },
  { word: 'tena', definition: 'Marina tokoa', translation: { fr: 'vraiment, très', en: 'really, very' }, partOfSpeech: 'adverb', frequency: 9 },
  { word: 'koa', definition: 'Toy izany koa', translation: { fr: 'aussi', en: 'also, too' }, partOfSpeech: 'adverb', frequency: 9 },
  { word: 'ihany', definition: 'Irery', translation: { fr: 'seulement', en: 'only' }, partOfSpeech: 'adverb', frequency: 8 },
  
  // Pronoms
  { word: 'izaho', definition: 'Ny tena', translation: { fr: 'je, moi', en: 'I, me' }, partOfSpeech: 'pronoun', frequency: 10 },
  { word: 'ianao', definition: 'Ny olona resahina', translation: { fr: 'tu, toi', en: 'you (singular)' }, partOfSpeech: 'pronoun', frequency: 10 },
  { word: 'izy', definition: 'Ny olona hafa', translation: { fr: 'il, elle', en: 'he, she' }, partOfSpeech: 'pronoun', frequency: 10 },
  { word: 'isika', definition: 'Izaho sy ianao', translation: { fr: 'nous (inclusif)', en: 'we (inclusive)' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'izahay', definition: 'Izaho sy ny hafa fa tsy ianao', translation: { fr: 'nous (exclusif)', en: 'we (exclusive)' }, partOfSpeech: 'pronoun', frequency: 8 },
  { word: 'ianareo', definition: 'Ianao sy ny hafa', translation: { fr: 'vous', en: 'you (plural)' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'izy ireo', definition: 'Ny olona hafa maro', translation: { fr: 'ils, elles', en: 'they' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'iza', definition: 'Fanontaniana olona', translation: { fr: 'qui', en: 'who' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'inona', definition: 'Fanontaniana zavatra', translation: { fr: 'quoi, que', en: 'what' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'aiza', definition: 'Fanontaniana toerana', translation: { fr: 'où', en: 'where' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'oviana', definition: 'Fanontaniana fotoana', translation: { fr: 'quand', en: 'when' }, partOfSpeech: 'pronoun', frequency: 8 },
  { word: 'nahoana', definition: 'Fanontaniana antony', translation: { fr: 'pourquoi', en: 'why' }, partOfSpeech: 'pronoun', frequency: 8 },
  { word: 'ahoana', definition: 'Fanontaniana fomba', translation: { fr: 'comment', en: 'how' }, partOfSpeech: 'pronoun', frequency: 8 },
  { word: 'io', definition: 'Ilay zavatra', translation: { fr: 'ce, cela', en: 'that' }, partOfSpeech: 'pronoun', frequency: 9 },
  { word: 'ity', definition: 'Ilay zavatra akaiky', translation: { fr: 'ce, ceci', en: 'this' }, partOfSpeech: 'pronoun', frequency: 9 },
  
  // Conjonctions et prépositions
  { word: 'sy', definition: 'Fampikambanana', translation: { fr: 'et', en: 'and' }, partOfSpeech: 'conjunction', frequency: 10 },
  { word: 'na', definition: 'Safidy', translation: { fr: 'ou', en: 'or' }, partOfSpeech: 'conjunction', frequency: 9 },
  { word: 'fa', definition: 'Fanoherana', translation: { fr: 'mais', en: 'but' }, partOfSpeech: 'conjunction', frequency: 10 },
  { word: 'satria', definition: 'Antony', translation: { fr: 'parce que', en: 'because' }, partOfSpeech: 'conjunction', frequency: 9 },
  { word: 'raha', definition: 'Fepetra', translation: { fr: 'si', en: 'if' }, partOfSpeech: 'conjunction', frequency: 9 },
  { word: 'rehefa', definition: 'Fotoana', translation: { fr: 'quand, lorsque', en: 'when' }, partOfSpeech: 'conjunction', frequency: 9 },
  { word: 'mba', definition: 'Tanjon', translation: { fr: 'pour que, afin de', en: 'in order to' }, partOfSpeech: 'conjunction', frequency: 8 },
  { word: 'amin\'ny', definition: 'Amin\'io', translation: { fr: 'à, dans, avec', en: 'at, in, with' }, partOfSpeech: 'preposition', frequency: 10 },
  { word: 'ho an\'ny', definition: 'Ho an\'io', translation: { fr: 'pour', en: 'for' }, partOfSpeech: 'preposition', frequency: 8 },
  { word: 'avy amin\'ny', definition: 'Niala tamin\'io', translation: { fr: 'de, depuis', en: 'from' }, partOfSpeech: 'preposition', frequency: 8 },
  
  // Nombres
  { word: 'iray', definition: 'Isa 1', translation: { fr: 'un', en: 'one' }, partOfSpeech: 'adjective', frequency: 10 },
  { word: 'roa', definition: 'Isa 2', translation: { fr: 'deux', en: 'two' }, partOfSpeech: 'adjective', frequency: 10 },
  { word: 'telo', definition: 'Isa 3', translation: { fr: 'trois', en: 'three' }, partOfSpeech: 'adjective', frequency: 10 },
  { word: 'efatra', definition: 'Isa 4', translation: { fr: 'quatre', en: 'four' }, partOfSpeech: 'adjective', frequency: 9 },
  { word: 'dimy', definition: 'Isa 5', translation: { fr: 'cinq', en: 'five' }, partOfSpeech: 'adjective', frequency: 9 },
  { word: 'enina', definition: 'Isa 6', translation: { fr: 'six', en: 'six' }, partOfSpeech: 'adjective', frequency: 8 },
  { word: 'fito', definition: 'Isa 7', translation: { fr: 'sept', en: 'seven' }, partOfSpeech: 'adjective', frequency: 8 },
  { word: 'valo', definition: 'Isa 8', translation: { fr: 'huit', en: 'eight' }, partOfSpeech: 'adjective', frequency: 8 },
  { word: 'sivy', definition: 'Isa 9', translation: { fr: 'neuf', en: 'nine' }, partOfSpeech: 'adjective', frequency: 8 },
  { word: 'folo', definition: 'Isa 10', translation: { fr: 'dix', en: 'ten' }, partOfSpeech: 'adjective', frequency: 9 },
  { word: 'zato', definition: 'Isa 100', translation: { fr: 'cent', en: 'hundred' }, partOfSpeech: 'adjective', frequency: 8 },
  { word: 'arivo', definition: 'Isa 1000', translation: { fr: 'mille', en: 'thousand' }, partOfSpeech: 'adjective', frequency: 7 },
  
  // Interjections et expressions
  { word: 'eny', definition: 'Fankatoavana', translation: { fr: 'oui', en: 'yes' }, partOfSpeech: 'interjection', antonyms: ['tsia'], frequency: 10 },
  { word: 'tsia', definition: 'Fandavana', translation: { fr: 'non', en: 'no' }, partOfSpeech: 'interjection', antonyms: ['eny'], frequency: 10 },
  { word: 'azafady', definition: 'Fangatahana', translation: { fr: 's\'il vous plaît, excusez-moi', en: 'please, excuse me' }, partOfSpeech: 'interjection', frequency: 10 },
  { word: 'misaotra', definition: 'Fisaorana', translation: { fr: 'merci', en: 'thank you' }, partOfSpeech: 'interjection', frequency: 10 },
  { word: 'veloma', definition: 'Fisarahana', translation: { fr: 'au revoir', en: 'goodbye' }, partOfSpeech: 'interjection', frequency: 9 },
  { word: 'salama', definition: 'Fiarahabana', translation: { fr: 'bonjour', en: 'hello' }, partOfSpeech: 'interjection', frequency: 10 },
  { word: 'manahoana', definition: 'Fiarahabana', translation: { fr: 'bonjour, comment allez-vous', en: 'hello, how are you' }, partOfSpeech: 'interjection', frequency: 10 },
  
  // Jours de la semaine
  { word: 'alatsinainy', definition: 'Andro voalohany', translation: { fr: 'lundi', en: 'Monday' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'talata', definition: 'Andro faharoa', translation: { fr: 'mardi', en: 'Tuesday' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'alarobia', definition: 'Andro fahatelo', translation: { fr: 'mercredi', en: 'Wednesday' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'alakamisy', definition: 'Andro fahefatra', translation: { fr: 'jeudi', en: 'Thursday' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'zoma', definition: 'Andro fahadimy', translation: { fr: 'vendredi', en: 'Friday' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'sabotsy', definition: 'Andro fahenina', translation: { fr: 'samedi', en: 'Saturday' }, partOfSpeech: 'noun', frequency: 7 },
  { word: 'alahady', definition: 'Andro fahafito', translation: { fr: 'dimanche', en: 'Sunday' }, partOfSpeech: 'noun', frequency: 7 },
]

// Créer un index pour recherche rapide
export const dictionaryIndex = new Map<string, WordEntry>()
malagasyDictionary.forEach(entry => {
  dictionaryIndex.set(entry.word.toLowerCase(), entry)
})

// Fonction pour rechercher un mot
export function lookupWord(word: string): WordEntry | undefined {
  return dictionaryIndex.get(word.toLowerCase())
}

// Fonction pour obtenir des suggestions
export function getSuggestions(prefix: string, limit: number = 10): WordEntry[] {
  const lowerPrefix = prefix.toLowerCase()
  return malagasyDictionary
    .filter(entry => entry.word.toLowerCase().startsWith(lowerPrefix))
    .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
    .slice(0, limit)
}

// Fonction pour recherche floue
export function fuzzySearch(query: string, limit: number = 10): WordEntry[] {
  const lowerQuery = query.toLowerCase()
  return malagasyDictionary
    .filter(entry => 
      entry.word.toLowerCase().includes(lowerQuery) ||
      entry.definition.toLowerCase().includes(lowerQuery) ||
      entry.translation.fr?.toLowerCase().includes(lowerQuery) ||
      entry.translation.en?.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
    .slice(0, limit)
}
