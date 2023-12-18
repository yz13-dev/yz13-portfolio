import GridTemplate from "@/components/shared/grid/grid-template"
import Header from "@/components/widgets/Header"

const Home = async () => {
    return (
      <>
        <header className="flex items-center justify-between w-full h-16 px-6 shrink-0">
          <Header />
        </header>
        <div className="w-full max-w-5xl px-6 mx-auto">
            <div className="w-full py-6">
              <h1 className="text-3xl font-bold">Последние новости</h1>
            </div>
            <GridTemplate />
        </div>
      </>
    )
}

export default Home