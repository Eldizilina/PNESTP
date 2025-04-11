import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/teste')
      .then(res => setMensagem(res.data.mensagem))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>{mensagem || 'Carregando...'}</h1>
    </div>
  );
}

export default App;
