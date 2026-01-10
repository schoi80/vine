import{j as e}from"./iframe-CQV2Z_BM.js";import"./preload-helper-PPVm8Dsz.js";function a({className:c="",variant:u="rectangular",width:o,height:m}){const p={text:"rounded",circular:"rounded-full",rectangular:"rounded-md"},x={width:o,height:m};return e.jsx("div",{className:`bg-neutral-3 dark:bg-neutral-dark-3 animate-pulse ${p[u]} ${c}`,style:x,"aria-hidden":"true"})}function h(){return e.jsxs("div",{className:"flex gap-3 py-3",children:[e.jsx("div",{className:"w-8 shrink-0",children:e.jsx(a,{variant:"text",width:24,height:20})}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(a,{variant:"text",width:"100%",height:20}),e.jsx(a,{variant:"text",width:"95%",height:20}),e.jsx(a,{variant:"text",width:"80%",height:20}),e.jsxs("div",{className:"flex gap-2 pt-1",children:[e.jsx(a,{variant:"rectangular",width:60,height:24}),e.jsx(a,{variant:"rectangular",width:70,height:24}),e.jsx(a,{variant:"rectangular",width:55,height:24})]})]})]})}function g({verseCount:c=10}){return e.jsx("div",{className:"space-y-1",children:Array.from({length:c}).map((u,o)=>e.jsx(h,{},o))})}a.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'text' | 'circular' | 'rectangular'",elements:[{name:"literal",value:"'text'"},{name:"literal",value:"'circular'"},{name:"literal",value:"'rectangular'"}]},description:"",defaultValue:{value:"'rectangular'",computed:!1}},width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"VerseSkeleton"};g.__docgenInfo={description:"",methods:[],displayName:"ChapterSkeleton",props:{verseCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}}}};const j={title:"UI/Skeleton",component:a,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["text","circular","rectangular"]}}},t={args:{variant:"text",width:200,height:20}},r={args:{variant:"circular",width:48,height:48}},n={args:{variant:"rectangular",width:300,height:100}},s={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{variant:"text",width:200,height:16}),e.jsx(a,{variant:"text",width:300,height:20}),e.jsx(a,{variant:"circular",width:60,height:60}),e.jsx(a,{variant:"rectangular",width:400,height:120})]})},i={render:()=>e.jsx(h,{})},l={render:()=>e.jsx(g,{verseCount:5})},d={render:()=>e.jsxs("div",{className:"bg-neutral-2 dark:bg-neutral-dark-2 w-[400px] rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"circular",width:40,height:40}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(a,{variant:"text",width:"60%",height:16}),e.jsx(a,{variant:"text",width:"40%",height:14})]})]}),e.jsxs("div",{className:"mt-4 space-y-2",children:[e.jsx(a,{variant:"text",width:"100%",height:14}),e.jsx(a,{variant:"text",width:"95%",height:14}),e.jsx(a,{variant:"text",width:"80%",height:14})]}),e.jsxs("div",{className:"mt-4 flex gap-2",children:[e.jsx(a,{variant:"rectangular",width:80,height:32}),e.jsx(a,{variant:"rectangular",width:80,height:32})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: 200,
    height: 20
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'circular',
    width: 48,
    height: 48
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: 300,
    height: 100
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Skeleton variant="text" width={200} height={16} />
      <Skeleton variant="text" width={300} height={20} />
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="rectangular" width={400} height={120} />
    </div>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <VerseSkeleton />
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <ChapterSkeleton verseCount={5} />
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="bg-neutral-2 dark:bg-neutral-dark-2 w-[400px] rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={14} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="95%" height={14} />
        <Skeleton variant="text" width="80%" height={14} />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};const f=["Text","Circular","Rectangular","AllVariants","Verse","Chapter","CardSkeleton"];export{s as AllVariants,d as CardSkeleton,l as Chapter,r as Circular,n as Rectangular,t as Text,i as Verse,f as __namedExportsOrder,j as default};
