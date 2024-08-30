import { motion } from "framer-motion";
const animation = {
  inital: { opacity: 0,},
  animate: { opacity: 1},
  exit: { opacity: 0, },
};
const AnimatePage = ({ children }) => {
  return (
    <motion.div
      transition={{ duration:1}}
      variants={animation}
      initial="inital"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
