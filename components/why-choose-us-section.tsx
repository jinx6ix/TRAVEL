import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Exceptional safari experiences with local expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🦁", title: "Expert Guides", description: "Professional local guides with decades of experience" },
            { icon: "🚗", title: "Quality Vehicles", description: "Well-maintained 4x4 vehicles with pop-up roofs" },
            { icon: "⭐", title: "Best Experience", description: "We create unforgettable memories that last a lifetime" },
          ].map((feature, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">{feature.icon}</div>
              <CardHeader>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}