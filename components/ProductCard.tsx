'use client';

import { motion } from 'framer-motion';
import { CoffeeProduct } from '@/data/products';
import { useState } from 'react';

interface ProductCardProps {
    product: CoffeeProduct;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: isHovering ? 1.02 : 1
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="group relative bg-gradient-to-br from-[#3D2418]/90 via-[#2D1810]/90 to-[#3D2418]/90 rounded-2xl overflow-hidden backdrop-blur-sm border border-amber-900/20 hover:border-amber-500/40 transition-all duration-500"
            >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-shimmer" />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A574]/0 via-[#4F9C8F]/20 to-[#D4A574]/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -z-10" />

                <div className="relative z-10 p-6">
                    {/* Star Rating */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <span className="text-[#FFD700] text-lg">★</span>
                        <span className="text-[#F5E6D3] font-semibold text-sm">{product.rating}</span>
                    </motion.div>

                    {/* Coffee Image */}
                    <div className="w-full h-56 bg-[#2D1810] rounded-xl mb-5 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-playfair font-bold text-[#F5E6D3] mb-3">
                        {product.name}
                    </h3>
                    <p className="text-sm text-[#C9B8A0] mb-5 line-clamp-2 font-inter">
                        {product.description}
                    </p>

                    {/* Price & Add Button */}
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-[#F5E6D3] font-inter">
                            {product.price}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] flex items-center justify-center hover:shadow-lg hover:shadow-[#4F9C8F]/40 transition-shadow"
                        >
                            <span className="text-white text-2xl font-bold">+</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
