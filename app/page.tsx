import { config } from "@/app.config"
import GridTemplate from "@/components/shared/grid/grid-template"
import RemoteLogo from "@/components/shared/remote-logo"

const Home = async () => {
    return (
      <main className="w-full min-h-screen">
        <div className="w-full max-w-5xl px-6 py-12 mx-auto md:h-screen h-fit">
          <div className="flex items-center justify-center w-full h-fit">
            <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={64} alt="dm-logo" />
          </div>
          <section style={{ height: 'calc(100% - 64px)' }} className="flex flex-col w-full pt-6">
            <div className="flex items-center justify-center w-full h-24 shrink-0">
              <h1 className="text-4xl font-semibold text-center text-accent-foreground">YZ13</h1>
            </div>
            <div className="w-full h-full">
              <GridTemplate />
            </div>
          </section>
        </div>
      </main>
    )
}

export default Home