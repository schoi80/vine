import{j as a}from"./iframe-CQV2Z_BM.js";import{B as e}from"./Button-D_mMFZJa.js";import{c as h}from"./createLucideIcon-B3dF04K8.js";import{X as g}from"./x-BvNsjeNe.js";import"./preload-helper-PPVm8Dsz.js";import"./proxy-qBfNeM4V.js";const B=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],y=h("download",B);const x=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],v=h("plus",x),D={title:"UI/Button",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","subtle","ghost","danger"]},size:{control:"select",options:["sm","md"]},iconOnly:{control:"boolean"},fullWidth:{control:"boolean"},loading:{control:"boolean"},disabled:{control:"boolean"}}},r={args:{variant:"primary",children:"Primary Button"}},s={args:{variant:"subtle",children:"Subtle Button"}},t={args:{variant:"ghost",children:"Ghost Button"}},n={args:{variant:"danger",children:"Delete"}},o={args:{size:"sm",children:"Small Button"}},l={args:{size:"md",children:"Medium Button"}},i={args:{children:a.jsxs(a.Fragment,{children:[a.jsx(v,{className:"h-4 w-4"}),"Add Item"]})}},c={args:{iconOnly:!0,"aria-label":"Close",children:a.jsx(g,{className:"h-4 w-4"})}},d={args:{loading:!0,children:"Loading..."}},m={args:{disabled:!0,children:"Disabled Button"}},u={parameters:{layout:"padded"},args:{fullWidth:!0,children:"Full Width Button"}},p={parameters:{layout:"padded"},render:()=>a.jsxs("div",{className:"flex flex-col gap-4",children:[a.jsxs("div",{className:"flex gap-2",children:[a.jsx(e,{variant:"primary",children:"Primary"}),a.jsx(e,{variant:"subtle",children:"Subtle"}),a.jsx(e,{variant:"ghost",children:"Ghost"}),a.jsx(e,{variant:"danger",children:"Danger"})]}),a.jsxs("div",{className:"flex gap-2",children:[a.jsx(e,{variant:"primary",size:"sm",children:"Small"}),a.jsx(e,{variant:"subtle",size:"sm",children:"Small"}),a.jsx(e,{variant:"ghost",size:"sm",children:"Small"})]}),a.jsxs("div",{className:"flex gap-2",children:[a.jsx(e,{iconOnly:!0,"aria-label":"Download",children:a.jsx(y,{className:"h-4 w-4"})}),a.jsx(e,{iconOnly:!0,"aria-label":"Add",children:a.jsx(v,{className:"h-4 w-4"})}),a.jsx(e,{iconOnly:!0,"aria-label":"Close",children:a.jsx(g,{className:"h-4 w-4"})})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'subtle',
    children: 'Subtle Button'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Delete'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    children: 'Small Button'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    children: 'Medium Button'
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
        <Plus className="h-4 w-4" />
        Add Item
      </>
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    iconOnly: true,
    'aria-label': 'Close',
    children: <X className="h-4 w-4" />
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading...'
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm">
          Small
        </Button>
        <Button variant="subtle" size="sm">
          Small
        </Button>
        <Button variant="ghost" size="sm">
          Small
        </Button>
      </div>
      <div className="flex gap-2">
        <Button iconOnly aria-label="Download">
          <Download className="h-4 w-4" />
        </Button>
        <Button iconOnly aria-label="Add">
          <Plus className="h-4 w-4" />
        </Button>
        <Button iconOnly aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
}`,...p.parameters?.docs?.source}}};const O=["Primary","Subtle","Ghost","Danger","Small","Medium","WithIcon","IconOnly","Loading","Disabled","FullWidth","AllVariants"];export{p as AllVariants,n as Danger,m as Disabled,u as FullWidth,t as Ghost,c as IconOnly,d as Loading,l as Medium,r as Primary,o as Small,s as Subtle,i as WithIcon,O as __namedExportsOrder,D as default};
