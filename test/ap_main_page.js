(function(casperDriver) {

    var MainPage = {
        driver: casperDriver,

        open: function() {
            return this.driver.start(this.driver.cli.get('url'));
        },

        goToOsloby: function() {
            return this.driver.thenClick('li.osloby a');
        }
    }

    var MainPageTests = {
        driver: casperDriver,

        containsCorrectTitle: function() {
            this.driver.then(function() {
                this.test.assertSelectorHasText('title', 'Forside', 'Page title contains word Forside');
            });
        },

        carouselWorks: function() {
            this.driver.then(function() {
                this.test.assertExists('.realEstateCarousel .carouselHolder', 'Real Estate Carousel widget is present on the page');
            });
        },

        mostReadSectionWorks: function() {
            this.driver.then(function() {
                this.test.assertExists('section.mostRead', 'Most Read (Mest Lest) section is present on the page');
                this.test.assertEquals(this.fetchText('section.mostRead h2').trim(), 'Mest lest', 'Most Read section title is Mest Lest');
                this.test.assertEval(function() {
                    return document.querySelectorAll('section.mostRead li').length === 5;
                }, 'Most Read section contains 5 news items');
            });
        },

        dateWidgetWorks: function() {
            this.driver.then(function() {
                this.test.assertExists('.widget.weather', 'Weather widget is present on the page');
                this.test.assert((this.fetchText('.widget.dateline').length > 0), 'Date widget should contain some text');
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
