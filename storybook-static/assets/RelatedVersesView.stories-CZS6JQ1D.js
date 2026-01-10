import{j as e}from"./iframe-CQV2Z_BM.js";import{p as R,a as T}from"./parseEntityMentions-Cm2soQZX.js";import{L as C}from"./LoadingSpinner-CLm0exkm.js";import{c as q}from"./createLucideIcon-B3dF04K8.js";import"./preload-helper-PPVm8Dsz.js";const E=[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]],u=q("scroll-text",E);function v({verses:i,totalCount:M,hasMore:k,onShowMore:L,loading:y=!1,error:g,title:d,showMoreLabel:S,loadingLabel:V,useKoreanFonts:w=!1,className:h=""}){const j=a=>R(a).map((c,x)=>{if(c.type==="text"){const N=T(c.content);return e.jsx("span",{children:N.map((p,b)=>p.italic?e.jsx("em",{children:p.text},b):e.jsx("span",{children:p.text},b))},x)}return e.jsx("span",{children:c.entity?.displayText},x)});return y&&i.length===0?e.jsx("div",{className:`space-y-3 ${h}`,children:e.jsxs("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase",children:[e.jsx(u,{className:"h-3.5 w-3.5"}),d,e.jsx(C,{size:"sm",ariaLabel:V,className:"ml-1"})]})}):g?e.jsxs("div",{className:`space-y-3 ${h}`,children:[e.jsxs("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase",children:[e.jsx(u,{className:"h-3.5 w-3.5"}),d]}),e.jsx("p",{className:"text-xs text-red-500",children:g})]}):i.length===0?null:e.jsxs("div",{className:`space-y-3 ${h}`,children:[e.jsxs("h3",{className:"text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase",children:[e.jsx(u,{className:"h-3.5 w-3.5"}),d," (",M,")"]}),e.jsx("div",{className:"space-y-4",children:i.map((a,f)=>e.jsxs("div",{className:"group",children:[e.jsxs("div",{className:`text-neutral-10 dark:text-neutral-dark-10 mb-2 text-xs font-medium ${w?"font-song-myung":""}`,children:[a.book," ",a.chapter,":",a.verse]}),e.jsx("p",{className:`text-xs ${w?"font-noto-serif-kr":"font-source-serif"} text-neutral-12 dark:text-neutral-dark-12 leading-relaxed`,children:j(a.text)})]},f))}),k&&e.jsx("button",{onClick:L,className:"bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 text-neutral-12 dark:text-neutral-dark-12 mt-4 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:shadow-sm",children:S})]})}v.__docgenInfo={description:`RelatedVersesView - Pure presentational component for displaying related verses

This is the View component for the Container/View pattern.
All data fetching and state management should be handled by the container (RelatedVerses).

Displays a list of verses with book/chapter/verse references and parsed text
with entity mentions and italic formatting support.`,methods:[],displayName:"RelatedVersesView",props:{verses:{required:!0,tsType:{name:"Array",elements:[{name:"Verse"}],raw:"Verse[]"},description:"Array of verses to display"},totalCount:{required:!0,tsType:{name:"number"},description:"Total count of verses (for display in header)"},hasMore:{required:!0,tsType:{name:"boolean"},description:'Whether to show "Show More" button'},onShowMore:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when Show More is clicked"},loading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"string"},description:"Error state"},title:{required:!0,tsType:{name:"string"},description:"Section title"},showMoreLabel:{required:!0,tsType:{name:"string"},description:'"Show More" button label'},loadingLabel:{required:!0,tsType:{name:"string"},description:'"Loading" aria label'},useKoreanFonts:{required:!1,tsType:{name:"boolean"},description:"Whether to use Korean fonts",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional className for container",defaultValue:{value:"''",computed:!1}}}};const D={title:"Reading/RelatedVersesView",component:v,parameters:{layout:"padded"},tags:["autodocs"]},m=[{book:"Genesis",chapter:1,verse:1,text:"In the beginning [God] created the heavens and the earth."},{book:"Genesis",chapter:1,verse:2,text:"Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of [God] was hovering over the waters."},{book:"Genesis",chapter:1,verse:3,text:'And [God] said, "Let there be light," and there was light.'},{book:"John",chapter:1,verse:1,text:"In the beginning was the Word, and the Word was with [God], and the Word was [God]."},{book:"John",chapter:1,verse:3,text:"Through him all things were made; without him nothing was made that has been made."}],G=[{book:"창세기",chapter:1,verse:1,text:"태초에 [하나님]이 천지를 창조하시니라"},{book:"창세기",chapter:1,verse:2,text:"땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 [하나님]의 영은 수면 위에 운행하시니라"},{book:"창세기",chapter:1,verse:3,text:"[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고"},{book:"요한복음",chapter:1,verse:1,text:"태초에 말씀이 계시니라 이 말씀이 [하나님]과 함께 계셨으니 이 말씀은 곧 [하나님]이시니라"}],r={args:{verses:m.slice(0,3),totalCount:5,hasMore:!0,onShowMore:()=>alert("Show more clicked"),title:"Related Verses",showMoreLabel:"Show More",loadingLabel:"Loading...",useKoreanFonts:!1}},t={args:{verses:G,totalCount:4,hasMore:!1,onShowMore:()=>alert("더 보기 clicked"),title:"관련 구절",showMoreLabel:"더 보기",loadingLabel:"로딩 중...",useKoreanFonts:!0}},s={args:{verses:[],totalCount:0,hasMore:!1,onShowMore:()=>{},loading:!0,title:"Related Verses",showMoreLabel:"Show More",loadingLabel:"Loading verses..."}},o={args:{verses:[],totalCount:0,hasMore:!1,onShowMore:()=>{},error:"Failed to load verses: Network error",title:"Related Verses",showMoreLabel:"Show More",loadingLabel:"Loading..."}},n={args:{verses:m,totalCount:5,hasMore:!1,onShowMore:()=>{},title:"Related Verses",showMoreLabel:"Show More",loadingLabel:"Loading..."}},l={args:{verses:[...m,{book:"Revelation",chapter:21,verse:1,text:'Then I saw "a new heaven and a new earth," for the first heaven and the first earth had passed away, and there was no longer any sea.'},{book:"Revelation",chapter:21,verse:3,text:`And I heard a loud voice from the throne saying, "Look! [God]'s dwelling place is now among the people, and he will dwell with them."`}],totalCount:127,hasMore:!0,onShowMore:()=>alert("Show more clicked"),title:"Related Verses",showMoreLabel:"Show More",loadingLabel:"Loading..."}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    verses: sampleVersesEnglish.slice(0, 3),
    totalCount: 5,
    hasMore: true,
    onShowMore: () => alert('Show more clicked'),
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...',
    useKoreanFonts: false
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    verses: sampleVersesKorean,
    totalCount: 4,
    hasMore: false,
    onShowMore: () => alert('더 보기 clicked'),
    title: '관련 구절',
    showMoreLabel: '더 보기',
    loadingLabel: '로딩 중...',
    useKoreanFonts: true
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    verses: [],
    totalCount: 0,
    hasMore: false,
    onShowMore: () => {},
    loading: true,
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading verses...'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    verses: [],
    totalCount: 0,
    hasMore: false,
    onShowMore: () => {},
    error: 'Failed to load verses: Network error',
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    verses: sampleVersesEnglish,
    totalCount: 5,
    hasMore: false,
    onShowMore: () => {},
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...'
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    verses: [...sampleVersesEnglish, {
      book: 'Revelation',
      chapter: 21,
      verse: 1,
      text: 'Then I saw "a new heaven and a new earth," for the first heaven and the first earth had passed away, and there was no longer any sea.'
    }, {
      book: 'Revelation',
      chapter: 21,
      verse: 3,
      text: 'And I heard a loud voice from the throne saying, "Look! [God]\\'s dwelling place is now among the people, and he will dwell with them."'
    }],
    totalCount: 127,
    hasMore: true,
    onShowMore: () => alert('Show more clicked'),
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...'
  }
}`,...l.parameters?.docs?.source}}};const W=["Default","Korean","Loading","Error","AllLoaded","LargeDataset"];export{n as AllLoaded,r as Default,o as Error,t as Korean,l as LargeDataset,s as Loading,W as __namedExportsOrder,D as default};
