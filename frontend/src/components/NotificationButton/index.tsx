import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

import icon from '../../assets/img/notification-icon.svg';
import { BASE_URL } from '../../utils/request';

type Props = {
  saleId: number;
}

function NotificationButton({saleId} : Props) {

  function handleClick(id: number) {
    axios.get(`${BASE_URL}/sales/${id}/notification`)
      .then(response => {
        toast.info("SMS enviado com sucesso!");
      });
  }

  return (
    <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
      <img src={icon} alt="Notifier" />
    </div>
  )
}

export default NotificationButton