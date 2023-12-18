import { config } from "@/app.config"
import GridTemplate from "@/components/shared/grid/grid-template"
import RemoteLogo from "@/components/shared/remote-logo"

const Home = async () => {
    return (
      <main className="w-full min-h-screen">
        <div className="w-full h-screen max-w-5xl px-6 py-12 mx-auto">
          <div className="flex items-center justify-center w-full h-fit">
            <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={64} alt="dm-logo" />
          </div>
          <section style={{ height: 'calc(100% - 64px)' }} className="w-full py-6">
            <h1 className="text-4xl font-semibold text-center text-accent-foreground">YZ13</h1>
            <div className="w-full h-full py-12">
              <GridTemplate />
            </div>
          </section>
        </div>
      </main>
    )
}

export default Home