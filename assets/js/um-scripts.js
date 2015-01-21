jQuery(document).ready(function() {

	jQuery(document).on('click', '.um-dropdown a', function(e){
		return false;
	});
	
	jQuery(document).on('click', '.um-dropdown a.real_url', function(e){
		window.location = jQuery(this).attr('href');
	});

	jQuery(document).on('click', '.um-trigger-menu-on-click', function(e){
		jQuery('.um-dropdown').hide();
		menu = jQuery(this).find('.um-dropdown');
		menu.show();
		return false;
	});

	jQuery(document).on('click', '.um-dropdown-hide', function(e){
		UM_hide_menus();
	});

	jQuery(document).on('click', 'a.um-manual-trigger', function(){
		var child = jQuery(this).attr('data-child');
		var parent = jQuery(this).attr('data-parent');
		jQuery(this).parents( parent ).find( child ).trigger('click');
	});

	jQuery('.um-tip-n').tipsy({gravity: 'n', opacity: 1, live: true, offset: 3 });
	jQuery('.um-tip-w').tipsy({gravity: 'w', opacity: 1, live: true, offset: 3 });
	jQuery('.um-tip-e').tipsy({gravity: 'e', opacity: 1, live: true, offset: 3 });
	jQuery('.um-tip-s').tipsy({gravity: 's', opacity: 1, live: true, offset: 3 });

	jQuery('.um-field input[type=radio]').change(function(){
		var field = jQuery(this).parents('.um-field');
		var this_field = jQuery(this).parents('label');
		field.find('.um-field-radio').removeClass('active');
		field.find('.um-field-radio').find('i').removeClass().addClass('um-icon-android-radio-button-off');
		this_field.addClass('active');
		this_field.find('i').removeClass().addClass('um-icon-android-radio-button-on');
	});

	jQuery('.um-field input[type=checkbox]').change(function(){
		
		var field = jQuery(this).parents('.um-field');
		var this_field = jQuery(this).parents('label');
		if ( this_field.hasClass('active') ) {
		this_field.removeClass('active');
		this_field.find('i').removeClass().addClass('um-icon-android-checkbox-outline-blank');
		} else {
		this_field.addClass('active');
		this_field.find('i').removeClass().addClass('um-icon-android-checkbox-outline');
		}

	});

	jQuery('.um-datepicker').each(function(){
		elem = jQuery(this);
		
		if ( elem.attr('data-disabled_weekdays') != '' ) {
			var disable = JSON.parse( elem.attr('data-disabled_weekdays') );
		} else {
			var disable = false;
		}
		
		var years_n = elem.attr('data-years');
		
		var min = new Date( elem.attr('data-date_min') );
		var max = new Date( elem.attr('data-date_max') );

		elem.pickadate({
			selectYears: years_n,
			min: min,
			max: max,
			disable: disable,
			format: elem.attr('data-format'),
			formatSubmit: 'yyyy/mm/dd',
			hiddenName: true
		});
	});

	jQuery('.um-timepicker').each(function(){
		elem = jQuery(this);
		
		elem.pickatime({
			format: elem.attr('data-format'),
			interval: parseInt( elem.attr('data-intervals') ),
			formatSubmit: 'HH:i',
			hiddenName: true
		});
	});

	jQuery('.um-rating').raty({
		half: 		false,
		starType: 	'i',
		number: 	function() {return jQuery(this).attr('data-number');},
		score: 		function() {return jQuery(this).attr('data-score');},
		scoreName: 	function(){return jQuery(this).attr('data-key');},
		hints: 		false,
		click: function(score, evt) {
			live_field = this.id;
			live_value = score;
			um_conditional();
		}
	});

	jQuery('.um-rating-readonly').raty({
		half: 		false,
		starType: 	'i',
		number: 	function() {return jQuery(this).attr('data-number');},
		score: 		function() {return jQuery(this).attr('data-score');},
		scoreName: 	function(){return jQuery(this).attr('data-key');},
		hints: 		false,
		readOnly: true
	});

	jQuery(document).on('click', '.um .um-single-image-preview a.cancel', function(e){
		e.preventDefault();
		var parent = jQuery(this).parents('.um-field');
		parent.find('.um-single-image-preview img').attr('src','');
		parent.find('.um-single-image-preview').hide();
		parent.find('.um-btn-auto-width').html('Upload');
		parent.find('input[type=hidden]').val('');
		return false;
	});

	jQuery(document).on('click', '.um .um-single-file-preview a.cancel', function(e){
		e.preventDefault();
		var parent = jQuery(this).parents('.um-field');
		parent.find('.um-single-file-preview').hide();
		parent.find('.um-btn-auto-width').html('Upload');
		parent.find('input[type=hidden]').val('');
		return false;
	});

	jQuery(".um-s1").select2({
		allowClear: true,
		minimumResultsForSearch: 10
	});
	
	jQuery(".um-s2").select2({
		allowClear: false,
		minimumResultsForSearch: 10
	});
	
	jQuery('.um-s1,.um-s2').css({'display':'block'});

	jQuery(document).on('click', '.um-field-group-head:not(.disabled)', function(){
		var field = jQuery(this).parents('.um-field-group');
		var limit = field.data('max_entries');
		
		if ( field.find('.um-field-group-body').is(':hidden')){
			field.find('.um-field-group-body').show();
		} else {
			field.find('.um-field-group-body:first').clone().appendTo( field );
		}
		
		increase_id = 0;
		field.find('.um-field-group-body').each(function(){
			increase_id++;
			jQuery(this).find('input').each(function(){
				var input = jQuery(this);
				input.attr('id', input.data('key') + '-' + increase_id );
				input.attr('name', input.data('key') + '-' + increase_id );
				input.parent().parent().find('label').attr('for', input.data('key') + '-' + increase_id );
			});
		});
		
		if ( limit > 0 && field.find('.um-field-group-body').length == limit ) {
			
			jQuery(this).addClass('disabled');
			
		}
		
	});

	jQuery(document).on('click', '.um-field-group-cancel', function(e){
		e.preventDefault();
		var field = jQuery(this).parents('.um-field-group');
		
		var limit = field.data('max_entries');
		
		if ( field.find('.um-field-group-body').length > 1 ) {
		jQuery(this).parents('.um-field-group-body').remove();
		} else {
		jQuery(this).parents('.um-field-group-body').hide();
		}
		
		if ( limit > 0 && field.find('.um-field-group-body').length < limit ) {
			field.find('.um-field-group-head').removeClass('disabled');
		}
		
		return false;
	});

});