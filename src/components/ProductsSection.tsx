import React from 'react';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const products = [
    { name: "Body Butter Care", price: "$20" },
    { name: "Jar Cream Care", price: "$20" },
    { name: "Skincare Tube", price: "$20" },
    { name: "Body Cream Care", price: "$20" },
    { name: "Moisturizer", price: "$20" },
    { name: "Body Perfume", price: "$20" },
  ];

  const productImage = "https://api.builder.io/api/v1/image/assets/fe5d4daf3ac346319170d3171e4e7ace/da20c2afc8ea1d8beddaea90bcb22655a06949a0?placeholderIfAbsent=true";

  return (
    <section className="bg-secondary w-full mt-[90px] px-[70px] py-[90px] max-md:mt-16 max-md:px-5 max-md:py-16">
      {/* Header */}
      <div className="flex gap-12 mb-16 max-md:flex-col max-md:gap-8 max-md:mb-12">
        <div className="flex-1">
          <h2 className="text-foreground text-[64px] font-light leading-tight tracking-[-3.2px] max-md:text-[40px]">
            Discover Your Perfect
            <br />
            Skincare Routine
          </h2>
        </div>
        <div className="flex-1 flex items-end max-md:items-start">
          <p className="text-muted-foreground text-base font-light tracking-[-0.8px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus
            mus.
          </p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={productImage}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
