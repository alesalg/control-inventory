export interface UserAuthRequest {
    email: string;
    password: string
}

export interface UserAuthResponse {
    id: string;
    name: string;
    email: string;
    token: string
}