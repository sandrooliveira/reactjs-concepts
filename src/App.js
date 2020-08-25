import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      "title": `Repository ${Date.now()}`,
      "tech": "JS",
      "url": "http://locahostl:8080"
    });

    setRepositories([ ...repositories, data ]);
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const repoIndex = repositories.findIndex(repo => repo.id === id);

      repositories.splice(repoIndex, 1);
      setRepositories([ ...repositories ]);
    });
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
           </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
