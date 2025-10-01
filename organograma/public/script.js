async function carregar() {
  const res = await fetch("/api/data");
  const dados = await res.json();
  renderizar(dados);
}

function renderizar(dados) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  for (const [secao, info] of Object.entries(dados)) {
    const divSecao = document.createElement("div");
    divSecao.className = "secao";
    divSecao.dataset.secao = secao;

    // usar posição salva ou default
    const pos = info.pos || { x: 20, y: 20 };
    divSecao.style.left = pos.x + "px";
    divSecao.style.top = pos.y + "px";

    const titulo = document.createElement("h2");
    titulo.innerText = secao;
    divSecao.appendChild(titulo);

    const lista = document.createElement("div");
    lista.className = "lista";

    info.pessoas.forEach(p => {
      const divPessoa = document.createElement("div");
      divPessoa.className = "pessoa";
      divPessoa.draggable = true;
      divPessoa.innerText = p;
      lista.appendChild(divPessoa);
    });

    divSecao.appendChild(lista);
    container.appendChild(divSecao);

    // torna a seção arrastável (com salvamento)
    tornarArrastavel(divSecao, dados);
  }

  ativarDragDrop(dados);
}

function tornarArrastavel(el, dados) {
  let offsetX, offsetY;

  el.addEventListener("mousedown", e => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 1000;

    function onMouseMove(e) {
      el.style.left = (e.clientX - offsetX) + "px";
      el.style.top = (e.clientY - offsetY) + "px";
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", async () => {
      document.removeEventListener("mousemove", onMouseMove);
      el.style.zIndex = "";

      // salvar nova posição no servidor
      const nome = el.dataset.secao;
      const x = parseInt(el.style.left);
      const y = parseInt(el.style.top);

      dados[nome].pos = { x, y };

      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    }, { once: true });
  });
}

function ativarDragDrop(dados) {
  const pessoas = document.querySelectorAll(".pessoa");
  const listas = document.querySelectorAll(".lista");

  pessoas.forEach(p => {
    p.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.innerText);
      e.dataTransfer.setData("from", e.target.closest(".secao").dataset.secao);
      e.target.classList.add("arrastando");
    });

    p.addEventListener("dragend", e => {
      e.target.classList.remove("arrastando");
    });
  });

  listas.forEach(lista => {
    lista.addEventListener("dragover", e => {
      e.preventDefault();
      lista.classList.add("dragover");
    });

    lista.addEventListener("dragleave", () => lista.classList.remove("dragover"));

    lista.addEventListener("drop", async e => {
      e.preventDefault();
      lista.classList.remove("dragover");

      const nome = e.dataTransfer.getData("text");
      const from = e.dataTransfer.getData("from");
      const to = e.target.closest(".secao").dataset.secao;

      if (from !== to) {
        dados[from].pessoas = dados[from].pessoas.filter(p => p !== nome);
        dados[to].pessoas.push(nome);

        await fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
        });

        renderizar(dados);
      }
    });
  });
}

carregar();