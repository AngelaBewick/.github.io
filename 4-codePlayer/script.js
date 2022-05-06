/*

buttons toggle view

*/
$("#html-btn").click(function () {
  if ($("#html-div").css("display") == "none") {
    $("#html-div").fadeIn();
    $("#html-btn").addClass("active");
  } else {
    $("#html-div").fadeOut();
    $("#html-btn").removeClass("active");
  }
});
$("#css-btn").click(function () {
  if ($("#css-div").css("display") == "none") {
    $("#css-div").fadeIn();
    $("#css-btn").addClass("active");
  } else {
    $("#css-div").fadeOut();
    $("#css-btn").removeClass("active");
  }
});
$("#js-btn").click(function () {
  if ($("#js-div").css("display") == "none") {
    $("#js-div").fadeIn();
    $("#js-btn").addClass("active");
  } else {
    $("#js-div").fadeOut();
    $("#js-btn").removeClass("active");
  }
});
$("#output-btn").click(function () {
  if ($("#output-div").css("display") == "none") {
    $("#output-div").fadeIn();
    $("#output-btn").addClass("active");
  } else {
    $("#output-div").fadeOut();
    $("#output-btn").removeClass("active");
  }
});
/*

textarea input displayed in output div

*/
// $("#html").keypress(function (e) {
//   if (e.key === "Enter") {
//     console.log($("#html").val());
//     $("#output").html($("#html").val());
//   }
// });

// $("textarea").on("change keyup paste", function () {
//   $("iframe")
//     .contents()
//     .find("html")
//     .html(
//       `<html><head><style type="text/css" >${$(
//         "#css"
//       ).val()}</style></head><body>${$("#html").val()} </body></html>`
//     );
//   document.getElementById("output").contentWindow.eval($("#js").val());
// });

$("textarea").keypress(function (e) {
  if (e.key === "Enter") {
    $("iframe")
      .contents()
      .find("html")
      .html(
        `<html><head><style type="text/css" >${$(
          "#css"
        ).val()}</style></head><body>${$("#html").val()} </body></html>`
      );
    document.getElementById("output").contentWindow.eval($("#js").val());
  }
});
