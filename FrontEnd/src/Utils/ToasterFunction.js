import { toast } from 'react-toastify';

const notify = ({ type, message ,position,autocloseTime,theme}) => {
  switch (type) {
    case 'success':
      return toast.success(message,{
        position:position,
        autoClose:autocloseTime,
        theme:theme
      });
    case 'error':
      return toast.error(message,{
        position:position,
        autoClose:autocloseTime,
        theme:theme
      });
    case 'info':
      return toast.info(message,{
        position:position,
        autoClose:autocloseTime,
        theme:theme
      });
    case 'warning':
      return toast.warning(message,{
        position:position,
        autoClose:autocloseTime,
        theme:theme
      });
    default:
      return toast(message); 
  }
};

export default notify;
