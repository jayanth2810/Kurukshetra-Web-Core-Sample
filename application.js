jQuery.preloadImages = function()
{
	for(var i = 0; i < arguments.length; i++)
	{
		var img = document.createElement('img');
		$(img).bind('load', function() {
			this.src = arguments[i];
		}).trigger('load');
	}
}


function include_dom(elem_id, script_filename) {
    var html_doc = $(elem_id);
    var js = document.createElement('script');
    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', script_filename);
    html_doc.append(js);
    return false;
}

function readySortSelect(form_id) {
  $('#' + form_id + ' select').each(function(list) {
            var items = $(list).options.length;
            // create array and make copies of options in list
            var tmpArray = new Array(items);
            for ( i=0; i<items; i++ ) {
              if ($(list).options[i].selected == true)
                tmpArray[i] = new Option($(list).options[i].text,list.options[i].value, true, true);
              else
                tmpArray[i] = new Option($(list).options[i].text,list.options[i].value);
            }
            // sort options using given function
            tmpArray.sort(compareOptionText);
            // make copies of sorted options back to list
            for ( i=0; i<items; i++ ) {
              if (tmpArray[i].selected == true)
                $(list).options[i] = new Option(tmpArray[i].text,tmpArray[i].value, true, true);
              else
                $(list).options[i] = new Option(tmpArray[i].text,tmpArray[i].value);
            }
  });
}

function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num)) num = '0';
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = '0' + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + '€' + num + '.' + cents);
}

function open_modal() {
  var _this = $(this);
  $.get(_this.data("url"), function(data) {
    $('.ui-dialog-content').dialog( "close" );
    $('.ui-dialog-content').remove();
    $('<div id="dialog-modal_'+_this.data("uid")+'" title="'+_this.data("popuptitle")+'">'+data+'</div>').insertAfter('#main_container');
    $( '#dialog-modal_'+_this.data("uid") ).dialog({
      height: parseFloat(_this.data("sizey")),
      width: parseFloat(_this.data("sizex")),
      modal: true
    });
  });
}