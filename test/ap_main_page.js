var MainPage = {
	driver: require('casper').create(),

	open: function() {
		this.driver.start(this.driver.cli.get('url'), function() {
			this.test.assertSelectorHasText('title', 'Forside');
		});
	},


	verifyCarouselWorks: function() {
		this.driver.then(function() {
			this.test.assertExists('.realEstateCarousel .carouselHolder', 'Real Estate Carousel widget is not present on the page');
		});
	},

	verifyDateWidgetWorks: function() {
		this.driver.then(function() {
			this.test.assertExists('.widget.weather', 'Weather widget is non present on the page');
			this.test.assert((this.fetchText('.widget.dateline').length > 0), "Date widget doesn't contain any text")
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
				self.driver.test.assertSelectorHasText('title', 'Osloby');
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
MainPage.verifyDateWidgetWorks();
MainPage.verifyCanGoToOsloby();
MainPage.run();
