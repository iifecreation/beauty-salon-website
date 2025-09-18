import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div className="bg-background rounded-[50px] p-4 group hover:shadow-lg transition-shadow">
      {/* Product Image Placeholder */}
      <div className="bg-accent aspect-square rounded-[40px] mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 w-8 h-8 border border-foreground rounded-lg flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m7 17 10-10M7 7h10v10"/>
          </svg>
        </div>
        {/* You can replace this with actual product image */}
        <div className="w-32 h-32 bg-secondary rounded-full"></div>
      </div>
      
      {/* Product Info */}
      <div className="bg-background border border-border rounded-[30px] p-6 flex items-center justify-between">
        <div className="text-foreground text-[28px] font-medium tracking-[-1.4px]">
          {name}
        </div>
        <div className="text-foreground text-[42px] font-light tracking-[-2.1px]">
          {price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
