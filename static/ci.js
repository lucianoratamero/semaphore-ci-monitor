
$(document).ready(function(){
  projectsDataLoader();
  setInterval(function(){projectsDataLoader()}, 10000);
})

var ciProjectsSection = $('#ci-projects');
var useMasonry = ciProjectsSection.attr('data-use-masonry');

var projectsDataLoader = function() {
  $.ajax({
    url: '/api-data',
    contentType: 'application/json',
    dataType: 'json',
    start: function() {
      ciProjectsSection.addClass('ajax-loading');
    },
    success: function(data){
      updateProjectStatuses(data);
      hideAjaxError();
      if ( useMasonry ) {
        startMasonry();
      }
    },
    error: function(data){
      showAjaxError();
    },
    complete: function(){
      ciProjectsSection.removeClass('ajax-loading');
    }
  });
}

var startMasonry = function(){
  setTimeout(function(){
    ciProjectsSection.find('> .row').masonry({"gutter": 0});
  }, 50); // waits for projects to be populated correctly to dom tree.
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
  var html = '';
  var change_rows = '</div><div class="row">';

  html += '<div class="row" data-masonry-options=\'{"gutter": 0}\'>';

  for (var i=0;i<projects_list.length;i++) {
    var project = projects_list[i];

    if ( useMasonry ) {
      html += masonryProjectTemplate(project);
    } else {
      html += projectTemplate(project);
    }

    if (i % 3 == 2 && !useMasonry) {
      html += change_rows;
    }

  }

  html += '</div>';
  ciProjectsSection.append(html);

  updateProjectsTemplates(projects_list);

}

var baseProjectTemplate = function(project) {
  return '<div id="' + project.name + '" class="well">\
  <h1>' + project.name + '</h1>\
  <div class="ci-project-branches row"></div>\
  </div>';
}

var masonryProjectTemplate = function(project) {
  return '<div class="ci-project">' + baseProjectTemplate(project) + '</div>';
}

var projectTemplate = function(project) {
  return '<div class="ci-project col-xs-12 col-lg-4">' + baseProjectTemplate(project) + '</div>';
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

      branchesTemplate.append(branchTemplate(branch));

    }
  }

}

var branchTemplate = function(branch) {

  var template = '<div class="ci-branch col-lg-6 col-xs-12">'

  if (branch.result == 'passed') {
    template += '<div class="bg-success"><h3>' + branch.branch_name + '</h3></div>';
  } else if (branch.result == 'failed') {
    template += '<div class="bg-danger"><h3>' + branch.branch_name + '</h3></div>';
  } else if (branch.result == 'pending') {
    template += '<div class="bg-info"><h3>' + branch.branch_name + '</h3></div>';
  }

  template += '</div>'

  return template

}

var hideAjaxError = function(){
  $('#ci-ajax-error').hide();
}

var showAjaxError = function(){
  $('#ci-ajax-error').show();
}
