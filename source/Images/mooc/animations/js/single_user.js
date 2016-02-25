// The users send jobs to the available computers in a round robin way

// vertical center around which the icons are arranged
var height = 400;
// horizontal position of the user icons
var user_x = 100;
// horizontal position of the computer icons
var computer_x = 1000;

var user_positions = [[user_x,height]];
var computer_positions = [[computer_x,height], [computer_x,height], [computer_x,height]];
var svg, users, computers, envelopes;

// The current iteration of the animation.
// It is incremented every time the animation starts or stops
var current_transition = 0;
// The last computer to which a job was sent
var last_computer = 0;
function modify_transition(enabled) {
    current_transition++;
    if (enabled) start_transition();
    else current_transition = -1;
}
// Start sending jobs
function start_transition() {
    var users = 1.0 * user_positions.length;
    for (var user=0; user<users; ++user)
        for (var i=0; i<5; ++i)
            setTimeout(add_envelope, ((i+user/users)*250), user, current_transition);
}
// Switch between one and two users
function set_multiple_users(enabled) {
    transition_was_enabled = current_transition >= 0;
    modify_transition(false);

    if (enabled) {
        var n_users = 2;
        user_positions = [];
        for (var i=0; i<n_users; ++i)
            user_positions.push([user_x, height+icon_size*(i-(n_users-1)/2)]);
    } else {
        user_positions = [[user_x,height]];
    }
    
    var u = users.selectAll("image")
        .data(user_positions);
    u	// Definition for the creation of new users
        .enter().append("image")
		.attr({
			"xlink:href": function(d, i) { if (i==0) { return "img/user-computer-yellow.png"; } else { return "img/user-computer-blue.png"; } },
			"x": user_x-icon_size/2,
			"y": height-icon_size/2,
			"height": icon_size,
			"width": icon_size
		})
    u	// Move the user to the right position
        .transition()
		.attr("opacity", 1.0)
        .attr("x", function(d, i) { return d[0]-icon_size/2; } )
		.attr("y", function(d, i) { return d[1]-icon_size/2; } )
        .each("end", function() {modify_transition(transition_was_enabled);} )
    u	// What to do when a user is removed
        .exit()
        .remove();


}
// Switch between one and multiple computers
function set_multiple_computers(enabled) {
	// The computers are always present, but might be on the same position
    for (i=0; i<computer_positions.length; ++i)
        computer_positions[i][1] = height+enabled*(icon_size*(i+.5-computer_positions.length/2.));

	// Update the position of the computers
    computers.selectAll("image")
        .transition()
        .duration(1000)
        .attr("x", function(d, i) { return d[0]-icon_size/2; } )
		.attr("y", function(d, i) { return d[1]-icon_size/2; } );
}

// Create a new job
function add_envelope(user, trans) {
    if (trans != current_transition) return;
    if (user >= user_positions.length) return;

    last_computer = (last_computer+1)%computer_positions.length;
    var url = "img/envelope-blue.png";
    if (user == 0) url = "img/envelope-yellow.png";
    icon = add_icon(envelopes, url, user_positions[user][0]+icon_size/2, user_positions[user][1]);
	icon
	.attr("opacity", "0.0")
    
	.transition()
    .duration(500)    
	.attr("opacity", 1.0)
    
	.transition()
	.duration(1000)    
	.attr("x", computer_positions[last_computer][0]-icon_size/2-icon_size/2)
	.attr("y", computer_positions[last_computer][1]-icon_size/2)
    
	.transition()
	.duration(500)    
        .each("end", function() { add_envelope(user, trans); } )
        .attr("opacity", 0.0)
    
	.remove();

    return icon;
}

function main() {
    // This is the render area
    svg = d3.select("#viz")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "100%");
    // Add three groups to store all users, computers and jobs (envelopes)
    users = svg.append("g").attr("id", "users");
    computers = svg.append("g").attr("id", "computers");
    envelopes = svg.append("g").attr("id", "envelopes");

    // Add the initial icons
    add_icons(users, "img/user-computer-yellow.png", user_positions);
    add_icons(computers, "img/computer.png", computer_positions);

    //set_multiple_users(true);
    //set_multiple_computers(true);

    start_transition();
}
