import{j as e}from"./iframe-CQV2Z_BM.js";import{B as a}from"./Badge-baWHrtAt.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon--QKcfQRb.js";import"./createLucideIcon-B3dF04K8.js";import"./proxy-qBfNeM4V.js";const G={title:"UI/Badge",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["person","place","event","book","neutral"]},mode:{control:"select",options:["entity","generic"]},variant:{control:"select",options:["default","subtle"]},size:{control:"select",options:["sm","md"]},interactive:{control:"boolean"},motion:{control:"boolean"}}},s={args:{type:"person",label:"Abraham"}},l={args:{type:"place",label:"Jerusalem"}},t={args:{type:"event",label:"Creation"}},o={args:{type:"book",label:"Genesis"}},c={args:{type:"person",label:"Abraham",labelKr:"아브라함"}},p={args:{type:"person",label:"Moses",frequency:42}},i={args:{type:"place",label:"Egypt",interactive:!0,onClick:()=>alert("Clicked Egypt!")}},u={args:{type:"event",label:"Exodus",variant:"subtle"}},y={args:{type:"person",label:"David",size:"sm"}},g={args:{type:"person",label:"David",size:"md"}},m={args:{mode:"generic",type:"neutral",label:"Filter"}},b={args:{mode:"generic",type:"neutral",label:"Category",variant:"subtle"}},d={args:{mode:"generic",type:"neutral",label:"Before",interactive:!0,onClick:()=>alert("Clicked Before!")}},f={args:{mode:"generic",type:"neutral",label:"No Icon",showGenericIcon:!1}},v={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx(a,{type:"person",label:"Abraham"}),e.jsx(a,{type:"place",label:"Jerusalem"}),e.jsx(a,{type:"event",label:"Creation"}),e.jsx(a,{type:"book",label:"Genesis"}),e.jsx(a,{mode:"generic",type:"neutral",label:"Neutral"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(a,{type:"person",label:"Abraham",variant:"subtle"}),e.jsx(a,{type:"place",label:"Jerusalem",variant:"subtle"}),e.jsx(a,{type:"event",label:"Creation",variant:"subtle"}),e.jsx(a,{type:"book",label:"Genesis",variant:"subtle"}),e.jsx(a,{mode:"generic",type:"neutral",label:"Neutral",variant:"subtle"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(a,{type:"person",label:"Moses",frequency:42}),e.jsx(a,{type:"place",label:"Egypt",frequency:15}),e.jsx(a,{type:"event",label:"Exodus",frequency:8}),e.jsx(a,{type:"book",label:"Leviticus",frequency:5}),e.jsx(a,{mode:"generic",type:"neutral",label:"Neutral"})]})]})},x={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(a,{type:"person",label:"Abraham",labelKr:"아브라함"}),e.jsx(a,{type:"place",label:"Jerusalem",labelKr:"예루살렘"}),e.jsx(a,{type:"event",label:"Creation",labelKr:"창조"})]})},h={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{mode:"generic",type:"neutral",label:"Before",interactive:!0}),e.jsx(a,{mode:"generic",type:"neutral",label:"After",interactive:!0}),e.jsx(a,{mode:"generic",type:"neutral",label:"Timeline",interactive:!0})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{mode:"generic",type:"neutral",label:"Filter",variant:"subtle"}),e.jsx(a,{mode:"generic",type:"neutral",label:"Category",variant:"subtle"}),e.jsx(a,{mode:"generic",type:"neutral",label:"Tag",variant:"subtle"})]})]})},q={args:{entities:[{type:"person",slug:"abraham",label:"Abraham",frequency:15},{type:"person",slug:"sarah",label:"Sarah",frequency:8},{type:"place",slug:"egypt",label:"Egypt",frequency:12},{type:"place",slug:"canaan",label:"Canaan",frequency:6},{type:"event",slug:"creation",label:"Creation",frequency:3}],onEntityClick:(r,n)=>alert(`Clicked ${n}: ${r}`)}},j={args:{entities:[{type:"person",slug:"abraham",label:"Abraham",frequency:15},{type:"person",slug:"sarah",label:"Sarah",frequency:8},{type:"person",slug:"isaac",label:"Isaac",frequency:12},{type:"person",slug:"jacob",label:"Jacob",frequency:18},{type:"person",slug:"joseph",label:"Joseph",frequency:22},{type:"person",slug:"moses",label:"Moses",frequency:42},{type:"place",slug:"egypt",label:"Egypt",frequency:12},{type:"place",slug:"canaan",label:"Canaan",frequency:6}],onEntityClick:(r,n)=>alert(`Clicked ${n}: ${r}`)}},C={args:{entities:[{type:"person",slug:"abraham",label:"Abraham",frequency:15},{type:"person",slug:"sarah",label:"Sarah",frequency:8},{type:"person",slug:"isaac",label:"Isaac",frequency:12},{type:"person",slug:"jacob",label:"Jacob",frequency:18},{type:"person",slug:"joseph",label:"Joseph",frequency:22},{type:"person",slug:"moses",label:"Moses",frequency:42},{type:"place",slug:"egypt",label:"Egypt",frequency:12},{type:"place",slug:"canaan",label:"Canaan",frequency:6}],maxVisible:5,onEntityClick:(r,n)=>alert(`Clicked ${n}: ${r}`)}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'person',
    label: 'Abraham'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'place',
    label: 'Jerusalem'
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'event',
    label: 'Creation'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'book',
    label: 'Genesis'
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'person',
    label: 'Abraham',
    labelKr: '아브라함'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'person',
    label: 'Moses',
    frequency: 42
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'place',
    label: 'Egypt',
    interactive: true,
    onClick: () => alert('Clicked Egypt!')
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'event',
    label: 'Exodus',
    variant: 'subtle'
  }
}`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'person',
    label: 'David',
    size: 'sm'
  }
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'person',
    label: 'David',
    size: 'md'
  }
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'Filter'
  }
}`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'Category',
    variant: 'subtle'
  }
}`,...b.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'Before',
    interactive: true,
    onClick: () => alert('Clicked Before!')
  }
}`,...d.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'No Icon',
    showGenericIcon: false
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge type="person" label="Abraham" />
        <Badge type="place" label="Jerusalem" />
        <Badge type="event" label="Creation" />
        <Badge type="book" label="Genesis" />
        <Badge mode="generic" type="neutral" label="Neutral" />
      </div>
      <div className="flex gap-2">
        <Badge type="person" label="Abraham" variant="subtle" />
        <Badge type="place" label="Jerusalem" variant="subtle" />
        <Badge type="event" label="Creation" variant="subtle" />
        <Badge type="book" label="Genesis" variant="subtle" />
        <Badge mode="generic" type="neutral" label="Neutral" variant="subtle" />
      </div>
      <div className="flex gap-2">
        <Badge type="person" label="Moses" frequency={42} />
        <Badge type="place" label="Egypt" frequency={15} />
        <Badge type="event" label="Exodus" frequency={8} />
        <Badge type="book" label="Leviticus" frequency={5} />
        <Badge mode="generic" type="neutral" label="Neutral" />
      </div>
    </div>
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-2">
      <Badge type="person" label="Abraham" labelKr="아브라함" />
      <Badge type="place" label="Jerusalem" labelKr="예루살렘" />
      <Badge type="event" label="Creation" labelKr="창조" />
    </div>
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge mode="generic" type="neutral" label="Before" interactive />
        <Badge mode="generic" type="neutral" label="After" interactive />
        <Badge mode="generic" type="neutral" label="Timeline" interactive />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge mode="generic" type="neutral" label="Filter" variant="subtle" />
        <Badge mode="generic" type="neutral" label="Category" variant="subtle" />
        <Badge mode="generic" type="neutral" label="Tag" variant="subtle" />
      </div>
    </div>
}`,...h.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    entities: [{
      type: 'person',
      slug: 'abraham',
      label: 'Abraham',
      frequency: 15
    }, {
      type: 'person',
      slug: 'sarah',
      label: 'Sarah',
      frequency: 8
    }, {
      type: 'place',
      slug: 'egypt',
      label: 'Egypt',
      frequency: 12
    }, {
      type: 'place',
      slug: 'canaan',
      label: 'Canaan',
      frequency: 6
    }, {
      type: 'event',
      slug: 'creation',
      label: 'Creation',
      frequency: 3
    }],
    onEntityClick: (slug: string, type: string) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...q.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    entities: [{
      type: 'person',
      slug: 'abraham',
      label: 'Abraham',
      frequency: 15
    }, {
      type: 'person',
      slug: 'sarah',
      label: 'Sarah',
      frequency: 8
    }, {
      type: 'person',
      slug: 'isaac',
      label: 'Isaac',
      frequency: 12
    }, {
      type: 'person',
      slug: 'jacob',
      label: 'Jacob',
      frequency: 18
    }, {
      type: 'person',
      slug: 'joseph',
      label: 'Joseph',
      frequency: 22
    }, {
      type: 'person',
      slug: 'moses',
      label: 'Moses',
      frequency: 42
    }, {
      type: 'place',
      slug: 'egypt',
      label: 'Egypt',
      frequency: 12
    }, {
      type: 'place',
      slug: 'canaan',
      label: 'Canaan',
      frequency: 6
    }],
    onEntityClick: (slug: string, type: string) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...j.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    entities: [{
      type: 'person',
      slug: 'abraham',
      label: 'Abraham',
      frequency: 15
    }, {
      type: 'person',
      slug: 'sarah',
      label: 'Sarah',
      frequency: 8
    }, {
      type: 'person',
      slug: 'isaac',
      label: 'Isaac',
      frequency: 12
    }, {
      type: 'person',
      slug: 'jacob',
      label: 'Jacob',
      frequency: 18
    }, {
      type: 'person',
      slug: 'joseph',
      label: 'Joseph',
      frequency: 22
    }, {
      type: 'person',
      slug: 'moses',
      label: 'Moses',
      frequency: 42
    }, {
      type: 'place',
      slug: 'egypt',
      label: 'Egypt',
      frequency: 12
    }, {
      type: 'place',
      slug: 'canaan',
      label: 'Canaan',
      frequency: 6
    }],
    maxVisible: 5,
    onEntityClick: (slug: string, type: string) => alert(\`Clicked \${type}: \${slug}\`)
  }
}`,...C.parameters?.docs?.source}}};const J=["Person","Place","Event","Book","WithKorean","WithFrequency","Interactive","Subtle","Small","Medium","GenericNeutral","GenericNeutralSubtle","GenericNeutralInteractive","GenericWithoutIcon","AllTypes","BilingualExamples","GenericExamples","TagList","ManyEntities","ManyEntitiesCollapsed"];export{v as AllTypes,x as BilingualExamples,o as Book,t as Event,h as GenericExamples,m as GenericNeutral,d as GenericNeutralInteractive,b as GenericNeutralSubtle,f as GenericWithoutIcon,i as Interactive,j as ManyEntities,C as ManyEntitiesCollapsed,g as Medium,s as Person,l as Place,y as Small,u as Subtle,q as TagList,p as WithFrequency,c as WithKorean,J as __namedExportsOrder,G as default};
