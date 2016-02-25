// The users send jobs to the computing element node, 
// which distributes the work over the worker nodes.
//
// In javascript:
// - The users send inactive jobs to CE
//   - create_job
// - As soon as a job arrives in the CE queue it is activated
//   - add_to_queue
// - Each worker nodes polls for active jobs in the CE queue and processes it
//   - process_jobs (get_user, get_job)
//
// Generic functions:
// - update_queue: Updates the queue of jobs 

var height = 100;
var UserX = 100;
var ComputerX = 1000;
var QueueX = 750;

var DelayBeforeSendingJobs = 10000; // Milliseconds

var UserPositions = [[UserX,height], [UserX,height+1.5*icon_size]];
//UserPositions = [[UserX,height]];
var StoragePosition = [[QueueX+0.75*icon_size,height+3*icon_size]];
var QueuePosition = [[QueueX,height]];
var ComputerPositions = [[ComputerX,height], [ComputerX,height+100], [ComputerX,height+200], [ComputerX,height+300]];

var queued_jobs = [];
var UserJobCount = [];

// Create a job for the given user
function create_job(user_id) {
    user_id = user_id || 0;

    var jobs = d3.select("#submitted_jobs");
    var job = jobs.append("image");
    job.user_id = user_id;
    add_to_queue(job);

    job
	.attr("xlink:href", (user_id==0?"img/envelope-yellow.png":"img/envelope-blue.png"))
        .attr("x", UserPositions[user_id][0] )
	.attr("y", UserPositions[user_id][1] )
	.attr("height", icon_size)
	.attr("width", icon_size)
	.attr("opacity", 0.0)

        .transition()
        .duration(250)
	.attr("opacity", 1.0)

        .transition()
        .duration(1000)
        .attr("x", QueueX - icon_size - 10 * queued_jobs.length )
        .attr("y", height - 0.25*icon_size)
        .each("end", function() { job.active = true; });
}

function add_to_queue(job) {
    job.active = false;
    queued_jobs.push(job);

    update_queue();
}

function update_queue() {
    for (i in queued_jobs) {
        var job = queued_jobs[i];
        if (job.active) {
            job
                .transition()
                .duration(500)
                .attr("x", QueueX - icon_size - 10 * i )
                .attr("y", height - 0.25*icon_size );
        }
    }
}

function get_user(prev_user) {
    var new_user = -1;
    var prev_job_count = (prev_user<0 ? -1 : UserJobCount[prev_user]);

    for (var user in UserJobCount) {
        if ((UserJobCount[user] < prev_job_count) ||
            ((UserJobCount[user] == prev_job_count) && (user <= prev_user))) {
            // continue;
        } else if (new_user < 0) {
            new_user = user;
        } else if (UserJobCount[user] < UserJobCount[new_user]) {
            new_user = user;
        } else {
        }
    }
    return new_user;
}
function get_job(user) {
    for (i in queued_jobs) {
        if ((queued_jobs[i].user_id == user) && queued_jobs[i].active)
            return i;
    }
    return -1;
}
// Event loop for a worker node.
// Check whether there are active jobs that can be processed
// Does a bit of simple fair-scheduling
function process_jobs(computer_nr) {
    if (queued_jobs.length > 0) {
        var user = get_user(-1);
        while (user >= 0) {
            var job_id = get_job(user);
            if (job_id >= 0) {
                UserJobCount[user] += 1;

                var job = queued_jobs[job_id];
                queued_jobs.splice(job_id, 1);
                update_queue();

                job
                    .transition()
                    .duration(1000)
                    .attr("x", ComputerPositions[computer_nr][0]-.75*icon_size )
                    .attr("y", ComputerPositions[computer_nr][1]-.25*icon_size )
                
                    .transition()
                    .duration(2000 + Math.random() * 500)
                
                    .transition()
                    .duration(500)
	            .attr("opacity", 0.0)
                
                    .remove()
                    .each("end", function() { process_jobs(computer_nr); });
                return;
            }
            user = get_user(user);
        }
    }

    setTimeout(process_jobs, 200, computer_nr);
}

function main() {
    for (var i in UserPositions)
        UserJobCount.push(0);
    
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


    add_icon(d3.select("#users"), "img/user-computer-yellow.png", UserPositions[0][0], UserPositions[0][1])
        .on("click", function(d,i) { create_job(i) });
    add_icon(d3.select("#users"), "img/user-computer-blue.png", UserPositions[1][0], UserPositions[1][1])
        .on("click", function(d,i) { create_job(i) });

    add_icons(d3.select("#computers"), "img/computer.png", ComputerPositions, "WN");
    add_icons(d3.select("#queue"), "img/computer.png", QueuePosition, "CE");
    add_icons(d3.select("#storage"), "img/computer.png", StoragePosition, "SE");

	// Create 25 jobs for user 0
    for (var i=0; i<25; i+=1)
        setTimeout(create_job, DelayBeforeSendingJobs+250*i, 0);
	// Create 1 job for user 1
    setTimeout(create_job, DelayBeforeSendingJobs+2500, 1);

	// Start polling for every worker node.
    for (var i in ComputerPositions)
        process_jobs(i);
}
