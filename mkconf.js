
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
  	  language: "ja",
  	  pageDirection: "ltr",
  	  options: {
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
  	  metadata.creators.forEach(function( creator, index ){
  	  	if ( creator.content == "" ) {
  	  		metadata.creators.splice( index, 1 );
  	  	} else {
  	  	    if ( creator.role == "" ) {
  	  	    	delete creator.role;
  	  	    }
  	  	}
  	  });
  	  if ( metadata.creators.length == 0 ) {
  	  	delete metadata.creators;
  	  }
  	  if ( metadata.publisher == "" ) {
  	  	delete metadata.publisher;
  	  }
  	  var date = new Date();
  	  return yaml.safeDump(metadata) + `\n# ${date.toLocaleString()}`;
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
    }
   }
})