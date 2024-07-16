import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ITranslationObject {
  token: string;
  text: string;
  lang: number;
}

@Injectable({
  providedIn: "root",
})
export class TranslationsService {
  lang = 1;
  lang_text = new BehaviorSubject<string>("en");
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

  changeLanguage() {
    this.lang = this.lang == 1 ? 2 : 1;
    this.lang_text.next(this.lang == 1 ? "en" : "gr");
  }
}
