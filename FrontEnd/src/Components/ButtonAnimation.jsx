import { motion } from 'framer-motion';

const ButtonAnimation = ({ children ,classname =null}) => {
  return (
    <motion.div
      whileTap={{ scale: 1.05}}
      transition={{ type:'tween' , stiffness: 200 }}
      className={classname?classname:''}
    >
      {children}
    </motion.div>
  );
};

export default ButtonAnimation;
