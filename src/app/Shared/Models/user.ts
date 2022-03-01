export interface User {
    oid: string;
    userName: string;
    fullName : string;
    password: string;
    admin: boolean;
    active: boolean;
    placeID: string;
    placeName : string;
    manageCityID: number;
    manageCityName: string;
    manageCityTypeID: number;
}