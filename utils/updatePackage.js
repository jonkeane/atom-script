var open = require("nodegit").Repository.open;

var authors = {}
var rankings = {}

open(".")
  .then(function(repo) {
    return repo.getHeadCommit();
  })
  // Display information about commits at HEAD
  .then(function(headCommit) {
    // Create a new history event emitter.
    var history = headCommit.history();
  
    // Listen for commit events from the history.
    history.on("commit", function(commit) {
      var author = commit.author();
      var name = author.name();

      // Take their most recent commit as the email they care about
      authors[name] = authors[name] || author.email();
      
      // Count up their total number of commits
      rankings[name] = rankings[name] || 0
      rankings[name]++

    });

    history.on("end", function(commits) {
      console.log(authors)
      console.log(rankings)
    });
  
    // Start emitting events.
    history.start();
  });

