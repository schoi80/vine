import{j as e}from"./iframe-CQV2Z_BM.js";import{C as s}from"./ChipList-8ONCzUs-.js";import"./preload-helper-PPVm8Dsz.js";import"./Badge-baWHrtAt.js";import"./Icon--QKcfQRb.js";import"./createLucideIcon-B3dF04K8.js";import"./proxy-qBfNeM4V.js";import"./Button-D_mMFZJa.js";const E={title:"UI/ChipList",component:s,tags:["autodocs"],parameters:{docs:{description:{component:"ChipList component for displaying collections of chips with automatic wrapping, collapsible behavior, and interactive support."}}},argTypes:{size:{control:"select",options:["sm","md"],description:"Size applied to all chips"},interactive:{control:"boolean",description:"Enable hover/click states for all chips"},collapsible:{control:"boolean",description:"Enable collapse/expand behavior"},initialVisibleCount:{control:"number",description:"Number of items visible before collapse"}}},b=[{id:"moses",label:"Moses",color:"person",frequency:156},{id:"aaron",label:"Aaron",color:"person",frequency:78},{id:"miriam",label:"Miriam",color:"person",frequency:12},{id:"pharaoh",label:"Pharaoh",color:"person",frequency:34}],f=[{id:"egypt",label:"Egypt",color:"place",frequency:42},{id:"red-sea",label:"Red Sea",color:"place",frequency:8},{id:"sinai",label:"Mount Sinai",color:"place",frequency:15}],v=[{id:"exodus",label:"Exodus",color:"event",frequency:23},{id:"passover",label:"Passover",color:"event",frequency:18},{id:"red-sea-crossing",label:"Red Sea Crossing",color:"event",frequency:7}],a=[{id:"abraham",label:"Abraham",color:"person",frequency:175},{id:"sarah",label:"Sarah",color:"person",frequency:45},{id:"isaac",label:"Isaac",color:"person",frequency:89},{id:"hebron",label:"Hebron",color:"place",frequency:23},{id:"canaan",label:"Canaan",color:"place",frequency:67},{id:"covenant",label:"Covenant",color:"event",frequency:12},{id:"promise",label:"Promise",color:"event",frequency:34}],h=[{id:"abraham",label:"Abraham",color:"person",frequency:175},{id:"isaac",label:"Isaac",color:"person",frequency:89},{id:"jacob",label:"Jacob",color:"person",frequency:156},{id:"joseph",label:"Joseph",color:"person",frequency:123},{id:"moses",label:"Moses",color:"person",frequency:234},{id:"aaron",label:"Aaron",color:"person",frequency:78},{id:"miriam",label:"Miriam",color:"person",frequency:12},{id:"joshua",label:"Joshua",color:"person",frequency:67},{id:"caleb",label:"Caleb",color:"person",frequency:23},{id:"david",label:"David",color:"person",frequency:289},{id:"solomon",label:"Solomon",color:"person",frequency:145},{id:"saul",label:"Saul",color:"person",frequency:98},{id:"samuel",label:"Samuel",color:"person",frequency:87},{id:"elijah",label:"Elijah",color:"person",frequency:56},{id:"elisha",label:"Elisha",color:"person",frequency:45}],r={args:{items:b,size:"sm",interactive:!1}},l={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-accent-person dark:text-accent-person-dark mb-3 text-sm font-semibold",children:"People"}),e.jsx(s,{items:b})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-accent-place dark:text-accent-place-dark mb-3 text-sm font-semibold",children:"Places"}),e.jsx(s,{items:f})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-accent-event dark:text-accent-event-dark mb-3 text-sm font-semibold",children:"Events"}),e.jsx(s,{items:v})]})]})},t={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(s,{items:a}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"Mixed entity types with automatic color coding"})]})},i={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(s,{items:a.map(u=>({...u,onClick:()=>console.log("Chip clicked")})),interactive:!0}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"All chips have hover/click states when interactive=true"})]})},n={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-semibold",children:"Default (5 visible)"}),e.jsx(s,{items:h,collapsible:!0,initialVisibleCount:5})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-semibold",children:"Show 10 initially"}),e.jsx(s,{items:h,collapsible:!0,initialVisibleCount:10})]}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:'Collapsible lists show "Show N more" / "Show less" buttons'})]})},o={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(s,{items:h.map(u=>({...u,onClick:()=>console.log("Chip clicked")})),interactive:!0,collapsible:!0,initialVisibleCount:8}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"Combined: Interactive chips with collapse/expand"})]})},c={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-semibold",children:"Small (default)"}),e.jsx(s,{items:a,size:"sm"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-semibold",children:"Medium"}),e.jsx(s,{items:a,size:"md"})]})]})},d={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-semibold",children:"English"}),e.jsx(s,{items:[{id:"1",label:"Abraham",color:"person",frequency:175},{id:"2",label:"Jerusalem",color:"place",frequency:89},{id:"3",label:"Passover",color:"event",frequency:23}]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-semibold",children:"Korean"}),e.jsx(s,{items:[{id:"1",label:"아브라함",color:"person",frequency:175},{id:"2",label:"예루살렘",color:"place",frequency:89},{id:"3",label:"유월절",color:"event",frequency:23}]})]})]})},m={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(s,{items:[]}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"Empty lists render nothing (no container div)"})]})},p={parameters:{},render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"border-neutral-6 dark:border-neutral-dark-6 bg-neutral-1 dark:bg-neutral-dark-1 rounded-lg border p-4",children:[e.jsx("h3",{className:"mb-2 text-base font-semibold",children:"Genesis 1:1"}),e.jsx("p",{className:"text-verse text-neutral-12 dark:text-neutral-dark-12 mb-4",children:"In the beginning God created the heaven and the earth."}),e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{children:[e.jsx("h4",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-2 text-xs font-semibold tracking-wide uppercase",children:"Often Mentioned Together"}),e.jsx(s,{items:[{id:"god",label:"God",color:"person",frequency:34,onClick:()=>console.log("Chip clicked")},{id:"heaven",label:"Heaven",color:"place",frequency:12,onClick:()=>console.log("Chip clicked")},{id:"earth",label:"Earth",color:"place",frequency:18,onClick:()=>console.log("Chip clicked")},{id:"creation",label:"Creation",color:"event",frequency:7,onClick:()=>console.log("Chip clicked")}],interactive:!0})]})})]}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"Example: Entity panel showing co-mentioned entities"})]})},x={args:{items:a,size:"sm",interactive:!1,collapsible:!1,initialVisibleCount:10}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: personItems,
    size: 'sm',
    interactive: false
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-accent-person dark:text-accent-person-dark mb-3 text-sm font-semibold">
          People
        </h4>
        <ChipList items={personItems} />
      </div>

      <div>
        <h4 className="text-accent-place dark:text-accent-place-dark mb-3 text-sm font-semibold">
          Places
        </h4>
        <ChipList items={placeItems} />
      </div>

      <div>
        <h4 className="text-accent-event dark:text-accent-event-dark mb-3 text-sm font-semibold">
          Events
        </h4>
        <ChipList items={eventItems} />
      </div>
    </div>
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-3">
      <ChipList items={mixedItems} />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Mixed entity types with automatic color coding
      </p>
    </div>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-3">
      <ChipList items={mixedItems.map(item => ({
      ...item,
      onClick: () => console.log('Chip clicked')
    }))} interactive />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        All chips have hover/click states when interactive=true
      </p>
    </div>
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Default (5 visible)</h4>
        <ChipList items={largePersonList} collapsible initialVisibleCount={5} />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Show 10 initially</h4>
        <ChipList items={largePersonList} collapsible initialVisibleCount={10} />
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Collapsible lists show &quot;Show N more&quot; / &quot;Show less&quot; buttons
      </p>
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-3">
      <ChipList items={largePersonList.map(item => ({
      ...item,
      onClick: () => console.log('Chip clicked')
    }))} interactive collapsible initialVisibleCount={8} />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Combined: Interactive chips with collapse/expand
      </p>
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Small (default)</h4>
        <ChipList items={mixedItems} size="sm" />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Medium</h4>
        <ChipList items={mixedItems} size="md" />
      </div>
    </div>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">English</h4>
        <ChipList items={[{
        id: '1',
        label: 'Abraham',
        color: 'person',
        frequency: 175
      }, {
        id: '2',
        label: 'Jerusalem',
        color: 'place',
        frequency: 89
      }, {
        id: '3',
        label: 'Passover',
        color: 'event',
        frequency: 23
      }]} />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Korean</h4>
        <ChipList items={[{
        id: '1',
        label: '아브라함',
        color: 'person',
        frequency: 175
      }, {
        id: '2',
        label: '예루살렘',
        color: 'place',
        frequency: 89
      }, {
        id: '3',
        label: '유월절',
        color: 'event',
        frequency: 23
      }]} />
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-3">
      <ChipList items={[]} />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Empty lists render nothing (no container div)
      </p>
    </div>
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {},
  render: () => <div className="flex flex-col gap-6">
      <div className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-1 dark:bg-neutral-dark-1 rounded-lg border p-4">
        <h3 className="mb-2 text-base font-semibold">Genesis 1:1</h3>
        <p className="text-verse text-neutral-12 dark:text-neutral-dark-12 mb-4">
          In the beginning God created the heaven and the earth.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="text-neutral-11 dark:text-neutral-dark-11 mb-2 text-xs font-semibold tracking-wide uppercase">
              Often Mentioned Together
            </h4>
            <ChipList items={[{
            id: 'god',
            label: 'God',
            color: 'person',
            frequency: 34,
            onClick: () => console.log('Chip clicked')
          }, {
            id: 'heaven',
            label: 'Heaven',
            color: 'place',
            frequency: 12,
            onClick: () => console.log('Chip clicked')
          }, {
            id: 'earth',
            label: 'Earth',
            color: 'place',
            frequency: 18,
            onClick: () => console.log('Chip clicked')
          }, {
            id: 'creation',
            label: 'Creation',
            color: 'event',
            frequency: 7,
            onClick: () => console.log('Chip clicked')
          }]} interactive />
          </div>
        </div>
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Example: Entity panel showing co-mentioned entities
      </p>
    </div>
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixedItems,
    size: 'sm',
    interactive: false,
    collapsible: false,
    initialVisibleCount: 10
  }
}`,...x.parameters?.docs?.source}}};const L=["Default","EntityGroups","MixedEntities","Interactive","Collapsible","InteractiveAndCollapsible","Sizes","BilingualLists","EmptyList","RealWorldExample","Playground"];export{d as BilingualLists,n as Collapsible,r as Default,m as EmptyList,l as EntityGroups,i as Interactive,o as InteractiveAndCollapsible,t as MixedEntities,x as Playground,p as RealWorldExample,c as Sizes,L as __namedExportsOrder,E as default};
