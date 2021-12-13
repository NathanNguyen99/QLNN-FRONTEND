export interface AddictManagePlace {
    oid	: string;
    addictID	: string;
    addictCode : string;
    addictName : string;
    placeTypeID	:number;
    placeTypeName : string;
    managePlaceID	: string;
    placeName : string;
    fromDate	: Date;
    toDate	: Date;
    remarks	: string;
}

export interface AddictManagePlace2 {
    
    addictID	: string;
    addictCode : string;
    addictName : string;   
    dob	: Date;   
    expand: boolean;
    activityLog : AddictManagePlace[];
}