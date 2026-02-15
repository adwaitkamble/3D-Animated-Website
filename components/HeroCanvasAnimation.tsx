'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const TOTAL_FRAMES = 80; // Updated to match your 80 frames
const FRAME_PATH = '/frames'; // Folder containing frame_001.jpg to frame_080.jpg

export default function HeroCanvasAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    // Smooth spring animation for buttery scroll
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001
    });

    // Anti-gravity effect based on scroll velocity
    const scrollVelocity = useVelocity(scrollYProgress);
    const yOffset = useTransform(
        scrollVelocity,
        [-1, 0, 1],
        [10, 0, -10] // Floats up when scrolling down
    );

    // Map scroll to frame index (bi-directional)
    const frameIndex = useTransform(
        smoothProgress,
        [0, 1],
        [0, TOTAL_FRAMES - 1]
    );

    // Preload all frames
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const frameNum = String(i + 1).padStart(3, '0');
                    img.src = `${FRAME_PATH}/ezgif-frame-${frameNum}.jpg`;
                    img.onload = () => {
                        setLoadProgress((prev) => prev + (100 / TOTAL_FRAMES));
                        resolve(img);
                    };
                    img.onerror = reject;
                });
            });

            const loadedImages = await Promise.all(imagePromises);
            setImages(loadedImages);
            setImagesLoaded(true);
        };

        loadImages();
    }, []);

    // Canvas rendering
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const renderFrame = () => {
            const currentFrame = Math.round(frameIndex.get());
            const img = images[Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1))];

            if (img && img.complete && img.naturalHeight !== 0) {
                // Get actual viewport dimensions
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const dpr = window.devicePixelRatio || 1;

                // Set canvas display size (CSS)
                canvas.style.width = `${viewportWidth}px`;
                canvas.style.height = `${viewportHeight}px`;

                // Set canvas internal size (scaled for retina)
                canvas.width = viewportWidth * dpr;
                canvas.height = viewportHeight * dpr;

                // Reset transform and scale context to match device pixel ratio
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);

                // Calculate cover-fit scaling (fills entire canvas, may crop)
                const imgAspect = img.width / img.height;
                const canvasAspect = viewportWidth / viewportHeight;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (imgAspect > canvasAspect) {
                    // Image is wider - fit to height
                    drawHeight = viewportHeight;
                    drawWidth = img.width * (viewportHeight / img.height);
                    offsetX = (viewportWidth - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    // Image is taller - fit to width
                    drawWidth = viewportWidth;
                    drawHeight = img.height * (viewportWidth / img.width);
                    offsetX = 0;
                    offsetY = (viewportHeight - drawHeight) / 2;
                }

                // Clear and draw
                ctx.clearRect(0, 0, viewportWidth, viewportHeight);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const unsubscribe = frameIndex.on('change', renderFrame);
        renderFrame(); // Initial render

        // Handle window resize
        const handleResize = () => renderFrame();
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [imagesLoaded, images, frameIndex]);

    // Text overlay animations - Spread out more to show animation better
    const section1Opacity = useTransform(smoothProgress, [0, 0.05, 0.18, 0.22], [0, 1, 1, 0]);
    const section2Opacity = useTransform(smoothProgress, [0.3, 0.33, 0.43, 0.47], [0, 1, 1, 0]);
    const section3Opacity = useTransform(smoothProgress, [0.55, 0.58, 0.68, 0.72], [0, 1, 1, 0]);
    const section4Opacity = useTransform(smoothProgress, [0.8, 0.83, 0.93, 0.97], [0, 1, 1, 0]);

    // Parallax effects for text overlays (creates depth)
    const parallax1 = useTransform(smoothProgress, [0, 0.25], [0, -50]);
    const parallax2 = useTransform(smoothProgress, [0.25, 0.5], [50, -30]);
    const parallax3 = useTransform(smoothProgress, [0.5, 0.75], [30, -40]);
    const parallax4 = useTransform(smoothProgress, [0.75, 1], [40, 0]);

    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);

    // Scroll progress bar width
    const progressBarWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

    if (!imagesLoaded) {
        return (
            <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50">
                <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${loadProgress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <p className="text-amber-100/70 text-lg font-['Inter']">
                    Loading Experience... {Math.round(loadProgress)}%
                </p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-[600vh]">
            <div className="sticky top-0 h-screen w-screen overflow-hidden bg-[#1A0F0A]">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />

                {/* Scroll Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-900/20 z-50">
                    <motion.div
                        style={{ width: progressBarWidth }}
                        className="h-full bg-gradient-to-r from-[#D4A574] via-[#4F9C8F] to-[#D4A574] shadow-lg shadow-amber-500/50"
                    />
                </div>

                {/* Vignette gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none z-[5]" />

                {/* Text Overlays - Position above canvas */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Section 1: Center */}
                    <motion.div
                        style={{ opacity: section1Opacity, y: parallax1 }}
                        className="absolute inset-0 flex items-center justify-center text-center px-4"
                    >
                        <div className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold text-amber-50 mb-4 tracking-tight drop-shadow-2xl">
                                Experience Coffee
                            </h1>
                            <p className="text-xl md:text-2xl text-amber-100/90 font-inter drop-shadow-lg">
                                Where every sip defies gravity
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 2: Left side */}
                    <motion.div
                        style={{ opacity: section2Opacity, y: parallax2 }}
                        className="absolute inset-0 flex items-center justify-start px-8 md:px-16"
                    >
                        <div className="max-w-2xl backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-semibold text-amber-50 mb-3 drop-shadow-2xl">
                                Crafted to Perfection
                            </h2>
                            <p className="text-lg md:text-xl text-amber-100/80 font-inter drop-shadow-lg">
                                From bean to cup, excellence floats in every drop
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 3: Right side */}
                    <motion.div
                        style={{ opacity: section3Opacity, y: parallax3 }}
                        className="absolute inset-0 flex items-center justify-end px-8 md:px-16"
                    >
                        <div className="max-w-2xl backdrop-blur-sm bg-black/20 p-8 rounded-2xl text-right">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-semibold text-amber-50 mb-3 drop-shadow-2xl">
                                Anti-Gravity Flavor
                            </h2>
                            <p className="text-lg md:text-xl text-amber-100/80 font-inter drop-shadow-lg">
                                Defying expectations, elevating taste beyond limits
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 4: Center bottom */}
                    <motion.div
                        style={{ opacity: section4Opacity, y: parallax4 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                        <div className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-amber-50 mb-6 drop-shadow-2xl">
                                Discover Your Blend
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl pointer-events-auto hover:shadow-[#4F9C8F]/50 transition-all"
                            >
                                Explore Collection ↓
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <p className="text-amber-100/60 text-sm font-['Inter'] tracking-wider uppercase">
                        Scroll to Explore
                    </p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-amber-100/40 rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-3 bg-amber-100/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
