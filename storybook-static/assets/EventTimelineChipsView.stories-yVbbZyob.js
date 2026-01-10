import{j as n}from"./iframe-CQV2Z_BM.js";import{C as b}from"./ChipList-8ONCzUs-.js";import{L as C}from"./LoadingSpinner-CLm0exkm.js";import{c as x}from"./createLucideIcon-B3dF04K8.js";import"./preload-helper-PPVm8Dsz.js";import"./Badge-baWHrtAt.js";import"./Icon--QKcfQRb.js";import"./proxy-qBfNeM4V.js";import"./Button-D_mMFZJa.js";const T=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],f=x("clock",T);function g({beforeItems:e,afterItems:m,loading:y=!1,title:u,beforeLabel:L,afterLabel:h,loadingLabel:I,onItemClick:d}){return y?n.jsx("div",{className:"space-y-2",children:n.jsxs("h3",{className:"text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase",children:[n.jsx(f,{className:"h-3.5 w-3.5"}),u,n.jsx(C,{size:"sm",ariaLabel:I,className:"ml-1"})]})}):e.length>0||m.length>0?n.jsxs("div",{className:"space-y-4",children:[n.jsxs("h3",{className:"text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase",children:[n.jsx(f,{className:"h-3.5 w-3.5"}),u]}),e.length>0&&n.jsxs("div",{className:"space-y-2",children:[n.jsx("h4",{className:"text-neutral-10 text-sm font-medium",children:L}),n.jsx(b,{items:e.map(t=>({id:t.slug,label:t.label,color:"event",frequency:t.frequency,onClick:()=>d?.(t.slug)})),interactive:!0})]}),m.length>0&&n.jsxs("div",{className:"space-y-2",children:[n.jsx("h4",{className:"text-neutral-10 text-sm font-medium",children:h}),n.jsx(b,{items:m.map(t=>({id:t.slug,label:t.label,color:"event",frequency:t.frequency,onClick:()=>d?.(t.slug)})),interactive:!0})]})]}):null}g.__docgenInfo={description:"",methods:[],displayName:"EventTimelineChipsView",props:{beforeItems:{required:!0,tsType:{name:"Array",elements:[{name:"EventItem"}],raw:"EventItem[]"},description:""},afterItems:{required:!0,tsType:{name:"Array",elements:[{name:"EventItem"}],raw:"EventItem[]"},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},title:{required:!0,tsType:{name:"string"},description:""},beforeLabel:{required:!0,tsType:{name:"string"},description:""},afterLabel:{required:!0,tsType:{name:"string"},description:""},loadingLabel:{required:!0,tsType:{name:"string"},description:""},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(slug: string) => void",signature:{arguments:[{type:{name:"string"},name:"slug"}],return:{name:"void"}}},description:""}}};const F={title:"Event/EventTimelineChipsView",component:g,parameters:{layout:"padded"},tags:["autodocs"]},p=[{type:"event",slug:"creation",label:"Creation"},{type:"event",slug:"fall",label:"The Fall"},{type:"event",slug:"flood",label:"The Great Flood"}],v=[{type:"event",slug:"covenant",label:"Covenant with Abraham"},{type:"event",slug:"exodus",label:"The Exodus"}],a={args:{beforeItems:p,afterItems:v,title:"Timeline",beforeLabel:"Before",afterLabel:"After",loadingLabel:"Loading...",onItemClick:e=>alert(`Clicked event: ${e}`)}},l={args:{beforeItems:[{type:"event",slug:"creation",label:"창조"},{type:"event",slug:"fall",label:"타락"}],afterItems:[{type:"event",slug:"covenant",label:"아브라함과의 언약"},{type:"event",slug:"exodus",label:"출애굽"}],title:"타임라인",beforeLabel:"이전",afterLabel:"이후",loadingLabel:"로딩 중...",onItemClick:e=>alert(`클릭: ${e}`)}},s={args:{beforeItems:p,afterItems:[],title:"Timeline",beforeLabel:"Before",afterLabel:"After",loadingLabel:"Loading...",onItemClick:e=>alert(`Clicked event: ${e}`)}},r={args:{beforeItems:[],afterItems:v,title:"Timeline",beforeLabel:"Before",afterLabel:"After",loadingLabel:"Loading...",onItemClick:e=>alert(`Clicked event: ${e}`)}},o={args:{beforeItems:[],afterItems:[],loading:!0,title:"Timeline",beforeLabel:"Before",afterLabel:"After",loadingLabel:"Loading timeline..."}},i={args:{beforeItems:[{type:"event",slug:"creation",label:"Creation"},{type:"event",slug:"fall",label:"The Fall"},{type:"event",slug:"flood",label:"The Great Flood"},{type:"event",slug:"babel",label:"Tower of Babel"},{type:"event",slug:"sodom",label:"Destruction of Sodom"}],afterItems:[{type:"event",slug:"covenant",label:"Covenant with Abraham"},{type:"event",slug:"isaac-birth",label:"Birth of Isaac"},{type:"event",slug:"jacob-ladder",label:"Jacob's Ladder"},{type:"event",slug:"joseph-egypt",label:"Joseph Sold to Egypt"},{type:"event",slug:"exodus",label:"The Exodus"},{type:"event",slug:"sinai",label:"Covenant at Sinai"}],title:"Timeline",beforeLabel:"Before",afterLabel:"After",loadingLabel:"Loading...",onItemClick:e=>alert(`Clicked event: ${e}`)}},c={args:{beforeItems:[{type:"event",slug:"creation",label:"Creation",frequency:12},{type:"event",slug:"fall",label:"The Fall",frequency:8}],afterItems:[{type:"event",slug:"covenant",label:"Covenant",frequency:15},{type:"event",slug:"exodus",label:"Exodus",frequency:24}],title:"Timeline",beforeLabel:"Before",afterLabel:"After",loadingLabel:"Loading...",onItemClick:e=>alert(`Clicked event: ${e}`)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: beforeEvents,
    afterItems: afterEvents,
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(\`Clicked event: \${slug}\`)
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: [{
      type: 'event' as const,
      slug: 'creation',
      label: '창조'
    }, {
      type: 'event' as const,
      slug: 'fall',
      label: '타락'
    }],
    afterItems: [{
      type: 'event' as const,
      slug: 'covenant',
      label: '아브라함과의 언약'
    }, {
      type: 'event' as const,
      slug: 'exodus',
      label: '출애굽'
    }],
    title: '타임라인',
    beforeLabel: '이전',
    afterLabel: '이후',
    loadingLabel: '로딩 중...',
    onItemClick: slug => alert(\`클릭: \${slug}\`)
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: beforeEvents,
    afterItems: [],
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(\`Clicked event: \${slug}\`)
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: [],
    afterItems: afterEvents,
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(\`Clicked event: \${slug}\`)
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: [],
    afterItems: [],
    loading: true,
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading timeline...'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: [{
      type: 'event' as const,
      slug: 'creation',
      label: 'Creation'
    }, {
      type: 'event' as const,
      slug: 'fall',
      label: 'The Fall'
    }, {
      type: 'event' as const,
      slug: 'flood',
      label: 'The Great Flood'
    }, {
      type: 'event' as const,
      slug: 'babel',
      label: 'Tower of Babel'
    }, {
      type: 'event' as const,
      slug: 'sodom',
      label: 'Destruction of Sodom'
    }],
    afterItems: [{
      type: 'event' as const,
      slug: 'covenant',
      label: 'Covenant with Abraham'
    }, {
      type: 'event' as const,
      slug: 'isaac-birth',
      label: 'Birth of Isaac'
    }, {
      type: 'event' as const,
      slug: 'jacob-ladder',
      label: "Jacob's Ladder"
    }, {
      type: 'event' as const,
      slug: 'joseph-egypt',
      label: 'Joseph Sold to Egypt'
    }, {
      type: 'event' as const,
      slug: 'exodus',
      label: 'The Exodus'
    }, {
      type: 'event' as const,
      slug: 'sinai',
      label: 'Covenant at Sinai'
    }],
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(\`Clicked event: \${slug}\`)
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    beforeItems: [{
      type: 'event' as const,
      slug: 'creation',
      label: 'Creation',
      frequency: 12
    }, {
      type: 'event' as const,
      slug: 'fall',
      label: 'The Fall',
      frequency: 8
    }],
    afterItems: [{
      type: 'event' as const,
      slug: 'covenant',
      label: 'Covenant',
      frequency: 15
    }, {
      type: 'event' as const,
      slug: 'exodus',
      label: 'Exodus',
      frequency: 24
    }],
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(\`Clicked event: \${slug}\`)
  }
}`,...c.parameters?.docs?.source}}};const _=["Default","Korean","OnlyBefore","OnlyAfter","Loading","LongList","WithCounts"];export{a as Default,l as Korean,o as Loading,i as LongList,r as OnlyAfter,s as OnlyBefore,c as WithCounts,_ as __namedExportsOrder,F as default};
