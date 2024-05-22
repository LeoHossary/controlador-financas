![](https://i.imgur.com/xG74tOh.png)

# Desafio | Front-end - Módulo 4

## Descrição do desafio

Após alguns meses trabalhando em projetos mais simples, você foi designado pelo seu Tech Lead para desenvolver uma aplicação que será apresentada a um cliente muito importante.

Para o seu desenvolvimento foi liberado o layout que você pode encontrar no seguinte [link](https://www.figma.com/file/BwOAJkF8OeMON36TyFdhkj/DinDin-2.0?node-id=0%3A1).

Além disso, você pode acessar o mapa mental com o mapeamento das funcionalidades clicando no seguinte [link](https://miro.com/app/board/uXjVPZkmV7c=/?share_link_id=902157252329).

O sistema trata-se de uma aplicação para controle de finanças pessoais. As funcionalidades são:

- Cadastro do usuário `*`
- Login de usuário `*`
- Deslogar usuário `*`
- Cadastro de uma nova transação `*`
- Edição de uma transação `*`
- Exclusão de uma transação `*`
- Listagem de transações `*`
- Resumo das transações `*`
- Permitir ordenar a tabela por data (`Extra`)
- Permitir o usuário filtrar a tabela por categoria (`Extra`)
- Editar perfil de usuário (`Extra`)

> **Note**
>
> - As funcionalidades que estão `*` são obrigatórias
> - As funcionalidades que estão marcadas com `Extra`, não são obrigatórias, mas valem pontos para aumentar seu desempenho na avaliação final

## Detalhamento de Requisitos:

# Pessoa A

### Cadastro de um novo usuário:

Para cadastrar um novo usuário você terá que preencher o formulário na página de **sign-up**.

![](https://i.imgur.com/BZNNvti.png)

\*É importante garantir que todos os campos estão preenchidos, além de que as senha e confirmação de senha são iguais.

Ao clicar no botão **Cadastrar** você deverá enviar os dados do formulário para a **API** fazendo com que o sistema registre um novo usuário, caso dê certo o cadastro de um novo usuário, devemos redirecionar o usuário para a tela de **sign-in (login)**, assim ele já poderá se logar no sistema.

---

# Pessoa A

### Login de usuário:

1. Na página de login de usuário, temos um botão chamado **Cadastre-se**, esse botão deve levar o usuário para a tela de cadastrar um novo usuário **(sign-up)**:
2. O formulário de login deve validar se os campos estão realmente preenchidos, se estiverem preenchidos você enviará uma requisição para a **API** para fazer o login desse usuário, é importante lembrar que existem informações como **token** e **userId** que precisam ser armazenadas no **localStorage** para que o usuário possa depois usar dentro da **área logada**.
3. Caso o login dê certo o usuário deverá ser redirecionado para a tela principal (**main**) onde ele verá a listagem de suas transações.
4. Caso o usuário esteja logado, nós devemos bloquear o acesso dele a página de login, sendo assim, somente quando o usuário estiver deslogado que poderá acessar a página **sign-in (login)**.

![](https://i.imgur.com/vvnluj6.png)

---

# Pessoa B

### Página principal (main):

Após o usuário fazer o login ele será redirecionado para a página principal, essa página só poderá ser acessada por usuários que estão logados na aplicação, caso contrário ao tentar acessar a página principal sem estar logado o usuário deverá ser redirecionado para a página de login (**sign-in**).

Nessa página ele verá todas as informações:

1. Header da aplicação com botões, logos e ícones.
2. Tabela com a listagem de transações.
3. Área de resumo, que traz as informações de entradas, saídas e saldos.
4. Botão para adicionar uma nova transação.
5. Botão para abrir área de filtros.

Veja na imagem abaixo:

![](https://i.imgur.com/SYm8uuY.png)

---

# Pessoa B

### Cadastro de uma nova transação:

Para cadastrar uma nova transação o usuário deverá clicar no botão `Adicionar Registro`, que ficará logo abaixo da área de `resumo`.

![](https://i.imgur.com/10q85lh.png)

Ao clicar no referido botão, um modal com a opção de adicionar informações de uma transação deve ser exibido:

![](https://i.imgur.com/qMegn2n.png)

1. Nesse modal todas as informações devem ser preenchidas, lembrando que você pode adicionar uma `entrada` ou `saída` de dinheiro, por padrão o valor deve ser o de `saída`, caso o usuário queira adicionar um valor de entrada ele precisará clicar no botão **Entrada**.
2. O **select** de **Categoria** deverá ser preenchido com as informações de categorias que a **API** traz, ou seja, as categorias devem ser listadas dentro do **select** com base em um **GET** na rota de **categoria** da **API.**

\*Todos os campos são obrigatórios!

Após o usuário clicar no botão **confirmar**, uma nova transação deve ser inserida e a tabela de listagem deve ser atualizada.

É importante lembrar que quando adicionarmos uma nova transação, devemos atualizar também a área de **RESUMO**.

---

# Pessoa B

### Editar uma transação:

Para editar uma transação o usuário deverá clicar no ícone do lápis, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/iFD6G3k.png)

Ao clicar no ícone de editar uma transação, o modal (que foi utilizado para adicionar uma nova transação) deverá ser aberto e as informações da transação "clicada", deverão ser preenchidas automaticamente, assim como a imagem abaixo:

![](https://i.imgur.com/UGQ9uda.png)

\*Novamente, todos os campos são obrigatórios!

Após validar os campos e o usuário clicar em confirmar, a transação deverá ser atualizada na `API`.

---

# Pessoa B

### Excluir uma transação:

Para excluir uma transação o usuário deverá clicar no ícone da lixeira, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/X6GB3kh.png)

> **Warning**: A exibição do `popup`, é uma funcionalidade extra, não é obrigatório implementar.

> **Note**: Você pode excluir uma tranasação, clicando somente no ícone, sem precisar abrir o `popup` para confirmar, deletando direto.

Ao clicar nesse ícone, um "popup" irá aparecer para que o usuário confirme ou não a exclusão, fazendo com que não hajam exclusões por engano, veja abaixo como aparece o "popup":

![](https://i.imgur.com/Ohhk1lhm.png)

---

# Pessoa B

### Listagem de transações:

As transações registradas por meio dos endpoints da `api`, deverão ser listadas numa tabela que ficará ao centro da página, nessa tabela teremos 6 colunas, sendo:

1. **Data** da transação no formato `dd/mm/yyyy`
2. **Dia da semana**, nessa coluna deveremos utilizar apenas os primeiros nomes dos dias da semana, ao invéz de Segunda-Feira, deveremos utilizar o formato `Segunda`.
3. **Descrição**, nessa coluna listaremos as descrições informadas no cadastro de transação.
4. **Categoria**, aqui vamos mostrar as categorias inseridas em cada uma das transações cadastradas.
5. **Valor**, nessa coluna exibiremos os valores de cada uma das transações. Existe uma regra importante nas cores e nos sinais, para valores de **entrada de dinheiro (credit)** exibimos o número positivo e na cor <span style="color:#7B61FF"><b>roxa</b></span>, já para **Saídas de dinheiro (debit)** exibimos o número na cor <span style="color:#FA8C10"><b>laranja</b></span>.
6. Na última coluna nós não teremos um cabeçalho, nessa coluna ficarão os botões de editar e excluir.

![](https://i.imgur.com/jie9f1T.png)

Cada linha da tabela representa uma transação. Portanto cada botão representa a ação para um registro.

---

# Pessoa A

#### Cabeçalho da tabela:

> **Warning**: A ordenação no cabeçalho da tabela, é uma funcionalidade extra, não é obrigatório implementar.

No cabeçalho da tabela deverá haver a opção de clicar e ordenar de forma **crescente** e **decrescente**, para isso basta o usuário clicar no nome da coluna, a cada clique a ordenação deve ser alterada entre **crescente** e **decrescente**.

Somente a coluna **Data** poderá ser ordenada:

Veja abaixo o ícone que representa que a coluna está sendo ordenada:

- Ordenando a coluna data de forma crescente (do menor para o maior)
  - ![](https://i.imgur.com/E0cR53u.png)

**Importante:** Somente a coluna em ordenação deve conter o ícone.

---

# Pessoa A

### Resumo das transações:

O resumo das transações devem ser exibidos numa "box", onde teremos apenas 3 informações:

- Entradas
- Saídas
- Saldo

É importante ressaltar que os valores de entrada, saída e saldos são calculados com base em um endpoint da **API** que traz o extrato das transações.

Veja na imagem abaixo, como deve ser o resumo;
![](https://i.imgur.com/6Rlu6a7.png)

---

# Pessoa A

### Filtros:

> **Warning**: Os filtros são funcionalidades extras, não é obrigatório implementar.

A área de filtros por padrão é oculta, por isso você deve implementar a lógica para que quando o usuário clique no botão **Filtrar** a área de filtro seja exibida e quando clicar novamente seja ocultada, veja abaixo o botão que exibe/oculta a área de filtros:

![](https://i.imgur.com/GCsalqk.png)

Os filtros servem para dar granularidade aos dados, ou seja, para haver a possibilidade de exibir as transações conforme selecionamos requisitos para tal. Por exemplo, se disseremos que deve-se exibir apenas as transações da categoria **Depósito**, devemos listar na tabela somente as transações que pertencem àquela categoria.

![](https://i.imgur.com/YzXbttF.png)

Os filtros são cumulativos, ou seja, você pode filtrar por uma categoria ou por diversas categorias.

O funcionamento dos filtros segue a seguinte ordem:

1. Seleciona-se os filtros de categoria
2. Após selecionar os filtros desejados, clica-se no botão **aplicar filtros**.

Para limpar os filtros atuais, o usuário deverá clicar no botão **limpar filtros**

**Importante:**

1. Ao clicar em aplicar filtros sem nenhum filtro selecionado, o sistema deve exibir todas as transações disponíveis cadastradas.
2. Ao clicar em limpar filtros, o sistema deve exibir todas as transações disponíveis cadastradas.

Veja na imagem abaixo os botões:
![](https://i.imgur.com/X43exDw.png)

---

# Pessoa B

### Editar perfil de usuário:

> **Warning**: A edição do perfil é uma funcionalidade extra, não é obrigatório implementar.

No header da aplicação existe um ícone:

![](https://i.imgur.com/q6MS5wi.png)

Ao clicar nesse ícone, deverá ser exibido um modal para edição do usuário logado.

1. O modal deverá abrir com os dados do usuário já carregados nele (menos senha e confirmação de senha)
2. Após o usuário preencher os campos ele deverá clicar em **confirmar**, nesse momento você deve validar se os campos estão preenchidos, caso estejam, você deve enviar as informações que a **API** solicita para fazer a atualização do usuário logado.
3. Após o perfil ter sido atualizado o modal deverá ser fechado.
4. Ao abrir novamente o modal, os dados do usuário devem estar atualizados.

Veja na imagem o modal já preenchido:

![](https://i.imgur.com/aWx7T9C.png)

---

# Pessoa A

### Logout e nome de usuário

No header da página principal **(main)** você deverá:

1. Preencher com o nome do usuário logado no momento.
2. Além de adicionar uma função para deslogar o usuário ao clicar no botão que tem uma imagem que sugere ao usuário que ele vai deslogar da aplicação.

Veja na imagem abaixo os ícones:
![](https://i.imgur.com/Njzp33e.png)

---

**LEMBRE-SE**: é melhor feito do que perfeito, mas não faça mal feito!!!

###### tags: `front-end` `módulo 3` `React` `CSS` `desafio`
