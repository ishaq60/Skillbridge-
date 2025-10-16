import { BarChart, BookOpen, MessageCircle, CreditCard } from "lucide-react"

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm connects you with ideal skill-swap partners based on your unique learning goals.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Diverse Paid Courses",
    description: "Access a wide array of premium courses taught by expert instructors across various domains.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Real-time Communication",
    description: "Engage in interactive learning with integrated chat, video, and audio calls.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Secure Payment Gateway",
    description: "Enjoy hassle-free and secure transactions for all your paid courses with Stripe/PayPal integration.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Key <span className="text-blue-600">Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-blue-50 dark:bg-gray-700 transform transition duration-300 hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
