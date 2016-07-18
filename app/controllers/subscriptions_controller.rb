class SubscriptionsController < ApplicationController
  def index

    url = 'http://www.economist.com/sections/international/rss.xml'
    @feed = Feedjira::Feed.fetch_and_parse url
  end
  @post = current_user.posts.new(subscription_params)

  def add
    bookmark = current_user.bookmarks.new(subscription_params)

  end

private
  def subscription_params
    params.require(:subscription).permit(:title, :url)
  end

end
