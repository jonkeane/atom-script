var open = require("nodegit").Repository.open;

var authors = {}

open(".")
  .then(function(repo) {
    console.log(repo);
    return repo.getHeadCommit();
  })
  // Display information about commits at HEAD
  .then(function(headCommit) {
    // Create a new history event emitter.
    var history = headCommit.history();
  
    // Listen for commit events from the history.
    history.on("commit", function(commit) {
      var author = commit.author();
      // Use their last email, assumes no same-named people contribute to the project
      authors[author.name()] = author.email();
    });

    history.on("end", function(commits) {
      console.log(authors)
    });
  
    // Start emitting events.
    history.start();
  });

