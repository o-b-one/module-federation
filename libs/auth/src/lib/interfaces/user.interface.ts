export interface IUser{
    id: string;
    name: string;
    xsrf?: string;
    roles: string[];
    loading?: boolean;
};
