import{j as e}from"./iframe-CQV2Z_BM.js";import{L as r}from"./LoadingSpinner-CLm0exkm.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"UI/LoadingSpinner",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}}},s={args:{size:"sm"}},a={args:{size:"md"}},n={args:{size:"lg"}},i={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(r,{size:"sm",ariaLabel:"Small spinner"}),e.jsx(r,{size:"md",ariaLabel:"Medium spinner"}),e.jsx(r,{size:"lg",ariaLabel:"Large spinner"})]})},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(r,{size:"sm"}),e.jsx("span",{children:"Loading content..."})]}),e.jsxs("button",{className:"bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 inline-flex items-center gap-2 rounded-md px-4 py-2",children:[e.jsx(r,{size:"sm"}),"Processing"]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'lg'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <LoadingSpinner size="sm" ariaLabel="Small spinner" />
      <LoadingSpinner size="md" ariaLabel="Medium spinner" />
      <LoadingSpinner size="lg" ariaLabel="Large spinner" />
    </div>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <LoadingSpinner size="sm" />
        <span>Loading content...</span>
      </div>
      <button className="bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 inline-flex items-center gap-2 rounded-md px-4 py-2">
        <LoadingSpinner size="sm" />
        Processing
      </button>
    </div>
}`,...o.parameters?.docs?.source}}};const c=["Small","Medium","Large","AllSizes","InContext"];export{i as AllSizes,o as InContext,n as Large,a as Medium,s as Small,c as __namedExportsOrder,m as default};
