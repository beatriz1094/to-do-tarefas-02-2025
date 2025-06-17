// Preenche usuários
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioSelect = document.getElementById('usuario');
        usuarios.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = u.nome;
            usuarioSelect.appendChild(opt);
        });

        document.getElementById('formTarefa').onsubmit = function(e) {
            e.preventDefault();
            const descricao = document.getElementById('descricao').value.trim();
            const setor = document.getElementById('setor').value.trim();
            const id_usuario = document.getElementById('usuario').value;
            const prioridade = document.getElementById('prioridade').value;
            if (!descricao || !setor || !id_usuario || !prioridade) {
                alert('Preencha todos os campos!');
                return;
            }
            let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
            tarefas.push({
                id: Date.now(),
                id_usuario,
                descricao,
                setor,
                prioridade,
                data_cadastro: new Date().toISOString(),
                status: 'a fazer'
            });
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            document.getElementById('msg').innerText = 'Cadastro concluído com sucesso';
            this.reset();
        }