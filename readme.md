<h1 align="center"> 
  Serviço Backend Cloud Fox
</h1>

Esta API, que permite o monitoramento do clima, foi desenvolvida visando sua utilização no projeto "Cloud Fox" (mais informações vide [este link](https://github.com/The-Bugger-Ducks/documentation)).

> Aplicação desenvolvida por alunos do 4º semestre do tecnólogo em Desenvolvimento de Software Multiplataforma, na FATEC Profº Jessen Vidal - São José dos Campos, SP :rocket:

### :hammer_and_wrench: Tecnologias

As seguintes tecnologias e ferramentas foram utilizadas neste projeto: `Typescript, NodeJS / Express.js, PostgreSQL, Docker, Insomnia`

### :gear: Como utilizar

<!-- Para consumir esta API, é preciso seguir o passo a passo abaixo ou utilizar a URL do serviço em nuvem (através deste link: [https://help-duck-tickets.herokuapp.com/tickets/](https://help-duck-tickets.herokuapp.com/tickets/)). -->

- Tutorial para rodar o projeto

```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/The-Bugger-Ducks/cloud-fox-back.git

# Acesse a pasta do projeto
$ cd cloud-fox-back

# criar um arquivo chamado ".env" e copiar a estrutura do arquivo ".env.example" e colocar seus respectivos dados


# Utilize o docker-compose para criar o banco de dados
$ docker-compose up -d

# Utilize o comando do TypeORM para o run da migration e sincronizar as entidades
$ yarn typeorm migration:run -d ./data-source.ts

# Inicie o Projeto
$ yarn start
```

O servidor inciará localmente na porta 3000 (citada no arquivo .env). Use o Insomnia para simular requisições e respostas das rotas (pelo link [https://localhost:3000](https://localhost:3000)) ou utilize o projeto fron-end do "Cloud Fox" para executar as funcionalidades da aplicação (acesse o repositório por [este link](https://github.com/The-Bugger-Ducks/fox-front)).

<!-- ![image](https://user-images.githubusercontent.com/55204419/186800014-710b4a64-28ec-4d5d-b87c-16d699dc1bb3.png) -->

## :railway_track: Rotas disponíveis
<div align="center">
  
|                                                                    Tipo | Rota                                 | Ação                            |
| ----------------------------------------------------------------------: | :----------------------------------- | :------------------------------ |
|   <hr>                                                                  | <hr>                                 | **Controle de usuários**        |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/users/`                          | Listagem de usuários            |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/users/{userId}`                  | Dados de um usuário específico  |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/users/`                          | Cadastro de usuários            |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/users/solicitation`              | Alteração do perfil do usuário  |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/users/{userId}`                  | Exclusão de um usuário específico|
|   <hr>                                                                  | <hr>                               | **Controle de estações**        |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/stations/`                       | Listagem de estações            |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/stations/{stationsId}`           | Editar dados da estação específica |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/stations/{stationsId}`           | Exclusão de uma estação específica |
|   <hr>                                                                  | <hr>                               | **Controle de parametros**        |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/collects/`                       | Cadastrar coleta de dados       |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/dashboard/` | Exibir informações sobre parametros da estação escolhida |


</div>

### Explicação da estrutura das pastas

| Pasta                                                       | Definição                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| :open_file_folder: src/app/                                     | Arquivos com o código fonte do projeto                                             |
| :open_file_folder: src/app/@types                               | Arquivos de sobrescrita de tipagem em bibliotecas. ex: express                     |
| :open_file_folder: src/app/controllers                          | Arquivos com os métodos de requisição das rotas                                    |
| :open_file_folder: src/app/entities                             | Arquivos com as entidades do banco de dados do projeto                             |
| :open_file_folder: src/app/enums                                | Arquivos de padronização de entrada para campos específicos no banco de dados      |
| :open_file_folder: src/app/ middlewares/                        | Arquivos para serviços de intermédio para rotas ex: autenticação, mensageria, etc  |
| :open_file_folder: src/app/ services/                           | Arquivos para funções mais complexas e limpeza de código                           |
| :open_file_folder: src/app/database/migrations/                 | Arquivos para manter o banco de dados sincronizado quanto a sua estrutura          |
| :open_file_folder: src/repositories/                            | Arquivos para expor repositorios das entidades e manipulá-las com metodos do typeorm |
| :page_facing_up: src/app/index.ts                               | Arquivo principal de inicialização do projeto                                      |
| :page_facing_up: src/app/routes.ts                              | Arquivo para gerenciar as rotas do projeto                                         |
| :page_facing_up: src/data-source.ts                             | Arquivo usado para configurar as conexões com o banco de dados com o TypeORM           |
| :page_facing_up: docker-compose.yml                         | Arquivo usado para "conteinerizar" um banco postgres local                             |
| :page_facing_up: tsconfig.json                        | Arquivo usado para configurar o typescript como sintaxe, organização de arquivos, etc.       |
| :page_facing_up: package.json                           | Arquivo usado gerenciar as dependencias do projeto com o Yarn e compor scripts de terminal |
