$(function(){

	// selectores caché

	var clock = $('#clock'),
		alarm = clock.find('.alarm'),
		ampm = clock.find('.ampm');

	// Asignar los dígitos a sus nombres (esto será una matriz o array)
	var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

	// Este objeto contendrá los elementos de los dígitos
	var digits = {};

	// Posiciones para las horas, minutos y segundos
	var positions = [
		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];

	// Generar los dígitos con el marcado (markup) necesario,
	// y añadirlos al reloj

	var digit_holder = clock.find('.digits');

	$.each(positions, function(){

		if(this == ':'){
			digit_holder.append('<div class="dots">');
		}
		else{

			var pos = $('<div>');

			for(var i=1; i<8; i++){
				pos.append('<span class="d' + i + '">');
			}

			// Establecer los dígitos como pares de valores clave: pares de valores en el objeto de dígitos
			digits[this] = pos;

			// Añadir los elementos de dígito a la página
			digit_holder.append(pos);
		}

	});

	// Agregar nombres semana

	var weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' '),
		weekday_holder = clock.find('.weekdays');

	$.each(weekday_names, function(){
		weekday_holder.append('<span>' + this + '</span>');
	});

	var weekdays = clock.find('.weekdays span');


	// Ponga en marcha un temporizador cada segundo y actualice el reloj.

	(function update_time(){

		// Utilice moment.js para dar salida a la hora actual en forma de cadena
		// Es para las horas en formato de 12 horas,
		// mm - minutos, ss-segundos (todos con ceros a la izquierda),
		// d es para el día de la semana y A es para AM/PM

		var now = moment().format("hhmmssdA");

		digits.h1.attr('class', digit_to_name[now[0]]);
		digits.h2.attr('class', digit_to_name[now[1]]);
		digits.m1.attr('class', digit_to_name[now[2]]);
		digits.m2.attr('class', digit_to_name[now[3]]);
		digits.s1.attr('class', digit_to_name[now[4]]);
		digits.s2.attr('class', digit_to_name[now[5]]);

		// La biblioteca devuelve el domingo como primer día de la semana.
		// Vamos a cambiar todos los días una posición hacia abajo, 
		// y hacer que el domingo sea el último

		var dow = now[6];
		dow--;
		
		// Domingo!
		if(dow < 0){
			// Definitivo
			dow = 6;
		}

		// Marcar el día de la semana activo
		weekdays.removeClass('active').eq(dow).addClass('active');

		// Configure el texto am/pm:
		ampm.text(now[7]+now[8]);

		// Programe esta función para que se ejecute de nuevo en 1 seg.
		setTimeout(update_time, 1000);

	})();

	// Cambiar el tema

	$('a.button').click(function(){
		clock.toggleClass('light dark');
	});

});