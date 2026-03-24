// Corpus de textes Malagasy pour l'entraînement des modèles N-grams
// Sources: Bible Malagasy, Journaux, Textes officiels, Proverbes

export const malagasyCorpus = [
  // Textes généraux et exemples
  "Ny fitiavana no lehibe indrindra amin'ny zavatra rehetra.",
  "Mandeha any an-tsekoly ny ankizy isan'andro.",
  "Tsara ny fiainana rehefa miaraka amin'ny fianakaviana.",
  "Miasa mafy ny olona mba hahazoana vola.",
  "Ny teny malagasy dia tena mahafinaritra.",
  "Manana namana maro aho eto amin'ity tanana ity.",
  "Mianatra teny vahiny ny mpianatra.",
  "Ny ray aman-dreny dia tia ny zanany.",
  "Matory ny zaza rehefa alina.",
  "Mifoha maraina ny mpiasa.",
  "Mihinana vary sy laoka ny olona malagasy.",
  "Misotro ronono ny ankizy.",
  "Mamaky boky ny mpianatra ao an-tsekoly.",
  "Manoratra taratasy ho an'ny namana aho.",
  "Miteny malagasy sy frantsay isika.",
  "Mihira ny olona rehefa fety.",
  "Mandihy ny tanora amin'ny fety.",
  "Milalao baolina ny ankizilahy.",
  "Mianatra mafy ny mpianatra mba hahomby amin'ny fanadinana.",
  "Ny mpampianatra dia mampianatra tsara ny mpianatra.",
  
  // Proverbes malagasy (Ohabolana)
  "Ny hazo no vanon-ko lakana, ny tany naniriany no tsara.",
  "Aleo very tsikalakalam-bola toy izay very tsikalakalam-pihavanana.",
  "Aza manao tsinontsinona ny kely fa ny kely no tonga lehibe.",
  "Ny adala no tsy mahay mandanjalanja.",
  "Izay mitambatra vato, izay misaraka fasika.",
  "Ny teny toy ny rano an-tanimbary: raha mivoaka tsy miverina intsony.",
  "Aleo maty rahampitso toy izay maty anio.",
  "Ny fitiavana tsy misy fetra.",
  "Izay manam-bola no manana namana.",
  "Ny marina toy ny menaka: na dia afenina aza, mitsinkafona ihany.",
  "Aza atao ambany voditra ny raharaha.",
  "Ny olona tsy manam-pahaizana toy ny hazo tsy misy ravina.",
  "Aleo ho antitra amin'ny fahendrena toy izay ho tanora amin'ny hadalana.",
  "Ny fanahy no maha-olona.",
  "Izay maniry ratsy ho an'ny hafa dia maniry ratsy ho an'ny tenany.",
  "Ny teny soa milaza, ny teny ratsy maharary.",
  "Aza miankin-tsaina amin'ny haren'ny tany fa tsy maharitra izany.",
  "Ny fahamarinana no hery lehibe indrindra.",
  "Izay tia mamela, izay mankahala mitana.",
  "Ny fahalalana no harena tsy lanin'ny maty.",
  
  // Textes sur Madagascar
  "Madagasikara dia nosy lehibe any amin'ny ranomasimbe Indiana.",
  "Antananarivo no renivohitry ny Madagasikara.",
  "Maro ny karazan-javaboahary ao Madagasikara.",
  "Ny lemur dia biby tsy fahita afa-tsy ao Madagasikara.",
  "Ny olona malagasy dia malaza amin'ny fanaovana hira sy dihy.",
  "Ny fambolena vary no asa lehibe ataon'ny malagasy.",
  "Ny ranomasina manodidina an'i Madagasikara dia feno hazandrano.",
  "Maro ny mpizaha tany tonga eto Madagasikara isan-taona.",
  "Ny tontolo iainana ao Madagasikara dia sarobidy.",
  "Ny ala mikitroka dia manan-danja ho an'ny tontolo iainana.",
  
  // Textes sur l'éducation
  "Ny fianarana no soa indrindra ho an'ny ankizy.",
  "Tokony hianatra tsara ny mpianatra mba hahomby.",
  "Ny sekoly dia toerana fianarana sy fiaraha-monina.",
  "Ny mpampianatra dia olona manan-danja amin'ny fiarahamonina.",
  "Ny boky dia loharanon'ny fahalalana.",
  "Ny fianarana teny vahiny dia mahasoa.",
  "Ny matematika sy ny siansa dia ilaina amin'ny fiainana.",
  "Ny tantara sy ny jeografia dia mampianarantsika momba izao tontolo izao.",
  "Ny fahaizana mamaky teny sy manoratra dia tena ilaina.",
  "Ny fianarana dia tsy mifarana na oviana na oviana.",
  
  // Textes sur la vie quotidienne
  "Mifoha maraina aho ary manao fanatanjahan-tena.",
  "Misakafo maraina ny fianakaviana miaraka.",
  "Mandeha miasa ny ray aman-dreny.",
  "Mody avy any an-tsekoly ny ankizy amin'ny hariva.",
  "Mianatra lesona ny mpianatra amin'ny alina.",
  "Matory amin'ny folo ora hariva ny rehetra.",
  "Mitsangatsangana ny fianakaviana amin'ny sabotsy sy alahady.",
  "Mividy entana any an-tsena ny renim-pianakaviana.",
  "Mahandro sakafo ho an'ny fianakaviana ny reniny.",
  "Miahy ny trano sy ny zaridaina ny lahikely.",
  
  // Textes sur la santé
  "Ny fahasalamana no harena lehibe indrindra.",
  "Tokony hihinana voankazo sy legioma isan'andro isika.",
  "Ny fanatanjahantena dia mahasoa ny vatana.",
  "Misotroa rano betsaka isan'andro.",
  "Ny torimaso ampy dia ilaina ho an'ny fahasalamana.",
  "Mandehana any amin'ny dokotera raha marary.",
  "Ny fiarovana ny fahasalamana dia zava-dehibe.",
  "Aza misotro toaka be loatra fa manimba ny vatana izany.",
  "Ny fihinanana tsara dia mahatonga ny vatana ho salama.",
  "Ny fahadiovana dia maro soa ho an'ny fahasalamana.",
  
  // Textes sur la nature
  "Tsara ny tontolo iainana rehefa voaaro.",
  "Ny hazo dia manome rivotra madio.",
  "Ny ranomasina dia manan-karena amin'ny hazandrano.",
  "Ny biby dia manan-jo hiaina toy ny olona.",
  "Tokony hiarovana ny ala mba tsy ho levona.",
  "Ny rivotra madio dia ilaina ho an'ny fahasalamana.",
  "Ny orana dia mahasoa ny fambolena.",
  "Ny masoandro dia loharanon'ny hazavana sy hafanana.",
  "Ny tany dia tokony ho voaaro mba hahavokatra tsara.",
  "Ny zava-boary dia harena sarobidy ho an'ny taranaka faramandimby.",
  
  // Textes sur la technologie
  "Ny teknolojia vaovao dia manampy ny fiainana.",
  "Ny solosaina dia fitaovana ilaina amin'izao fotoana izao.",
  "Ny internet dia mampiray ny olona maneran-tany.",
  "Ny finday dia fitaovana fifandraisana mora.",
  "Ny fianarana amin'ny alalan'ny internet dia miha-mandroso.",
  "Ny teknolojia dia mitondra fiovana lehibe amin'ny asa.",
  "Ny fitaovana elektronika dia mila fitandremana.",
  "Ny fahalalana momba ny teknolojia dia ilaina ankehitriny.",
  "Ny famoronana vaovao dia manampy ny fampandrosoana.",
  "Ny fivoarana ara-teknolojika dia miteraka fahafahana maro.",
  
  // Dialogues courants
  "Salama! Manao ahoana ianao?",
  "Tsara fa misaotra. Ary ianao?",
  "Aiza ianao no mandeha?",
  "Mandeha any an-tsekoly aho.",
  "Inona no ataonao?",
  "Miasa aho ankehitriny.",
  "Firy taona ianao?",
  "Roapolo taona aho.",
  "Aiza ny tranonao?",
  "Ao Antananarivo ny tranoko.",
  "Inona no tianao?",
  "Tia mamaky boky aho.",
  "Oviana ianao no handeha?",
  "Handeha rahampitso aho.",
  "Veloma! Mandra-pihaona!",
  "Veloma koa! Mandehana tsara!",
  
  // Textes religieux et spirituels
  "Andriamanitra dia fitiavana.",
  "Ny vavaka dia fifandraisana amin'Andriamanitra.",
  "Ny fahamarinana no lalana mankany amin'ny fiainana.",
  "Mivavaha ho an'ny firenena sy ny fianakaviana.",
  "Ny finoana no hery lehibe amin'ny fiainana.",
  "Ny famelan-keloka dia famantarana ny fitiavana.",
  "Ny fiadanana ao am-po dia harena sarobidy.",
  "Tiava ny namanao tahaka ny tenanao.",
  "Mankasitraka amin'ny zavatra rehetra.",
  "Ny fahendrena avy amin'Andriamanitra no tena fahendrena.",
  
  // Textes sur la culture malagasy
  "Ny fomba malagasy dia manan-karena.",
  "Ny hira malagasy dia mahafinaritra.",
  "Ny dihy malagasy dia maro karazana.",
  "Ny lambahoany dia fitafiana nentim-paharazana.",
  "Ny vary dia sakafo lehibe ho an'ny malagasy.",
  "Ny fihavanana dia soatoavina malagasy.",
  "Ny fanajana ny ray aman-dreny dia zava-dehibe.",
  "Ny firaisan-kina dia hery ho an'ny malagasy.",
  "Ny famadihana dia fomba malagasy.",
  "Ny kabary dia fahaizana nentim-paharazana malagasy."
]

// N-grams précompilés pour la prédiction
export function buildNGrams(n: number = 2): Map<string, Map<string, number>> {
  const ngrams = new Map<string, Map<string, number>>()
  
  for (const text of malagasyCorpus) {
    const words = text.toLowerCase()
      .replace(/[.,!?;:'"()]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0)
    
    for (let i = 0; i <= words.length - n; i++) {
      const prefix = words.slice(i, i + n - 1).join(' ')
      const nextWord = words[i + n - 1]
      
      if (!ngrams.has(prefix)) {
        ngrams.set(prefix, new Map())
      }
      
      const nextWords = ngrams.get(prefix)!
      nextWords.set(nextWord, (nextWords.get(nextWord) || 0) + 1)
    }
  }
  
  return ngrams
}

// Bigrams pré-calculés
export const bigrams = buildNGrams(2)

// Trigrams pré-calculés
export const trigrams = buildNGrams(3)

// Fonction pour prédire le prochain mot
export function predictNextWord(context: string, limit: number = 5): string[] {
  const words = context.toLowerCase()
    .replace(/[.,!?;:'"()]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0)
  
  // Essayer d'abord avec les trigrams
  if (words.length >= 2) {
    const prefix = words.slice(-2).join(' ')
    const trigramPredictions = trigrams.get(prefix)
    
    if (trigramPredictions && trigramPredictions.size > 0) {
      return Array.from(trigramPredictions.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word)
    }
  }
  
  // Sinon, utiliser les bigrams
  if (words.length >= 1) {
    const prefix = words[words.length - 1]
    const bigramPredictions = bigrams.get(prefix)
    
    if (bigramPredictions && bigramPredictions.size > 0) {
      return Array.from(bigramPredictions.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word)
    }
  }
  
  // Retourner les mots les plus fréquents par défaut
  return ['ny', 'dia', 'amin\'ny', 'sy', 'no'].slice(0, limit)
}

// Statistiques du corpus
export const corpusStats = {
  totalTexts: malagasyCorpus.length,
  totalWords: malagasyCorpus.reduce((acc, text) => 
    acc + text.split(/\s+/).length, 0
  ),
  uniqueWords: new Set(
    malagasyCorpus.flatMap(text => 
      text.toLowerCase()
        .replace(/[.,!?;:'"()]/g, '')
        .split(/\s+/)
    )
  ).size
}
