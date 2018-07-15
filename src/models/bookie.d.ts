declare namespace Bookie{
    interface Entity{
        Id?: string;
        DateCreated?: Date;
        ModifiedOn?: Date;
    }
   
    interface User extends Entity{
        Name: string;
        DisplayName: string;
        Banned: boolean;
    }
}