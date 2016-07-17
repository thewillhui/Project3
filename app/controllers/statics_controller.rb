class StaticsController < ApplicationController
  before_action :authenticate_user!, only: [ :secret]


  def home
    url = 'http://feeds.bbci.co.uk/news/rss.xml'
    @feed = Feedjira::Feed.fetch_and_parse url
  end

  def secret
  end

  def searchbox
  end


end
