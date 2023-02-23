export enum Availability {
  en = 'en',
  id = 'id',
}

type Indexable = {
  [key: string]: string | undefined;
};

type DefaultLang = {
  [key in Availability]: string;
};

export interface Lang extends DefaultLang, Indexable {
  unique?: string;
}
