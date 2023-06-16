import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    usuario: user | null
    // perfil:string
    signIn(email: string, password: string): Promise<void>,
    signOut(): void;
    updateEmail(): void
    loading: boolean;
}

interface  user {
    perfil : string,
    _id : number,
    nome : string,
    nivel : string,
    email: string,
    empresa : string,
    contato_empresa : string,
    email_notificacao : string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children} : any) => {
    const [usuario, setUsuario] = useState<user | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storageUsuario = await localStorage.getItem('@Reportify:usuario');
            const storageToken = await localStorage.getItem('@Reportify:token');

            if (storageUsuario && storageToken) {
                setUsuario(JSON.parse(storageUsuario));
            }
            setLoading(false);
        })()
    }, [])

    async function signIn(email: string, senha: string) {
        const response : any = await api.post('/login', {
            email, senha
        });

        setUsuario(response.data.usuario);

        await localStorage.setItem('@Reportify:usuario', JSON.stringify(response.data.usuario));
        await localStorage.setItem('@Reportify:token', response.data.token);
    }

    function signOut() {
        localStorage.clear()
        setUsuario(null); 
    }

    async function updateEmail() {
        if (usuario) {
            const updatedUsuario : any = {...usuario, email_notificacao: !usuario.email_notificacao}
            await localStorage.setItem('@Reportify:usuario', JSON.stringify(updatedUsuario));
            setUsuario(updatedUsuario)
        }
    }

    return (
    <AuthContext.Provider value={{signed: !!usuario, usuario, signIn, signOut, loading , updateEmail}}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};