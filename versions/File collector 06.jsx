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
    rev = "0.6",
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
    strOpen = { ru: "Открыть", en: "Open" },
    strEdit = { ru: "Редактировать", en: "Edit" },
    strEditList = { ru: "Редактировать список", en: "Edit list" },
    strEditLine = { ru: "Редактировать строку", en: "Edit line" },
    strMode = { ru: "Режим отображения:", en: "View mode:" },
    strModeText = { ru: "список", en: "list" },
    strModeHeaders = { ru: "список с заголовками", en: "list with headers" },
    strHeader = { ru: "заголовок", en: "header" },
    strList = { ru: "Список", en: "List" },
    strFounded = { ru: "Список найденных файлов:", en: "List of found files:" },
    strRenameAction = { ru: "Переименовать", en: "Rename" },
    strNotFound = { ru: "Не найдены:", en: "Not found:" },
    strPreset = { ru: "Сохранение пресета", en: "Saving a preset" },
    strPresetPromt = { ru: "Укажите имя пресета\nБудут сохранены настройки имени подкаталога и файла.", en: "Specify the name of the preset\nSubdirectory and file name settings will be saved." },
    strCopy = { ru: " копия", en: " copy" },
    strErrPreset = { ru: "Набор с именем \"%1\" уже существует. Перезаписать?", en: "A set with the name \"%1\" already exists. Overwrite?" },
    strDefailt = { ru: "по-умолчанию", en: "default" },
    strMetadata = { ru: "сохранять исходное имя в метаданных файла", en: "save original name in metadata of file" },
    strDiv = { ru: "* разделитель слов: ", en: "* words delimeter: " },
    strSpace = { ru: "пробел", en: "space" },

    cfg = new Config,
    preset = new Preset,
    allFiles = {},
    fromBridge = {}

if (app.playbackParameters.count) {
    try {
        var d = app.playbackParameters
        fromBridge.file = d.getString(d.getKey(0))
        fromBridge.folder = d.getString(d.getKey(1))
    } catch (e) { }
}

cfg.getScriptSettings(cfg)

var w = buildWindow(); var result = w.show()
if (result != 2) { cfg.putScriptSettings(cfg) }
var isCancelled = true

function buildWindow() {
    var target,
        renew,
        sourceText = [],
        formattedText = [],
        delimiter = "",
        headers = []

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
    pnList.margins = [10, 15, 10, 10];;

    // GRLIST
    // ======
    var grList = pnList.add("group");
    grList.orientation = "column";
    grList.alignChildren = ["left", "fill"];
    grList.spacing = 5;
    grList.margins = 0;

    // GRLISTBUTTONS
    // =============
    var grListButtons = grList.add("group");
    grListButtons.orientation = "row";
    grListButtons.alignChildren = ["center", "top"];
    grListButtons.spacing = 5;
    grListButtons.margins = 0;

    var bnAddList = grListButtons.add("button");
    bnAddList.text = strOpen;
    bnAddList.preferredSize.width = 40;

    var bnEditList = grListButtons.add("button");
    bnEditList.text = strEdit;
    bnEditList.preferredSize.width = 40;

    var stDiv = grListButtons.add("statictext");

    dlMode = grListButtons.add("dropdownlist", undefined, [strModeText, strModeHeaders])
    dlMode.text = strMode

    var grText = grList.add("group");
    grText.orientation = "row";
    grText.alignChildren = ["left", "fill"];
    grText.spacing = 0;
    grText.margins = 0;

    var textList = grText.add("listbox");
    textList.preferredSize.width = 500;
    textList.preferredSize.height = 200;
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
    grPatternButtons.spacing = 0;
    grPatternButtons.margins = 0;

    var bnWord = grPatternButtons.add("button");
    bnWord.text = "[N] " + strWord;

    var bnInterval = grPatternButtons.add("button");
    bnInterval.text = "[N-N] " + strInterval;

    var bnFile = grPatternButtons.add("button");
    bnFile.text = "[F] " + strFile;

    var bnFolder = grPatternButtons.add("button");
    bnFolder.text = "[P] " + strFolder;

    var bnHeader = grPatternButtons.add("button");
    bnHeader.text = "[H] " + strHeader;

    // PNOPTIONS
    // =========

    // GRPREVIEW
    // =========
    var grPreview = pnOptions.add("group");
    grPreview.orientation = "row";
    grPreview.alignChildren = ["left", "center"];
    grPreview.spacing = 5;

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
                var a = preset.putSettingsToArray(new Config)
                preset.putArrayToSettings(cfg, a)
                w.onShow(true)
            }
        } else {
            bnDel.enabled = true

            if (renew) {
                var a = preset.getPreset(this.selection.text)
                preset.putArrayToSettings(cfg, a)
                w.onShow(true)
            }
        }
        cfg.preset = this.selection.text
        if (w.visible) { cfg.putScriptSettings(cfg) }
        preset.checkPresetIntegrity(w)
    }

    bnSave.onClick = function () {
        var a = preset.putSettingsToArray(cfg)
        var nm = dlPreset.selection.text
        preset.putPreset(nm, a, "save")
        cfg.putScriptSettings(cfg)
        preset.checkPresetIntegrity(w)
    }

    bnSaveAs.onClick = function () {
        var a = preset.putSettingsToArray(cfg)
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
        var a = preset.putSettingsToArray(cfg)
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

    // ======================================================
    // form methods
    // ======================================================
    bnSource.onClick = function () {
        var fol = new Folder(cfg.source)
        app.doProgress(strBnSearch, "enumFiles(fol.selectDlg())")
        checkButtonsState()
    }

    bnAddList.onClick = function () {
        var fle = new File,
            result = readFile(fle, true)

        if (result != null) {
            sourceText = result
            dlMode.selection = null
            formattedText = buildList(sourceText)
            dlMode.selection = cfg.mode
        }
        checkButtonsState()
    }

    bnEditList.onClick = function () {
        var output = [],
            len = formattedText.length,
            sel = textList.selection != undefined ? textList.selection.index : -1

        if (cfg.mode) {
            for (var i = 0; i < len; i++) { output.push(joinCSV(formattedText[i], delimiter)) }
        } else {
            for (var i = 0; i < len; i++) { output.push(formattedText[i].join(delimiter)) }
        }

        var result = editList(output, delimiter)
        if (result != null) {
            sourceText = result
            dlMode.onChange()
            textList.selection = sel >= textList.items.length ? textList.items.length - 1 : sel
            checkButtonsState()
        }
    }

    ok.onClick = function () {
        var result = searchWindow(formattedText, headers)
        if (result != null) { w.close(); app.doProgress("", "moveFiles(result.found)") }
    }

    cancel.onClick = function () { w.close(2) }

    dlMode.onChange = function () {
        if (this.selection == undefined) return;
        cfg.mode = this.selection.index
        if (w.visible) preset.checkPresetIntegrity(w)

        formattedText = buildList(sourceText)
        var columns = 0,
            wordLen = {},
            text = formattedText.slice()

        for (var i = 0; i < text.length; i++) {
            if (text[i].length > columns) columns = text[i].length
            for (var n = 0; n < text[i].length; n++) {
                if (wordLen[n] == undefined) {
                    wordLen[n] = text[i][n]
                } else {
                    if (text[i][n].length >= wordLen[n].length) wordLen[n] = text[i][n]
                }
            }
        }

        var props = { numberOfColumns: columns, showHeaders: true, columnTitles: [], columnWidths: [] },
            shift = cfg.mode ? -1 : 1
        sel = textList.selection != null ? textList.selection.index + shift : 0

        headers = []
        if (cfg.mode && text.length > 0) {
            headers = text.shift()
            while (headers.length < columns) {
                headers.push("")
            }
        } else {
            for (var i = 0; i < columns; i++) {
                headers.push(String(i + 1))
            }
        }

        var h = headers.slice()
        if (cfg.mode && text.length > 0) {
            for (var i = 0; i < columns; i++) {
                h[i] = i + 1 + ". " + h[i]
            }
        }

        for (var i = 0; i < columns; i++) {
            var wl = wordLen[i] + "###"
            props.columnTitles.push(h[i])
            props.columnWidths.push(textList.graphics.measureString(wl, textList.graphics.font).width)
        }


        grList.remove(grList.children[1])

        var grText = grList.add("group");
        grText.orientation = "row";
        grText.alignChildren = ["left", "fill"];
        grText.spacing = 0;
        grText.margins = 0;

        textList = grText.add("listbox", [0, 0, 500, 200], undefined, props)
        textList.size.width = pnList.size.width - 25

        textList.onClick = function () {
            cfg.options = etSearch.text + '\n' + etRename.text
            if (this.selection != undefined) { previewList(formattedText[this.selection.index + cfg.mode]) } else { stPreviewRename.text = stPreviewSearch.text = "" }
            checkButtonsState()
            preset.checkPresetIntegrity(w)
        }

        textList.onDoubleClick = function () {
            if (this.selection != undefined) {

                var output = [],
                    len = formattedText.length,
                    sel = this.selection.index

                if (cfg.mode) {
                    for (var i = 0; i < len; i++) { output.push(joinCSV(formattedText[i], delimiter)) }
                } else {
                    for (var i = 0; i < len; i++) { output.push(formattedText[i].join(delimiter)) }
                }

                var result = editLine(output[sel + cfg.mode], delimiter)
                if (result != null) {
                    output[sel + cfg.mode] = result;
                    sourceText = output
                    dlMode.onChange()
                    textList.selection = sel >= textList.items.length ? textList.items.length - 1 : sel
                    checkButtonsState()
                }
            }
        }

        textList.addEventListener('keyup', commonHandler)
        function commonHandler(evt) {
            textList.onClick()
        }

        for (var i = 0; i < text.length; i++) {
            var cur = text[i]
            textList.add("item", cur[0])
            for (var n = 1; n < cur.length; n++) {
                textList.items[i].subItems[n - 1].text = cur[n]
            }
        }

        w.layout.layout(true)

        sel = sel >= textList.items.length ? textList.items.length - 1 : sel
        sel = sel < 0 ? 0 : sel
        textList.selection = sel
        if (textList.selection != null) previewList(formattedText[sel + cfg.mode])
    }

    etRename.addEventListener('focus', commonHandler)
    etSearch.addEventListener('focus', commonHandler)
    function commonHandler(evt) {
        target = evt.target
        bnFile.enabled = bnFolder.enabled = bnHeader.enabled = evt.target == etRename ? true : false
    }

    bnWord.onClick = function () { target.textselection = insertWord(); textList.onClick(); target.active = true }
    bnInterval.onClick = function () { target.textselection = insertInterval(); textList.onClick(); target.active = true }
    bnFile.onClick = function () { etRename.textselection = "[F]"; textList.onClick(); etRename.active = true }
    bnFolder.onClick = function () { etRename.textselection = "[P]"; textList.onClick(); etRename.active = true }
    bnHeader.onClick = function () { etRename.textselection = "[H]"; textList.onClick(); etRename.active = true }

    etRename.onChanging = function () { textList.onClick(); }
    etSearch.onChanging = function () { textList.onClick(); }

    dlFilter.onChange = function () { cfg.filter = this.selection.text }
    chSubfolder.onClick = function () { cfg.useSubfolders = this.value; if (etSource.text != '') enumFiles(Folder(cfg.source)) }


    w.onShow = function (fromPreset) {
        renew = false
        if (!fromPreset) {
            etSource.size.width = pnSource.size.width - bnSource.size.width - 30
            textList.size.width = pnList.size.width - 20
            stDiv.size.width = pnList.size.width - bnAddList.size.width - bnEditList.size.width - dlMode.size.width - 35
            stRename.size.width = pnOptions.size.width - grSearch.size.width - 30
            dlPreset.size.width = pnOptions.size.width - grPresetButtons.size.width - stPreset.size.width - 40
            stPreviewRename.size.width = stPreviewSearch.size.width = pnOptions.size.width - grLabels.size.width - 35
            w.layout.layout(true)
            chSubfolder.value = cfg.useSubfolders
            app.doProgress(strBnSearch, "enumFiles(Folder(fromBridge.folder ? fromBridge.folder : cfg.source))")
            checkButtonsState()
            loadPresets()
            dlPreset.selection = dlPreset.find(cfg.preset) != null ? dlPreset.find(cfg.preset) : 0
        }

        dlMode.selection = cfg.mode
        etSearch.text = cfg.options.split('\n')[0]
        etRename.text = cfg.options.split('\n')[1]

        textList.onClick()
        renew = true
    }

    // ======================================================
    // form functions
    // ======================================================

    function checkButtonsState() {
        ok.enabled = textList.items.length != 0 && etSource.text != "" && etSearch.text != "" ? true : false
    }

    function buildList(list) {
        var text = list.slice(),
            len = text.length

        if (cfg.mode) {
            delimiter = findDiv(text)
            for (var i = 0; i < len; i++) {
                var line = text.shift()
                line = formatLine(splitCSV(line, delimiter))
                if (line != "") text.push(line.split('\u001E'))
            }
        } else {
            delimiter = " "
            for (var i = 0; i < len; i++) {
                var line = formatLine(text.shift())
                if (line != "") text.push(line.split(' '))
            }
        }

        return text

        function findDiv(list) {
            var sep = [";", ",", "\t", "|", " "],
                len = list.length,
                result = []

            for (var n = 0; n < 5; n++) {
                var cur = [],
                    sum = 0,
                    mid = 0,
                    dif = 0

                for (var i = 0; i < len; i++) {
                    if (list[i].length > 2) {
                        cur.push(splitCSV(list[i], sep[n]).split('\u001E').length)
                        sum += cur[cur.length - 1]
                    }
                }

                len = cur.length
                mid = sum / len
                if (mid > 1) {
                    var e = false
                    for (var i = 0; i < len; i++) {
                        if (cur[i] == 1) { e = true; break; }
                    }

                    if (!e) {
                        for (var i = 0; i < len; i++) {
                            dif += Math.pow(mid - cur[i], 2)
                        }
                        result.push({ div: sep[n], dif: dif / mid })
                    }
                }
            }

            if (result.length > 0) {
                result.sort(sortResult)
                return result[0].div
            }
            return " "

            function sortResult(a, b) { return a.dif >= b.dif ? 1 : -1 }
        }
    }

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
                allFiles = {}

                cfg.source = etSource.text = currentFolder.fsName.toString()

                app.doProgress(strSearch, "findAllFiles(cfg.source, allFiles, cfg.useSubfolders)")
                var typesArray = buildShortcutList(allFiles),
                    len = typesArray.length;

                dlFilter.removeAll()
                for (var i = 0; i < len; i++) dlFilter.add("item", typesArray[i])
                dlFilter.selection = dlFilter.find(cfg.filter) != null ? dlFilter.find(cfg.filter) : 0

                if (w.visible || fromBridge.file || fromBridge.folder) {
                    if (allFiles["TXT"] != undefined || allFiles["CSV"] != undefined) {

                        allFiles["CSV"] == undefined ? [] : allFiles["CSV"]
                        allFiles["TXT"] == undefined ? [] : allFiles["TXT"]

                        allFiles["TXT"] = allFiles["TXT"].concat(allFiles["CSV"])

                        var b = decodeURI(File(fromBridge.file).name).match(new RegExp("txt$|csv$", "i")) == null ? false : true
                        var result = b ? fromBridge.file : selectListWindow(allFiles["TXT"])

                        if (result != "") {
                            sourceText = readFile(File(result))
                            dlMode.selection = null
                            formattedText = buildList(sourceText)
                            dlMode.selection = cfg.mode
                            fromBridge.file = ""
                        }
                    }
                }
                return true
            }
        }
        return false

    }

    function previewList(s) {
        var c = parseExpression(cfg.options.split('\n')[0], s, undefined, headers),
            e = parseExpression(cfg.options.split('\n')[1], s, File('%' + strFolder + '%/%' + strFile + '%.jpg'), headers),
            search = [],
            rename = []

        for (var i = 0; i < c.length; i++) {
            search.push(c[i].text)
            if (e != "") rename.push(parseHeader(e, c[i].header))
        }

        stPreviewSearch.text = search.join(', ')
        stPreviewRename.text = rename.length == 0 ? e.replace(/\[H\]|[\[\]]/g, '') : rename.join(', ')

        stPreviewRename.helpTip = stPreviewRename.text.length > 70 ? stPreviewRename.text : ''
        stPreviewSearch.helpTip = stPreviewSearch.text.length > 70 ? stPreviewSearch.text : ''
    }

    function moveFiles(f) {

        var len = f.length

        // перемещение основной группы файлов
        for (var i = 0; i < len; i++) {
            app.updateProgress(i + 1, len * 2)
            app.changeProgressText(f[i].newName)

            f[i].sourceXMP = getXMPname(f[i].source.file)

            var source = File(f[i].source.file.fsName),
                target = File(f[i].target),
                targetParent = Folder(target.parent),
                sourceParent = Folder(source.parent),
                metadataName = decodeURI(source.name)

            if (targetParent.fsName != target.parent.fsName) { f[i].err = true; continue; } // имена папок отличаются, нет доступа к целевой папке
            if (!source.exists) { f[i].err = true; continue; } //нет источника файлов
            if (!targetParent.exists) { if (!targetParent.create()) { f[i].err = true; continue; } } //невозможно создать подкаталог
            if (target.exists) { f[i].err = true; continue; } //такой файл уже есть

            if (targetParent.fsName == sourceParent.fsName && cfg.move) {
                if (!hasSameSourceFile(f, f[i])) {
                    source.rename(decodeURI(target.name))
                    f[i].err = true
                } else {
                    if (!source.copy(target)) { f[i].err = true; continue; }
                }
            } else {
                if (!source.copy(target)) { f[i].err = true; continue; }
            }

            if (cfg.metadata) { nameToMetadata(target.fsName, metadataName) }
        }

        //XMP
        for (var i = 0; i < len; i++) {
            app.updateProgress(i + len + 1, len * 2)
            app.changeProgressText('')
            var source = f[i].sourceXMP

            if (source.exists && hasXMP(f[i].source.file)) {
                f[i].doXMP = true
                var target = getXMPname(f[i].target),
                    targetParent = Folder(target.parent),
                    sourceParent = Folder(source.parent)

                if (targetParent.fsName != target.parent.fsName) { f[i].XMPErr = true; continue; } // имена папок отличаются, нет доступа к целевой папке
                if (target.exists) { f[i].XMPErr = true; continue; } //такой файл уже есть

                if (targetParent.fsName == sourceParent.fsName && cfg.move) {
                    if (!hasSameSourceFile(f, f[i])) {
                        source.rename(decodeURI(target.name))
                        f[i].XMPErr = true
                    } else {
                        if (!source.copy(target)) { f[i].XMPErr = true; continue; }
                    }
                } else {
                    if (!source.copy(target)) { f[i].XMPErr = true; continue; }
                }

            }

        }

        if (cfg.move) {
            for (var i = 0; i < len; i++) {
                if (!f[i].err) f[i].source.file.remove()
                if (!f[i].XMPErr && f[i].doXMP) f[i].sourceXMP.remove()
            }
        }

        function hasSameSourceFile(p, f) {
            var len = p.length

            for (var i = 0; i < len; i++) {
                if (p[i].source.file.fsName == f.source.file.fsName && p[i] != f) return true
            }
            return false
        }

        function nameToMetadata(target, fileName) {
            try {
                if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript")
                var xmpFile = new XMPFile(target, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE)
                var xmp = xmpFile.getXMP()
                xmp.setProperty(XMPConst.NS_XMP_MM, "PreservedFileName", fileName)
                if (xmpFile.canPutXMP(xmp)) xmpFile.putXMP(xmp)
                xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY)
                return true
            } catch (e) {

            }

            return false
        }

        function getXMPname(fileName) {
            var f = decodeURI(fileName),
                lastDot = f.lastIndexOf(".")
            if (lastDot == -1) return f
            return File(f.substr(0, lastDot) + '.xmp')
        }

        function hasXMP(target) {
            try {
                if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript")
                var xmpFile = new XMPFile(target.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ)
                xmpFile.closeFile()
                return false
            } catch (e) { }
            return true
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
        for (var i = 0; i < len; i++) { list.add("item", s[i].file.fsName) }
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

function searchWindow(s, h) {
    result = { found: [], notFound: [] }
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

    var chMetadata = pnResult.add("checkbox", undefined, undefined, { name: "chMetadata" });
    chMetadata.text = strMetadata;

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
        fle = File(result.found[list1.selection.index].source.file)
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
            cfg.targetPath = etTarget.text = cfg.source
        }
        renewList()
    }

    chMove.onClick = function () { cfg.move = this.value }
    chMetadata.onClick = function () { cfg.metadata = this.value }

    ok.onClick = function () { w.close() }
    cancel.onClick = function () { result = null; w.close() }

    w.onShow = function () {
        chMove.value = cfg.move
        chSourceAsTarget.value = cfg.useSameFolder
        etTarget.enabled = bnTarget.enabled = !chSourceAsTarget.value
        chMetadata.value = cfg.metadata

        if (cfg.useSameFolder) {
            etTarget.text = cfg.targetPath = cfg.source
        } else {
            if (Folder(cfg.targetPath).exists) {
                etTarget.text = cfg.targetPath
            } else {
                cfg.targetPath = etTarget.text = cfg.source
            }
        }

        allFiles = {}
        app.doProgress(strSearch, "findAllFiles(cfg.source, allFiles, cfg.useSubfolders)")
        app.doProgress("", "findFile (s, h, allFiles, cfg.filter, result)")

        renewList()
    }

    w.show();

    return result

    function findFile(s, headers, files, filter, result) {
        var listLen = s.length,
            searchTemplate = cfg.options.split('\n')[0],
            renameTemplate = cfg.options.split('\n')[1],
            found = [],
            notFound = []

        for (var i = 0 + cfg.mode; i < listLen; i++) {
            app.updateProgress(i + 1, listLen)
            app.changeProgressText(s[i].join(' '))

            var curSearch = parseExpression(searchTemplate, s[i], undefined, headers)

            if (curSearch.length) {
                for (var n = 0; n < curSearch.length; n++) {
                    var currentResult = []


                    for (a in files) {
                        if (files[a][0] != undefined && a != "TXT" && a != "CSV" && a != "XMP") {
                            if (a == filter || filter == strAllFiles.ru || filter == strAllFiles.en) {
                                var filesLength = files[a].length
                                for (var z = 0; z < filesLength; z++) {

                                    search = files[a][z].uCaseName.indexOf(curSearch[n].text.toUpperCase())
                                    if (search != -1) {
                                        var c = parseHeader(parseExpression(renameTemplate, s[i], files[a][z].file, headers), curSearch[n].header)
                                        currentResult.push({ source: files[a][z], newName: c, index: files[a][z].uCaseName.length - curSearch[n].text.length })
                                    }
                                }
                            }
                        }
                    }

                    if (currentResult.length > 0) {
                        currentResult.sort(sortFiles)
                        found.push(currentResult[0])
                    } else {
                        notFound.push({ name: s[i].join(' '), search: curSearch[n].text })
                    }
                }
            } else {
                notFound.push({ name: s[i].join(' '), search: "" })
            }
        }

        result.found = found
        result.notFound = notFound
        return

        function sortFiles(a, b) { return a.index >= b.index ? 1 : -1 }
    }

    function generateSavePaths(f) {
        var len = f.length,
            targetPath = cfg.useSameFolder ? cfg.source : cfg.targetPath
        for (var i = 0; i < len; i++) {
            f[i].target = File(targetPath + '/' + f[i].newName + '.' + f[i].source.ext).fsName
        }

        for (var i = 0; i < len; i++) {
            f[i].target = createUniqueFileName(f, f[i])
        }
    }

    function createUniqueFileName(folder, file) {
        var inParentPath = decodeURI(File(file.target).parent),
            inFileName = file.newName,
            inFileExt = file.source.ext,
            fileNumber = 1,
            uniqueFileName = file.target

        while (pathExists(folder, file, uniqueFileName)) {
            uniqueFileName = File(inParentPath + '/' + inFileName + " (" + fileNumber + ').' + inFileExt).fsName
            fileNumber++;
        }

        return uniqueFileName

        function pathExists(fld, fle, cur) {
            for (var i = 0; i < fld.length; i++) {
                if (fld[i] != fle && fld[i].target == cur) return true
            }
            return false
        }
    }

    function renewList() {
        generateSavePaths(result.found)
        list1.removeAll()
        list2.removeAll()
        for (var i = 0; i < result.found.length; i++) { list1.add("item", result.found[i].source.file.fsName + " -> " + result.found[i].target) }
        for (var i = 0; i < result.notFound.length; i++) { list2.add("item", (result.notFound[i].search ? "*" + result.notFound[i].search + "* -> " : "") + result.notFound[i].name) }

        ok.enabled = list1.items.length > 0 ? true : false
    }
}

function editList(s, div) {
    // W
    // =
    var output = ''
    div = div == ' ' ? strSpace : div
    div = div == '\t' ? "TAB" : div

    var w = new Window("dialog");
    w.text = strEditList;
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];

    var text = w.add("edittext {properties: {multiline: true, scrollable: true}}")
    text.preferredSize.width = 550;
    text.preferredSize.height = 200;

    if (s.length > 0) {
        var stDiv = w.add("statictext");
        stDiv.preferredSize.width = 300;
        stDiv.text = strDiv + "\"" + div + "\""
    }

    // GRBUTTONS
    // =========
    var grButtons = w.add("group");
    grButtons.orientation = "row";
    grButtons.alignChildren = ["center", "center"];
    grButtons.spacing = 10;
    grButtons.margins = 0;

    var ok = grButtons.add("button", undefined, strSave);
    var cancel = grButtons.add("button", undefined, strCancel, { name: "cancel" });

    ok.onClick = function () { output = text.text.split('\n'); w.close() }
    cancel.onClick = function () { output = null; w.close() }

    w.onShow = function () {
        text.active = true
        text.text = s.join('\n')
    }

    w.show()

    return output
}

function editLine(s, div) {
    // W
    // =
    var output = ""
    div = div == ' ' ? strSpace : div
    div = div == '\t' ? "TAB" : div

    var w = new Window("dialog");
    w.text = strEditLine
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];

    var text = w.add("edittext")
    text.preferredSize.width = 550;

    var stDiv = w.add("statictext");
    stDiv.preferredSize.width = 300;
    stDiv.text = strDiv + "\"" + div + "\""


    // GRBUTTONS
    // =========
    var grButtons = w.add("group");
    grButtons.orientation = "row";
    grButtons.alignChildren = ["center", "center"];
    grButtons.spacing = 10;
    grButtons.margins = 0;

    var ok = grButtons.add("button", undefined, strSave, { name: "ok" });
    var cancel = grButtons.add("button", undefined, strCancel, { name: "cancel" });

    ok.onClick = function () { output = text.text; w.close() }
    cancel.onClick = function () { output = null; w.close() }

    w.onShow = function () {
        text.active = true
        text.text = s
    }

    w.show()

    return output
}

function findAllFiles(srcFolder, fileObj, useSubfolders) {
    var fileFolderArray = Folder(srcFolder).getFiles();
    var subfolderArray = []

    for (var i = 0; i < fileFolderArray.length; i++) {
        var fileFoldObj = fileFolderArray[i];

        if (fileFoldObj instanceof File) {
            if (!fileFoldObj.hidden) putFileToTypeObject(fileFoldObj, fileObj)
        } else if (useSubfolders) {
            subfolderArray.push(fileFoldObj)
        }
    }

    if (useSubfolders) {
        for (var i = 0; i < subfolderArray.length; i++) findAllFiles(subfolderArray[i], fileObj, useSubfolders)
    }
}

function putFileToTypeObject(fileName, fileObj) {
    var f = fileName.fsName.toString().toUpperCase()
    var lastDot = f.lastIndexOf(".")
    if (lastDot == -1) return false
    var ext = f.substr(lastDot + 1, f.length - lastDot),
        un = decodeURI(File(f).name),
        n = decodeURI(fileName.name),
        e = fileName.fsName.substr(lastDot + 1, fileName.fsName.length - lastDot)
    un = un.substr(0, un.length - (f.length - lastDot))
    n = n.substr(0, n.length - (fileName.fsName.length - lastDot))
    if (!fileObj.hasOwnProperty(ext)) fileObj[ext] = []
    fileObj[ext].push({ file: fileName, uCaseName: un, name: n, ext: e })
}

function buildShortcutList(fileObj) {
    var output = [strAllFiles]

    for (a in fileObj) {
        if (fileObj[a][0] != undefined && a != "TXT" && a != "CSV" && a != "XMP") output.push(a)
    }
    return output
}

function parseExpression(e, s, f, h) {
    if (s == undefined) return '' //если пустая строка текста, пропустить
    if (e == '') e = "[F]"

    e = e.replace(/[:*\?\"\<\>\|\#]/g, "_")

    if ($.os.search(/windows/i) == -1) {
        e = e.replace(/\\|\/+/g, "/")
        e = e.replace(/\/$|^\//, '')
    } else {
        e = e.replace(/\/|\\+/g, "\\")
        e = e.replace(/\\$|^\\/, '')
    }

    if (f == undefined) e = e.replace(/[\/\\]/g, '')

    var searchResult = [],
        line = s.slice()

    var a = e.match(/\[\d+\]/g),
        len = a ? a.length : 0

    if (f) {
        for (var i = 0; i < len; i++) {
            a[i] = getValue(a[i])
            e = e.replace(buildRegExp(a[i], "g"), getWord(a[i], line))
        }
    } else {
        for (var i = 0; i < len; i++) {
            a[i] = getValue(a[i])
            var c = e.replace(buildRegExp(a[i]), getWord(a[i], line)).replace(/\[\d+\]|\[\d*-\d*\]|\[F\]|\[P\]|\[H\]/g, '').replace(/[\[\]]/g, ''),
                r = getSearchObj(a[i], c, h)
            if (r.text) searchResult.push(r)
            e = e.replace(buildRegExp(a[i]), '')
        }
    }

    if (f) {
        a = e.match(/\[F\]/g)
        len = a ? a.length : 0

        for (var i = 0; i < len; i++) {
            var fle = decodeURI(f.name).replace(/\.\S+$/, "")
            e = e.replace(buildRegExp(a[i]), fle)
        }

        a = e.match(/\[P\]/g)
        len = a ? a.length : 0

        for (var i = 0; i < len; i++) {
            var fle = decodeURI(f.parent.name)
            if (fle == undefined) fle = ''
            e = e.replace(buildRegExp(a[i]), fle)
        }
    }

    a = e.match(/\[\d*-\d*\]/g)
    len = a ? a.length : 0

    if (f) {
        for (var i = 0; i < len; i++) {
            a[i] = getValue(a[i])
            e = e.replace(buildRegExp(a[i]), getInterval(a[i], line))
        }
    } else {
        for (var i = 0; i < len; i++) {
            a[i] = getValue(a[i])
            var t = getInterval(a[i], line, true)

            for (var n = 0; n < t.length; n++) {
                var c = e.replace(buildRegExp(a[i]), getWord(t[n], line)).replace(/\[\d+\]|\[\d*-\d*\]|\[F\]|\[P\]|\[H\]/g, '').replace(/[\[\]]/g, ''),
                    r = getSearchObj(t[n], c, h)
                if (r.text) searchResult.push(r)
            }
            e = e.replace(buildRegExp(a[i]), '')
        }
    }

    return f ? e : searchResult

    function getWord(e, s) {
        var i = Number(e) - 1,
            t = s[i] ? s[i] : ''
        return t
    }

    function getInterval(e, s, searchMode) {
        var tmp = e.split('-'),
            from = tmp[0] != '' ? Number(tmp[0]) - 1 : 0,
            to = tmp[1] != '' ? Number(tmp[1]) - 1 : s.length,
            c = [];

        for (var i = from; i <= to; i++) {
            c.push(searchMode ? i + 1 : s[i])
        }

        if (searchMode) return c

        return c.length ? c.join(' ') : ''
    }

    function getSearchObj(e, s, h) {
        var i = Number(e) - 1,
            h = h[i] ? h[i] : ''

        return { text: s, header: h }
    }

    function buildRegExp(r, options) {
        options = options != undefined ? options : ''
        return new RegExp('\\[' + r + '\\]', options)
    }

    function getValue(s) {
        return s.replace(/[\[\]]/g, '')
    }
}

function parseHeader(s, c) {
    if (s.match(/\[H\]/) == null) return s.replace(/[\[\]]/g, '')
    return s.replace(/\[H\]/g, c).replace(/[\[\]]/g, '')
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
    this.metadata = true
    this.mode = 0

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
            fle = File.openDialog(strBnAddList, "*.txt;*.csv", false)
        } else {
            fle = File.openDialog(strBnAddList, function (f) {
                return f.fsName.match(/\.(txt|csv)$/i);
            }, true);
            if (fle.length > 0) fle = fle[0]
        }
    }

    if (fle) {
        cfg.mode = decodeURI(fle.name).match(new RegExp("txt$", "i")) == null ? 1 : 0

        fle.open("r");
        do {
            var line = fle.readln()
            if (line != "") output.push(line)
        } while (!fle.eof)
        fle.close
    } else return null

    return output
}

function splitCSV(strData, strDelimiter) {

    strDelimiter = (strDelimiter);

    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    var arrData = [];
    var arrMatches = null;

    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];

        if (strMatchedDelimiter != undefined) {
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                arrData.push();
            }
        }
        var strMatchedValue;
        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            strMatchedValue = arrMatches[3];
        }
        arrData.push(strMatchedValue);
    }

    return (arrData.join('\u001E'));
}

function joinCSV(strData, strDelimiter) {
    var len = strData.length

    for (var i = 0; i < len; i++) {
        strData[i] = strData[i].replace(/\"/g, "\"\"")
        var reg = new RegExp("[\n\r\"" + strDelimiter + "]", "g")
        if (strData[i].match(reg)) {
            strData[i] = "\"" + strData[i] + "\""
        }
    }

    return strData.join(strDelimiter)
}

function formatLine(s) {
    s = s.replace(/[:\/*\?\<\>\|\#\[\]\\]/g, "_")
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
        var dlPreset = window.children[1].children[1].children[0].children[1],
            bnRefresh = window.children[1].children[1].children[0].children[2].children[0],
            bnSave = window.children[1].children[1].children[0].children[2].children[1]

        if (dlPreset.selection.index > 0) {
            var cur = preset.putSettingsToArray(cfg)
            var old = preset.getPreset(dlPreset.selection.text)
            bnRefresh.enabled = bnSave.enabled = cur == old ? false : true
        } else { bnSave.enabled = false; bnRefresh.enabled = true }
    }

    this.putSettingsToArray = function (s) {
        var arr = [s.options, s.mode]
        return arr.join('\v')
    }

    this.putArrayToSettings = function (s, arr) {
        var a = arr.split('\v')
        s.options = String(a[0])
        s.mode = a[1] ? Number(a[1]) : 0
    }
}

function s2t(s) { return stringIDToTypeID(s) }
function t2s(t) { return typeIDToStringID(t) }