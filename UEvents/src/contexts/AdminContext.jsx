import React, { createContext, useEffect, useState } from 'react'


export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState({ isLoggedIn: false, username: "" })
    useEffect(() => {
        async function verifyAdmin() {
            const response = await fetch("http://localhost:4003/admin/verify", {
                method: "GET",
                credentials: "include"
            })
            if (response.status == 200) {
                const data = await response.json()
                setAdmin({ ...admin, isLoggedIn: true, username: data.username })
            }
        }
        verifyAdmin()
    }, [])

    async function adminLogout() {
        const response = await fetch("http://localhost:4003/admin/logout", {
            method: "GET",
            credentials: "include"
        })
        if (response.status == 200) {
            setAdmin({ ...admin, isLoggedIn: false, username: "" })
        }
    }

    return (
        <AdminContext.Provider value={{ admin, setAdmin, adminLogout }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider