export interface Employee {
    firebaseId: string,
    id: number,
    image: string,
    firstName: string;
    middleName: string;
    surName: string;
    birthDate: Date;
    gender: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
    startsAt: Date;
    endsIn: Date;
    jobPosition: string;
    team: string;
    userBillable: boolean;
    billableHours: string;
}