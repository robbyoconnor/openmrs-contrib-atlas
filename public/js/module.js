$(function () {
  $("#map_canvas").on("click", "#me-button", function(e) {
    e.preventDefault();
    var id = $(this).val();
    var site = sites[id].siteData;
    var auth = {
      site: site.uuid,
      token: module
    }
    var json = JSON.stringify(auth);
    $.ajax({
      url: "module/auth?uuid=" + module,
      type: "POST",
      data: json,
      dataType: "text",
    })
    .done(function(response) {
      site.module = 1;
      site_module = 1;
      sites[id].siteData = site;
      sites[id].infowindow.setContent(contentInfowindow(site));
      repaintMarkers();
      bootbox.alert('The module is now linked to ' + site.name);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      bootbox.alert( "Error saving your marker - Please try again ! - " + jqXHR.statusText );
    });
  });
  $("#map_canvas").on("click", "#detach-button", function(e) {
    e.preventDefault();
    var id = $(this).val();
    var site = sites[id].siteData;
    $.ajax({
      url: "module/auth?uuid=" + module,
      type: "DELETE",
      dataType: "text",
    })
    .done(function(response) {
      site.module = 0;
      site_module = 0;
      sites[id].siteData = site;
      sites[id].infowindow.setContent(contentInfowindow(site));
      repaintMarkers();
      bootbox.alert("Authorization delete");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      bootbox.alert( "Error deleting authorization - Please try again ! - " + jqXHR.statusText );
    });
  });
});

function openBubble(uniqueMarker) {
  if (uniqueMarker !== null)
    google.maps.event.trigger(uniqueMarker, 'click');
}