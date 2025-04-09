import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function notify(type, message) {
  console.log('Notify hívás:', type, message);
  if (type === "success") {
    toast.success(message);  
  } else if (type === "error") {
    toast.error(message);  
  }
}
