import React from 'react'
import { Separator } from '../ui/separator'

const AuthDivider = () => {
    return (
        <div className="flex items-center justify-center w-full gap-x-2 my-6">
            <Separator className="w-[40%]" />
            OR
            <Separator className="w-[40%]" />
        </div>
    )
}

export default AuthDivider
