/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":28,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"w","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"File collector","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-8":{"id":8,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"pnResult","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Найденные файлы:","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-28":{"id":28,"type":"Checkbox","parentId":34,"style":{"enabled":true,"varName":"chMove","text":"перемещать файлы","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-29":{"id":29,"type":"Group","parentId":34,"style":{"enabled":true,"varName":"grTarget","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-30":{"id":30,"type":"EditText","parentId":29,"style":{"enabled":true,"varName":"etTarget","creationProps":{"noecho":false,"readonly":true,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[400,0],"alignment":null,"helpTip":null}},"item-31":{"id":31,"type":"Button","parentId":29,"style":{"enabled":true,"varName":"bnTarget","text":"Обзор...","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-32":{"id":32,"type":"Checkbox","parentId":34,"style":{"enabled":true,"varName":"chSourceAsTarget","text":"папка источника","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-34":{"id":34,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"pnTarget","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Назначение:","preferredSize":[0,0],"margins":[15,10,10,10],"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-35":{"id":35,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"grButtons","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-36":{"id":36,"type":"Button","parentId":35,"style":{"enabled":true,"varName":"ok","text":"Переименовать","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-37":{"id":37,"type":"Button","parentId":35,"style":{"enabled":true,"varName":"cancel","text":"Отмена","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-50":{"id":50,"type":"ListBox","parentId":8,"style":{"enabled":true,"varName":"list","creationProps":{"multiselect":false,"numberOfColumns":1,"columnWidths":"[]","columnTitles":"[]","showHeaders":false},"listItems":"","preferredSize":[0,250],"alignment":null,"helpTip":null}}},"order":[0,8,50,34,32,29,30,31,28,35,36,37],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"itemReferenceList":"None"}}
*/ 

// W
// =
var w = new Window("dialog"); 
    w.text = "File collector"; 
    w.orientation = "column"; 
    w.alignChildren = ["fill","top"]; 
    w.spacing = 10; 
    w.margins = 16; 

// PNRESULT
// ========
var pnResult = w.add("panel", undefined, undefined, {name: "pnResult"}); 
    pnResult.text = "Найденные файлы:"; 
    pnResult.orientation = "column"; 
    pnResult.alignChildren = ["fill","top"]; 
    pnResult.spacing = 10; 
    pnResult.margins = 10; 

var list = pnResult.add("listbox", undefined, undefined, {name: "list"}); 
    list.preferredSize.height = 250; 

// PNTARGET
// ========
var pnTarget = w.add("panel", undefined, undefined, {name: "pnTarget"}); 
    pnTarget.text = "Назначение:"; 
    pnTarget.orientation = "column"; 
    pnTarget.alignChildren = ["left","top"]; 
    pnTarget.spacing = 10; 
    pnTarget.margins = [10,15,10,10]; 

var chSourceAsTarget = pnTarget.add("checkbox", undefined, undefined, {name: "chSourceAsTarget"}); 
    chSourceAsTarget.text = "папка источника"; 

// GRTARGET
// ========
var grTarget = pnTarget.add("group", undefined, {name: "grTarget"}); 
    grTarget.orientation = "row"; 
    grTarget.alignChildren = ["left","center"]; 
    grTarget.spacing = 10; 
    grTarget.margins = 0; 

var etTarget = grTarget.add('edittext {properties: {name: "etTarget", readonly: true}}'); 
    etTarget.preferredSize.width = 400; 

var bnTarget = grTarget.add("button", undefined, undefined, {name: "bnTarget"}); 
    bnTarget.text = "Обзор..."; 

// PNTARGET
// ========
var chMove = pnTarget.add("checkbox", undefined, undefined, {name: "chMove"}); 
    chMove.text = "перемещать файлы"; 

// GRBUTTONS
// =========
var grButtons = w.add("group", undefined, {name: "grButtons"}); 
    grButtons.orientation = "row"; 
    grButtons.alignChildren = ["center","center"]; 
    grButtons.spacing = 10; 
    grButtons.margins = 0; 

var ok = grButtons.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = "Переименовать"; 

var cancel = grButtons.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Отмена"; 

w.show();