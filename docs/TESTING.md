# Testes do site Vozes (protótipo)

Este documento explica **o que é testado automaticamente**, **para quem serve** (equipe editorial e operação, sem precisar programar) e **como rodar os testes** antes de publicar alterações.

## O que são esses testes?

São checagens automáticas que abrem as páginas principais do site em um navegador simulado e confirmam que:

- a página **não quebra** (erro de tela branca);
- **títulos e blocos importantes** aparecem;
- **menu, rodapé e formulário de contato** se comportam como esperado.

Não substituem uma revisão humana de textos e design, mas impedem que uma mudança quebre rotas ou componentes centrais sem ninguém perceber.

## Como rodar no seu computador

Pré-requisito: [Node.js](https://nodejs.org/) (mesma versão do projeto, hoje **24**).

```bash
cd site-vozes-prototipo
npm ci
npm test
```

| Comando | Uso |
|--------|-----|
| `npm test` | Roda todos os testes uma vez (igual ao CI). |
| `npm run test:watch` | Repete os testes quando você salva arquivos. |
| `npm run test:coverage` | Mostra quais arquivos ainda não têm teste. |

Se `npm test` falhar, **não publique** até corrigir ou pedir ajuda à pessoa de tecnologia.

## Mapa: páginas × o que cada teste verifica

| Página / rota | Arquivo de teste | O que é verificado |
|---------------|------------------|-------------------|
| **Início** `/` | `src/pages/pages.test.tsx` | Hero “Conectar vozes…”, link “Início” no menu. |
| **Quem somos** `/quem-somos` | idem | Título “Quem somos”. |
| **O que fazemos** `/o-que-fazemos` | idem | Título da página e seção “Com quem trabalhamos”. |
| **Vozes na mídia** `/vozes` | idem | Hero “Vozes na mídia”, abas (ex.: Notícias) após carregar listagem. |
| **Publicações** `/publicacoes` | idem | Hero “Publicações” e “Todas as publicações”. |
| **Contato** `/contato` | `src/pages/pages.test.tsx`, `src/pages/contato.test.tsx` | Título de contato, botão “Enviar”, validação ao enviar vazio. |
| **404** rota inválida | `src/pages/pages.test.tsx` | Mensagem “Página não encontrada” e link para a home. |
| **Notícia** `/vozes/noticias/:slug` | `src/pages/pages.test.tsx` | Título do artigo (ex.: saúde mental docente), bloco “Leia também”. |
| **Evento** `/vozes/eventos/:slug` | idem | Título do evento (ex.: seminário recomposição). |
| **Publicação** `/publicacoes/:slug` | idem | Título da publicação, seção “Relacionadas”. |

Conteúdo usado nos testes vem dos **textos locais** do repositório (`src/content/`). Nos testes, a chamada ao Sanity é **simulada** (resposta vazia, sem internet), e o site usa os mesmos textos locais que entrariam no fallback.

## Mapa: componentes compartilhados

| Componente | Arquivo de teste | O que é verificado |
|------------|------------------|-------------------|
| **Cabeçalho** (`SiteHeader`) | `src/components/layout/layout.test.tsx` | Logo, links do menu (Quem somos, Publicações), botão de busca. |
| **Rodapé** (`SiteFooter`) | idem | CTA de contato quando visível; redes sociais; CTA oculto na variante sem faixa. |
| **Hero de página** (`PageHero`) | idem | Título, frase de apoio e imagem com texto alternativo. |

## Publicação e deploy: testes obrigatórios

### GitHub Actions (CI)

- Workflow **`CI`** (`.github/workflows/ci.yml`): roda `npm test` em **pull requests** e pushes na `main`.
- Workflow **GitHub Pages** (`.github/workflows/pages.yml`): job **`test`** roda antes de **`build`**; **`deploy`** só roda se build e testes passarem.

### Vercel

- O script **`npm run build`** executa **`npm test`** antes de compilar o site.
- `vercel.json` define `buildCommand: npm run build`, então preview e produção na Vercel **falham se os testes falharem**.

**Painel Vercel (conferência única):** em *Project → Settings → General → Build & Development Settings*, o **Build Command** deve estar vazio (usa `vercel.json`) ou explicitamente `npm run build`. Não use apenas `vite build`, pois pularia os testes.

### GitHub Pages local vs CI

O build de produção para Pages usa variáveis `VITE_BASE` e `VITE_SITE_URL` no workflow; os testes não dependem delas.

## Onde ficam os arquivos de teste

- Configuração: `vite.config.ts` (bloco `test`), `src/test/setup.ts` (mocks globais).
- Helper de rotas: `src/test/render.tsx`.
- Testes: `src/**/*.test.tsx`.

## Quando atualizar este mapa

Sempre que alguém **criar uma página nova no menu**, **mudar um título principal** ou **adicionar um fluxo crítico** (ex.: novo formulário), peça para incluir ou ajustar um teste correspondente e atualizar as tabelas acima.
