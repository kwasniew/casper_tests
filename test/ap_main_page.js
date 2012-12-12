(function(casperDriver) {

    var MainPage = {
        driver: casperDriver,

        open: function() {
            return this.driver.start(this.driver.cli.get('url'), function() {
                this.capture('ap_main.png');
            });
        },

        goToOsloby: function() {
            return this.driver.thenClick('li.osloby a');
        },

        carouselSelector: '.realEstateCarousel .carouselHolder',

        titleSelector: 'title',

        mostReadSelector: 'section.mostRead',
        mostReadHeaderSelector: 'section.mostRead h2',
        mostReadItemSelector: 'section.mostRead li',

        dateWidgetSelector: '.widget.weather',
        dateWidgetTextSelector: '.widget.dateline'
    }

    var MainPageTests = {
        driver: casperDriver,

        containsCorrectTitle: function() {
            this.driver.then(function() {
                this.test.assertSelectorHasText(MainPage.titleSelector, 'Forside', 'Page title contains word Forside');
            });
        },

        carouselWorks: function() {
            this.driver.then(function() {
                this.test.assertExists(MainPage.carouselSelector, 'Real Estate Carousel widget is present on the page');
            });
        },

        mostReadSectionWorks: function() {
            this.driver.then(function() {
                this.test.assertExists(MainPage.mostReadSelector, 'Most Read (Mest Lest) section is present on the page');
                this.test.assertEquals(this.fetchText(MainPage.mostReadHeaderSelector).trim(), 'Mest lest', 'Most Read section title is Mest Lest');
                this.test.assertEval(function(selector) {
                    return document.querySelectorAll(selector).length === 5;
                }, 'Most Read section contains 5 news items', MainPage.mostReadItemSelector);
            });
        },

        dateWidgetWorks: function() {
            this.driver.then(function() {
                this.test.assertExists(MainPage.dateWidgetSelector, 'Weather widget is present on the page');
                this.test.assert((this.fetchText(MainPage.dateWidgetTextSelector).length > 0), 'Date widget should contain some text');
            });
        },

        run: function() {
            this.driver.run(function() {
                this.test.renderResults(true, 0, 'log.xml');
            });
        }
    }

    var OslobyPageTests = {
        driver: casperDriver,

        containsCorrectTitle: function() {
            var self = this,
                timeout = 5;


            self.driver.then(function() {
                var oldUrl = self.driver.getCurrentUrl();
                self.driver.waitFor(function() {
                    return (oldUrl !== self.driver.getCurrentUrl());
                }, function() {
                    self.driver.test.assertSelectorHasText('title', 'Osloby', 'Can navigate to Osloby from the main page');
                }, function() {
                    this.test.fail("Didn't open Osloby in " + timeout + " seconds");
                }, 5 * 1000);
            });
        }
    }


    MainPage.open();

    MainPageTests.containsCorrectTitle();
    MainPageTests.carouselWorks();
    MainPageTests.mostReadSectionWorks();
    MainPageTests.dateWidgetWorks();

    MainPage.goToOsloby();
    OslobyPageTests.containsCorrectTitle();

    MainPageTests.run();

})(require('casper').create());
