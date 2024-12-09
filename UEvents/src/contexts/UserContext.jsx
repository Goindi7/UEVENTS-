import React, { createContext, useEffect, useState } from 'react'


export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(false)
    useEffect(() => {
        async function verifyUser() {
            const response = await fetch("http://localhost:4003/verify-user", {
                method: "GET",
                credentials: "include"
            })
            if (response.status == 200) {
                const data = await response.json()
                setUser({ ...user, isLoggedIn: true, username: data.username })
            }
        }
        verifyUser()
    }, [])

    async function logout() {
        const response = await fetch("http://localhost:4003/logout", {
            method: "GET",
            credentials: "include"
        })
        if (response.status == 200) {
            setUser({ ...user, isLoggedIn: false, username: "" })
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider