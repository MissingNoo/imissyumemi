import{a as n}from"./chunk-EMOVIG5Q.js";import"./chunk-ULR4URCE.js";import"./chunk-LDV6YPMG.js";var h=Deno.env.get("YTKEY"),i=["",""];function p(){return v(),i[0]=="true"?n("p",{children:n("iframe",{width:"420",height:"315",src:"https://www.youtube.com/embed/"+i[1]})}):n("p",{style:"color: cyan;",children:"Currently dreaming"})}var d=new Date;function v(){let r=!1,t="false",u="UC2X643A7Hu0sqeet_wcJ-0g",f=d.getHours(),l=Deno.env.get("lasthoursync"),a=0;l!=null&&(a=parseInt(l));let c=Deno.env.get("laststatus");if(c!=null&&(t=c),f==a&&(r=!0),r){let e=Deno.env.get("lastid");return i=[t,e],[t,e]}fetch("https://www.youtube.com/channel/"+u).then(function(e){return e.text()}).then(function(e){e.includes("AO VIVO")?t="true":t="false",Deno.env.set("laststatus",t)}).catch(function(e){console.log(e)});let s="";return fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+u+"&order=date&eventType=completed&type=video&key="+h).then(function(e){return e.text()}).then(function(e){let o=JSON.parse(e);console.log(o),s=o.items[0].id.videoId,Deno.env.set("lastdate",o.items[0].snippet.publishedAt),Deno.env.set("lastid",s),Deno.env.set("laststatus",t),Deno.env.set("lasthoursync",d.getHours().toString().trim())}).catch(function(e){t="Error",Deno.env.set("laststatus",t)}),[t,s]}export{p as default,v as live_info};