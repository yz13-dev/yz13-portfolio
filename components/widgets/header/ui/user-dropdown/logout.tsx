'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { auth } from "@/utils/app"

const Logout = () => {
    const getSignOut = async() => {
        await auth.signOut()
    }
    return (
        <DropdownMenuItem onClick={getSignOut}>Выйти из профиля</DropdownMenuItem>
    )
}

export default Logout