
/* App logic for Tata Camm Solaire offline PWA */
const pages = {1: 'page1', 2: 'page2', 3: 'page3'};
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.display='block';
  setTimeout(()=>t.style.display='none',2000);
}
function goToPage(n){
  Object.values(pages).forEach(pid=>document.getElementById(pid).classList.remove('active'));
  document.getElementById(pages[n]).classList.add('active');
  if(n===3) renderSalesTable();
}
/* init defaults */
if(!localStorage.getItem('sales')) localStorage.setItem('sales', JSON.stringify([]));
if(!localStorage.getItem('settings')) localStorage.setItem('settings', JSON.stringify({phone:'+22372960628'}));

/* set date default to today */
document.addEventListener('DOMContentLoaded', ()=>{
  const d = new Date(); const iso = d.toISOString().slice(0,10);
  if(!document.getElementById('dateInput').value) document.getElementById('dateInput').value = iso;
  loadSettings();
  renderSalesTable();
});

function loadSettings(){
  try{
    const s = JSON.parse(localStorage.getItem('settings')||'{}');
    if(s.phone) document.getElementById('phoneLabel').textContent = s.phone;
    const logo = localStorage.getItem('logoData');
    if(logo) document.getElementById('logoImg').src = logo;
  }catch(e){}
}

function saveSale(){
  const qty = parseInt(document.getElementById('qtyInput').value) || 0;
  const date = document.getElementById('dateInput').value || '';
  const price = parseInt(document.getElementById('priceInput').value) || 0;
  const install = parseInt(document.getElementById('installInput').value) || 0;
  if(qty<=0){ showToast('Quantité invalide'); return; }
  const perUnitProfit = price - install; // profit per unit (you can change formula)
  const totalV = price * qty;
  const totalIn = install * qty;
  const record = {qty, date, price_v: totalV, price_in: totalIn, perUnitProfit};
  const sales = JSON.parse(localStorage.getItem('sales')||'[]');
  sales.push(record);
  localStorage.setItem('sales', JSON.stringify(sales));
  showToast('Vente sauvegardée');
  goToPage(3);
}

function renderSalesTable(){
  const tbody = document.querySelector('#salesTable tbody');
  tbody.innerHTML = '';
  const sales = JSON.parse(localStorage.getItem('sales')||'[]');
  let total = 0;
  sales.forEach(s=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.qty}</td><td>${s.date}</td><td>${s.price_v.toLocaleString()}</td><td>${s.price_in.toLocaleString()}</td>`;
    tbody.appendChild(tr);
    total += s.price_v;
  });
  document.getElementById('totalInput').value = total.toLocaleString();
}

function exportCSV(){
  const sales = JSON.parse(localStorage.getItem('sales')||'[]');
  if(!sales.length){ showToast('Aucune vente à exporter'); return; }
  let csv = 'qty,date,price_v,price_in\n';
  sales.forEach(s=> csv += `${s.qty},${s.date},${s.price_v},${s.price_in}\n`);
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'sales_tata_camm.csv';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  showToast('Exporté');
}

function clearAll(){
  if(!confirm('Effacer toutes les ventes ?')) return;
  localStorage.setItem('sales', JSON.stringify([]));
  renderSalesTable();
  showToast('Données effacées');
}
