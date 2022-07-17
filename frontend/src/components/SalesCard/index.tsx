import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Sale } from '../../models/sale';
import { BASE_URL } from '../../utils/request';
import NotificationButton from '../NotificationButton';


function SalesCard() {

  const maxDate = new Date();
  const minDate = new Date(new Date().setDate(new Date().getDate() - 365));

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {

    const initialDate = startDate.toISOString().split("T")[0];
    const finDate = endDate.toISOString().split("T")[0];

    axios.get(`${BASE_URL}/sales?minDate=${initialDate}&maxDate=${finDate}`)
      .then(response => {
        setSales(response.data.content);
      })
  }, [startDate, endDate]);


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
                <td className="show576">{new Date(sale.date).toLocaleDateString("pt-BR")}</td>
                <td>{sale.sellerName}</td>
                <td className="show992">{sale.visited}</td>
                <td className="show992">{sale.deals}</td>
                <td>R$ {sale.amount.toFixed(2)}</td>
                <td>
                  <div className="dsmeta-red-btn-container">
                    <NotificationButton saleId={sale.id}/>
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