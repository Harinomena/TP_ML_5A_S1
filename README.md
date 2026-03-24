# 📝 **Editeur Malagasy**  
**Éditeur de Texte Augmenté par l'IA pour la Langue Malagasy**  
*TP Machine Learning – M2 S1*  
**Institut Supérieur Polytechnique de Madagascar**

**Lien de démo** (optionnel) : https://v0-adapt-and-improve-25pqwom2g-king7894545-9975s-projects.vercel.app/  
**Vidéo de présentation** : https://drive.google.com/file/d/1Rglgj8QqsdSNvxZkO9ekyFKf4kUI5Lxt/view?usp=drivesdk

---

## 👥 Membres du groupe et rôles

| Nom              | Rôle                                      |
|------------------|-------------------------------------------|
| RAZANAPARANY Toky Faniriantsoa num 12 IGGLIA 5    | Lead Developer & Architecture ,Sentiment            |
| (À compléter)    | NLP & IA (spellcheck, lemmatisation, NER) |
| (À compléter)    | Autocomplétion, TTS & Chatbot  |



## 📋 Documentation Technique

### 🛠 Stack Technique

- **Framework** : Next.js 14 (App Router) + React 19 + TypeScript
- **UI** : shadcn/ui + Tailwind CSS + Lucide Icons
- **Éditeur riche** : Composant `TextEditor` personnalisé (basé sur **TipTap / ProseMirror** – recommandé dans l’annexe)
- **Thème** : `next-themes` (light/dark)
- **Hooks personnalisés** (tous dans `/hooks/`):
  - `useMalagasyEditor` → état central + stats + orchestration des IA
  - `useAutocomplete` → next-word prediction
  - `useTextToSpeech` → TTS
- **Architecture** : 
  - **100 % client-side** pour la démo rapide (pas de backend lourd)
  - Approche **hybride** : règles symboliques + algorithmes + petits modèles data-driven
  - Aucune dépendance à un modèle GPT/RNN entraîné de zéro (respect des contraintes du TP)

### 🔧 Approches NLP pour langue Low-Resource

| Fonctionnalité              | Approche choisie                              | Bibliothèque / Outil utilisé          | Contour du manque de données |
|-----------------------------|-----------------------------------------------|---------------------------------------|------------------------------|
| Correcteur Orthographique   | Levenshtein + règles phonotactiques + dict   | `rapidfuzz` (JS port : `fuse.js` + custom) + regex | Dictionnaire scraped de tenymalagasy.org + Wikipedia MG |
| Vérification à base de règles | Automates / REGEX interdits (`nb`, `mk`, `nk`…) | Regex natives + liste statique       | Règles linguistiques malagasy (annexe) |
| Lemmatisation               | Stripping préfixes/suffixes + table de mapping | Règles + petit trie de racines       | Préfixes/suffixes officiels (mi-, ma-, -ana…) |
| Autocomplétion              | N-grams (trigram) + Markov simple            | `n-gram` JS + corpus pré-chargé      | Corpus Wikipedia MG + Bible malagasy |
| Traducteur mot-à-mot        | Dictionnaire local + fallback API             | JSON dictionnaire + LibreTranslate   | tenymalagasy.org + API gratuite |
| Analyse de Sentiment        | Bag-of-Words + lexique de polarité            | Liste de mots positifs/négatifs      | Lexique créé manuellement + Wikipedia |
| Reconnaissance d’Entités    | Lookup + règles + petites listes              | Listes villes/personnalités + regex  | Listes extraites de Wikipedia MG |
| Synthèse Vocale             | Web Speech API + fallback gTTS                | `Web Speech API` (voix malagasy)     | Accent local via SSML basique |
| Chatbot Assistant           | Prompt engineering + RAG simple               | Contexte éditeur + réponses statiques | Pas de LLM lourd |

## 📋 BIBLIOGRAPHIE
**Stratégie anti-low-resource** :
- **Scraping** : Wikipedia MG (~90 k articles) + tenymalagasy.org
- **Règles linguistiques** : phonotactique + morphologie malagasy (VSO, préfixes/suffixes)
- **Modèles légers** : N-grams + Levenshtein + Bag-of-Words
- **Hybride** : symbolique + statistique (aucun entraînement lourd)

### 1. Corpus et ressources linguistiques malagasy

- **Wikipedia Malagasy** (mg.wikipedia.org) – ~90 000 articles en langue moderne.  
  Utilisé pour l’entraînement des N-grams et l’autocomplétion.  
  [Accès API MediaWiki](https://mg.wikipedia.org/w/api.php)

- **Teny Malagasy** (tenymalagasy.org) – Plus grand dictionnaire numérique malagasy (108 000 entrées avec définitions).  
  Source principale du dictionnaire local de correction orthographique et de lemmatisation.  
  [tenymalagasy.org](https://tenymalagasy.org)

- **Global Voices Malagasy Parallel Corpus** – Corpus parallèle multilingue (utilisé pour le traducteur mot-à-mot).

### 2. Articles scientifiques et travaux de recherche

- Zupon, A., Crew, E. E., & Ritchie, S. (2021). *Text Normalization for Low-Resource Languages of Africa*.  
  AfricaNLP Workshop. arXiv:2103.15845.  
  [Lien arXiv](https://arxiv.org/abs/2103.15845)  
  *(Référence clé pour la normalisation de texte en malagasy et autres langues low-resource)*

- Ratianantitra, R. (2023). *A State of the Art Review on Natural Language Processing applied to the Malagasy Language*.  
  2023 International Conference on Artificial Intelligence and its Applications.  
  [ResearchGate](https://www.researchgate.net/publication/376414400_A_State_of_the_art_review_on_Natural_Language_Processing_applied_to_the_Malagasy_Language)

- Ranaivoarison, J. N. A. (2018). *The Malagasy language in the digital age: Challenges and perspectives*.  
  LRL 2015 – 5th Workshop on Less-Resourced Languages.  
  [PDF](http://ltc.amu.edu.pl/a2015/book/papers/LRL-3.pdf)

- Mamelona, L. et al. (2026). *Towards robust Malagasy NLP: a novel corpus and evaluation framework for sentiment analysis*.  
  Language Resources and Evaluation.  
  *(Corpus Vaovao Malagasy Sentiment – référence récente pour l’analyse de sentiment)*

- Garrette, D. (2013). *Low-Resource Malagasy POS Tagging*.  
  NAACL Student Research Workshop.  
  [Document](https://www.scribd.com/document/363138261/Garrette-Low-Resource-Pos-Naacl2013)

### 3. Techniques NLP et algorithmes utilisés

- Levenshtein, V. I. (1966). *Binary codes capable of correcting deletions, insertions, and reversals*. Soviet Physics Doklady.  
  *(Distance de Levenshtein – base du correcteur orthographique)*

- Jurafsky, D. & Martin, J. H. (2025). *Speech and Language Processing* (3rd ed.).  
  Chapitres sur N-grams, Markov Models et Bag-of-Words.  
  [Livre en ligne](http://www.web.stanford.edu/~jurafsky/slp3/)

- Techniques classiques :  
  - Bag-of-Words (BoW) & N-grams pour l’analyse de sentiment et l’autocomplétion.  
  - Phonotactique malagasy (règles `nb`, `mk`, `nk`, `dt`, `bp`, `sz` interdits).
