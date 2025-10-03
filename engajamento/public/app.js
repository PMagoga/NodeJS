const container = document.getElementById('cardsContainer');
const btnAdd = document.getElementById('btnAdd');
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const btnCancel = document.getElementById('btnCancel');

// Descobre qual API usar
const API_BASE = window.location.pathname.startsWith('/cbsd') ? '/api/cbsd' : '/api/sdev';

async function fetchData(){
  const resp = await fetch(API_BASE);
  return await resp.json();
}

function makeCard(item){
  const div = document.createElement('div');
  div.className = 'card';

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

  actions.appendChild(btnEdit);
  actions.appendChild(btnDel);
  tblWrap.appendChild(actions);

  div.appendChild(tblWrap);
  return div;
}

async function load(){
  container.innerHTML = '';
  const data = await fetchData();
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

// carregar inicial
load();
