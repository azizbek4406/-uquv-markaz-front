import { Guruh } from "./guruh";

export interface Oquvchi {
    id: number;
    ism: string;
    familiya: string;
    telNomer: number;
    kelganKuni: Date;
    kelishilganSumma: number;
    jins: string;
    tulovTasdiq: boolean;
    guruh: Guruh;
    info: string;

  }
