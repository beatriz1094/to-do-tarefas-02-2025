        document.getElementById('formUsuario').onsubmit = function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            if (!nome || !email || !email.includes('@')) {
                alert('Preencha todos os campos corretamente!');
                return;
            }
            let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push({ id: Date.now(), nome, email });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            document.getElementById('msg').innerText = 'Cadastro concluído com sucesso';
            this.reset();
        }