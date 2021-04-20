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
    academic_degree?: any;
    lang?: string[];
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
      dbId: "academic_degree"
    },
    {
      label: "Specialisation",
      dbId: "specialization"
    },
    {
      label: "Institucion",
      dbId: "institution"
    },
    {
      label: "Role",
      dbId: "role"
    },
    {
      label: "Registered at",
      dbId: ""
    },
    {
      label: "Languages",
      dbId: "lang"
    },
    {
      label: "Number of articles",
      dbId: ""
    },
  ];

  export const ROLES = [
    "user", 
    "admin",
    "lector"
  ]

