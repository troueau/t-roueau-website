import { motion } from "framer-motion";

const DecorativeLine = () => (
  <svg
    className="fixed inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true">
    <motion.path
      d="M -1 14 C 6 15, 34 34, 40 38 C 46 42, 55 63, 62 68 C 69 73, 94 89, 101 95"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        stroke: "hsl(var(--primary))",
        strokeOpacity: 0.2,
        strokeWidth: 0.35,
      }}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 4,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.8,
      }}
    />
  </svg>
);

export default DecorativeLine;
