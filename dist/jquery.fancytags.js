/*
 *  jquery-boilerplate - v3.5.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
/*
	jQuery FancyTags Plugin
	@name: jquery.fancytags.js
	@author: Seo Yoochan (supergnee@gmail.com, https://twitter.com/seoyoochan)
	@version: 1.0
	@date: 07/23/2015
	@category: jQuery Plugin
	@copyright: (c) 2015 Seo Yoochan (www.seoyoochan.com)
	@licence: Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "fancytags",
			defaults = {
				tagItemClassName: "tag",
				focus: false
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
						this.main(this.element, this.settings);

				},
				main: function (element, settings) {

					$(element).attr("contenteditable", true);
					$(element).attr("tabindex", -1);

					if (settings.focus){
						$(element).focus();
					}

					var taglist = [];
					var DOMNodeTaglist = [];
					var lastTagItem = null;
					var clearInput = false;
					var temp_childnodes = [];
					var input = document.getElementsByClassName("fancyTagsInput");

					temp_childnodes = element.parentNode.childNodes;


					// Check if there is any tag in DOM
					for (var i=0; i < temp_childnodes.length; i++){
						if (temp_childnodes[i].className === settings.tagItemClassName) {
							DOMNodeTaglist.push(temp_childnodes[i]);
						}
					}

					$(element).on("keypress", function(e){

					  	var keycode = e.which || e.keyCode;
					  	var target = e.target || e.srcElement;

						if (keycode !== 0) {
							if (keycode === 44) {
								var sanitisedValue = e.target.childNodes[0].data.replace(/(^,)|(,$)/g, "");
								taglist.push(sanitisedValue);
								createTagItem(e, target, taglist);
							}
						}

						
					});

					$(element).on("keyup", function(e){
					  	var keycode = e.which || e.keyCode;
					  	var target = e.target || e.srcElement;

					  	if (e.keyCode === 188){
					  		emptyInput(target);
					  	}			

					});

					$(element).on("keydown", function(e){
						var keycode = e.which || e.keyCode;
					  	var target = e.target || e.srcElement;

					  	if ((keycode === 8) || (keycode === 48)){

					  		if (!e.target.hasChildNodes()){

					  			// Check if selected tag for removal exists
						  		if (lastTagItem === null) {
									if (DOMNodeTaglist.length > 0){
							  			lastTagItem = DOMNodeTaglist.pop();
							  			var classname = lastTagItem.className;
							  			lastTagItem.className = classname + " selected";
						  			}
						  		} else {
						  			lastTagItem.parentNode.removeChild(lastTagItem);
						  			lastTagItem = null;
						  		}
					  		}

					  	}
					});

					var createTagItem = function(e, target, taglist){
						var tag = null;
						tag = taglist.shift();
						var span = document.createElement("span");
						var tagNode = document.createTextNode(tag);
						span.className = settings.tagItemClassName;
						span.appendChild(tagNode);
						DOMNodeTaglist.push(span);
						target.parentNode.insertBefore(span, target);
					};

					var emptyInput = function(target){
						while (target.hasChildNodes()){
							target.removeChild(target.firstChild);
						}
					};
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
