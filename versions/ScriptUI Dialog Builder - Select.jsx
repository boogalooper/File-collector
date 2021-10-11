/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":0,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"w","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"File collector","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-1":{"id":1,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":"stHelpTip","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"В указанном каталоге найдены текстовые файлы:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-2":{"id":2,"type":"ListBox","parentId":0,"style":{"enabled":true,"varName":"list","creationProps":{"multiselect":false,"numberOfColumns":1,"columnWidths":"[]","columnTitles":"[]","showHeaders":false},"listItems":"","preferredSize":[550,50],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":"stAction","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"выберите файл из списка, если необходимо его открыть","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"grButtons","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["right","center"],"alignment":null}},"item-5":{"id":5,"type":"Button","parentId":4,"style":{"enabled":true,"varName":"ok","text":"Открыть","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Button","parentId":4,"style":{"enabled":true,"varName":"cancel","text":"Отмена","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,2,3,4,5,6],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":false,"functionWrapper":false,"itemReferenceList":"none"}}
*/ 

// W
// =
var w = new Window("dialog"); 
    w.text = "File collector"; 
    w.orientation = "column"; 
    w.alignChildren = ["fill","top"]; 
    w.spacing = 10; 
    w.margins = 16; 

var stHelpTip = w.add("statictext", undefined, undefined, {name: "stHelpTip"}); 
    stHelpTip.text = "В указанном каталоге найдены текстовые файлы:"; 

var list = w.add("listbox", undefined, undefined, {name: "list"}); 
    list.preferredSize.width = 550; 
    list.preferredSize.height = 50; 

var stAction = w.add("statictext", undefined, undefined, {name: "stAction"}); 
    stAction.text = "выберите файл из списка, если необходимо его открыть"; 

// GRBUTTONS
// =========
var grButtons = w.add("group", undefined, {name: "grButtons"}); 
    grButtons.orientation = "row"; 
    grButtons.alignChildren = ["right","center"]; 
    grButtons.spacing = 10; 
    grButtons.margins = 0; 

var ok = grButtons.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = "Открыть"; 

var cancel = grButtons.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Отмена"; 

