
$(document).ready(function(){
    projectsDataLoader();
    setInterval(function(){projectsDataLoader()}, 10000);
})

var projectsDataLoader = function() {
    $.ajax({
        url: '/api-data',
        contentType: 'application/json',
        dataType: 'json',
        start: function() {
            $('#ci-projects').addClass('ajax-loading');
        },
        success: function(data){
            updateProjectStatuses(data);
            hideAjaxError();
        },
        error: function(data){
            showAjaxError();
        },
        complete: function(){
            $('#ci-projects').removeClass('ajax-loading');
        }
    });
}

var updateProjectStatuses = function(projects_list){
    var ciProjectsSection = $('#ci-projects');

    if (ciProjectsSection.html().length == 0) {
        buildProjectTemplates(projects_list);
    } else {
        updateProjectsTemplates(projects_list);
    }

}

var buildProjectTemplates = function(projects_list) {
    var ciProjectsSection = $('#ci-projects');
    var html = '';
    var change_rows = '</div><div class="row">';

    html += '<div class="row">';

    for (var i=0;i<projects_list.length;i++) {
        var project = projects_list[i];

        html += projectTemplate(project);

        if (i % 2 == 1) {
            html += change_rows;
       }

    }

    html += '</div>';
    ciProjectsSection.append(html);

    updateProjectsTemplates(projects_list);

}

var projectTemplate = function(project) {
    return '<div class="col-xs-12 col-md-12 col-lg-6">\
                <div id="' + project.name + '" class="well">\
                    <h1>' + project.name + '</h1>\
                    <div class="ci-project-branches"></div>\
                </div>\
            </div>'
}

var updateProjectsTemplates = function(projects_list) {

    for (var i=0;i<projects_list.length;i++) {
        var project = projects_list[i];
        var projectTemplate = $('#' + project.name);

        var branches = project.branches;
        var branchesTemplate = projectTemplate.find('.ci-project-branches');

        branchesTemplate.html('');

        for (var j=0;j<branches.length;j++){
            var branch = branches[j];

            if (branch.result == 'passed') {
                branchesTemplate.append('<p class="bg-success"><strong>' + branch.branch_name + '</strong> - Passed</p>');
            } else if (branch.result == 'failed') {
                branchesTemplate.append('<p class="bg-danger"><strong>' + branch.branch_name + '</strong> - Failed</p>');
            } else if (branch.result == 'pending') {
                branchesTemplate.append('<p class="bg-info"><strong>' + branch.branch_name + '</strong> - Pending</p>');
            }
        }
    }

}

var hideAjaxError = function(){
    $('#ci-ajax-error').hide();
}

var showAjaxError = function(){
    $('#ci-ajax-error').show();
}
