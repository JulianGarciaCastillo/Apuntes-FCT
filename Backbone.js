Backbone.js
Es un gestor MVC para javascript usando jquery. Divide la estructura de la app por clases.


@@ EJEMPLO APP CALCULA AREA TRIANGULO
=== MODELO =============================================================================================>
var Rectangulo = Backbone.Model.extend({
	defaults: {
		alto: 4,
		ancho: 3,
	},
	area: function() {
		return this.get('alto') * this.get('ancho');
	},
	toTemplateJSON: function() {
		var json = this.toJSON();
		json.area = this.area();
		return json;
	}
});

=== VISTA Y CONTROLADOR =============================================================================================>
var Vista = Backbone.View.extend({
	el: '#area',
	events: {
		"change input[name='alto']": 'onChangeAlto',
		"change input[name='ancho']": 'onChangeAncho'
	},

	initialize: function() {
		_.bindAll(this, 'render', 'onChangeAlto', 'onChangeAncho');
			
		this.model = new Rectangulo();			
		this.model.on('change', this.render);

		this.render();
	},

	onChangeAlto: function() {
		var v = parseInt($("input[name='alto']", this.el).val());
		this.model.set('alto', v);
	},

	onChangeAncho: function() {
		var v = parseInt($("input[name='ancho']", this.el).val());
		this.model.set('ancho', v);
	},

	render: function() {
		$("input[name='alto']", this.el).val(this.model.get('alto'));
		$("input[name='ancho']", this.el).val(this.model.get('ancho'));

		var texto = Mustache.render('El área de un rectángulo de alto {{alto}} y ancho {{ancho}} es <b>{{area}}</b>', this.model.toTemplateJSON());
		$('#resultado', this.el).html(texto);
	},
});

===
Luego se carga la vista:
var v = new Vista();

Y el <HTML> quedaría asi:

<div id="area">
	<label for="alto">Alto</label>
	<input id="alto" name="alto" value="">

	<label for="ancho">Ancho</label>
	<input id="ancho" name="ancho" value="">

	<div id="resultado" style="margin-top: 2em"></div>
</div>

Fuentes: http://elblogdepicodev.blogspot.com.es/2013/04/introduccion-y-ejemplo-de-backbonejs.html
