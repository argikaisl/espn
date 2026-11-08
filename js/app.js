const SPORTS=[
{id:"football",name:"Football",icon:"⚽",league:"eng.1",apiSport:"soccer",desc:"Global football"},
{id:"nfl",name:"NFL",icon:"🏈",league:" nfl",apiSport:"football",desc:"American football"},
{id:"ncaaf",name:"NCAAF",icon:"🏈",league:"college-football",apiSport:"football",desc:"College football"},
{id:"basketball",name:"Basketball / NBA",icon:"🏀",league:"nba",apiSport:"basketball",desc:"Basketball"},
{id:"baseball",name:"Baseball / MLB",icon:"⚾",league:"mlb",apiSport:"baseball",desc:"Major League Baseball"},
{id:"hockey",name:"Ice Hockey / NHL",icon:"🏒",league:"nhl",apiSport:"hockey",desc:"Ice hockey"},
{id:"tennis",name:"Tennis",icon:"🎾",league:"atp",apiSport:"tennis",desc:"ATP & WTA"},
{id:"cricket",name:"Cricket",icon:"🏏",league:"icc",apiSport:"",desc:"International cricket"},
{id:"boxing",name:"Boxing",icon:"🥊",league:"boxing",apiSport:"",desc:"Boxing"},
{id:"mma",name:"MMA / UFC",icon:"🥋",league:"ufc",apiSport:"mma",desc:"Mixed martial arts"},
{id:"motorsport",name:"Motorsport / F1",icon:"🏎️",league:"f1",apiSport:"racing",desc:"Formula racing"},
{id:"volleyball",name:"Volleyball",icon:"🏐",league:"volleyball",apiSport:"",desc:"Indoor & beach"},
{id:"rugby",name:"Rugby",icon:"🏉",league:"rugby",apiSport:"",desc:"Rugby union"},
{id:"golf",name:"Golf",icon:"⛳",league:"pga",apiSport:"golf",desc:"Golf tours"},
{id:"horse-racing",name:"Horse Racing",icon:"🏇",league:"horse-racing",apiSport:"",desc:"Racing events"}
];
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const sportById=id=>SPORTS.find(s=>s.id===id)||SPORTS[0];
function siteChrome(){const header=$("#site-header"),footer=$("#site-footer");if(header){header.className="site-header";header.innerHTML=`<div class="container nav-wrap"><a class="brand" href="index.html">REDZONE<span>.</span></a><button class="menu-btn" id="menu-btn" aria-label="Open menu">☰</button><nav class="nav-links" id="nav-links"><a href="index.html">HOME</a><a href="sports.html">SPORTS</a><a href="schedule.html">SCHEDULES</a><a href="news.html">SPORTS NEWS</a><a href="settings.html">SETTINGS</a></nav><a class="nav-cta" href="schedule.html">GAME CENTER ↗</a></div>`;$("#menu-btn").onclick=()=>$("#nav-links").classList.toggle("open");const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-links a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active")})}if(footer){footer.className="site-footer";footer.innerHTML=`<div class="container footer-inner"><div><b>REDZONE<span style="color:#e51d2a">.</span></b><br>All sports. One destination.</div><div class="footer-links"><a href="sports.html">Sports</a><a href="schedule.html">Schedules</a><a href="news.html">News</a><a href="settings.html">Settings</a></div><div>© ${new Date().getFullYear()} RedZone Sports</div></div>`}}
function getSettings(){try{return JSON.parse(localStorage.getItem("rz-settings"))||{auto:false,sport:"football"}}catch{return{auto:false,sport:"football"}}}
async function loadJSON(path){const r=await fetch(path);if(!r.ok)throw Error("Could not load "+path);return r.json()}
function formatDate(v){if(!v)return "Date TBA";const d=new Date(v);return isNaN(d)?"Date TBA":d.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})}
function formatTime(v){if(!v)return "Time TBA";const d=new Date(v);return isNaN(d)?v:d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"})}
function matchCard(m){const s=sportById(m.sport);return `<article class="match-card"><div class="match-meta"><span>${s.icon} ${esc(s.name)}</span><span class="match-status">${esc(m.status||"UPCOMING")}</span></div><div class="match-teams"><div class="team">${esc(m.home||"TBA")}</div><div class="versus">VS</div><div class="team">${esc(m.away||"TBA")}</div></div><div class="match-foot"><span>${esc(formatDate(m.date))}</span><span>${esc(formatTime(m.date))}</span></div></article>`}
function newsCard(n){return `<a class="news-card" href="article.html?id=${encodeURIComponent(n.id)}"><div class="news-art">${esc(n.art||"SPORTS")}</div><div class="news-body"><span class="news-category">${esc(n.category||"Sports News")}</span><h3>${esc(n.title)}</h3><p>${esc(n.excerpt||"Read the latest story from the world of sports.")}</p><span class="news-date">${esc(formatDate(n.date))} · READ STORY ↗</span></div></a>`}
async function getMatches(){const data=await loadJSON("data/matches.json");let matches=data.matches||[];const cfg=getSettings();if(cfg.auto){try{const live=await fetchAutomaticMatches(cfg.sport);if(live.length)matches=live.concat(matches)}catch(e){console.warn("Automatic feed unavailable; using manual JSON.",e)}}return matches}
async function fetchAutomaticMatches(sportId){const s=sportById(sportId);if(!s.apiSport||!s.league.trim())throw Error("No automatic ESPN feed configured for this category.");const league=s.league.trim();const url=`https://site.api.espn.com/apis/site/v2/sports/${encodeURIComponent(s.apiSport)}/${encodeURIComponent(league)}/scoreboard`;const r=await fetch(url);if(!r.ok)throw Error("ESPN feed returned "+r.status);const j=await r.json();return(j.events||[]).map(e=>{const c=e.competitions?.[0],co=c?.competitors||[];const home=co.find(x=>x.homeAway==="home")||co[0],away=co.find(x=>x.homeAway==="away")||co[1];return{id:"espn-"+e.id,sport:s.id,home:home?.team?.displayName||"TBA",away:away?.team?.displayName||"TBA",date:e.date,status:e.status?.type?.shortDetail||e.status?.type?.description||"UPCOMING",source:"ESPN"}})}
window.RZ={SPORTS,$,esc,sportById,loadJSON,getMatches,matchCard,newsCard,formatDate,formatTime,getSettings,fetchAutomaticMatches,siteChrome};
document.addEventListener("DOMContentLoaded",siteChrome);
