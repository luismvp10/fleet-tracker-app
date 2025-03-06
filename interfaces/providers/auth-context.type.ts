import {User} from "@/interfaces/entities/user.entity";

export interface AuthContextType{
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
}
