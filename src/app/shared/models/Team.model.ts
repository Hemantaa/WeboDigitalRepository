export interface Team {
    firebaseId: string,
    id: number,
    teamName: string,
    teamPassword: string,
    teamMembers: any[],
    billableHours: string,
    teamQr: string
}