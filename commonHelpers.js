import{a as h,S as b,i as s}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const L="44503068-6cc3802f70205d42434a99aa5",v="https://pixabay.com/api/";async function u(t,r){return(await h.get(`${v}`,{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}function f(t){const r=document.querySelector(".gallery"),i=t.map(({webformatURL:c,largeImageURL:e,tags:o,likes:a,views:g,comments:y,downloads:p})=>`
      <div class="photo-card">
        <a href="${e}">
          <img src="${c}" alt="${o}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${a}</p>
          <p class="info-item"><b>Views</b> ${g}</p>
          <p class="info-item"><b>Comments</b> ${y}</p>
          <p class="info-item"><b>Downloads</b> ${p}</p>
        </div>
      </div>
    `).join("");r.insertAdjacentHTML("beforeend",i)}function E(){const t=document.querySelector(".gallery");t.innerHTML=""}let n=1,l="",m=new b(".gallery a");const P=document.getElementById("search-form"),d=document.getElementById("load-more");document.querySelector(".gallery");document.querySelector(".loader");P.addEventListener("submit",S);d.addEventListener("click",$);async function S(t){if(t.preventDefault(),l=t.currentTarget.elements.searchQuery.value.trim(),!l){s.error({message:"Please enter a search query"});return}E(),d.classList.add("hidden"),n=1;try{const r=await u(l,n);if(r.hits.length===0){s.error({message:"No images found. Please try again."});return}f(r.hits),m.refresh(),d.classList.remove("hidden"),s.success({message:`Hooray! We found ${r.totalHits} images.`})}catch{s.error({message:"Error fetching images"})}}async function $(){n+=1;try{const t=await u(l,n);f(t.hits),m.refresh();const r=Math.ceil(t.totalHits/15);n>=r&&(d.classList.add("hidden"),s.info({message:"We're sorry, but you've reached the end of search results."}))}catch{s.error({message:"Error fetching images"})}}
//# sourceMappingURL=commonHelpers.js.map
