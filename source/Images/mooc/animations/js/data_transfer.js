// Show how the data transfer to a cluster works
//
// 1. Move data to the storage element (send_data)
// 2. Create a job and move it to a worker node (send_job)
// 3. Draw a line to the data (process_job)
// 4. Move that data and the line to the worker node (get_data)
// 5. If the job is finished, move the data to the SE
//    Move the job via the CE back to the user
//    (job_finished)
// 6. Draw a line from the user to the SE to show that he gets the data
//    Move the data from the SE to the user
//    (get_user_data)

var height = 100;
var UserX = 100;
var ComputerX = 1000;
var QueueX = 750;

var UserPositions = [[UserX,height], [UserX,height+1.5*icon_size]];
//UserPositions = [[UserX,height]];
var StoragePosition = [[QueueX+0.75*icon_size,height+3*icon_size]];
var QueuePosition = [[QueueX,height]];
var ComputerPositions = [[ComputerX,height], [ComputerX,height+100], [ComputerX,height+200], [ComputerX,height+300]];

var WorkerPos = [ComputerPositions[2][0]-icon_size/2,ComputerPositions[2][1]-icon_size/2];

var data;
var job;

function send_data() {
    data = add_icon(svg.select("#data"), "img/disk-blue.png", UserPositions[0][0], UserPositions[0][1]);
    data
		.transition()
        .duration(1000)
        .attr("x", StoragePosition[0][0])
        .attr("y", StoragePosition[0][1])
        .each("end", send_job);
}
function send_job() {
    job = add_icon(svg, "img/envelope-blue.png", UserPositions[0][0], UserPositions[0][1]);
	job
        .transition()
        .duration(1000)
        .attr("x", QueuePosition[0][0])
        .attr("y", QueuePosition[0][1])
		.transition()
		.delay(1500)
        .duration(1000)
        .attr("x", WorkerPos[0])
        .attr("y", WorkerPos[1])
        .each("end", process_job);
}
function process_job() {
    var result = svg.append("line")
		.attr("stroke","green")
		.attr("stroke-width", 3)
		.attr("x1", WorkerPos[0]+icon_size/2)
		.attr("y1", WorkerPos[1]+icon_size/2)
		.attr("x2", WorkerPos[0]+icon_size/2)
		.attr("y2", WorkerPos[1]+icon_size/2)
		.transition()
		.duration(1000)
		.attr("x2", StoragePosition[0][0]+icon_size/2)
		.attr("y2", StoragePosition[0][1]+icon_size/2)
        .each("end", get_data);
}
function get_data() {
	svg.selectAll("line")
		.transition()
		.duration(1000)
		.attr("x2", WorkerPos[0]+icon_size/2)
		.attr("y2", WorkerPos[1]+icon_size/2)
		.remove();

	data
		.transition()
		.duration(1000)
		.attr("x", WorkerPos[0])
		.attr("y", WorkerPos[1])
		
		.transition()
		.duration(2000)
        .each("end", job_finished);
}

function job_finished() {
	data
		.attr("opacity", 1.0)
		.transition()
		.duration(1000)
		.attr("opacity", 0.5)

		.transition()
		.delay(1000)
		.duration(1000)
		.attr("x", StoragePosition[0][0])
		.attr("y", StoragePosition[0][1]);
	job
		.attr("opacity", 1.0)
		.transition()
		.duration(1000)
		.attr("opacity", 0.5)

		.transition()
		.delay(1500)
		.duration(1000)
		.attr("x", QueuePosition[0][0])
		.attr("y", QueuePosition[0][1])

		.transition()
		.delay(2500)
		.duration(1000)
		.attr("x", UserPositions[0][0])
		.attr("y", UserPositions[0][1])
		.each("end", user_get_data);
}
function user_get_data() {
    var result = svg.append("line")
		.attr("stroke","green")
		.attr("stroke-width", 3)
		.attr("x1", UserPositions[0][0]+icon_size/2)
		.attr("y1", UserPositions[0][1]+icon_size/2)
		.attr("x2", UserPositions[0][0]+icon_size/2)
		.attr("y2", UserPositions[0][1]+icon_size/2)

		.transition()
		.duration(1000)
		.attr("x2", StoragePosition[0][0]+icon_size/2)
		.attr("y2", StoragePosition[0][1]+icon_size/2)

		.transition()
		.delay(1000)
		.duration(1000)
		.attr("x2", UserPositions[0][0]+icon_size/2)
		.attr("y2", UserPositions[0][1]+icon_size/2)
		.remove();

	data
		.transition()
		.delay(1000)
		.duration(1000)
		.attr("x", UserPositions[0][0])
		.attr("y", UserPositions[0][1]);

	job
		.transition()
		.delay(2000)
		.remove();
}
function main() {
    svg = d3.select("#viz")
		.append("svg")
		.attr("width", "100%")
		.attr("height", "100%");
    svg.append("rect")
        .attr("x", QueueX)
        .attr("y", height - icon_size * .5)
        .attr("rx", icon_size/5.0)
        .attr("ry", icon_size/5.0)
        .attr("width", .75*icon_size + (ComputerX - QueueX))
        .attr("height", (ComputerPositions.length) * icon_size)
        .attr("style", "fill:none;stroke:black;stroke-width:5;opacity:0.5");
    svg.append("g").attr("id", "users");
    svg.append("g").attr("id", "queue");
    svg.append("g").attr("id", "computers");
    svg.append("g").attr("id", "storage");
    svg.append("g").attr("id", "submitted_jobs");
    svg.append("g").attr("id", "data");


    add_icon(d3.select("#users"), "img/user-computer-yellow.png", UserPositions[0][0], UserPositions[0][1])
        .on("click", function(d,i) { create_job(i) });

    add_icons(d3.select("#computers"), "img/computer.png", ComputerPositions, "WN");
    add_icons(d3.select("#queue"), "img/computer.png", QueuePosition, "CE");
    add_icons(d3.select("#storage"), "img/database.png", StoragePosition, "SE");
	
    send_data();
}
