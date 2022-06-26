import { useSelector } from "react-redux";

const Notification = () => {
  const { text, isError } = useSelector((state) => {
    return state.notification;
  });
  if (!text) {
    return null;
  } else if (isError === true) {
    return <div className="error">{text}</div>;
  }
  return <div className="success">{text}</div>;
};

export default Notification;
