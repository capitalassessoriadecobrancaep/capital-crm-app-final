
import React from 'react';
import axios from 'axios';

export default function Dashboard({ token, onLogout }){
  const [data, setData] = React.useState(null);

  React.useEffect(()=>{
    axios.get('/api/dashboard', { headers: { Authorization: 'Bearer ' + token } })
      .then(r=>setData(r.data))
      .catch(()=>setData(null));
  },[token]);

  return (
    <div className="app">
      <div className="header">
        <h2>Dashboard</h2>
        <div>
          <button className="button" onClick={onLogout}>Sair</button>
        </div>
      </div>

      {!data && <div>Carregando dados...</div>}

      {data && (
        <div>
          <p>Total de clientes: {data.totalClients}</p>
          <p>Títulos em aberto: {data.totalOpenInvoices}</p>
          <p>Valor em atraso: R$ {data.overdueAmountBRL}</p>

          <h3>Movimentações recentes</h3>
          <ul>
            {data.recent.map(it=> <li key={it.id}>{it.name} — {it.value} — venc: {it.due}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
