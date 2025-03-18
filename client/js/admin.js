// Gerenciamento do painel administrativo
class AdminPanel {
    static async fetchAPI(endpoint, options = {}) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login.html';
                return;
            }

            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            // Mesclar headers corretamente
            const mergedOptions = {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...(options.headers || {})
                }
            };

            const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login.html';
                    return;
                }
                throw new Error(data.message || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Gerenciamento de Produtos
    static async loadProdutos() {
        try {
            const produtos = await this.fetchAPI('/produtos');
            const categorias = await this.fetchAPI('/categorias');
            
            // Preencher select de categorias
            const selectCategoria = document.getElementById('produtoCategoria');
            selectCategoria.innerHTML = categorias.map(cat => 
                `<option value="${cat.id}">${cat.nome}</option>`
            ).join('');

            // Preencher tabela de produtos
            const tbody = document.querySelector('#produtosTable tbody');
            tbody.innerHTML = produtos.map(prod => `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nome}</td>
                    <td>${categorias.find(c => c.id === prod.categoria_id)?.nome || ''}</td>
                    <td>R$ ${prod.preco.toFixed(2)}</td>
                    <td>${prod.estoque}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="AdminPanel.editarProduto(${prod.id})">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="AdminPanel.excluirProduto(${prod.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            alert('Erro ao carregar produtos: ' + error.message);
        }
    }

    static async salvarProduto() {
        try {
            const id = document.getElementById('produtoId').value;
            const produto = {
                nome: document.getElementById('produtoNome').value,
                descricao: document.getElementById('produtoDescricao').value,
                categoria_id: parseInt(document.getElementById('produtoCategoria').value),
                preco: parseFloat(document.getElementById('produtoPreco').value),
                estoque: parseInt(document.getElementById('produtoEstoque').value),
                imagem_url: document.getElementById('produtoImagem').value
            };

            // Validações
            if (!produto.nome) throw new Error('Nome é obrigatório');
            if (!produto.categoria_id) throw new Error('Categoria é obrigatória');
            if (isNaN(produto.preco) || produto.preco <= 0) throw new Error('Preço deve ser maior que zero');
            if (isNaN(produto.estoque) || produto.estoque < 0) throw new Error('Estoque não pode ser negativo');

            const response = await this.fetchAPI(`/produtos${id ? `/${id}` : ''}`, {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify(produto)
            });

            if (response) {
                bootstrap.Modal.getInstance(document.getElementById('produtoModal')).hide();
                await this.loadProdutos();
                alert(id ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
            }
        } catch (error) {
            alert('Erro ao salvar produto: ' + error.message);
        }
    }

    static async editarProduto(id) {
        try {
            const produto = await this.fetchAPI(`/produtos/${id}`);
            document.getElementById('produtoId').value = produto.id;
            document.getElementById('produtoNome').value = produto.nome;
            document.getElementById('produtoDescricao').value = produto.descricao;
            document.getElementById('produtoCategoria').value = produto.categoria_id;
            document.getElementById('produtoPreco').value = produto.preco;
            document.getElementById('produtoEstoque').value = produto.estoque;
            document.getElementById('produtoImagem').value = produto.imagem_url;

            new bootstrap.Modal(document.getElementById('produtoModal')).show();
        } catch (error) {
            alert('Erro ao carregar produto: ' + error.message);
        }
    }

    static async excluirProduto(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await this.fetchAPI(`/produtos/${id}`, { method: 'DELETE' });
                this.loadProdutos();
            } catch (error) {
                alert('Erro ao excluir produto: ' + error.message);
            }
        }
    }

    // Gerenciamento de Categorias
    static async loadCategorias() {
        try {
            const categorias = await this.fetchAPI('/categorias');
            const tbody = document.querySelector('#categoriasTable tbody');
            tbody.innerHTML = categorias.map(cat => `
                <tr>
                    <td>${cat.id}</td>
                    <td>${cat.nome}</td>
                    <td>${cat.descricao || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="AdminPanel.editarCategoria(${cat.id})">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="AdminPanel.excluirCategoria(${cat.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            alert('Erro ao carregar categorias: ' + error.message);
        }
    }

    static async salvarCategoria() {
        try {
            const id = document.getElementById('categoriaId').value;
            const categoria = {
                nome: document.getElementById('categoriaNome').value.trim(),
                descricao: document.getElementById('categoriaDescricao').value.trim()
            };

            // Validações
            if (!categoria.nome) {
                throw new Error('Nome da categoria é obrigatório');
            }

            const response = await this.fetchAPI(`/categorias${id ? `/${id}` : ''}`, {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify(categoria)
            });

            if (response) {
                bootstrap.Modal.getInstance(document.getElementById('categoriaModal')).hide();
                await this.loadCategorias();
                await this.loadProdutos(); // Recarregar produtos para atualizar os selects de categoria
                alert(id ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
            alert('Erro ao salvar categoria: ' + error.message);
        }
    }

    static async editarCategoria(id) {
        try {
            const categoria = await this.fetchAPI(`/categorias/${id}`);
            document.getElementById('categoriaId').value = categoria.id;
            document.getElementById('categoriaNome').value = categoria.nome;
            document.getElementById('categoriaDescricao').value = categoria.descricao;

            new bootstrap.Modal(document.getElementById('categoriaModal')).show();
        } catch (error) {
            alert('Erro ao carregar categoria: ' + error.message);
        }
    }

    static async excluirCategoria(id) {
        if (confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                await this.fetchAPI(`/categorias/${id}`, { method: 'DELETE' });
                this.loadCategorias();
            } catch (error) {
                alert('Erro ao excluir categoria: ' + error.message);
            }
        }
    }

    // Gerenciamento de Pedidos
    static async loadPedidos() {
        try {
            const pedidos = await this.fetchAPI('/pedidos');
            const tbody = document.querySelector('#pedidosTable tbody');
            tbody.innerHTML = pedidos.map(ped => `
                <tr>
                    <td>${ped.id}</td>
                    <td>${ped.Usuario.nome}</td>
                    <td>${new Date(ped.createdAt).toLocaleDateString()}</td>
                    <td>
                        <select class="form-select form-select-sm" onchange="AdminPanel.atualizarStatusPedido(${ped.id}, this.value)">
                            <option value="pendente" ${ped.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                            <option value="confirmado" ${ped.status === 'confirmado' ? 'selected' : ''}>Confirmado</option>
                            <option value="enviado" ${ped.status === 'enviado' ? 'selected' : ''}>Enviado</option>
                            <option value="entregue" ${ped.status === 'entregue' ? 'selected' : ''}>Entregue</option>
                            <option value="cancelado" ${ped.status === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                        </select>
                    </td>
                    <td>R$ ${ped.valor_total.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="AdminPanel.verDetalhesPedido(${ped.id})">
                            Detalhes
                        </button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            alert('Erro ao carregar pedidos: ' + error.message);
        }
    }

    static async atualizarStatusPedido(id, status) {
        try {
            await this.fetchAPI(`/pedidos/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });
            this.loadPedidos();
        } catch (error) {
            alert('Erro ao atualizar status do pedido: ' + error.message);
        }
    }

    // Gerenciamento de Usuários
    static async loadUsuarios() {
        try {
            const usuarios = await this.fetchAPI('/usuarios');
            const tbody = document.querySelector('#usuariosTable tbody');
            tbody.innerHTML = usuarios.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.tipo}</td>
                    <td>
                        <span class="badge ${user.ativo ? 'bg-success' : 'bg-danger'}">
                            ${user.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="AdminPanel.editarUsuario(${user.id})">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-${user.ativo ? 'danger' : 'success'}" 
                                onclick="AdminPanel.toggleUsuarioStatus(${user.id}, ${!user.ativo})">
                            ${user.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            alert('Erro ao carregar usuários: ' + error.message);
        }
    }

    static async salvarUsuario() {
        const id = document.getElementById('usuarioId').value;
        const usuario = {
            nome: document.getElementById('usuarioNome').value,
            email: document.getElementById('usuarioEmail').value,
            tipo: document.getElementById('usuarioTipo').value,
            ativo: document.getElementById('usuarioAtivo').checked
        };

        const senha = document.getElementById('usuarioSenha').value;
        if (senha) {
            usuario.senha = senha;
        }

        try {
            if (id) {
                await this.fetchAPI(`/usuarios/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(usuario)
                });
            } else {
                await this.fetchAPI('/usuarios', {
                    method: 'POST',
                    body: JSON.stringify(usuario)
                });
            }

            bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
            this.loadUsuarios();
        } catch (error) {
            alert('Erro ao salvar usuário: ' + error.message);
        }
    }

    static async editarUsuario(id) {
        try {
            const usuario = await this.fetchAPI(`/usuarios/${id}`);
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('usuarioNome').value = usuario.nome;
            document.getElementById('usuarioEmail').value = usuario.email;
            document.getElementById('usuarioTipo').value = usuario.tipo;
            document.getElementById('usuarioAtivo').checked = usuario.ativo;
            document.getElementById('usuarioSenha').value = '';

            new bootstrap.Modal(document.getElementById('usuarioModal')).show();
        } catch (error) {
            alert('Erro ao carregar usuário: ' + error.message);
        }
    }

    static async toggleUsuarioStatus(id, ativo) {
        try {
            await this.fetchAPI(`/usuarios/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ ativo })
            });
            this.loadUsuarios();
        } catch (error) {
            alert('Erro ao atualizar status do usuário: ' + error.message);
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navegação entre seções
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.dataset.section;
            
            // Esconder todas as seções
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.add('d-none');
            });
            
            // Mostrar seção alvo
            document.getElementById(`${targetSection}Section`).classList.remove('d-none');
            
            // Carregar dados da seção
            AdminPanel[`load${targetSection.charAt(0).toUpperCase() + targetSection.slice(1)}`]();
        });
    });

    // Botões de salvar
    document.getElementById('salvarProduto').addEventListener('click', () => AdminPanel.salvarProduto());
    document.getElementById('salvarCategoria').addEventListener('click', () => AdminPanel.salvarCategoria());
    document.getElementById('salvarUsuario').addEventListener('click', () => AdminPanel.salvarUsuario());

    // Limpar formulários ao abrir modais
    ['produto', 'categoria', 'usuario'].forEach(tipo => {
        document.getElementById(`${tipo}Modal`).addEventListener('show.bs.modal', (e) => {
            if (!e.relatedTarget) return; // Não limpar quando abrir para edição
            document.getElementById(`${tipo}Id`).value = '';
            document.getElementById(`${tipo}Form`).reset();
        });
    });

    // Carregar dados iniciais
    AdminPanel.loadProdutos();
});
