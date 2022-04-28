import { Guruh } from "./guruh";

export interface Oquvchi {
    id: number;
    ism: string;
    familiya: string;
    telNomer: number;
    kelganKuni: Date;
    kelishilganSumma: number;
    jins: string;
    guruh: Guruh;
    info: string;
    tulov: boolean;

  }