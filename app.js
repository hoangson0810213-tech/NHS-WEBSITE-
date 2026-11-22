const menuToggle=document.getElementById('menuToggle');
const nav=document.getElementById('nav');
menuToggle.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(opened));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();

const filterButtons=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.service-card')];
const search=document.getElementById('serviceSearch');
const empty=document.getElementById('emptyState');
let activeFilter='all';
function updateServices(){
 const term=search.value.trim().toLocaleLowerCase('vi');
 let visible=0;
 cards.forEach(card=>{
  const categoryMatch=activeFilter==='all'||card.dataset.category===activeFilter;
  const text=(card.dataset.search+' '+card.innerText).toLocaleLowerCase('vi');
  const searchMatch=!term||text.includes(term);
  card.hidden=!(categoryMatch&&searchMatch);
  if(!card.hidden)visible++;
 });
 empty.hidden=visible!==0;
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 filterButtons.forEach(b=>b.classList.remove('active'));
 button.classList.add('active');activeFilter=button.dataset.filter;updateServices();
}));
search.addEventListener('input',updateServices);

const detailContent={
 tools:['Công cụ tiện ích','Khu vực này sẽ tập hợp các công cụ trực tuyến hữu ích. Nội dung và công cụ cụ thể có thể được bổ sung khi NHS phát triển.'],
 support:['Trung tâm hỗ trợ','Bạn có thể gửi câu hỏi hoặc góp ý cho NHS qua mục liên hệ. Hãy mô tả vấn đề rõ ràng để được hỗ trợ tốt hơn.'],
 news:['Tin tức & cập nhật','Các thông báo và nội dung mới của NHS sẽ được đăng tại đây khi được cập nhật.'],
 connect:['Kết nối với NHS','Bạn có thể liên hệ với NHS qua email bằng nút bên dưới. Hãy thay địa chỉ email mẫu trong mã nguồn bằng địa chỉ thật của bạn.']
};
const modal=document.getElementById('detailModal');
const modalTitle=document.getElementById('modalTitle');
const modalText=document.getElementById('modalText');
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 const content=detailContent[button.dataset.detail];modalTitle.textContent=content[0];modalText.textContent=content[1];
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');
}));
modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
document.getElementById('modalAction').addEventListener('click',closeModal);
