import { Injectable } from "@angular/core";

export interface ITranslationObject {
  token: string;
  text: string;
  lang: number;
}

@Injectable({
  providedIn: "root",
})
export class TranslationsService {
  lang = 2;
  private translations: {
    [key: string]: {
      [key: number]: string;
    };
  } = {};
  constructor() {
    this.prepareTranslations();
  }

  private prepareTranslations() {
    const translationData: ITranslationObject[] = require("../../assets/translations.json");
    this.translations = translationData.reduce((translateObj, translation) => {
      if (translation.token in translateObj) {
        translateObj[translation.token][translation.lang] = translation.text;
      } else {
        translateObj[translation.token] = {
          [translation.lang]: translation.text,
        };
      }
      return translateObj;
    }, {});
  }

  translate(token: string) {
    return this.translations[token.toUpperCase()][this.lang];
  }
}
