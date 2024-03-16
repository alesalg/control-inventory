export interface UserRegistrationRequest {
    name: string;
    email: string;
    password: string
}

export interface UserRegistrationResponse {
    id: string;
    name: string;
    email: string;
}