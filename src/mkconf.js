
var yaml = require("js-yaml");

var app = new Vue({
  el: "#form",
  data: {
  	metadata: {
  	　ddconvVersion: "1.0",
  	  titles: [
  	    { content: "" }
  	  ],
  	  creators: [
  	    { 
  	    	content: "",
  	    	role:    ""
  	    }
  	  ],
  	  publisher: "",
      pageDirection: "ltr",
  	  language: "ja",
  	  options: {
        skipCover: true,
  	  	titlepage:  false,
  	  	tocInSpine: true,
  	  	tocDisplayDepth: 6,
  	  	tocDisplayDepth: 6,
  	  	displayLandmarksNav: false,
  	  	displayLoiNav: false,
  	  	displayLotNav: false,
  	  	autoTcy:    true,
  	  	tcyDigit:   2,
  	  	kepub:      false,
  	  	autoSentenceWrap: false
  	  },
      ibooks: {
        version: "",
        specifiedFonts: true
      }
  	}
  },
  computed: {
  	yaml: function () {
  	  var metadata = JSON.parse(JSON.stringify(this.metadata));
  	  metadata.titles.forEach(function( title, index ){
  	  	if ( title.content == "" ) {
  	  		metadata.titles.splice( index, 1 );
  	  	}
  	  });
  	  if ( metadata.titles.length == 0 ) {
  	  	return "タイトルを入力してください";
  	  }
      creators = metadata.creators;
      metadata.creators = [];
  	  creators.forEach(function( creator, index ){
        if ( creator.role == "" ) {
          delete creator.role;
        }
        if ( creator.content !== "" ) {
          metadata.creators.push(creator);
        }
  	  });
  	  if ( metadata.creators.length == 0 ) {
  	  	delete metadata.creators;
  	  }
  	  if ( metadata.publisher == "" ) {
  	  	delete metadata.publisher;
  	  }
      if ( metadata.options.skipCover === true ) {
        delete metadata.options.skipCover;
      }
      if ( metadata.options.tocDisplayDepth === 6 ) {
        delete metadata.options.tocDisplayDepth;
      }
      if ( metadata.options.displayLandmarksNav === false ) {
        delete metadata.options.displayLandmarksNav;
      }
      if ( metadata.options.displayLoiNav === false ) {
        delete metadata.options.displayLoiNav;
      }
      if ( metadata.options.displayLotNav === false ) {
        delete metadata.options.displayLotNav;
      }
      if ( metadata.options.kepub === false ) {
        delete metadata.options.kepub;
      }
      if ( metadata.ibooks.version == "" ) {
        delete metadata.ibooks.version;
      }
      if ( metadata.ibooks.specifiedFonts == true ) {
        delete metadata.ibooks.specifiedFonts;
      }
      if ( Object.keys(metadata.ibooks).length === 0 ) {
        delete metadata.ibooks;
      }
      var str = `# ddconv.yml
# でんでんコンバーター設定ファイル
# 
# 使い方==
# このファイルを「ddconv.yml」というファイル名で保存して、他の素材とともに「でんでんコンバーター」にアップロードしてください。
# 入力フォームに情報を打ち込む手間を減らし、より詳細な情報を設定できます。
#
# タイムスタンプ==
# ${new Date().toLocaleString()}


${yaml.safeDump(metadata)}
`;
  	  return str;
  	},
    url: function(){
      var blob = new Blob([ this.yaml ], { "type" : "text/plain" });
      return window.URL.createObjectURL(blob);
    },
    btnStatus: function(){
      if ( this.metadata.titles[0].content && this.metadata.titles[0].content.length > 0 ) {
        return {
          disabled: false,
          downloadable: true
        }
      } else {
        return {
          disabled: true,
          downloadable: false
        }
      }
    }
  },
  methods: {
    addNewCreator: function(event){
      var newCreator = {
        content: "",
        role:    ""
      }
      this.metadata.creators.push(newCreator);
    },
    copyTextarea: function(event){
      var textarea = document.getElementById('textarea');
      textarea.select();
      if ( document.execCommand('copy') ) {
        alert('正常にクリップボードにコピーされました');
      } else {
        alert('クリップボードにコピーできませんでした');
      }
      textarea.blur();
    }
  }
})