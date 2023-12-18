import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BiLogoGithub } from "react-icons/bi";
import GoogleLogin from "../../_components/login/google-login";


const page = () => {
    return (
        <div style={{ height: 'calc(100% - 64px)' }} className="flex flex-col items-center justify-center w-full max-w-xs gap-2 mx-auto">
            <section className="flex flex-col w-full gap-4 h-fit">
                <h1 className="text-2xl font-bold text-center">Вход в DM Family</h1>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Button variant='secondary' className="h-12 gap-2 text-base rounded-lg">
                        <BiLogoGithub />
                        Войти через GitHub
                    </Button>
                    <GoogleLogin />
                </div>
                <Separator />
                <Button variant='link'>Войти через почту</Button>
            </section>
        </div>
    )
}

export default page