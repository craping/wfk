/**
 * 
 */


(function ($) {
    $.fn.checkFileTypeAndSize = function (options) {
        var defaults = {
            allowedExtensions: [],
            maxSize: 20, 
            widthAndHeight: 100*100,
            success: function(){},
            extensionerror: function(){},
            sizeerror: function(){},
            widthAndHeightError: function(){},
        };
        options = $.extend(defaults, options);
        return this.each(function(){
            $(this).on('change', function () {
            	$("#icon")[0].src = Web.Method.getObjectURL($("#iconFile")[0]);
            	
                var filePath = $(this).val();
                var fileLowerPath = filePath.toLowerCase();
                var extension = fileLowerPath.substring(fileLowerPath.lastIndexOf('.') + 1);

                if ($.inArray(extension, options.allowedExtensions) == -1) {
                    options.extensionerror();
                    $(this).focus();
                }else{
                    try {
                    	var size = 0;
                    	size = $(this)[0].files[0].size;
                    	size = size / 1024;
                        if (size > options.maxSize) {
                            options.sizeerror();
                        } else {
                            options.success();
                        }
                    } catch (e) {
                        alert("错误：" + e);
                    }
                }
            });
        });
        
    };
    
})(jQuery);



