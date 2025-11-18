





import { ArrowRight, Sparkles, Users, Video } from "lucide-react";
import { Card } from "../../components/ui/card";

import React from 'react';

 const HowItWorksSection= () => {
  return (
    <div>
        <section id="how-it-works" className="py-20 sm:py-32 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">How Skillbridge Works</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to start learning and teaching
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 bg-white dark:bg-slate-800 border-border dark:border-slate-700 hover:border-teal-600/50 dark:hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">1. Create Your Profile</div>
              <p className="text-gray-700 dark:text-gray-400">
                Tell us what skills you have and what you want to learn. Our AI will find the perfect matches for you.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border dark:border-slate-700 hover:border-teal-600/50 dark:hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">2. Get AI-Matched</div>
              <p className="text-gray-700 dark:text-gray-400">
                Our intelligent matching engine connects you with complementary learners or recommends courses.
              </p>
            </Card>
             
            <Card className="p-6 bg-white dark:bg-slate-800 border-border dark:border-slate-700 hover:border-teal-600/50 dark:hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">3. Start Learning</div>
              <p className="text-gray-700 dark:text-gray-400">
                Connect via video, audio, or chat. Schedule sessions and track your learning progress.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-slate-800 border-border dark:border-slate-700 hover:border-teal-600/50 dark:hover:border-teal-600/50 transition-colors">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">4. Rate & Grow</div>
              <p className="text-gray-700 dark:text-gray-400">
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
