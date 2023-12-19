import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic";
import { Suspense } from "react";
const GoogleLogin = dynamic(() => import("../../_components/login/google-login"), {
    loading: () => <ButtonLoader />
})
const GithubLogin = dynamic(() => import("../../_components/login/github-login"), {
    loading: () => <ButtonLoader />
})

const ButtonLoader = () => <div className="w-full h-12 rounded-lg bg-muted animate-pulse" />

const page = () => {
    return (
        <div style={{ height: 'calc(100% - 64px)' }} className="flex flex-col items-center justify-center w-full max-w-xs gap-2 mx-auto">
            <section className="flex flex-col w-full gap-4 h-fit">
                <h1 className="text-2xl font-bold text-center">Вход в DM Family</h1>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Suspense fallback={ <ButtonLoader /> }>
                        <GithubLogin />
                    </Suspense>
                    <Suspense fallback={ <ButtonLoader /> }>
                        <GoogleLogin />
                    </Suspense>
                </div>
                <Separator />
                <Button disabled variant='link'>Войти через почту</Button>
            </section>
        </div>
    )
}

export default page