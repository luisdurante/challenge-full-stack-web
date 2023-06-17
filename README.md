# +A Educação - Full Stack Web Developer

Repositório do front-end: https://github.com/luisdurante/grupo-a-end-test-front

## Sobre a API

A API cadastra e gerencia matrículas de alunos em turmas online.

Para checar a referência da api basta acessar o swagger: localhost/api ou https://grupoa-test-api-rvmt2lyuxa-uc.a.run.app/api

### Como rodar localmente

Para rodar a API localmente com mais facilidade, é recomendada a instalação do _docker_.

- Clone o repositório com o comando `git clone https://github.com/luisdurante/challenge-full-stack-web.git`
- Instale as dependências com `npm install`
- Na raiz do projeto, crie um arquivo _**.env**_ com as variáveis necessárias
- Vamos iniciar os containers com o comando `docker-compose up`

Após isso conseguimos acessar os endpoints locais, (e.g http://localhost:3000/students)

Para rodar os testes, basta digitar:

- `npm run test` para os testes unitários 

## Exemplo de entradas de um arquivo .env

Exemplo de variáveis de ambiente para o arquivo .env

Importante manter os valores:

- DATABASE_USERNAME=testUser
- DATABASE_PASSWORD=testPassword
- DATABASE_NAME=grupoa-test

por conta do _docker-compose_, caso queira mudar esses valores não se esqueça de alterar também no _docker-compose.yml_

```text
DATABASE_TYPE=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=testUser
DATABASE_PASSWORD=testPassword
DATABASE_NAME=grupoa-test

JWT_SECRET=meusecret
JWT_TTL=86400s

PORT=3000
```



# Descrição do desafio

[![N|Solid](https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg)](https://maisaedu.com.br/) 

O objetivo deste desafio é avaliar as competências técnicas dos candidatos a desenvolvedor Full Stack Web na Maior Plataforma de Educação do Brasil.

Será solicitado o desenvolvimento de uma Aplicação que realize a Matrícula do Aluno na Turma de Programação Web da instituição Edtech. Regras e requisitos técnicos estão detalhadas neste documento.

# Especificações Técnicas
- **Front-end:**
  - Framework JS: [Vue.js](https://vuejs.org/)
  - Framework de UI: [Vuetify](https://vuetifyjs.com/)
- **API:** NodeJS
- **Banco de Dados:** Postgress ou MySQL
- **Idioma de escrita do código:** Inglês

# Requisitos
## Contextualização
Considere que uma Instituição de Ensino Superior precisa de uma solução para cadastrar e gerenciar matrículas de alunos em turmas online. Para realizar a matrícula, é necessário que o cadastro do aluno tenha sido realizado.

O desafio consiste em criar uma aplicação para o cadastro de alunos conforme os critérios de aceitação.

## Mockups de interface
A seguir, são apresentados alguns mockups de interface como um guia para a criação do front-end. Fique à vontade para usar sua criatividade na criação do front-end.

* Listagem de Alunos
![Listagem de Alunos](/mockups/studants_list.png)

* Criar/Editar Aluno
![Listagem de Alunos](/mockups/studants_save.png)

## Histórias do Usuário
- **Sendo** um usuário administrativo da Instituição
- **Quero** gerenciar cadastros de alunos
- **Para** que eu possa realizar a matrícula do aluno

### Critérios de aceite: 

#### Cenário: Cadastrar novo aluno
- **Dado** que estou na tela de Consulta de Alunos
- **Quando** clico em Cadastrar Aluno
- **Então** abre a tela de Cadastro do Aluno
- **E** exibe os campos obrigatórios vazios
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Salvar
- **Então** cria o novo aluno na base
- **E** retorna mensagem de sucesso
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Cancelar
- **Então** retorna para tela Consulta de Alunos
- **E** não persiste a gravação dos dados no banco 

#### Cenário: Listar alunos cadastrados 
- **Dado** que estou no Módulo Acadêmico
- **Quando** clico no menu Alunos
- **Então** abre a tela de Consulta de Alunos 
- **E** exibe opção Cadastrar Aluno ao topo
- **E** lista dados dos alunos cadastrados
- **E** exibe opção Editar por aluno
- **E** exibe opção Excluir por aluno

#### Cenário: Editar cadastro de aluno
- **Dado** que estou na listagem de alunos
- **Quando** clico em Editar aluno
- **Então** abre a tela de Cadastro do Aluno 
- **E** exibe os campos do cadastro preenchidos
- **E** habilita alteração dos campos editáveis
####
- **Dado** que estou na tela de Cadastro do Aluno
- **Quando** clica em Salvar
- **Então** grava os dados editáveis na base
####
- **Dado** que estou na tela de Cadastro do Aluno
- **Quando** clica em Cancelar
- **Então** retorna para a tela de Consulta de Alunos
- **E** não persiste a gravação dos dados

#### Cenário: Excluir cadastro de aluno
- **Dado** que estou na listagem de alunos
- **Quando** clico em Excluir aluno
- **Então** exibe a modal de confirmação de exclusão
####
- **Dado** que estou na modal de confirmação de exclusão 
- **Quando** clico em Confirmar
- **Então** então exclui o registro do aluno
####
- **Dado** que estou na modal de confirmação de exclusão
- **Quando** clico em Cancelar
- **Então** então fecha a modal e não persiste a exclusão

## Campos obrigatórios:
- **Nome** (editável)
- **Email** (editável)
- **RA** (não editável) (chave única)
- **CPF** (não editável)

# Critérios de avaliação
- Qualidade de escrita do código
- Organização do projeto
- Qualidade da API
- Lógica da solução implementada
- Qualidade da camada de persistência
- Utilização do Git (quantidade e descrição dos commits, Git Flow, ...)
- Validações
- Tratamento de erros
- Padrões de projeto e arquitetura

# Desejável
- Testes de unidade
- Documentação da arquitetura de solução

# Diferenciais
- Segurança da aplicação (autenticação, autorização, ...)

# Instruções de entrega
1. Crie um fork do repositório no seu GitHub
2. Faça o push do código desenvolvido no seu Github
3. Inclua um arquivo chamado COMMENTS.md explicando
    - Decisão da arquitetura utilizada
    - Lista de bibliotecas de terceiros utilizadas
    - O que você melhoraria se tivesse mais tempo
    - Quais requisitos obrigatórios que não foram entregues
4. Informe ao recrutador quando concluir o desafio junto com o link do repositório
5. Após revisão do projeto junto com a equipe de desevolvimento deixe seu repositório privado
