# 🔰 Sistema de Gerenciamento de Engajamento/Reengajamento

Este é um sistema Web simples para auxiliar no gerenciamento e acompanhamento dos processos de engajamento e reengajamento de militares (Soldados EV e Cabos/Soldados EP).

O projeto é construído com **Node.js/Express** no backend para gerenciar a API e **HTML/CSS/JavaScript puro** no frontend para a interface de usuário. Os dados são armazenados localmente em arquivos JSON.

-----

## 🚀 Funcionalidades Principais

  * **Duas Seções de Gerenciamento:** O sistema é dividido em duas áreas:
    1.  **Soldado EV (Sd EV):** Rota padrão (`/`).
    2.  **Cabo/Soldado EP (Cb/Sd EP):** Rota dedicada (`/cbsd`).
  * **Visualização em Cards:** Os militares são exibidos em cards que resumem suas informações e status.
  * **Gestão de Status de Engajamento (Sd EV):** Permite alterar o status de um militar (Limpar, Engajar, Talvez, Não Engajar) através de um menu suspenso em cada card.
  * **CRUD Completo:** Permite **Criar**, **Ler**, **Atualizar** e **Deletar** registros de militares através de um modal de edição.
  * **Upload de Foto:** Suporte para upload de fotos do militar ao adicionar ou editar um registro.

-----

## 🛠️ Tecnologias Utilizadas

**Backend (Node.js)**

  * **Express:** Framework principal para o servidor e rotas API.
  * **`fs/promises`:** Para leitura e escrita assíncrona dos arquivos JSON de dados.
  * **`path`:** Para gerenciamento de caminhos de arquivos.
  * **`multer`:** Middleware para processar o upload de arquivos (fotos).
  * **`cors`:** Middleware para habilitar requisições de diferentes origens.

**Frontend (Client-side)**

  * **HTML:** Estrutura da página (`index.html` e `cbsd.html`).
  * **JavaScript (`app.js`):** Lógica principal, manipulação do DOM, chamadas de API (`fetch`) e controle do modal.
  * **CSS (`styles.css`):** (Não fornecido, mas referenciado para estilização).

**Dados**

  * **`sdev.json`:** Armazena os dados dos Soldados EV.
  * **`cbsd.json`:** Armazena os dados dos Cabos/Soldados EP.

-----

## ⚙️ Estrutura do Projeto

```
/
├── public/                 # Arquivos acessíveis pelo cliente (frontend)
│   ├── app.js              # Lógica principal do frontend
│   ├── index.html          # Página inicial (Sd EV)
│   ├── cbsd.html           # Página Cabos/Soldados EP
│   ├── styles.css          # (Estilos)
│   └── uploads/            # Fotos de perfil
├── routes/                 # Módulos de roteamento do Express
│   ├── soldadosev.js       # Rotas API para Sd EV (ex: /api/sdev)
│   └── cbsdep.js           # Rotas API para Cb/Sd EP (ex: /api/cbsd)
├── sdev.json               # Banco de dados JSON (Sd EV)
├── cbsd.json               # Banco de dados JSON (Cb/Sd EP)
└── server.js               # Arquivo principal do servidor Node.js/Express
```

-----

## ▶️ Como Rodar o Projeto

1.  **Instalação de Dependências:**
    (Você precisará ter o Node.js e npm instalados. Baseado nos seus `require`s, você precisará de `express`, `cors` e `multer`.)

    ```bash
    npm install express cors multer
    ```

2.  **Iniciar o Servidor:**
    Execute o arquivo `server.js` usando o Node:

    ```bash
    node server.js
    ```

    O servidor será iniciado na porta 3600.

3.  **Acessar a Aplicação:**
    Abra seu navegador e acesse a URL:

    ```
    http://localhost:3600
    ```

      * Para a seção **Sd EV**, acesse: `http://localhost:3600`.
      * Para a seção **Cb/Sd EP**, acesse: `http://localhost:3600/cbsd`.

-----
