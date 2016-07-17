class SubscriptionsController < ApplicationController
  def index
    url = 'http://www.economist.com/sections/international/rss.xml'
    @feed = Feedjira::Feed.fetch_and_parse url
    render json: @feed
  end
end
