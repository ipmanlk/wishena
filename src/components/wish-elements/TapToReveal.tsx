"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface TapToRevealProps {
  isRevealed: boolean;
  onReveal: () => void;
  previewText?: string;
}

export function TapToReveal({
  isRevealed,
  onReveal,
  previewText,
}: TapToRevealProps) {
  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={onReveal}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <Volume2 className="w-16 h-16 mx-auto mb-4 text-white" />
            <p className="text-2xl font-semibold text-white">Tap to Open</p>
            {previewText && (
              <p className="mt-2 text-white/60 text-sm">{previewText}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TapToReveal;
