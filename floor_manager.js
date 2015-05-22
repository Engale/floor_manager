(function ($) {
Drupal.behaviors.floor_manager_sort = {
	fill: function(div, rows, cols, tables, grid) {
		var html = '<ul class="sortable" style="width:' + cols * 26 + 'px;">';
		if($(grid).val() === '')
			for (var li = 0; li < rows * cols; li++) {
				html += '<li data-id="' + li + '" style="text-align:center; margin:2px; padding:3; width:20px; height:20px; display:inline-block; border:1px #000 solid;">';
				if (li < tables) {
					html += li + 1;
				} else {
					html += "&nbsp;";
				}
				html += '</li>';
			}
		else
		{
			var json = jQuery.parseJSON($(grid).val());
			for (var li = 0; li < rows * cols; li++) {
				html += '<li data-id="' + json[li].id + '" style="text-align:center; margin:2px; padding:3; width:20px; height:20px; display:inline-block; border:1px #000 solid;">' + json[li].val + '</li>';
			}
		}
	
		html += "</ul>";
		div.html(html);
		
		$(".sortable").css("cursor", "all-scroll");
		$(".sortable").sortable({
			stop: function() {
				var ret = $(this).find('li').map(function() {
					var $this = $(this);
					return {
						id: $this.data('id'),
						val: $this.text()
					};
				}).get();
		
				$(grid).val(JSON.stringify(ret));
			}
		});
		$(".sortable").disableSelection();
		
		var ret = $(div).find('ul').find('li').map(function() {
			var $this = $(this);
			return {
				id: $this.data('id'),
				val: $this.text()
			};
		}).get();

		$(grid).val(JSON.stringify(ret));
		
	}
},

Drupal.behaviors.floor_manager_sort_rows_change = {
	attach: function(context) {
		$(".edit-field-floor-manager-rows").live("input", function(event) {
			if(!/^[0-9]+$/.test($(this).val())){
				var str = $(this).val();
				$(this).val(str.substring(0, str.length - 1));
			}
			if($(this).val() < 1) $(this).val(1);
			var edit_rows = this;
			var edit_cols = $(this).closest('div').parent().find(".edit-field-floor-manager-columns");
			var edit_tables = $(this).closest('div').parent().find(".edit-field-floor-manager-tables");
			var edit_grid = $(this).closest('div').parent().find(".edit-field-floor-manager-grid");
			var sorter = $(this).closest('div').parent().find(".floor-manager-sorter");
			if($(edit_tables).val() > $(edit_rows).val() * $(edit_cols).val())
				$(edit_tables).val( $(edit_rows).val() * $(edit_cols).val() );
			$(edit_grid).val('');
			Drupal.behaviors.floor_manager_sort.fill($(sorter), $(edit_rows).val(), $(edit_cols).val(), $(edit_tables).val(), edit_grid);	
		});
	}
},

Drupal.behaviors.floor_manager_sort_cols_change = { 
	attach: function(context) {
		$(".edit-field-floor-manager-columns").live("input", function(event) {
			if(!/^[0-9]+$/.test($(this).val())){
				var str = $(this).val();
				$(this).val(str.substring(0, str.length - 1));
			}
			if($(this).val() < 1) $(this).val(1);
			var edit_cols = this;
			var edit_rows = $(this).closest('div').parent().find(".edit-field-floor-manager-rows");
			var edit_tables = $(this).closest('div').parent().find(".edit-field-floor-manager-tables");
			var edit_grid = $(this).closest('div').parent().find(".edit-field-floor-manager-grid");
			var sorter = $(this).closest('div').parent().find(".floor-manager-sorter");
			if($(edit_tables).val() > $(edit_rows).val() * $(edit_cols).val())
				$(edit_tables).val( $(edit_rows).val() * $(edit_cols).val() );
			$(edit_grid).val('');
			Drupal.behaviors.floor_manager_sort.fill($(sorter), $(edit_rows).val(), $(edit_cols).val(), $(edit_tables).val(), edit_grid);	
		});
	}
},

Drupal.behaviors.floor_manager_sort_tables_change = {
	attach: function(context) {
		$(".edit-field-floor-manager-tables").live("input", function(event) {
			if(!/^[0-9]+$/.test($(this).val())){
				var str = $(this).val();
				$(this).val(str.substring(0, str.length - 1));
			}
			if($(this).val() < 1) $(this).val(1);
			var edit_tables = this;
			var edit_cols = $(this).closest('div').parent().find(".edit-field-floor-manager-columns");
			var edit_rows = $(this).closest('div').parent().find(".edit-field-floor-manager-rows");
			var edit_grid = $(this).closest('div').parent().find(".edit-field-floor-manager-grid");
			var sorter = $(this).closest('div').parent().find(".floor-manager-sorter");
			if($(edit_tables).val() > $(edit_rows).val() * $(edit_cols).val())
				$(edit_tables).val( $(edit_rows).val() * $(edit_cols).val() );
			$(edit_grid).val('');
			Drupal.behaviors.floor_manager_sort.fill($(sorter), $(edit_rows).val(), $(edit_cols).val(), $(edit_tables).val(), edit_grid);	
		});
	}
},

Drupal.behaviors.floor_manager_load = {
	attach: function(context) {
		$(document).ready(function(event) {
			var sorters = $(".floor-manager-sorter");
			
			sorters.each(function() {
				var $currentContainer = $(this).closest('div').parent(),
					edit_rows = $currentContainer.find(".edit-field-floor-manager-rows").val(),
					edit_cols = $currentContainer.find(".edit-field-floor-manager-columns").val(),
					edit_tables = $currentContainer.find(".edit-field-floor-manager-tables").val(),
					edit_grid = $currentContainer.find(".edit-field-floor-manager-grid");
			
				Drupal.behaviors.floor_manager_sort.fill($(this), edit_rows, edit_cols, edit_tables, edit_grid);
			});
		});
	}
}

})(jQuery);