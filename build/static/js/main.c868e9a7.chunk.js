(window["webpackJsonpnrl-ladder-predictor"]=window["webpackJsonpnrl-ladder-predictor"]||[]).push([[0],{28:function(e,t,a){e.exports=a(39)},33:function(e,t,a){},36:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var r=a(0),o=a.n(r),n=a(17),s=a.n(n),i=(a(33),a(18)),l=a(19),c=a(26),h=a(20),d=a(27),m=a(41),u=a(42),g=a(43),p=a(21),v=a.n(p);var E="Sea Eagles",w="Eels",f=[["Storm",36,281],["Roosters",30,196],["Raiders",28,153],["Rabbitohs",28,83],[E,26,72],[w,26,27],["Panthers",22,-63],["Broncos",21,-52],["Sharks",20,2],["Tigers",20,-44],["Warriors",19,-62],["Knights",18,-21],["Cowboys",16,-99],["Dragons",16,-100],["Bulldogs",16,-174],["Titans",10,-199]],y=[[E,"Tigers"],["Titans",w],["Broncos","Panthers"],["Knights","Cowboys"],["Storm","Raiders"],["Rabbitohs","Bulldogs"],["Roosters","Warriors"],["Sharks","Dragons"],[w,"Bulldogs"],["Cowboys","Panthers"],["Broncos","Rabbitohs"],["Sharks","Warriors"],["Tigers","Knights"],["Dragons","Roosters"],["Storm","Titans"],["Raiders",E],["Cowboys","Bulldogs"],["Warriors","Rabbitohs"],["Broncos",w],["Knights","Titans"],[E,"Storm"],["Roosters","Panthers"],["Sharks","Raiders"],["Dragons","Tigers"],["Rabbitohs","Roosters"],[w,E],["Storm","Cowboys"],["Raiders","Warriors"],["Bulldogs","Broncos"],["Titans","Dragons"],["Tigers","Sharks"],["Panthers","Knights"]],b=[10,2,6,12,6,8,4,8,52,15,8,24,36,34,24,12,8,1,22,2,4,2,2,12,20,12,8,38,22,1,22,22,12,3,24,0,1,6,22,2,4,8,2,2,1,6,14,18,2,8,5,26,20,28,1,30,1,4,2,24,9,8,2,20,22,28,8,2,2,12,3,13,22,16,6,6,26,18,6,10,33,4,7,6,5,20,2,16,6,54,8,12,16,26,8],P={Storm:{name:"Storm",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Roosters:{name:"Roosters",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Raiders:{name:"Raiders",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Rabbitohs:{name:"Rabbitohs",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},"Sea Eagles":{name:E,top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Eels:{name:w,top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Broncos:{name:"Broncos",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Sharks:{name:"Sharks",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Tigers:{name:"Tigers",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Panthers:{name:"Panthers",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Knights:{name:"Knights",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Warriors:{name:"Warriors",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Cowboys:{name:"Cowboys",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Dragons:{name:"Dragons",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Bulldogs:{name:"Bulldogs",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0},Titans:{name:"Titans",top8:0,top4:0,highest:0,lowest:0,average:0,averagePoints:0}},T=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).ladder=f,a.currentIterations=0,a.iterations=1,a.loopTime=500,a.ladderType="dynamic",a.loop=null,a.state={currentIterations:0,speed:"slow"},a.record=v.a.extend(!0,{},P),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.loop=setInterval(function(){e.calculatePercentage()},this.loopTime)}},{key:"componentWillUnmount",value:function(){clearInterval(this.loop)}},{key:"calculateSeasonResults",value:function(e){for(var t=0;t<e.length;t++){var a=e[t][0];t<8?this.record[a].top8++:e[t][1]===e[7][1]&&"basic"===this.ladderType&&this.record[a].top8++,t<4?this.record[a].top4++:e[t][1]===e[3][1]&&"basic"===this.ladderType&&this.record[a].top4++,(0===this.record[a].lowest||this.record[a].lowest<t+1)&&(this.record[a].lowest=t+1),(0===this.record[a].highest||this.record[a].highest>t+1)&&(this.record[a].highest=t+1),this.record[a].average=(this.record[a].average*(this.currentIterations-1)+(t+1))/this.currentIterations,this.record[a].averagePoints=(this.record[a].averagePoints*(this.currentIterations-1)+e[t][1])/this.currentIterations}}},{key:"calculatePercentage",value:function(){for(var e=0;e<this.iterations;e++){this.currentIterations++;for(var t=f.map(function(e){return e.slice()}),a=0;a<y.length;a++){var r=Math.floor(2*Math.random()),o=1===r?y[a][1]:y[a][0],n=1===r?y[a][0]:y[a][1],s=b[Math.floor(Math.random()*b.length)],i=2;0===s&&(i=1);for(var l=0;l<t.length;l++)t[l][0]===o&&(t[l][1]+=i,"dynamic"===this.ladderType&&(t[l][2]+=s)),t[l][0]===n&&(0===i&&(t[l][1]+=i),"dynamic"===this.ladderType&&(t[l][2]-=s))}t.sort(this.compareSecondColumn),this.calculateSeasonResults(t)}this.setState({})}},{key:"printLadder",value:function(){var e=this,t=[],a=Object.entries(this.record);return a.sort(this.compareTop8Column),a.map(function(r,n){var s=Math.floor(a[n][1].top8/e.currentIterations*1e4)/100,i=isNaN(s)?0:s,l=Math.floor(a[n][1].top4/e.currentIterations*1e4)/100,c=isNaN(l)?0:l;return t.push(o.a.createElement("tr",{key:n},o.a.createElement("td",null,n+1),o.a.createElement("td",null,r[1].name),o.a.createElement("td",null,i.toFixed(2)),o.a.createElement("td",null,c.toFixed(2)),o.a.createElement("td",null,r[1].highest),o.a.createElement("td",null,r[1].lowest),o.a.createElement("td",null,r[1].average.toFixed(2)),o.a.createElement("td",null,r[1].averagePoints.toFixed(2)))),!1}),t}},{key:"compareSecondColumn",value:function(e,t){return e[1]===t[1]?e[2]>t[2]?-1:1:e[1]>t[1]?-1:1}},{key:"compareTop8Column",value:function(e,t){return e[1].average===t[1].average?0:e[1].average<t[1].average?-1:1}},{key:"changeSpeed",value:function(e){var t=this;this.setState({speed:e}),"slow"===e?(this.loopTime=500,this.iterations=1):"medium"===e?(this.loopTime=200,this.iterations=1):"fast"===e&&(this.loopTime=50,this.iterations=100),clearInterval(this.loop),this.loop=setInterval(function(){t.calculatePercentage()},this.loopTime)}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"NRL Ladder Predictor"),o.a.createElement(m.a,null,o.a.createElement(u.a,null,o.a.createElement(g.a,{xs:"12",md:"3"},o.a.createElement("div",{className:"controls",role:"radiogroup"},o.a.createElement("div",null,"Simulations: ",this.currentIterations," "),o.a.createElement("div",{id:"loop-speed"},"Speed:"),o.a.createElement("div",null,o.a.createElement("label",{className:"radio-container",htmlFor:"slow"},o.a.createElement("input",{id:"slow",name:"speed",type:"radio",onChange:function(t){e.changeSpeed("slow")},checked:"slow"===this.state.speed?"checked":""})," Slow")),o.a.createElement("div",null,o.a.createElement("label",{className:"radio-container",htmlFor:"medium"},o.a.createElement("input",{id:"medium",name:"speed",type:"radio",onChange:function(t){e.changeSpeed("medium")},checked:"medium"===this.state.speed?"checked":""})," Medium")),o.a.createElement("div",null,o.a.createElement("label",{className:"radio-container",htmlFor:"fast"},o.a.createElement("input",{id:"fast",name:"speed",type:"radio",onChange:function(t){e.changeSpeed("fast")},checked:"fast"===this.state.speed?"checked":""})," Fast")))),o.a.createElement(g.a,{xs:"12",md:"9"},o.a.createElement("div",{className:"ladder"},o.a.createElement("table",null,o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Pos."),o.a.createElement("th",null,"Team"),o.a.createElement("th",null,"Top 8 %"),o.a.createElement("th",null,"Top 4 %"),o.a.createElement("th",null,"Highest"),o.a.createElement("th",null,"Lowest"),o.a.createElement("th",null,"Average"),o.a.createElement("th",null,"Points")),this.printLadder())))))))}}]),t}(o.a.Component),k=(a(36),a(8));var S=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("link",{href:"https://fonts.googleapis.com/css?family=Oxygen&display=swap",rel:"stylesheet"}),o.a.createElement("link",{href:"https://fonts.googleapis.com/css?family=Cutive+Mono&display=swap",rel:"stylesheet"}),o.a.createElement("div",{className:"App"},o.a.createElement(k.a,{exact:!0,path:"/",render:function(){return o.a.createElement(T,null)}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var R=a(11);s.a.render(o.a.createElement(R.a,{basename:"/nrl-ladder-predictor"},o.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[28,1,2]]]);
//# sourceMappingURL=main.c868e9a7.chunk.js.map