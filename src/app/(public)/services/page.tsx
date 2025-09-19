import React from 'react'

function Services() {
  return (
    <div>
      {/* Why Choose Our Services */}
          <section className="text-center mb-20">
            <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground mb-8">
              Why Choose Laluna Services?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M13 12h3l2-2-2-2h-3"/>
                    <path d="M11 12H8l-2-2 2-2h3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Certified Professionals</h3>
                <p className="text-muted-foreground text-sm">All our artists are certified and experienced</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <path d="M12 2v20M2 12h20"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Premium Products</h3>
                <p className="text-muted-foreground text-sm">We use only high-quality, professional-grade products</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Flexible Scheduling</h3>
                <p className="text-muted-foreground text-sm">Book appointments that fit your schedule</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Satisfaction Guarantee</h3>
                <p className="text-muted-foreground text-sm">100% satisfaction guarantee on all services</p>
              </div>
            </div>
          </section>
    </div>
  )
}

export default Services
