export function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Active Learners" },
    { value: "50,000+", label: "Skills Swapped" },
    { value: "1,000+", label: "Premium Courses" },
    { value: "95%", label: "Success Rate" },
  ]

  return (
 <div>
     <section className="py-16 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
 </div>
  )
}
