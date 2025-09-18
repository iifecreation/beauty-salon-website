import React, { useState, useEffect } from 'react';

const AwardsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const awards = [
    {
      title: "Best Beauty Education Program 2024",
      organization: "International Beauty Association",
      recipient: "Laluna Academy",
      year: "2024",
      description: "Recognized for excellence in comprehensive beauty education and student success rates.",
      category: "Institution Award",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center"
    },
    {
      title: "Excellence in Makeup Artistry Training",
      organization: "Professional Makeup Artists Guild",
      recipient: "Sarah Thompson - Lead Makeup Instructor",
      year: "2024",
      description: "Outstanding contribution to makeup education and student portfolio development.",
      category: "Individual Achievement",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center"
    },
    {
      title: "Innovation in Nail Art Education",
      organization: "International Nail Professionals Association", 
      recipient: "Maria Santos - Nail Art Director",
      year: "2023",
      description: "Pioneering new teaching methods in advanced nail art and design techniques.",
      category: "Individual Achievement",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop&crop=center"
    },
    {
      title: "Outstanding Beauty Training Facility",
      organization: "Beauty Education Council",
      recipient: "Laluna Academy",
      year: "2023", 
      description: "Recognition for state-of-the-art training facilities and equipment.",
      category: "Institution Award",
      image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&h=300&fit=crop&crop=center"
    },
    {
      title: "Educator of the Year - Eyelash Extensions",
      organization: "Lash Artists International",
      recipient: "Jessica Rodriguez - Lash Specialist",
      year: "2023",
      description: "Exceptional training delivery and student certification success in eyelash extensions.",
      category: "Individual Achievement",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop&crop=center"
    },
    {
      title: "Industry Partnership Excellence",
      organization: "Beauty Brands Alliance",
      recipient: "Laluna Academy", 
      year: "2022",
      description: "Outstanding partnerships with leading beauty brands for student opportunities.",
      category: "Institution Award",
      image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=300&h=300&fit=crop&crop=center"
    }
  ];

  // Create infinite loop by duplicating slides
  const extendedAwards = [...awards, ...awards, ...awards];
  const totalSlides = awards.length;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      if (currentSlide + 1 >= totalSlides * 2) {
        setCurrentSlide(totalSlides);
      }
    }, 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      if (currentSlide - 1 < totalSlides) {
        setCurrentSlide(totalSlides * 2 - 1);
      }
    }, 500);
  };

  const goToSlide = (index: any) => {
    if (isTransitioning) return;
    setCurrentSlide(totalSlides + index);
  };

  const getIndicatorIndex = () => {
    return currentSlide % totalSlides;
  };

  return (
    <section className="mb-20">
      <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground mb-12 text-center max-md:text-[32px]">
        Awards & Recognition
      </h2>
      
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="relative h-[400px] max-md:h-[500px]">
          <div 
            className={`flex transition-transform duration-500 ease-in-out h-full ${
              !isTransitioning ? 'transition-none' : ''
            }`}
            style={{ 
              transform: `translateX(-${currentSlide * (100 / 3)}%)`,
              width: `${extendedAwards.length * (100 / 3)}%`
            }}
          >
            {extendedAwards.map((award, index) => (
              <div key={`${award.title}-${index}`} className="w-full flex-shrink-0 px-4">
                <div className="bg-card border border-border rounded-[var(--radius)] p-6 h-full flex flex-col max-md:p-4">
                  <div className="flex items-start gap-6 flex-1 max-md:flex-col max-md:gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 max-md:w-20 max-md:h-20 max-md:mx-auto">
                      <img
                        src={award.image}
                        alt={`${award.title} award`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 max-md:text-center">
                      <div className="flex items-center gap-3 mb-3 max-md:justify-center max-md:flex-wrap">
                        <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                          {award.category}
                        </span>
                        <span className="text-muted-foreground text-sm">{award.year}</span>
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2 max-md:text-lg">{award.title}</h3>
                      <p className="text-primary text-sm font-medium mb-1">{award.organization}</p>
                      <p className="text-foreground text-sm mb-3 max-md:text-xs">{award.recipient}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed max-md:text-xs">{award.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={handlePrevSlide}
          disabled={isTransitioning}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background border border-border rounded-full p-3 hover:bg-accent transition-colors disabled:opacity-50 shadow-lg z-10 max-md:-translate-x-2"
          aria-label="Previous award"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button 
          onClick={handleNextSlide}
          disabled={isTransitioning}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background border border-border rounded-full p-3 hover:bg-accent transition-colors disabled:opacity-50 shadow-lg z-10 max-md:translate-x-2"
          aria-label="Next award"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {awards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-colors disabled:opacity-50 ${
                getIndicatorIndex() === index ? 'bg-primary' : 'bg-border hover:bg-border/70'
              }`}
              aria-label={`Go to award ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSlider;