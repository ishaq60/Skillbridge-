import React from 'react';

const StatsSection = () => {
  return (
    <div>
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-teal-600">50K+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">10K+</div>
                <div className="text-sm text-muted-foreground">Skills Swapped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">5K+</div>
                <div className="text-sm text-muted-foreground">Expert Instructors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">4.9/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
    </div>
  );
};

export default StatsSection;