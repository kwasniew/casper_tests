var MainPage = {
	driver: require('casper').create(),

	open: function() {
		this.driver.start(this.driver.cli.get('url'), function() {
			this.test.assertSelectorHasText('title', 'Forside', 'Page title contains word Forside');
		});
	},


	verifyCarouselWorks: function() {
		this.driver.then(function() {
			this.test.assertExists('.realEstateCarousel .carouselHolder', 'Real Estate Carousel widget is present on the page');
		});
	},

    verifyMostReadSectionWorks: function() {
        this.driver.then(function() {
            this.test.assertExists('section.mostRead', 'Most Read (Mest Lest) section is present on the page');
            this.test.assertEquals(this.fetchText('section.mostRead h2').trim(), 'Mest lest', 'Most Read section title is Mest Lest');
            this.test.assertEval(function() {
                return document.querySelectorAll('section.mostRead li').length === 5;
            }, 'Most Read section contains 5 news items');
        });
    },

	verifyDateWidgetWorks: function() {
		this.driver.then(function() {
			this.test.assertExists('.widget.weather', 'Weather widget is present on the page');
			this.test.assert((this.fetchText('.widget.dateline').length > 0), 'Date widget should contain some text');
		});
	},

	verifyCanGoToOsloby: function() {
		var self = this,
            timeout = 5;
		
		self.driver.thenClick('li.osloby a').then(function() {
			var oldUrl = self.driver.getCurrentUrl();
			self.driver.waitFor(function() {
				return (oldUrl !== self.driver.getCurrentUrl());
			}, function() {
				self.driver.test.assertSelectorHasText('title', 'Osloby', 'Can navigate to Osloby from the main page');
			}, function() {
                this.test.fail("Didn't open Osloby in " + timeout + " seconds");
            }, 5 * 1000);
		});
	},


	run: function() {
		this.driver.run(function() {
			this.test.renderResults(true, 0, 'log.xml');
		});
	}
}

MainPage.open();
MainPage.verifyCarouselWorks();
MainPage.verifyMostReadSectionWorks();
MainPage.verifyDateWidgetWorks();
MainPage.verifyCanGoToOsloby();
MainPage.run();
