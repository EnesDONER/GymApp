import { ProgramMovementModel } from "./program-movement.model";

export interface ProgramResponseModel{
    succeded:boolean;
    data:ProgramMovementModel;
}