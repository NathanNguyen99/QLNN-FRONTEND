//import * as internal from "stream";
import { AddictDrugs } from "../Models/AddictDrugs";
import { AddictManagePlace } from "../Models/AddictManagePlace";
import { AddictClassify } from "./AddictClassify";

export interface Addict {
    oid	: string;
    addictCode	: string;
    // firstName	: string;
    // lastName	: string;
    fullName	: string;
    otherName	: string;
    genderID	: number;
    placeOfBirthID	: string;
    dateOfBirth : Date;
    pemanentAddress	: string;
    currentAddress	: string;
    profession	: string;
    phoneNumber	: string;
    socialNetworkAccount	: string;
    educationLevelID	: string;
    citizenID	: string;
    issueDate : Date;
    issuePlaceID : string;
    ethnicID : number;
    religionID : number;
    nationalityID : number;
    workStatusID : number;
    ingredientID : number;
    marriageID : number;
    criminalConviction	: string;
    criminalRecord	: string;
    detoxed	: boolean;
    fartherName	: string;
    motherName	: string;
    partnerName	: string;
    characteristics	: string;
    remarks1	: string;
    remarks2	: string;
    remarks3    : string;// nhan than
    manageType : number;
    complete	:boolean;
    completeDate	: Date;
    createDate	:Date;
    createUser	: string;
    imgLink	: string;
    updCount : number;
    dead : boolean;
    managePlaceID	: string;    
    correctRatio: number;
    drugs : AddictDrugs[];
    classifys : AddictClassify[];
    places : AddictManagePlace[];
}

// export interface AddictBase {
//     oid	: string;
//     addictCode	: string;
//     fullName	: string;
// }