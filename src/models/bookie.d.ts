declare namespace Bookie{
    interface Record{
        Id?: string;
        DateCreated?: Date;
        ModifiedOn?: Date;
    }
   
    interface User extends Record{
        Name: string;
        DisplayName: string;
        IsBanned: boolean;
    }
}