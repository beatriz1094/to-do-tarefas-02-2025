        function render() {
            const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            ['a_fazer','fazendo','pronto'].forEach(status => {
                document.getElementById(status).innerHTML = `<h3>${status.replace('_',' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>`;
            });
            tarefas.forEach(t => {
                const usuario = usuarios.find(u => u.id == t.id_usuario);
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <b>Descrição:</b> ${t.descricao}<br>
                    <b>Setor:</b> ${t.setor}<br>
                    <b>Prioridade:</b> ${t.prioridade}<br>
                    <b>Vinculado a:</b> ${usuario ? usuario.nome : ''}<br>
                    <button onclick="editar(${t.id})">Editar</button>
                    <button onclick="excluir(${t.id})">Excluir</button>
                    <br><b>Alterar status:</b><br>
                    ${t.status !== 'a fazer' ? `<button onclick="alterarStatus(${t.id},'a fazer')">A fazer</button>` : ''}
                    ${t.status !== 'fazendo' ? `<button onclick="alterarStatus(${t.id},'fazendo')">Fazendo</button>` : ''}
                    ${t.status !== 'pronto' ? `<button onclick="alterarStatus(${t.id},'pronto')">Pronto</button>` : ''}
                `;
                document.getElementById(t.status.replace(' ', '_')).appendChild(card);
            });
        }
        function editar(id) {
            // Redireciona para cadastro-tarefas.html com id na querystring
            window.location = 'cadastro-tarefas.html?id=' + id;
        }
        function excluir(id) {
            if (confirm('Deseja excluir esta tarefa?')) {
                let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
                tarefas = tarefas.filter(t => t.id !== id);
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                render();
            }
        }
        function alterarStatus(id, status) {
            let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
            tarefas = tarefas.map(t => t.id === id ? {...t, status} : t);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            render();
        }
        render();