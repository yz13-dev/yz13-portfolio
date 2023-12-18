import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const page = () => {
    return (
        <div style={{ height: 'calc(100% - 64px)' }} className="flex flex-col items-center justify-center w-full max-w-xs gap-2 mx-auto">
            <section className="flex flex-col w-full gap-4 h-fit">
                <h1 className="text-2xl font-bold text-center">Вход в DM Family</h1>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Button variant='secondary' className="h-12 text-base rounded-lg">Войти через GitHub</Button>
                    <Button className="h-12 text-base rounded-lg">Войти через Google</Button>
                </div>
                <Separator />
                <Button variant='link'>Войти через почту</Button>
            </section>
        </div>
    )
}

export default page