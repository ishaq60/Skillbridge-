import { Button } from "../../components/ui/button"


const CtaSection = () => {
  return (
    <section className="bg-blue-600 dark:bg-blue-800 py-16 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join SkillSwap today and unlock a world of knowledge exchange and expert-led courses.
        </p>
        <Button className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-200 dark:text-blue-800 px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition duration-300">
          Sign Up Now
        </Button>
      </div>
    </section>
  )
}

export default CtaSection
