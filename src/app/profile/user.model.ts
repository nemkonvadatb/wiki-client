export interface UserData {
    label : string;
    dbId : string;
}

export interface User {
    id: any;
    name: string;
    password?: any;
    email: string;
    role?: string;
    specialization?: string;
    institution?: string;
    academicDegree?: any;
    userLang?: string[];
    articleParticipant?: string[];
    numberOfArticles?: number;
    registeredAt?: any;
} 

export const USER_DATA: UserData[] = [
    {
      label: "Userame",
      dbId: "name"
    },
    {
      label: "E-mail address",
      dbId: "email"
    },
    {
      label: "Academic degree",
      dbId: ""
    },
    {
      label: "Specialisation",
      dbId: ""
    },
    {
      label: "Institucion",
      dbId: ""
    },
    {
      label: "Role",
      dbId: ""
    },
    {
      label: "Registered at",
      dbId: ""
    },
    {
      label: "Languages",
      dbId: ""
    },
    {
      label: "Number of articles",
      dbId: ""
    },
  ];

