import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { User } from 'firebase/auth'
// import React from 'react'


type Props = {
    user: User
}
const UserPreview = ({ user }: Props) => {
    return (
        <DropdownMenuLabel className='flex flex-col justify-center w-full pt-0'>
            <div className="flex items-center w-full gap-1 h-fit">
                <span className='text-base font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1'>{user?.displayName || 'Пользователь'}</span>
            </div>
            <span className='text-xs font-normal text-neutral-500 dark:text-neutral-400 line-clamp-1'>{user?.email}</span>
        </DropdownMenuLabel>
    )
}

export default UserPreview