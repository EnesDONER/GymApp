export interface AddProgramMovementModel {
    movementsId:string;
    programsId : string;
    day : string;
    numberOfSets:number;
    numberOfRepetitions:number;
}

export enum Day{
    Pazartesi,Sali,Çarsamba,Persembe,Cuma,Cumartesi,Pazar
} 