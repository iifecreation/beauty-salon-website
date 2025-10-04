
import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div className="w-full max-w-sm bg-background rounded-[30px] p-3 group hover:shadow-lg transition-shadow">
      {/* Image Wrapper */}
      <div className="relative aspect-square rounded-[24px] overflow-hidden bg-accent">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 396 399"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <clipPath id="productCardClip">
              <path d="M236 0C258.091 0 276 17.9086 276 40V80C276 102.091 293.909 120 316 120H356C378.091 120 396 137.909 396 160V359C396 381.091 378.091 399 356 399H40C17.9086 399 0 381.091 0 359V40C0 17.9086 17.9086 0 40 0H236Z" />
            </clipPath>
          </defs>

          {/* Image inside clipPath */}
          <foreignObject
            width="396"
            height="399"
            clipPath="url(#productCardClip)"
          >
            <Image
              src="https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg"
              alt={name}
              width={396}
              height={399}
              className="w-full h-full object-cover"
            />
          </foreignObject>
        </svg>

        {/* Arrow Icon (top-right corner) */}
        <div className="absolute top-3 right-3 bg-background/80 rounded-full p-2">
          <ArrowUpRight className="w-5 h-5 text-foreground" />
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 bg-background border border-border rounded-[20px] p-4 flex items-center justify-between">
        <div>
          <div className="text-foreground text-lg font-medium">{name}</div>
          <div className="text-foreground">Body Lotion Skincare</div>
        </div>
        <div className="text-foreground text-xl font-semibold">{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
