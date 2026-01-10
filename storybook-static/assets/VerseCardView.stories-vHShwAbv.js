import{j as a}from"./iframe-CQV2Z_BM.js";import{p as W,a as j}from"./parseEntityMentions-Cm2soQZX.js";import{B as _}from"./Badge-baWHrtAt.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon--QKcfQRb.js";import"./createLucideIcon-B3dF04K8.js";import"./proxy-qBfNeM4V.js";function L({verseNum:e,text:t,secondaryText:f,entities:l,language:E,showDualLanguage:V=!1,compact:$=!1,isSelected:q=!1,onEntityClick:w,onEntityHover:C,hoveredEntity:D=null,className:I=""}){const N=n=>W(n).map((b,T)=>{if(b.type==="text"){const o=j(b.content);return a.jsx("span",{children:o.map((s,S)=>s.italic?a.jsx("em",{children:s.text},S):a.jsx("span",{children:s.text},S))},T)}const r=b.entity,G=`${r.type}-${r.slug}`,x=D===G,H={person:`text-accent-person dark:text-accent-person-dark border-1 ${x?"border-accent-person dark:border-accent-person-dark bg-accent-person-bg dark:bg-accent-person-dark-bg":"border-accent-person/30 dark:border-accent-person-dark/30"}`,place:`text-accent-place dark:text-accent-place-dark border-1 ${x?"border-accent-place dark:border-accent-place-dark bg-accent-place-bg dark:bg-accent-place-dark-bg":"border-accent-place/30 dark:border-accent-place-dark/30"}`,event:`text-accent-event dark:text-accent-event-dark border-1 ${x?"border-accent-event dark:border-accent-event-dark bg-accent-event-bg dark:bg-accent-event-dark-bg":"border-accent-event/30 dark:border-accent-event-dark/30"}`},M=j(r.displayText);return a.jsx("button",{type:"button",onClick:()=>w?.(r.type,r.slug),className:`${H[r.type]} duration-motion-quick cursor-pointer rounded-sm px-0.5 font-medium transition-all`,onMouseEnter:()=>C?.(G),onMouseLeave:()=>C?.(null),"aria-label":`Open details for ${r.displayText}`,children:M.map((o,s)=>o.italic?a.jsx("em",{children:o.text},s):a.jsx("span",{children:o.text},s))},T)}),K=l.length>0;return a.jsx("div",{className:`group ${$?"py-2":"py-3"} ${q?"bg-neutral-3 dark:bg-neutral-dark-3 -mx-2 rounded-md px-2":""} transition-colors`,role:"article","aria-label":`Verse ${e}`,children:a.jsxs("div",{className:"space-y-1",children:[a.jsxs("div",{children:[a.jsxs("p",{className:` ${E==="ko"?"text-verse-kr font-noto-serif-kr":"text-verse font-source-serif"} text-neutral-12 dark:text-neutral-dark-12 leading-relaxed ${I} `,children:[a.jsx("sup",{className:"text-neutral-9 dark:text-neutral-dark-9 mr-1 font-semibold select-none",children:e}),N(t)]}),V&&f&&a.jsx("p",{className:`${E==="ko"?"font-source-serif":"text-verse-kr font-noto-serif-kr"} text-neutral-11 dark:text-neutral-dark-11 border-neutral-4 dark:border-neutral-dark-4 border-l-2 pl-4 leading-relaxed`,style:{fontSize:"0.9375rem"},children:N(f)})]}),K&&!$&&a.jsxs("div",{className:"flex flex-wrap gap-2",children:[l.slice(0,5).map(n=>a.jsx(_,{type:n.type,label:n.label,variant:"subtle",size:"sm",interactive:!0,onClick:()=>w?.(n.type,n.slug)},`${n.type}-${n.slug}`)),l.length>5&&a.jsxs("span",{className:"text-neutral-10 dark:text-neutral-dark-10 px-2 py-1 text-xs",children:["+",l.length-5," more"]})]})]})})}L.__docgenInfo={description:"",methods:[],displayName:"VerseCardView",props:{verseNum:{required:!0,tsType:{name:"number"},description:""},text:{required:!0,tsType:{name:"string"},description:""},secondaryText:{required:!1,tsType:{name:"string"},description:""},entities:{required:!0,tsType:{name:"Array",elements:[{name:"Entity"}],raw:"Entity[]"},description:""},language:{required:!0,tsType:{name:"union",raw:"'en' | 'ko'",elements:[{name:"literal",value:"'en'"},{name:"literal",value:"'ko'"}]},description:""},showDualLanguage:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isSelected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onEntityClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(type: EntityType, slug: string) => void",signature:{arguments:[{type:{name:"EntityType"},name:"type"},{type:{name:"string"},name:"slug"}],return:{name:"void"}}},description:""},onEntityHover:{required:!1,tsType:{name:"signature",type:"function",raw:"(entityKey: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"entityKey"}],return:{name:"void"}}},description:""},hoveredEntity:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const X={title:"Reading/VerseCardView",component:L,parameters:{layout:"padded"},tags:["autodocs"]},A=[{type:"person",slug:"god",label:"God"},{type:"person",slug:"adam",label:"Adam"},{type:"place",slug:"eden",label:"Eden"}],J=[{type:"person",slug:"abraham",label:"Abraham"},{type:"person",slug:"isaac",label:"Isaac"},{type:"person",slug:"jacob",label:"Jacob"},{type:"place",slug:"canaan",label:"Canaan"},{type:"place",slug:"egypt",label:"Egypt"},{type:"event",slug:"covenant",label:"Covenant with Abraham"},{type:"event",slug:"exodus",label:"The Exodus"}],i={args:{verseNum:1,text:"In the beginning [God] created the heavens and the earth.",entities:A,language:"en",onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`)}},d={args:{verseNum:1,text:"태초에 [하나님]이 천지를 창조하시니라",entities:[{type:"person",slug:"god",label:"하나님"}],language:"ko",onEntityClick:(e,t)=>alert(`클릭: ${e} - ${t}`)}},c={args:{verseNum:3,text:'And [God] said, "Let there be light," and there was light.',secondaryText:"[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고",entities:[{type:"person",slug:"god",label:"God"}],language:"en",showDualLanguage:!0,onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`)}},u={args:{verseNum:3,text:"[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고",secondaryText:'And [God] said, "Let there be light," and there was light.',entities:[{type:"person",slug:"god",label:"하나님"}],language:"ko",showDualLanguage:!0,onEntityClick:(e,t)=>alert(`클릭: ${e} - ${t}`)}},g={args:{verseNum:1,text:'The *word* of the Lord came to me, saying, "Son of man..."',entities:[],language:"en"}},p={args:{verseNum:12,text:"And [God] spoke to [Abraham], [Isaac], and [Jacob] in the land of [Canaan] before the journey to [Egypt], establishing a [covenant].",entities:J,language:"en",onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`)}},m={args:{verseNum:5,text:"And there was evening, and there was morning—the first day.",entities:[],language:"en"}},h={args:{verseNum:7,text:"[God] made the vault and separated the water under the vault from the water above it.",entities:[{type:"person",slug:"god",label:"God"}],language:"en",compact:!0,onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`)}},y={args:{verseNum:2,text:"Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of [God] was hovering over the waters.",entities:[{type:"person",slug:"god",label:"God"}],language:"en",isSelected:!0,onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`)}},k={args:{verseNum:1,text:"In the beginning [God] created the heavens and the earth.",entities:A,language:"en",hoveredEntity:"person-god",onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`),onEntityHover:e=>console.log("Hovered:",e)}},v={args:{verseNum:24,text:'Then [God] said, "Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind." And it was so. [God] made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And [God] saw that it was good.',entities:[{type:"person",slug:"god",label:"God"}],language:"en",onEntityClick:(e,t)=>alert(`Clicked ${e}: ${t}`)}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 1,
    text: 'In the beginning [God] created the heavens and the earth.',
    entities: sampleEntities,
    language: 'en',
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 1,
    text: '태초에 [하나님]이 천지를 창조하시니라',
    entities: [{
      type: 'person' as EntityType,
      slug: 'god',
      label: '하나님'
    }],
    language: 'ko',
    onEntityClick: (type, slug) => alert(\`클릭: \${type} - \${slug}\`)
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 3,
    text: 'And [God] said, "Let there be light," and there was light.',
    secondaryText: '[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고',
    entities: [{
      type: 'person' as EntityType,
      slug: 'god',
      label: 'God'
    }],
    language: 'en',
    showDualLanguage: true,
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 3,
    text: '[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고',
    secondaryText: 'And [God] said, "Let there be light," and there was light.',
    entities: [{
      type: 'person' as EntityType,
      slug: 'god',
      label: '하나님'
    }],
    language: 'ko',
    showDualLanguage: true,
    onEntityClick: (type, slug) => alert(\`클릭: \${type} - \${slug}\`)
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 1,
    text: 'The *word* of the Lord came to me, saying, "Son of man..."',
    entities: [],
    language: 'en'
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 12,
    text: 'And [God] spoke to [Abraham], [Isaac], and [Jacob] in the land of [Canaan] before the journey to [Egypt], establishing a [covenant].',
    entities: manyEntities,
    language: 'en',
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 5,
    text: 'And there was evening, and there was morning—the first day.',
    entities: [],
    language: 'en'
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 7,
    text: '[God] made the vault and separated the water under the vault from the water above it.',
    entities: [{
      type: 'person' as EntityType,
      slug: 'god',
      label: 'God'
    }],
    language: 'en',
    compact: true,
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 2,
    text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of [God] was hovering over the waters.',
    entities: [{
      type: 'person' as EntityType,
      slug: 'god',
      label: 'God'
    }],
    language: 'en',
    isSelected: true,
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 1,
    text: 'In the beginning [God] created the heavens and the earth.',
    entities: sampleEntities,
    language: 'en',
    hoveredEntity: 'person-god',
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`),
    onEntityHover: entityKey => console.log('Hovered:', entityKey)
  }
}`,...k.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    verseNum: 24,
    text: 'Then [God] said, "Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind." And it was so. [God] made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And [God] saw that it was good.',
    entities: [{
      type: 'person' as EntityType,
      slug: 'god',
      label: 'God'
    }],
    language: 'en',
    onEntityClick: (type, slug) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...v.parameters?.docs?.source}}};const Y=["Default","Korean","DualLanguage","DualLanguageKorean","WithItalics","ManyEntities","NoEntities","Compact","Selected","WithHover","LongVerse"];export{h as Compact,i as Default,c as DualLanguage,u as DualLanguageKorean,d as Korean,v as LongVerse,p as ManyEntities,m as NoEntities,y as Selected,k as WithHover,g as WithItalics,Y as __namedExportsOrder,X as default};
