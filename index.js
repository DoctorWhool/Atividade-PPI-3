import express from 'express';

const app = express();
const porta = 3000;
const host = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));

var listaEmpresa = [];

function Menu(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Menu Principal</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background-color: #e3f2fd; }
                    .navbar { background-color: #0d6efd; }
                    .navbar-brand, .nav-link { color: #fff !important; }
                </style>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Menu</a>
                        <div>
                            <a class="nav-link" href="/cadastroEmpresa">Cadastrar Empresa</a>
                        </div>
                    </div>
                </nav>
            </body>
        </html>
    `);
}

function cadastrarEmpresa(req, resp) {
    resp.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Empresa</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #e3f2fd;
                        font-family: 'Arial', sans-serif;
                    }
                    h1 {
                        color: #0d6efd;
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .container {
                        max-width: 3000px;
                        height: 1000px;
                        margin: auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 15px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    }
                    .form-label {
                        font-weight: bold;
                        color: #495057;
                    }
                    .form-control {
                        border-radius: 10px;
                    }
                    .btn-primary {
                        background-color: #0d6efd;
                        border: none;
                        padding: 10px 25px;
                        font-size: 16px;
                        border-radius: 8px;
                    }
                    .btn-primary:hover {
                        background-color: #0b5ed7;
                    }
                    footer {
                        text-align: center;
                        margin-top: 30px;
                        color: #6c757d;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Cadastro de Empresa</h1>
                    <form method="POST" action="/cadastroEmpresa" class="row g-3">
                        <div class="col-md-6">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="Digite o CNPJ">
                        </div>
                        <div class="col-md-6">
                            <label for="razao_social" class="form-label">Razão Social</label>
                            <input type="text" class="form-control" id="razao_social" name="razao_social" placeholder="Exemplo: Moraes & Irmãos Ltda">
                        </div>
                        <div class="col-md-6">
                            <label for="nome_fantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" class="form-control" id="nome_fantasia" name="nome_fantasia" placeholder="Exemplo: Loja do 1,99">
                        </div>
                        <div class="col-md-6">
                            <label for="endereco" class="form-label">Endereço</label>
                            <textarea class="form-control" id="endereco" name="endereco" rows="2" placeholder="Rua, número, bairro"></textarea>
                        </div>
                        <div class="col-md-4">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade">
                        </div>
                        <div class="col-md-2">
                            <label for="uf" class="form-label">UF</label>
                            <input type="text" class="form-control" id="uf" name="uf" maxlength="2">
                        </div>
                        <div class="col-md-4">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" name="cep" placeholder="XXXXX-XXX">
                        </div>
                        <div class="col-md-6">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" name="email">
                        </div>
                        <div class="col-md-6">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX">
                        </div>
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-primary mt-4">Cadastrar</button>
                        </div>
                    </form>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>
    `);
}

function cadastraEmpresa(req, resp) {
    const cnpj = req.body.cnpj;
    const razao_social = req.body.razao_social;
    const nome_fantasia = req.body.nome_fantasia;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const cep = req.body.cep;
    const email = req.body.email;
    const telefone = req.body.telefone;

    if(cnpj && razao_social && nome_fantasia && endereco && cidade && uf && cep && email && telefone){

        const empresa = { cnpj, razao_social, nome_fantasia, endereco, cidade, uf, cep, email, telefone };

        listaEmpresa.push(empresa);

        resp.send(`
            <html>
                <head>
                    <title>Lista de Empresas</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                    <style>
                        body { background-color: #f1f1f1; }
                        table { margin: auto; width: 90%; margin-top: 20px; border-collapse: collapse; }
                        th, td { padding: 12px; border-bottom: 1px solid #ddd; }
                        th { background-color: #0d6efd; color: #fff; text-align: center; }
                        td { text-align: center; }
                    </style>
                </head>
                <body>
                    <h1 class="text-center mt-4">Empresas Cadastradas</h1>
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Razão Social</th>
                                <th>Nome Fantasia</th>
                                <th>Endereço</th>
                                <th>Cidade</th>
                                <th>UF</th>
                                <th>CEP</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaEmpresa.map(empresa => `
                                <tr>
                                    <td>${empresa.cnpj}</td>
                                    <td>${empresa.razao_social}</td>
                                    <td>${empresa.nome_fantasia}</td>
                                    <td>${empresa.endereco}</td>
                                    <td>${empresa.cidade}</td>
                                    <td>${empresa.uf}</td>
                                    <td>${empresa.cep}</td>
                                    <td>${empresa.email}</td>
                                    <td>${empresa.telefone}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="text-center mt-4">
                        <a href="/cadastroEmpresa" class="btn btn-primary">Continuar Cadastrando</a>
                        <a href="/" class="btn btn-secondary">Voltar ao Menu</a>
                    </div>
                </body>
            </html>
        `);
    }
    else{
        resp.write(`
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Empresa</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #e3f2fd;
                        font-family: 'Arial', sans-serif;
                    }
                    h1 {
                        color: #0d6efd;
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .container {
                        max-width: 3000px;
                        height: 1000px;
                        margin: auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 15px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    }
                    .form-label {
                        font-weight: bold;
                        color: #495057;
                    }
                    .form-control {
                        border-radius: 10px;
                    }
                    .btn-primary {
                        background-color: #0d6efd;
                        border: none;
                        padding: 10px 25px;
                        font-size: 16px;
                        border-radius: 8px;
                    }
                    .btn-primary:hover {
                        background-color: #0b5ed7;
                    }
                    footer {
                        text-align: center;
                        margin-top: 30px;
                        color: #6c757d;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Cadastro de Empresa</h1>
                    <form method="POST" action="/cadastroEmpresa" class="row g-3">
                        <div class="col-md-6">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="Digite o CNPJ" value="${cnpj}">
        `);
        if(!cnpj){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe o CNPJ</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-6">
            <label for="razao_social" class="form-label">Razão Social</label>
            <input type="text" class="form-control" id="razao_social" name="razao_social" placeholder="Exemplo: Moraes & Irmãos Ltda" value="${razao_social}">
        `);
        if(!razao_social){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe a Razão Social</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-6">
            <label for="nome_fantasia" class="form-label">Nome Fantasia</label>
            <input type="text" class="form-control" id="nome_fantasia" name="nome_fantasia" placeholder="Exemplo: Loja do 1,99" value="${nome_fantasia}">
        `);
        if(!nome_fantasia){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe o Nome Fantasia</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-6">
            <label for="endereco" class="form-label">Endereço</label>
            <textarea class="form-control" id="endereco" name="endereco" rows="2" placeholder="Rua, número, bairro" value="${endereco}"></textarea>
        `);
        if(!endereco){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe o Endereço</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-4">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}">
        `);
        if(!cidade){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe a Cidade</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-2">
            <label for="uf" class="form-label">UF</label>
            <input type="text" class="form-control" id="uf" name="uf" maxlength="2" value="${uf}>
        `);
        if(!uf){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe a Unidade Federativa</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-4">
            <label for="cep" class="form-label">CEP</label>
            <input type="text" class="form-control" id="cep" name="cep" placeholder="XXXXX-XXX" value="${cep}>
        `);
        if(!cep){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe o CEP</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-6">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" value="${email}>
        `);
        if(!email){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe o E-mail</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
        <div class="col-md-6">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" value="${telefone}>
        `);
        if(!telefone){
            resp.write(`
            <div>
                <span><p class="text-danger">Por favor, informe o Telefone</p></span>
            </div>
            `);
        }
        resp.write(`
        </div>
                    </form>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>
        `);
    }

    resp.end();
}

app.get('/', Menu);
app.get('/cadastroEmpresa', cadastrarEmpresa);

app.post('/cadastroEmpresa', cadastraEmpresa);

app.listen(porta, host, () => {
    console.log(`Servidor em execução em http://${host}:${porta}`);
});