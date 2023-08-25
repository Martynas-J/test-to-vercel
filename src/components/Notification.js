import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message }) => {
  return (
    <ToastContainer position="bottom-right" autoClose={5000} closeOnClick pauseOnHover>
      {message && toast.info(message)}
    </ToastContainer>
  );
};

export default Notification;
