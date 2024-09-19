import { motion } from "framer-motion";
const animation = {
  inital: { opacity: 0,},
  animate: { opacity: 1},
};
const AnimatePage = ({ children ,duration=1}) => {
  return (
    <motion.div
      transition={{ duration:duration}}
      variants={animation}
      initial="inital"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
