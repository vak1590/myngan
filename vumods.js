/*vumods.js [optional]
* this file is part of the VIETUNI typing tool 
* by Tran Anh Tuan [tuan@physik.hu-berlin.de]
* Copyright (c) 2001, 2002 AVYS e.V.. All Rights Reserved.
*/                                             

/*Note:
* this file provides interfaces to extended features of VietUni
* It must be loaded after (not before) vietuni.js
* All other script files will be loaded automatically when needed
*/

// modules: make sure the URIs are correct!
// The following settings have been made for off-line users.
// For web applications it is recommended to use full URI instead,
// e.g. var vuspellaURI= "http://www.mysite.net/js/vuspella.js";
//
var vuspellaURI= "js/vuspella.js";
var vuspellbURI= "js/vuspellb.js";
var vumapsURI  = "js/vumaps.js";
var vuspella = 0;
var vuspellb = 0;
var vumaps = 0;

function loadModule(mURI,idstr) {
  if (!document.all) return alert("Sorry, only IE4,5,6 support this feature.");
  var ls="&nbsp;<script defer type='text/javascript' src='"+mURI+"'></script>";
  document.body.insertAdjacentHTML('beforeEnd', ls);
  if (!eval(idstr)) alert( errormsg);
}
var errormsg="Module chưa nạp xong, có thể kết nói chậm...\n"+
"Bạn hãy thực hiện tao thác 1 lần nữa!";

function convertAtOnce(txtarea) {
  if(!txtarea) return;
  if(theTyper.keymode.off) {
    var msg = "Bộ gõ đang ở trạng thái ta('t.\n Bạn phải đưa về` "+
    "Kiểu đã dùng viết bài trước khi soát dấu";
    return alert(msg);      
  }
  if(!theTyper) theTyper = new CVietString("");
  txtarea.value = theTyper.doConvertIt(txtarea.value);
}

function loadSpellA (lflag) {
  if (!lflag) return (vuspella= 0);
  if (theTyper && theTyper.checkSpell) return (vuspella=1);
  loadModule(vuspellaURI, "vuspella");
}

function loadSpellB (txtarea, search) {
  if (!txtarea) return;
  if(!vuspellb) {
     loadModule(vuspellbURI, "vuspellb");
     if(vuspellb) document.body.insertAdjacentHTML('beforeEnd', vuspellb);
  }
  if (!theTyper) return; else theTyper.txtarea = txtarea; 
  if (theTyper.theSChecker) theTyper.theSChecker.startCS(search);
}

function setCharMap(mapID) { 
  if (typeof(mapID)=='number') charmapid= mapID+1;
  else if (/^\d+$/g.test(mapID)) charmapid= parseInt(mapID,10);
  else charmapid = mapID;
  if (!vumaps) loadModule(vumapsURI, "vumaps");
  if (theTyper) theTyper.charmap = initCharMap();
} 

function convertTo(txtarea, destmap) {
  if (!txtarea) return 0;
  if (!vumaps) loadModule(vumapsURI, "vumaps");
  if (!vumaps) return 0;
  var srcmap = initCharMap();
  txtarea.value=srcmap.convertTxtTo(txtarea.value,initCharMap(destmap+1));
  return 1;
}

function detectMap(txtarea) { 
  if (!txtarea) return 0;
  if (!vumaps) loadModule(vumapsURI, "vumaps");
  if (!vumaps) return 0;      
  var cm = detectFormat(txtarea.value, 1);
  if (cm) setCharMap(cm-1);
  return cm;
} 

function convertArea(txtarea, tomap) {
  if (!txtarea) return 0;
  var srcid = detectFormat(txtarea.value);
  if (!srcid) return 0;
  var srcmap = initCharMap(srcid);
  var destmap = initCharMap(tomap);
  txtarea.value=srcmap.convertTxtTo(txtarea.value,destmap);
  return 1;
}          

function autoConvert(form, tomap) {
  if (!form || !vumaps) return;
  var objs = form.elements;
  for (var i=0; i<objs.length; i++) {    
    if(!objs[i].vietarea) continue;
    else convertArea(objs[i], tomap);
  }
}


CVietString.prototype.doConvertIt = function (txt) {
  var i = 1, len = txt.length;
  this.value = txt.charAt(0);
  while (i < len) {
    this.ctrlchar = txt.charAt(i++);
    this.changed = 0;
    this.keymode.getAction(this);
    if (!this.changed) this.value+= this.ctrlchar;
  }
  return this.value;
}
