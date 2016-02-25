// The users directly send jobs different clusters,
// each cluster works independent, which shows that the load on the different clusters
// is in imbalance.
//
// In javascript:
// - The users send inactive jobs to CE
//   - create_job, the extra argument compared to the cluster is the cluster_id
// - As soon as a job arrives in the CE queue it is activated
//   - add_to_queue
// - Each worker nodes polls for active jobs in the CE queue and processes it
//   - process_jobs (get_user, get_job)
//
// Generic functions:
// - update_queue: Updates the queue of jobs 
var height = 50;
var UserX = 100;
var ComputerX = 250;
var QueueX = 0;

var UserPositions = [[UserX,height], [UserX,height+1.5*icon_size]];
// x,y,scale
var Clusters = [
    {pos: [1000, 150],
     scale: 0.5,
     queued_jobs: []},
    {pos: [500,350],
     scale: 0.5,
     queued_jobs: []},
    {pos: [300,425],
     scale: 0.5,
     queued_jobs: []},
    {pos: [700,250],
     scale: 0.5,
     queued_jobs: []}
];
var PilotJobSystem = [
    {pos: [750, 50],
     scale: 0.5,
     queued_jobs: []
    }
];

//UserPositions = [[UserX,height]];
var StoragePosition = [[0.75*icon_size,3.25*icon_size]];
var QueuePosition = [[QueueX,0.75*icon_size]];
var ComputerPositions = [];
for (i=0; i<4; ++i) ComputerPositions.push([ComputerX, (i+0.5)*icon_size]);

// Number of jobs processed for the given user
var UserJobCount = [];

function create_job(user_id, cluster_id) {
    user_id = user_id || 0;
    cluster_id = cluster_id || 0;

    var jobs = Clusters[cluster_id]["svg"].select("#submitted_jobs");
    var job = jobs.append("image");
    job.user_id = user_id;
    add_to_queue(cluster_id, job);

    job
	.attr("xlink:href", (user_id==0?"img/envelope-yellow.png":"img/envelope-blue.png"))
        .attr("x", (UserPositions[user_id][0] - Clusters[cluster_id]["pos"][0])/Clusters[cluster_id]["scale"] )
	.attr("y", (UserPositions[user_id][1] - Clusters[cluster_id]["pos"][1])/Clusters[cluster_id]["scale"] )
	.attr("height", icon_size)
	.attr("width", icon_size)
	.attr("opacity", 0.0)

        .transition()
        .duration(250)
		.attr("opacity", 1.0)

        .transition()
        .duration(1000)
        .attr("x", QueueX - icon_size - 10 * Clusters[cluster_id]["queued_jobs"].length )
        .attr("y", height - 0.25*icon_size)
        .each("end", function() { job.active = true; });
}

function add_to_queue(cluster_id, job) {
    job.active = false;
    Clusters[cluster_id]["queued_jobs"].push(job);

    update_queue();
}

function update_queue() {
    for (cluster_id in Clusters) {
        for (i in Clusters[cluster_id]["queued_jobs"]) {
            var job = Clusters[cluster_id]["queued_jobs"][i];
            if (job.active) {
                job
                    .transition()
                    .duration(500)
                    .attr("x", QueueX - icon_size - 10 * i )
                    .attr("y", height - 0.25*icon_size );
            }
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
function get_job(cluster_id, user) {
    for (i in Clusters[cluster_id]["queued_jobs"]) {
        job = Clusters[cluster_id]["queued_jobs"][i];
        if ((job.user_id == user) && job.active)
            return i;
    }
    return -1;
}
function process_jobs(cluster_id, computer_id) {
    if (Clusters[cluster_id]["queued_jobs"].length > 0) {
        var user = get_user(-1);
        while (user >= 0) {
            var job_id = get_job(cluster_id, user);
            if (job_id >= 0) {
                UserJobCount[user] += 1;
                $("#Paul").html(UserJobCount[0]);
                $("#Tijs").html(UserJobCount[1]);

                var job = Clusters[cluster_id]["queued_jobs"][job_id];
                Clusters[cluster_id]["queued_jobs"].splice(job_id, 1);
                update_queue();

                job
                    .transition()
                    .duration(1000)
                    .attr("x", ComputerPositions[computer_id][0]-.75*icon_size )
                    .attr("y", ComputerPositions[computer_id][1]-.25*icon_size )
                
                    .transition()
                    .duration(2000 + Math.random() * 500)
                
                    .transition()
                    .duration(500)
	            .attr("opacity", 0.0)
                
                    .remove()
                    .each("end", function() { process_jobs(cluster_id, computer_id); });
                return;
            }
            user = get_user(user);
        }
    }

    setTimeout(process_jobs, 200, cluster_id, computer_id);
}

function add_cluster(i) {
    pos = Clusters[i]["pos"];
    scale = Clusters[i]["scale"];

    svg = d3.select("svg");

	// Create the cluster and move it to the right position
    cluster = svg.append("g")
    cluster
        .attr("transform", "translate("+Clusters[0]["pos"][0]+","+Clusters[0]["pos"][1]+")");
    cluster.transition().duration(5000)
        .attr("transform", "translate("+pos[0]+","+pos[1]+"),scale("+scale+")");

    Clusters[i]["svg"] = cluster;

    cluster.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("rx", icon_size/5.0)
        .attr("ry", icon_size/5.0)
        .attr("width", .75*icon_size + (ComputerX - QueueX))
        .attr("height", (ComputerPositions.length) * icon_size)
        .attr("style", "fill:none;stroke:black;stroke-width:5;opacity:0.5");
    cluster.append("g").attr("id", "queue");
    cluster.append("g").attr("id", "computers");
    cluster.append("g").attr("id", "storage");
    cluster.append("g").attr("id", "submitted_jobs");

    add_icons(cluster.select("#computers"), "img/computer.png", ComputerPositions, "WN");
    add_icons(cluster.select("#queue"), "img/computer.png", QueuePosition, "CE");
    add_icons(cluster.select("#storage"), "img/computer.png", StoragePosition, "SE");

    return cluster;
}

function main() {
	// Set the number of processed jobs to zero for all users.
    for (var i in UserPositions)
        UserJobCount.push(0);
    
	// Create the HTML objects
    svg = d3.select("#viz")
	  .append("svg")
	  .attr("width", "100%")
	  .attr("height", "100%");
    svg.append("g").attr("id", "users");

	// Add two users
    add_icon(d3.select("#users"), "img/user-computer-yellow.png", UserPositions[0][0], UserPositions[0][1])
        .on("click", function(d,i) { create_job(0) });
    add_icon(d3.select("#users"), "img/user-computer-blue.png", UserPositions[1][0], UserPositions[1][1])
        .on("click", function(d,i) { create_job(1) });

	// Create the clusters and move them to the right position
    for (cluster_id in Clusters) {
        cluster = add_cluster(cluster_id);
        for (computer_id in ComputerPositions) {
			// Start the processing of jobs for every node in the cluster
            setTimeout(process_jobs, 5000 * Math.random(), cluster_id, computer_id);
        }
    }

    // Create jobs
    for (var i=0; i<500; i+=1) {
        user_id = (Math.random() < 0.75? 0: 1);
        cluster_id = Math.floor(Math.sqrt(Math.random())*(Clusters.length));
        setTimeout(create_job, 7500+ 200*(i-Math.cos(i/1000)*Math.random()), user_id, cluster_id);
    }
}
