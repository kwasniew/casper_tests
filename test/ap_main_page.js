var MainPage = {
	driver: require('casper').create(),
	url: "http://ap.no",

	open: function() {
		this.driver.start(this.url, function() {
			this.test.assertSelectorHasText('title', 'Forside');
		});
	},


	verifyCarouselWorks: function() {
		this.driver.then(function() {
			this.test.assertExists('.realEstateCarousel .carouselHolder', 'Real Estate Carousel widget is on the page');
		});
	},

	verifyDateWidgetWorks: function() {
		this.driver.then(function() {
			this.test.assertExists('.widget.weather', 'Weather widget is on the page');
			this.test.assert((this.fetchText('.widget.dateline').length > 0), "Date widget contains some text")
		});
	},

	verifyCanGoToOsloby: function() {
		var self = this;
		
		self.driver.thenClick('li.osloby a').then(function() {
			var oldUrl = self.driver.getCurrentUrl();
			self.driver.waitFor(function() {
				return (oldUrl !== self.driver.getCurrentUrl());
			}, function() {
				self.driver.test.assertSelectorHasText('title', 'Osloby');
			});			
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