var icon_size = 100;
var envelope_size = 100;

function add_icon(group, url, x,y, label) {
    var result = group.append("image")
	.attr("xlink:href", url)
	.attr("x", x-icon_size/2)
	.attr("y", y-icon_size/2)
	.attr("height", icon_size)
	.attr("width", icon_size);

    if (label) {
        group.append("text")
            .attr("x", x )
	    .attr("y", y )
            .attr("text-anchor", "middle")
            .attr("class", "label")
            .text(label);
    }
    return result;
}
function add_icons(group, url, positions, label) {
    var icons = group.selectAll("image")
        .data(positions);
    // *********
    icons
        .enter()
        .append("image")
	.attr("xlink:href", url)
        .attr("x", function(d, i) { return d[0]-icon_size/2; } )
	.attr("y", function(d, i) { return d[1]-icon_size/2; } )
	.attr("height", icon_size)
	.attr("width", icon_size);
    // *********
    icons
        .exit()
        .remove();

    var labels = group.selectAll("text")
        .data(positions);
    // *********
    labels
        .enter()
        .append("text")
        .attr("x", function(d, i) { return d[0]; } )
	.attr("y", function(d, i) { return d[1]; } )
        .attr("text-anchor", "middle")
        .attr("class", "label")
        .text(label);

    return icons;
}
function d3_enter(obj, url, pos) {
    return obj.enter().append("image")
        .attr("xlink:href", url)
	.attr("x", pos[0]-icon_size/2)
	.attr("y", pos[1]-icon_size/2)
	.attr("height", icon_size)
	.attr("width", icon_size);
}
function d3_transition(obj, t) {
    return obj.transition()
        .duration(t);
}
function d3_exit(obj) {
    return obj.exit()
        .remove();
}