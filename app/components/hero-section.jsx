
import Image from "next/image"
import { Button } from "../../components/ui/button"

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Exchange Skills, <span className="text-blue-600">Learn Together</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
            SkillSwap is an AI-powered peer learning platform where users can exchange skills directly and purchase paid courses from instructors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-3 rounded-full shadow-lg transition duration-300">Get Started</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 text-lg px-8 py-3 rounded-full shadow-lg transition duration-300">Learn More</Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/modern-education-technology-learning-platform-hero.jpg"
            alt="SkillSwap Hero"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent opacity-50 dark:from-gray-950 dark:via-transparent dark:to-transparent"></div>
    </section>
  )
}

export default HeroSection
