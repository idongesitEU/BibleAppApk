app.GA("create", "UA-224082985-1");
var ver = app.GetVersion()

function OnConfig() {}
cfg.Light;
cfg.MUI;
const oner = () => app.SetOnError(OnError);
oner();

function OnError(msg, line, file) {
    var txtt = `\n\nMESSAGE: ${msg}\n\nLINE: ${line}\n\nFILE: ${file} `;
    app.Alert(txtt, "Please screenshot this mesaage and send to the developer:")
}
app.SetOrientation("Portrait")
app.SetDebugEnabled(false);
app.EnableBackKey(false);
datacard = "datacard"; //database file
db = app.LoadText("user", "{\"times\":1,\"mode\":\"light\",\"history\":[],\"favourite\":[],\"lastRead\":null,\"lastTime\":null}", datacard);
ldb = JSON.parse(db); //liquid database
const bibleOJ = app.ReadFile("Misc/oldT.json"); //old testament file
const bibleO = JSON.parse(bibleOJ);
const bibleNJ = app.ReadFile("Misc/newT.json"); //new testament file
const bibleN = JSON.parse(bibleNJ);
const writeDB = ( /*column,value*/ ) => {
    const privateData = JSON.stringify(ldb);
    app.SaveText("user", privateData, datacard);
}

function removeDup(array) {
    arr = []
    for (let i = 0; i < array.length; i++) {
        if (arr.includes(array[i])) {} else {
            arr.push(array[i])
        }
    }
    return arr
}
str = "1,2,4,6,a,f,5,6,8,e,9,8,9,d,c,b,c,d,e,f,8,3,1,2,3,4,5,6,7,8,8,9,0";
hex = str.split(",")
hexF = removeDup(hex)

function genPK(self) {
    pk = ""
    for (i = 1; i <= 64; i++) {
        n = Math.random()
        if (n < 0.1) {
            pk += self[1];
        } else if (n < 0.15) {
            pk += self[2];
        } else if (n < 0.2) {
            pk += self[3];
        } else if (n < 0.25) {
            pk += self[4];
        } else if (n < 0.3) {
            pk += self[4];
        } else if (n < 0.32) {
            pk += self[5];
        } else if (n < 0.38) {
            pk += self[6];
        } else if (n < 0.4) {
            pk += self[7];
        } else if (n < 0.42) {
            pk += self[8]
        } else if (n < 0.43) {
            pk += self[9]
        } else if (n < 0.5) {
            pk += self[10]
        } else if (n < 0.6) {
            pk += self[11]
        } else if (n < 0.63) {
            pk += self[13]
        } else if (n < 0.7) {
            pk += self[12]
        } else if (n < 0.78) {
            pk += self[14]
        } else if (n < 0.9) {
            pk += self[15]
        } else if (n < 1.1) {
            pk += self[0]
        }
    }
    return pk
};
if (ldb.times == 1) {
    uid = genPK(hexF);
    app.GA("set", "userId", uid);
}
var w = "white";
var b = "#000000";
var lb = "#121212"
var vlb = "#2f3338"
var wcbc = "#f4f6f7"
var btnb = "#303133";
var wpb = "#ededed"
var wpt = "#353838";
var bwpt = "#e6e7e8"
var bpb = "#393f40";
var bpt = "#646669"

function setColor() {
    if (ldb.mode == "light") {
        bc = w;
        tbc = "#f7fafa";
        ttc = b;
        btnc = w;
        ptc = wpt; //page title color
        ptb = wpb;
        tc = b //text color
        ldiv = lb; //list divider
        cbc = wcbc; //card back color
        dcc = w; //dcard color
    } else if (ldb.mode == "dark") {
        bc = b;
        tbc = vlb;
        ttc = w;
        btnc = btnb;
        ptc = bwpt
        ptb = bpt
        tc = w; //text color
        ldiv = bwpt;
        dcc = lb
        cbc = vlb; //button cards color
    }
}
setColor();
openLays = []; //keep log of open layouts
openAds = []; //keeps logs of open ads
globalWait = false;
screenBol = true;
class ad {
    destroy = () => {
        this.d = true;
        this.lay.DestroyChild(this.adView);
        app.DestroyLayout(this.lay)
    }
    openAd = (msg) => {
        app.OpenUrl(msg);
    }
    constructor(bol) {
        this.retry = () => {
            if (!this.d) {
                app.HttpRequest("GET", url, null, null, handleReply);
            }
        }
        this.wait = () => {
            setTimeout(() => {
                this.retry();
            }, 20000);
        }
        this.lay = app.CreateLayout("Linear", "Vertical,FillX")
        this.adView = app.AddWebView(this.lay);
        this.adView.SetMargins(0.0, 0.0, 0.0)
        const url = "https://bufferlayer.blogspot.com/2022/03/adbuffer.html";
        const handleReply = (error, reply) => {
            var html;
            const htmlUrl = "https://bufferlayer.blogspot.com/p/ad-script.html";
            app.HttpRequest("GET", htmlUrl, null, null, (error, reply) => {
                if (error) {
                    return true
                } else {
                    html = reply.slice(reply.indexOf("<adscript>") + 10, reply.indexOf("</adscript>") - 11);
                }
            });
            this.adView.SetOnConsole(this.openAd);
            if (error) {
                this.wait();
                return false;
            } else {
                var st = reply.indexOf("<adsrc>"),
                    stp = reply.indexOf("</adsrc>")
                const usestr = reply.slice(st + 7 + 9, stp)
                var cnt = 0;
                const netWork = setInterval(() => {
                    if (html) {
                        clearInterval(netWork);
                        try {
                            const publicData = JSON.parse(usestr)
                            const adData = pickRandom(publicData);
                            html = html.replace("linkID", adData.linkID);
                            html = html.replace("imageID", adData.imageID);
                            html = html.replace("heightID", adData.heightID);
                            html = html.replace("widthID", adData.widthID);
                            app.GA("send", "screenview", {
                                "appName": "HolyBible",
                                "appVersion": ver,
                                "screenName": "adView"
                            })
                            this.adView.LoadHtml(html);
                            if (bol) {
                                this.adView.SetSize(NaN, 0.32);
                            } else {}
                        } catch (e) {
                            app.Alert(e)
                        }
                        globalWait = false
                    } else {
                        cnt++;
                        if (cnt == 20) {
                            clearInterval(netWork);
                        }
                    }
                }, 3000);
            }
        }
        if (!globalWait) {
            globalWait = true;
            app.HttpRequest("GET", url, null, null, handleReply);
        } else {
            setTimeout(() => {
                this.retry();
            }, 13000);
        }
    }
}
class layout {
    lay = app.CreateLayout("Linear", "Vertical,FillXY");
    title = app.CreateLayout("Linear", "Horizontal,FillX") //title bar layout
    addPageText = () => {
        this.pageText = app.AddText(this.lay, name, 1, NaN, "bold");
        this.pageText.SetTextSize(19);
    }
    setTheme = () => {
        this.lay.SetBackColor(bc);
        this.title.SetBackColor(tbc);
        this.titleText.SetTextColor(ttc);
        this.menu.SetTextColor(ttc)
        this.menu.SetStyle(btnc, btnc, 3, btnc, 3, 10);
        this.pageText ? this.pageText.SetBackColor(ptb) : false;
        this.pageText ? this.pageText.SetTextColor(ptc) : false;
        this.list ? this.list.SetTextColor(tc) : false;
        this.list ? this.list.SetDivider(0.0007, ldiv) : false;
        this.text ? this.text.SetTextColor(tc) : false;
        if (this.dcard) {
            this.bcard.SetBackColor(dcc)
            this.dcard.SetBackColor(dcc);
            this.rvVc.SetBackColor(cbc);
            this.rcVc.SetBackColor(cbc);
            this.otVc.SetBackColor(cbc);
            this.ntVc.SetBackColor(cbc)
            this.randVext.SetTextColor(tc);
            this.randCext.SetTextColor(tc);
            this.randVext.SetBackColor(cbc);
            this.randCext.SetBackColor(cbc);
            this.bcard.SetBackColor(cbc);
            this.dcard.SetBackColor(cbc);
            this.today.SetTextColor(ptc);
            this.bookText.SetTextColor(ptc)
            this.oldText.SetTextColor(tc);
            this.newText.SetTextColor(tc);
            this.oldText.SetBackColor(cbc);
            this.newText.SetBackColor(cbc);
            app.SetStatusBarColor(vlb)
            app.SetNavBarColor(cbc)
            this.favouritebtn.SetStyle(btnc, btnc, 5, btnc, 3, 10);
            this.donatebtn.SetStyle(btnc, btnc, 5, btnc, 3, 10);
            this.historybtn.SetStyle(btnc, btnc, 5, btnc, 3, 10);
            this.historybtn.SetTextColor(tc)
            this.donatebtn.SetTextColor(tc)
            this.favouritebtn.SetTextColor(tc)
        }
    }
    destroy = () => {
        app.DestroyLayout(this.lay)
    }
    constructor(bol) {
        const openLen = openLays.length;
        if (openLen == 6) {
            for (let buffer = 1; buffer < 4; buffer++) {
                openLays[buffer].destroy();
                openLays.splice(buffer, 1);
            }
        }
        this.lay.SetSize(1, 1);
        this.menu = app.CreateButton("  MENU  ", 0.25, 0.063, "") //Menu Button
        this.menu.SetTextSize(23)
        this.title.AddChild(this.menu)
        this.menu.SetMargins(-0.150, 0.0075, 0.001, 0.001)
        this.menu.SetOnTouch(openDrawer);
        this.title.SetSize(1, 0.075)
        this.lay.AddChild(this.title);
        this.titleText = app.AddText(this.title, "HOLY BIBLE", -1, -1, "bold");
        this.titleText.SetTextSize(40)
        if (bol) {
            this.addPageText();
        }
        this.scrl = app.AddScroller(this.lay, 1, 0.97);
        this.scrlPad = app.CreateLayout("Linear", "Center,FillXY");
        this.scrlPad.SetSize(1, NaN)
        this.scrl.AddChild(this.scrlPad);
    }
} //end of layout class
class readMode extends layout {
    layId = "READ MODE";
    addHLog = (item) => {
        const verify = () => {
            ldb["history"].splice(ldb["history"].indexOf(item), 1);
            ldb["history"].unshift(item);
        }
        ldb.history.includes(item) ? verify() : ldb["history"].unshift(item);
        writeDB();
    }
    addFav = () => {
        const item = openLays[openLays.length - 1].hLog;
        const ft = openLays[openLays.length - 1].favText;
        if (ldb.favourite.includes(item)) {
            ldb["favourite"].splice(ldb.favourite.indexOf(item), 1);
            ft.SetTextColor("blue");
            writeDB();
            app.ShowPopup("removed from favourites")
        } else {
            ldb["favourite"].unshift(item);
            ft.SetTextColor("red");
            writeDB();
            app.ShowPopup("added to favourites")
        }
    }
    constructor(book, chapter, bol) {
        super(bol);
        openAds.push(new ad());
        const al = openAds.length
        this.scrlPad.AddChild(openAds[al - 1].lay);
        this.hLog = `${book}  ${chapter}`;
        this.addHLog(this.hLog);
        this.favText = app.AddText(this.title, "[fa-star]", 0.16, -1, "FontAwesome")
        this.favText.SetTextSize(30)
        this.favText.SetMargins(NaN, 0.015, -0.15)
        this.favText.SetOnTouchUp(this.addFav)
        ldb.favourite.includes(this.hLog) ? this.favText.SetTextColor("red") : this.favText.SetTextColor("blue")
        this.pageText.SetText(`${book}   ${chapter}`)
        this.text = app.AddText(this.scrlPad, "", 0.95, NaN, "multiline,left");
        this.text.SetTextSize(20)
        try {
            var ftxt = bibleO[book][chapter];
            ftxt = ftxt.replace("\n\n\n\n\n", "\n")
            this.text.SetText(ftxt)
        } catch (e) {
            var ftxt = bibleN[book][chapter];
            ftxt = ftxt.replace("\n\n\n\n\n", "\n\n")
            this.text.SetText(ftxt)
        }
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "ReadMode"
        })
        this.setTheme();
        this.lay.SetVisibility("hide")
        app.AddLayout(this.lay);
        this.lay.Animate("SlideFromLeft");
        openAds.push(new ad(true));
        const al1 = openAds.length
        openAds[al1 - 1].adView.SetMargins(NaN, null, null, 0.2);
        this.scrlPad.AddChild(openAds[al1 - 1].lay);
    }
} //end of readmode class
class favourite extends layout {
    layId = "FAVOURITE"
    openRead = (log) => {
        const plog = log.split("  ");
        const book = plog[0];
        const chapter = plog[1];
        openLays.push(new readMode(book, chapter, true));
    }
    constructor(bol) {
        super(bol);
        openAds.push(new ad());
        const al = openAds.length
        this.scrlPad.AddChild(openAds[al - 1].lay);
        this.clear = app.AddText(this.title, "[fa-trash]", 0.16, -1, "FontAwesome")
        this.clear.SetTextSize(30)
        this.clear.SetMargins(NaN, 0.015, -0.15)
        this.clear.SetTextColor("red")
        this.clear.SetOnTouch(() => {
            ldb.favourite = [];
            writeDB();
            app.ShowPopup("Favourite Cleared Successfully")
            this.list.RemoveAll();
        })
        this.pageText.SetText("FAVOURITE")
        this.list = app.AddList(this.scrlPad, ldb.favourite.join(), 0.98, NaN, "Expand")
        this.list.SetTextSize(22);
        this.list.SetOnTouch(this.openRead)
        this.text = app.AddText(this.scrlPad, "", 0.95, NaN, "multiline");
        this.text.SetTextSize(20)
        ldb.favourite.length == 0 ? this.text.SetText("Favourite is currently empty") : false;
        const spy = app.CreateLayout("Linear", "Horizontal");
        spy.SetSize(1, 0.1);
        this.scrlPad.AddChild(spy);
        this.setTheme();
        app.AddLayout(this.lay);
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "favourite"
        })
        /*
      this.lay.SetVisibility("hide")
       app.AddLayout(this.lay);
       this.lay.Animate("SlideFromRight")
       */
        const h = this.list.GetHeight();
        this.list.SetSize(NaN, h + 0.35)
    }
} //end of favourite class
class history extends layout {
    layId = "HISTORY"
    openRead = (log) => {
        const plog = log.split("  ");
        const book = plog[0];
        const chapter = plog[1];
        openLays.push(new readMode(book, chapter, true));
    }
    constructor(bol) {
        super(bol);
        openAds.push(new ad());
        const al = openAds.length
        this.scrlPad.AddChild(openAds[al - 1].lay);
        this.clear = app.AddText(this.title, "[fa-trash]", 0.16, -1, "FontAwesome")
        this.clear.SetTextSize(30)
        this.clear.SetMargins(NaN, 0.015, -0.15)
        this.clear.SetTextColor("red")
        this.clear.SetOnTouch(() => {
            ldb.history = [];
            writeDB();
            app.ShowPopup("History Cleared Successfully")
            this.list.RemoveAll();
        })
        this.pageText.SetText("HISTORY")
        this.list = app.AddList(this.scrlPad, ldb.history.join(), 0.98, NaN, "Expand")
        this.list.SetTextSize(22);
        this.list.SetOnTouch(this.openRead)
        this.text = app.AddText(this.scrlPad, "", 0.95, NaN, "multiline");
        this.text.SetTextSize(20)
        ldb.history.length == 0 ? this.text.SetText("History is currently empty.\n All pages you read will appear here") : false;
        this.setTheme();
        app.AddLayout(this.lay);
        /*
      this.lay.SetVisibility("hide")
      app.AddLayout(this.lay);
      this.lay.Animate("SlideFromRight")
      */
        const spy = app.CreateLayout("Linear", "Horizontal");
        spy.SetSize(1, 0.1);
        this.scrlPad.AddChild(spy);
        const h = this.list.GetHeight();
        this.list.SetSize(NaN, h + 0.35);
        const arr = this.list.GetList();
        arr.forEach((value, index) => {
            arr[index] = value.title;
        });
        const jl = JSON.stringify(arr);
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "history"
        })
        /*
if(ldb.history==arr){
app.ShowPopup( true );
}else{
app.ShowPopup( false )
}
	/*
	lAr.forEach((self,index)=>{
	self[index]=self.title;
	}
	);
		*/
    }
}
class home extends layout {
    layId = "HOME";
    constructor() {
        super();
        ldb.times++;
        writeDB(); {
            this.today = app.AddText(this.scrlPad, "TODAYS READING")
            this.today.SetTextSize(18)
            this.dcard = app.CreateLayout("Card"); //card for daily quotes
            this.dcard.SetElevation(10);
            this.dcard.SetCornerRadius(10);
            this.dcard.SetSize(0.95, 0.4);
            this.dcard.SetMargins(NaN, 0.005);
            this.scrlPad.AddChild(this.dcard);
            this.scrlPad.SetSize(1, 1)
            this.scrl.SetSize(1, 1)
            this.bc = app.CreateLayout("Linear", "Vertical,FillXY");
            this.dcard.AddChild(this.bc);
            this.bookText = app.AddText(this.bc, "", 1, NaN, "bold")
            this.bookText.SetTextSize(18)
            this.scrl2 = app.AddScroller(this.bc, 1);
            this.scrlPad2 = app.CreateLayout("Linear", "VCenter");
            this.scrl2.AddChild(this.scrlPad2)
            this.text = app.AddText(this.scrlPad2, "", 0.91, NaN, "multiline,left");
            this.text.SetTextSize(18)
            openAds.push(new ad());
            const al = openAds.length
            this.scrlPad2.AddChild(openAds[al - 1].lay);
        } //end of dcard
        {
            this.bcard = app.CreateLayout("card");
            this.bcard.SetElevation(10);
            this.bcard.SetCornerRadius(10);
            this.bcard.SetSize(NaN, NaN);
            this.bcard.SetMargins(NaN, 0.02);
            this.scrlPad.AddChild(this.bcard);
            this.bcardh = app.CreateLayout("Linear", "Horizontal") //holds history,donate and favourite buttons
            this.bcard.AddChild(this.bcardh);
            this.bcard.SetBackColor("white")
            this.donatebtn = app.CreateButton("SHOP ITEMS", 0.3, -1, "");
            this.bcardh.AddChild(this.donatebtn);
            this.favouritebtn = app.CreateButton("FAVOURITES", 0.3, -1, "");
            this.bcardh.AddChild(this.favouritebtn);
            this.historybtn = app.CreateButton("HISTORY", 0.3, -1, "");
            this.bcardh.AddChild(this.historybtn);
        } //end of button card
        {
            this.hc1 = app.CreateLayout("Linear", "Horizontal,FillX")
            this.hc1.SetSize(1, 0.2)
            this.hc1.SetMargins(NaN, 0.02)
            this.scrlPad.AddChild(this.hc1)
            this.oldT = app.CreateLayout("Card")
            this.oldT.SetMargins(NaN, 0.008);
            this.oldT.SetSize(0.4, 0.15)
            this.oldT.SetElevation(15);
            this.oldT.SetCornerRadius(12);
            this.otVc = app.CreateLayout("Linear", "VCenter,FillXY")
            this.oldT.AddChild(this.otVc);
            this.oldText = MUI.AddButtonFlat(this.otVc, "OLD\nTESTAMENT", 0.4, 0.15, "Bold,multiline");
            this.oldText.SetTextSize(25)
            this.hc1.AddChild(this.oldT)
            this.scrlPad.AddChild(this.hc1)
            this.newT = app.CreateLayout("Card")
            this.newT.SetMargins(0.05, 0.008)
            this.newT.SetSize(0.4, 0.15)
            this.newT.SetElevation(15);
            this.newT.SetCornerRadius(12);
            this.ntVc = app.CreateLayout("Linear", "VCenter,FillXY")
            this.newT.AddChild(this.ntVc);
            this.newText = MUI.AddButtonFlat(this.ntVc, "NEW\nTESTAMENT", 0.4, 0.15, "Bold,multiline");
            this.newText.SetTextSize(25)
            this.hc1.AddChild(this.newT)
            this.hc2 = app.CreateLayout("Linear", "Horizontal,FillX");
            this.hc2.SetSize(NaN, 0.2);
            this.scrlPad.AddChild(this.hc2);
            this.randC = app.CreateLayout("Card");
            this.randC.SetSize(0.4, 0.15);
            this.randC.SetElevation(15);
            this.randC.SetCornerRadius(12);
            this.rcVc = app.CreateLayout("Linear", "VCenter,FillXY");
            this.randC.AddChild(this.rcVc);
            this.randCext = MUI.AddButtonFlat(this.rcVc, "RANDOM\nCHAPTER", 0.4, 0.15, "Bold,multiline");
            this.randCext.SetTextSize(25);
            this.hc2.AddChild(this.randC);
            this.scrlPad.AddChild(this.hc2);
            this.randV = app.CreateLayout("Card");
            this.randV.SetMargins(0.05);
            this.randV.SetSize(0.4, 0.15);
            this.randV.SetElevation(15);
            this.randV.SetCornerRadius(12);
            this.rvVc = app.CreateLayout("Linear", "VCenter,FillXY");
            this.randV.AddChild(this.rvVc);
            this.randVext = MUI.AddButtonFlat(this.rvVc, "RANDOM\nVERSE", 0.4, 0.15, "Bold,multiline");
            this.randVext.SetTextSize(25);
            this.hc2.AddChild(this.randV);
            this.rvVc.SetOnTouchDown(() => {
                const raw = randChap(true);
                const rawText = raw[2];
                const chap = raw[1].slice(1 + raw[1].indexOf(" "))
                var verse;
                var randChapIndex;
                var randNum;
                const vr = [176, 70, 40, 20, 2, 1];
                for (let i = 0; i < 5; i++) {
                    randNum = pickRandom(vr[i], vr[i + 1]);
                    randChapIndex = `${chap}:${randNum}`;
                    if (rawText.includes(randChapIndex)) {
                        verse = rawText.indexOf(randChapIndex);
                        break;
                    }
                }
                var vtext;
                const nextChap = `${chap}:${randNum+1}`
                if (rawText.includes(nextChap)) {
                    vtext = rawText.slice(verse, rawText.indexOf(nextChap));
                    vtext = vtext.replaceAll("\n\n", "")
                } else {
                    vtext = rawText.slice(verse).replaceAll("\n\n\n\n\n", "");
                    vtext = vtext.replaceAll("\n\n\n\n", "");
                }
                Alert(`${raw[0]}   ${randChapIndex}`, vtext)
            })
            this.randVext.SetOnTouch(() => {
                const raw = randChap(true);
                const rawText = raw[2];
                const chap = raw[1].slice(1 + raw[1].indexOf(" "))
                var verse;
                var randChapIndex;
                var randNum;
                const vr = [176,
                    70,
                    40,
                    20,
                    2,
                    1
                ];
                for (let i = 0; i < 5; i++) {
                    randNum = pickRandom(vr[i], vr[i + 1]);
                    randChapIndex = `${chap}:${randNum}`;
                    if (rawText.includes(randChapIndex)) {
                        verse = rawText.indexOf(randChapIndex);
                        break;
                    }
                }
                var vtext;
                const nextChap = `${chap}:${randNum+1}`
                if (rawText.includes(nextChap)) {
                    vtext = rawText.slice(verse, rawText.indexOf(nextChap));
                    vtext = vtext.replaceAll("\n\n", "")
                } else {
                    vtext = rawText.slice(verse).replaceAll("\n\n\n\n\n", "");
                    vtext = vtext.replaceAll("\n\n\n\n", "");
                }
                Alert(`${raw[0]}   ${randChapIndex}`, vtext)
            })
        } //end of other buttons
        this.setTheme();
        app.AddLayout(this.lay);
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "home"
        })
    }
} //end of home class
class chapter extends layout {
    layId = "CHAPTER";
    openReadMode = (chapter) => {
        openLays.push(new readMode(openLays[openLays.length - 1].name, chapter, true));
    }
    constructor(name, id, bol) {
        super(bol);
        this.name = name;
        this.id = id;
        this.pageText.SetText(this.name)
        try {
            this.listitem = Object.keys(bibleN[this.name])
        } catch (e) {
            this.listitem = Object.keys(bibleO[this.name])
        }
        this.list = app.AddList(this.scrlPad, this.listitem.join(), 0.985, null, "Expand");
        this.list.SetTextSize(22);
        this.list.SetMargins(0.01, 0.01, 0.01, 0.1)
        this.list.SetOnTouch(this.openReadMode)
        this.setTheme();
        this.lay.SetVisibility("hide")
        app.AddLayout(this.lay);
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "chapter"
        })
        this.lay.Animate("SlideFromBottom")
        const h = this.list.GetHeight();
        this.list.SetSize(NaN, h + 0.42)
        if (this.name == "PSALMS") {
            this.list.SetSize(NaN, h + 1)
        }
    }
} //end of chapter layout
class testament extends layout {
    openChap = (name) => {
        openLays.push(new chapter(name, this.layId, true));
    }
    constructor(test) {
        super();
        this.layId = test;
        var listitem;
        if (test == "OLD TESTAMENT") {
            listitem = Object.keys(bibleO);
        } else if (test == "NEW TESTAMENT") {
            listitem = Object.keys(bibleN);
        }
        this.list = app.AddList(this.scrlPad, listitem.join(), 0.985, null, "Expand");
        this.list.SetTextSize(22);
        this.list.SetOnTouch(this.openChap)
        this.setTheme();
        this.lay.SetVisibility("hide")
        app.AddLayout(this.lay);
        this.lay.Animate("SlideFromRight")
        const h = this.list.GetHeight();
        this.list.SetSize(NaN, h + 0.32)
        openAds.push(new ad());
        const al = openAds.length
        this.scrlPad.AddChild(openAds[al - 1].lay);
    }
} //end of old testament class
class Program {
    setTheme = () => {
        for (var lay of openLays) {
            lay.setTheme();
        }
    }
    openOldT = () => openLays.push(new testament("OLD TESTAMENT"));
    openNewT = () => openLays.push(new testament("NEW TESTAMENT"));
    openHistory = () => openLays.push(new history(true));
    openFav = () => openLays.push(new favourite(true));
    openShop = () => this.drawListAction("SHOP");
    openRead = () => openLays.push(new readMode(ldb.lastRead[0], ldb.lastRead[1], true));
    doNothing = () => false;
    start = () => {
        openLays.push(new home());
        dailyRead();
        openLays[0].text.SetOnTouchUp(this.openRead);
        openLays[0].today.SetOnTouchUp(this.openRead);
        openLays[0].bookText.SetOnTouchUp(this.openRead);
        openLays[0].favouritebtn.SetOnTouch(this.openFav);
        openLays[0].historybtn.SetOnTouch(this.openHistory);
        openLays[0].donatebtn.SetOnTouch(this.openShop);
        openLays[0].otVc.SetOnTouch(this.openOldT)
        openLays[0].ntVc.SetOnTouch(this.openNewT)
        openLays[0].oldText.SetOnTouch(this.openOldT)
        openLays[0].newText.SetOnTouch(this.openNewT)
        openLays[0].rcVc.SetOnTouch(() => {
            const test = [bibleO, bibleN];
            const ctest = pickRandom(test);
            const books = Object.keys(ctest);
            const book = pickRandom(books);
            const chaplist = Object.keys(ctest[book])
            const chapter = pickRandom(chaplist)
            openLays.push(new readMode(book, chapter, true));
        });
        openLays[0].randCext.SetOnTouch(() => {
            const test = [bibleO, bibleN];
            const ctest = pickRandom(test);
            const books = Object.keys(ctest);
            const book = pickRandom(books);
            const chaplist = Object.keys(ctest[book])
            const chapter = pickRandom(chaplist)
            openLays.push(new readMode(book, chapter, true));
        });
    }
    drawListAction = (name) => {
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "drawer"
        })
        app.CloseDrawer("left")
        if (name != openLays[openLays.length - 1].layId) {
            if (name == "HOME") {
                for (let i = 1; i < openLays.length; i++) {
                    openLays[i].destroy();
                }
                openLays.splice(1);
            } else if (name == "OLD TESTAMENT") {
                this.openOldT();
            } else if (name == "NEW TESTAMENT") {
                this.openNewT();
            } else if (name == "HISTORY") {
                this.openHistory();
            } else if (name == "FAVOURITE") {
                this.openFav();
            } else if (name == "DISABLE SCREEN TURN OFF") {
                dlist.SetItem(name, "ENABLE SCREEN TURN OFF");
                app.PreventScreenLock(screenBol);
                screenBol = false;
                app.ShowPopup("Your screen will remain on ")
            } else if (name == "ENABLE SCREEN TURN OFF") {
                dlist.SetItem(name, "DISABLE SCREEN TURN OFF");
                app.PreventScreenLock(screenBol);
                app.ShowPopup("Your screen will now turn off")
                screenBol = true;
            } else if (name == "HOW TO USE") {
                app.OpenUrl("https://bibleappkjv.blogspot.com/2022/03/how-to-use-holy-bible-app-king-james.html?m=1");
            } else if (name == "PRIVACY POLICY") {
                app.OpenUrl("https://bibleappkjv.blogspot.com/2022/03/holy-bible-app-privacy-policy.html?m=1")
            } else if (name == "SHARE APP") {
                app.OpenUrl("https://bibleappkjv.blogspot.com/p/share-app.html")
            } else if (name == "CONTACT US") {
                const mail = (response) => {
                    response == "SEND EMAIL" ? app.SendMail("frankhoodward@hotmail.com", "Bible App Developer Contact", "") : OnBack();
                }
                const html = `<div>Contact the developer:<br/></div>
				<a href="mailto:frankhoodward@hotmail.com">frankhoodward@hotmail.com</a>`
                Alert(null, html, ["BACK", "SEND EMAIL"], mail)
            } else if (name == "SHOP") {
                app.OpenUrl("https://bibleappkjv.blogspot.com/2022/03/bible-app-shop.html")
            }
        }
    }
}
program = new Program();
program.start();

function subArray(a, b) {
    var a = a.toString();
    var b = b.toString();
    var c = b.replace(a, "");
    c = c.replaceAll(",", "");
    var d = c.split("");
    d.forEach((value, index) => {
        d[index] = parseInt(value);
    });
    return d;
}

function pickRandom(list, num) {
    const tlist = typeof(list);
    const tnum = typeof(num);
    if (list == null && num == null) {
        return Math.random()
    }
    const bollist = tlist === "object"
    const bolmin = tlist === "number"
    const bolmax = tnum == "number"
    if (bollist) {
        const l = list.length; //length of array
        const r = Math.random(); //random number
        const p = r * 100;
        const fp = Math.floor(p); //percentage
        const pofl = (fp / 100) * l; //array percent
        const pick = Math.floor(pofl); //random index
        return list[pick]; //return random item
    } else if (bolmin && bolmax) {
        var val = list - num;
        if (val < 0) {
            val = val * (-1);
            const r = Math.random();
            const rpm = (r * val) + list;
            return Math.floor(rpm);
        } else {
            const r = Math.random();
            const rpm = (r * val) + num;
            return Math.floor(rpm);
        }
    } else if (bolmin) {
        const r = Math.random(); //random number
        const rpm = (r) * list;
        return Math.floor(rpm);
    }
}

function randChap(typ) {
    const test = [bibleO,
        bibleN
    ];
    const ctest = pickRandom(test);
    const books = Object.keys(ctest);
    const book = pickRandom(books);
    const chaplist = Object.keys(ctest[book])
    const chapter = pickRandom(chaplist)
    if (typ) {
        const rText = ctest[book][chapter]
        return [book,
            chapter,
            rText
        ];
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "random verse"
        })
    } else {
        openLays.push(new readMode(book, chapter, true));
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "random chapter"
        })
    }
}

function dailyRead() {
    const time = new Date();
    const m = time.getDate();
    if (m != ldb.lastTime) {
        const dl = randChap(true);
        openLays[0].bookText.SetText(`${dl[0]} ${dl[1]}`)
        openLays[0].text.SetText(dl[2]);
        ldb.lastRead = dl;
        ldb.lastTime = m;
        writeDB();
        app.GA("send", "screenview", {
            "appName": "HolyBible",
            "appVersion": ver,
            "screenName": "daily read"
        })
    } else {
        const dl = ldb.lastRead;
        openLays[0].bookText.SetText(`${dl[0]} ${dl[1]}`)
        openLays[0].text.SetText(dl[2]);
    }
} {
    dlay = app.CreateLayout("Linear", "Vertical,FillXY"); //create drawer.layout
    dlay.SetBackColor("black")
    drawer = app.AddDrawer(dlay, "left", 0.8, 1); //create drawer.layout
    const theme = app.AddText(dlay, "THEME")
    theme.SetTextSize(20)
    theme.SetMargins(NaN, 0.0)
    hdlay = app.CreateLayout("Linear", "Horizontal"); //light and dark theme buttons
    dlay.AddChild(hdlay);
    const light = app.CreateButton("LIGHT", -1, -1, "") //Light theme  Button
    light.SetTextSize(22)
    hdlay.AddChild(light)
    light.SetOnTouch(lightMode)

    function lightMode() {
        app.CloseDrawer("left")
        ldb["mode"] = "light";
        writeDB(); //update theme database
        setColor();
        program.setTheme();
        dtheme();
    }
    const dark = app.CreateButton("DARK", -1, -1, "") //Light theme  Button
    dark.SetTextSize(22);
    hdlay.AddChild(dark);
    dark.SetOnTouch(darkMode);

    function darkMode() {
        app.CloseDrawer("left");
        ldb["mode"] = "dark";
        writeDB(); //update theme database
        setColor();
        program.setTheme();
        dtheme();
    }
    const drawlistcard = app.CreateLayout("card")
    drawlistcard.SetCornerRadius(10);
    drawlistcard.SetElevation(3)
    drawlistcard.SetMargins(NaN, 0.1);
    dlay.AddChild(drawlistcard);
    const vc = app.CreateLayout("Linear", "VCenter")
    drawlistcard.AddChild(vc);
    var drawListAction;
    drawerListItems = "SHOP,DISABLE SCREEN TURN OFF,HOW TO USE,PRIVACY POLICY,CONTACT US,SHARE APP,HISTORY,FAVOURITE,OLD TESTAMENT,NEW TESTAMENT,HOME"
    dlist = app.AddList(vc, drawerListItems, 0.75, NaN, "Expand")
    dlist.SetOnTouch(program.drawListAction)

    function dtheme() {
        ldb.mode == "light" ? dlay.SetBackColor("white") : dlay.SetBackColor("#000000")
        if (ldb.mode == "light") {
            dlist.SetBackColor("white")
            dlist.SetTextColor("black")
            dark.SetBackColor(w)
            light.SetBackColor(w)
            light.SetTextColor("black")
            dark.SetTextColor("black")
            app.ShowPopup("light mode");
        } else if (ldb.mode == "dark") {
            dlist.SetBackColor(vlb)
            dlist.SetTextColor("white")
            light.SetBackColor("#303133")
            dark.SetBackColor("#303133")
            light.SetTextColor("white")
            dark.SetTextColor("white")
            app.ShowPopup("dark  mode");
        }
    }
    const exit = app.CreateButton("EXIT", 0.55)
    exit.SetTextColor("white")
    exit.SetBackColor("RED")
    exit.SetOnTouch(proposeExit)
    exit.SetMargins(0.01, 0.15, 0.01, 0.01)
    dlay.AddChild(exit)
    dtheme();
}

function openDrawer() {
    app.OpenDrawer("left");
}

function OnBack() {
    if (app.GetDrawerState("left") == "Open") {
        app.CloseDrawer("left");
        return true;
    }
    const openLen = openLays.length;
    if (openLen == 10) {
        for (let buffer = 1; buffer < 5; buffer++) {
            openLays[buffer].destroy();
            openLays.splice(buffer, 1);
            app.Alert(buffer)
        }
    }
    if (openLays[openLen - 1].layId == "HOME") {
        proposeExit();
    } else {
        openLays[openLen - 1].destroy();
        openLays.pop();
        const nextLen = openLays.length;
        if (openLays[nextLen - 1].layId == "HISTORY") {
            /*
         openLays[nextLen - 1].destroy();
         openLays.pop()
         program.openHistory();
         */
            openLays[nextLen - 1].list.RemoveAll();
            openLays[nextLen - 1].list.SetList(ldb.history.join())
        } else if (openLays[nextLen - 1].layId == "FAVOURITE") {
            /*
         openLays[nextLen - 1].destroy();
         openLays.pop()
         program.openFav();
         */
            openLays[nextLen - 1].list.RemoveAll();
            openLays[nextLen - 1].list.SetList(ldb.favourite.join())
        }
        if (openAds.length > 0) {
            const al = openAds.length;
            openAds[al - 1].destroy();
            openAds.pop()
        }
    }
}
adCount = 0; //track when to show ads on alert
function Alert(title, text, options, callback) {
    app.LockDrawer("left");
    layId = "ALERT";
    const closeFooter = () => {
        OnBack();
    }
    var response;
    const f1 = () => {
        app.UnlockDrawer("left")
        response = options[0];
        try {
            callback(response);
        } catch (e) {
            app.ShowPopup(response)
        }
    }
    const f2 = () => {
        app.UnlockDrawer("left");
        response = options[1];
        try {
            callback(response);
        } catch (e) {
            app.ShowPopup(response)
        }
    }
    const mode = {};
    const vc = app.CreateLayout("Linear", "VCenter,FillXY")
    const card = app.CreateLayout("card");
    card.SetCornerRadius(10)
    card.SetElevation(15)
    card.SetSize(0.94, NaN)
    vc.AddChild(card);
    const canvas = app.CreateLayout("Linear", "VCenter,FillXY")
    card.AddChild(canvas)
    const head = app.AddText(canvas, "", 1, NaN); //head text
    adCount++;
    if (adCount % 5 == 0) {
        openAds.push(new ad());
        const al = openAds.length;
        canvas.AddChild(openAds[al - 1].lay);
    }
    const body = app.AddText(canvas, "", 0.925, NaN, "multiline"); //body text
    body.SetTextSize(20)
    const hc = app.CreateLayout("Linear", "Horizontal");
    hc.SetMargins(0.01, 0.04, 0.01, 0.01)
    canvas.AddChild(hc);
    var footer;
    var footer2;
    if (options == null) {
        footer = app.AddText(hc, "BACK", 1, NaN); //footer text
        footer.SetTextSize(21);
        footer.SetOnTouchUp(closeFooter);
    } else if (options.length == 2) {
        footer = app.AddText(hc, options[0], 0.5, NaN); //footer text
        footer.SetTextSize(21);
        footer.SetOnTouchUp(f1)
        footer2 = app.AddText(hc, options[1], 0.5, NaN); //footer text
        footer2.SetTextSize(21);
        footer2.SetOnTouchUp(f2)
    }
    head.SetTextSize(18)
    card.SetVisibility("hide")
    app.AddLayout(vc);
    title != null ? head.SetText(title) : false;
    text != null ? body.SetHtml(text) : false;
    vc.SetOnTouchUp(closeFooter)
    card.Animate("ZoomInEnter", NaN, 100)
    const th = ldb.mode;
    if (th == "light") {
        vc.SetColorFilter("black", "Overlay")
        vc.SetBackColor("black")
        vc.SetBackAlpha(0.5)
        card.SetBackColor("#ffffff");
        head.SetBackColor("#fcfcfc")
        body.SetTextColor("black ")
        head.SetTextColor("#313438")
        footer.SetTextColor("#313438")
        footer.SetBackColor("white")
        if (footer2) {
            footer2.SetBackColor("white")
            footer2.SetTextColor("#313438")
        }
    } else if (th == "dark") {
        vc.SetColorFilter("#343536", "OverLay")
        vc.SetBackColor("#343536")
        vc.SetBackAlpha(0.75)
        footer.SetTextColor("#c5c9c9");
        footer.SetBackColor("#575959")
        card.SetBackColor("#575959")
        head.SetBackColor("#575959")
        head.SetTextColor("#c5c9c9")
        body.SetTextColor("white")
        if (footer2) {
            footer2.SetTextColor("#d1d1d1");
            footer2.SetBackColor("#575959")
        }
    }
    const setMode = () => {}
    mode["setMode"] = setMode;
    const destroy = () => {
        app.DestroyLayout(vc)
    }
    mode["destroy"] = destroy;
    openLays.push(mode);
}

function proposeExit() {
    const exitResponse = (reply) => {
        reply == "Yes" ? app.Exit() : OnBack();
    }
    app.GetDrawerState() == "Open" ? app.CloseDrawer("left") : false;
    Alert(null, "Are you sure to exit the app?", ["Yes", "No"], exitResponse)
}
