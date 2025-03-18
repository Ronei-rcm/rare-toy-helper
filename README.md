# Catálogo de Brinquedos - API REST

Sistema de catálogo de brinquedos implementado com Node.js, MySQL e Sequelize.

## Tecnologias Utilizadas

- Node.js
- MySQL
- Sequelize ORM
- Express.js
- JWT para autenticação
- Swagger para documentação

## Configuração do Ambiente

```bash
# Variáveis de ambiente
DB_HOST=127.0.0.1
DB_USER=re9
DB_PASSWORD=rg51gti66
DB_DATABASE=catalogo_de_brinquedos
PORT=3002
```

## Estrutura do Banco de Dados

### Tabelas Principais

1. **Produtos**
   - Informações dos brinquedos
   - Controle de estoque
   - Preços e descrições

2. **Categorias**
   - Organização dos produtos
   - Relacionamento com produtos

3. **Usuários**
   - Gestão de contas
   - Autenticação JWT
   - Perfis (usuário/admin)

4. **Carrinho**
   - Itens temporários
   - Gestão de quantidades
   - Cálculo de valores

5. **Pedidos**
   - Histórico de compras
   - Status de entrega
   - Itens do pedido

6. **Avaliações**
   - Feedback dos produtos
   - Notas e comentários

## Endpoints da API

### Usuários
- POST `/api/usuarios/registro` - Registro de novo usuário
- POST `/api/usuarios/login` - Login com geração de token
- GET `/api/usuarios/perfil` - Dados do usuário autenticado

### Produtos
- GET `/api/produtos` - Lista todos os produtos
- GET `/api/produtos/:id` - Detalhes de um produto
- POST `/api/produtos` - Adiciona novo produto
- PUT `/api/produtos/:id` - Atualiza produto
- DELETE `/api/produtos/:id` - Remove produto

### Categorias
- GET `/api/categorias` - Lista todas as categorias
- POST `/api/categorias` - Cria nova categoria
- PUT `/api/categorias/:id` - Atualiza categoria
- DELETE `/api/categorias/:id` - Remove categoria

### Carrinho
- GET `/api/carrinho` - Lista itens do carrinho
- POST `/api/carrinho` - Adiciona item ao carrinho
- PUT `/api/carrinho/:id` - Atualiza quantidade
- DELETE `/api/carrinho/:id` - Remove item

### Pedidos
- POST `/api/pedidos` - Cria pedido com itens do carrinho
- GET `/api/pedidos` - Lista pedidos do usuário
- GET `/api/pedidos/:id` - Detalhes do pedido
- PATCH `/api/pedidos/:id/status` - Atualiza status (admin)

### Avaliações
- POST `/api/avaliacoes` - Adiciona avaliação
- GET `/api/avaliacoes/produto/:id` - Lista avaliações do produto

## Funcionalidades Avançadas

1. **Segurança**
   - Autenticação JWT
   - Proteção de rotas
   - Validação de dados
   - Controle de acesso por perfil

2. **Gestão de Estoque**
   - Controle automático
   - Validação na compra
   - Alertas de baixo estoque

3. **Transações**
   - Operações atômicas
   - Rollback em falhas
   - Consistência de dados

4. **Documentação**
   - Swagger UI
   - Endpoints documentados
   - Exemplos de uso

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev

# Acessar documentação
http://localhost:3002/api-docs
```

## Próximos Passos

1. Implementar testes automatizados
2. Adicionar cache com Redis
3. Implementar sistema de notificações
4. Melhorar validações e mensagens de erro
5. Adicionar sistema de busca avançada