import {userContext} from 'react';

export const UserContext = createContext({});

export default function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    );
}
