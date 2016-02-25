// The users send jobs to the available computers in a round robin way

// vertical center around which the icons are arranged
var height = 100;
// horizontal position of the user icons
var user_x = 100;
// horizontal position of the computer icons
var computer_x = 1000;
var ComputerX = 250;
var QueueX = 0;

var user_position = [user_x,height];
var wfms_position = [user_position[0], user_position[1]+250];
var computer_positions = [[computer_x,height], [computer_x,height], [computer_x,height]];
var svg, user, workflow, wfms, grid;

// The current iteration of the animation.
// It is incremented every time the animation starts or stops
var current_transition = 0;
// The last computer to which a job was sent
var last_computer = 0;

var Clusters = [
    {pos: [800, 150],
     scale: 1.0,
     queued_jobs: []},
];
var WorkflowInstances = [];
for (i=0; i<4; ++i) WorkflowInstances.push(
    {
        pos: [wfms_position[0]+icon_size/4, wfms_position[1]+(1+i)*icon_size/2],
        scale: 0.4
    });

var StoragePosition = [[0.75*icon_size,3.25*icon_size]];
var QueuePosition = [[QueueX,0.75*icon_size]];
var ComputerPositions = [];
for (i=0; i<4; ++i) ComputerPositions.push([ComputerX, (i+0.5)*icon_size]);


function add_cluster(i) {
    pos = Clusters[i]["pos"];
    scale = Clusters[i]["scale"];

    svg = d3.select("svg");

    // Create the cluster and move it to the right position
    cluster = svg.append("g")
    cluster
        .attr("transform", "translate("+pos[0]+","+pos[1]+"),scale("+scale+")");

    Clusters[i]["svg"] = cluster;

    cluster.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("rx", icon_size/5.0)
        .attr("ry", icon_size/5.0)
        .attr("width", .75*icon_size + (ComputerX - QueueX))
        .attr("height", (ComputerPositions.length) * icon_size)
        .attr("style", "fill:none;stroke:black;stroke-width:5");
    cluster.append("g").attr("id", "queue");
    cluster.append("g").attr("id", "computers");
    cluster.append("g").attr("id", "storage");
    cluster.append("g").attr("id", "submitted_jobs");

    add_icons(cluster.select("#computers"), "img/computer.png", ComputerPositions, "WN");
    add_icons(cluster.select("#queue"), "img/computer.png", QueuePosition, "CE");
    add_icons(cluster.select("#storage"), "img/computer.png", StoragePosition, "SE");

    return cluster;
}

function add_circle(group, pos) {
    scale = 0.55
    result = group.append("circle");
    result
        .attr("cx", pos[0])
        .attr("cy", pos[1])
        .attr("r", scale/2*icon_size)
        .attr("style", "fill:#b0c4de;stroke:black;stroke-width:5");
    return result;
 }
function add_rectangle(group, pos) {
    scale = 0.55
    result = group.append("rect");
    result
        .attr("x", pos[0]-scale/2*icon_size)
        .attr("y", pos[1]-scale/2*icon_size)
        .attr("width", scale*icon_size)
        .attr("height", scale*icon_size)
        .attr("style", "fill:#b0c4de;stroke:black;stroke-width:5");
    return result;
 }
function add_triangle(group, pos) {
    scale = 0.55
    result = group.append("polygon");
    pts = [pos[0]+0,
           pos[1]-scale/2*icon_size,
           pos[0]-scale/2*icon_size,
           pos[1]+scale/2*icon_size,
           pos[0]+scale/2*icon_size,
           pos[1]+scale/2*icon_size];
    result
        .attr("x", pos[0]-scale/2*icon_size)
        .attr("y", pos[1]-scale/2*icon_size)
        .attr("points", pts
             )
        .attr("style", "fill:#b0c4de;stroke:black;stroke-width:5");
    return result;
 }

function add_workflow() {
    group = workflow.append("g");
    group
        .attr("transform", "translate("+200+","+height+"),scale("+1.0+")");
    group.append("rect")
        .attr("x", -icon_size)
        .attr("y", -icon_size)
        .attr("rx", icon_size/5.0)
        .attr("ry", icon_size/5.0)
        .attr("width", 10*icon_size)
        .attr("height", 2 * icon_size)
        .attr("style", "fill:none;stroke:black;stroke-width:5")
        .attr("transform", "scale(0.5)");
    group.append("line")
        .attr({x1:0,y1:0,x2:4*icon_size, y2:0})
	.attr("stroke","green")
	.attr("stroke-width", 3);
    add_circle   (group, [0*icon_size,0]);
    add_rectangle(group, [1*icon_size,0]);
    add_circle   (group, [2*icon_size,0]);
    add_rectangle(group, [3*icon_size,0]);
    add_triangle (group, [4*icon_size,0]);

    return group;
}

function create_job(workflow_inst, i) {
    workflow_inst
        .transition()
        .duration(1000)
        .attr("transform", "translate("+WorkflowInstances[i].pos[0]+","+WorkflowInstances[i].pos[1]+"),scale("+WorkflowInstances[i].scale+")")
        .transition()
        .delay(3000)
        .each("end", function() { start_first_job(workflow_inst); });
    
    job_pos = [0,0];
    job_pos[0] = WorkflowInstances[workflow_inst.id].pos[0];
    job_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];

    scale = WorkflowInstances[workflow_inst.id].scale;
    workflow_inst.data = [[],[],[]];
    workflow_inst.data[0][0] = add_icon(svg, (workflow_inst.id?"img/disk-blue.png":"img/disk-green.png"), user_position[0], user_position[1]);
    workflow_inst.data[0][0]
        .transition()
        .delay(1000)
	.duration(1000)
	.attr("x", job_pos[0]-icon_size*scale/2)
	.attr("y", job_pos[1]-icon_size*scale/2)
        .attr({height:icon_size*scale, width: icon_size*scale});
}
function start_first_job(workflow_inst) {

    workflow_inst
        .transition()
        .delay(1000)
	.each("end", function() { first_job_active(workflow_inst); });
}

function first_job_active(workflow_inst) {
    wn_id = Math.floor((Math.random()*ComputerPositions.length));

    wn_pos = [0,0];
    wn_pos[0] = Clusters[0]["pos"][0]+Clusters[0]["scale"]*ComputerPositions[wn_id][0];
    wn_pos[1] = Clusters[0]["pos"][1]+Clusters[0]["scale"]*ComputerPositions[wn_id][1];

    ce_pos = [0,0];
    ce_pos[0] = Clusters[0]["pos"][0]+Clusters[0]["scale"]*QueuePosition[0][0];
    ce_pos[1] = Clusters[0]["pos"][1]+Clusters[0]["scale"]*QueuePosition[0][1];

    job_pos = [0,0];
    job_pos[0] = WorkflowInstances[workflow_inst.id].pos[0]+WorkflowInstances[0].scale*icon_size;
    job_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];

    scale = WorkflowInstances[workflow_inst.id].scale;
    add_icon(svg, "img/envelope-yellow.png", job_pos[0] + (1-scale)/2*icon_size, job_pos[1] + (1-scale)/2*icon_size)
        .attr({height:icon_size*scale, width: icon_size*scale});

    job = add_icon(svg, "img/envelope-yellow.png", job_pos[0] + (1-scale)/2*icon_size, job_pos[1] + (1-scale)/2*icon_size);
    job
        .attr({height:icon_size*scale, width: icon_size*scale})
        .transition()
        .delay(1000)
	.duration(1000)
	.attr("x", ce_pos[0]-icon_size/2)
	.attr("y", ce_pos[1]-icon_size/2)
        .attr("transform", "scale("+1+")")
        .attr({height:icon_size, width: icon_size})
        .transition()
        .delay(2000)
	.duration(1000)
	.attr("x", wn_pos[0]-icon_size/2)
	.attr("y", wn_pos[1]-icon_size/2)
	.each("end", function() { get_first_data(workflow_inst, job, wn_id); });
}

function get_first_data(workflow_inst, job, wn_id) {
    wn_pos = [0,0];
    wn_pos[0] = Clusters[0]["pos"][0] + Clusters[0]["scale"]*ComputerPositions[wn_id][0];
    wn_pos[1] = Clusters[0]["pos"][1] + Clusters[0]["scale"]*ComputerPositions[wn_id][1];

    data_pos = [0,0];
    data_pos[0] = WorkflowInstances[workflow_inst.id].pos[0];
    data_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];
    
    scale = WorkflowInstances[workflow_inst.id].scale;
    workflow_inst.data[0][1] = add_icon(svg, (workflow_inst.id?"img/disk-blue.png":"img/disk-green.png"), data_pos[0], data_pos[1]);
    workflow_inst.data[0][1]
        .attr({x:data_pos[0]-icon_size*scale/2, y:data_pos[1]-icon_size*scale/2})
        .attr({height:icon_size*scale, width: icon_size*scale})
        .transition()
        .delay(2000)
	.duration(1000)
	.attr("x", wn_pos[0]-icon_size/2)
	.attr("y", wn_pos[1]-icon_size/2)
        .attr("transform", "scale("+1+")")
        .attr({height:icon_size, width: icon_size})
        .each("end", function() { return_first_data(workflow_inst, wn_id); });

    job.transition()
        .delay(4000)
	.remove();
}
function return_first_data(workflow_inst, wn_id) {
    wn_pos = [0,0];
    wn_pos[0] = Clusters[0]["pos"][0] + Clusters[0]["scale"]*ComputerPositions[wn_id][0];
    wn_pos[1] = Clusters[0]["pos"][1] + Clusters[0]["scale"]*ComputerPositions[wn_id][1];

    data_pos = [0,0];
    data_pos[0] = WorkflowInstances[workflow_inst.id].pos[0]+2*WorkflowInstances[workflow_inst.id].scale*icon_size;
    data_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];
    
    scale = WorkflowInstances[workflow_inst.id].scale;
    workflow_inst.data[0][1]
        .transition()
        .delay(1000)
	.duration(1000)
        .attr({height:icon_size*scale, width: icon_size*scale})
	.attr("x", data_pos[0]-icon_size*scale/2)
	.attr("y", data_pos[1]-icon_size*scale/2)
        .each("end", function() { start_second_job(workflow_inst); } );
}

function start_second_job(workflow_inst) {
    workflow_inst
        .transition()
        .delay(1000)
	.each("end", function() { second_job_active(workflow_inst); });
}

function second_job_active(workflow_inst) {
    wn_id = Math.floor((Math.random()*ComputerPositions.length));

    wn_pos = [0,0];
    wn_pos[0] = Clusters[0]["pos"][0]+Clusters[0]["scale"]*ComputerPositions[wn_id][0];
    wn_pos[1] = Clusters[0]["pos"][1]+Clusters[0]["scale"]*ComputerPositions[wn_id][1];

    ce_pos = [0,0];
    ce_pos[0] = Clusters[0]["pos"][0]+Clusters[0]["scale"]*QueuePosition[0][0];
    ce_pos[1] = Clusters[0]["pos"][1]+Clusters[0]["scale"]*QueuePosition[0][1];

    job_pos = [0,0];
    job_pos[0] = WorkflowInstances[workflow_inst.id].pos[0]+3*WorkflowInstances[workflow_inst.id].scale*icon_size;
    job_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];
    
    scale = WorkflowInstances[workflow_inst.id].scale;
    add_icon(svg, "img/envelope-yellow.png", job_pos[0] + (1-scale)/2*icon_size, job_pos[1] + (1-scale)/2*icon_size)
        .attr({height:icon_size*scale, width: icon_size*scale});
    job = add_icon(svg, "img/envelope-yellow.png", job_pos[0] + (1-scale)/2*icon_size, job_pos[1] + (1-scale)/2*icon_size);
    job
        .attr({height:icon_size*scale, width: icon_size*scale})
        .transition()
        .delay(1000)
	.duration(1000)
	.attr("x", ce_pos[0]-icon_size/2)
	.attr("y", ce_pos[1]-icon_size/2)
        .attr("transform", "scale("+1+")")
        .attr({height:icon_size, width: icon_size})
        .transition()
        .delay(2000)
	.duration(1000)
	.attr("x", wn_pos[0]-icon_size/2)
	.attr("y", wn_pos[1]-icon_size/2)
	.each("end", function() { get_second_data(workflow_inst,job,wn_id); });
}

function get_second_data(workflow_inst, job, wn_id) {
    wn_pos = [0,0];
    wn_pos[0] = Clusters[0]["pos"][0] + Clusters[0]["scale"]*ComputerPositions[wn_id][0];
    wn_pos[1] = Clusters[0]["pos"][1] + Clusters[0]["scale"]*ComputerPositions[wn_id][1];

    data_pos = [0,0];
    data_pos[0] = WorkflowInstances[workflow_inst.id].pos[0]+2*WorkflowInstances[workflow_inst.id].scale*icon_size;
    data_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];
    
    scale = WorkflowInstances[workflow_inst.id].scale;
    workflow_inst.data[1][0] = add_icon(svg, (workflow_inst.id?"img/disk-blue.png":"img/disk-green.png"), data_pos[0] + (1-scale)/2*icon_size, data_pos[1] + (1-scale)/2*icon_size)
    workflow_inst.data[1][0]
        .attr({height:icon_size*scale, width: icon_size*scale})
        .transition()
        .delay(2000)
	.duration(1000)
	.attr("x", wn_pos[0]-icon_size/2)
	.attr("y", wn_pos[1]-icon_size/2)
        .attr("transform", "scale("+1+")")
        .attr({height:icon_size, width: icon_size})
        .each("end", function() { return_second_data(workflow_inst, wn_id); });

    job.transition()
        .delay(4000)
        .remove();
}
function return_second_data(workflow_inst, wn_id) {
    wn_pos = [0,0];
    wn_pos[0] = Clusters[0]["pos"][0] + Clusters[0]["scale"]*ComputerPositions[wn_id][0];
    wn_pos[1] = Clusters[0]["pos"][1] + Clusters[0]["scale"]*ComputerPositions[wn_id][1];

    data_pos = [0,0];
    data_pos[0] = WorkflowInstances[workflow_inst.id].pos[0]+4*WorkflowInstances[workflow_inst.id].scale*icon_size;
    data_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];
    
    scale = WorkflowInstances[workflow_inst.id].scale;
    workflow_inst.data[1][0]
        .transition()
        .delay(1000)
	.duration(1000)
        .attr({height:icon_size*scale, width: icon_size*scale})
	.attr("x", data_pos[0]-icon_size*scale/2)
	.attr("y", data_pos[1]-icon_size*scale/2)
        .each("end", function() { return_to_sender(workflow_inst); });
}

function return_to_sender(workflow_inst, disk) {
    workflow_inst.data[1][0]
	.attr("xlink:href", (workflow_inst.id?"img/disk-blue-checked.png":"img/disk-green-checked.png"))
        .transition()
        .delay(1000)
	.duration(1000)
        .attr({height:icon_size, width: icon_size})
	.attr("x", user_position[0]-icon_size/2)
	.attr("y", user_position[1]-icon_size/2)
        .transition()
        .delay(3000)
        .each("end", function() {
            add_icon(workflow_inst, "img/check.png", 5.25*icon_size, 0);
        })
        .remove();

    data_pos = [0,0];
    data_pos[0] = WorkflowInstances[workflow_inst.id].pos[0]+4*WorkflowInstances[workflow_inst.id].scale*icon_size;
    data_pos[1] = WorkflowInstances[workflow_inst.id].pos[1];

    scale = WorkflowInstances[workflow_inst.id].scale;

    disk = add_icon(svg, (workflow_inst.id?"img/disk-blue-checked.png":"img/disk-green-checked.png"), 100,100)
        .attr({height:icon_size*scale, width: icon_size*scale})
	.attr("x", data_pos[0]-icon_size*scale/2)
	.attr("y", data_pos[1]-icon_size*scale/2);
}


function main() {
    // This is the render area
    svg = d3.select("#viz")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "100%");

    // Add three groups to store all users, computesrl and jobs (envelopes)
    user = svg.append("g").attr("id", "user");
    wfms = svg.append("g").attr("id", "wfms");
    workflow = svg.append("g").attr("id", "workflow");
    grid = svg.append("g").attr("id", "grid");

    // Add the initial icons
    add_icon(user, "img/user-computer-yellow.png", user_position[0], user_position[1]);
    add_icon(wfms, "img/computer.png", wfms_position[0], wfms_position[1], "WFMS");
    add_cluster(0);
    workflow_definition = add_workflow();
    workflow_inst2 = add_workflow();
    workflow_inst2.id = 0;
    workflow_inst3 = add_workflow();
    workflow_inst3.id = 1;

    workflow_inst2
        .transition()
        .delay(2000)
	.each("end", function() { create_job(workflow_inst2,0); });

    setTimeout(function() {
        workflow_inst3
            .transition()
            .delay(3000)
	    .each("end", function() { create_job(workflow_inst3,1); }); }, 30000);
}

