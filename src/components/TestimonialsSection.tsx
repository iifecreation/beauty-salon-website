import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="self-center w-full max-w-[1300px] mt-[90px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <article className="w-[62%] max-md:w-full max-md:ml-0">
          <div className="w-full max-md:max-w-full max-md:mt-10">
            <h2 className="text-[rgba(31,31,31,1)] text-[64px] font-light leading-[64px] tracking-[-3.2px] max-md:max-w-full max-md:text-[40px] max-md:leading-[44px]">
              Join Thousands
              <br />
              Who Love Their Skin Again
            </h2>
            <p className="text-[rgba(138,138,138,1)] text-base font-light tracking-[-0.8px] mt-6 max-md:max-w-full">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
              mus.
              <br />
              <br />
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo,
              fringilla vel, aliquet nec, vulputate eget, arcu.
            </p>
            <div className="mt-[45px] max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(217,217,217,1)] flex w-[229px] shrink-0 h-[182px] mx-auto rounded-[500px_20px_20px_20px] max-md:mt-10" />
                </div>
                <div className="w-[67%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
                    <h3 className="text-[rgba(31,31,31,1)] text-2xl font-normal leading-none tracking-[-1.2px]">
                      Join to Our Community!
                    </h3>
                    <p className="text-[rgba(138,138,138,1)] text-base font-light tracking-[-0.8px] self-stretch mt-2.5 max-md:max-w-full">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing
                      elit. Aenean commodo ligula eget dolor. Aenean massa.
                      Cum sociis natoque penatibus et magnis.
                    </p>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/fe5d4daf3ac346319170d3171e4e7ace/a838be1a116ea616ca3e2688715a8e731b874929?placeholderIfAbsent=true"
                      className="aspect-[5.92] object-contain w-40 max-w-full mt-[45px] max-md:mt-10"
                      alt="Social media icons"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className="w-[38%] ml-5 max-md:w-full max-md:ml-0">
          <div className="bg-[rgba(217,217,217,1)] flex grow flex-col w-full mt-32 pt-[172px] pb-[45px] rounded-[500px_20px_20px_20px] max-md:max-w-full max-md:mt-10 max-md:pt-[100px]">
            <div className="bg-white border w-full p-6 rounded-[20px] border-[rgba(232,232,232,1)] border-solid max-md:px-5">
              <div className="flex w-full gap-5 justify-between">
                <div className="flex gap-3.5 text-lg text-[rgba(31,31,31,1)] font-medium tracking-[-0.9px]">
                  <div className="bg-[rgba(217,217,217,1)] flex w-8 shrink-0 h-8 mt-1.5 rounded-[5px]" />
                  <div className="basis-auto">
                    Rica Ardana
                  </div>
                </div>
                <div className="text-sm text-[rgba(138,138,138,1)] font-normal tracking-[-0.7px] mt-2">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/fe5d4daf3ac346319170d3171e4e7ace/54e9032de797f2c3608b99faaeb2d28a032d668f?placeholderIfAbsent=true"
                    className="aspect-[5.75] object-contain w-[69px]"
                    alt="5 star rating"
                  />
                  <div>5 (Happy)</div>
                </div>
              </div>
              <div className="flex items-stretch gap-[22px] text-base text-[rgba(138,138,138,1)] font-light tracking-[-0.8px] mt-3.5 max-md:ml-[9px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/fe5d4daf3ac346319170d3171e4e7ace/0003a64b004e90891b247149b5f1f14f88ed0e6a?placeholderIfAbsent=true"
                  className="aspect-[1.36] object-contain w-[15px] shrink-0 mt-[7px]"
                  alt="Quote icon"
                />
                <div className="grow shrink w-[297px] basis-auto">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
