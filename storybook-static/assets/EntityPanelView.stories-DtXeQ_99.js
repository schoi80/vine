import{r as n,j as e,R as _}from"./iframe-CQV2Z_BM.js";import{B as F}from"./Button-D_mMFZJa.js";import{E as U}from"./Icon--QKcfQRb.js";import{M as O,i as X,u as K,P as Q,a as Y,b as Z,L as ee,m as z}from"./proxy-qBfNeM4V.js";import{X as te}from"./x-BvNsjeNe.js";import{C as x}from"./ChipList-8ONCzUs-.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-B3dF04K8.js";import"./Badge-baWHrtAt.js";function G(t,r){if(typeof t=="function")return t(r);t!=null&&(t.current=r)}function ae(...t){return r=>{let a=!1;const i=t.map(l=>{const s=G(l,r);return!a&&typeof s=="function"&&(a=!0),s});if(a)return()=>{for(let l=0;l<i.length;l++){const s=i[l];typeof s=="function"?s():G(t[l],null)}}}}function se(...t){return n.useCallback(ae(...t),t)}class ne extends n.Component{getSnapshotBeforeUpdate(r){const a=this.props.childRef.current;if(a&&r.isPresent&&!this.props.isPresent){const i=a.offsetParent,l=X(i)&&i.offsetWidth||0,s=this.props.sizeRef.current;s.height=a.offsetHeight||0,s.width=a.offsetWidth||0,s.top=a.offsetTop,s.left=a.offsetLeft,s.right=l-s.width-s.left}return null}componentDidUpdate(){}render(){return this.props.children}}function re({children:t,isPresent:r,anchorX:a,root:i}){const l=n.useId(),s=n.useRef(null),p=n.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:y}=n.useContext(O),g=t.props?.ref??t?.ref,d=se(s,g);return n.useInsertionEffect(()=>{const{width:b,height:o,top:m,left:u,right:v}=p.current;if(r||!s.current||!b||!o)return;const C=a==="left"?`left: ${u}`:`right: ${v}`;s.current.dataset.motionPopId=l;const h=document.createElement("style");y&&(h.nonce=y);const N=i??document.head;return N.appendChild(h),h.sheet&&h.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${o}px !important;
            ${C}px !important;
            top: ${m}px !important;
          }
        `),()=>{N.contains(h)&&N.removeChild(h)}},[r]),e.jsx(ne,{isPresent:r,childRef:s,sizeRef:p,children:n.cloneElement(t,{ref:d})})}const ie=({children:t,initial:r,isPresent:a,onExitComplete:i,custom:l,presenceAffectsLayout:s,mode:p,anchorX:y,root:g})=>{const d=K(le),b=n.useId();let o=!0,m=n.useMemo(()=>(o=!1,{id:b,initial:r,isPresent:a,custom:l,onExitComplete:u=>{d.set(u,!0);for(const v of d.values())if(!v)return;i&&i()},register:u=>(d.set(u,!1),()=>d.delete(u))}),[a,d,i]);return s&&o&&(m={...m}),n.useMemo(()=>{d.forEach((u,v)=>d.set(v,!1))},[a]),n.useEffect(()=>{!a&&!d.size&&i&&i()},[a]),p==="popLayout"&&(t=e.jsx(re,{isPresent:a,anchorX:y,root:g,children:t})),e.jsx(Q.Provider,{value:m,children:t})};function le(){return new Map}const E=t=>t.key||"";function D(t){const r=[];return n.Children.forEach(t,a=>{n.isValidElement(a)&&r.push(a)}),r}const oe=({children:t,custom:r,initial:a=!0,onExitComplete:i,presenceAffectsLayout:l=!0,mode:s="sync",propagate:p=!1,anchorX:y="left",root:g})=>{const[d,b]=Y(p),o=n.useMemo(()=>D(t),[t]),m=p&&!d?[]:o.map(E),u=n.useRef(!0),v=n.useRef(o),C=K(()=>new Map),h=n.useRef(new Set),[N,V]=n.useState(o),[k,J]=n.useState(o);Z(()=>{u.current=!1,v.current=o;for(let f=0;f<k.length;f++){const c=E(k[f]);m.includes(c)?(C.delete(c),h.current.delete(c)):C.get(c)!==!0&&C.set(c,!1)}},[k,m.length,m.join("-")]);const S=[];if(o!==N){let f=[...o];for(let c=0;c<k.length;c++){const j=k[c],B=E(j);m.includes(B)||(f.splice(c,0,j),S.push(j))}return s==="wait"&&S.length&&(f=S),J(D(f)),V(o),null}const{forceRender:W}=n.useContext(ee);return e.jsx(e.Fragment,{children:k.map(f=>{const c=E(f),j=p&&!d?!1:o===k||m.includes(c),B=()=>{if(h.current.has(c))return;if(h.current.add(c),C.has(c))C.set(c,!0);else return;let q=!0;C.forEach($=>{$||(q=!1)}),q&&(W?.(),J(v.current),p&&b?.(),i&&i())};return e.jsx(ie,{isPresent:j,initial:!u.current||a?void 0:!1,custom:r,presenceAffectsLayout:l,mode:s,root:g,onExitComplete:j?void 0:B,anchorX:y,children:f},c)})})};function H({open:t,onClose:r,onExitComplete:a,entityType:i,entityName:l,summary:s,closeLabel:p,children:y,backdropClosable:g=!0,animationDuration:d=.25,animationStiffness:b=300,animationDamping:o=30}){const m=()=>{g&&r()};return e.jsx(oe,{mode:"wait",onExitComplete:a,children:t&&e.jsxs(_.Fragment,{children:[e.jsx(z.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:d},className:"z-overlay fixed inset-0 bg-black/25 backdrop-blur-sm",onClick:m,role:"presentation","aria-hidden":"true"}),e.jsxs(z.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",damping:o,stiffness:b,duration:d},role:"dialog","aria-modal":"true","aria-labelledby":"entity-panel-title",className:"z-drawer fixed top-0 right-0 isolate h-full w-full overflow-y-auto bg-white shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl dark:bg-neutral-900",children:[e.jsxs("div",{className:"border-neutral-6 dark:border-neutral-dark-6 sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4 dark:bg-neutral-900",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(U,{type:i,size:"md"}),e.jsx("h2",{id:"entity-panel-title",className:"text-neutral-12 dark:text-neutral-dark-12 text-lg font-semibold",children:l})]}),e.jsx(F,{onClick:r,variant:"ghost",size:"sm",iconOnly:!0,"aria-label":p,children:e.jsx(te,{size:16})})]}),e.jsxs("div",{className:"space-y-6 p-6",children:[s&&e.jsx("div",{className:"text-neutral-11 dark:text-neutral-dark-11 text-sm leading-relaxed",children:s}),y]})]})]},"entity-panel")})}H.__docgenInfo={description:"",methods:[],displayName:"EntityPanelView",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onExitComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},entityType:{required:!0,tsType:{name:"EntityType"},description:""},entityName:{required:!0,tsType:{name:"string"},description:""},summary:{required:!1,tsType:{name:"string"},description:""},closeLabel:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},backdropClosable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},animationDuration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.25",computed:!1}},animationStiffness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"300",computed:!1}},animationDamping:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"30",computed:!1}}}};const be={title:"Reading/EntityPanelView",component:H,parameters:{layout:"fullscreen"},tags:["autodocs"]},A=e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-2 text-sm font-semibold uppercase",children:"Key Information"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-neutral-10 dark:text-neutral-dark-10",children:"Gender:"})," ",e.jsx("span",{className:"text-neutral-12 dark:text-neutral-dark-12",children:"Male"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-neutral-10 dark:text-neutral-dark-10",children:"Title:"})," ",e.jsx("span",{className:"text-neutral-12 dark:text-neutral-dark-12",children:"Prophet"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Related People"}),e.jsx(x,{items:[{id:"abraham",label:"Abraham",color:"person"},{id:"isaac",label:"Isaac",color:"person"},{id:"jacob",label:"Jacob",color:"person"}],interactive:!0})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Related Places"}),e.jsx(x,{items:[{id:"canaan",label:"Canaan",color:"place"},{id:"egypt",label:"Egypt",color:"place"}],interactive:!0})]})]}),T={args:{open:!0,onClose:()=>alert("Close clicked"),entityType:"person",entityName:"Moses",summary:"Moses was a prophet and leader who led the Israelites out of Egyptian slavery and received the Ten Commandments from God on Mount Sinai.",closeLabel:"Close",children:A}},w={args:{open:!0,onClose:()=>alert("Close clicked"),entityType:"place",entityName:"Jerusalem",summary:"Jerusalem is a city in the Middle East, located in the Judean Mountains between the Mediterranean and the Dead Sea. It is considered holy by Jews, Christians, and Muslims.",closeLabel:"Close",children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Key Events"}),e.jsx(x,{items:[{id:"temple-dedication",label:"Temple Dedication",color:"event"},{id:"exile",label:"Babylonian Exile",color:"event"}],interactive:!0})]})})}},R={args:{open:!0,onClose:()=>alert("Close clicked"),entityType:"event",entityName:"The Exodus (1446 BC)",summary:"The Exodus was the departure of the Israelites from Egypt under the leadership of Moses. It is one of the most significant events in Jewish history.",closeLabel:"Close",children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Timeline"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-neutral-10 mb-2 text-sm font-medium",children:"Before"}),e.jsx(x,{items:[{id:"plagues",label:"Ten Plagues",color:"event"}],interactive:!0})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-neutral-10 mb-2 text-sm font-medium",children:"After"}),e.jsx(x,{items:[{id:"sinai",label:"Covenant at Sinai",color:"event"}],interactive:!0})]})]})]})})}},I={args:{open:!0,onClose:()=>alert("닫기"),entityType:"person",entityName:"모세",summary:"모세는 이스라엘 민족을 이집트의 노예 생활에서 이끌어내고 시나이 산에서 하나님으로부터 십계명을 받은 선지자이자 지도자입니다.",closeLabel:"닫기",children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"관련 인물"}),e.jsx(x,{items:[{id:"aaron",label:"아론",color:"person"},{id:"miriam",label:"미리암",color:"person"}],interactive:!0})]})})}},L={args:{open:!0,onClose:()=>alert("Close clicked"),entityType:"place",entityName:"Bethlehem",closeLabel:"Close",children:A}},P={args:{open:!1,onClose:()=>alert("Close clicked"),entityType:"person",entityName:"David",closeLabel:"Close",children:A}},M={args:{open:!0,onClose:()=>alert("Close clicked"),entityType:"person",entityName:"Abraham",summary:"Abraham (originally Abram) is the patriarch of the Israelite, Ishmaelite, Edomite, and Midianite peoples. He is revered as the father of monotheism in Judaism, Christianity, and Islam. According to the Book of Genesis, God called Abraham to leave his homeland and family to travel to Canaan, promising to make him the father of a great nation.",closeLabel:"Close",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Family Relations"}),e.jsx(x,{items:[{id:"sarah",label:"Sarah (Wife)",color:"person"},{id:"isaac",label:"Isaac (Son)",color:"person"},{id:"ishmael",label:"Ishmael (Son)",color:"person"}],interactive:!0})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Key Events"}),e.jsx(x,{items:[{id:"covenant",label:"Covenant with God",color:"event"},{id:"isaac-birth",label:"Birth of Isaac",color:"event"},{id:"binding",label:"Binding of Isaac",color:"event"}],interactive:!0})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase",children:"Related Places"}),e.jsx(x,{items:[{id:"ur",label:"Ur of the Chaldeans",color:"place"},{id:"haran",label:"Haran",color:"place"},{id:"canaan",label:"Canaan",color:"place"},{id:"egypt",label:"Egypt",color:"place"},{id:"hebron",label:"Hebron",color:"place"}],interactive:!0})]})]})}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'person',
    entityName: 'Moses',
    summary: 'Moses was a prophet and leader who led the Israelites out of Egyptian slavery and received the Ten Commandments from God on Mount Sinai.',
    closeLabel: 'Close',
    children: sampleContent
  }
}`,...T.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'place',
    entityName: 'Jerusalem',
    summary: 'Jerusalem is a city in the Middle East, located in the Judean Mountains between the Mediterranean and the Dead Sea. It is considered holy by Jews, Christians, and Muslims.',
    closeLabel: 'Close',
    children: <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Key Events
          </h3>
          <ChipList items={[{
          id: 'temple-dedication',
          label: 'Temple Dedication',
          color: 'event'
        }, {
          id: 'exile',
          label: 'Babylonian Exile',
          color: 'event'
        }]} interactive />
        </div>
      </div>
  }
}`,...w.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'event',
    entityName: 'The Exodus (1446 BC)',
    summary: 'The Exodus was the departure of the Israelites from Egypt under the leadership of Moses. It is one of the most significant events in Jewish history.',
    closeLabel: 'Close',
    children: <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Timeline
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-neutral-10 mb-2 text-sm font-medium">Before</h4>
              <ChipList items={[{
              id: 'plagues',
              label: 'Ten Plagues',
              color: 'event'
            }]} interactive />
            </div>
            <div>
              <h4 className="text-neutral-10 mb-2 text-sm font-medium">After</h4>
              <ChipList items={[{
              id: 'sinai',
              label: 'Covenant at Sinai',
              color: 'event'
            }]} interactive />
            </div>
          </div>
        </div>
      </div>
  }
}`,...R.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert('닫기'),
    entityType: 'person',
    entityName: '모세',
    summary: '모세는 이스라엘 민족을 이집트의 노예 생활에서 이끌어내고 시나이 산에서 하나님으로부터 십계명을 받은 선지자이자 지도자입니다.',
    closeLabel: '닫기',
    children: <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            관련 인물
          </h3>
          <ChipList items={[{
          id: 'aaron',
          label: '아론',
          color: 'person'
        }, {
          id: 'miriam',
          label: '미리암',
          color: 'person'
        }]} interactive />
        </div>
      </div>
  }
}`,...I.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'place',
    entityName: 'Bethlehem',
    closeLabel: 'Close',
    children: sampleContent
  }
}`,...L.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onClose: () => alert('Close clicked'),
    entityType: 'person',
    entityName: 'David',
    closeLabel: 'Close',
    children: sampleContent
  }
}`,...P.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'person',
    entityName: 'Abraham',
    summary: 'Abraham (originally Abram) is the patriarch of the Israelite, Ishmaelite, Edomite, and Midianite peoples. He is revered as the father of monotheism in Judaism, Christianity, and Islam. According to the Book of Genesis, God called Abraham to leave his homeland and family to travel to Canaan, promising to make him the father of a great nation.',
    closeLabel: 'Close',
    children: <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Family Relations
          </h3>
          <ChipList items={[{
          id: 'sarah',
          label: 'Sarah (Wife)',
          color: 'person'
        }, {
          id: 'isaac',
          label: 'Isaac (Son)',
          color: 'person'
        }, {
          id: 'ishmael',
          label: 'Ishmael (Son)',
          color: 'person'
        }]} interactive />
        </div>

        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Key Events
          </h3>
          <ChipList items={[{
          id: 'covenant',
          label: 'Covenant with God',
          color: 'event'
        }, {
          id: 'isaac-birth',
          label: 'Birth of Isaac',
          color: 'event'
        }, {
          id: 'binding',
          label: 'Binding of Isaac',
          color: 'event'
        }]} interactive />
        </div>

        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Related Places
          </h3>
          <ChipList items={[{
          id: 'ur',
          label: 'Ur of the Chaldeans',
          color: 'place'
        }, {
          id: 'haran',
          label: 'Haran',
          color: 'place'
        }, {
          id: 'canaan',
          label: 'Canaan',
          color: 'place'
        }, {
          id: 'egypt',
          label: 'Egypt',
          color: 'place'
        }, {
          id: 'hebron',
          label: 'Hebron',
          color: 'place'
        }]} interactive />
        </div>
      </div>
  }
}`,...M.parameters?.docs?.source}}};const ve=["PersonPanel","PlacePanel","EventPanel","Korean","WithoutSummary","Closed","LongContent"];export{P as Closed,R as EventPanel,I as Korean,M as LongContent,T as PersonPanel,w as PlacePanel,L as WithoutSummary,ve as __namedExportsOrder,be as default};
