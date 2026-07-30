const defaultSpaces = [
  { id: 'algebra', name: 'Matemática · Álgebra', description: 'Ecuaciones, matrices y pensamiento algebraico.', color: '#ee7651', icon: '∑', resources: 3, progress: 32 },
  { id: 'geometria', name: 'Geometría', description: 'Formas, espacio y demostraciones visuales.', color: '#b3a6ff', icon: '△', resources: 0, progress: 0 },
  { id: 'fisica', name: 'Física', description: 'Experimenta con las reglas que mueven el mundo.', color: '#75d4b5', icon: '↗', resources: 0, progress: 0 }
];
let spaces = JSON.parse(localStorage.getItem('gd_spaces') || 'null') || defaultSpaces;
let user = null;
const supabaseClient = window.SUPABASE_CONFIG?.url && window.SUPABASE_CONFIG?.anonKey && window.supabase
  ? window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
  : null;
let authMode = 'register';
const $ = id => document.getElementById(id);

function render() {
  $('space-nav').innerHTML = spaces.map((s, i) => `<a class="nav-item ${i === 0 ? 'active' : ''}" href="#${s.id}"><span class="dot" style="background:${s.color};box-shadow:0 0 0 4px ${s.color}2b"></span>${s.name.replace('Matemática · ', '')}</a>`).join('');
  $('app').innerHTML = `<section class="hero" id="inicio"><div><div class="eyebrow">BIENVENIDO A TU LABORATORIO</div><h1>Aprende. Experimenta.<br><span>Descubre.</span></h1></div><p class="hero-copy">Un lugar para convertir las preguntas en experimentos y las ideas en nuevas formas de entender.</p></section><section class="stats"><div class="stat"><div class="stat-symbol">◎</div><div><b>${spaces.length}</b><small>espacios activos</small></div></div><div class="stat"><div class="stat-symbol">↗</div><div><b>${spaces.reduce((a,s)=>a+s.resources,0)}</b><small>recursos disponibles</small></div></div><div class="stat"><div class="stat-symbol">✦</div><div><b>${user ? 'En marcha' : 'A tu ritmo'}</b><small>${user ? 'sesión guardada' : 'sin presión'}</small></div></div></section><section><div class="section-head"><div><h2>Tus espacios</h2><p>Elige un tema para comenzar a explorar.</p></div><button class="primary" id="open-add-top">+ Nuevo espacio</button></div><div class="spaces-grid">${spaces.map((s,i)=>`<article class="space-card" style="--card-color:${s.color}" id="${s.id}"><div class="space-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.description}</p><div class="space-meta"><span>${s.resources} recursos</span><span>${s.progress ? s.progress+'% explorado' : 'por comenzar'}</span></div></article>`).join('')}<button class="add-card" id="open-add-card"><span>+</span> Añadir un espacio</button></div></section><section class="resource-section"><div class="section-head resource-head"><div><h2>Continúa explorando</h2><p>Recursos recientes de Matemática · Álgebra</p></div><a class="view-all" href="#algebra">Ver todo →</a></div><div class="resource-grid"><article class="resource-card"><div class="resource-thumb">▦</div><div><h3>Mezclador RGB · Matrices</h3><p>Laboratorio interactivo</p><a href="mezclador_rgb_matrices.html">Abrir laboratorio →</a></div></article><article class="resource-card"><div class="resource-thumb">◫</div><div><h3>Escala de grises</h3><p>Simulador de matrices</p><a href="simulador_matrices_escala_grises.html">Abrir laboratorio →</a></div></article></div></section>`;
  ['open-add-top','open-add-card'].forEach(id => $(id)?.addEventListener('click', () => $('space-modal').classList.remove('hidden')));
  updateProfile();
}
function updateProfile(){ if(user){$('profile-name').textContent=user.name;$('profile-email').textContent=user.email;$('avatar').textContent=user.name.charAt(0).toUpperCase();} }
function openAuth(mode){ authMode=mode; $('auth-modal').classList.remove('hidden'); $('auth-title').textContent=mode==='register'?'Crea tu cuenta':'Qué bueno verte de nuevo'; $('auth-subtitle').textContent=mode==='register'?'Guarda tu avance y vuelve cuando quieras.':'Inicia sesión para continuar tu exploración.'; $('name-field').classList.toggle('hidden',mode!=='register'); $('auth-submit').textContent=mode==='register'?'Crear cuenta':'Iniciar sesión'; $('auth-error').textContent=''; }
$('profile').addEventListener('click',()=>{if(user)$('profile-menu').classList.toggle('hidden');else openAuth('register')});
$('switch-auth').addEventListener('click',()=>openAuth(authMode==='register'?'login':'register'));
async function refreshSpaces(){
  if(!supabaseClient || !user) return;
  const {data,error}=await supabaseClient.from('spaces').select('id,name,description,color,icon,resources,progress').order('created_at');
  if(!error && data?.length) spaces=data;
}
$('auth-form').addEventListener('submit',async e=>{e.preventDefault();const email=$('auth-email').value.trim().toLowerCase(),password=$('auth-password').value; $('auth-submit').disabled=true; $('auth-error').textContent='';
  if(supabaseClient){
    const result=authMode==='register'
      ? await supabaseClient.auth.signUp({email,password,options:{data:{display_name:$('auth-name').value.trim()}}})
      : await supabaseClient.auth.signInWithPassword({email,password});
    if(result.error){$('auth-error').textContent=result.error.message; $('auth-submit').disabled=false; return;}
    const sessionUser=result.data.user; user={id:sessionUser.id,name:sessionUser.user_metadata?.display_name||email.split('@')[0],email};
    await refreshSpaces();
  }else if(authMode==='register'){if(!$('auth-name').value.trim()){ $('auth-error').textContent='Escribe tu nombre.'; $('auth-submit').disabled=false; return;} user={name:$('auth-name').value.trim(),email,password};localStorage.setItem('gd_user',JSON.stringify(user));
  }else{const saved=JSON.parse(localStorage.getItem('gd_user')||'null');if(!saved||saved.email!==email||saved.password!==password){$('auth-error').textContent='Correo o contraseña incorrectos.';$('auth-submit').disabled=false;return;}user=saved;}
  $('auth-submit').disabled=false;$('auth-modal').classList.add('hidden');render();
});
$('logout').addEventListener('click',async()=>{if(supabaseClient)await supabaseClient.auth.signOut();user=null;localStorage.removeItem('gd_user');$('profile-menu').classList.add('hidden');render()});
$('space-form').addEventListener('submit',async e=>{e.preventDefault();const name=$('space-name').value.trim(),description=$('space-description').value.trim(),color=$('space-color').value;
  if(supabaseClient&&user){const {data,error}=await supabaseClient.from('spaces').insert({name,description,color,icon:'✦',owner_id:user.id}).select().single();if(error){alert(error.message);return;}spaces.push(data);}else{spaces.push({id:'space-'+Date.now(),name,description,color,icon:'✦',resources:0,progress:0});localStorage.setItem('gd_spaces',JSON.stringify(spaces));}
  $('space-modal').classList.add('hidden');e.target.reset();render();
});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).classList.add('hidden')));
$('mobile-menu').addEventListener('click',()=>$('space-nav').closest('.sidebar').classList.toggle('open'));
async function bootstrap(){
  if(supabaseClient){const {data}=await supabaseClient.auth.getUser();if(data.user)user={id:data.user.id,name:data.user.user_metadata?.display_name||data.user.email.split('@')[0],email:data.user.email};await refreshSpaces();}
  else user=JSON.parse(localStorage.getItem('gd_user')||'null');
  render();
}
bootstrap();
