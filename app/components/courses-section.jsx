const courses = [
  {
    id: 1,
    title: "Web Design Fundamentals",
    category: "Web Design",
    description: "Learn the basics of web design, from UI/UX principles to modern design tools.",
    image: "/ui-ux-design-interface.png",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    category: "Web Development",
    description: "Master front-end and back-end development with React, Node.js, and PostgreSQL.",
    image: "/web-development-coding.png",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Conversational English for Professionals",
    category: "English",
    description: "Improve your English speaking and listening skills for business and daily communication.",
    image: "/data-science-machine-learning.jpg",
    color: "bg-red-500"
  },
  {
    id: 4,
    title: "Introduction to Cybersecurity",
    category: "Cybersecurity",
    description: "Understand the fundamentals of cybersecurity, network security, and data protection.",
    image: "/python-code.png",
    color: "bg-purple-500"
  },
  {
    id: 5,
    title: "Database Management with SQL",
    category: "Database",
    description: "Learn to design, implement, and manage relational databases using SQL.",
    image: "/android-kotlin-mobile.jpg",
    color: "bg-yellow-500"
  },
  {
    id: 6,
    title: "React and Next.js Development",
    category: "Web Development",
    description: "Build modern, high-performance web applications with React and Next.js.",
    image: "/react-nextjs-javascript.jpg",
    color: "bg-pink-500"
  },
  {
    id: 7,
    title: "Digital Marketing Strategies",
    category: "Digital Marketing",
    description: "Explore effective digital marketing techniques to grow your online presence.",
    image: "/digital-marketing-business.jpg",
    color: "bg-indigo-500"
  },
  {
    id: 8,
    title: "iOS Swift Mobile App Development",
    category: "Mobile Development",
    description: "Develop native iOS applications using Swift and Xcode.",
    image: "/ios-swift-mobile-app.jpg",
    color: "bg-teal-500"
  },
];

const CourseCard = ({ course }) => (
  <div className={`rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 ${course.color}`}>
    <img src={course.image} alt={course.title} className="w-full h-48 object-cover"/>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-white text-opacity-90 text-sm mb-4">{course.description}</p>
      <span className="inline-block bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{course.category}</span>
    </div>
  </div>
);

const CoursesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Explore Our <span className="text-blue-600">Paid Courses</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
