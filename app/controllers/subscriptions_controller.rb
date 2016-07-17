class SubscriptionsController < ApplicationController
  def index
    url = 'http://www.polygon.com/rss/index.xml'
    @feed = Feedjira::Feed.fetch_and_parse url
  end


end
