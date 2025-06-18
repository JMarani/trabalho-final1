[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xd4JnEQV)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19805626)
# Trabalho Final — Sistema de Gestão de Eventos Acadêmicos (NestJS)

## Identificação da Equipe

Nome:  João Victor Marani Bernabe
RA: 23000330-2

Nome:  Gustavo dos Santos
RA: 23045888-2

Nome:  
RA:

---

## 🌟 Objetivo

Desenvolver uma **API RESTful** utilizando **NestJS + TypeORM** para gerenciar eventos acadêmicos. A aplicação deve seguir boas práticas de design de APIs REST, incluindo a organização em módulos, uso de services e repositories, retorno de status HTTP corretos, relacionamento entre entidades e implementação de regras de negócio mais complexas que um CRUD tradicional.

---

## 📋 Contexto

A universidade promove **eventos acadêmicos** como palestras, workshops e semanas temáticas. Os **alunos** podem se inscrever nesses eventos, que são organizados por **departamentos**. Cada evento pode ter **vários palestrantes** e um **limite máximo de participantes**.

---

## 📌 Requisitos Funcionais

### Entidades e Relacionamentos

- **Evento**

  - id, nome, descricao, data, limiteParticipantes
  - Relacionamentos:
    - ManyToMany com `Palestrante`
    - ManyToOne com `Departamento`
    - OneToMany com `Inscricao`

- **Departamento**

  - id, nome, sigla, responsavel

- **Palestrante**

  - id, nome, miniCurriculo, instituicao

- **Aluno**

  - id, nome, matricula, curso

- **Inscricao**

  - id, dataInscricao
  - ManyToOne com `Evento`
  - ManyToOne com `Aluno`

---

## ⚖️ Regras de Negócio

1. Um aluno só pode se inscrever em um evento se houver vagas disponíveis.
2. Um aluno **não pode se inscrever mais de uma vez** no mesmo evento.
3. Um aluno **não pode se inscrever em dois eventos com data e horário conflitantes**.
4. A listagem de eventos deve mostrar: número de inscritos e se está lotado ou com vagas.
5. Um relatório por departamento deve mostrar: total de eventos organizados e total de inscritos.
6. **Eventos com data passada não devem aceitar novas inscrições.**
7. **Excluir um evento deve excluir todas as inscrições associadas.**
8. **Não é permitido excluir um palestrante vinculado a eventos.**
9. **Um evento precisa ter pelo menos um palestrante vinculado.**
10. **O registro da inscrição deve salvar a data/hora atual do servidor.**
11. O cancelamento de uma inscrição deve apenas **trocar o status da inscrição** de ativo para cancelado

---

## 🔗 Rotas da API (seguindo padrão REST)

> As rotas a seguir devem ser seguidas rigorosamente. Qualquer desvio pode resultar em desconto na nota.

### Eventos

- `GET /events` — Lista todos os eventos com status de vagas e número de inscritos
- `GET /events/:id` — Detalha um evento
- `POST /events` — Cria um novo evento
- `PUT /events/:id` — Atualiza um evento
- `DELETE /events/:id` — Remove um evento

### Palestrantes

- `GET /speakers` – Lista todos os palestrantes cadastrados
- `POST /speakers` – Cadastra um novo palestrante
- `GET /speakers/:id` – Exibe os dados de um palestrante específico
- `PUT /speakers/:id` – Atualiza os dados de um palestrante
- `DELETE /speakers/:id` – Remove um palestrante (desde que não esteja vinculado a eventos)

### Departamentos

- `GET /departments` – Lista todos os departamentos
- `POST /departments` – Cria um novo departamento
- `GET /departments/:id` – Retorna os dados de um departamento específico
- `GET /departments/:id/report` – Retorna um relatório com total de eventos e inscritos do departamento
- `PUT /departments/:id` – Atualiza os dados de um departamento
- `DELETE /departments/:id` – Remove um departamento do sistema

### Alunos

- `GET /students` – Lista todos os alunos cadastrados
- `POST /students` – Cadastra um novo aluno
- `GET /students/:id` – Retorna os dados de um aluno específico
- `PUT /students/:id` – Atualiza os dados de um aluno
- `DELETE /students/:id` – Remove um aluno do sistema

### Inscrições

- `POST /events/:idEvento/registrations` – Realiza a inscrição de um aluno em um evento (informar `idAluno` no body)
- `GET /students/:idAluno/registrations` – Lista os eventos em que o aluno está inscrito
- `DELETE /registrations/:id` – Cancela a inscrição com base no ID da inscrição

---

## ✅ Critérios de Avaliação

| Critério                                                      | Pontuação |
| ------------------------------------------------------------- | --------- |
| Modelagem correta com TypeORM (Relacionamentos)               | 1.0 pt    |
| Implementação das regras de negócio                           | 2.0 pts   |
| Uso correto de status HTTP e respostas                        | 1.0 pt    |
| Aderência ao padrão REST nas rotas                            | 1.0 pt    |
| Estrutura modular do projeto (controllers, services, modules) | 1.0 pt    |

> **Observação:** Será descontado ponto caso o aluno crie rotas ou estruturas fora do padrão acordado.

---

## 🗓️ Datas, Entrega e Artefatos

- **Data final para entrega:** até **terça-feira, 24 de junho de 2025, às 23:59**
- **Forma de entrega:** exclusivamente via **GitHub Classroom**
- **Importante:** outras formas de envio (e-mail, drive, etc.) **não serão aceitas** e resultarão em **nota zero**.

### Artefatos obrigatórios:

1. Código-fonte completo no repositório.
2. Um arquivo `api.http` na **raiz do projeto** contendo exemplos reais de uso da API:
   - Requisições GET, POST, PUT, DELETE
   - Headers e bodies quando necessário

✨ **Dica:** Saiba mais sobre o formato `.http` e a extensão REST Client:\
[https://marketplace.visualstudio.com/items?itemName=humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### Exemplo de `api.http`

```http
### Obter eventos
GET http://localhost:3000/eventos
Accept: application/json

### Criar evento
POST http://localhost:3000/eventos
Content-Type: application/json

{
  "nome": "Semana Acadêmica de Engenharia",
  "descricao": "Evento com palestras e oficinas técnicas.",
  "data": "2025-06-25T19:00:00",
  "limiteParticipantes": 100,
  "idDepartamento": 1,
  "idsPalestrantes": [2, 4]
}
```
