import{r as o,j as e}from"./iframe-CQV2Z_BM.js";import"./preload-helper-PPVm8Dsz.js";const O={creation:{id:"creation",title:"Creation",titleKr:"창조",color:"#fbbf24",sortOrder:1,minYear:-5e3,maxYear:-2350,keywords:["creation","adam","eve","garden","eden","cain","abel","seth"]},patriarchs:{id:"patriarchs",title:"Patriarchs",titleKr:"족장 시대",color:"#fb923c",sortOrder:2,minYear:-2350,maxYear:-1500,keywords:["abraham","isaac","jacob","joseph","patriarch","enoch","methuselah","noah","shem","ham","japheth"]},exodus:{id:"exodus",title:"Exodus",titleKr:"출애굽",color:"#f87171",sortOrder:3,minYear:-1500,maxYear:-1400,keywords:["moses","egypt","pharaoh","exodus","passover","sinai"]},conquest:{id:"conquest",title:"Conquest",titleKr:"정복 시대",color:"#ec4899",sortOrder:4,minYear:-1400,maxYear:-1350,keywords:["joshua","jericho","conquest","canaan"]},judges:{id:"judges",title:"Judges",titleKr:"사사 시대",color:"#a78bfa",sortOrder:5,minYear:-1350,maxYear:-1050,keywords:["judge","gideon","samson","deborah","samuel"]},"united-kingdom":{id:"united-kingdom",title:"United Kingdom",titleKr:"통일 왕국",color:"#818cf8",sortOrder:6,minYear:-1050,maxYear:-930,keywords:["saul","david","solomon","united kingdom"]},"divided-kingdom":{id:"divided-kingdom",title:"Divided Kingdom",titleKr:"분열 왕국",color:"#60a5fa",sortOrder:7,minYear:-930,maxYear:-586,keywords:["israel","judah","rehoboam","jeroboam","divided"]},exile:{id:"exile",title:"Exile",titleKr:"포로 시대",color:"#38bdf8",sortOrder:8,minYear:-586,maxYear:-539,keywords:["babylon","nebuchadnezzar","exile","captivity","daniel","ezekiel"]},return:{id:"return",title:"Return",titleKr:"귀환",color:"#22d3ee",sortOrder:9,minYear:-539,maxYear:-400,keywords:["ezra","nehemiah","return","rebuild","temple"]},intertestamental:{id:"intertestamental",title:"Intertestamental",titleKr:"중간 시대",color:"#34d399",sortOrder:10,minYear:-400,maxYear:-4,keywords:["maccabees","intertestamental"]},jesus:{id:"jesus",title:"Life of Jesus",titleKr:"예수의 생애",color:"#4ade80",sortOrder:11,minYear:-4,maxYear:34,keywords:["jesus","christ","gospel","bethlehem","crucifixion","resurrection"]},"early-church":{id:"early-church",title:"Early Church",titleKr:"초대 교회",color:"#84cc16",sortOrder:12,minYear:34,maxYear:330,keywords:["pentecost","paul","peter","apostle","church","acts"]},"middle-ages":{id:"middle-ages",title:"Middle Ages",titleKr:"중세 시대",color:"#9ca3af",sortOrder:33,minYear:330,maxYear:1517},reformation:{id:"reformation",title:"Reformation",titleKr:"종교 개혁",color:"#9ca3af",sortOrder:34,minYear:1517,maxYear:1840},"revelation-prophecies":{id:"revelation-prophecies",title:"Revelation & Prophecies",titleKr:"요한계시록과 예언",color:"#9ca3af",sortOrder:35,minYear:1840,maxYear:1/0}};function P(r){return O[r]||O["revelation-prophecies"]}function q(r){const a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);if(!a)return 0;const n=parseInt(a[1],16)/255,i=parseInt(a[2],16)/255,l=parseInt(a[3],16)/255,d=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4),c=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4),s=l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4);return .2126*d+.7152*c+.0722*s}function A(r){return q(r)>.5?"#000000":"#ffffff"}const L=o.createContext(null);function R({children:r}){const[a,n]=o.useState({isOpen:!1,type:null,slug:null,trigger:null}),i=o.useRef(null),l=o.useCallback((s,u,T)=>{i.current=T||null,n({isOpen:!0,type:s,slug:u,trigger:T||null})},[]),d=o.useCallback(()=>{n(s=>({...s,isOpen:!1,trigger:null})),i.current&&setTimeout(()=>{i.current?.focus(),i.current=null},100)},[]),c=o.useCallback(()=>{n(s=>({...s,type:null,slug:null}))},[]);return o.useEffect(()=>(a.isOpen?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[a.isOpen]),e.jsx(L.Provider,{value:{state:a,open:l,close:d,clearData:c},children:r})}function $(){const r=o.useContext(L);if(!r)throw new Error("useEntityPanel must be used within EntityPanelProvider");return r}R.__docgenInfo={description:"",methods:[],displayName:"EntityPanelProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function t({id:r,title:a,year:n,era:i,side:l,compact:d=!0,hoverable:c=!0,className:s=""}){const{open:u}=$(),m=P(i).color,Y=A(m),k=l==="left"?"right":"left",w=o.useMemo(()=>`gradient-${r.replace(/[^a-zA-Z0-9]/g,"")}`,[r]),K=()=>{u("event",r)},D=S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),u("event",r))};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          .${w} {
            background-image: linear-gradient(
              to right,
              ${m} 0%,
              ${m} 60%,
              transparent 100%
            );
          }
          @media (min-width: 640px) {
            .${w}.gradient-right {
              background-image: linear-gradient(
                to left,
                ${m} 0%,
                ${m} 60%,
                transparent 100%
              );
            }
          }
        `}),e.jsxs("button",{type:"button",onClick:K,onKeyDown:D,"aria-label":`Open details for ${a}`,className:`relative w-full px-3 transition-all motion-safe:duration-150 ${d?"min-h-12 py-2":"min-h-16 py-3"} ${c?"hover:shadow-2xl focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none":""} ${w} ${k==="right"?"gradient-right":""} ${s}`,style:{color:Y},children:[e.jsx("span",{className:`absolute top-2 left-3 text-[10px] font-semibold tracking-wide uppercase ${k==="left"?"sm:right-auto sm:left-3":"sm:right-3 sm:left-auto"}`,style:{color:Y,opacity:.8},children:n}),e.jsx("span",{className:`block pt-4 font-medium ${d?"text-sm":"text-base"} text-left ${k==="left"?"sm:text-left":"sm:text-right"}`,style:{color:Y},children:a})]})]})}t.__docgenInfo={description:"",methods:[],displayName:"TimelineEventBox",props:{id:{required:!0,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""},year:{required:!0,tsType:{name:"string"},description:""},era:{required:!0,tsType:{name:"EventEra"},description:""},side:{required:!0,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},compact:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},hoverable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const J={title:"Timeline/TimelineEventBox",component:t,decorators:[r=>e.jsx(R,{children:e.jsx("div",{className:"max-w-md",children:e.jsx(r,{})})})],parameters:{layout:"centered"},tags:["autodocs"]},p={args:{id:"event-1",title:"God Creates the Heavens and the Earth adsasdsadasd",year:"5000 BC",era:"creation",side:"left"}},g={args:{id:"event-2",title:"Abraham Called by God",year:"2000 BC",era:"patriarchs",side:"right"}},h={args:{id:"event-3",title:"Israelites Freed from Egypt",year:"1446 BC",era:"exodus",side:"left"}},f={args:{id:"event-4",title:"Jesus Born in Bethlehem",year:"4 BC",era:"jesus",side:"right"}},y={args:{id:"event-5",title:"Day of Pentecost",year:"30 AD",era:"early-church",side:"left"}},v={args:{id:"event-6",title:"Tower of Babel",year:"2200 BC",era:"patriarchs",side:"left"},name:"Left Side (Year on Right)"},x={args:{id:"event-7",title:"David Defeats Goliath",year:"1025 BC",era:"united-kingdom",side:"right"},name:"Right Side (Year on Left)"},E={args:{id:"event-8",title:"The Israelites Wander in the Desert for Forty Years After Leaving Egypt",year:"1446 BC",era:"exodus",side:"left"},name:"Long Title Wrapping (Left)"},C={args:{id:"event-8b",title:"God Commands Abraham to Sacrifice His Son Isaac on Mount Moriah",year:"2000 BC",era:"patriarchs",side:"right"},name:"Long Title Wrapping (Right)"},B={args:{id:"event-9",title:"Solomon Builds the Temple",year:"966 BC",era:"united-kingdom",side:"right",compact:!1}},b={args:{id:"event-10",title:"Fall of Jerusalem",year:"586 BC",era:"exile",side:"left",hoverable:!1}},j={args:{id:"all-eras",title:"All Eras Demo",year:"2000 BC",era:"patriarchs",side:"left"},render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{id:"e1",title:"Creation Event",year:"5000 BC",era:"creation",side:"left"}),e.jsx(t,{id:"e2",title:"Patriarchs Event",year:"2000 BC",era:"patriarchs",side:"right"}),e.jsx(t,{id:"e3",title:"Exodus Event",year:"1446 BC",era:"exodus",side:"left"}),e.jsx(t,{id:"e4",title:"Conquest Event",year:"1400 BC",era:"conquest",side:"right"}),e.jsx(t,{id:"e5",title:"Judges Event",year:"1200 BC",era:"judges",side:"left"}),e.jsx(t,{id:"e6",title:"United Kingdom Event",year:"1000 BC",era:"united-kingdom",side:"right"}),e.jsx(t,{id:"e7",title:"Divided Kingdom Event",year:"900 BC",era:"divided-kingdom",side:"left"}),e.jsx(t,{id:"e8",title:"Exile Event",year:"586 BC",era:"exile",side:"right"}),e.jsx(t,{id:"e9",title:"Return Event",year:"538 BC",era:"return",side:"left"}),e.jsx(t,{id:"e10",title:"Intertestamental Event",year:"200 BC",era:"intertestamental",side:"right"}),e.jsx(t,{id:"e11",title:"Jesus Event",year:"4 BC",era:"jesus",side:"left"}),e.jsx(t,{id:"e12",title:"Early Church Event",year:"30 AD",era:"early-church",side:"right"})]})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-1',
    title: 'God Creates the Heavens and the Earth adsasdsadasd',
    year: '5000 BC',
    era: 'creation',
    side: 'left'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-2',
    title: 'Abraham Called by God',
    year: '2000 BC',
    era: 'patriarchs',
    side: 'right'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-3',
    title: 'Israelites Freed from Egypt',
    year: '1446 BC',
    era: 'exodus',
    side: 'left'
  }
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-4',
    title: 'Jesus Born in Bethlehem',
    year: '4 BC',
    era: 'jesus',
    side: 'right'
  }
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-5',
    title: 'Day of Pentecost',
    year: '30 AD',
    era: 'early-church',
    side: 'left'
  }
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-6',
    title: 'Tower of Babel',
    year: '2200 BC',
    era: 'patriarchs',
    side: 'left'
  },
  name: 'Left Side (Year on Right)'
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-7',
    title: 'David Defeats Goliath',
    year: '1025 BC',
    era: 'united-kingdom',
    side: 'right'
  },
  name: 'Right Side (Year on Left)'
}`,...x.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-8',
    title: 'The Israelites Wander in the Desert for Forty Years After Leaving Egypt',
    year: '1446 BC',
    era: 'exodus',
    side: 'left'
  },
  name: 'Long Title Wrapping (Left)'
}`,...E.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-8b',
    title: 'God Commands Abraham to Sacrifice His Son Isaac on Mount Moriah',
    year: '2000 BC',
    era: 'patriarchs',
    side: 'right'
  },
  name: 'Long Title Wrapping (Right)'
}`,...C.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-9',
    title: 'Solomon Builds the Temple',
    year: '966 BC',
    era: 'united-kingdom',
    side: 'right',
    compact: false
  }
}`,...B.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'event-10',
    title: 'Fall of Jerusalem',
    year: '586 BC',
    era: 'exile',
    side: 'left',
    hoverable: false
  }
}`,...b.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'all-eras',
    title: 'All Eras Demo',
    year: '2000 BC',
    era: 'patriarchs',
    side: 'left'
  },
  render: () => <div className="space-y-4">
      <TimelineEventBox id="e1" title="Creation Event" year="5000 BC" era="creation" side="left" />
      <TimelineEventBox id="e2" title="Patriarchs Event" year="2000 BC" era="patriarchs" side="right" />
      <TimelineEventBox id="e3" title="Exodus Event" year="1446 BC" era="exodus" side="left" />
      <TimelineEventBox id="e4" title="Conquest Event" year="1400 BC" era="conquest" side="right" />
      <TimelineEventBox id="e5" title="Judges Event" year="1200 BC" era="judges" side="left" />
      <TimelineEventBox id="e6" title="United Kingdom Event" year="1000 BC" era="united-kingdom" side="right" />
      <TimelineEventBox id="e7" title="Divided Kingdom Event" year="900 BC" era="divided-kingdom" side="left" />
      <TimelineEventBox id="e8" title="Exile Event" year="586 BC" era="exile" side="right" />
      <TimelineEventBox id="e9" title="Return Event" year="538 BC" era="return" side="left" />
      <TimelineEventBox id="e10" title="Intertestamental Event" year="200 BC" era="intertestamental" side="right" />
      <TimelineEventBox id="e11" title="Jesus Event" year="4 BC" era="jesus" side="left" />
      <TimelineEventBox id="e12" title="Early Church Event" year="30 AD" era="early-church" side="right" />
    </div>
}`,...j.parameters?.docs?.source}}};const W=["CreationEra","PatriarchsEra","ExodusEra","JesusEra","EarlyChurchEra","LeftSideYearOnRight","RightSideYearOnLeft","LongTitleWrapping","LongTitleWrappingRight","NotCompact","NotHoverable","AllEras"];export{j as AllEras,p as CreationEra,y as EarlyChurchEra,h as ExodusEra,f as JesusEra,v as LeftSideYearOnRight,E as LongTitleWrapping,C as LongTitleWrappingRight,B as NotCompact,b as NotHoverable,g as PatriarchsEra,x as RightSideYearOnLeft,W as __namedExportsOrder,J as default};
