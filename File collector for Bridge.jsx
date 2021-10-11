/*//////////////////////////////////////////////////////////////////////////////
File collector startup script - revision 0.2
jazz-y@ya.ru

put this script to:
windows: <Program Files folder>->Common Files->Adobe->Startup Scripts CC->Adobe Photoshop
macOs: <Bridge folder>->Scripts->Startup Scripts
//////////////////////////////////////////////////////////////////////////////*/

#target bridge

if (BridgeTalk.appName == "bridge") {
  fileCollectorToolMenu = new MenuElement("command", "File collector", "at the end of Tools", "fileCollectorToolMenu")
  fileCollectorThumbnailMenu = new MenuElement("command", "File collector", "at the end of Thumbnail", "fileCollectorThumbnailMenu")
}

fileCollectorToolMenu.onSelect = function () { fileCollectorThumbnailMenu.onSelect() }
fileCollectorThumbnailMenu.onSelect = function () {
  var p = "", f = "", sel = app.document.selections, msg = runFileCollector.toString()
  if (sel.length) {
    if (sel[0].type == "file") {
      f = decodeURI(sel[0].spec)
      p = decodeURI(sel[0].spec.parent)
    } else {
      f = ""
      p = decodeURI(sel[0].spec)
    }
  } else { p = decodeURI(Folder(app.document.presentationPath)) }

  msg = msg.replace(/%file%/, f).replace(/%path%/, p)

  BridgeTalk.launch('photoshop')

  if (BridgeTalk.isRunning('photoshop')) {
    var bt = new BridgeTalk()
    bt.target = "photoshop"
    bt.body = "" + msg + "; runFileCollector();"
    bt.onError = function (err) { alert("Error!\n" + err.body) }
    bt.send()
  } else { alert("Processing stopped! The script could not initialize Adobe Photoshop") }

  function runFileCollector() {
    try {
      var desc = new ActionDescriptor()
      desc.putString(stringIDToTypeID("file"), "%file%")
      desc.putString(stringIDToTypeID("path"), "%path%")
      executeAction(stringIDToTypeID("808f4b96-50f3-4ff3-b00f-bc4189e89c5c"), desc, DialogModes.NO)
    } catch (e) { }
  }
}
