// The users sends the jobs to a pool server node "P". This is supposed to be the real work
// Then the cluster jobs are created, which are directly sent to the clusters
// For every cluster job, the cluster checks whether there is a pilot job available on the pool server,
// which is then processed
// Very similar to the pilot_system.js
// 
// Data flow:
// - The user submits a job to pool server "P"
//   - create_pool_job (the jobs is pushed to PoolServer[0]["queued_jobs"][user])
//   - once the job arrives at the queue, it is activated
// - The user submits a job to the cluster
//   - create_cluster_job
// - The jobs are then pulled from the worker nodes
//   - process_jobs: check whether there are queued cluster jobs in the queue for the cluster
//   - process_pool_job
//     - check whether there is a pilot job (get_pool_job)
//     if a job is found:
//     start the animation:
//     - move the cluster job to the worker node
//     - for the corresponding pilot job:
//       - create a status job (semi transparent, move it to the status queue)
//       - move the pilot job to the worker node
//       - process the pilot job
//       - once the pilot job is processed, call process_jobs again
//       - remove the status job
//
// I add the pool jobs to two different group nodes. That makes sure that the yellow pilot jobs are always drawn behind the blue ones.

var height = 50;
var UserX = 200;
var ComputerX = 250;
var QueueX = 0;
var JobProcessingTime = 2000;

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
var PoolServer = [
    {pos: [750, 100],
     scale: 1.,
     queued_jobs: [[],[]]
    }
];

//UserPositions = [[UserX,height]];
var StoragePosition = [[0.75*icon_size,3.25*icon_size]];
var QueuePosition = [[QueueX,0.75*icon_size]];
var ComputerPositions = [];
for (i=0; i<4; ++i) ComputerPositions.push([ComputerX, (i+0.5)*icon_size]);

var UserJobCount = [];

function job_duration() {
    return JobProcessingTime * (0.5+Math.random());
}



function create_cluster_job(user_id, cluster_id) {
    user_id = user_id || 0;
    cluster_id = cluster_id || 0;

    {
        var jobs = Clusters[cluster_id]["svg"].select("#submitted_jobs");
        var job = jobs.append("image");
        job.user_id = user_id;
        add_to_queue(cluster_id, job);
        job
	    .attr("xlink:href", (user_id==0?"img/envelope-yellow.png":"img/envelope-blue.png"))
            .attr("x", QueueX - icon_size - 100 - 10 * Clusters[cluster_id]["queued_jobs"].length )
            .attr("y", height - 0.25*icon_size)
	    .attr("height", envelope_size)
	    .attr("width", envelope_size)
	    .attr("opacity", 0.0)

            .transition()
            .duration(250)
	    .attr("opacity", 0.35)

            .transition()
            .duration(1000)
            .attr("x", QueueX - icon_size - 10 * Clusters[cluster_id]["queued_jobs"].length )
            .attr("y", height - 0.25*icon_size)
            .each("end", function() { job.active = true; });
    }
}

function create_pool_job(user_id) {
    {
        var pjs_jobs = PoolServer[0]["submitted_jobs"][user_id];
        var pjs_job = pjs_jobs.append("image");
        pjs_job.user_id = user_id;
        pjs_job
	    .attr("xlink:href", (user_id==0?"img/envelope-yellow-t.png":"img/envelope-blue-t.png"))
		.attr("x", (UserPositions[user_id][0] - PoolServer[0]["pos"][0])/PoolServer[0]["scale"] )
	    .attr("y", (UserPositions[user_id][1] - PoolServer[0]["pos"][1])/PoolServer[0]["scale"] )
	    .attr("height", icon_size)
	    .attr("width", icon_size)
	    .attr("opacity", 0.0)

        .transition()
        .duration(250)
	    .attr("opacity", 1.0)

        .transition()
        .duration(1000)
        .attr("x", QueueX - icon_size - 10 * PoolServer[0]["queued_jobs"][user_id].length )
        .attr("y", -0.25*(1-user_id)*icon_size)
        .each("end", function() { pjs_job.active = true; });
        add_to_pool_job_queue(pjs_job);
    }
}

function add_to_queue(cluster_id, job) {
    job.active = false;
    Clusters[cluster_id]["queued_jobs"].push(job);

    update_queue();
}

function add_to_pool_job_queue(job) {
    job.active = false;
    PoolServer[0]["queued_jobs"][job.user_id].push(job);

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
    for (user in PoolServer[0]["queued_jobs"]) {
        for (i in PoolServer[0]["queued_jobs"][user]) {
            var job = PoolServer[0]["queued_jobs"][user][i];
            if (job.active) {
                job
                    .transition()
                    .duration(50)
                    .attr("x", QueueX - icon_size - 10 * i )
                    .attr("y", -0.25*(1-user)*icon_size );
            }
        }
    }

    // New to pool_jobs.js: Also update the status jobs queue
    var status_jobs = PoolServer[0]["svg"].select("#status_jobs").selectAll("image");
    status_jobs.transition()
        .duration(250)
        .attr({x : function(d,i) { return QueueX - (1+i/10.0)*envelope_size; },
               y : -envelope_size
              });

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

/// Try to get a new job for a worker node
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

                job.cluster_id = 1*cluster_id;
                job.computer_id = 1*computer_id;

                job
                    .transition()
                    .duration(500)
                    .attr("x", ComputerPositions[computer_id][0]-.75*icon_size )
                    .attr("y", ComputerPositions[computer_id][1]-.25*icon_size )
                
                    .transition()
                    .each("end", function() { process_pool_job(job); });
                return;
            }
            user = get_user(user);
        }
    }

    setTimeout(process_jobs, (2+2*Math.random())*1000, cluster_id, computer_id);
}

function get_pool_job(user) {
    for (i in PoolServer[0]["queued_jobs"][user]) {
        job = PoolServer[0]["queued_jobs"][user][i];
        if ((job.user_id == user) && job.active)
            return i;
    }
    return -1;
}
function process_pool_job(job) {
    job_id = get_pool_job(job["user_id"]);
    if (job_id >= 0) {
        var pool_job = PoolServer[0]["queued_jobs"][job.user_id][job_id];
        PoolServer[0]["queued_jobs"][job.user_id].splice(job_id, 1);
        update_queue();

        var cluster_pos = Clusters[job.cluster_id].pos;
        var cluster_scale = Clusters[job.cluster_id].scale;
        var computer_pos = ComputerPositions[job.computer_id];
        var job_pos = [];
        job_pos.push(cluster_pos[0] + Clusters[job.cluster_id].scale * (computer_pos[0]-.75*icon_size));
        job_pos.push(cluster_pos[1] + Clusters[job.cluster_id].scale * (computer_pos[1]-.25*icon_size));

        job
            .transition()
            .duration(1000)
            .attr("x", ComputerPositions[job.computer_id][0]-.75*icon_size )
            .attr("y", ComputerPositions[job.computer_id][1]-.25*icon_size )
        
            .transition()
            .remove();


        svg.append("line")
	    .attr("stroke","green")
	    .attr("stroke-width", 3)
	    .attr("x1", job_pos[0] + Clusters[0]["scale"]*icon_size/2)
	    .attr("y1", job_pos[1] + Clusters[0]["scale"]*icon_size/2)
	    .attr("x2", job_pos[0] + Clusters[0]["scale"]*icon_size/2)
	    .attr("y2", job_pos[1] + Clusters[0]["scale"]*icon_size/2)
	    .transition()
	    .duration(500)
	    .attr("x2", PoolServer[0]["pos"][0] + Number(pool_job.attr("x")) + PoolServer[0]["scale"]*icon_size/2)
	    .attr("y2", PoolServer[0]["pos"][1] + Number(pool_job.attr("y")) + PoolServer[0]["scale"]*icon_size/2)
	    .transition()
	    .delay(500)
	    .duration(500)
	    .attr("x2", job_pos[0] + Clusters[0]["scale"]*icon_size/2)
	    .attr("y2", job_pos[1] + Clusters[0]["scale"]*icon_size/2);

        {   // New to pool_jobs.js: Create a status job and move it to the Log queue
            var jobs = PoolServer[0]["svg"].select("#status_jobs");
            var status_job = jobs.append("image");
            status_job
	        .attr({"xlink:href":
                       (job.user_id==0?"img/envelope-yellow-t.png":"img/envelope-blue-t.png")})
                .attr("x", QueueX - envelope_size)
                .attr("y", 0 )
	        .attr("height", envelope_size)
	        .attr("width", envelope_size)
	        .attr("opacity", 0.25);
            update_queue();
            job.status_job = status_job;
        }

        pool_job.transition()
            .delay(500)
            .duration(500)
            .attr("x", (job_pos[0]-PoolServer[0].pos[0])/(PoolServer[0].scale*cluster_scale) )
            .attr("y", (job_pos[1]-PoolServer[0].pos[1])/(PoolServer[0].scale*cluster_scale) )
            .attr("transform", "scale("+cluster_scale+")")
        
            .transition()
            .duration(job_duration())
            .remove()
            .each("end", function() {
                // New to pool_jobs.js: Remove the status job again
                job.status_job.remove();
                process_jobs(job.cluster_id, job.computer_id);
            });

        return;
    } else {
        job.transition()
            .remove()
            .each("end", function() { process_jobs(job.cluster_id, job.computer_id); });
    }
}

function add_cluster(i) {
    pos = Clusters[i]["pos"];
    scale = Clusters[i]["scale"];

    svg = d3.select("svg");

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

function add_pool_job_server(i) {
    pos = PoolServer[i]["pos"];
    scale = PoolServer[i]["scale"];

    svg = d3.select("svg");

    pool_job_system = svg.append("g")
    pool_job_system
        .attr("transform", "translate("+pos[0]+","+pos[1]+"),scale("+.5*scale+")");
    pool_job_system.transition().duration(2500)
        .attr("transform", "translate("+pos[0]+","+pos[1]+"),scale("+scale+")");
    add_icons(pool_job_system, "img/computer.png", [[0,0]], "P");

    pool_job_system.append("text")
        .attr({ x: -envelope_size, y: envelope_size/2, "text-anchor": "end" })
        .text("Pilot job queue ...");
    pool_job_system.append("text")
        .attr({ x: -envelope_size, y: -envelope_size/2, "text-anchor": "end" })
        .text("Status queue ...");
    pool_job_system.append("g").attr("id", "status_jobs");
	PoolServer[i]["submitted_jobs"] = [];
    PoolServer[i]["submitted_jobs"][0] = pool_job_system.append("g").attr("id", "submitted_jobs");
    PoolServer[i]["submitted_jobs"][1] = pool_job_system.append("g").attr("id", "submitted_jobs");

    PoolServer[i]["svg"] = pool_job_system;

    return pool_job_system;
}

function main() {
    envelope_size = 75;

    for (var i in UserPositions)
        UserJobCount.push(0);
    
    svg = d3.select("#viz")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "100%");
    svg.append("g").attr("id", "users");

    add_icon(d3.select("#users"), "img/user-computer-yellow.png", UserPositions[0][0], UserPositions[0][1])
        .on("click", function(d,i) { create_job(i) });
    add_icon(d3.select("#users"), "img/user-computer-blue.png", UserPositions[1][0], UserPositions[1][1])
        .on("click", function(d,i) { create_job(i) });

    for (cluster_id in Clusters) {
        cluster = add_cluster(cluster_id);
        for (computer_id in ComputerPositions) {
            setTimeout(process_jobs, 5000 * Math.random(), cluster_id, computer_id);
        }
    }

    add_pool_job_server(0);

    var nJobs = 50;
    
    
    for (i=0; i<nJobs; i+=1) {
        user_id = (Math.random() < 0.65? 0: 1);
        setTimeout(create_pool_job, 7500+ 300*(i-Math.cos(i/1000)*Math.random()), user_id);
    }

    for (i=0; i<nJobs; i+=1) {
        user_id = (Math.random() < 0.65? 0: 1);
        for (cluster_id in Clusters) {
            setTimeout(create_cluster_job, 7500+ 300*nJobs + 10*(i-Math.cos(i/1000)*Math.random()), user_id, cluster_id);
        }
    }
}
