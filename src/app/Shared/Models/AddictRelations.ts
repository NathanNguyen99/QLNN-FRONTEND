export interface AddictRelations {
    oid	: string;
    addictID	: string;
    addictCode : string;
    addictName : string;
    relationsID	: number;
    relationsName: string;
    blackList: boolean;
    managePlaceID: string;
    managePlaceName: string;
    otherName: string;
    currentAddress: string;
    relationWithID: string;
    relationWithName: string;
    dateOfBirth: Date;
    date: Date;
    remarks	: string;
}

export interface AddictRelations2 {
    
    addictID	: string;
    addictCode : string;
    addictName : string;   
    dob	: Date;   
    expand: boolean;
    activityLog : AddictRelations[];
}