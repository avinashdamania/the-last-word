/**
 * Dependency Modules
 */

var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
require("chromedriver");// Application Server
const serverUri = "http://localhost:3000/#";
const appTitle = "The Last Word";/**
 * Config for Chrome browser
 * @type {webdriver}
 */
var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "chrome" })
 .build();/**
 * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
 * @type {webdriver}
 */
/*
var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "firefox" })
 .build();
 *//**
 * Function to get the title and resolve it it promise.
 * @return {[type]} [description]
 */
function logURL() {
    return new Promise((resolve, reject) => {
     browser.getCurrentUrl().then(function(title) {
      resolve(title);
     });
    });
}

 /**
  * Test case to load our application and check the title.
  */
 it("Should load the home page", function() {
   browser
    .get(serverUri)
 });
 /**
  * Test case to check whether the given element is loaded.
  */
 it("Should check whether the languageInfo button is loaded", function() {
  return new Promise((resolve, reject) => {
   browser
    .findElement({ id: "languageInfo" })
    .then(elem => resolve())
    .catch(err => reject(err));
  });
 });


 it("Should check whether the image loads properly on the splash page", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ className: "makeStyles-img-121" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });

 it("Should check whether the countryInfo button is loaded", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ id: "countryInfo" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });
 
 
   it("Should check whether the charityInfo button is loaded", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ id: "charityInfo" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });



   it("Should check whether the about button is loaded", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ id: "about" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });
 


it("Should check whether the languageInfo page loads properly when the button is clicked", function () {
    browser.findElement({ id: 'languageInfo' }).click().then(function() {
 
    return new Promise((resolve, reject) => {
        browser
         
         .then(logURL)
         .then(title => {
          assert.equal(title, "http://localhost:3000/languageInfo");
          resolve();
         })
         .catch(err => reject(err));
       });
    });
});

it("Should check whether the table rows load properly on the languages page", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ className: "MuiTableRow-root MuiTableRow-hover" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });

it("Should check whether the countryInfo page loads properly when the button is clicked", function () {
    browser.findElement({ id: 'countryInfo' }).click().then(function() {
 
    return new Promise((resolve, reject) => {
        browser
         
         .then(logURL)
         .then(title => {
          assert.equal(title, "http://localhost:3000/countryInfo");
          resolve();
         })
         .catch(err => reject(err));
       });
    });
});

it("Should check whether the table rows load properly on the countries page", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ className: "MuiTableRow-root MuiTableRow-hover" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });

it("Should check whether the charityInfo page loads properly when the button is clicked", function () {
    browser.findElement({ id: 'charityInfo' }).click().then(function() {
 
    return new Promise((resolve, reject) => {
        browser
         
         .then(logURL)
         .then(title => {
          assert.equal(title, "http://localhost:3000/charityInfo");
          resolve();
         })
         .catch(err => reject(err));
       });
    });
});


it("Should check whether the cards load properly on the charities page", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ className: "MuiPaper-root MuiPaper-elevation1 MuiCard-root MuiPaper-rounded" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });



it("Should check whether the about page loads properly when the button is clicked", function () {
    browser.findElement({ id: 'about' }).click().then(function() {
 
    return new Promise((resolve, reject) => {
        browser
         
         .then(logURL)
         .then(title => {
          assert.equal(title, "http://localhost:3000/about");
          resolve();
         })
         .catch(err => reject(err));
       });
    });
});



it("Should check whether the cards load properly on the about page", function() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            browser
      .findElement({ className: "MuiPaper-root MuiPaper-elevation1 MuiCard-root makeStyles-card-136 MuiPaper-rounded" })
      .then(elem => resolve())
      .catch(err => reject(err));
    });
            
            }, 5000000);
     
   });





// it("Clickin", function () {
//     browser.findElement({ id: 'charityInfo' }).click().then(function() {
 
//     return new Promise((resolve, reject) => {
//         browser
         
//          .then(logURL)
        //  .then(title => {
        //   assert.equal(title, "http://localhost:3000/charityInfo");
        //   resolve();
        //  })
//          .catch(err => reject(err));
//        });
//     });
// });




 /**
  * End of test cases use.
  * Closing the browser and exit.
  */


 after(function() {
  // End of test use this.
  setTimeout(() => {
    browser.quit();
    }, 50000);
 });











// function logURL() {
//     return new Promise((resolve, reject) => {
//      browser.getCurrentUrl().then(function(title) {
//       resolve(title);
//      });
//     });
//    }

 
// it("Should check whether the given element is loaded", function () {
//     browser.get(serverUri)
//     browser.findElement({ id: 'languageInfo' }).click().then(function() {
 
//     return new Promise((resolve, reject) => {
//         browser
         
//          .then(logURL)
//          .then(title => {
//           assert.equal(title, "http://localhost:3000/languageInfo");
//           resolve();
//          })
//          .catch(err => reject(err));
//        });
//     });
// });











