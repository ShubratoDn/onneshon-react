import React from 'react'
import { Outlet } from 'react-router-dom'

export default function UserPrivateGate() {
    return (
        <div>
            <h1>This is dashboard</h1>
            <Outlet></Outlet>

        </div>
    )
}
