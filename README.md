# Gerenciador de Eventos: Personas, Jornadas do Usuário e Componentes

Documento de especificação de UX e requisitos para o sistema Gerenciador de Eventos.

---

## 1. Mapeamento de Personas

### Persona 1: Administrador da Plataforma (Admin Geral)
* **Perfil:** Carlos, 38 anos, Gerente de Operações e Finanças da plataforma.
* **Objetivos:**
  * Garantir a conformidade financeira, faturamento e repasses corretos para os organizadores.
  * Monitorar a saúde geral da plataforma (taxa de conversão, volume total de transações, eventos ativos).
* **Principais Dores:**
  * Falta de visibilidade consolidada de métricas globais em tempo real.
  * Complexidade na gestão de faturas, taxas de serviço e disputas/estornos.
* **Permissões / Capacidades Técnicas:**
  * Gestão de contas de faturamento e taxas da plataforma.
  * Extração de relatórios e auditorias globais.
  * Moderação e suspensão de contas/eventos em não conformidade.

---

### Persona 2: Produtor / Organizador do Evento
* **Perfil:** Mariana, 31 anos, Produtora Cultural e Organizadora de Eventos Independentes.
* **Objetivos:**
  * Publicar e configurar eventos rapidamente com informações detalhadas sobre programação e atrações.
  * Acompanhar vendas de ingressos, lotação e faturamento do evento em tempo real.
  * Gerenciar participantes e realizar credenciamento no dia do evento.
* **Principais Dores:**
  * Processo burocrático ou inflexível para cadastrar cronogramas e atrações.
  * Dificuldade de exportar relatórios de presença e listas de inscritos.
* **Permissões / Capacidades Técnicas:**
  * CRUD completo de eventos (informações gerais, lotes, precificação, local/online).
  * CRUD de atrações e palestrantes (horários, fotos, bio).
  * Gestão de participantes (validação de ingressos, check-in, exportação de CSV/XLSX).
  * Dashboard de analytics dedicada por evento.

---

### Persona 3: Participante / Comprador
* **Perfil:** Lucas, 24 anos, Estudante Universitário e entusiasta de eventos de tecnologia e cultura.
* **Objetivos:**
  * Descobrir eventos relevantes com base em seus interesses, data e localização.
  * Realizar inscrição/compra de ingressos de forma rápida e segura.
  * Ter acesso fácil aos ingressos (QR Code) e à programação atualizada do evento.
* **Principais Dores:**
  * Fluxos de checkout longos e obrigação de preenchimento de formulários extensos.
  * Falta de clareza sobre horários e detalhes das atrações.
  * Dificuldade para reencontrar o ingresso no dia do evento.
* **Permissões / Capacidades Técnicas:**
  * Navegação e busca no catálogo público de eventos.
  * Autenticação e gestão de perfil de usuário.
  * Inscrição/compra de ingressos e download de comprovantes/QR Codes.
  * Cancelamento ou transferência de inscrição (conforme política do organizador).

---

## 2. Mapeamento de Jornadas do Usuário

### Jornada 1: Administrador Geral
1. **Autenticação:** Realiza login seguro com autenticação de dois fatores (2FA).
2. **Visão Geral (Dashboard Global):** Acessa indicadores de alto nível (GMV, volume de transações, eventos ativos, novos usuários).
3. **Gestão Financeira:** 
   * Configura e gerencia contas de faturamento e contas bancárias vinculadas.
   * Define regras de comissão/taxas por transação.
4. **Relatórios e Auditoria:** Extrai relatórios analíticos consolidados em formatos estruturados (CSV/PDF) para fechamento contábil.

---

### Jornada 2: Organizador do Evento
1. **Autenticação:** Realiza login na área de gestão do organizador.
2. **Criação do Evento:**
   * Preenche formulário básico (título, descrição, banner, data, localização física ou link).
   * Configura tipos de ingressos e lotes com limites de vagas.
3. **Curadoria e Programação:**
   * Cadastra as atrações, palestrantes e atividades associadas com horários e descrições.
4. **Publicação e Monitoramento:**
   * Publica o evento e acompanha as métricas de conversão e faturamento na dashboard.
5. **Operação e Pós-evento:**
   * Gerencia a lista de inscritos e realiza check-in dos participantes.
   * Extrai relatório final de presença e desempenho financeiro.

---

### Jornada 3: Participante do Evento
1. **Descoberta:** Navega pela vitrine de eventos, utilizando filtros por categoria, data e preço.
2. **Avaliação:** Clica no card do evento para visualizar a página detalhada (atrações confirmadas, cronograma, mapa do local, políticas).
3. **Inscrição / Compra:**
   * Seleciona a quantidade e o tipo de ingresso.
   * Realiza login rápido ou cria conta de forma simplificada.
   * Preenche os dados de pagamento e finaliza a transação.
4. **Confirmação e Acesso:**
   * Visualiza a tela de confirmação e recebe o comprovante/QR Code por e-mail e na área "Meus Ingressos".
   * No dia do evento, apresenta o QR Code para validação no credenciamento.

---

## 3. Catálogo de Componentes de UI Sugeridos

Para garantir consistência e usabilidade, a interface deve ser composta pelos seguintes blocos essenciais:

* **Navegação & Estrutura:**
  * *Navbar / Header:* Busca global, links de navegação e menu do usuário.
  * *Sidebar:* Menu lateral responsivo para as dashboards de Admin e Organizador.
* **Entrada de Dados:**
  * *Botões:* Primário (ação principal como "Comprar Ingressos"), Secundário (ações de apoio) e Destrutivo (cancelar/excluir).
  * *Formulários:* Inputs com validação em tempo real (datas, moeda, texto, upload de imagens/arquivos).
  * *Selects / Dropdowns:* Seleção de categorias, lotes e filtros de busca.
* **Exibição & Dados:**
  * *Event Card:* Card com imagem de destaque, título, data/hora, tags e badge de preço/status.
  * *Data Table:* Tabela com ordenação, busca, filtros e paginação para listagem de participantes e transações.
  * *Badges / Tags:* Indicadores visuais de status ("Confirmado", "Esgotado", "Pendente", "Cancelado").
  * *Ticket / QR Code Viewer:* Componente otimizado para exibição rápida e leitura do ingresso no celular.
* **Feedback & Diálogos:**
  * *Modal / Drawer:* Janelas modais para cadastro rápido de atrações e confirmação de ações críticas.
  * *Toast Notifications:* Avisos flutuantes de sucesso, erro ou alerta de sistema.
