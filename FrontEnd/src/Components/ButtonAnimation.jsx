import { motion } from 'framer-motion';

const ButtonAnimation = ({ children ,classname =null}) => {
  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      transition={{ type:'tween' , stiffness: 500 }}
      className={classname?classname:''}
    >
      {children}
    </motion.div>
  );
};

export default ButtonAnimation;
