///////////////////////////////////////////////////////////////////////////////
// File collector
// jazz-y@ya.ru
///////////////////////////////////////////////////////////////////////////////

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>File collector</name>
<category>jazzy</category>
<eventid>808f4b96-50f3-4ff3-b00f-bc4189e89c5c</eventid>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

#target photoshop

$.localize = true
//$.locale = "ru"

var strMessage = "File collector",
    rev = "0.2",
    GUID = "808f4b96-50f3-4ff3-b00f-bc4189e89c5c",
    strPnSource = { ru: "Источник файлов:", en: "File source:" },
    strBrowse = { ru: "Обзор...", en: "Browse..." },
    strSubdir = { ru: "учитывать подкаталоги", en: "include subdirectories" },
    strFilter = { ru: "- искать следующие типы файлов", en: "- search following file types" },
    strAllFiles = { ru: "все файлы", en: "all files" },
    strPnSearch = { ru: "Список строк:", en: "List of strings:" },
    strBnAddList = { ru: "Загрузить список из файла", en: "Load list from file" },
    strBnSaveList = { ru: "Сохранить список в файл", en: "Save list to file" },
    strPnPattern = { ru: "Шаблон поиска и переименования файлов:", en: "File search and rename pattern:" },
    strPresetLabel = { ru: "Пресет:", en: "Preset:" },
    strRefresh = { ru: "Обновить", en: "Refresh" },
    strSave = { ru: "Сохранить", en: "Save" },
    strAdd = { ru: "Добавить", en: "Add new" },
    strDel = { ru: "Удалить", en: "Delete" },
    strSearch = { ru: "Поиск:", en: "Search:" },
    strRename = { ru: "Переименование:", en: "Rename:" },
    strWord = { ru: "слово", en: "word" },
    strInterval = { ru: "интервал", en: "interval" },
    strFile = { ru: "имя файла", en: "file name" },
    strFolder = { ru: "имя папки", en: "folder name" },
    strpnTarget = { ru: "Назначение файлов:", en: "File destination:" },
    strSourceAsTarget = { ru: "та же папка, что и у источника", en: "same folder as source" },
    strMove = { ru: "удалить найденные файлы из папки источника после копирования", en: "delete found files from the source folder after copying" },
    strBnSearch = { ru: "Поиск", en: "Search" },
    strCancel = { ru: "Отмена", en: "Cancel" },
    strInsert = { ru: "Вставить", en: "Insert" },
    strSelectTip = { ru: "В указанном каталоге найдены текстовые файлы:", en: "Text files were found in the specified directory:" },
    strSelectAction = { ru: "выберите файл из списка, если необходимо его открыть", en: "select a file from the list if you need to open it" },
    strPrev = { ru: "Предыдущая строка", en: "Previous line" },
    strLabelName = { ru: "Новое имя:", en: "New name:" },
    strNext = { ru: "Следующая строка", en: "Next line" },
    strOpen = { ru: "Загрузить", en: "Load" },
    strList = { ru: "Список", en: "List" },
    strFounded = { ru: "Список найденных файлов:", en: "List of found files:" },
    strRenameAction = { ru: "Переименовать", en: "Rename" },
    strNotFound = { ru: "Не найдены:", en: "Not found:" },
    strPreset = { ru: "Сохранение пресета", en: "Saving a preset" },
    strPresetPromt = { ru: "Укажите имя пресета\nБудут сохранены настройки имени подкаталога и файла.", en: "Specify the name of the preset\nSubdirectory and file name settings will be saved." },
    strCopy = { ru: " копия", en: " copy" },
    strErrPreset={ru: "Набор с именем \"%1\" уже существует. Перезаписать?", en: "A set with the name \"%1\" already exists. Overwrite?"},
    strDefailt = { ru: "по-умолчанию", en: "default" },
    strErrDone= { ru: "Успешно переименованы:", en: "Successfully renamed:" },
    strErrTargetExists= { ru: "Файлы уже есть в целевой папке:", en: "Files already exists in the destination folder:" },
    strErrSourceNotFound= { ru: "Невозможно переименовать:", en: "Unable to rename:" },
    strErrTargetNotAccess= { ru: "Нет доступа к файлу:", en: "No access to file:" },
    strReport = { ru: "формировать отчет и записывать его в папку назначения", en: "generate a report and write it to the destination folder" },
    strMetadata = { ru: "сохранять исходное имя в метаданных файла", en: "save original name in metadata of file" },
    
    cfg = new Config,
    preset = new Preset,
    allFiles = {}

cfg.getScriptSettings(cfg)
var w = buildWindow(); var result = w.show()
if (result != 2) {
    cfg.putScriptSettings(cfg)
}
var isCancelled = true

function buildWindow() {

    var cur = 0,
        target,
        renew

    // W
    // =
    var w = new Window("dialog");
    w.text = strMessage + " " + rev
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];
    w.spacing = 10;
    w.margins = 16;

    // PNSOURCE
    // ========
    var pnSource = w.add("panel");
    pnSource.text = strPnSource;
    pnSource.orientation = "column";
    pnSource.alignChildren = ["left", "top"];
    pnSource.spacing = 10;
    pnSource.margins = 10;

    // GRBROWSE
    // ========
    var grBrowse = pnSource.add("group");
    grBrowse.orientation = "row";
    grBrowse.alignChildren = ["left", "center"];
    grBrowse.spacing = 10;
    grBrowse.margins = 0;

    var etSource = grBrowse.add('edittext {properties: {readonly: true}}');
    etSource.preferredSize.width = 400;

    var bnSource = grBrowse.add("button");
    bnSource.text = strBrowse;

    // PNSOURCE
    // ========
    var chSubfolder = pnSource.add("checkbox");
    chSubfolder.text = strSubdir;

    // GRFILTER
    // ========
    var grFilter = pnSource.add("group");
    grFilter.orientation = "row";
    grFilter.alignChildren = ["left", "center"];
    grFilter.spacing = 10;
    grFilter.margins = 0;

    var dlFilter = grFilter.add("dropdownlist", undefined, [strAllFiles]);
    dlFilter.selection = 0;
    dlFilter.preferredSize.width = 100;

    var stFilter = grFilter.add("statictext");
    stFilter.text = strFilter;
    stFilter.preferredSize.width = 200;

    // PNLIST
    // ======
    var pnList = w.add("panel");
    pnList.text = strPnSearch;
    pnList.orientation = "column";
    pnList.alignChildren = ["fill", "top"];
    pnList.spacing = 10;
    pnList.margins = 10;

    // GRLIST
    // ======
    var grList = pnList.add("group");
    grList.orientation = "row";
    grList.alignChildren = ["left", "fill"];
    grList.spacing = 5;
    grList.margins = 0;

    var etList = grList.add('edittext {properties: {multiline: true, scrollable: true}}');
    etList.preferredSize.width = 440;
    etList.preferredSize.height = 200;

    // GRLISTBUTTONS
    // =============
    var grListButtons = grList.add("group");
    grListButtons.orientation = "column";
    grListButtons.alignChildren = ["center", "top"];
    grListButtons.spacing = 0;
    grListButtons.margins = 0;

    var bnAddList = grListButtons.add("button");
    bnAddList.text = "+";
    bnAddList.preferredSize.width = 40;
    bnAddList.helpTip = strBnAddList

    var bnSaveList = grListButtons.add("button");
    bnSaveList.text = "✔";
    bnSaveList.preferredSize.width = 40;
    bnSaveList.helpTip = strBnSaveList

    // PNOPTIONS
    // =========
    var pnOptions = pnList.add("panel");
    pnOptions.text = strPnPattern;
    pnOptions.orientation = "column";
    pnOptions.alignChildren = ["fill", "top"];
    pnOptions.spacing = 10;
    pnOptions.margins = [10, 15, 10, 10];

    // GRPRESET
    // ========
    var grPreset = pnOptions.add("group");
    grPreset.orientation = "row";
    grPreset.alignChildren = ["left", "center"];
    grPreset.spacing = 10;
    grPreset.margins = 0;
    //grPreset.enabled = false

    var stPreset = grPreset.add("statictext");
    stPreset.text = strPresetLabel;

    var dlPreset = grPreset.add("dropdownlist");
    dlPreset.selection = 0;
    dlPreset.preferredSize.width = 200;

    // GRPRESETBUTTONS
    // ===============
    var grPresetButtons = grPreset.add("group");
    grPresetButtons.orientation = "row";
    grPresetButtons.alignChildren = ["left", "center"];
    grPresetButtons.spacing = 0;
    grPresetButtons.margins = 0;

    var bnRefresh = grPresetButtons.add("button");
    bnRefresh.helpTip = strRefresh;
    bnRefresh.text = "↻";
    bnRefresh.preferredSize.width = 30;

    var bnSave = grPresetButtons.add("button");
    bnSave.helpTip = strSave;
    bnSave.text = "✔";
    bnSave.preferredSize.width = 30;

    var bnSaveAs = grPresetButtons.add("button");
    bnSaveAs.helpTip = strAdd;
    bnSaveAs.text = "+";
    bnSaveAs.preferredSize.width = 30;

    var bnDel = grPresetButtons.add("button");
    bnDel.helpTip = strDel;
    bnDel.text = "×";
    bnDel.preferredSize.width = 30;

    // PNOPTIONS
    // =========
    var pnDiv = pnOptions.add("panel");
    pnDiv.alignment = "fill";

    // GRPATTERN
    // =========
    var grPattern = pnOptions.add("group");
    grPattern.orientation = "row";
    grPattern.alignChildren = ["left", "fill"];
    grPattern.spacing = 10;
    grPattern.margins = 0;

    // GRSEARCH
    // ========
    var grSearch = grPattern.add("group");
    grSearch.orientation = "column";
    grSearch.alignChildren = ["fill", "center"];
    grSearch.spacing = 0;
    grSearch.margins = 0;

    var stSearch = grSearch.add("statictext");
    stSearch.text = strSearch;
    stSearch.preferredSize.width = 100;

    var etSearch = grSearch.add('edittext');
    etSearch.preferredSize.width = 120;


    // GRRENAME
    // ========
    var grRename = grPattern.add("group");
    grRename.orientation = "column";
    grRename.alignChildren = ["fill", "center"];
    grRename.spacing = 0;
    grRename.margins = 0;

    var stRename = grRename.add("statictext");
    stRename.text = strRename;
    stRename.preferredSize.width = 340;
    var etRename = grRename.add('edittext');
    target = etRename

    // GRPATTERNBUTTONS
    // ================
    var grPatternButtons = pnOptions.add("group");
    grPatternButtons.orientation = "row";
    grPatternButtons.alignChildren = ["center", "center"];
    grPatternButtons.spacing = 5;
    grPatternButtons.margins = 0;

    var bnWord = grPatternButtons.add("button");
    bnWord.text = "[N] " + strWord;

    var bnInterval = grPatternButtons.add("button");
    bnInterval.text = "[N-N] " + strInterval;

    var bnFile = grPatternButtons.add("button");
    bnFile.text = "[F] " + strFile;

    var bnFolder = grPatternButtons.add("button");
    bnFolder.text = "[P] " + strFolder;

    // PNOPTIONS
    // =========
    // GRPREVIEW
    // =========
    var grPreview = pnOptions.add("group");
    grPreview.orientation = "row";
    grPreview.alignChildren = ["left", "center"];
    grPreview.spacing = 5;

    var bnPrevious = grPreview.add("button");
    bnPrevious.helpTip = strPrev;
    bnPrevious.text = "<";
    bnPrevious.preferredSize.width = 30;
    bnPrevious.preferredSize.height = 40;

    // GRLABELS
    // ========
    var grLabels = grPreview.add("group");
    grLabels.orientation = "column";
    grLabels.alignChildren = ["right", "center"];
    grLabels.spacing = 5;

    var stLabelSearch = grLabels.add("statictext");
    stLabelSearch.text = strBnSearch + ":";

    var stLabelRename = grLabels.add("statictext");
    stLabelRename.text = strLabelName;



    // GRRESULT
    // ========
    var grResult = grPreview.add("group");
    grResult.orientation = "column";
    grResult.alignChildren = ["left", "center"];
    grResult.spacing = 5;

    var stPreviewSearch = grResult.add("statictext");
    stPreviewSearch.preferredSize.width = 320;

    var stPreviewRename = grResult.add("statictext");
    stPreviewRename.preferredSize.width = 320;


    // GRPREVIEW
    // =========
    var bnNext = grPreview.add("button");
    bnNext.helpTip = strNext;
    bnNext.text = ">";
    bnNext.preferredSize.width = 30;
    bnNext.preferredSize.height = 40;

    // GRBUTTONS
    // =========
    var grButtons = w.add("group");
    grButtons.orientation = "row";
    grButtons.alignChildren = ["center", "center"];
    grButtons.spacing = 10;
    grButtons.margins = 0;

    var ok = grButtons.add("button");
    ok.text = strBnSearch;

    var cancel = grButtons.add("button");
    cancel.text = strCancel;


    // ======================================================
    // preset functions
    // ======================================================

    dlPreset.onChange = function () {
        if (this.selection.index == 0) {
            bnDel.enabled = false

            if (renew) {
                var def = new Config
                cfg.options = def.options
                w.onShow(true)
            }
        } else {
            bnDel.enabled = true

            if (renew) {
                var a = preset.getPreset(this.selection.text)
                cfg.options = a
                w.onShow(true)
            }
        }
        cfg.preset = this.selection.text
        if (w.visible) {cfg.putScriptSettings(cfg)}
        preset.checkPresetIntegrity(w)
    }

    bnSave.onClick = function () {
        var a = cfg.options
        var nm = dlPreset.selection.text
        preset.putPreset(nm, a, "save")
        cfg.putScriptSettings(cfg)
        preset.checkPresetIntegrity(w)
    }

    bnSaveAs.onClick = function () {
        var a = cfg.options
        nm = prompt(strPresetPromt, dlPreset.selection.text + strCopy, strPreset);

        if (nm != null && nm != "") {
            if (preset.getPreset(nm) == "" && nm != strDefailt) {
                preset.putPreset(nm, a, "add")
                loadPresets()

                renew = false;
                dlPreset.selection = dlPreset.find(nm)
                renew = true;
            } else {
                if (nm != strDefailt) {
                    if (confirm(localize(strErrPreset, nm), false, strPreset)) {
                        preset.putPreset(nm, a, "save")

                        renew = false;
                        dlPreset.selection = dlPreset.find(nm)
                        renew = true;
                    }
                }
            }
        }

        cfg.putScriptSettings(cfg)
        preset.checkPresetIntegrity(w)
    }

    bnDel.onClick = function () {
        var a = cfg.options
        var nm = dlPreset.selection.text
        var num = dlPreset.selection.index

        preset.putPreset(nm, a, "delete")
        loadPresets()

        num = num > dlPreset.items.length - 1 ? dlPreset.items.length - 1 : num
        dlPreset.selection = num

        cfg.putScriptSettings(cfg)
        preset.checkPresetIntegrity(w)
    }

    bnRefresh.onClick = function () { dlPreset.onChange() }


    // Form methods
    // =========
    bnSource.onClick = function () {
        var fol = new Folder(cfg.source)
        if (enumFiles(fol.selectDlg())) { pnList.enabled = ok.enabled = true }
    }

    bnAddList.onClick = function () {
        var fle = new File,
            list = readFile(fle, true)
        if (list.length > 0) etList.text = list.join('\n')
        etList.onChanging()
    }


    bnWord.onClick = function () { target.textselection = insertWord(); etList.onChanging();target.active = true }
    bnInterval.onClick = function () { target.textselection = insertInterval(); etList.onChanging();target.active = true  }
    bnFile.onClick = function () { etRename.textselection = "[F]"; etList.onChanging();etRename.active = true  }
    bnFolder.onClick = function () { etRename.textselection = "[P]"; etList.onChanging();etRename.active = true  }

    bnSaveList.onClick = function () {
        {
            var fle = new File(strList + ".txt")
            var pth = fle.saveDlg(bnSaveList, "*.txt")
            try {
                if (pth) {
                    pth.open("w", "TEXT", "????")
                    pth.write(etList.text)
                    pth.close
                }
            } catch (e) { alert(e, "", 1) }
        }
    }

    etRename.addEventListener('focus', commonHandler)
    etSearch.addEventListener('focus', commonHandler)

    function commonHandler(evt) { target = evt.target }

    etList.onChanging = function () {
        cfg.options = etSearch.text + '\n' + etRename.text
        var result = previewList(cur, etList.text)

        cur = result.cur
        bnSaveList.enabled = result.length > 0 ? true : false
        ok.enabled = result.length == 0 || etSearch.text == "" || etRename.text == "" ? false : true
        preset.checkPresetIntegrity(w)
    }

    etRename.onChanging = function () { etList.onChanging() }
    etSearch.onChanging = function () { etList.onChanging() }

    bnPrevious.onClick = function () { cur = previewList(cur - 1, etList.text).cur }
    bnNext.onClick = function () { cur = previewList(cur + 1, etList.text).cur }

    dlFilter.onChange = function () { cfg.filter = this.selection.text }
    chSubfolder.onClick = function () { cfg.useSubfolders = this.value; if (etSource.text != "") enumFiles(Folder(cfg.source)) }

    ok.onClick = function () {
        var result = searchWindow(previewList(cur, etList.text).text)
        if (result != "") { w.close(); app.doProgress("", "moveFiles(result)") }
    }

    cancel.onClick = function () {w.close(2)}

    w.onShow = function (fromPreset) {
        renew = false
        if (!fromPreset) {
            etSource.size.width = pnSource.size.width - bnSource.size.width - 30
            etList.size.width = pnList.size.width - grListButtons.size.width - 20
            stRename.size.width = pnOptions.size.width - grSearch.size.width - 30
            dlPreset.size.width = pnOptions.size.width - grPresetButtons.size.width - stPreset.size.width - 40
            stPreviewRename.size.width = stPreviewSearch.size.width = pnOptions.size.width - bnPrevious.size.width * 2 - grLabels.size.width - 30
            w.layout.layout(true)
            bnSaveList.enabled = false
            chSubfolder.value = cfg.useSubfolders
            if (!enumFiles(Folder(cfg.source))) pnList.enabled = ok.enabled = false
            loadPresets()
            dlPreset.selection = dlPreset.find(cfg.preset) != null ? dlPreset.find(cfg.preset) : 0   
        }
        etSearch.text = cfg.options.split('\n')[0]
        etRename.text = cfg.options.split('\n')[1]

        etList.onChanging()
        renew = true
    }

    // Form functions
    // =========
    function loadPresets() {
        var len = dlPreset.items.length
        for (var i = 0; i < len; i++) { dlPreset.remove(dlPreset.items[0]) }
        var items = preset.getPresetList()
        dlPreset.add('item', strDefailt)
        for (var i = 0; i < items.length; i++) { dlPreset.add('item', items[i].key) }
    }

    function enumFiles(currentFolder) {
        if (currentFolder) {
            if (currentFolder.exists) {
                allFiles = { PSD: [], PDD: [], PSDT: [], PSB: [], BMP: [], RLE: [], DIB: [], GIF: [], EPS: [], IFF: [], TDI: [], JPG: [], JPEG: [], JPE: [], JPF: [], JPX: [], JP2: [], J2C: [], J2K: [], JPC: [], JPS: [], MPO: [], PCX: [], PDF: [], PDP: [], RAW: [], PXR: [], PNG: [], SCT: [], TGA: [], VDA: [], ICB: [], VST: [], TIF: [], TIFF: [], PBM: [], PGM: [], PPM: [], PNM: [], PFM: [], PAM: [], DCM: [], DC3: [], DIC: [], CRW: [], NEF: [], RAF: [], ORF: [], MRW: [], DCR: [], MOS: [], SRF: [], PEF: [], CR2: [], DNG: [], ERF: [], X3F: [], TXT: [] }

                cfg.source = etSource.text = currentFolder.fsName.toString()
                findAllFiles(cfg.source, allFiles, cfg.useSubfolders)
                var typesArray = buildShortcutList(allFiles),
                    len = typesArray.length;

                dlFilter.removeAll()

                for (var i = 0; i < len; i++) dlFilter.add("item", typesArray[i])
                dlFilter.selection = dlFilter.find(cfg.filter) != null ? dlFilter.find(cfg.filter) : 0

                if (allFiles["TXT"][0] != undefined && w.visible) {
                    var result = selectListWindow(allFiles["TXT"])

                    if (result != "") {
                        var list = readFile(File(result))
                        if (list.length > 0) etList.text = list.join('\n')
                        etList.onChanging()
                    }
                }
                return true
            }
        }
        return false

    }

    function previewList(n, s) {
        var tmp = s.split('\n'),
            len = tmp.length,
            list = [];

        for (var i = 0; i < len; i++) {
            var line = formatLine(tmp[i])
            if (line != "") list.push(line)
        }

        len = list.length

        n = n >= len ? len - 1 : n
        n = n < 0 ? 0 : n

        bnPrevious.enabled = n <= 0 ? false : true
        bnNext.enabled = n >= len - 1 ? false : true

        stPreviewSearch.text = parseExpression(cfg.options.split('\n')[0], list[n])
        stPreviewRename.text = parseExpression(cfg.options.split('\n')[1], list[n], File(strFolder + '/' + strFile + ".jpg"))

        stPreviewRename.helpTip = stPreviewRename.text.length > 70 ? stPreviewRename.text : ""
        stPreviewSearch.helpTip = stPreviewSearch.text.length > 70 ? stPreviewSearch.text : ""

        return { cur: n, length: len, text: list }
    }

    function moveFiles(f) {

        var len = f.length,
        report = {done:[],targetNotFound:[],exists:[],sourceNotFound:[], noAccess : []}
       
        for (var i = 0; i < len; i++) {
            if (f[i].found) {
                app.updateProgress(i + 1, len)
                app.changeProgressText(f[i].newName)

                var source = File(f[i].source),
                    target = File(f[i].target),
                    targetParent = Folder(target.parent), 
                    sourceParent = Folder(source.parent) 

                if (targetParent.fsName != target.parent.fsName) { report.noAccess.push(f[i].target); continue; } // имена папок отличаются, нет доступа к целевой папке
                if (!source.exists) { report.sourceNotFound.push(f[i].source); continue; } //нет источника файлов
                if (!targetParent.exists) { if (!targetParent.create()) { report.noAccess.push(f[i].target); continue; } } //невозможно создать подкаталог
                if (target.exists) {report.exists.push (f[i].target); continue;} //такой файл уже есть

                if (cfg.move) {
                    if (targetParent.fsName == sourceParent.fsName) {
                        if (!source.rename(decodeURI(File(f[i].target).name))) {report.sourceNotFound.push(f[i].source); continue;} //невозможно переименовать
                    } else {
                        if (source.copy(target)) {source.remove()} else {report.noAccess.push(f[i].target); continue;} // невозможно скопировать
                    }
                } else {
                    if (!source.copy(target)) {report.noAccess.push(f[i].target); continue;} // невозможно скопировать
                }
                
                if (cfg.metadata) nameToMetadata (target.fsName, decodeURI(source.name))
                report.done.push (f[i].source + ' -> ' + f[i].target)
            } else {report.targetNotFound.push (f[i].name)}
        }

       
        if (cfg.report)
        {
            var output = [], d = new Date
            
            if (report["done"].length >0) {output.push (strErrDone + '\n' + report["done"].join ('\n')) }
            if (report["targetNotFound"].length >0) {output.push (strNotFound + '\n' + report["targetNotFound"].join ('\n')) }
            if (report["exists"].length >0) {output.push (strErrTargetExists + '\n' + report["exists"].join ('\n')) }
            if (report["sourceNotFound"].length >0) {output.push (strErrSourceNotFound + '\n' + report["sourceNotFound"].join ('\n')) }
            if (report["noAccess"].length >0) {output.push (strErrTargetNotAccess + '\n' + report["noAccess"].join ('\n')) }
            
            var fle = new File(cfg.targetPath + '/' + strMessage + " log.txt")
                
            try {
                fle.open("a", "TEXT", "????")
                fle.write(String(d) + '\n' + output.join('\n\n') + '\n\n')
                fle.close
            } catch (e) { }
        }

        function nameToMetadata (target, fileName)
        {
            try {
            if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript")
            var xmpFile = new XMPFile(target, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE)
            var xmp = xmpFile.getXMP()
            xmp.setProperty(XMPConst.NS_XMP_MM, "PreservedFileName", fileName)
            if (xmpFile.canPutXMP(xmp)) xmpFile.putXMP(xmp)
            xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY)} catch (e) {}
        }
    }

    return w
}

function selectListWindow(s) {
    var selected = ""
    // W
    // =
    var w = new Window("dialog");
    w.text = "File collector";
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];

    var stHelpTip = w.add("statictext", undefined, strSelectTip);

    var list = w.add("listbox")
    list.preferredSize.width = 550;
    list.preferredSize.height = 75;

    var stAction = w.add("statictext", undefined, strSelectAction);

    // GRBUTTONS
    // =========
    var grButtons = w.add("group");
    grButtons.orientation = "row";
    grButtons.alignChildren = ["right", "center"];
    grButtons.spacing = 10;
    grButtons.margins = 0;

    var ok = grButtons.add("button", undefined, strOpen, { name: "ok" });
    var cancel = grButtons.add("button", undefined, strCancel, { name: "cancel" });

    list.onDoubleClick = function () {
        var fle = File(list.selection.text)
        if (fle.exists) fle.execute()
    }

    cancel.onClick = function () { selected = ""; w.close() }

    list.onChange = function () {
        ok.enabled = list.selection != undefined ? true : false
        selected = list.selection != undefined ? list.selection.text : ""
    }

    w.onShow = function () {
        app.beep()
        var len = s.length
        for (var i = 0; i < len; i++) { list.add("item", s[i]) }
        list.selection = 0
    }

    w.show()

    return selected
}

function insertWord() {
    // W
    // =
    var result = "";
    var w = new Window("dialog");
    w.text = strInsert + ' ' + strWord;
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];
    w.spacing = 10;
    w.margins = 16;

    var et = w.add('edittext');
    et.text = cfg.word
    // G
    // =
    var g = w.add("group");
    g.orientation = "row";
    g.alignChildren = ["left", "center"];
    g.spacing = 10;
    g.margins = 0;

    var ok = g.add("button", undefined, undefined, { name: "ok" });
    ok.text = strInsert;

    var cancel = g.add("button", undefined, undefined, { name: "cancel" });
    cancel.text = strCancel;

    et.onChanging = function () { if (et.text.match(/[^\d]/)) et.text = et.text.replace(/[^\d]/, "") }

    ok.onClick = function () {
        result = et.text != "" ? "[" + et.text + "]" : ""
        if (result != "") cfg.word = et.text
        w.close()
    }
    cancel.onClick = function () { w.close(); result = "" }
    w.show();

    return result
}

function insertInterval() {
    // W
    // =
    var result = "";
    var w = new Window("dialog");
    w.text = strInsert + ' ' + strInterval;
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];
    w.spacing = 10;
    w.margins = 16;

    // G1
    // ==
    var g1 = w.add("group");
    g1.orientation = "row";
    g1.alignChildren = ["center", "center"];
    g1.spacing = 10;
    g1.margins = 0;

    var etFrom = g1.add('edittext');
    etFrom.preferredSize.width = 50;
    etFrom.text = cfg.interval.split('-')[0]
    var statictext1 = g1.add("statictext");
    statictext1.text = "-";

    var etTo = g1.add('edittext');
    etTo.preferredSize.width = 50;
    etTo.text = cfg.interval.split('-')[1]
    // G
    // =
    var g = w.add("group");
    g.orientation = "row";
    g.alignChildren = ["left", "center"];
    g.spacing = 10;
    g.margins = 0;

    var ok = g.add("button", undefined, undefined, { name: "ok" });
    ok.text = strInsert;

    var cancel = g.add("button", undefined, undefined, { name: "cancel" });
    cancel.text = strCancel;

    etFrom.onChanging = function () { if (etFrom.text.match(/[^\d]/)) etFrom.text = etFrom.text.replace(/[^\d]/, "") }
    etTo.onChanging = function () { if (etTo.text.match(/[^\d]/)) etTo.text = etTo.text.replace(/[^\d]/, "") }

    ok.onClick = function () {

        result = etFrom.text != "" || etTo.text != "" ? "[" + etFrom.text + '-' + etTo.text + "]" : ""
        if (result != "") cfg.interval = etFrom.text + '-' + etTo.text
        w.close()

    }
    cancel.onClick = function () { w.close(); result = "" }
    w.show();

    return result
}

function searchWindow(s) {
    var result = []
    // W
    // =
    var w = new Window("dialog");
    w.text = strBnSearch
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];
    w.spacing = 10;
    w.margins = 16;

    // PNRESULT
    // ========
    var pnResult = w.add("panel");
    pnResult.text = strFounded;
    pnResult.orientation = "column";
    pnResult.alignChildren = ["fill", "top"];
    pnResult.spacing = 10;
    pnResult.margins = [10, 15, 10, 10];

    var list1 = pnResult.add("listbox");
    list1.preferredSize.height = 250;

    pnResult.add("statictext", undefined, strNotFound)

    var list2 = pnResult.add("listbox");
    list2.preferredSize.height = 100;

    var chMetadata = pnResult.add("checkbox", undefined, undefined, {name: "chMetadata"}); 
    chMetadata.text = strMetadata; 

    var chReport = pnResult.add("checkbox", undefined, undefined, {name: "chReport"}); 
    chReport.text = strReport; 

    // PNTARGET
    // ========
    var pnTarget = w.add("panel");
    pnTarget.text = strpnTarget
    pnTarget.orientation = "column";
    pnTarget.alignChildren = ["left", "top"];
    pnTarget.spacing = 10;
    pnTarget.margins = [10, 15, 10, 10];

    var chSourceAsTarget = pnTarget.add("checkbox");
    chSourceAsTarget.text = strSourceAsTarget

    // GRTARGET
    // ========
    var grTarget = pnTarget.add("group");
    grTarget.orientation = "row";
    grTarget.alignChildren = ["left", "center"];
    grTarget.spacing = 10;
    grTarget.margins = 0;

    var etTarget = grTarget.add('edittext {properties: {readonly: true}}');
    etTarget.preferredSize.width = 600;

    var bnTarget = grTarget.add("button");
    bnTarget.text = strBrowse

    // PNTARGET
    // ========
    var chMove = pnTarget.add("checkbox");
    chMove.text = strMove

    // GRBUTTONS
    // =========
    var grButtons = w.add("group");
    grButtons.orientation = "row";
    grButtons.alignChildren = ["center", "center"];
    grButtons.spacing = 10;
    grButtons.margins = 0;

    var ok = grButtons.add("button", undefined, undefined, { name: "ok" });
    ok.text = strRenameAction;

    var cancel = grButtons.add("button", undefined, undefined, { name: "cancel" });
    cancel.text = strCancel;

    list1.onDoubleClick = function () {
        fle = File(result[list1.selection.index].source)
        if (fle.exists) fle.execute()
    }

    bnTarget.onClick = function () {
        var target = new Folder(cfg.targetPath),
            fol = target.selectDlg()

        if (fol) {
            if (fol.exists) {
                cfg.targetPath = etTarget.text = fol.fsName.toString()
                renewList()
            }
        }
    }


    chSourceAsTarget.onClick = function () {
        cfg.useSameFolder = this.value
        etTarget.enabled = bnTarget.enabled = !this.value

        if (this.value) {
            etTarget.text = cfg.source
        } else {
            if (cfg.targetPath != "") {
                if (Folder(cfg.targetPath).exists) {
                    etTarget.text = cfg.targetPath
                } else {
                    cfg.targetPath = etTarget.text = cfg.source
                }
            } else {
                cfg.targetPath = etTarget.text = cfg.source
            }
        }
        renewList()
    }

    chMove.onClick = function () { cfg.move = this.value }
    chReport.onClick = function () { cfg.report = this.value }
    chMetadata.onClick = function () { cfg.metadata = this.value }

    ok.onClick = function () { w.close() }
    cancel.onClick = function () { result = ""; w.close() }

    w.onShow = function () {

        app.doProgress("", "findFile (s, allFiles, cfg.filter, result)")

        chMove.value = cfg.move
        chSourceAsTarget.value = cfg.useSameFolder
        chSourceAsTarget.onClick()
        chReport.value = cfg.report
        chMetadata.value = cfg.metadata
    }

    w.show();

    return result

    function findFile(s, files, filter, result) {
        var listLen = s.length,
            searchTemplate = cfg.options.split('\n')[0],
            renameTemplate = cfg.options.split('\n')[1]

        for (var i = 0; i < listLen; i++) {
            app.updateProgress(i + 1, listLen)
            app.changeProgressText(s[i])

            var curSearch = parseExpression(searchTemplate, s[i])

            for (var n = 0; n < curSearch.length; n++) {
                var exp = curSearch[n],
                    currentResult = [],
                    r = new RegExp(exp, "i")

                if (exp != "") {
                    for (a in files) {
                        if (files[a][0] != undefined && a != "TXT") {
                            if (a == filter || filter == strAllFiles.ru || filter == strAllFiles.en) {
                                var filesLength = files[a].length
                                for (var z = 0; z < filesLength; z++) {
                                    var name = decodeURI(File(files[a][z]).name).split('.')[0]
                                    found = name.match(r)
                                    if (found) {
                                        currentResult.push({ found: true, source: files[a][z], newName: parseExpression(renameTemplate, s[i], File(files[a][z])), index: name.length - found.length })
                                    }
                                }
                            }
                        }
                    }
                }
                if (currentResult.length > 0) {
                    currentResult.sort(sortFiles)

                } else {
                    currentResult.push({ found: false, name: s[i] })
                }
                result.push(currentResult[0])
            }
        }

        return result

        function sortFiles(a, b) { return a.index >= b.index ? 1 : -1 }
    }

    function generateSavePaths(f) {
        var len = f.length,
            targetPath = cfg.useSameFolder ? cfg.source : cfg.targetPath
        for (var i = 0; i < len; i++) {
            if (f[i].found) {
                var lastDot = f[i].source.lastIndexOf(".")
                if (lastDot == -1) break;
                var ext = f[i].source.substr(lastDot + 1, f[i].source.length - lastDot)
                f[i].target = File(targetPath + '/' + f[i].newName + '.' + ext).fsName
                f[i].ext = ext
            }
        }

        for (var i = 0; i < len; i++) {
            if (f[i].found) f[i].target = createUniqueFileName(f, f[i])
        }
    }

    function createUniqueFileName(folder, file) {
        var inParentPath = decodeURI(File(file.target).parent),
            inFileName = decodeURI(File(file.target).name.split('.')[0]),
            inFileExt = file.ext,
            fileNumber = 1

        uniqueFileName = File(inParentPath + '/' + inFileName + '.' + inFileExt).fsName
        while (pathExists(folder, file, uniqueFileName)) {
            uniqueFileName = File(inParentPath + '/' + inFileName + " (" + fileNumber + ').' + inFileExt).fsName
            fileNumber++;
        }

        return uniqueFileName

        function pathExists(fld, fle, cur) {
            for (var i = 0; i < fld.length; i++) {
                if (fld[i].found && fld[i] != fle && fld[i].target == cur) return true
            }
            return false
        }
    }

    function renewList() {
        generateSavePaths(result)
        list1.removeAll()
        list2.removeAll()
        for (var i = 0; i < result.length; i++) {
            if (result[i].found) { list1.add("item", result[i].source + " -> " + result[i].target) }
            else { list2.add("item", result[i].name) }
        }
        ok.enabled = list1.items.length > 0 ? true : false
    }
}


function findAllFiles(srcFolder, fileObj, useSubfolders) {
    var fileFolderArray = Folder(srcFolder).getFiles();
    var subfolderArray = []

    for (var i = 0; i < fileFolderArray.length; i++) {
        var fileFoldObj = fileFolderArray[i];

        if (fileFoldObj instanceof File) {
            if (!fileFoldObj.hidden) putFileToTypeObject(fileFoldObj.fsName, fileObj)
        } else if (useSubfolders) {
            subfolderArray.push(fileFoldObj)
        }
    }

    if (useSubfolders) {
        for (var i = 0; i < subfolderArray.length; i++) findAllFiles(subfolderArray[i], fileObj, useSubfolders)
    }
}

function buildShortcutList(fileObj) {
    var output = [strAllFiles]

    for (a in fileObj) {
        if (fileObj[a][0] != undefined && a != "TXT") output.push(a)
    }
    return output
}

function putFileToTypeObject(fileName, fileObj) {
    var fle = fileName.toString().toUpperCase()
    var lastDot = fle.lastIndexOf(".")
    if (lastDot == -1) return false
    var ext = fle.substr(lastDot + 1, fle.length - lastDot)
    if (fileObj.hasOwnProperty(ext)) { fileObj[ext].push(fileName.toString()); return true }
    return false
}

function parseExpression(e, s, f) {
    if (e == "" || s == "" || s == undefined) return "" //если пустая строка с выражением или пустая строка текста, пропустить

    e = e.replace(/[:*\?\"\<\>\|\#]/g, "_")

    if ($.os.search(/windows/i) == -1) {
        e = e.replace(/\\/g, "/")
        e = e.replace(/\/+/g, "/")
        e = e.replace(/\/$/, "")
        e = e.replace(/^\//, "")
    } else {
        e = e.replace(/\//g, "\\")
        e = e.replace(/\\+/g, "\\")
        e = e.replace(/\\$/, "")
        e = e.replace(/^\\/, "")
    }


    s = s.split(' ')
    var a = e.match(/\[\d+\]/g),
        len = a ? a.length : 0

    for (var i = 0; i < len; i++) {
        a[i] = getValue(a[i])
        e = e.replace(buildRegExp(a[i]), parseWord(a[i], s))
    }


    if (f) {
        a = e.match(/\[F\]/g)
        len = a ? a.length : 0

        for (var i = 0; i < len; i++) {
            var fle = decodeURI(f.name).split('.')[0]
            if (fle == undefined) fle = ""
            e = e.replace(buildRegExp(a[i]), fle)
        }

        a = e.match(/\[P\]/g)
        len = a ? a.length : 0

        for (var i = 0; i < len; i++) {
            var fle = decodeURI(f.parent.name)
            if (fle == undefined) fle = ""
            e = e.replace(buildRegExp(a[i]), fle)
        }
    } else {
        e = e.replace(/\[F\]/g, "")
        e = e.replace(/\[P\]/g, "")
    }

    a = e.match(/\[\d*-\d*\]/g)
    len = a ? a.length : 0

    if (f) {
        for (var i = 0; i < len; i++) {
            a[i] = getValue(a[i])
            e = e.replace(buildRegExp(a[i]), parseInterval(a[i], s, false))
        }
        e = e.replace(/[\[\]]/g, "")
    } else {
        e = e.replace(/[\/\\]/g, "")
        var cur = [e]
        for (var i = 0; i < len; i++) {
            a[i] = getValue(a[i])
            var tmp = parseInterval(a[i], s, true),
                output = []
            for (var n = 0; n < tmp.length; n++) {
                for (var z = 0; z < cur.length; z++) {
                    output.push(cur[z].replace(buildRegExp(a[i]), tmp[n]))
                }
            }
            cur = output.slice()
        }

        e = cur
        len = e.length
        for (var i = 0; i < len; i++) {
            e[i] = e[i].replace(/[\[\]]/g, "")
        }

    }

    return e

    function parseWord(e, s) {
        var i = Number(e) - 1
        return s[i] ? s[i] : ""
    }

    function parseInterval(e, s, mode) {
        var tmp = e.split('-'),
            from = tmp[0] != "" ? Number(tmp[0]) - 1 : 0,
            to = tmp[1] != "" ? Number(tmp[1]) - 1 : s.length,
            c = [];

        for (var i = from; i <= to; i++) {
            if (s[i]) { c.push(s[i]) } else { break; }
        }

        var result
        if (mode) { result = c.length > 0 ? c : [""] } else { result = c.length > 0 ? c.join(' ') : "" }
        return result
    }

    function buildRegExp(r) {
        return new RegExp('\\[' + r + '\\]', "g")
    }

    function getValue(s) {
        return s.replace(/[\[\]]/g, "")
    }
}

function Config() {
    this.source = ""
    this.useSubfolders = true
    this.filter = ""
    this.options = "[3-]\n[F] [1-2]"
    this.word = "1"
    this.interval = "1-2"
    this.useSameFolder = true
    this.move = false
    this.targetPath = ""
    this.preset = ""
    this.report = true
    this.metadata = true

    this.getScriptSettings = function (settingsObj, fromAction) {
        if (fromAction) {
            var d = app.playbackParameters
        } else {
            try { var d = app.getCustomOptions(GUID) } catch (e) { }
        }

        if (d != undefined) descriptorToObject(settingsObj, d, strMessage)

        function descriptorToObject(o, d, s) {
            var l = d.count;
            if (l) {
                if (d.hasKey(s2t("message")) && (s != d.getString(s2t("message")))) return;
            }
            for (var i = 0; i < l; i++) {
                var k = d.getKey(i);
                var t = d.getType(k);
                strk = app.typeIDToStringID(k);
                switch (t) {
                    case DescValueType.BOOLEANTYPE:
                        o[strk] = d.getBoolean(k);
                        break;
                    case DescValueType.STRINGTYPE:
                        o[strk] = d.getString(k);
                        break;
                    case DescValueType.INTEGERTYPE:
                        o[strk] = d.getDouble(k);
                        break;
                }
            }
        }

    }

    this.putScriptSettings = function (settingsObj, toAction) {
        var d = objectToDescriptor(settingsObj, strMessage)

        if (toAction) { app.playbackParameters = d }
        else { app.putCustomOptions(GUID, d) }

        function objectToDescriptor(o, s) {
            var d = new ActionDescriptor;
            var l = o.reflect.properties.length;
            d.putString(s2t("message"), s);
            for (var i = 0; i < l; i++) {
                var k = o.reflect.properties[i].toString();
                if (k == "__proto__" || k == "__count__" || k == "__class__" || k == "reflect") continue;
                var v = o[k];
                k = app.stringIDToTypeID(k);
                switch (typeof (v)) {
                    case "boolean": d.putBoolean(k, v); break;
                    case "string": d.putString(k, v); break;
                    case "number": d.putInteger(k, v); break;
                }
            }
            return d;
        }
    }
}

function readFile(fle, showDialog) {

    var output = []

    if (showDialog) {
        if ($.os.match(/win/i) != null) {
            fle = File.openDialog(strBnAddList, "*.txt", false)
        } else {
            fle = File.openDialog(strBnAddList, function (f) {
                return f.fsName.match(/\.(txt)$/i);
            }, true);
            if (fle.length > 0) fle = fle[0]
        }
    }

    if (fle) {
        fle.open("r");
        do {
            var line = formatLine(fle.readln())
            if (line != "") output.push(line)
        } while (!fle.eof)

        fle.close
    }

    return output
}

function formatLine(s) {
    s = s.replace(/[:\/*\?\"\<\>\|\#\[\]\\]/g, "_")
    s = s.replace(/\s+/g, " ")
    s = s.replace(/ +$/, "")
    s = s.replace(/^ +/, "")
    return s
}

function Preset() {

    this.putPreset = function (key, val, mode) {
        var output = this.getPresetList()

        switch (mode) {
            case "add":
                output.push({ key: key, val: val })
                break;
            case "save":
                for (var i = 0; i < output.length; i++) {
                    if (output[i].key == key) { output[i].val = val; break; }
                }
                break;
            case "delete":
                for (var i = 0; i < output.length; i++) {
                    if (output[i].key == key) { output.splice(i, 1); break; }
                }
                break;
        }

        app.eraseCustomOptions('FileCollector')

        var d = new ActionDescriptor();
        for (var i = 0; i < output.length; i++) { d.putString(s2t(output[i].key), output[i].val) }

        app.putCustomOptions('FileCollector', d);
    }

    this.getPreset = function (key) {
        try {
            var d = app.getCustomOptions('FileCollector');
            return d.getString(s2t(key))
        } catch (e) { return "" }
    }

    this.getPresetList = function () {
        var output = []
        try {
            var d = app.getCustomOptions('FileCollector');

            for (var i = 0; i < d.count; i++) { output.push({ key: t2s(d.getKey(i)), val: d.getString(d.getKey(i)) }) }
        } catch (e) { }

        return output.sort(sortPresets)
    }

    function sortPresets(a, b) {
        if (a.key >= b.key) { return 1 } else { return -1 }
    }

    this.checkPresetIntegrity = function (window) {

        var dlPreset = window.children[1].children[1].children[0].children[1]
        var bnRefresh = window.children[1].children[1].children[0].children[2].children[0]
        var bnSave = window.children[1].children[1].children[0].children[2].children[1]

        if (dlPreset.selection.index > 0) {
            var cur = cfg.options
            var old = preset.getPreset(dlPreset.selection.text)
            bnRefresh.enabled = bnSave.enabled = cur == old ? false : true
        } else { bnSave.enabled = false; bnRefresh.enabled = true }
    }
}

function s2t(s) { return stringIDToTypeID(s) }
function t2s(t) { return typeIDToStringID(t) }