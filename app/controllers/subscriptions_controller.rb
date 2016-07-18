class SubscriptionsController < ApplicationController
  def index

    # url = 'http://www.economist.com/sections/international/rss.xml'
    # @feed = Feedjira::Feed.fetch_and_parse url
  end

  def add
    bookmark = current_user.bookmarks.new(subscription_params)
    if bookmark.save
      render json: bookmark
    else
      render json: @post.errors.messages, status: 400
    end

  end

private
  def subscription_params
    params.require(:subscription).permit(:title, :url)
  end

end
