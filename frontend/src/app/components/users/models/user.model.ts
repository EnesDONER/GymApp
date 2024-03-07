export class UserModel{
    _id:string = "";
    firstName: string = "";
    lastName: string = "";
    phoneNumber: string = "";
    email: string = "";
    password: string = "";
    userProgramsId:string ="";
    programId:string ="";
    userProgramsCreatedDate:Date = new Date();
    isStatus:boolean=true;
}
