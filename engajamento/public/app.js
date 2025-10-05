const container = document.getElementById('cardsContainer');
const btnAdd = document.getElementById('btnAdd');
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const btnCancel = document.getElementById('btnCancel');
const filterColor = document.getElementById('filterColor');
const btnExportExcel = document.getElementById('btnExportExcel');
const btnExportPDF = document.getElementById('btnExportPDF');

let allData = [];

// Descobre qual API usar
const API_BASE = window.location.pathname.startsWith('/cbsd') ? '/api/cbsd' : '/api/sdev';

// buscar dados
async function fetchData(){
  const resp = await fetch(API_BASE);
  return await resp.json();
}

function makeCard(item){
  const div = document.createElement('div');
  div.className = 'card';
  if (item.statusColor) {
  div.style.backgroundColor = 
    item.statusColor === 'verde' ? 'lightgreen' :
    item.statusColor === 'amarelo' ? 'khaki' :
    item.statusColor === 'vermelho' ? 'lightcoral' :
    'white';
  }
  const img = document.createElement('img');
  img.src = item.photo || 'https://via.placeholder.com/120';
  div.appendChild(img);

  const tblWrap = document.createElement('div');
  tblWrap.className = 'table';

  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');
  const hnum = document.createElement('th');
  hnum.textContent = item.number || '—';
  const hname = document.createElement('th');
  hname.textContent = item.name || '—';
  hrow.appendChild(hnum);
  hrow.appendChild(hname);
  thead.appendChild(hrow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const fields = [
    ['Qualificação', item.qualification],
    ['Seção', item.section],
    ['Deseja engajar', item.engage],
    ['Dependente', item.dependent],
    ['Parecer da reunião', item.meetingOpinion],
    ['Observações', item.notes],
    ['Punições', item.punishments]
  ];

  fields.forEach(([k,v]) => {
    const r = document.createElement('tr');
    const c1 = document.createElement('td');
    c1.textContent = k;
    const c2 = document.createElement('td');
    c2.textContent = v || '';
    r.appendChild(c1);
    r.appendChild(c2);
    tbody.appendChild(r);
  });

  table.appendChild(tbody);
  tblWrap.appendChild(table);

  const actions = document.createElement('div');
  actions.className = 'row-actions';

  const btnEdit = document.createElement('button');
  btnEdit.textContent = 'Editar';
  btnEdit.onclick = () => openModal(item);

  const btnDel = document.createElement('button');
  btnDel.textContent = 'Excluir';
  btnDel.onclick = async () => {
    if (!confirm('Confirma exclusão?')) return;
    await fetch(API_BASE + '/' + item.id, { method: 'DELETE' });
    load();
  };

  // seletor de cor
  const STATUS_MAP = {
    'default': 'Limpar',
    'verde': 'Engajar',
    'amarelo': 'Talvez',
    'vermelho': 'Não Engajar'
  };

  // criar select  
  const select = document.createElement('select');
  // usar a cor atual laçoo através do objeto
  Object.keys(STATUS_MAP).forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = STATUS_MAP[color];
    if (item.statusColor === color) option.selected = true;
    select.appendChild(option);
  });

  // atualiza no servidor
  select.onchange = async () => {

    const newColor = select.value;
    const formdata = new FormData();
    formdata.append('statusColor', newColor);
    await fetch(API_BASE + '/' + item.id, { method: 'PUT', body: formdata });
    // atualiza a cor visual do card
    div.style.backgroundColor = 
      newColor === 'default' ? 'white' :
      newColor === 'verde' ? '#4ee346ff' :
      newColor === 'amarelo' ? '#f0e76aff' :
      newColor === 'vermelho' ? '#e83c4dff' : 'white';
  };

  actions.appendChild(btnEdit);
  actions.appendChild(btnDel);
  tblWrap.appendChild(select);
  tblWrap.appendChild(actions);

  div.appendChild(tblWrap);
  return div;
}

// filtrar cards
async function load() {
  container.innerHTML = '';
  const data = await fetchData();
  allData = data;
  renderCards(data);
}

function renderCards(data) {
  container.innerHTML = '';
  data.forEach(item => container.appendChild(makeCard(item)));
}


function openModal(item){
  modal.classList.remove('hidden');
  if (item){
    form.id.value = item.id;
    form.number.value = item.number || '';
    form.name.value = item.name || '';
    form.qualification.value = item.qualification || '';
    form.section.value = item.section || '';
    form.engage.value = item.engage || '';
    form.dependent.value = item.dependent || '';
    form.meetingOpinion.value = item.meetingOpinion || '';
    form.notes.value = item.notes || '';
    form.punishments.value = item.punishments || '';
  } else {
    form.reset();
    form.id.value = '';
  }
}

btnAdd.addEventListener('click', () => openModal());
btnCancel.addEventListener('click', () => modal.classList.add('hidden'));

// ======== EXPORTAR PARA EXCEL =========
function exportToExcel() {
  const selected = filterColor ? filterColor.value : 'todos';
  const filtered = selected === 'todos'
    ? allData
    : allData.filter(item => item.statusColor === selected);

  let csv = "Número,Nome,Qualificação,Seção,Engajamento,Dependente,Parecer,Observações,Punições,Status\n";
  filtered.forEach(item => {
    csv += [
      item.number,
      item.name,
      item.qualification,
      item.section,
      item.engage,
      item.dependent,
      item.meetingOpinion,
      item.notes,
      item.punishments,
      item.statusColor || ''
    ].map(v => `"${v || ''}"`).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "militares.csv";
  link.click();
}

// ======== EXPORTAR PARA PDF =========
async function exportToPDF() {
  const selected = filterColor ? filterColor.value : 'todos';
  const filtered = selected === 'todos'
    ? allData
    : allData.filter(item => item.statusColor === selected);

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Relatório de Militares", 10, 15);
  if (selected !== 'todos') doc.text(`Filtro: ${selected}`, 10, 25);

  let y = 35;
  filtered.forEach((item, idx) => {
    doc.setFontSize(10);
    doc.text(`${idx + 1}. ${item.name} (${item.number}) - ${item.statusColor || '-'}`, 10, y);
    y += 6;
    doc.text(`  Seção: ${item.section || '-'} | Engajamento: ${item.engage || '-'}`, 10, y);
    y += 6;
    doc.text(`  Dependente: ${item.dependent || '-'} | Parecer: ${item.meetingOpinion || '-'}`, 10, y);
    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("militares.pdf");
}

// eventos para exportar pdf e excel
btnExportPDF.addEventListener('click', exportToPDF);
btnExportExcel.addEventListener('click', exportToExcel);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const id = form.id.value;
  if (id) {
    await fetch(API_BASE + '/' + id, { method: 'PUT', body: formData });
  } else {
    await fetch(API_BASE, { method: 'POST', body: formData });
  }
  modal.classList.add('hidden');
  load();
});

filterColor.addEventListener('change', () => {
  const selected = filterColor.value;
  if (selected === 'todos') {
    renderCards(allData);
  } else {
    const filtered = allData.filter(item => item.statusColor === selected);
    renderCards(filtered);
  }
});

// carregar inicial
load();
