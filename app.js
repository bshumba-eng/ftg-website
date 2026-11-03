/*
FTG PLATFORM CONFIG
1) For today's demo, leave demoMode = true.
2) For the real backend, create Supabase and set supabaseUrl + supabaseKey.
3) The public site can then read published events, fighters, media and live settings.
*/
const CONFIG={
  demoMode:true,
  supabaseUrl:"YOUR_SUPABASE_URL",
  supabaseKey:"YOUR_SUPABASE_PUBLISHABLE_KEY",
  demo:{
    event:{title:"FTG FIGHT NIGHT",date:"2026-12-12T20:00:00Z",venue:"DUBLIN • IRELAND",status:"UPCOMING",description:"One night. One ring. Fighters first. The official event details and full card will be announced by FTG."},
    fighters:[{name:"FIGHTER ONE",role:"MAIN EVENT",record:"RECORD TBA"},{name:"FIGHTER TWO",role:"MAIN EVENT",record:"RECORD TBA"},{name:"FTG FIGHTER",role:"UNDERCARD",record:"RECORD TBA"}],
    media:[{title:"FIGHT NIGHT",type:"EVENT FILM"},{title:"PRESS CONFERENCE",type:"VIDEO"},{title:"WEIGH-IN",type:"VIDEO"}],
    live:{online:false,title:"FTG LIVE",youtubeId:""}
  }
};
let db=null;
if(!CONFIG.demoMode && window.supabase && !CONFIG.supabaseUrl.startsWith("YOUR_")){
  db=window.supabase.createClient(CONFIG.supabaseUrl,CONFIG.supabaseKey);
}
async function loadData(){
  if(!db)return CONFIG.demo;
  const [{data:event},{data:fighters},{data:media},{data:live}]=await Promise.all([
    db.from("events").select("*").eq("published",true).order("event_date",{ascending:true}).limit(1).maybeSingle(),
    db.from("fighters").select("*").eq("published",true).order("card_order"),
    db.from("media").select("*").eq("published",true).order("created_at",{ascending:false}).limit(6),
    db.from("live_settings").select("*").eq("id",1).maybeSingle()
  ]);
  return {event:event||CONFIG.demo.event,fighters:fighters||[],media:media||[],live:live||CONFIG.demo.live};
}
function countdown(date){
  const t=new Date(date).getTime(), diff=t-Date.now();
  if(diff<=0)return["00","00","00","00"];
  return[String(Math.floor(diff/86400000)).padStart(2,"0"),String(Math.floor(diff%86400000/3600000)).padStart(2,"0"),String(Math.floor(diff%3600000/60000)).padStart(2,"0"),String(Math.floor(diff%60000/1000)).padStart(2,"0")];
}
async function render(){
  const data=await loadData(), e=data.event||CONFIG.demo.event;
  document.querySelector("#eventTitle").textContent=e.title;
  document.querySelector("#eventDescription").textContent=e.description||"";
  document.querySelector("#eventVenue").textContent=e.venue||"VENUE TBA";
  document.querySelector("#eventDate").textContent=new Date(e.date||e.event_date).toLocaleDateString("en-IE",{day:"2-digit",month:"long",year:"numeric"}).toUpperCase();
  document.querySelector("#eventStatus").textContent=e.status||"UPCOMING";
  document.querySelector("#liveEvent").textContent=e.title||"FTG LIVE";
  function tick(){const c=countdown(e.date||e.event_date);["d","h","m","s"].forEach((id,i)=>document.querySelector("#"+id).textContent=c[i])}
  tick();setInterval(tick,1000);
  document.querySelector("#fightersGrid").innerHTML=(data.fighters||[]).map((f,i)=>`<article class="fighter"><span class="num">0${i+1}</span><div><small>${f.role||"FTG CARD"} • ${f.record||"TBA"}</small><h3>${f.name}</h3></div></article>`).join("");
  document.querySelector("#mediaGrid").innerHTML=(data.media||[]).map(m=>`<article class="media"><span>${m.type||"FTG MEDIA"}</span><h3>${m.title}</h3></article>`).join("");
  const l=data.live||{};
  if(l.online && l.youtube_id){
    document.querySelector("#liveFrame").src=`https://www.youtube.com/embed/${l.youtube_id}?autoplay=1&rel=0`;
    document.querySelector("#liveFrame").hidden=false;document.querySelector("#liveEmpty").hidden=true;
    document.querySelector("#liveBadge").textContent="● LIVE NOW";document.querySelector("#liveBadge").style.color="#d9ff38";
  }
  if(e.ticket_url){const b=document.querySelector("#ticketButton");b.href=e.ticket_url;b.target="_blank";b.textContent="BUY TICKETS ↗"}
}
document.querySelector("#liveClock").textContent=new Date().toLocaleTimeString("en-IE",{hour:"2-digit",minute:"2-digit"});
setInterval(()=>document.querySelector("#liveClock").textContent=new Date().toLocaleTimeString("en-IE",{hour:"2-digit",minute:"2-digit"}),1000);
render();
