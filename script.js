
function GetPrint()
{
    /*For Print*/
    window.print();
}

function toggleOrders(invoiceId) {
    var ordersSection = document.getElementById('orders-' + invoiceId);
    var orderTable = ordersSection.querySelector('.order-table');

    if (ordersSection.style.display === 'none' || ordersSection.style.display === '') {
      ordersSection.style.display = 'table-row';
      setTimeout(function() {
        orderTable.style.display = 'table';
      }, 20);
    } else {
      orderTable.style.display = 'none';
      setTimeout(function() {
        ordersSection.style.display = 'none';
      }, 200);
    }
  }

function BtnAdd()
{
    /*Add Button*/
    var v = $("#TRow").clone().appendTo("#TBody") ;
    $(v).find("input").val('');
    $(v).removeClass("d-none");
    $(v).find("th").first().html($('#TBody tr').length - 1);
    var newIndex = $("#TBody tr").length - 2;
    v.find("textarea[name='description']").attr('name', 'orders[' + newIndex + '][description]');
    v.find("textarea[name='amt']").attr('name', 'orders[' + newIndex + '][amt]');
    v.find("textarea[name='rate']").attr('name', 'orders[' + newIndex + '][rate]');
    v.find("textarea[name='qty']").attr('name', 'orders[' + newIndex + '][qty]');
}

function BtnDel(v)
{
    /*Delete Button*/
       $(v).parent().parent().remove();
       GetTotal();

        $("#TBody").find("tr").each(
        function(index)
        {
           $(this).find("th").first().html(index);
        }

       );
}

function Calc(index) {
    /*Detail Calculation for a Specific Row*/
    var row = index.closest('tr');
    if (row) {
        var table = row.parentNode;
        if (table && table.tagName === 'TBODY') {
            var rowIndex = row.rowIndex - 2;
        }
    }
    // console.log(rowIndex);
    var qty = document.getElementsByName("orders[" + rowIndex + "][qty]")[0].value;
    var rate = document.getElementsByName("orders[" + rowIndex + "][rate]")[0].value;
    qty = qty? qty: 1;
    rate = rate? rate: 1;
    var amt = qty * rate;
    // console.log(qty);
    document.getElementsByName("orders[" + rowIndex + "][amt]")[0].value = amt;

    GetTotal();
}

function GetTotal()
{
    /*Footer Calculation*/

    var sum=0;
    var amts =  document.querySelectorAll('[name$="[amt]"]');
    // console.log(amts);

    for (let index = 0; index < amts.length; index++)
    {
        var amt = amts[index].value;
        sum = +(sum) +  +(amt) ;
    }

    document.getElementById("FTotal").value = sum;

    var gst =  document.getElementById("FGST").value;
    var net = (sum)- +(gst);
    document.getElementById("FNet").value = net;

}
$(document).ready(function() {
    $("#datetimeInput").click(function() {
        // Get the current date and time
        var currentDateTime = new Date();

        // Format the date and time in 12-hour format
        var formattedDateTime = formatDate(currentDateTime) + ' ' + formatTime(currentDateTime);

        // Set the formatted date and time in the input field
        $(this).val(formattedDateTime);
    });

    // Function to format the date as "MM/DD/YYYY"
    function formatDate(date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
    }

    // Function to format the time in 12-hour format
    function formatTime(date) {
        var hours = date.getHours() % 12 || 12; // Ensure 12-hour format
        var minutes = date.getMinutes();
        var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    }
});






