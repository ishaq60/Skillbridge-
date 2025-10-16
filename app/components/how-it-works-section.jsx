





import { ArrowRight, Sparkles, Users, Video } from "lucide-react";
import { Card } from "../../components/ui/card";

import React from 'react';

 const HowItWorksSection= () => {
  return (
    <div>
        <section id="how-it-works" className="py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Skillbridge Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start learning and teaching
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 bg-white border-border hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-xl font-semibold mb-2">1. Create Your Profile</div>
              <p className="text-muted-foreground">
                Tell us what skills you have and what you want to learn. Our AI will find the perfect matches for you.
              </p>
            </Card>
            <Card className="p-6 bg-white border-border hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-xl font-semibold mb-2">2. Get AI-Matched</div>
              <p className="text-muted-foreground">
                Our intelligent matching engine connects you with complementary learners or recommends courses.
              </p>
            </Card>
             
            <Card className="p-6 bg-white border-border hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-xl font-semibold mb-2">3. Start Learning</div>
              <p className="text-muted-foreground">
                Connect via video, audio, or chat. Schedule sessions and track your learning progress.
              </p>
            </Card>
            <Card className="p-6 bg-white border-border hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-xl font-semibold mb-2">4. Rate & Grow</div>
              <p className="text-muted-foreground">
                ate your swap sessions to build reputation and improve future AI recommendations
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksSection;
