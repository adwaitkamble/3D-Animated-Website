'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] to-[#2D1810]" />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F9C8F]/20 rounded-full blur-3xl"
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6"
                >
                    Find the Perfect Coffee for You
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-[#C9B8A0] mb-12 font-['Inter']"
                >
                    Experience the art of coffee craftsmanship
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn relative px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold overflow-hidden transition-all duration-300"
                >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#4F9C8F] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                    {/* Pulsing outer glow */}
                    <div className="absolute -inset-1 bg-[#4F9C8F]/50 rounded-full blur-lg opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse" />

                    <span className="relative z-10 flex items-center gap-2">
                        Explore Full Menu
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </span>
                </motion.button>

                {/* Decorative Sparkle */}
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="mt-12 text-[#D4A574] text-4xl"
                >
                    ✦
                </motion.div>
            </div>
        </section>
    );
}
