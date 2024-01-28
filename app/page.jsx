



import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        
    <h1 className="head_text text-center">
      Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">
        Enumeration Prompts</span>
    </h1>
    <p className="desc text-center">
     Enumtips is an open-source tool for the modern world, designed 
     to discover, create, and share efficient enumeration prompts
    </p>

    <Feed/>


    </section>
  )
}

export default Home
