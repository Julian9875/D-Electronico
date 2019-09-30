$('.form_date').datetimepicker({
        language:  'es',
        weekStart: 0,
        todayBtn:  false,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
        pickerPosition: "bottom-left",
        format: 'dd-mm-yyyy',
        endDate: new Date(),
        startDate: "22-09-2019",
        onSelect: function(){

             var date2 = $('.form_date').datetimepicker("getDate");
             console.log(date2);
        }


    });