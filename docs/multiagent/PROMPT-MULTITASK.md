# Prompt — colar em nova conversa (modo Multitask / multiagentes)

Copie o bloco abaixo **inteiro** como primeira mensagem. Abra o workspace `site-vozes-prototipo` e garanta que os agentes leiam os paths indicados.

---

## INÍCIO DO PROMPT

Você coordena a implementação UI do site **Vozes da Educação** no repositório:

`/Users/anaterra/Documents/GitHub/site-vozes-prototipo`

### Documentação obrigatória

1. **Plano e ownership:** `docs/multiagent/PLANO.md`
2. **Contratos de componentes:** `docs/multiagent/CONTRATOS.md`
3. **Execution log do seu agente:** `docs/multiagent/logs/AGENT-XX-*.md` — atualize ao iniciar, ao bloquear e ao concluir (status, arquivos, commits, handoff).

### Regras

- Trabalhe **apenas** nos arquivos do seu agente (tabela no PLANO).
- Branch: `feat/vozes-ui-refresh` (crie a partir de `main` se não existir).
- Commits: prefixo `[Axx]` no message.
- **Não edite** `src/pages/HomePage.tsx` exceto se você for o **Agente 14**.
- **QuemSomosPage:** Agentes 10 → 11 → 12 em sequência (mesmo arquivo); 10 e 12 só em seções disjuntas se rodarem paralelo com cuidado.
- Respeite `useReducedMotion()` em animações.
- Placeholders para fotos de infância da equipe até o cliente enviar assets.
- Ao terminar: marque checklist no log, rode `npm run build` se possível, escreva handoff para Agente 14.

### Ondas de execução (spawn tasks paralelas por onda)

| Onda | Agentes | Paralelo? |
|------|---------|-----------|
| 1 | **00** Foundation | solo |
| 2 | **01, 02, 03, 09, 10, 12, 13** | sim |
| 3 | **04, 05, 06, 07, 08** | sim (04 após 03 ideal) |
| 4 | **11** | após 10 |
| 5 | **14** Integration | solo |

### Spawn instructions (Multitask)

Para cada agente da onda atual, crie **uma subtask** com:

- **Model:** default coding model
- **Prompt inicial do subtask:**  
  `Você é o Agente {NN} do plano Vozes. Leia docs/multiagent/PLANO.md seção "Agente {NN}" e docs/multiagent/logs/AGENT-{NN}-*.md. Implemente o escopo. Atualize o execution log. Não toque arquivos de outros agentes.`

Substitua `{NN}` por 00, 01, … conforme a onda.

**Agente 14** só dispare quando os logs 01–08 estiverem ✅ ou quando integração parcial for explicitamente aceita.

### Resumo do backlog (referência rápida)

**HOME**

- Por que existimos: parallax foto; remover pill/balão em “É aí que o Vozes entra” → texto branco (A01).
- ProcessScroll: dot + texto multilinha centrado na linha (A01).
- Soluções: CTA depois dos serviços; mais respiro; só “PARCEIROS” (A02 + A14).
- ServiceCards: layout título/rosto/hover/saiba mais+seta (A03).
- Depoimentos: camada parallax sob serviços, sombra, cantos, marca (A04).
- Com quem trabalhamos: hover títulos, CTA fora do box (A05).
- Faixas foto “Nascemos…” e “Ouvimos…” + “(ecoamos)” (A06).
- Mídia: “últimas notícias”, seta Ver todas (A07).
- Publicações: Figma node 7492-445 (A07).
- CTA final Home (A08).
- Footer: peso, hover links, Lucide (A09).

**QUEM SOMOS**

- Carrossel história estilo libra.ag + copy Vozes (A10).
- Equipe: grid 3+2, flip infância, “Queria ser…” (A11).
- Vetores “Como trabalhamos” (A12).

**O QUE FAZEMOS**

- Redesign seção serviços (A13).

**INTEGRAÇÃO**

- Montar HomePage na ordem do PLANO (A14).

### Figma

Publicações: https://www.figma.com/design/WFci48N6CPTd2UVMnhFiyh/sitefigma?node-id=7492-445&m=dev

### Entrega do coordenador desta conversa

- Dispare ondas 1→5.
- Consolide no final: tabela de status em `PLANO.md`, link para logs preenchidos, resultado de `npm run build`.

## FIM DO PROMPT

---

## Variante: prompt de um único agente (copiar e trocar NN)

```
Você é o Agente {NN} do refresh UI Vozes.

Repositório: /Users/anaterra/Documents/GitHub/site-vozes-prototipo
Leia: docs/multiagent/PLANO.md (seção Agente {NN}) e docs/multiagent/logs/AGENT-{NN}-*.md

Implemente somente o escopo do seu agente. Atualize o execution log com arquivos, decisões e commits [A{NN}].
Não modifique arquivos de outros agentes. Respeite CONTRATOS.md.

Ao concluir: checklist ✅, handoff para Agente 14 se aplicável, npm run build.
```

Exemplos: `01`, `07`, `14`.
