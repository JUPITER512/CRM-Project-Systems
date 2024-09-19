import { motion } from 'framer-motion';

const ButtonAnimation = ({ children ,classname =null}) => {
  return (
    <motion.div
      whileTap={{ scale: 1.05}}
      transition={{ type:'tween' , stiffness: 500 }}
      className={classname?classname:''}
    >
      {children}
    </motion.div>
  );
};

export default ButtonAnimation;
