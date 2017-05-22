angular.module('APP', ['ngSanitize'])
  // Controller for adding slashs
  .controller('addSlashCtrl', ['$scope', function($scope){
    // List of exception cases
    var exceptCases = ["Mr.", "Ms.", "Mrs.", "Miss.", "Mt.", "N.Y.", "Prof."];
    // Plain text
    $scope.plainText = "";

    // Return converted text
    $scope.analizedText = function(){

      // Add newline for triple slac
      var text = $scope.plainText + "\n";

      // Add triple slashs text
      text = text.replace(/([a-zA-Z()]+[\.\!?]+)("?)([ \n])/g, function(n0, n1, n2, n3){
        // If n1 is in exception cases (such as 'Mr.' or 'Ms.')
        if(exceptCases.includes(n1)){
          return n1 + n2 + n3 + " " ;
        } else {
          return n1 + n2 + "<span class='slash3'>///</span> " + n3;
        }
      });

      // Add double slashs to text
      text = text.replace(/([a-zA-Z]+[\,\:\;])([ \n])/g, "$1<span class='slash2'>//</span> $2");

      // Add single slashs to text
      text = text.replace(/(after|although|because|before|but|considering|directorly|however|though|when|whenever|whether|while)([ \n])/g, "<span class='slash1'>/</span>$1 $2");

      // Add single slashs to text
      text = text.replace(/(Today)([ \n])([\w\']+)/g, function(n0, n1, n2, n3){
        if(n3 == "is" || n3 == "isn't"){ // This is for "Today is ..."
          return n1 + n2 + n3;
        } else {
          return n1 + "<span class='slash1'>/</span> " + n2 + n3;
        }
      });

      // Add single slashs to text
      text = text.replace(/(Accordingly|Also|Besides|Consequently|Conversely|Finally|Furthermore|Hence|However|Indeed|Instead|Likewise|Meanwhile|Moreover|Nevertheless|Next|Nonetheless|Otherwise|Similarly|Still|Subsequently|Then|Therefore|Thus)([ \n])/g, "$1<span class='slash1'>/</span> $2");

      // Newline to <br>
      text = text.replace(/\n/g, "<br>");
      return text;
    }
  }]);
