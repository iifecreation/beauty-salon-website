import React from 'react';

const StatsSection = () => {
  return (
    <section className="w-full mt-[60px] max-md:mt-10">
      <div className="flex gap-6 max-md:flex-col">
        {/* Stats Cards */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {/* 500+ Card */}
            <div className="bg-card border border-border rounded-[var(--radius)] p-6 flex items-center justify-between">
              <div>
                <div className="text-5xl font-light text-foreground tracking-[-2.4px] max-md:text-4xl">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Certified students</div>
              </div>
              <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-background rounded-full"></div>
              </div>
            </div>

            {/* 100% Card */}
            <div className="bg-card border border-border rounded-[var(--radius)] p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-5xl font-light text-foreground tracking-[-2.4px] max-md:text-4xl">100%</div>
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-background rounded-sm"></div>
                </div>
              </div>
              <div className="text-2xl font-light text-foreground tracking-[-1.2px]">Job Placement Rate</div>
            </div>

            {/* 15+ Card */}
            <div className="bg-card border border-border rounded-[var(--radius)] p-6 flex flex-col justify-between min-h-[120px]">
              <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-background"></div>
              </div>
              <div>
                <div className="text-5xl font-light text-foreground tracking-[-2.4px] max-md:text-4xl">15+</div>
                <div className="text-sm text-muted-foreground">Beauty courses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-[1px] bg-border max-md:hidden"></div>
        <div className="flex-1 max-w-md max-md:max-w-full max-md:mt-6">
          <div className="bg-card border border-border rounded-[var(--radius)] p-6 mb-4">
            <input
              type="text"
              placeholder="Search courses, services, products..."
              className="w-full bg-transparent border-none outline-none text-muted-foreground placeholder-muted-foreground"
            />
          </div>
          <button className="bg-primary text-primary-foreground w-full py-4 px-6 rounded-[var(--radius)] text-xl font-medium tracking-[-1.2px] hover:opacity-90 transition-opacity">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
