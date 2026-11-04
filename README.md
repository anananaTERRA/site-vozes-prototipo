# Vozes da Educação

Protótipo desktop em React do redesign 2026. O visual continua neste repositório. O conteúdo editável mora no Sanity, no projeto `n5x78djy`, dataset `production`.

```bash
npm install
npm run dev
```

O Studio tem dependências próprias em `studio/`. Só precisa instalar se for rodar ou fazer deploy do painel localmente (`npm ci --prefix studio`).

O site local abre em `http://localhost:5173`.

| O quê | Endereço |
| --- | --- |
| Site publicado | https://site-vozes-prototipo.vercel.app |
| Painel de conteúdo (Studio) | https://vozes-da-educacao.sanity.studio |
| Protótipo no GitHub Pages | https://anananaterra.github.io/site-vozes-prototipo/ |

O login do Studio é a conta Sanity de quem foi convidado no projeto. Não existe área logada dentro do React.

Para subir o painel nesta máquina (desenvolvimento de schema):

```bash
npm run studio
```

O Studio local sobe em `http://localhost:3333`.

Publicar ou editar conteúdo no Sanity **não exige** push nem novo deploy do site. Recarregue a aba da Vercel depois de clicar em **Publish** no Studio (salvar só grava rascunho; rascunho não aparece no site).

## Como o fluxo funciona

Há três peças, e cada uma tem um dono diferente.

| Peça | Onde vive | Quando muda |
| --- | --- | --- |
| Site | React, neste repositório. Na Vercel, o build de `dist` | Layout, página nova, campo que o site ainda não mostra |
| Conteúdo | Sanity. Notícias, eventos, equipe, logos, textos da home | Sempre que alguém publica no Studio |
| Painel | Sanity Studio, pasta `studio/` | Quando um tipo de conteúdo ganha ou perde um campo |

O navegador do visitante pede o conteúdo publicado direto na API do Sanity. Rascunho não aparece. Se a API falhar, a página usa os textos que ainda estão em `src/content/`. Se uma lista no Sanity vier vazia, essa lista também volta para o texto local. Apagar todas as notícias do painel, por exemplo, faz a home mostrar de novo as notícias do código.

No `npm run dev`, o Vite encaminha essas consultas por `/sanity-api`, para o localhost não esbarrar em CORS. Na Vercel e no GitHub Pages o browser fala com o Sanity direto. Cada domínio público precisa estar em [CORS do projeto](https://www.sanity.io/manage/project/n5x78djy/api/cors), com credenciais desligadas. Já estão liberados `http://localhost:5173`, `http://localhost:3333`, `https://anananaterra.github.io` e `https://site-vozes-prototipo.vercel.app`. Previews da Vercel precisam de origem própria ou de um coringa que a tela de CORS aceite.

O projeto Sanity (`n5x78djy`) e o dataset (`production`) estão no código (`src/sanity/config.ts`). O site lê a API pública no navegador; **não** depende de variável de ambiente na Vercel para buscar conteúdo. O site público não usa token. `SANITY_API_TOKEN` em `.env.local` só serve para o seed e para login/deploy do CLI do Sanity nesta máquina.

## Publicar um post

1. Abra o Studio em https://vozes-da-educacao.sanity.studio (ou `npm run studio` no localhost, para desenvolvimento).
2. Entre em **Notícias** e crie um documento.
3. Preencha título, chamada, data, pelo menos um tema e a imagem. No campo **Endereço**, gere o slug a partir do título. Esse slug vira a URL: `/vozes/noticias/esse-slug`.
4. Escreva o corpo. Parágrafos, listas e imagens do corpo saem no artigo.
5. **Destaque na listagem** marca a notícia em evidência.
6. Clique em **Publish**. Salvar deixa um rascunho. O site só enxerga o que foi publicado.
7. Recarregue o site. A lista de notícias ordena pela data, da mais nova para a mais antiga.

Os outros posts seguem o mesmo gesto, com campos a mais:

| No Studio | URL no site | Campos além do artigo |
| --- | --- | --- |
| Notícias | `/vozes/noticias/:slug` | Destaque |
| Eventos | `/vozes/eventos/:slug` | Lugar, formato e ficha |
| Na mídia | só a listagem em `/vozes` | Veículo e link externo. Não tem página própria |
| Publicações | `/publicacoes/:slug` | Tipo e ano |

Mudar o slug muda o endereço público. O endereço antigo deixa de existir.

Equipe, parceiros, serviços, depoimentos, história, valores e perguntas frequentes usam o campo **Ordem**. O menor número aparece primeiro.

**Textos do site** é um documento único: a introdução de serviços, os números da home e os blocos de “com quem trabalhamos”. Não se cria outro. Edita-se esse.

Quem edita precisa ser membro do projeto, em [manage → Members](https://www.sanity.io/manage/project/n5x78djy/members). O papel de Editor publica. Viewer só lê.

## O que cada comando faz

`npm run dev` sobe o site. Ele lê o Sanity e, se a consulta falhar, mostra o conteúdo local.

`npm run studio` sobe o painel nesta máquina. As alterações de schema aparecem aqui assim que o arquivo é salvo. O conteúdo em si não fica no Git.

`npm run deploy --prefix studio` republica o painel em https://vozes-da-educacao.sanity.studio (use depois de mudar schema ou `studio/sanity.config.ts`).

`npm run build` gera `dist`. É o que a Vercel e o GitHub Pages publicam. O build não embute os posts. Os posts continuam sendo buscados no navegador.

`npm run seed:sanity` é a carga inicial. Ele lê notícias, equipe, logos e textos que estão em `src/content/`, sobe as imagens e grava os documentos no dataset `production`. Roda uma vez, para popular o painel com o que o protótipo já tinha.

Antes de rodar, copie `.env.example` para `.env.local` e coloque um token de Editor:

```bash
cp .env.example .env.local
npm run seed:sanity
```

O token se cria em [API → Tokens](https://www.sanity.io/manage/project/n5x78djy/api#tokens). `.env.local` fica fora do Git.

Não rode o seed de novo depois que alguém já editou no Studio. Ele usa `createOrReplace` com ids fixos (`noticia-` + slug, `team-1`, `siteSettings`, e o mesmo padrão para o resto). O documento com aquele id volta a ser a cópia do código, e a edição feita no painel se perde. Um post criado só no Studio, com outro id, permanece. Imagem com o mesmo nome de arquivo não é enviada outra vez.

## Deploy do site (Vercel)

O deploy do site e a publicação de conteúdo são independentes. A Vercel entrega o React em https://site-vozes-prototipo.vercel.app. O Sanity entrega os textos. Um post novo não gera build na Vercel.

Configuração do projeto na Vercel:

- Repositório: este.
- Framework: Vite.
- Build: `npm run build`.
- Pasta de saída: `dist`.
- Não defina `VITE_BASE`. Vazio significa `/`, que é o certo num domínio próprio. O GitHub Pages é quem define `VITE_BASE=/site-vozes-prototipo/` no workflow. Na Vercel esse valor quebraria os links.
- Não coloque `SANITY_API_TOKEN` na Vercel. O site não precisa dele, e o token de escrita não deve ir para o ambiente público.

Sem a origem da Vercel em [CORS](https://www.sanity.io/manage/project/n5x78djy/api/cors), o browser bloqueia a consulta e o site cai no conteúdo local em `src/content/`.

Enquanto a `main` continuar recebendo push, o GitHub Pages também publica. Vercel e GitHub Pages leem o mesmo dataset.

## Deploy do Studio (Sanity)

O painel **não** vai para a Vercel. Ele fica hospedado pelo Sanity.

- **Produção (time):** https://vozes-da-educacao.sanity.studio
- **Local (schema):** `npm run studio` → `http://localhost:3333`

Na primeira vez na pasta `studio/`, instale as dependências:

```bash
npm ci --prefix studio
```

Para republicar o painel depois de mudar schema ou config (`studio/schemaTypes/`, `studio/sanity.config.ts`):

```bash
npm run deploy --prefix studio
```

O hostname (`vozes-da-educacao`) e o `deployment.appId` estão em `studio/sanity.cli.ts`, então o deploy não precisa escolher URL de novo. Quem edita conteúdo usa o link `*.sanity.studio`; quem só visita o site usa a Vercel.

## Criar um tipo novo de conteúdo

Um campo a mais num tipo que já existe é edição de schema. Um tipo novo (um “curso”, por exemplo) também. Os dois são mudança de código, não um botão do Studio. O site só mostra o que a consulta e a página já conhecem.

1. Descreva o documento em `studio/schemaTypes/documents.ts` com `defineType`. O `name` é o identificador estável. Não mude depois que existirem documentos. Campos reutilizáveis estão em `studio/schemaTypes/fields.ts`. Listas fechadas, como temas e ícones, estão em `studio/schemaTypes/options.ts`.
2. Inclua o tipo no array `schemaTypes` no final de `documents.ts`.
3. Coloque o item no menu em `studio/structure.ts`. Use `dated` quando a ordem for a data, ou `ordered` quando for o campo `order`.
4. Reinicie ou deixe o Studio recarregar. O tipo novo aparece no menu. Dá para criar um documento de teste e publicar.
5. Para o site mostrar esse conteúdo, siga a cadeia: o tipo em `src/content/site.ts`, a consulta GROQ em `src/sanity/fetch.ts`, a conversão em `src/sanity/map.ts` e a página que renderiza. Sem esse trecho, o documento existe no Sanity e o React ignora.
6. Abra o site e confira o documento publicado. Rascunho continua invisível.

Remover um campo que já tem conteúdo apaga esse valor nos documentos quando eles forem salvos de novo. Dá para acrescentar campo opcional sem migração. Campo obrigatório novo exige preencher os documentos antigos antes de publicar.

Se o Studio estiver hospedado em `*.sanity.studio`, a mudança de schema só chega lá depois de outro `npm run deploy` dentro de `studio/`. O site na Vercel só precisa de deploy se a página ou a consulta tiverem mudado. Conteúdo preenchido no tipo novo aparece sem deploy só depois que o frontend já sabe renderizá-lo.
