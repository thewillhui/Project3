class FeedlrController < ApplicationController
  require 'feedlr'

  def search
    client = Feedlr::Client.new(oauth_access_token: ENV["FEEDLR_SECRET_KEY"])

    @feeds = client.search_feeds(params[:query])

  end
end
