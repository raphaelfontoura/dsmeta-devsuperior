import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import NotificationButton from '../NotificationButton';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Sale } from '../../models/sale';


function SalesCard() {

  const minDate = (new Date().setDate(new Date().getDate() - 365));
  const maxDate = new Date();

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/sales`)
      .then(response => {
        setSales(response.data.content);
      })
  }, [])


  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale =>
              <tr>
                <td className="show992">#{sale.id}</td>
                <td className="show576">{sale.date}</td>
                <td>{sale.sellerName}</td>
                <td className="show992">{sale.visited}</td>
                <td className="show992">{sale.deals}</td>
                <td>R$ {sale.amount}</td>
                <td>
                  <div className="dsmeta-red-btn-container">
                    <NotificationButton />
                  </div>
                </td>
              </tr>
            )}


          </tbody>

        </table>
      </div>
    </div>

  )
}

export default SalesCard