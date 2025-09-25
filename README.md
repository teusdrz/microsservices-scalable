# Microservices Rocketseat

Este projeto é um exemplo de arquitetura de microsserviços utilizando Node.js, Fastify, Drizzle ORM, PostgreSQL, RabbitMQ, Kong API Gateway e Jaeger para observabilidade.

## Estrutura dos Serviços

- **app-orders**: Serviço responsável pela gestão de pedidos. Utiliza Fastify, Drizzle ORM e PostgreSQL.
- **app-invoices**: Serviço responsável pela gestão de faturas. Utiliza Fastify, Drizzle ORM e PostgreSQL.
- **contracts**: Contratos compartilhados entre os microsserviços.
- **infra**: Infraestrutura como código usando Pulumi para provisionamento AWS.
- **docker**: Configurações de containers, incluindo Kong API Gateway e Jaeger.

## Principais Tecnologias

- **Node.js** e **TypeScript**
- **Fastify** (API HTTP)
- **Drizzle ORM** (mapeamento objeto-relacional)
- **PostgreSQL** (banco de dados relacional)
- **RabbitMQ** (mensageria entre microsserviços)
- **Kong** (API Gateway)
- **Jaeger** (tracing/distribuição)
- **Pulumi** (infraestrutura como código)

## Como rodar localmente

1. Instale as dependências de cada serviço:
   ```bash
   cd app-orders && npm install
   cd ../app-invoices && npm install
   ```
2. Suba os containers necessários:
   ```bash
   docker compose up -d
   ```
3. Inicie os serviços:
   ```bash
   cd app-orders && npm run dev
   cd ../app-invoices && npm run dev
   ```

## Observabilidade e Gateway
- O Kong está configurado como API Gateway (porta 8000/8001/8002).
- O Jaeger está disponível para tracing (porta 16686).

## Documentação
- Cada serviço possui seu próprio README com instruções específicas.
- Consulte o diretório `infra` para detalhes sobre provisionamento AWS com Pulumi.

## Licença
MIT
