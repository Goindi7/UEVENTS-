import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const AdminAuthComp = ({ children }) => {
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        async function verifyAdmin() {
            try {
                const url = "http://localhost:4003/admin/verify"
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await response.json()
                
                if (response.status === 200) {
                    setAdmin({ isLoggedIn: true, username: data.username })
                } else {
                    setAdmin({ isLoggedIn: false, username: "" })
                }
            } catch (error) {
                console.error("Verification failed:", error)
                setAdmin({ isLoggedIn: false, username: "" })
            }
        }
        verifyAdmin()
    }, [])

    if (admin === null) {
        return <div>Loading...</div>
    }

    if (!admin.isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children
}

export default AdminAuthComp