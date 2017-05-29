angular.module('APP', ['ngSanitize'])
  // Controller for adding slashs
  .controller('addSlashCtrl', ['$scope', function($scope){

    $scope.ppap_sentence = {name: 'long sentence - PPAP',    entity: "P-P-A-P\n\nI have a pen, I have a apple\nUh! Apple-Pen!\n\nI have a pen, I have pineapple\nUh! Pineapple-Pen!\n\nApple-Pen, Pineapple-Pen\nUh! Pen-Pineapple-Apple-Pen\nPen-Pineapple-Apple-Pen"}
    // Example settings
    $scope.sample_sentences = [
      {name: "empty sentence",           entity: ""},
      {name: "hello, world",             entity: "hello, world."},
      {name: "!",                        entity: "Start recruting multilingual candidates now!"},
      {name: "?",                        entity: "What is in his closet?"},
      {name: "Mr. Bean",                 entity: "Mr. Bean is a 2002 animated television series."},
      {name: "Mt. Fuji",                 entity: "Viewing Mt. Fuji from a far distances is very wonderful."},
      {name: "conjunctions - when",      entity: "To prepare for manual scripting when an unanticipated get call is received."},
      {name: "conjunctions - while",     entity: "Firmly grasp and hold the monitor by the bottom while grabbing the handle."},
      {name: 'transitive - accordingly', entity: "Accordingly we believe that the proposed Provision, which may prevent flexible design of the system in the future, should not be added to the Articles of Incorporation."},
      {name: 'transitive - otherwise',   entity: "Otherwise you will create multiple members with names."},
      {name: "Today ...",                entity: "Today we want all of our employees to feel empowered."},
      {name: "Today is ...",             entity: "Today is an auspicious moment. "},
      {name: "\"....\"",                 entity: "\"And what an ignorant little girl she'll think me for asking! No, it'll never do to ask: perhaps I shall see it written up somewhere.\""},
      {name: "\"...!\"",                 entity: "The Rabbit say to itself \"I shall be too late!\""},
      {name: "long sentence - banana",   entity: "Banana is one of Rwanda's staple foods, and it has very high productivity; thus it is the foundation supporting the densely populated country. However, if you have low blood sugar, you can eat a banana or drink a fruit juice up to thirty minutes before class."},
      {name: 'long sentence - Alice',    entity: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, \"and what is the use of a book,\" thought Alice, \"without pictures or conversations?\""},
      $scope.ppap_sentence
    ];


    // Default example sentences
    $scope.current_sample_sentence = $scope.sample_sentences[0];


    $scope.isInPPAPMode = function(){
      return $scope.current_sample_sentence == $scope.ppap_sentence;
    };

    // List of exception cases
    var exceptCases = ["Mr.", "Ms.", "Mrs.", "Miss.", "Mt.", "N.Y.", "Prof."];
    // Plain text
    $scope.plainText = "";

    // Return converted text
    $scope.analizedText = function(){

      // Add newline for triple slac
      var text = $scope.plainText + "\n";

      // Add triple slashs text
      text = text.replace(/(.+[\.\!?]+)("?)([ \n])/g, function(n0, n1, n2, n3){
        // If n1 is in exception cases (such as 'Mr.' or 'Ms.')
        if(exceptCases.includes(n1)){
          return n1 + n2 + n3 + " " ;
        } else {
          return n1 + n2 + "<span class='slash3'>///</span> " + n3;
        }
      });

      // Add double slashs to text
      text = text.replace(/([\,\:\;])([ \n])/g, "$1<span class='slash2'>//</span> ");

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
    };

    $scope.reflectSampleSentence = function(){
      $scope.plainText = $scope.current_sample_sentence.entity;
    };
  }]);
