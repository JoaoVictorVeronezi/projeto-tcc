export interface CompleteTextType {
  categorizedPhrases: CategorizedPhrases;
  language: string;
  readingTime: number;
  wordsCount: number;
}

export interface SectionsDataType {
  categorizedPhrases: CategorizedPhrases;
  name: string;
  percentage: number;
  readingTime: number;
  text: string;
  wordsCount: number;
}

export interface CategorizedPhrases {
  less_than_3_words: number;
  between_3_and_5_words: number;
  between_5_and_10_words: number;
  more_than_10_words: number;
  less_than_25_words: number;
  between_25_and_74_words: number;
  between_75_and_160_words: number;
  more_than_160_words: number;
  punctuation_marks: number;
}
