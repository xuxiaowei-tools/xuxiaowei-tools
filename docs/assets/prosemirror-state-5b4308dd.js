import{b as e,a as t,F as r,M as s}from"./prosemirror-model-472169a6.js";import{b as n,R as i,T as o}from"./prosemirror-transform-c2f93e29.js";const a=Object.create(null);class l{constructor(e,t,r){this.$anchor=e,this.$head=t,this.ranges=r||[new c(e.min(t),e.max(t))]}get anchor(){return this.$anchor.pos}get head(){return this.$head.pos}get from(){return this.$from.pos}get to(){return this.$to.pos}get $from(){return this.ranges[0].$from}get $to(){return this.ranges[0].$to}get empty(){let e=this.ranges;for(let t=0;t<e.length;t++)if(e[t].$from.pos!=e[t].$to.pos)return!1;return!0}content(){return this.$from.doc.slice(this.from,this.to,!0)}replace(e,r=t.empty){let s=r.content.lastChild,n=null;for(let t=0;t<r.openEnd;t++)n=s,s=s.lastChild;let i=e.steps.length,o=this.ranges;for(let a=0;a<o.length;a++){let{$from:l,$to:c}=o[a],h=e.mapping.slice(i);e.replaceRange(h.map(l.pos),h.map(c.pos),a?t.empty:r),0==a&&k(e,i,(s?s.isInline:n&&n.isTextblock)?-1:1)}}replaceWith(e,t){let r=e.steps.length,s=this.ranges;for(let n=0;n<s.length;n++){let{$from:i,$to:o}=s[n],a=e.mapping.slice(r),l=a.map(i.pos),c=a.map(o.pos);n?e.deleteRange(l,c):(e.replaceRangeWith(l,c,t),k(e,r,t.isInline?-1:1))}}static findFrom(e,t,r=!1){let s=e.parent.inlineContent?new u(e):y(e.node(0),e.parent,e.pos,e.index(),t,r);if(s)return s;for(let n=e.depth-1;n>=0;n--){let s=t<0?y(e.node(0),e.node(n),e.before(n+1),e.index(n),t,r):y(e.node(0),e.node(n),e.after(n+1),e.index(n)+1,t,r);if(s)return s}return null}static near(e,t=1){return this.findFrom(e,t)||this.findFrom(e,-t)||new g(e.node(0))}static atStart(e){return y(e,e,0,0,1)||new g(e)}static atEnd(e){return y(e,e,e.content.size,e.childCount,-1)||new g(e)}static fromJSON(e,t){if(!t||!t.type)throw new RangeError("Invalid input for Selection.fromJSON");let r=a[t.type];if(!r)throw new RangeError(`No selection type ${t.type} defined`);return r.fromJSON(e,t)}static jsonID(e,t){if(e in a)throw new RangeError("Duplicate use of selection JSON ID "+e);return a[e]=t,t.prototype.jsonID=e,t}getBookmark(){return u.between(this.$anchor,this.$head).getBookmark()}}l.prototype.visible=!0;class c{constructor(e,t){this.$from=e,this.$to=t}}let h=!1;function p(e){h||e.parent.inlineContent||(h=!0)}class u extends l{constructor(e,t=e){p(e),p(t),super(e,t)}get $cursor(){return this.$anchor.pos==this.$head.pos?this.$head:null}map(e,t){let r=e.resolve(t.map(this.head));if(!r.parent.inlineContent)return l.near(r);let s=e.resolve(t.map(this.anchor));return new u(s.parent.inlineContent?s:r,r)}replace(e,r=t.empty){if(super.replace(e,r),r==t.empty){let t=this.$from.marksAcross(this.$to);t&&e.ensureMarks(t)}}eq(e){return e instanceof u&&e.anchor==this.anchor&&e.head==this.head}getBookmark(){return new d(this.anchor,this.head)}toJSON(){return{type:"text",anchor:this.anchor,head:this.head}}static fromJSON(e,t){if("number"!=typeof t.anchor||"number"!=typeof t.head)throw new RangeError("Invalid input for TextSelection.fromJSON");return new u(e.resolve(t.anchor),e.resolve(t.head))}static create(e,t,r=t){let s=e.resolve(t);return new this(s,r==t?s:e.resolve(r))}static between(e,t,r){let s=e.pos-t.pos;if(r&&!s||(r=s>=0?1:-1),!t.parent.inlineContent){let e=l.findFrom(t,r,!0)||l.findFrom(t,-r,!0);if(!e)return l.near(t,r);t=e.$head}return e.parent.inlineContent||(0==s||(e=(l.findFrom(e,-r,!0)||l.findFrom(e,r,!0)).$anchor).pos<t.pos!=s<0)&&(e=t),new u(e,t)}}l.jsonID("text",u);class d{constructor(e,t){this.anchor=e,this.head=t}map(e){return new d(e.map(this.anchor),e.map(this.head))}resolve(e){return u.between(e.resolve(this.anchor),e.resolve(this.head))}}class f extends l{constructor(e){let t=e.nodeAfter,r=e.node(0).resolve(e.pos+t.nodeSize);super(e,r),this.node=t}map(e,t){let{deleted:r,pos:s}=t.mapResult(this.anchor),n=e.resolve(s);return r?l.near(n):new f(n)}content(){return new t(r.from(this.node),0,0)}eq(e){return e instanceof f&&e.anchor==this.anchor}toJSON(){return{type:"node",anchor:this.anchor}}getBookmark(){return new m(this.anchor)}static fromJSON(e,t){if("number"!=typeof t.anchor)throw new RangeError("Invalid input for NodeSelection.fromJSON");return new f(e.resolve(t.anchor))}static create(e,t){return new f(e.resolve(t))}static isSelectable(e){return!e.isText&&!1!==e.type.spec.selectable}}f.prototype.visible=!1,l.jsonID("node",f);class m{constructor(e){this.anchor=e}map(e){let{deleted:t,pos:r}=e.mapResult(this.anchor);return t?new d(r,r):new m(r)}resolve(e){let t=e.resolve(this.anchor),r=t.nodeAfter;return r&&f.isSelectable(r)?new f(t):l.near(t)}}class g extends l{constructor(e){super(e.resolve(0),e.resolve(e.content.size))}replace(e,r=t.empty){if(r==t.empty){e.delete(0,e.doc.content.size);let t=l.atStart(e.doc);t.eq(e.selection)||e.setSelection(t)}else super.replace(e,r)}toJSON(){return{type:"all"}}static fromJSON(e){return new g(e)}map(e){return new g(e)}eq(e){return e instanceof g}getBookmark(){return S}}l.jsonID("all",g);const S={map(){return this},resolve:e=>new g(e)};function y(e,t,r,s,n,i=!1){if(t.inlineContent)return u.create(e,r);for(let o=s-(n>0?0:1);n>0?o<t.childCount:o>=0;o+=n){let s=t.child(o);if(s.isAtom){if(!i&&f.isSelectable(s))return f.create(e,r-(n<0?s.nodeSize:0))}else{let t=y(e,s,r+n,n<0?s.childCount:0,n,i);if(t)return t}r+=s.nodeSize*n}return null}function k(e,t,r){let s=e.steps.length-1;if(s<t)return;let o,a=e.steps[s];(a instanceof n||a instanceof i)&&(e.mapping.maps[s].forEach(((e,t,r,s)=>{null==o&&(o=s)})),e.setSelection(l.near(e.doc.resolve(o),r)))}class w extends o{constructor(e){super(e.doc),this.curSelectionFor=0,this.updated=0,this.meta=Object.create(null),this.time=Date.now(),this.curSelection=e.selection,this.storedMarks=e.storedMarks}get selection(){return this.curSelectionFor<this.steps.length&&(this.curSelection=this.curSelection.map(this.doc,this.mapping.slice(this.curSelectionFor)),this.curSelectionFor=this.steps.length),this.curSelection}setSelection(e){if(e.$from.doc!=this.doc)throw new RangeError("Selection passed to setSelection must point at the current document");return this.curSelection=e,this.curSelectionFor=this.steps.length,this.updated=-3&(1|this.updated),this.storedMarks=null,this}get selectionSet(){return(1&this.updated)>0}setStoredMarks(e){return this.storedMarks=e,this.updated|=2,this}ensureMarks(e){return s.sameSet(this.storedMarks||this.selection.$from.marks(),e)||this.setStoredMarks(e),this}addStoredMark(e){return this.ensureMarks(e.addToSet(this.storedMarks||this.selection.$head.marks()))}removeStoredMark(e){return this.ensureMarks(e.removeFromSet(this.storedMarks||this.selection.$head.marks()))}get storedMarksSet(){return(2&this.updated)>0}addStep(e,t){super.addStep(e,t),this.updated=-3&this.updated,this.storedMarks=null}setTime(e){return this.time=e,this}replaceSelection(e){return this.selection.replace(this,e),this}replaceSelectionWith(e,t=!0){let r=this.selection;return t&&(e=e.mark(this.storedMarks||(r.empty?r.$from.marks():r.$from.marksAcross(r.$to)||s.none))),r.replaceWith(this,e),this}deleteSelection(){return this.selection.replace(this),this}insertText(e,t,r){let s=this.doc.type.schema;if(null==t)return e?this.replaceSelectionWith(s.text(e),!0):this.deleteSelection();{if(null==r&&(r=t),r=null==r?t:r,!e)return this.deleteRange(t,r);let n=this.storedMarks;if(!n){let e=this.doc.resolve(t);n=r==t?e.marks():e.marksAcross(this.doc.resolve(r))}return this.replaceRangeWith(t,r,s.text(e,n)),this.selection.empty||this.setSelection(l.near(this.selection.$to)),this}}setMeta(e,t){return this.meta["string"==typeof e?e:e.key]=t,this}getMeta(e){return this.meta["string"==typeof e?e:e.key]}get isGeneric(){for(let e in this.meta)return!1;return!0}scrollIntoView(){return this.updated|=4,this}get scrolledIntoView(){return(4&this.updated)>0}}function $(e,t){return t&&e?e.bind(t):e}class M{constructor(e,t,r){this.name=e,this.init=$(t.init,r),this.apply=$(t.apply,r)}}const O=[new M("doc",{init:e=>e.doc||e.schema.topNodeType.createAndFill(),apply:e=>e.doc}),new M("selection",{init:(e,t)=>e.selection||l.atStart(t.doc),apply:e=>e.selection}),new M("storedMarks",{init:e=>e.storedMarks||null,apply:(e,t,r,s)=>s.selection.$cursor?e.storedMarks:null}),new M("scrollToSelection",{init:()=>0,apply:(e,t)=>e.scrolledIntoView?t+1:t})];class v{constructor(e,t){this.schema=e,this.plugins=[],this.pluginsByKey=Object.create(null),this.fields=O.slice(),t&&t.forEach((e=>{if(this.pluginsByKey[e.key])throw new RangeError("Adding different instances of a keyed plugin ("+e.key+")");this.plugins.push(e),this.pluginsByKey[e.key]=e,e.spec.state&&this.fields.push(new M(e.key,e.spec.state,e))}))}}class N{constructor(e){this.config=e}get schema(){return this.config.schema}get plugins(){return this.config.plugins}apply(e){return this.applyTransaction(e).state}filterTransaction(e,t=-1){for(let r=0;r<this.config.plugins.length;r++)if(r!=t){let t=this.config.plugins[r];if(t.spec.filterTransaction&&!t.spec.filterTransaction.call(t,e,this))return!1}return!0}applyTransaction(e){if(!this.filterTransaction(e))return{state:this,transactions:[]};let t=[e],r=this.applyInner(e),s=null;for(;;){let n=!1;for(let i=0;i<this.config.plugins.length;i++){let o=this.config.plugins[i];if(o.spec.appendTransaction){let a=s?s[i].n:0,l=s?s[i].state:this,c=a<t.length&&o.spec.appendTransaction.call(o,a?t.slice(a):t,l,r);if(c&&r.filterTransaction(c,i)){if(c.setMeta("appendedTransaction",e),!s){s=[];for(let e=0;e<this.config.plugins.length;e++)s.push(e<i?{state:r,n:t.length}:{state:this,n:0})}t.push(c),r=r.applyInner(c),n=!0}s&&(s[i]={state:r,n:t.length})}}if(!n)return{state:r,transactions:t}}}applyInner(e){if(!e.before.eq(this.doc))throw new RangeError("Applying a mismatched transaction");let t=new N(this.config),r=this.config.fields;for(let s=0;s<r.length;s++){let n=r[s];t[n.name]=n.apply(e,this[n.name],this,t)}return t}get tr(){return new w(this)}static create(e){let t=new v(e.doc?e.doc.type.schema:e.schema,e.plugins),r=new N(t);for(let s=0;s<t.fields.length;s++)r[t.fields[s].name]=t.fields[s].init(e,r);return r}reconfigure(e){let t=new v(this.schema,e.plugins),r=t.fields,s=new N(t);for(let n=0;n<r.length;n++){let t=r[n].name;s[t]=this.hasOwnProperty(t)?this[t]:r[n].init(e,s)}return s}toJSON(e){let t={doc:this.doc.toJSON(),selection:this.selection.toJSON()};if(this.storedMarks&&(t.storedMarks=this.storedMarks.map((e=>e.toJSON()))),e&&"object"==typeof e)for(let r in e){if("doc"==r||"selection"==r)throw new RangeError("The JSON fields `doc` and `selection` are reserved");let s=e[r],n=s.spec.state;n&&n.toJSON&&(t[r]=n.toJSON.call(s,this[s.key]))}return t}static fromJSON(t,r,s){if(!r)throw new RangeError("Invalid input for EditorState.fromJSON");if(!t.schema)throw new RangeError("Required config field 'schema' missing");let n=new v(t.schema,t.plugins),i=new N(n);return n.fields.forEach((n=>{if("doc"==n.name)i.doc=e.fromJSON(t.schema,r.doc);else if("selection"==n.name)i.selection=l.fromJSON(i.doc,r.selection);else if("storedMarks"==n.name)r.storedMarks&&(i.storedMarks=r.storedMarks.map(t.schema.markFromJSON));else{if(s)for(let e in s){let o=s[e],a=o.spec.state;if(o.key==n.name&&a&&a.fromJSON&&Object.prototype.hasOwnProperty.call(r,e))return void(i[n.name]=a.fromJSON.call(o,t,r[e],i))}i[n.name]=n.init(t,i)}})),i}}function b(e,t,r){for(let s in e){let n=e[s];n instanceof Function?n=n.bind(t):"handleDOMEvents"==s&&(n=b(n,t,{})),r[s]=n}return r}class J{constructor(e){this.spec=e,this.props={},e.props&&b(e.props,this,this.props),this.key=e.key?e.key.key:R("plugin")}getState(e){return e[this.key]}}const T=Object.create(null);function R(e){return e in T?e+"$"+ ++T[e]:(T[e]=0,e+"$")}class E{constructor(e="key"){this.key=R(e)}get(e){return e.config.pluginsByKey[this.key]}getState(e){return e[this.key]}}export{g as A,N as E,f as N,E as P,l as S,u as T,J as a,c as b};