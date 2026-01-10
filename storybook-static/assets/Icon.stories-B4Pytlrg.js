import{j as e}from"./iframe-CQV2Z_BM.js";import{I as a,i as p,U as k,M as N,C as u,B as b,e as f,E as x}from"./Icon--QKcfQRb.js";import{c as h}from"./createLucideIcon-B3dF04K8.js";import{X as j}from"./x-BvNsjeNe.js";import{I as y}from"./info-cJerBQWG.js";import"./preload-helper-PPVm8Dsz.js";const I=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],v=h("chevron-right",I);const z=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],g=h("menu",z);const S=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],r=h("search",S),W={title:"UI/Icon",component:a,tags:["autodocs"],parameters:{docs:{description:{component:"Icon wrapper component with entity type support and consistent sizing. Provides accessible icon rendering with automatic entity color mapping."}}},argTypes:{size:{control:"select",options:Object.keys(p),description:"Size variant (xs: 14px, sm: 16px, md: 20px, lg: 24px)"},strokeWidth:{control:{type:"range",min:1,max:3,step:.5},description:"Icon stroke width"},decorative:{control:"boolean",description:"If true, icon is hidden from screen readers"}}},n={render:()=>e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(a,{icon:k,"aria-label":"Users"}),e.jsx(a,{icon:N,"aria-label":"Location"}),e.jsx(a,{icon:u,"aria-label":"Calendar"}),e.jsx(a,{icon:r,"aria-label":"Search"}),e.jsx(a,{icon:b,"aria-label":"Book"}),e.jsx(a,{icon:g,"aria-label":"Menu"})]})},s={render:()=>e.jsx("div",{className:"flex items-end gap-6",children:Object.keys(p).map(t=>e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:b,size:t,"aria-label":`Book icon ${t}`}),e.jsxs("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:[t," (",p[t],"px)"]})]},t))})},c={render:()=>e.jsxs("div",{className:"flex items-end gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:u,customSize:32,"aria-label":"Large calendar"}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"32px"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:u,customSize:48,"aria-label":"Extra large calendar"}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"48px"})]})]})},o={render:()=>e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:r,size:"lg",strokeWidth:1,"aria-label":"Thin search"}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"thin (1)"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:r,size:"lg",strokeWidth:2,"aria-label":"Normal search"}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"normal (2)"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:r,size:"lg",strokeWidth:2.5,"aria-label":"Medium search"}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"medium (2.5)"})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{icon:r,size:"lg",strokeWidth:3,"aria-label":"Bold search"}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:"bold (3)"})]})]})},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsx("div",{className:"flex items-center gap-6",children:Object.keys(f).map(t=>e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(x,{type:t,size:"lg","aria-label":`${t} icon`}),e.jsx("span",{className:"text-neutral-11 dark:text-neutral-dark-11 text-xs",children:t})]},t))}),e.jsxs("div",{className:"text-neutral-11 dark:text-neutral-dark-11 border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4 text-xs",children:[e.jsx("strong",{children:"EntityIcon component:"})," Automatically applies entity colors from CSS variables:",e.jsxs("ul",{className:"mt-2 list-inside list-disc space-y-1",children:[e.jsx("li",{className:"text-accent-person dark:text-accent-person-dark",children:"Person: Blue (--color-accent-person)"}),e.jsx("li",{className:"text-accent-place dark:text-accent-place-dark",children:"Place: Green (--color-accent-place)"}),e.jsx("li",{className:"text-accent-event dark:text-accent-event-dark",children:"Event: Amber (--color-accent-event)"})]})]})]})},l={render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{type:"button",className:"bg-neutral-12 hover:bg-neutral-11 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white",children:[e.jsx(a,{icon:r,size:"sm",decorative:!0}),"Search Scripture"]}),e.jsxs("button",{type:"button",className:"border-neutral-7 hover:bg-neutral-3 flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium",children:[e.jsx(a,{icon:b,size:"sm",decorative:!0}),"Browse Books"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{type:"button",className:"hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2","aria-label":"Close",children:e.jsx(a,{icon:j,size:"sm",decorative:!0})}),e.jsx("button",{type:"button",className:"hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2","aria-label":"Menu",children:e.jsx(a,{icon:g,size:"sm",decorative:!0})}),e.jsx("button",{type:"button",className:"hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2","aria-label":"Information",children:e.jsx(a,{icon:y,size:"sm",decorative:!0})})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{type:"button",className:"text-neutral-11 hover:text-neutral-12 dark:text-neutral-dark-11 dark:hover:text-neutral-dark-12 flex items-center gap-1 text-sm",children:["Previous Chapter",e.jsx(a,{icon:v,size:"xs",decorative:!0,className:"rotate-180"})]}),e.jsxs("button",{type:"button",className:"text-neutral-11 hover:text-neutral-12 dark:text-neutral-dark-11 dark:hover:text-neutral-dark-12 flex items-center gap-1 text-sm",children:["Next Chapter",e.jsx(a,{icon:v,size:"xs",decorative:!0})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(x,{type:"person",size:"sm",decorative:!0}),e.jsx("span",{className:"text-sm",children:"23 People"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(x,{type:"place",size:"sm",decorative:!0}),e.jsx("span",{className:"text-sm",children:"8 Places"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(x,{type:"event",size:"sm",decorative:!0}),e.jsx("span",{className:"text-sm",children:"5 Events"})]})]})]})},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4",children:[e.jsx("h3",{className:"mb-3 text-sm font-semibold",children:"Semantic Icon (has aria-label)"}),e.jsx("button",{type:"button",className:"hover:bg-neutral-3 rounded-md p-2",children:e.jsx(a,{icon:r,size:"md","aria-label":"Search"})}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 mt-2 text-xs",children:'Screen readers announce: "Search, button"'})]}),e.jsxs("div",{className:"border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4",children:[e.jsx("h3",{className:"mb-3 text-sm font-semibold",children:"Decorative Icon (aria-hidden)"}),e.jsxs("button",{type:"button",className:"hover:bg-neutral-3 rounded-md p-2",children:[e.jsx(a,{icon:r,size:"md",decorative:!0}),e.jsx("span",{className:"sr-only",children:"Search"})]}),e.jsx("p",{className:"text-neutral-11 dark:text-neutral-dark-11 mt-2 text-xs",children:"Icon hidden from screen readers. Button text provides context."})]}),e.jsxs("div",{className:"text-neutral-11 dark:text-neutral-dark-11 border-amber-6 bg-amber-2 rounded-lg border p-4 text-xs",children:[e.jsx("strong",{children:"Best Practice:"})," Use ",e.jsx("code",{children:"decorative=true"})," when icon is alongside text. Use ",e.jsx("code",{children:"aria-label"})," for icon-only buttons."]})]})},m={args:{icon:r,size:"md",strokeWidth:2,decorative:!1,"aria-label":"Search icon"},argTypes:{icon:{control:!1}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <Icon icon={Users} aria-label="Users" />
      <Icon icon={MapPin} aria-label="Location" />
      <Icon icon={Calendar} aria-label="Calendar" />
      <Icon icon={Search} aria-label="Search" />
      <Icon icon={BookOpen} aria-label="Book" />
      <Icon icon={Menu} aria-label="Menu" />
    </div>
}`,...n.parameters?.docs?.source},description:{story:"Basic icon rendering with different Lucide icons",...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-6">
      {(Object.keys(iconSizeMap) as IconSize[]).map(size => <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={BookOpen} size={size} aria-label={\`Book icon \${size}\`} />
          <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
            {size} ({iconSizeMap[size]}px)
          </span>
        </div>)}
    </div>
}`,...s.parameters?.docs?.source},description:{story:"Icon size variants (xs: 14px, sm: 16px, md: 20px, lg: 24px)",...s.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Calendar} customSize={32} aria-label="Large calendar" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Calendar} customSize={48} aria-label="Extra large calendar" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">48px</span>
      </div>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Custom pixel size override",...c.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={1} aria-label="Thin search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">thin (1)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={2} aria-label="Normal search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">normal (2)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={2.5} aria-label="Medium search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">medium (2.5)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={3} aria-label="Bold search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">bold (3)</span>
      </div>
    </div>
}`,...o.parameters?.docs?.source},description:{story:"Stroke width variations for different visual weights",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        {(Object.keys(entityIconMap) as EntityType[]).map(entityType => <div key={entityType} className="flex flex-col items-center gap-2">
            <EntityIcon type={entityType} size="lg" aria-label={\`\${entityType} icon\`} />
            <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">{entityType}</span>
          </div>)}
      </div>

      <div className="text-neutral-11 dark:text-neutral-dark-11 border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4 text-xs">
        <strong>EntityIcon component:</strong> Automatically applies entity colors from CSS
        variables:
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li className="text-accent-person dark:text-accent-person-dark">
            Person: Blue (--color-accent-person)
          </li>
          <li className="text-accent-place dark:text-accent-place-dark">
            Place: Green (--color-accent-place)
          </li>
          <li className="text-accent-event dark:text-accent-event-dark">
            Event: Amber (--color-accent-event)
          </li>
        </ul>
      </div>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Entity-based icon selection with automatic color mapping",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      {/* Icon in button */}
      <div className="flex items-center gap-4">
        <button type="button" className="bg-neutral-12 hover:bg-neutral-11 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white">
          <Icon icon={Search} size="sm" decorative />
          Search Scripture
        </button>

        <button type="button" className="border-neutral-7 hover:bg-neutral-3 flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
          <Icon icon={BookOpen} size="sm" decorative />
          Browse Books
        </button>
      </div>

      {/* Icon-only button */}
      <div className="flex items-center gap-2">
        <button type="button" className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2" aria-label="Close">
          <Icon icon={X} size="sm" decorative />
        </button>
        <button type="button" className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2" aria-label="Menu">
          <Icon icon={Menu} size="sm" decorative />
        </button>
        <button type="button" className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2" aria-label="Information">
          <Icon icon={Info} size="sm" decorative />
        </button>
      </div>

      {/* Navigation with chevron */}
      <div className="flex items-center gap-2">
        <button type="button" className="text-neutral-11 hover:text-neutral-12 dark:text-neutral-dark-11 dark:hover:text-neutral-dark-12 flex items-center gap-1 text-sm">
          Previous Chapter
          <Icon icon={ChevronRight} size="xs" decorative className="rotate-180" />
        </button>
        <button type="button" className="text-neutral-11 hover:text-neutral-12 dark:text-neutral-dark-11 dark:hover:text-neutral-dark-12 flex items-center gap-1 text-sm">
          Next Chapter
          <Icon icon={ChevronRight} size="xs" decorative />
        </button>
      </div>

      {/* With text labels */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <EntityIcon type="person" size="sm" decorative />
          <span className="text-sm">23 People</span>
        </div>
        <div className="flex items-center gap-2">
          <EntityIcon type="place" size="sm" decorative />
          <span className="text-sm">8 Places</span>
        </div>
        <div className="flex items-center gap-2">
          <EntityIcon type="event" size="sm" decorative />
          <span className="text-sm">5 Events</span>
        </div>
      </div>
    </div>
}`,...l.parameters?.docs?.source},description:{story:"Icons in different UI contexts (buttons, inputs, navigation)",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4">
        <h3 className="mb-3 text-sm font-semibold">Semantic Icon (has aria-label)</h3>
        <button type="button" className="hover:bg-neutral-3 rounded-md p-2">
          <Icon icon={Search} size="md" aria-label="Search" />
        </button>
        <p className="text-neutral-11 dark:text-neutral-dark-11 mt-2 text-xs">
          Screen readers announce: &quot;Search, button&quot;
        </p>
      </div>

      <div className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4">
        <h3 className="mb-3 text-sm font-semibold">Decorative Icon (aria-hidden)</h3>
        <button type="button" className="hover:bg-neutral-3 rounded-md p-2">
          <Icon icon={Search} size="md" decorative />
          <span className="sr-only">Search</span>
        </button>
        <p className="text-neutral-11 dark:text-neutral-dark-11 mt-2 text-xs">
          Icon hidden from screen readers. Button text provides context.
        </p>
      </div>

      <div className="text-neutral-11 dark:text-neutral-dark-11 border-amber-6 bg-amber-2 rounded-lg border p-4 text-xs">
        <strong>Best Practice:</strong> Use <code>decorative=true</code> when icon is alongside
        text. Use <code>aria-label</code> for icon-only buttons.
      </div>
    </div>
}`,...d.parameters?.docs?.source},description:{story:"Decorative vs semantic icons (accessibility)",...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    icon: Search,
    size: 'md',
    strokeWidth: 2,
    decorative: false,
    'aria-label': 'Search icon'
  },
  argTypes: {
    icon: {
      control: false
    }
  }
}`,...m.parameters?.docs?.source},description:{story:"Interactive playground with controls",...m.parameters?.docs?.description}}};const U=["BasicIcons","Sizes","CustomSize","StrokeWidths","EntityIcons","InContext","Accessibility","Playground"];export{d as Accessibility,n as BasicIcons,c as CustomSize,i as EntityIcons,l as InContext,m as Playground,s as Sizes,o as StrokeWidths,U as __namedExportsOrder,W as default};
