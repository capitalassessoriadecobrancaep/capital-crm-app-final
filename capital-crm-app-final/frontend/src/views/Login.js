
import React from 'react';
import axios from 'axios';

export default function Login({ onLogin }){
  const [email, setEmail] = React.useState('admin@capital.com.br');
  const [password, setPassword] = React.useState('123456');
  const [error, setError] = React.useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/login', { email, password });
      onLogin(res.data.token);
    }catch(err){
      setError(err?.response?.data?.error || 'Erro ao autenticar');
    }
  };

  return (
    <div className="app">
      <h2>Capital - Login</h2>
      <form onSubmit={submit}>
        <div><label>Email</label></div>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Senha</label></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div style={{marginTop:12}}><button className="button">Entrar</button></div>
        {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
      </form>
    </div>
  );
}
