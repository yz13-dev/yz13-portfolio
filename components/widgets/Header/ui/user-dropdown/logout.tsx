import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { auth } from "@/utils/app"

const Logout = () => {
    return (
        <DropdownMenuItem onClick={auth.signOut}>Выйти из профиля</DropdownMenuItem>
    )
}

export default Logout