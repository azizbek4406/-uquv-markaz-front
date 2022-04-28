import { Time } from "@angular/common";
import { Oqituvchi } from "./oqituvchi";

export interface Guruh{
  id: number,
  nom: string,
  darsVaqti: string,
  sana: Date,
  oqituvchi: Oqituvchi,
  oquvchiSon: number,
  info: string
  
}