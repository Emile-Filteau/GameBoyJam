var CanvasView = View.extend({
	constructor : function (partialURL, rootId, callback) {
        this.canvas = {};
        this.context = {};	
		var ref = this;
        this.base(partialURL, rootId, function() {
			callback();
			ref.canvas[rootId] = document.getElementById(rootId);
			ref.context[rootId] = ref.canvas[rootId].getContext("2d");
		});
	},
	
	draw : function() {

	}
});