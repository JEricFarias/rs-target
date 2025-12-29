# target 🚀💰

> Aplicativo para criação e gerenciamento de metas financeiras — criar metas, creditar e debitar valores por meta.

---

## 🧭 Visão rápida

- **Nome:** target
- **O que faz:** Permite ao usuário criar metas financeiras e registrar créditos/débitos para cada meta, acompanhando o progresso.

## ✨ Funcionalidades principais

- Criar, editar e remover metas
- Registrar entradas (créditos) e saídas (débitos) por meta
- Visualizar progresso acumulado por meta
- Armazenamento local com `expo-sqlite`

![Screenshots](./screenshots.png)

## ⚙️ Requisitos

- Node.js (v16+ recomendado)
- pnpm (ou npm/yarn)
- Expo CLI
- Ambiente de desenvolvimento para Android/iOS se quiser rodar no emulador/dispositivo

## 🚀 Instalação

1. Clone o repositório

```bash
git clone <url-do-repo>
cd target
```

2. Instale dependências

```bash
pnpm install
# ou
npm install
```

3. Rode o app (modo desenvolvimento)

```bash
pnpm start
# ou
npm run start
```

Para rodar em emulador/dispositivo:

```bash
pnpm android   # expo run:android
pnpm ios       # expo run:ios
```

> Os scripts disponíveis estão definidos em `package.json`: `start`, `android`, `ios`, `web`.

## 🧩 Estrutura e dependências relevantes

- Projeto baseado em Expo (versão ~54). Arquivo principal: `expo-router/entry`.
- Dependências notáveis: `expo-sqlite` (armazenamento local), `dayjs` (manipulação de datas), `react-native-currency-input`.
- Estrutura: código em `src/` com componentes (`components/`) e hooks/database (`database/`).

## 💡 Uso / Exemplos rápidos

- Criar e gerenciar metas: abra o app e utilize o fluxo de criação de metas na tela principal.
- Exemplo de fluxo via interface:
  1. Criar meta → definir nome, objetivo e valor alvo
  2. Inserir crédito → registra aporte para a meta
  3. Inserir débito → descontar valor da meta

## 🔧 Configuração

- Variáveis de ambiente: nenhum arquivo `.env` detectado no projeto — adicione se precisar (ex.: chaves de analytics).
- Banco: usa `expo-sqlite`; veja `src/database` para migrações e hooks.

## 🧪 Testes

- Atualmente não há comandos de teste definidos. Sugestão:

```bash
pnpm test
```

Adicionar uma suíte de testes (Jest / React Native Testing Library) é recomendado.
