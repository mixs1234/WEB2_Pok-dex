// components/PokeButton.jsx
import React, { useState } from 'react';
import { motion, easeOut } from 'framer-motion';

export function PokeButton({ children, onClick, disabled = false, bgColor = '#FF0000' }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e) => {
        if (!disabled) {
            setIsClicked(true);
            onClick(e);
            setTimeout(() => setIsClicked(false), 1000);
        }
    };

    const handleHoverStart = () => {
        if (!disabled) setIsAnimating(true);
    };

    const handleHoverEnd = () => {
        if (!disabled) setIsAnimating(false);
    };

    return (
        <motion.div
            className="ml-4 mb-4 flex"
            whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
                filter: `drop-shadow(0px 0px 40px ${bgColor})`,
            }}
            transition={{ bounce: 0 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            initial={{ filter: 'drop-shadow(0px 0px 0px white)' }}
        >
            <motion.button
                onClick={handleClick}
                disabled={disabled}
                className={`relative w-32 h-32 rounded-full overflow-hidden shadow-md ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            >
                {/* Top Semi-Circle */}
                <motion.div
                    animate={
                        isAnimating
                            ? {
                                y: -32,
                                transition: { duration: 0.4, ease: easeOut },
                            }
                            : undefined
                    }
                    transition={{ bounce: 0 }}
                    className={`absolute top-0 left-0 w-full h-1/2 rounded-t-full border-2 border-black ${disabled ? 'bg-gray-300' : 'bg-red-600'}`}
                ></motion.div>

                {/* Bottom Semi-Circle */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-2 border-black"></div>

                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-black"></div>

                {/* Text (Next/Previous) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white font-semibold text-base"
                    animate={
                        isAnimating
                            ? {
                                y: -30,
                                opacity: 1,
                                transition: { duration: 0.3, ease: easeOut },
                            }
                            : { y: 0, opacity: 0 }
                    }
                    initial={{ y: 0, opacity: 0 }}
                    transition={{ bounce: 0 }}
                >
                    {children}
                </motion.div>

                {/* Red Pulse Effect on Click */}
                {isClicked && !disabled && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-red-500 opacity-0"
                        animate={{
                            scale: [0, 0.2, 0.4],
                            opacity: [0.8, 0.4, 0],
                            transition: { duration: 1, ease: easeOut },
                        }}
                        onAnimationComplete={() => setIsClicked(false)}
                    />
                )}
            </motion.button>
        </motion.div>
    );
}

